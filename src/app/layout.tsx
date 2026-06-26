import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClubOps — Club Management Demo",
  description:
    "Demo-first club management application for volunteer-run sports clubs. Fake data only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
