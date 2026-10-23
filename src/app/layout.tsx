import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import BookingAssistant from "@/components/BookingAssistant";
import { LocaleProvider, noFlashLocaleScript } from "@/components/LocaleProvider";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const title = "Dr. Bushra Mazen Haddadin | Cosmetic & Aesthetic Dentistry in Amman";
const description =
  "Cosmetic dentistry, smile design, veneers, implants, oral surgery, botox and fillers with Dr. Bushra Mazen Haddadin in Amman, Jordan. Book your consultation on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Dr. Bushra Haddadin" },
  description,
  applicationName: "Dr. Bushra Haddadin",
  keywords: [
    "dentist Amman",
    "cosmetic dentist Jordan",
    "veneers Amman",
    "dental implants Amman",
    "teeth whitening Amman",
    "smile design",
    "botox fillers Amman",
    "طبيب أسنان عمان",
    "تجميل الأسنان",
    "فينير عمان",
    "زراعة أسنان",
    "د. بشرى الحدادين",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Dr. Bushra Haddadin",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["ar_JO"],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0c1c66",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${plexArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashLocaleScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className="bg-layer hero-deep-blue" aria-hidden />
        <LocaleProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileActionBar />
          <BookingAssistant />
        </LocaleProvider>
      </body>
    </html>
  );
}
