"use client";

import { useUI } from "./UIProvider";
import { X, CalendarPlus, CheckCircle2, MapPin, Copy, Check } from "lucide-react";
import { InstagramIcon } from "./Icons";
import { useEffect, useState } from "react";

export default function ReservationConfirmationModal() {
  const { reservationTicket, reservationData, closeReservationTicket, addToast } = useUI();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !reservationTicket) return null;

  const data = reservationData || {
    code: reservationTicket,
    outlet: "Clavicula Slawi",
    date: new Date().toISOString().split("T")[0],
    time: "19:00 WIB",
    guests: 2,
    name: "Tamu Clavicula",
    phone: "",
    seating: "Indoor / Garden",
    notes: "",
  };

  const isGuci = data.outlet.toLowerCase().includes("guci");
  const igHandle = isGuci ? "clavicula_hills" : "clavicula_coffee";
  const igUrl = `https://ig.me/m/${igHandle}`;

  const messageText = `Halo Clavicula Coffee & Idea (@${igHandle})!
Saya ingin konfirmasi reservasi meja:
• Kode Booking: ${data.code}
• Nama: ${data.name}
• Outlet: ${data.outlet}
• Tanggal: ${data.date}
• Waktu: ${data.time}
• Jumlah Tamu: ${data.guests} Orang (${data.seating})
${data.phone ? `• Kontak: ${data.phone}\n` : ""}${data.notes ? `• Catatan Khusus: ${data.notes}\n` : ""}
Mohon bantuan konfirmasi ketersediaan meja. Terima kasih!`;

  const copyFormatToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      addToast("Format reservasi berhasil disalin ke clipboard! Silakan paste di DM Instagram.");
      setTimeout(() => setCopied(false), 3000);
      return true;
    } catch {
      return false;
    }
  };

  const handleInstagramConfirm = async () => {
    await copyFormatToClipboard();
    window.open(igUrl, "_blank");
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Reservasi Meja di ${data.outlet}`);
    const details = encodeURIComponent(
      `Booking Ref: ${data.code}\nNama: ${data.name}\nTamu: ${data.guests} orang\nArea: ${data.seating}`
    );
    const location = encodeURIComponent(
      isGuci
        ? "Clavicula Hills, Guci, Tuwel, Tegal"
        : "Clavicula Coffee & Idea, Jl. Dr. Soetomo No.3, Kalisapu, Slawi"
    );
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(calUrl, "_blank");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-espresso/80 backdrop-blur-md z-[100] transition-opacity duration-500 opacity-100"
        onClick={closeReservationTicket}
      />

      <div className="fixed inset-0 m-auto w-full max-w-md h-fit max-h-[92vh] overflow-y-auto bg-linen sm:rounded-[32px] shadow-2xl z-[110] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-100 scale-100 p-1">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={closeReservationTicket}
            className="p-2 rounded-full bg-white/70 backdrop-blur hover:bg-white transition-colors text-espresso"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-10 flex flex-col items-center text-center bg-white rounded-t-[30px] border-b border-dashed border-chestnut/30">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <span className="text-xs font-mono tracking-widest text-chestnut uppercase mb-1">
            Reservasi Berhasil Diajukan
          </span>
          <h3 className="text-2xl font-black text-espresso mb-2">Meja Anda Telah Dicatat</h3>
          <p className="text-xs text-espresso/70 mb-4 leading-relaxed">
            Langkah terakhir: Konfirmasikan kode booking ini langsung melalui DM Instagram resmi kami.
          </p>

          <div className="bg-vanilla/60 w-full p-4 rounded-2xl border border-chestnut/15 space-y-2 text-left text-xs mb-3">
            <div className="flex justify-between border-b border-chestnut/10 pb-1.5">
              <span className="text-espresso/60 font-mono">KODE RESERVASI</span>
              <span className="font-mono font-bold text-chestnut text-sm">{data.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Atas Nama</span>
              <span className="font-semibold text-espresso">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Outlet</span>
              <span className="font-semibold text-espresso flex items-center gap-1">
                <MapPin size={12} className="text-chestnut" /> {data.outlet}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Jadwal</span>
              <span className="font-semibold text-espresso">{data.date} &bull; {data.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-espresso/60">Jumlah Tamu</span>
              <span className="font-semibold text-espresso">{data.guests} Orang ({data.seating})</span>
            </div>
          </div>

          <div className="w-full bg-[#FAF5ED] border border-chestnut/15 rounded-xl p-3 text-[11px] text-espresso/75 text-left flex items-start gap-2">
            <span className="text-chestnut font-bold text-sm leading-none mt-0.5">ℹ</span>
            <span>
              Format rincian booking di atas akan otomatis disalin ke clipboard saat Anda menekan tombol di bawah. Anda tinggal <strong>Paste (Tempel)</strong> di DM Instagram.
            </span>
          </div>
        </div>

        <div className="p-6 bg-buttermilk/60 rounded-b-[30px] flex flex-col gap-3">
          {/* Main Action: DM Instagram */}
          <button
            onClick={handleInstagramConfirm}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-[0.98]"
          >
            <InstagramIcon className="w-5 h-5 text-white" />
            Konfirmasi via DM Instagram (@{igHandle})
          </button>

          {/* Secondary Action: Copy text manually if needed */}
          <button
            onClick={copyFormatToClipboard}
            className="w-full py-2.5 rounded-full bg-white border border-chestnut/20 text-espresso text-xs font-semibold flex items-center justify-center gap-2 hover:bg-vanilla transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span className="text-emerald-700">Format Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-chestnut" />
                <span>Salin Teks Format Booking</span>
              </>
            )}
          </button>

          {/* Calendar Action */}
          <button
            onClick={handleGoogleCalendar}
            className="w-full py-2 rounded-full text-chestnut text-xs font-medium flex items-center justify-center gap-1.5 hover:underline transition-colors pt-1"
          >
            <CalendarPlus size={14} /> Simpan ke Google Calendar
          </button>
        </div>
      </div>
    </>
  );
}
