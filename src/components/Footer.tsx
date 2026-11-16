"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, MapPin, ExternalLink } from "lucide-react";
import { InstagramIcon } from "./Icons";
import { useUI } from "./UIProvider";

export default function Footer() {
  const { openMap, openReservationTicket, addToast, specialRequest } = useUI();
  const [selectedOutletForm, setSelectedOutletForm] = useState<"Clavicula Slawi" | "Clavicula Hills (Guci)">("Clavicula Slawi");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("19:00 WIB (Evening Chill)");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast("Mohon lengkapi nama dan kontak Anda.");
      return;
    }
    const code = `CLAVI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    openReservationTicket(code, {
      code,
      outlet: selectedOutletForm,
      date,
      time: selectedTime,
      guests: selectedGuests,
      name,
      phone,
      notes: specialRequest || "Reservasi reguler",
    });
  };

  return (
    <footer className="w-full bg-espresso text-porcelain px-4 py-20 md:py-28" id="reservation-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">
          {/* Left Column: Brand & Locations */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-espresso border border-white/20 shadow-md">
                <Image
                  src="/assets/clavicula/logo/logo-clavicula.webp"
                  alt="Clavicula Coffee & Idea"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-2xl tracking-tight text-white leading-tight">CLAVICULA</h3>
                <span className="text-xs font-serif italic text-caramel">Coffee &amp; Idea — Slawi &amp; Guci</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/80">
                OPEN DAILY // 2 SANCTUARIES ACTIVE
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight mb-4 text-white">
              The Clavicula Sanctuary
            </h2>

            <p className="text-base md:text-lg text-white/70 max-w-[45ch] mb-10 font-serif italic leading-relaxed">
              &quot;Menghubungkan ide, rasa kopi spesialti, dan ketenangan manusiawi. Dari ketenangan arsitektur Slawi hingga semilir pinus sejuk Clavicula Hills Guci.&quot;
            </p>

            {/* Outlets Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-sm text-white/80 border-t border-white/10 pt-8 mb-8">
              <div className="space-y-2 border-l border-chestnut/50 pl-4">
                <span className="text-xs font-mono uppercase tracking-wider text-caramel block">01 / SLAWI ROASTERY</span>
                <strong className="block text-white font-medium">Clavicula Coffee &amp; Idea</strong>
                <p className="text-xs text-white/60 leading-relaxed">
                  Jl. Dr. Soetomo No. 3, Kalisapu, Slawi, Kab. Tegal
                </p>
                <p className="text-xs text-white/80 font-mono">Buka: 08.00 &mdash; 23.00 WIB</p>
              </div>

              <div className="space-y-2 border-l border-forest pl-4">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block">02 / GUCI HILLS</span>
                <strong className="block text-white font-medium">Clavicula Hills (Highland)</strong>
                <p className="text-xs text-white/60 leading-relaxed">
                  Jl. Obyek Wisata Guci, Tuwel, Bojong, Kab. Tegal
                </p>
                <p className="text-xs text-white/80 font-mono">Buka: 09.00 &mdash; 21.00 WIB</p>
              </div>
            </div>

            {/* Interactive Map Button */}
            <button
              onClick={openMap}
              className="group flex items-center gap-3 text-sm font-medium hover:text-caramel transition-colors"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/20 group-hover:border-caramel transition-colors flex items-center justify-center shrink-0 bg-white/5">
                <Image
                  src="/assets/cafe-twilight-pavilion.jpeg"
                  alt="Sanctuary Map Preview"
                  fill
                  className="object-cover object-center opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <MapPin size={16} className="relative z-10 text-white drop-shadow-md" />
              </div>
              <div className="text-left">
                <span className="block text-white group-hover:text-caramel transition-colors font-bold">
                  Buka Peta Interaktif &amp; Rute
                </span>
                <span className="text-xs text-white/50">Navigasi ke Slawi &amp; Guci Hills</span>
              </div>
            </button>
          </div>

          {/* Right Column: Reservation Card */}
          <div className="relative">
            <form
              onSubmit={handleReservation}
              className="rounded-[28px] bg-[#1E1C1A] p-6 md:p-10 border border-white/10 shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-black text-white">Reservasi Meja</h3>
                  <p className="text-xs text-caramel font-serif italic mt-0.5">Amankan tempat untuk diskusi, santai, atau kumpul</p>
                </div>
                <div className="p-2 rounded-full bg-white/5 text-caramel">
                  <MapPin size={20} />
                </div>
              </div>

              <div className="space-y-6">
                {/* Outlet Selection */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                    Pilih Outlet
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Slawi (Kalisapu)", val: "Clavicula Slawi" as const },
                      { label: "Guci Hills (Tuwel)", val: "Clavicula Hills (Guci)" as const },
                    ].map((out) => (
                      <button
                        type="button"
                        key={out.val}
                        onClick={() => setSelectedOutletForm(out.val)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all text-center ${
                          selectedOutletForm === out.val
                            ? "border-caramel bg-caramel/20 text-caramel font-bold shadow-sm"
                            : "border-white/10 text-white/70 hover:border-white/30 bg-white/5"
                        }`}
                      >
                        {out.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                    Tanggal Kedatangan
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-caramel transition-colors cursor-pointer"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                    Jumlah Tamu
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 4, 6, "8+ Grup"].map((num) => (
                      <button
                        type="button"
                        key={String(num)}
                        onClick={() => setSelectedGuests(typeof num === "number" ? num : 8)}
                        className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                          selectedGuests === num || (num === "8+ Grup" && selectedGuests >= 8)
                            ? "border-caramel bg-caramel text-espresso font-bold shadow-sm"
                            : "border-white/10 text-white/80 hover:border-white/30 bg-white/5"
                        }`}
                      >
                        {num} {typeof num === "number" ? "Orang" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                    Pilihan Waktu
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "08:30 WIB Ngopi Pagi",
                      "13:00 WIB Lunch & Cowork",
                      "16:00 WIB Sunset & Mocktail",
                      "19:00 WIB Evening Sanctuary",
                    ].map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2.5 rounded-xl border text-left text-xs transition-all font-medium ${
                          selectedTime === time
                            ? "border-caramel bg-caramel/15 text-caramel font-bold"
                            : "border-white/10 text-white/70 hover:border-white/30 bg-white/5"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Raditya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-caramel transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-white/60 mb-2">
                      Kontak / Akun Instagram
                    </label>
                    <input
                      type="text"
                      placeholder="0812-xxxx / @username"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-caramel transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-caramel hover:bg-caramel/90 text-espresso font-bold text-sm transition-transform active:scale-[0.98] shadow-lg flex items-center justify-center gap-2 mt-4"
                >
                  Konfirmasi Reservasi Meja <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-caramel transition-colors"
            >
              <InstagramIcon size={15} /> Instagram: @clavicula_coffee (Slawi)
            </a>
            <a
              href="https://www.instagram.com/clavicula_hills/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-caramel transition-colors"
            >
              <InstagramIcon size={15} /> Instagram: @clavicula_hills (Guci)
            </a>
            <a
              href="https://linktr.ee/claviculacoffee"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/80 hover:text-caramel transition-colors"
            >
              <ExternalLink size={15} /> Linktree &amp; Order
            </a>
          </div>

          <p className="font-mono text-center md:text-right">
            &copy; {new Date().getFullYear()} Clavicula Coffee &amp; Idea. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
