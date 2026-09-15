"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Craft & Terroir", path: "/terroir" },
  { name: "Kitchen Atelier", path: "/menu" },
  { name: "Sanctuary", path: "/space" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-chestnut/15 bg-vanilla/85 px-6 py-3 backdrop-blur-md shadow-warm-card">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-sans font-bold tracking-tight text-espresso text-lg relative z-20">
              MAISON BREW
            </Link>
            <span className="hidden md:inline-block rounded-full bg-buttermilk px-2.5 py-0.5 text-sm font-serif italic text-chestnut">
              Terre & Crème
            </span>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-espresso/80">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className="relative group transition-colors hover:text-chestnut"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-chestnut transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/reserve" className="hidden md:flex group relative items-center justify-center overflow-hidden rounded-full bg-chestnut px-6 py-2.5 text-sm font-medium text-porcelain transition-transform active:scale-[0.98]">
              <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
                Reserve a Table
              </span>
              <span className="absolute right-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                →
              </span>
            </Link>
            <button 
              className="lg:hidden relative z-20 p-2 -mr-2 text-espresso"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-linen z-40 lg:hidden flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-col gap-8 text-4xl font-black text-espresso">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="pt-8 border-t border-chestnut/10">
            <Link 
              href="/reserve" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-chestnut px-8 py-4 text-lg font-medium text-porcelain"
            >
              Reserve a Table →
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
