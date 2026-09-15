"use client";

import { useUI } from "./UIProvider";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useUI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-espresso text-porcelain px-6 py-3 rounded-full shadow-2xl border border-chestnut/20 flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-8 duration-500"
        >
          <div className="w-5 h-5 rounded-full bg-chestnut flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
