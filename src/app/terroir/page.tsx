"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

export default function TerroirPage() {

  return (
    <main className="min-h-screen pt-28 pb-24 bg-vanilla/40">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/20 bg-white px-4 py-1.5 mb-4 shadow-sm">
          <Flame size={14} className="text-chestnut" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold">
            ROASTERY CRAFT &amp; NUSANTARA ORIGINS
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-[76px] leading-[0.95] font-black tracking-tighter text-espresso mb-6">
          The Clavicula Roastery
        </h1>
        <p className="text-xl md:text-2xl font-serif italic text-espresso/70 max-w-3xl mx-auto leading-relaxed">
          &quot;Menghubungkan terroir terbaik nusantara dengan sains penyangraian presisi di Slawi, Tegal.&quot;
        </p>
      </div>

      {/* Video Loop & Drum Roaster Section */}
      <div className="w-full bg-espresso text-porcelain py-24 px-4 md:px-8 relative overflow-hidden mb-24">
        <div className="absolute inset-0 opacity-20">
          <video
            src="/assets/video-roaster-cooling.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-xs font-mono tracking-widest text-caramel uppercase mb-2 block">
              PRESISI EKSTRAKSI &amp; ROASTING
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dedikasi di Balik Mesin Sangrai
            </h2>
            <p className="text-base text-linen/80 mb-6 font-serif italic leading-relaxed">
              &quot;Dengan latar belakang medis, kami memandang penyangraian kopi seperti ilmu kinetika kimia dan biologis murni—mengontrol kurva panas, airflow, dan Maillard reaction untuk mengeluarkan karakter asli tanah tempat biji itu tumbuh.&quot;
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-caramel uppercase mb-1">
                  BATCH UKURAN
                </div>
                <div className="text-2xl font-black">Small-Batch</div>
                <div className="text-xs text-white/50">Terkontrol detail</div>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest text-caramel uppercase mb-1">
                  DEV TIME RATIO
                </div>
                <div className="text-2xl font-black">15 - 18%</div>
                <div className="text-xs text-white/50">Sweetness optimal</div>
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-widest text-caramel uppercase mb-1">
                  ORIGIN LOTS
                </div>
                <div className="text-2xl font-black">100% Arabica</div>
                <div className="text-xs text-white/50">&amp; Fine Robusta</div>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <Image
              src="/assets/roasting-craft-flame.jpeg"
              alt="Clavicula Flame Roaster"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Origin Details */}
      <div className="mx-auto max-w-6xl px-4 md:px-8 space-y-24 mb-24">
        {/* Lot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <span className="text-xs font-mono text-chestnut font-semibold uppercase tracking-widest block mb-2">
              01 // LERENG GUNUNG SINDORO
            </span>
            <h3 className="text-3xl font-black text-espresso mb-3">
              Java Sindoro Honey Process
            </h3>
            <p className="text-sm md:text-base text-espresso/70 leading-relaxed mb-5">
              Ditanam di ketinggian 1.450 mdpl pada tanah vulkanik subur Jawa Tengah. Proses pascapanen honey mempertahankan getah manis buah kopi saat penjemuran di bawah sinar matahari, membuahkan aroma madu hutan pekat, buah aprikot lembut, dan keasaman seimbang.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-chestnut">
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Proses: Yellow Honey</span>
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Varietas: Kartika &amp; Sigarar Utang</span>
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Roast: Medium-Light</span>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[360px] rounded-3xl overflow-hidden shadow-warm-card border border-chestnut/15 bg-white">
            <Image
              src="/assets/roastery-pouches-lineup.jpeg"
              alt="Java Sindoro Honey"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Lot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative h-[360px] rounded-3xl overflow-hidden shadow-warm-card border border-chestnut/15 bg-white">
            <Image
              src="/assets/hero-sunlit-hearth.jpeg"
              alt="Sumatra Gayo Lot"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-mono text-chestnut font-semibold uppercase tracking-widest block mb-2">
              02 // DATARAN TINGGI GAYO
            </span>
            <h3 className="text-3xl font-black text-espresso mb-3">
              Sumatra Gayo Anaerobic Natural
            </h3>
            <p className="text-sm md:text-base text-espresso/70 leading-relaxed mb-5">
              Berasal dari kebun rakyat di Takengon, Aceh Tengah pada ketinggian 1.600 mdpl. Proses fermentasi ceri kopi dalam tabung tertutup rapat tanpa oksigen (anaerobic) memicu kompleksitas aroma buah beri ungu, rempah harum, serta keasaman sparkling yang memikat saat diseduh V60.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-chestnut">
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Proses: Anaerobic Natural</span>
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Notes: Blackberry, Winey, Jasmine</span>
              <span className="px-3 py-1 rounded-full bg-white border border-chestnut/20">Metode: Hario V60 / Aeropress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Brew Method Guide */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 py-16 bg-white rounded-[32px] border border-chestnut/15 shadow-warm-card">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-chestnut font-semibold mb-2 block">
            MANUAL BREW BAR CLAVICULA
          </span>
          <h2 className="text-3xl font-black text-espresso mb-3">5 Metode Seduh Manual</h2>
          <p className="text-sm text-espresso/70 font-serif italic max-w-xl mx-auto">
            Setiap metode menghadirkan sudut pandang rasa yang berbeda dari biji kopi yang sama.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { name: "Hario V60", price: "26K / 32K", desc: "Filter kertas kerucut mengalirkan ekstraksi jernih dengan keasaman buah menonjol." },
            { name: "Aeropress", price: "28K", desc: "Tekanan silinder manual menghasilkan cangkir kaya rasa, bodi tebal, dan bebas endapan." },
            { name: "French Press", price: "20K", desc: "Perendaman penuh (immersion) mengekstraksi minyak alami kopi secara maksimal." },
            { name: "Vietnam Drip", price: "24K", desc: "Tetes lambat kental berpadu legitnya susu kental manis di dasar gelas." },
            { name: "Kopi Tubruk", price: "18K", desc: "Seduhan langsung tanpa saringan khas Nusantara, aromatik dan menghangatkan jiwa." },
          ].map((m, idx) => (
            <div key={idx} className="bg-linen p-5 rounded-2xl border border-chestnut/10 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-chestnut font-bold mb-1">0{idx + 1}</div>
                <h4 className="font-bold text-espresso text-base mb-2">{m.name}</h4>
                <p className="text-xs text-espresso/60 leading-relaxed mb-4">{m.desc}</p>
              </div>
              <div className="pt-2 border-t border-chestnut/10 text-xs font-bold text-chestnut">
                Mulai {m.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center pt-8 border-t border-chestnut/10">
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-chestnut text-white text-xs md:text-sm font-semibold hover:bg-chestnut/90 transition-all shadow-md"
          >
            Reservasi Meja &amp; Coffee Tasting Session <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
