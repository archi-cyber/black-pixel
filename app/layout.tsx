import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Pixel — Studio de production audiovisuelle | Douala, Cameroun",
  description:
    "Black Pixel est un studio de production audiovisuelle basé à Douala : montage vidéo, photographie, réalisation, couverture événementielle, clips et formations. Réservez votre prestation en ligne.",
  keywords: [
    "Black Pixel",
    "studio photo Douala",
    "vidéaste Cameroun",
    "montage vidéo Douala",
    "photographe mariage Cameroun",
    "production audiovisuelle Douala",
    "réservation événement Douala",
  ],
  openGraph: {
    title: "Black Pixel — La précision au service de la créativité",
    description:
      "Studio de production audiovisuelle à Douala : vidéo, photo, événementiel, formations. Réservez en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${plex.variable}`}>
      <body className="font-body bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}
