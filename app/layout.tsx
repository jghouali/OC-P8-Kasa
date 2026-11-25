import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Providers from "./components/Provider";
import { cachedGetProperties } from "./lib/properties";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kasa",
  description: "Location d’appartements et de maisons entre particuliers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  void cachedGetProperties()

  return (
    <html
      lang="fr"
      className={`${inter.variable} scrollbar-thin scrollbar-thumb-kasa-main-red scrollbar-track-transparent scrollbar-gutter-stable`}
    >
      <body className="flex flex-col min-h-screen lg:pt-10">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-kasa-main-red"
        >
          Aller au contenu
        </a>
        <Providers>
          <Menu />
          <main id="contenu" className="flex-1">
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
