import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "sweetalert2/src/sweetalert2.scss";
import { Providers } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Sistema de información para primera infancia",
  description: "Sistema de información para primera infancia"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="es" className="light">
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
