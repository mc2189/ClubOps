#!/usr/bin/env node
/**
 * Responsive layout verification for ClubOps demo.
 *
 * Checks scrollWidth vs innerWidth and mobile/desktop layout markers at phone widths.
 *
 * Usage:
 *   BASE_URL=http://localhost:3000 node scripts/responsive-check.mjs
 *   BASE_URL=https://club-ops-fawn.vercel.app node scripts/responsive-check.mjs
 *
 * Browsers: uses Playwright Chromium, or falls back to system Chrome if not installed.
 */

import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [360, 390, 430];
const DESKTOP_WIDTH = 1280;

/** Routes with mobile cards below md and a desktop layout at md+ */
const CARD_TABLE_ROUTES = [
  {
    path: "/members",
    mobile: '[data-layout="members-mobile-cards"]',
    desktop: '[data-layout="members-desktop-table"], [data-layout="members-desktop-simple"]',
  },
  {
    path: "/members?filter=needs-attention",
    mobile: '[data-layout="members-mobile-cards"]',
    desktop: '[data-layout="members-desktop-table"], [data-layout="members-desktop-simple"]',
  },
  {
    path: "/finance/fees",
    mobile: '[data-layout="fees-mobile-cards"]',
    desktop: '[data-layout="fees-desktop-table"]',
  },
  {
    path: "/documents/missing",
    mobile: '[data-layout="missing-mobile-cards"]',
    desktop: '[data-layout="missing-desktop-table"]',
  },
  {
    path: "/finance/transactions",
    mobile: '[data-layout="transactions-mobile-cards"]',
    desktop: '[data-layout="transactions-desktop-table"]',
  },
  {
    path: "/finance/expenses",
    mobile: '[data-layout="expenses-mobile-cards"]',
    desktop: '[data-layout="expenses-desktop-table"]',
  },
];

const OVERFLOW_ROUTES = [
  "/members",
  "/members?filter=needs-attention",
  "/finance/fees",
  "/finance/transactions",
  "/finance/expenses",
  "/documents/missing",
  "/staff",
  "/reports/export-centre",
  "/attendance",
  "/attendance/register/ses-mon-beginners",
  "/communications/compose?preset=unpaid-fees",
  "/fundraising",
  "/settings",
];

function fail(msg) {
  console.error(`FAIL  ${msg}`);
}

function pass(msg) {
  console.log(`PASS  ${msg}`);
}

async function launchBrowser() {
  try {
    return await chromium.launch({ headless: true });
  } catch {
    console.log("Chromium not installed — falling back to system Chrome channel");
    return chromium.launch({ headless: true, channel: "chrome" });
  }
}

async function checkNoOverflow(page, path, width) {
  await page.setViewportSize({ width, height: 844 });
  await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  if (metrics.scrollWidth > metrics.innerWidth + 1) {
    fail(`${path} @ ${width}px — horizontal overflow (${metrics.scrollWidth} > ${metrics.innerWidth})`);
    return false;
  }
  pass(`${path} @ ${width}px — no horizontal overflow`);
  return true;
}

async function isAnyVisible(page, selector) {
  const locators = selector.split(",").map((s) => page.locator(s.trim()));
  for (const loc of locators) {
    if (await loc.first().isVisible().catch(() => false)) return true;
  }
  return false;
}

async function checkLayoutSwitch(page, route, width, expectMobile) {
  await page.setViewportSize({ width, height: 844 });
  await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });

  const mobileLocator = page.locator(route.mobile).first();
  const desktopLocator = page.locator(route.desktop).first();

  if (expectMobile) {
    await mobileLocator.waitFor({ state: "visible", timeout: 15000 }).catch(() => null);
  } else {
    await desktopLocator.waitFor({ state: "visible", timeout: 15000 }).catch(() => null);
  }

  await page.waitForTimeout(300);

  const mobileVisible = await page.locator(route.mobile).first().isVisible().catch(() => false);
  const desktopVisible = await isAnyVisible(page, route.desktop);

  if (expectMobile) {
    if (!mobileVisible) {
      fail(`${route.path} @ ${width}px — mobile cards not visible`);
      return false;
    }
    if (desktopVisible) {
      fail(`${route.path} @ ${width}px — desktop layout should be hidden`);
      return false;
    }
    pass(`${route.path} @ ${width}px — mobile cards active, desktop hidden`);
    return true;
  }

  if (mobileVisible) {
    fail(`${route.path} @ ${DESKTOP_WIDTH}px — mobile cards should be hidden`);
    return false;
  }
  if (!desktopVisible) {
    fail(`${route.path} @ ${DESKTOP_WIDTH}px — desktop layout not visible`);
    return false;
  }
  pass(`${route.path} @ ${DESKTOP_WIDTH}px — desktop layout active, mobile hidden`);
  return true;
}

async function main() {
  console.log("=== ClubOps responsive check ===");
  console.log(`Base URL: ${BASE_URL}\n`);

  let passed = 0;
  let failed = 0;

  const browser = await launchBrowser();
  const page = await browser.newPage();

  console.log("--- No horizontal overflow (360 / 390 / 430px) ---");
  for (const path of OVERFLOW_ROUTES) {
    for (const width of WIDTHS) {
      const ok = await checkNoOverflow(page, path, width);
      if (ok) passed += 1;
      else failed += 1;
    }
  }

  console.log("\n--- Mobile card layout (below md) ---");
  for (const route of CARD_TABLE_ROUTES) {
    for (const width of WIDTHS) {
      const ok = await checkLayoutSwitch(page, route, width, true);
      if (ok) passed += 1;
      else failed += 1;
    }
  }

  console.log("\n--- Desktop layout (1280px) ---");
  for (const route of CARD_TABLE_ROUTES) {
    const ok = await checkLayoutSwitch(page, route, DESKTOP_WIDTH, false);
    if (ok) passed += 1;
    else failed += 1;
  }

  await browser.close();

  console.log("\n--- Summary ---");
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  if (failed > 0) {
    process.exit(1);
  }
  console.log("All responsive checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
