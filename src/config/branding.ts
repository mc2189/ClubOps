/** Arbroath Gymnastics Club — demo branding (public demo only, fake data) */

export const clubName = "Arbroath Gymnastics Club";

export const clubShortName = "Arbroath Gymnastics";

export const productName = "ClubOps";

export const clubTagline = "Volunteer club management — demo for Arbroath Gymnastics Club";

export const clubLocation = "Arbroath, Scotland";

export const dashboardWelcomeSubtitle =
  "Today's priorities and volunteer admin in one place";

/**
 * Brand asset roles — generated clean logo is primary identity; AGC mark is compact fallback only.
 */
export const brandAssets = {
  /** Generated clean full logo — dashboard, demo, reports, presentation headers */
  primaryLogo: "/branding/arbroath_clean_logo_full_transparent.png",
  /** Horizontal web header variant — sidebar / mobile drawer when full stack is too tall */
  primaryLogoHeader: "/branding/arbroath_clean_logo_web_header_transparent.png",
  /** Generated clean icon — top bar, compact tiles, mobile fallback */
  primaryIcon: "/branding/arbroath_clean_icon_transparent.png",
  primaryLogoMedium: "/branding/arbroath_clean_logo_512_transparent.png",
  /** CSS/vector AGC badge — favicon-style fallback, not main shell identity */
  compactMark: {
    initials: "AGC",
    ariaLabel: "Arbroath Gymnastics Club",
  },
  /** Optional decoration — subtle accents only */
  glamLogo: {
    full: "/branding/arbroath_glam_logo_full_transparent.png",
    icon: "/branding/arbroath_glam_icon_transparent.png",
    header: "/branding/arbroath_glam_logo_web_header_transparent.png",
  },
  /** Reference banner artwork — dashboard hero and internal page headers */
  bannerArt: {
    dashboardHero: "/branding/banners/dashboard-glam-hero-art.png",
    pageHeader: "/branding/banners/page-glam-header-art.png",
  },
  /** Official detailed PNGs — reference/fallback only */
  officialLogo: {
    primary: "/branding/official/arbroath-logo.png",
    transparent: "/branding/official/arbroath-logo-transparent.png",
    whiteBg: "/branding/official/arbroath-logo-white-bg.png",
    medium: "/branding/official/arbroath-logo-512-transparent.png",
  },
} as const;

/** @deprecated Use brandAssets — kept for WebLogo component paths */
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
  official: brandAssets.officialLogo,
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
