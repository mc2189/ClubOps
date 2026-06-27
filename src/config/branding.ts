/** Arbroath Gymnastics Club — demo branding (public demo only, fake data) */

export const clubName = "Arbroath Gymnastics Club";

export const clubShortName = "Arbroath Gymnastics";

export const productName = "ClubOps";

export const clubTagline = "Volunteer club management — demo for Arbroath Gymnastics Club";

export const clubLocation = "Arbroath, Scotland";

/**
 * Brand asset roles — keep UI shell (app mark) separate from presentation logos.
 */
export const brandAssets = {
  /** CSS/vector compact mark for sidebar, dashboard shell, settings */
  appMark: {
    initials: "AGC",
    ariaLabel: "Arbroath Gymnastics Club",
  },
  /** Full generated logos — demo, reports, export/presentation headers only */
  fullLogo: {
    clean: "/branding/arbroath_clean_logo_full_transparent.png",
    cleanMedium: "/branding/arbroath_clean_logo_512_transparent.png",
    cleanIcon: "/branding/arbroath_clean_icon_transparent.png",
  },
  /** Optional decoration — subtle accents, not primary nav branding */
  glamLogo: {
    full: "/branding/arbroath_glam_logo_full_transparent.png",
    icon: "/branding/arbroath_glam_icon_transparent.png",
  },
  /** Official detailed PNGs — reference/fallback only, not used in main shell */
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
    icon: brandAssets.fullLogo.cleanIcon,
    full: brandAssets.fullLogo.clean,
    medium: brandAssets.fullLogo.cleanMedium,
  },
  glam: {
    full: brandAssets.glamLogo.full,
    icon: brandAssets.glamLogo.icon,
  },
  official: brandAssets.officialLogo,
} as const;

export type WebLogoVariant =
  | "clean-icon"
  | "clean-full"
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
