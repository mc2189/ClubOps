/**
 * ClubOps concept-demo branding.
 * Portfolio project only: not affiliated with or endorsed by any real club.
 */

export const clubName = "Arbroath Gymnastics Club";
export const clubShortName = "Arbroath Gymnastics";
export const productName = "ClubOps";
export const clubTagline = "Volunteer club management - concept demo";
export const clubLocation = "Arbroath, Scotland";

export const dashboardWelcomeSubtitle =
  "Today's priorities and volunteer admin in one place";

/**
 * Portfolio-generated brand assets only. Official third-party logo copies are
 * intentionally not part of the public-facing asset configuration.
 */
export const brandAssets = {
  primaryLogo: "/branding/arbroath_clean_logo_full_transparent.png",
  primaryLogoHeader: "/branding/arbroath_clean_logo_web_header_transparent.png",
  primaryIcon: "/branding/arbroath_clean_icon_transparent.png",
  primaryLogoMedium: "/branding/arbroath_clean_logo_512_transparent.png",
  compactMark: {
    initials: "AGC",
    ariaLabel: "Arbroath Gymnastics Club concept demo",
  },
  glamLogo: {
    full: "/branding/arbroath_glam_logo_full_transparent.png",
    icon: "/branding/arbroath_glam_icon_transparent.png",
    header: "/branding/arbroath_glam_logo_web_header_transparent.png",
  },
  bannerArt: {
    dashboardHero: "/branding/banners/dashboard-glam-hero-art.png",
    pageHeader: "/branding/banners/page-glam-header-art.png",
  },
} as const;

/** @deprecated Use brandAssets - kept for WebLogo component paths. */
export const logoPaths = {
  clean: {
    icon: brandAssets.primaryIcon,
    full: brandAssets.primaryLogo,
    header: brandAssets.primaryLogoHeader,
    medium: brandAssets.primaryLogoMedium,
  },
  glam: {
    full: brandAssets.glamLogo.full,
    icon: brandAssets.glamLogo.icon,
    header: brandAssets.glamLogo.header,
  },
} as const;

export type WebLogoVariant =
  | "clean-icon"
  | "clean-full"
  | "clean-header"
  | "clean-medium"
  | "glam-full"
  | "glam-icon";

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
