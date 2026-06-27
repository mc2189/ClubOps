/** Arbroath Gymnastics Club — demo branding (public demo only, fake data) */

export const clubName = "Arbroath Gymnastics Club";

export const clubShortName = "Arbroath Gymnastics";

export const productName = "ClubOps";

export const clubTagline = "Volunteer club management — demo for Arbroath Gymnastics Club";

export const clubLocation = "Arbroath, Scotland";

/** Web-friendly generated logos — primary brand assets */
export const logoPaths = {
  clean: {
    icon: "/branding/arbroath_clean_icon_transparent.png",
    full: "/branding/arbroath_clean_logo_full_transparent.png",
    medium: "/branding/arbroath_clean_logo_512_transparent.png",
  },
  glam: {
    full: "/branding/arbroath_glam_logo_full_transparent.png",
    icon: "/branding/arbroath_glam_icon_transparent.png",
  },
  /** Official detailed PNGs — reference/fallback only, not used in main shell */
  official: {
    primary: "/branding/official/arbroath-logo.png",
    transparent: "/branding/official/arbroath-logo-transparent.png",
    whiteBg: "/branding/official/arbroath-logo-white-bg.png",
    medium: "/branding/official/arbroath-logo-512-transparent.png",
  },
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
