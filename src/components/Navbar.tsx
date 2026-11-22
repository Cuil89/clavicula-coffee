"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X, MapPin, ShoppingBag } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { useUI } from "@/components/UIProvider";

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Menu & Signature", path: "/menu" },
  { name: "Roastery & Craft", path: "/terroir" },
  { name: "Outlets & Hills", path: "/space" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openMap, openCart, cartItems } = useUI();
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-12 md:top-14 left-0 right-0 z-50 flex justify-center w-full px-3 md:px-6 pointer-events-none"
      >
        <div className="pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-chestnut/20 bg-linen/90 px-4 md:px-6 py-2.5 md:py-3 backdrop-blur-md shadow-warm-card transition-all duration-300">
          {/* Left Side: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group relative z-20">
            <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-chestnut/30 bg-espresso shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/clavicula/logo/logo-clavicula.webp"
                alt="Clavicula Coffee & Idea Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-extrabold tracking-tight text-espresso text-base md:text-lg leading-tight group-hover:text-chestnut transition-colors">
                CLAVICULA
              </span>
              <span className="text-[10px] md:text-xs font-serif italic text-chestnut tracking-wide leading-none">
                Coffee &amp; Idea
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-espresso/80">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative group transition-colors hover:text-chestnut py-1"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-chestnut transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Cart trigger button */}
            <button
              onClick={openCart}
              className="relative p-2 md:px-3 md:py-2 rounded-full border border-chestnut/20 text-espresso hover:text-chestnut hover:bg-vanilla/80 transition-all flex items-center gap-2"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline text-xs font-bold font-mono">Keranjang</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-chestnut text-white text-[11px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Instagram quick link */}
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Clavicula Coffee"
              className="p-2 rounded-full border border-chestnut/15 text-espresso/80 hover:text-chestnut hover:bg-vanilla/60 transition-colors hidden sm:flex items-center justify-center"
            >
              <InstagramIcon size={17} />
            </a>

            {/* Reserve CTA */}
            <Link
              href="/reserve"
              className="hidden sm:flex group relative items-center justify-center overflow-hidden rounded-full bg-chestnut px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold text-white shadow-sm transition-transform active:scale-[0.98] hover:bg-chestnut/90"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
                Reservasi Meja
              </span>
              <span className="absolute right-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                →
              </span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden relative z-20 p-2 -mr-1 text-espresso"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-between px-8 py-20 bg-linen text-espresso transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 pt-10">
          <div className="flex items-center gap-3 pb-6 border-b border-chestnut/15">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-chestnut/30 bg-espresso">
              <Image
                src="/assets/clavicula/logo/logo-clavicula.webp"
                alt="Clavicula Coffee Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="font-extrabold text-2xl text-espresso">
                CLAVICULA
              </div>
              <div className="font-serif italic text-sm text-chestnut">
                Coffee &amp; Idea — Slawi &amp; Guci
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-6 text-2xl font-bold pt-4 text-espresso">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-chestnut transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openCart();
              }}
              className="text-left text-xl font-bold text-chestnut flex items-center gap-2"
            >
              <ShoppingBag size={20} /> Keranjang Belanja ({totalCartCount} item)
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openMap();
              }}
              className="text-left text-lg font-serif italic text-chestnut flex items-center gap-2"
            >
              <MapPin size={18} /> Lokasi Outlet Slawi &amp; Guci Hills
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-chestnut/15 flex flex-col gap-4">
          <Link
            href="/reserve"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-chestnut px-8 py-3.5 text-base font-semibold text-white shadow-md hover:bg-chestnut/90"
          >
            Reservasi Meja Online →
          </Link>
          <div className="flex justify-between items-center text-xs font-mono px-2 text-espresso/60">
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-chestnut flex items-center gap-1"
            >
              <InstagramIcon size={14} /> @clavicula_coffee
            </a>
            <a
              href="https://www.instagram.com/clavicula_hills/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-chestnut flex items-center gap-1"
            >
              <InstagramIcon size={14} /> @clavicula_hills
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
