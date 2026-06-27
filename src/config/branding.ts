/** Arbroath Gymnastics Club — demo branding (public demo only, fake data) */

export const clubName = "Arbroath Gymnastics Club";

export const clubShortName = "Arbroath Gymnastics";

export const productName = "ClubOps";

export const clubTagline = "Volunteer club management — demo for Arbroath Gymnastics Club";

export const clubLocation = "Arbroath, Scotland";

/** Prefer PNG if added to public/branding/; SVG ships in repo as fallback */
export const logoPaths = {
  primary: "/branding/arbroath-logo.png",
  svg: "/branding/arbroath-logo.svg",
  fallbackWhiteBg: "/branding/arbroath-logo-white-bg.png",
} as const;

export const brandColors = {
  primary: "#157347",
  primaryHover: "#12603b",
  primarySoft: "#DDF3E7",
  charcoal: "#1F2937",
  offWhite: "#F9FAFB",
  accentShimmer: "#FCE7F3",
  accentLilac: "#F3E8FF",
  sidebar: "#1a2e24",
  sidebarBorder: "#2d4a3a",
} as const;
