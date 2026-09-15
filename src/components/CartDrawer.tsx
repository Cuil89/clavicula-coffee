"use client";

import { useUI } from "./UIProvider";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, clearCart, addToast } = useUI();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      closeCart();
      addToast("Order confirmed. Await the roast.");
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-espresso/40 backdrop-blur-sm z-[80] transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-linen shadow-2xl z-[90] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-chestnut/10">
          <h2 className="text-xl font-bold text-espresso flex items-center gap-2">
            <ShoppingBag size={20} /> Roastery Cart
          </h2>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-chestnut/10 transition-colors text-espresso">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-espresso/50">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p className="font-serif italic text-lg">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 pb-6 border-b border-chestnut/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-espresso text-lg leading-tight">{item.name}</h3>
                      <p className="text-xs font-mono text-chestnut tracking-widest mt-1 uppercase">{item.grind}</p>
                    </div>
                    <span className="font-serif italic text-lg text-chestnut">₹{item.price * item.quantity}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-white border border-chestnut/20 rounded-full px-3 py-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-espresso/70 hover:text-chestnut">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-espresso/70 hover:text-chestnut">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-chestnut/10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-espresso/70 uppercase tracking-widest">Subtotal</span>
              <span className="text-2xl font-serif italic text-espresso">₹{total}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 rounded-full bg-chestnut text-white font-medium flex items-center justify-center transition-transform active:scale-95 disabled:opacity-70 disabled:scale-100"
            >
              {isCheckingOut ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                "Confirm Origin Order"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
