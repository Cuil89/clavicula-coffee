import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UIProvider } from "@/components/UIProvider";
import ToastContainer from "@/components/ToastContainer";
import CartDrawer from "@/components/CartDrawer";
import MapModal from "@/components/MapModal";
import ReservationConfirmationModal from "@/components/ReservationConfirmationModal";
import PickupTicketModal from "@/components/PickupTicketModal";
import TopAnnouncementBar from "@/components/TopAnnouncementBar";
import FloatingCartButton from "@/components/FloatingCartButton";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["italic"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Clavicula Roastery & Craft | Pesan di Web, Bayar di Outlet Slawi & Guci",
  description:
    "Pusat sangrai biji kopi nusantara Clavicula Coffee (Slawi & Guci Hills). Pesan roast bean RB-01 s.d. RB-04 Rp 0 di web, bayar saat ambil di kasir tanpa biaya admin.",
  icons: {
    icon: "/assets/clavicula/logo/logo-clavicula.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} ${bricolage.variable} ${dmSans.variable} font-sans bg-linen text-espresso antialiased`}
      >
        <UIProvider>
          <TopAnnouncementBar />
          <SmoothScrolling>
            <Navbar />
            {children}
            <Footer />
          </SmoothScrolling>
          <ToastContainer />
          <CartDrawer />
          <MapModal />
          <ReservationConfirmationModal />
          <PickupTicketModal />
          <FloatingCartButton />
        </UIProvider>
      </body>
    </html>
  );
}
