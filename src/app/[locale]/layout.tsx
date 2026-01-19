import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getCurrentBrand } from '@/config/brands';
import { locales } from '@/i18n/config';
import "../globals.css";
import { Providers } from "../providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Next.js app with brand theming and i18n",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get brand configuration
  const brand = getCurrentBrand();

  // Get messages for the locale
  const messages = await getMessages();

  // Convert brand colors to CSS variables as a style object
  const themeStyle = {
    '--brand-primary': brand.primaryColor,
    '--brand-secondary': brand.secondaryColor,
    '--brand-accent': brand.accentColor,
  } as React.CSSProperties;

  return (
    <html lang={locale} style={themeStyle}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

