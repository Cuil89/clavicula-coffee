"use client";

import { useUI } from "./UIProvider";
import { X, CalendarPlus, MessageCircle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReservationConfirmationModal() {
  const { reservationTicket, closeReservationTicket } = useUI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-espresso/80 backdrop-blur-md z-[100] transition-opacity duration-500 ${reservationTicket ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeReservationTicket}
      />
      
      <div 
        className={`fixed inset-0 m-auto w-full max-w-md h-fit bg-linen sm:rounded-[32px] shadow-2xl z-[110] flex flex-col overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${reservationTicket ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-12 pointer-events-none"}`}
      >
        <div className="absolute top-4 right-4 z-10">
          <button onClick={closeReservationTicket} className="p-2 rounded-full bg-white/50 backdrop-blur hover:bg-white transition-colors text-espresso">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 flex flex-col items-center text-center border-b border-dashed border-chestnut/30 bg-white">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-sm font-mono tracking-widest text-chestnut uppercase mb-2">Sanctuary Secured</h2>
          <h3 className="text-3xl font-black text-espresso mb-6">Your Table is Ready</h3>
          
          <div className="bg-linen w-full py-4 rounded-xl border border-chestnut/10 mb-2">
            <div className="text-[10px] uppercase tracking-widest text-espresso/50 mb-1">Booking Reference</div>
            <div className="text-2xl font-mono text-espresso tracking-wider">{reservationTicket}</div>
          </div>
        </div>

        <div className="p-8 bg-buttermilk flex flex-col gap-4">
          <button className="w-full py-4 rounded-full bg-white border border-chestnut/20 text-chestnut font-medium flex items-center justify-center gap-2 hover:border-chestnut transition-colors shadow-sm">
            <CalendarPlus size={18} /> Add to Google Calendar
          </button>
          <button className="w-full py-4 rounded-full bg-[#25D366] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-sm">
            <MessageCircle size={18} /> Send WhatsApp Confirmation
          </button>
        </div>
      </div>
    </>
  );
}
