import type { Metadata } from "next";
import "./globals.css";
import { clubName, productName } from "@/config/branding";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: `${productName} — ${clubName} Demo`,
  description: `Demo club management for ${clubName}. Fake data only — safe for public demonstration.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
