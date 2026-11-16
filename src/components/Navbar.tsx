"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Menu, X, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { useUI } from "@/components/UIProvider";

const navLinks = [
  { name: "Menu & Signature", path: "/menu" },
  { name: "Roastery & Craft", path: "/terroir" },
  { name: "Outlets & Hills", path: "/space" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openMap } = useUI();
  const pathname = usePathname();
  const isMenuPage = pathname === "/menu";

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center w-full px-3 md:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 md:px-6 py-2.5 md:py-3 backdrop-blur-md transition-all duration-300 ${
            isMenuPage
              ? "border border-[rgba(241,231,214,0.18)] bg-[#18130e]/95 text-[#f1e7d6] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              : "border border-chestnut/20 bg-linen/90 text-espresso shadow-warm-card"
          }`}
        >
          {/* Left Side: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group relative z-20">
            <div
              className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                isMenuPage
                  ? "border border-[#e7a93c]/40 bg-[#100d0a]"
                  : "border border-chestnut/30 bg-espresso"
              }`}
            >
              <Image
                src="/assets/clavicula/logo/logo-clavicula.webp"
                alt="Clavicula Coffee & Idea Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-sans font-extrabold tracking-tight text-base md:text-lg leading-tight transition-colors ${
                  isMenuPage
                    ? "text-[#f1e7d6] group-hover:text-[#e7a93c]"
                    : "text-espresso group-hover:text-chestnut"
                }`}
              >
                CLAVICULA
              </span>
              <span
                className={`text-[10px] md:text-xs font-serif italic tracking-wide leading-none ${
                  isMenuPage ? "text-[#e7a93c]" : "text-chestnut"
                }`}
              >
                Coffee &amp; Idea
              </span>
            </div>
          </Link>

          {/* Center Links (Desktop) */}
          <nav
            className={`hidden lg:flex items-center gap-8 text-sm font-medium ${
              isMenuPage ? "text-[#f1e7d6]/80" : "text-espresso/80"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative group transition-colors py-1 ${
                  isMenuPage
                    ? "hover:text-[#e7a93c]"
                    : "hover:text-chestnut"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${
                    isMenuPage ? "bg-[#e7a93c]" : "bg-chestnut"
                  }`}
                ></span>
              </Link>
            ))}
            <button
              onClick={openMap}
              className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                isMenuPage
                  ? "text-[#f1e7d6]/70 hover:text-[#e7a93c]"
                  : "text-espresso/70 hover:text-chestnut"
              }`}
            >
              <MapPin
                size={13}
                className={isMenuPage ? "text-[#e7a93c]" : "text-chestnut"}
              />
              Slawi &amp; Guci
            </button>
          </nav>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Instagram quick link */}
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Clavicula Coffee"
              className={`p-2 rounded-full transition-colors hidden sm:flex items-center justify-center ${
                isMenuPage
                  ? "border border-[rgba(241,231,214,0.18)] text-[#f1e7d6]/80 hover:text-[#e7a93c] hover:bg-white/5"
                  : "border border-chestnut/15 text-espresso/80 hover:text-chestnut hover:bg-vanilla/60"
              }`}
            >
              <InstagramIcon size={17} />
            </a>

            {/* Reserve CTA */}
            <Link
              href="/reserve"
              className={`hidden sm:flex group relative items-center justify-center overflow-hidden rounded-full px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${
                isMenuPage
                  ? "bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6]"
                  : "bg-chestnut text-porcelain hover:bg-chestnut/90"
              }`}
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
              className={`lg:hidden relative z-20 p-2 -mr-1 transition-colors ${
                isMenuPage ? "text-[#f1e7d6]" : "text-espresso"
              }`}
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
        className={`fixed inset-0 z-40 lg:hidden flex flex-col justify-between px-8 py-20 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuPage ? "bg-[#100d0a] text-[#f1e7d6]" : "bg-linen text-espresso"
        } ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 pt-10">
          <div
            className={`flex items-center gap-3 pb-6 border-b ${
              isMenuPage ? "border-white/10" : "border-chestnut/15"
            }`}
          >
            <div
              className={`relative w-12 h-12 rounded-full overflow-hidden border ${
                isMenuPage
                  ? "border-[#e7a93c]/40 bg-[#18130e]"
                  : "border-chestnut/30 bg-espresso"
              }`}
            >
              <Image
                src="/assets/clavicula/logo/logo-clavicula.webp"
                alt="Clavicula Coffee Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div
                className={`font-extrabold text-2xl ${
                  isMenuPage ? "text-[#f1e7d6]" : "text-espresso"
                }`}
              >
                CLAVICULA
              </div>
              <div
                className={`font-serif italic text-sm ${
                  isMenuPage ? "text-[#e7a93c]" : "text-chestnut"
                }`}
              >
                Coffee &amp; Idea — Slawi &amp; Guci
              </div>
            </div>
          </div>

          <nav
            className={`flex flex-col gap-6 text-2xl font-bold pt-4 ${
              isMenuPage ? "text-[#f1e7d6]" : "text-espresso"
            }`}
          >
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Beranda
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={
                  isMenuPage
                    ? "hover:text-[#e7a93c] transition-colors"
                    : "hover:text-chestnut transition-colors"
                }
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openMap();
              }}
              className={`text-left text-lg font-serif italic flex items-center gap-2 ${
                isMenuPage ? "text-[#e7a93c]" : "text-chestnut"
              }`}
            >
              <MapPin size={18} /> Lokasi Outlet Slawi &amp; Guci Hills
            </button>
          </nav>
        </div>

        <div
          className={`pt-8 border-t flex flex-col gap-4 ${
            isMenuPage ? "border-white/10" : "border-chestnut/15"
          }`}
        >
          <Link
            href="/reserve"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold shadow-md ${
              isMenuPage
                ? "bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6]"
                : "bg-chestnut text-porcelain"
            }`}
          >
            Reservasi Meja Online →
          </Link>
          <div
            className={`flex justify-between items-center text-xs font-mono px-2 ${
              isMenuPage ? "text-[#f1e7d6]/60" : "text-espresso/60"
            }`}
          >
            <a
              href="https://www.instagram.com/clavicula_coffee/"
              target="_blank"
              rel="noreferrer"
              className={
                isMenuPage
                  ? "hover:text-[#e7a93c] flex items-center gap-1"
                  : "hover:text-chestnut flex items-center gap-1"
              }
            >
              <InstagramIcon size={14} /> @clavicula_coffee
            </a>
            <a
              href="https://www.instagram.com/clavicula_hills/"
              target="_blank"
              rel="noreferrer"
              className={
                isMenuPage
                  ? "hover:text-[#e7a93c] flex items-center gap-1"
                  : "hover:text-chestnut flex items-center gap-1"
              }
            >
              <InstagramIcon size={14} /> @clavicula_hills
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
