import type { Metadata } from "next";
import { Inter, Manrope, Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ChatAssistant from "@/components/ChatAssistant";
import { LocaleProvider, noFlashLocaleScript } from "@/components/LocaleProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
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
      className={`${inter.variable} ${manrope.variable} ${cairo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashLocaleScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ChatAssistant />
        </LocaleProvider>
      </body>
    </html>
  );
}
