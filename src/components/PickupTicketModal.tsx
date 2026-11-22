"use client";

import { useUI } from "./UIProvider";
import {
  X,
  MessageCircle,
  Printer,
  MapPin,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  UtensilsCrossed,
  PackageCheck,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { formatRupiah, printReceiptWindow } from "@/utils/receiptGenerator";

export default function PickupTicketModal() {
  const { pickupOrder, closePickupTicket, addToast } = useUI();
  const [copied, setCopied] = useState(false);

  if (!pickupOrder) return null;

  const isSlawi = pickupOrder.outlet === "Slawi";

  // Build structured WhatsApp confirmation message
  const whatsappUrl = `https://wa.me/6287733444426?text=${encodeURIComponent(
    `*PESANAN BAYAR DI OUTLET — CLAVICULA COFFEE*\n` +
      `Kode Pickup: *${pickupOrder.pickupCode}*\n` +
      `Status: *MENUNGGU KONFIRMASI KASIR*\n\n` +
      `👤 *Nama Pemesan:* ${pickupOrder.customerName}\n` +
      `📱 *No. WhatsApp:* ${pickupOrder.customerPhone}\n` +
      `📍 *Cabang:* ${isSlawi ? "Cabang 01 Slawi (Roastery HQ & Slow Bar)" : "Cabang 02 Guci (Highland Sanctuary)"}\n` +
      `🏷️ *Tipe Pesanan:* ${pickupOrder.orderTypeLabel || "Ambil di Kasir (Pick-Up)"}\n` +
      `⏰ *Waktu Ambil:* ${pickupOrder.pickupTimeLabel}\n\n` +
      `📋 *Rincian Pesanan:*\n` +
      pickupOrder.items
        .map(
          (it, idx) =>
            `${idx + 1}. ${it.name} ${it.size ? `[${it.size}]` : ""} ${
              it.grind ? `(Gilingan: ${it.grind})` : ""
            } x${it.quantity} = ${formatRupiah(it.price * it.quantity)}`
        )
        .join("\n") +
      `\n\n` +
      `Subtotal: ${formatRupiah(pickupOrder.subtotal || pickupOrder.totalAmount)}\n` +
      (pickupOrder.taxAmount && pickupOrder.taxAmount > 0
        ? `PPN 10% (Khusus Slawi): ${formatRupiah(pickupOrder.taxAmount)}\n`
        : `PPN: Termasuk Harga Bersih (Guci)\n`) +
      `*TOTAL NETT BAYAR DI KASIR: ${formatRupiah(pickupOrder.totalAmount)}*\n` +
      `(Rp 0 Biaya Admin — Bayar Tunai / QRIS di Kasir)\n` +
      (pickupOrder.notes ? `\nCatatan: ${pickupOrder.notes}\n` : "") +
      (pickupOrder.isHighValue
        ? `\n⚠️ Catatan: Pesanan partai besar (> Rp 150.000), siap menerima arahan QRIS DP kasir.\n`
        : "") +
      `\nHalo Kasir Clavicula, mohon konfirmasi pesanan saya agar bisa disiapkan. Terima kasih!`
  )}`;

  // Auto-open WhatsApp on mount if requested or provide 1-click
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(pickupOrder.pickupCode);
      setCopied(true);
      addToast(`Kode pickup ${pickupOrder.pickupCode} disalin!`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handlePrintReceipt = () => {
    printReceiptWindow({
      pickupCode: pickupOrder.pickupCode,
      customerName: pickupOrder.customerName,
      customerPhone: pickupOrder.customerPhone,
      outlet: pickupOrder.outlet,
      outletAddress: pickupOrder.outletAddress,
      orderTypeLabel: pickupOrder.orderTypeLabel,
      pickupTimeLabel: pickupOrder.pickupTimeLabel,
      items: pickupOrder.items.map((it) => ({
        name: it.name,
        size: it.size,
        grind: it.grind,
        quantity: it.quantity,
        price: it.price,
      })),
      subtotal: pickupOrder.subtotal || pickupOrder.totalAmount,
      taxAmount: pickupOrder.taxAmount || 0,
      totalAmount: pickupOrder.totalAmount,
      totalAppPrice: pickupOrder.totalAppPrice,
      totalSavings: pickupOrder.totalSavings,
      createdAt: pickupOrder.createdAt,
      notes: pickupOrder.notes,
    });
    addToast("Membuka jendela cetak / simpan PDF...");
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, "_blank");
    addToast("Membuka WhatsApp Kasir Clavicula Coffee...");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/80 backdrop-blur-md z-[110] transition-opacity duration-300"
        onClick={closePickupTicket}
      />

      {/* Modal Dialog */}
      <div className="fixed inset-0 z-[120] overflow-y-auto flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-chestnut/20 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={closePickupTicket}
            className="absolute top-4 right-4 p-2 rounded-full bg-vanilla/80 hover:bg-vanilla text-espresso transition-colors z-10"
            aria-label="Tutup tiket"
          >
            <X size={18} />
          </button>

          {/* ── HEADER CARD ── */}
          <div className="bg-gradient-to-br from-espresso via-coal to-char text-porcelain p-6 sm:p-7 text-center relative">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold tracking-wider uppercase mb-3">
              <AlertCircle size={12} className="text-amber-400 animate-pulse" />
              <span>STATUS: MENUNGGU KONFIRMASI WA KASIR</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white mb-1">
              Tiket Pickup Pass Digital
            </h2>
            <p className="text-xs text-linen/70 max-w-sm mx-auto leading-relaxed">
              Pesanan telah tercatat. Klik tombol WhatsApp di bawah agar kasir memvalidasi &amp; pesanan segera disiapkan barista!
            </p>

            {/* Big Pickup Code Box */}
            <div className="mt-4 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-amber-400/50 px-5 py-2.5 rounded-2xl shadow-inner">
              <div className="text-left">
                <span className="text-[9px] font-mono text-amber-300 uppercase tracking-widest block">
                  KODE AMBIL OUTLET
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-amber-300 tracking-wider">
                  {pickupOrder.pickupCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
                title="Salin Kode Pickup"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* ── DETAILS BODY ── */}
          <div className="p-5 sm:p-6 space-y-4 max-h-[52vh] overflow-y-auto">
            {/* Outlet, Type & Time Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-vanilla/60 p-3.5 rounded-2xl border border-chestnut/10 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-chestnut shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-espresso block">
                    {isSlawi ? "Cabang 01 Slawi (Roastery HQ)" : "Cabang 02 Guci Hills"}
                  </span>
                  <span className="text-espresso/60 text-[11px] leading-tight block">
                    {pickupOrder.outletAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:border-l sm:border-chestnut/15 sm:pl-3">
                <Clock size={16} className="text-chestnut shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-espresso block">Waktu Pengambilan:</span>
                  <span className="text-chestnut font-semibold block">{pickupOrder.pickupTimeLabel}</span>
                  <span className="text-[10px] text-espresso/50">Disiapkan fresh barista</span>
                </div>
              </div>
            </div>

            {/* Order Type & Customer Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-linen rounded-xl border border-chestnut/10 text-xs">
              <div className="flex items-center gap-2">
                {pickupOrder.orderType === "dine_in" ? (
                  <UtensilsCrossed size={15} className="text-chestnut" />
                ) : (
                  <PackageCheck size={15} className="text-chestnut" />
                )}
                <span className="font-bold text-espresso">{pickupOrder.orderTypeLabel}</span>
              </div>
              <div className="text-[11px] text-espresso/70">
                Pemesan: <strong>{pickupOrder.customerName}</strong> ({pickupOrder.customerPhone})
              </div>
            </div>

            {/* High-Value / Large Order Safeguard Banner */}
            {pickupOrder.isHighValue && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-2.5">
                <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-espresso/80 leading-relaxed">
                  <strong className="block font-bold text-amber-950">Pesanan Partai Besar (&ge; Rp 150.000):</strong>
                  Kasir akan memeriksa kesiapan bahan via WhatsApp dan dapat memberikan QRIS DP agar pesanan langsung diprioritaskan.
                </div>
              </div>
            )}

            {/* Fresh Grind Guarantee Banner */}
            <div className="p-3 bg-amber-50 border border-amber-300/80 rounded-2xl flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-chestnut shrink-0 mt-0.5" />
              <div className="text-[11px] text-espresso/80 leading-relaxed">
                <strong className="block font-bold text-chestnut">Garansi Fresh Grind Barista di Kasir:</strong>
                Biji kopi roastery pesanan Anda baru akan digiling langsung oleh barista saat Anda tiba di kasir outlet, mencegah salah giling dan memastikan aroma maksimal!
              </div>
            </div>

            {/* Items Breakdown */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-espresso/60 mb-2">
                <span>Rincian Pesanan ({pickupOrder.items.length} Item)</span>
                <span>Total</span>
              </div>
              <div className="space-y-2 border-t border-b border-chestnut/10 py-3">
                {pickupOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-espresso">{it.name}</span>
                      <div className="flex flex-wrap gap-1 text-[10px] text-espresso/70 mt-0.5">
                        {it.size && (
                          <span className="bg-linen px-2 py-0.5 rounded border border-chestnut/15">{it.size}</span>
                        )}
                        {it.grind && (
                          <span className="bg-amber-50 text-chestnut font-semibold px-2 py-0.5 rounded border border-chestnut/20">
                            {it.grind}
                          </span>
                        )}
                        <span className="text-espresso/50">x{it.quantity}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-espresso whitespace-nowrap">
                      {formatRupiah(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Calculation with Exact Cashier Breakdown */}
            <div className="bg-linen p-3.5 rounded-2xl border border-chestnut/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-espresso/70">
                <span>Subtotal Pesanan:</span>
                <span>{formatRupiah(pickupOrder.subtotal || pickupOrder.totalAmount)}</span>
              </div>

              {pickupOrder.taxAmount && pickupOrder.taxAmount > 0 ? (
                <div className="flex justify-between text-espresso/70">
                  <span>PPN 10% (Khusus Resto Slawi):</span>
                  <span>{formatRupiah(pickupOrder.taxAmount)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-espresso/70">
                  <span>PPN Resto:</span>
                  <span className="text-emerald-700 font-medium">Termasuk Harga Bersih (Guci)</span>
                </div>
              )}

              <div className="flex justify-between text-espresso/70">
                <span>Biaya Admin &amp; Layanan Web:</span>
                <span className="text-emerald-600 font-bold">Rp 0 (GRATIS)</span>
              </div>

              <div className="flex justify-between text-espresso font-black text-sm sm:text-base pt-2 border-t border-chestnut/15">
                <div>
                  <span>TOTAL NETT BAYAR DI KASIR:</span>
                  <span className="text-[10px] block font-normal text-espresso/50">
                    Bayar Tunai atau QRIS saat ambil
                  </span>
                </div>
                <span className="text-chestnut font-serif italic text-lg sm:text-xl">
                  {formatRupiah(pickupOrder.totalAmount)}
                </span>
              </div>

              {pickupOrder.totalSavings > 0 && (
                <div className="bg-emerald-100 text-emerald-800 p-1.5 rounded-lg text-center font-bold text-[10px] mt-1">
                  🎉 Anda Hemat {formatRupiah(pickupOrder.totalSavings)} dibanding memesan via aplikasi ojek online!
                </div>
              )}
            </div>
          </div>

          {/* ── ACTION FOOTER ── */}
          <div className="p-5 bg-linen border-t border-chestnut/10 space-y-2.5">
            {/* Anti Ghost-Order Warning */}
            <div className="p-3 bg-amber-50 border border-amber-300/80 rounded-2xl flex items-start gap-2.5 text-[11px] text-espresso leading-snug">
              <span className="shrink-0 text-base">⚠️</span>
              <div>
                <strong className="text-amber-950 block">Penting untuk Menghindari Kopi Meleleh:</strong>
                Barista kasir baru akan mulai meracik hidangan setelah Anda mengirim rincian tiket via WhatsApp di bawah atau saat Anda tiba di kasir outlet.
              </div>
            </div>

            {/* Primary WA Button (Crucial Anti Ghost-Order Step) */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-sm"
            >
              <MessageCircle size={20} className="fill-white" />
              <span>Kirim Tiket ke WhatsApp Kasir (1-Klik)</span>
            </button>

            <button
              onClick={handlePrintReceipt}
              className="w-full py-2.5 px-6 rounded-full bg-white hover:bg-vanilla text-espresso font-semibold border border-chestnut/20 flex items-center justify-center gap-2 transition-all text-xs"
            >
              <Printer size={15} className="text-chestnut" />
              Unduh / Cetak Nota PDF Pickup Resmi
            </button>

            <button
              onClick={closePickupTicket}
              className="w-full text-center text-xs text-espresso/60 hover:text-chestnut transition-colors pt-1"
            >
              Selesai &bull; Kembali ke Katalog
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
