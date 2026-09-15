import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UIProvider } from "@/components/UIProvider";
import ToastContainer from "@/components/ToastContainer";
import CartDrawer from "@/components/CartDrawer";
import MapModal from "@/components/MapModal";
import ReservationConfirmationModal from "@/components/ReservationConfirmationModal";

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

export const metadata: Metadata = {
  title: "Maison Brew | Terre & Crème",
  description: "Luxury Specialty Coffee Roastery, Artisanal Viennoiserie & Architectural Sanctuary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${instrumentSerif.variable} font-sans bg-linen text-espresso antialiased`}
      >
        <UIProvider>
          <SmoothScrolling>
            <Navbar />
            {children}
            <Footer />
          </SmoothScrolling>
          <ToastContainer />
          <CartDrawer />
          <MapModal />
          <ReservationConfirmationModal />
        </UIProvider>
      </body>
    </html>
  );
}
