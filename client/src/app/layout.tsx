import type { Metadata } from "next";
import { Geist, Geist_Mono, Germania_One, Merriweather } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const germaniaOne = Germania_One({
  weight: "400",
  variable: "--font-germania-one",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zayan Travel and Tour Consultants",
  description:
    "We offer a full range of travel and visa support services, including document preparation, appointments, reservations, and insurance guidance.",
  icons: {
    icon: "/zayanlogo.png",
    shortcut: "/zayanlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${germaniaOne.variable} ${merriweather.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
