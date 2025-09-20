import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata, Viewport } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width, shrink-to-fit=no',
  minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <SessionProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
          <Toaster richColors position="top-center" />
        </SessionProvider>
      </body>
    </html>
  );
}
