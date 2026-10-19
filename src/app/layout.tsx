import type { Metadata } from "next";
import { Inter, Fraunces, Amiri, Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { LocaleProvider, noFlashLocaleScript } from "@/components/LocaleProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Dr. Bushra Mazen Haddadin | Cosmetic & Aesthetic Dentistry",
  description:
    "Dr. Bushra Mazen Haddadin — cosmetic dentistry, dental & oral surgery, botox, fillers, veneers and implants in Amman, Jordan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${amiri.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashLocaleScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileActionBar />
        </LocaleProvider>
      </body>
    </html>
  );
}
