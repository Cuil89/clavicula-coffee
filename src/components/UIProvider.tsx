"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  grind: string;
};

type Toast = {
  id: string;
  message: string;
};

type UIContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  isMapOpen: boolean;
  openMap: () => void;
  closeMap: () => void;
  
  reservationTicket: string | null;
  openReservationTicket: (code: string) => void;
  closeReservationTicket: () => void;

  toasts: Toast[];
  addToast: (message: string) => void;

  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  
  specialRequest: string;
  setSpecialRequest: (req: string) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [reservationTicket, setReservationTicket] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [specialRequest, setSpecialRequest] = useState("");

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const openMap = () => setIsMapOpen(true);
  const closeMap = () => setIsMapOpen(false);
  
  const openReservationTicket = (code: string) => setReservationTicket(code);
  const closeReservationTicket = () => setReservationTicket(null);

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (item: Omit<CartItem, 'quantity' | 'id'>) => {
    setCartItems((prev) => {
      const existing = prev.find(i => i.name === item.name && i.grind === item.grind);
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, id: Math.random().toString(36).substring(7), quantity: 1 }];
    });
    openCart();
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => prev.map(item => {
      if (item.id === id) {
        const newQ = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQ };
      }
      return item;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCartItems([]);

  return (
    <UIContext.Provider
      value={{
        isCartOpen, openCart, closeCart,
        isMapOpen, openMap, closeMap,
        reservationTicket, openReservationTicket, closeReservationTicket,
        toasts, addToast,
        cartItems, addToCart, updateQuantity, clearCart,
        specialRequest, setSpecialRequest
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
