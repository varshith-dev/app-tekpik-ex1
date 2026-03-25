import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TekPik - Pick Smarter. Buy Better.",
  description: "Honest reviews, budget picks, and expert buying guides for tech gadgets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>
          <main className="app-container">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}


