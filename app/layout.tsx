import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/src/data/site";
import { getGaId } from "@/src/lib/gtag";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "DetectAIvoice - AI Voice Detection & Deepfake Audio Guide",
  description:
    "Comprehensive guides, expert tool comparisons, and safety tips for detecting AI voice clones and deepfake audio in 2026.",
  openGraph: {
    title: "DetectAIvoice - AI Voice Detection Guide",
    description:
      "Learn how to detect AI voice scams. Expert tool comparisons, safety guides, and monthly updates.",
    url: siteConfig.url,
    type: "website",
    images: [siteConfig.ogImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "DetectAIvoice",
    description: "Your guide to detecting AI voice deepfakes",
    images: [siteConfig.ogImage]
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined
  }
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Wraps the entire application with shared metadata, analytics, and layout chrome.
 */
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const gaId = getGaId();

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
