"use client";

import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useUI } from "@/components/UIProvider";

export default function ReservePage() {
  const { openReservationTicket, addToast, specialRequest } = useUI();
  const [outlet, setOutlet] = useState<"Clavicula Slawi" | "Clavicula Hills (Guci)">("Clavicula Slawi");
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState("19:00 WIB (Evening Sanctuary)");
  const [seating, setSeating] = useState("Indoor AC (Idea Room)");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      addToast("Mohon isi nama dan nomor WhatsApp Anda.");
      return;
    }
    const code = `CLAVI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    openReservationTicket(code, {
      code,
      outlet,
      date,
      time: selectedTime,
      guests: selectedGuests,
      name,
      phone,
      seating,
      notes: notes || specialRequest,
    });
  };

  return (
    <main className="min-h-screen pt-28 pb-24 bg-linen flex items-center justify-center">
      <div className="w-full max-w-3xl px-4 md:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/20 bg-vanilla px-4 py-1.5 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-chestnut"></span>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold">
              LAYANAN RESERVASI ONLINE
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-espresso mb-3">
            Reservasi Meja Clavicula
          </h1>
          <p className="text-base md:text-lg font-serif italic text-espresso/70">
            Amankan meja di Slawi maupun Clavicula Hills Guci untuk waktu terbaik Anda.
          </p>
        </div>

        <form
          onSubmit={handleReservation}
          className="rounded-[32px] bg-white p-6 md:p-12 shadow-warm-card border border-chestnut/15 space-y-8"
        >
          {/* Outlet Selection */}
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-3 font-semibold">
              01 / PILIH OUTLET TUJUAN
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Clavicula Slawi" as const, loc: "Jl. Dr. Soetomo, Kalisapu", badge: "Urban & Roastery" },
                { name: "Clavicula Hills (Guci)" as const, loc: "Jl. Obyek Wisata Guci, Tuwel", badge: "Mountain Pine View" },
              ].map((out) => (
                <button
                  type="button"
                  key={out.name}
                  onClick={() => setOutlet(out.name)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    outlet === out.name
                      ? "border-chestnut bg-vanilla/60 text-espresso shadow-sm"
                      : "border-chestnut/15 text-espresso/70 hover:border-chestnut/30 bg-linen/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-espresso">{out.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-chestnut/20 text-chestnut font-semibold">
                      {out.badge}
                    </span>
                  </div>
                  <span className="text-xs text-espresso/60 flex items-center gap-1">
                    <MapPin size={12} className="text-chestnut" /> {out.loc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
                02 / TANGGAL
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-linen/50 border border-chestnut/20 rounded-xl px-4 py-3 text-sm font-semibold text-espresso focus:outline-none focus:border-chestnut transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
                03 / JUMLAH TAMU
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 4, 6, "8+ Grup"].map((num) => (
                  <button
                    type="button"
                    key={String(num)}
                    onClick={() => setSelectedGuests(typeof num === "number" ? num : 8)}
                    className={`flex-1 py-3 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                      selectedGuests === num || (num === "8+ Grup" && selectedGuests >= 8)
                        ? "border-chestnut bg-chestnut text-white shadow-sm"
                        : "border-chestnut/20 text-espresso/80 hover:border-chestnut/40 bg-linen/50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-3 font-semibold">
              04 / PILIHAN WAKTU KEDATANGAN
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { time: "08:30 WIB (Ngopi Pagi)", note: "Promo 12K - 20K Berlaku" },
                { time: "12:30 WIB (Siang / Lunch)", note: "Menu Steak & Noodle Lengkap" },
                { time: "15:30 WIB (Ngopi Sore)", note: "Promo Sore & Sunset Santai" },
                { time: "19:00 WIB (Evening Sanctuary)", note: "Ambiance Malam Tenang" },
              ].map((slot) => (
                <button
                  type="button"
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedTime === slot.time
                      ? "border-chestnut bg-chestnut/10 text-chestnut font-bold shadow-sm"
                      : "border-chestnut/15 text-espresso/80 hover:border-chestnut/30 bg-linen/50"
                  }`}
                >
                  <div className="text-xs font-bold text-espresso">{slot.time}</div>
                  <div className="text-[11px] text-espresso/60">{slot.note}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Seating Area */}
          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
              05 / PILIHAN AREA DUDUK
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                "Indoor AC (Idea Room)",
                "Roastery Bar",
                "Taman Outdoor",
                outlet.includes("Guci") ? "Highland Deck" : "VIP Corner",
              ].map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => setSeating(area)}
                  className={`py-2.5 px-3 rounded-xl border font-medium transition-all text-center ${
                    seating === area
                      ? "border-chestnut bg-chestnut text-white shadow-sm font-bold"
                      : "border-chestnut/20 text-espresso/70 hover:border-chestnut/40 bg-linen/50"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4 border-t border-chestnut/15">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
                  Nama Tamu *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Farhan / Dimas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-linen/50 border border-chestnut/20 rounded-xl px-4 py-3 text-sm text-espresso focus:outline-none focus:border-chestnut transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-linen/50 border border-chestnut/20 rounded-xl px-4 py-3 text-sm text-espresso focus:outline-none focus:border-chestnut transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-espresso/60 mb-2 font-semibold">
                Catatan Khusus / Permintaan
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Butuh meja dekat colokan laptop, atau persiapan tasting V60..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-linen/50 border border-chestnut/20 rounded-xl p-4 text-xs text-espresso focus:outline-none focus:border-chestnut transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-full bg-chestnut hover:bg-chestnut/90 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            Ajukan Reservasi Meja <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
