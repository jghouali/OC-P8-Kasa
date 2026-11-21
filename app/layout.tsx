import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Providers from "./components/Provider";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kasa",
  description: "Location d’appartements et de maisons entre particuliers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} scrollbar-gutter-both`}
    >
      <body className="flex flex-col min-h-screen md:pt-10">
        <Providers>
          <Menu />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
