"use client";

import { useUI } from "./UIProvider";
import { X, CalendarPlus, MessageCircle, CheckCircle2, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReservationConfirmationModal() {
  const { reservationTicket, reservationData, closeReservationTicket } = useUI();
  const [mounted, setMounted] = useState(false);

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

  const handleWhatsAppConfirm = () => {
    const text = `Halo Clavicula Coffee & Idea!%0ASaya telah membuat reservasi meja:%0A- Kode Booking: *${data.code}*%0A- Nama: *${data.name}*%0A- Outlet: *${data.outlet}*%0A- Tanggal: *${data.date}*%0A- Waktu: *${data.time}*%0A- Jumlah Tamu: *${data.guests} Orang*%0A- Area: *${data.seating}*%0A${data.notes ? `- Catatan: ${data.notes}%0A` : ""}%0AMohon konfirmasi reservasinya. Terima kasih!`;
    const waUrl = `https://wa.me/6287733444426?text=${text}`;
    window.open(waUrl, "_blank");
  };

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`Reservasi Meja di ${data.outlet}`);
    const details = encodeURIComponent(
      `Booking Ref: ${data.code}\nNama: ${data.name}\nTamu: ${data.guests} orang\nArea: ${data.seating}`
    );
    const location = encodeURIComponent(
      data.outlet.includes("Guci")
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
          <h3 className="text-2xl font-black text-espresso mb-4">Meja Anda Telah Dicatat</h3>

          <div className="bg-vanilla/60 w-full p-4 rounded-2xl border border-chestnut/15 space-y-2 text-left text-xs">
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
        </div>

        <div className="p-6 bg-buttermilk/60 rounded-b-[30px] flex flex-col gap-3">
          <button
            onClick={handleWhatsAppConfirm}
            className="w-full py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle size={18} /> Konfirmasi ke WhatsApp Clavicula
          </button>
          <button
            onClick={handleGoogleCalendar}
            className="w-full py-3 rounded-full bg-white border border-chestnut/20 text-chestnut text-xs font-medium flex items-center justify-center gap-2 hover:border-chestnut transition-colors shadow-sm"
          >
            <CalendarPlus size={16} /> Simpan ke Google Calendar
          </button>
        </div>
      </div>
    </>
  );
}
