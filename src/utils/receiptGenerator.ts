export type ReceiptData = {
  pickupCode: string;
  customerName: string;
  customerPhone: string;
  outlet: "Slawi" | "Guci";
  outletAddress: string;
  orderTypeLabel?: string;
  pickupTimeLabel: string;
  items: Array<{
    name: string;
    size?: string;
    grind?: string;
    quantity: number;
    price: number;
  }>;
  subtotal?: number;
  taxAmount?: number;
  totalAmount: number;
  totalAppPrice: number;
  totalSavings: number;
  createdAt: string;
  notes?: string;
};

export function formatRupiah(val: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);
}

export function printReceiptWindow(data: ReceiptData) {
  const printWindow = window.open("", "_blank", "width=750,height=900");
  if (!printWindow) {
    alert("Mohon izinkan pop-up browser untuk mencetak nota pickup.");
    return;
  }

  const itemsHtml = data.items
    .map(
      (item, idx) => `
      <tr>
        <td style="padding: 8px 6px; border-bottom: 1px dashed #ddd; vertical-align: top;">${idx + 1}</td>
        <td style="padding: 8px 6px; border-bottom: 1px dashed #ddd;">
          <strong>${item.name}</strong>
          ${item.size ? `<br><small style="color: #666;">Ukuran: ${item.size}</small>` : ""}
          ${item.grind ? `<br><small style="color: #B26E2E; font-weight: bold;">Gilingan: ${item.grind}</small>` : ""}
        </td>
        <td style="padding: 8px 6px; border-bottom: 1px dashed #ddd; text-align: center; vertical-align: top;">${item.quantity}x</td>
        <td style="padding: 8px 6px; border-bottom: 1px dashed #ddd; text-align: right; vertical-align: top;">${formatRupiah(item.price * item.quantity)}</td>
      </tr>
    `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="utf-8" />
      <title>Nota Resmi Pickup ${data.pickupCode} — Clavicula Coffee</title>
      <style>
        @page {
          size: A5 portrait;
          margin: 12mm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #171513;
          margin: 0;
          padding: 24px;
          background: #fff;
          font-size: 13px;
          line-height: 1.45;
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #171513;
          padding-bottom: 14px;
          margin-bottom: 16px;
        }
        .header h1 {
          margin: 0 0 2px 0;
          font-size: 22px;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }
        .header p {
          margin: 2px 0;
          color: #555;
          font-size: 11px;
        }
        .code-box {
          background: #FAF8F5;
          border: 2px dashed #B26E2E;
          border-radius: 8px;
          padding: 12px;
          text-align: center;
          margin-bottom: 16px;
        }
        .code-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #B26E2E;
          font-weight: bold;
        }
        .code-number {
          font-size: 26px;
          font-family: monospace;
          font-weight: 900;
          letter-spacing: 2px;
          color: #171513;
          margin: 4px 0;
        }
        .code-status {
          font-size: 11px;
          color: #2e7d32;
          font-weight: bold;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
          margin-bottom: 16px;
          font-size: 12px;
          background: #fdfdfd;
          padding: 10px;
          border: 1px solid #eee;
          border-radius: 6px;
        }
        .meta-grid div strong {
          color: #777;
          display: block;
          font-size: 10px;
          text-transform: uppercase;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
        }
        th {
          border-bottom: 1.5px solid #171513;
          padding: 6px;
          font-size: 11px;
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .totals {
          margin-left: auto;
          width: 260px;
          font-size: 12px;
          margin-bottom: 16px;
        }
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 3px 0;
        }
        .totals-row.grand {
          font-size: 16px;
          font-weight: 900;
          color: #B26E2E;
          border-top: 1.5px solid #171513;
          padding-top: 6px;
          margin-top: 4px;
        }
        .guarantee {
          background: #f0f7f2;
          border-left: 4px solid #2e7d32;
          padding: 10px 14px;
          font-size: 11px;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .cashier-box {
          border: 1px solid #ccc;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          margin-top: 18px;
        }
        .btn-print {
          display: block;
          margin: 16px auto;
          padding: 10px 24px;
          background: #B26E2E;
          color: white;
          border: none;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
        }
        @media print {
          .btn-print {
            display: none;
          }
          body {
            padding: 0;
          }
        }
      </style>
    </head>
    <body>
      <button class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan sebagai PDF</button>

      <div class="header">
        <h1>CLAVICULA COFFEE &amp; IDEA</h1>
        <p><strong>${data.outlet === "Slawi" ? "Cabang 01 Slawi (Roastery HQ & Slow Bar)" : "Cabang 02 Guci (Highland Sanctuary)"}</strong></p>
        <p>${data.outletAddress}</p>
        <p>WhatsApp Konfirmasi: +62 877-3344-4426 • Instagram: @clavicula_coffee</p>
      </div>

      <div class="code-box">
        <div class="code-label">KODE PICKUP RESMI CLAVICULA</div>
        <div class="code-number">${data.pickupCode}</div>
        <div class="code-status">✓ STATUS: PESANAN TERCATAT • BAYAR DI KASIR SAAT AMBIL</div>
      </div>

      <div class="meta-grid">
        <div>
          <strong>Nama Pemesan</strong>
          <span>${data.customerName}</span>
        </div>
        <div>
          <strong>Nomor WhatsApp</strong>
          <span>${data.customerPhone}</span>
        </div>
        <div>
          <strong>Tipe Pesanan</strong>
          <span style="color: #B26E2E; font-weight: bold;">${data.orderTypeLabel || "Ambil di Kasir (Pick-Up)"}</span>
        </div>
        <div>
          <strong>Jadwal Pengambilan</strong>
          <span>${data.pickupTimeLabel}</span>
        </div>
        <div>
          <strong>Waktu Dipesan</strong>
          <span>${data.createdAt}</span>
        </div>
      </div>

      ${
        data.notes
          ? `<div style="margin-bottom: 12px; font-size: 11px; background: #fff8e7; padding: 6px 10px; border-radius: 4px; border: 1px solid #f1d289;">
              <strong>Catatan Pelanggan:</strong> ${data.notes}
             </div>`
          : ""
      }

      <table>
        <thead>
          <tr>
            <th style="width: 20px;">No</th>
            <th>Item &amp; Spesifikasi Seduh</th>
            <th style="width: 50px; text-align: center;">Qty</th>
            <th style="width: 100px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <div class="totals">
        <div class="totals-row">
          <span>Subtotal Pesanan:</span>
          <span>${formatRupiah(data.subtotal || data.totalAmount)}</span>
        </div>
        ${
          data.taxAmount && data.taxAmount > 0
            ? `<div class="totals-row">
                <span>PPN 10% (Khusus Slawi):</span>
                <span>${formatRupiah(data.taxAmount)}</span>
               </div>`
            : `<div class="totals-row">
                <span>PPN:</span>
                <span style="color: #666;">Termasuk Harga Bersih (Guci)</span>
               </div>`
        }
        <div class="totals-row">
          <span>Biaya Admin &amp; Layanan Web:</span>
          <span style="color: #2e7d32; font-weight: bold;">Rp 0 (GRATIS)</span>
        </div>
        <div class="totals-row grand">
          <span>TOTAL NETT BAYAR KASIR:</span>
          <span>${formatRupiah(data.totalAmount)}</span>
        </div>
        ${
          data.totalSavings > 0
            ? `<div style="text-align: right; font-size: 11px; color: #2e7d32; font-weight: bold; margin-top: 4px;">
                Hemat ${formatRupiah(data.totalSavings)} vs Aplikasi Ojol!
               </div>`
            : ""
        }
      </div>

      <div class="guarantee">
        <strong>⚡ GARANSI GILING SEGAR BARISTA (FRESHLY GROUND ON PICKUP):</strong><br>
        Biji kopi roastery yang Anda pesan dengan tingkat gilingan baru akan digiling oleh barista kami 15 menit sebelum jam kedatangan Anda agar aroma dan kualitas crema tetap maksimal.
      </div>

      <div class="cashier-box">
        <div>
          <strong>Verifikasi Kasir Outlet:</strong><br>
          [ &nbsp; ] Biji kopi digiling &amp; pesanan lengkap<br>
          [ &nbsp; ] Pembayaran Lunas di Kasir (Cash / QRIS / Debit)
        </div>
        <div style="text-align: right; min-width: 120px;">
          <strong>Paraf Kasir:</strong><br><br><br>
          ( .................................... )
        </div>
      </div>

      <div style="text-align: center; margin-top: 16px; font-size: 10px; color: #888;">
        Tunjukkan nota / kode pickup ini ke kasir Clavicula Coffee saat tiba di outlet.<br>
        Terima kasih atas dedikasi Anda mendukung roastery lokal Slawi &amp; Guci.
      </div>

      <script>
        // Auto trigger print dialog after document is ready
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 400);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
