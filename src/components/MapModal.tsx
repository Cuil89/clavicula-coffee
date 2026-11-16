"use client";

import { useUI } from "./UIProvider";
import { X, MapPin, Navigation, Compass, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MapModal() {
  const { isMapOpen, closeMap, selectedOutlet, setSelectedOutlet } = useUI();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"slawi" | "guci">(selectedOutlet);

  useEffect(() => {
    setMounted(true);
    setActiveTab(selectedOutlet);
  }, [selectedOutlet]);

  if (!mounted) return null;

  const outlets = {
    slawi: {
      title: "Clavicula Coffee & Idea (Slawi)",
      tagline: "The Urban Creative & Roastery Sanctuary",
      address: "Jl. Dr. Soetomo No. 3, RT 004/RW 006, Kalisapu, Kec. Slawi, Kab. Tegal, Jawa Tengah 52416",
      hours: "Setiap Hari: 08.00 — 23.00 WIB (Ngopi Pagi: 08.00 - 10.00)",
      features: ["Indoor AC Coworking", "Live Roastery Bar", "Garden Courtyard", "High-speed Wi-Fi", "Musholla & Parking"],
      mapsUrl: "https://maps.google.com/?q=Clavicula+Coffee+%26+Idea+Slawi",
      instagram: "@clavicula_coffee",
      igUrl: "https://www.instagram.com/clavicula_coffee/",
      image: "/assets/clavicula-slawi-interior.jpg",
    },
    guci: {
      title: "Clavicula Hills (Guci, Tuwel)",
      tagline: "Mountain Escape & Pine Breeze Sanctuary",
      address: "Jl. Obyek Wisata Guci, Tuwel, Kec. Bojong, Kab. Tegal, Jawa Tengah (Kawasan Wisata Guci)",
      hours: "Setiap Hari: 09.00 — 21.00 WIB (Udara Dingin Pegunungan)",
      features: ["Highland Pine Hill View", "Open-air Deck & Amphitheatre", "Warm Brews & Steaks", "Guci Hot Springs Nearby", "Cozy Sunset Point"],
      mapsUrl: "https://maps.google.com/?q=Clavicula+Hills+Guci+Tuwel",
      instagram: "@clavicula_hills",
      igUrl: "https://www.instagram.com/clavicula_hills/",
      image: "/assets/clavicula-hills-guci.jpg",
    },
  };

  const curr = outlets[activeTab];

  return (
    <>
      <div
        className={`fixed inset-0 bg-espresso/70 backdrop-blur-md z-[80] transition-opacity duration-500 ${
          isMapOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMap}
      />

      <div
        className={`fixed inset-0 m-auto w-full max-w-4xl h-[90vh] sm:h-[82vh] sm:rounded-[32px] bg-linen shadow-2xl z-[90] flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMapOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-white border-b border-chestnut/15">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-espresso border border-chestnut/30 shrink-0">
              <Image
                src="/assets/clavicula-logo.png"
                alt="Clavicula Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-espresso leading-none flex items-center gap-2">
                <MapPin size={18} className="text-chestnut" /> Lokasi Outlet Clavicula
              </h2>
              <span className="text-xs text-chestnut font-serif italic">Slawi &amp; Guci Hills, Tegal</span>
            </div>
          </div>
          <button
            onClick={closeMap}
            className="p-2 rounded-full hover:bg-chestnut/10 transition-colors text-espresso"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-vanilla/60 border-b border-chestnut/10 flex gap-2">
          <button
            onClick={() => {
              setActiveTab("slawi");
              setSelectedOutlet("slawi");
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "slawi"
                ? "bg-chestnut text-white shadow-sm"
                : "bg-white text-espresso/70 hover:bg-white/80 border border-chestnut/10"
            }`}
          >
            <Compass size={15} /> 1. Slawi (Kalisapu)
          </button>
          <button
            onClick={() => {
              setActiveTab("guci");
              setSelectedOutlet("guci");
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === "guci"
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-espresso/70 hover:bg-white/80 border border-chestnut/10"
            }`}
          >
            <Compass size={15} /> 2. Clavicula Hills (Guci)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 bg-linen">
          {/* Visual banner */}
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[240px] bg-espresso overflow-hidden">
            <Image
              src={curr.image}
              alt={curr.title}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase text-caramel mb-1">
                {activeTab === "slawi" ? "Urban & Roastery" : "Highland Retreat"}
              </span>
              <h3 className="text-xl md:text-2xl font-black">{curr.title}</h3>
              <p className="text-xs text-white/80 font-serif italic mt-1">{curr.tagline}</p>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chestnut mb-1 block">
                  Alamat Lengkap
                </span>
                <p className="text-sm md:text-base font-medium text-espresso leading-relaxed">
                  {curr.address}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chestnut mb-1 block">
                  Jam Operasional
                </span>
                <p className="text-sm text-espresso/80 font-medium">
                  {curr.hours}
                </p>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-chestnut mb-2 block">
                  Fasilitas &amp; Ambiance
                </span>
                <div className="flex flex-wrap gap-2">
                  {curr.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-vanilla text-espresso text-xs font-medium border border-chestnut/10"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-chestnut/10 flex flex-col sm:flex-row gap-3">
              <a
                href={curr.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-5 rounded-full bg-chestnut text-white text-xs md:text-sm font-medium hover:bg-chestnut/90 transition-all flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <Navigation size={16} /> Buka di Google Maps
              </a>
              <a
                href={curr.igUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 rounded-full border border-chestnut/30 text-espresso text-xs md:text-sm font-medium hover:bg-vanilla transition-all flex items-center justify-center gap-2 text-center"
              >
                <ExternalLink size={15} /> {curr.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
