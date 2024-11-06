import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBarComponent from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";
import { Providers } from "./Providers";
import { SearchProvider } from "@/context/SearchContext";
import FullScreenLoader from "@/components/FullScreenLoading/FullScreenLoaging";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FitZone",
  description: "Your fitness journey starts here",
  icons: {
    icon: "/favicon.ico?v=4",
    apple: "/apple-touch-icon.png?v=4",
    shortcut: "/apple-touch-icon.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>FitZone</title>
        <meta name="description" content="Your fitness journey starts here" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <SearchProvider>
          <Providers>
            <NavBarComponent />
            <FullScreenLoader />
            <div className="flex-grow pt-24">{children}</div>
            <Footer />
          </Providers>
        </SearchProvider>
      </body>
    </html>
  );
}
