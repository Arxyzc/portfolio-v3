import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://andre-tiburcio.vercel.app/";
const title = "Andre Tiburcio — Full-Stack Developer";
const description =
  "Portfolio de un developer full-stack: interfaces, APIs y la infraestructura que las sostiene.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Andre Tiburcio",
  },
  description,
  keywords: [
    "Andre Tiburcio Tiburcio",
    "Full-Stack Developer",
    "Frontend",
    "Backend",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Andre Tiburcio Tiburcio Melchor" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "Andre Tiburcio",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

// Fija el tema antes del primer paint para evitar el flash en SSR.
const themeScript = `(function(){try{var t=localStorage.getItem('rivera-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}