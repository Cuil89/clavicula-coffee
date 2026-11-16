"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Compass } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

export default function SpacePage() {

  return (
    <main className="min-h-screen pt-28 pb-24 bg-linen">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/20 bg-vanilla px-4 py-1.5 mb-4 shadow-sm">
            <Compass size={14} className="text-chestnut" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold">
              DUAL SANCTUARY // SLAWI &amp; GUCI HILLS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-[76px] leading-[0.95] font-black tracking-tighter text-espresso mb-6">
            Dua Ruang, Satu Jiwa
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-espresso/70 max-w-3xl mx-auto leading-relaxed">
            Dari ruang cipta gagasan di pusat Slawi, hingga pesona kabut sejuk di pelataran Clavicula Hills Guci.
          </p>
        </div>

        {/* OUTLET 1: SLAWI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 bg-white rounded-[32px] p-6 md:p-12 border border-chestnut/15 shadow-warm-card">
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-md bg-espresso">
            <Image
              src="/assets/sanctuary-interior-arches.jpeg"
              alt="Clavicula Coffee & Idea Slawi"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-mono font-bold text-chestnut shadow-sm">
              OUTLET 01 // SLAWI (KALISAPU)
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-chestnut font-semibold uppercase mb-1 block">
                URBAN CREATIVE &amp; LIVE ROASTERY
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-espresso mb-4">
                Clavicula Coffee &amp; Idea (Slawi)
              </h2>
              <p className="text-sm md:text-base text-espresso/70 leading-relaxed mb-6 font-serif italic">
                &quot;Dirancang sebagai wadah bertukar pikiran. Interior berpadu tekstur bata ekspos alami, pencahayaan hangat yang menenangkan, serta aroma panggangan biji kopi sangrai dari roastery bar.&quot;
              </p>

              <div className="space-y-4 mb-8 text-xs md:text-sm text-espresso/80">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-chestnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso">Alamat Lengkap:</strong>
                    <span>Jl. Dr. Soetomo No. 3, RT 004/RW 006, Kalisapu, Kec. Slawi, Kabupaten Tegal, Jawa Tengah 52416</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-chestnut shrink-0" />
                  <div>
                    <strong className="text-espresso">Jam Operasional: </strong>
                    <span>08.00 &mdash; 23.00 WIB (Setiap Hari)</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["AC Coworking Room", "Stopkontak Tiap Meja", "Taman Outdoor Asri", "Live Roastery View", "Musholla & Parkir"].map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-3 py-1 rounded-full bg-vanilla text-espresso text-xs font-medium border border-chestnut/10"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-chestnut/10">
              <a
                href="https://maps.google.com/?q=Clavicula+Coffee+%26+Idea+Slawi"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-chestnut text-white text-xs font-semibold hover:bg-chestnut/90 transition-all shadow-sm"
              >
                Petunjuk Arah Google Maps →
              </a>
              <a
                href="https://www.instagram.com/clavicula_coffee/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full border border-chestnut/30 text-espresso text-xs font-medium hover:bg-vanilla transition-all flex items-center gap-1.5"
              >
                <InstagramIcon size={14} /> @clavicula_coffee
              </a>
            </div>
          </div>
        </div>

        {/* OUTLET 2: CLAVICULA HILLS (GUCI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 bg-espresso text-porcelain rounded-[32px] p-6 md:p-12 shadow-2xl overflow-hidden relative">
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-between z-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-emerald-400 font-semibold uppercase mb-1 block">
                HIGHLAND PINE &amp; MOUNTAIN MIST
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Clavicula Hills (Guci, Tuwel)
              </h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6 font-serif italic">
                &quot;Bertengger di kawasan perbukitan sejuk kaki Gunung Slamet. Menyeruput secangkir kopi panas atau menikmati Tomyam dan Steak hangat sembari memandang hamparan pinus berkabut.&quot;
              </p>

              <div className="space-y-4 mb-8 text-xs md:text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Alamat Lengkap:</strong>
                    <span>Jl. Obyek Wisata Guci, Tuwel, Kec. Bojong, Kab. Tegal, Jawa Tengah (Dekat Wisata Pemandian Air Panas Guci)</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-emerald-400 shrink-0" />
                  <div>
                    <strong className="text-white">Jam Operasional: </strong>
                    <span>09.00 &mdash; 21.00 WIB (Setiap Hari)</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Hawa Dingin Pegunungan", "Pemandangan Hutan Pinus", "Deck Terbuka & Amfiteater", "Dekat Pemandian Air Panas", "Spot Foto Aesthetic"].map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10"
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <a
                href="https://maps.google.com/?q=Clavicula+Hills+Guci+Tuwel"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-full bg-forest text-white text-xs font-semibold hover:bg-forest/90 transition-all shadow-sm"
              >
                Petunjuk Arah Google Maps →
              </a>
              <a
                href="https://www.instagram.com/clavicula_hills/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/30 text-white text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                <InstagramIcon size={14} /> @clavicula_hills
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-xl bg-espresso-soft z-10">
            <Image
              src="/assets/cafe-twilight-pavilion.jpeg"
              alt="Clavicula Hills Guci"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-forest text-white px-3.5 py-1 rounded-full text-xs font-mono font-bold shadow-sm">
              OUTLET 02 // GUCI HILLS (TUWEL)
            </div>
          </div>
        </div>

        {/* Reservation CTA */}
        <div className="text-center bg-vanilla/60 rounded-3xl p-10 border border-chestnut/15 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-black text-espresso mb-3">
            Rencanakan Kunjungan Anda
          </h3>
          <p className="text-sm md:text-base text-espresso/70 font-serif italic max-w-xl mx-auto mb-6">
            Ingin mengadakan pertemuan komunitas, reuni keluarga, atau sekadar memastikan meja ternyaman di sudut kafe favorit Anda?
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/reserve"
              className="px-8 py-3.5 rounded-full bg-chestnut text-white text-xs md:text-sm font-semibold hover:bg-chestnut/90 transition-all shadow-md"
            >
              Reservasi Meja Sekarang →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
