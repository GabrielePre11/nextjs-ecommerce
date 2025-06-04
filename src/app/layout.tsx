import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const ralewayFont = Raleway({
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exclusive",
  description:
    "Discover high-quality, exclusive products in fashion, tech, and lifestyle. Shop smart with Exclusive – your destination for premium online shopping.",
  authors: [
    {
      name: "Gabriele Prestano",
      url: "www.linkedin.com/in/gabriele-prestano-70a346357",
    },
  ],
  keywords: [
    "ecommerce",
    "exclusive",
    "online store",
    "premium shopping",
    "fashion",
    "tech",
    "lifestyle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ralewayFont.variable} ${interFont.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
