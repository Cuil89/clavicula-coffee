"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  grind?: string;
  size?: string;
  savings?: number;
  appPrice?: number;
  category?: string;
  image?: string;
  notes?: string;
};

type Toast = {
  id: string;
  message: string;
};

export type ReservationDetails = {
  code: string;
  outlet: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  seating?: string;
  notes?: string;
};

export type PickupOrder = {
  pickupCode: string;
  outlet: "Slawi" | "Guci";
  outletAddress: string;
  orderType: "pickup" | "dine_in";
  orderTypeLabel: string;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  pickupTimeLabel: string;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  totalAppPrice: number;
  totalSavings: number;
  status: "MENUNGGU_KONFIRMASI_WA" | "DIKONFIRMASI";
  notes?: string;
  createdAt: string;
};

type UIContextType = {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isMapOpen: boolean;
  openMap: () => void;
  closeMap: () => void;

  reservationTicket: string | null;
  reservationData: ReservationDetails | null;
  openReservationTicket: (code: string, data?: Partial<ReservationDetails>) => void;
  closeReservationTicket: () => void;

  pickupOrder: PickupOrder | null;
  openPickupTicket: (order: PickupOrder) => void;
  closePickupTicket: () => void;

  toasts: Toast[];
  addToast: (message: string) => void;

  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "id">) => void;
  updateQuantity: (id: string, delta: number) => void;
  updateItemGrind: (id: string, grind: string) => void;
  updateItemSize: (id: string, size: string, newPrice: number, savings?: number) => void;
  clearCart: () => void;

  specialRequest: string;
  setSpecialRequest: (req: string) => void;

  selectedOutlet: "Slawi" | "Guci";
  setSelectedOutlet: (outlet: "Slawi" | "Guci" | "slawi" | "guci") => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [reservationTicket, setReservationTicket] = useState<string | null>(null);
  const [reservationData, setReservationData] = useState<ReservationDetails | null>(null);
  const [pickupOrder, setPickupOrder] = useState<PickupOrder | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [specialRequest, setSpecialRequest] = useState("");
  const [selectedOutlet, setInternalSelectedOutlet] = useState<"Slawi" | "Guci">("Slawi");

  const setSelectedOutlet = (outlet: "Slawi" | "Guci" | "slawi" | "guci") => {
    if (outlet.toLowerCase() === "guci") {
      setInternalSelectedOutlet("Guci");
    } else {
      setInternalSelectedOutlet("Slawi");
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openMap = () => setIsMapOpen(true);
  const closeMap = () => setIsMapOpen(false);

  const openReservationTicket = (code: string, data?: Partial<ReservationDetails>) => {
    setReservationTicket(code);
    if (data) {
      setReservationData({
        code,
        outlet: data.outlet || "Clavicula Slawi",
        date: data.date || new Date().toISOString().split("T")[0],
        time: data.time || "19:00 WIB",
        guests: data.guests || 2,
        name: data.name || "Tamu Clavicula",
        phone: data.phone || "",
        seating: data.seating || "Indoor / Garden",
        notes: data.notes || "",
      });
    }
  };

  const closeReservationTicket = () => {
    setReservationTicket(null);
    setReservationData(null);
  };

  const openPickupTicket = (order: PickupOrder) => {
    setPickupOrder(order);
  };

  const closePickupTicket = () => {
    setPickupOrder(null);
  };

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (item: Omit<CartItem, "quantity" | "id">) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.name === item.name &&
          (i.size === item.size || (!i.size && !item.size)) &&
          (i.grind === item.grind || (!i.grind && !item.grind))
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          id: Math.random().toString(36).substring(7),
          quantity: 1,
        },
      ];
    });
    addToast(`${item.name} ${item.size ? `(${item.size})` : ""} ditambahkan ke keranjang.`);
    openCart();
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQ };
          }
          return item;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const updateItemGrind = (id: string, grind: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, grind } : item))
    );
  };

  const updateItemSize = (id: string, size: string, newPrice: number, savings?: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, size, price: newPrice, savings: savings ?? item.savings } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        isMapOpen,
        openMap,
        closeMap,
        reservationTicket,
        reservationData,
        openReservationTicket,
        closeReservationTicket,
        pickupOrder,
        openPickupTicket,
        closePickupTicket,
        toasts,
        addToast,
        cartItems,
        addToCart,
        updateQuantity,
        updateItemGrind,
        updateItemSize,
        clearCart,
        specialRequest,
        setSpecialRequest,
        selectedOutlet,
        setSelectedOutlet,
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
