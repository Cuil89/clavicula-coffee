"use client";

import { useEffect, useRef, useState } from "react";
import { InstagramIcon } from "@/components/Icons";
import { Play, ExternalLink } from "lucide-react";

/*
 * InstagramReels.tsx
 * 
 * Renders a beautiful Instagram Reels / Posts showcase section.
 * Uses Instagram oEmbed iframes for real post embeds, with
 * fallback visual cards if the embed fails to load.
 * 
 * HOW TO UPDATE POST URLS:
 * Replace the `postUrl` values below with actual Instagram post URLs
 * from @clavicula_coffee or @clavicula_hills.
 * Format: https://www.instagram.com/p/SHORTCODE/ or /reel/SHORTCODE/
 */

interface ReelCard {
  postUrl: string;
  caption: string;
  account: "@clavicula_coffee" | "@clavicula_hills";
  type: "reel" | "post";
  thumb?: string; // optional local thumbnail from public/assets/
}

// ─── UPDATE THESE WITH ACTUAL POST URLs FROM INSTAGRAM ──────────────────────
const REELS: ReelCard[] = [
  {
    postUrl: "https://www.instagram.com/p/DfToychTVCE/",
    caption: "Clavicula roastery 😎 Live roasting session biji kopi pilihan langsung di bar roastery Slawi.",
    account: "@clavicula_coffee",
    type: "reel",
    thumb: "/assets/ig-reel-dftoychtvce.jpg",
  },
  {
    postUrl: "https://www.instagram.com/clavicula_hills/",
    caption: "View sejuk Clavicula Hills Guci di lereng Gunung Slamet. Menikmati secangkir kopi hangat di tengah hawa dingin pegunungan pinus.",
    account: "@clavicula_hills",
    type: "post",
    thumb: "/assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png",
  },
  {
    postUrl: "https://www.instagram.com/clavicula_coffee/",
    caption: "Suasana coffee bar & outdoor sanctuary Clavicula Slawi — tempat temu, ide bertumbuh, dan menikmati sajian istimewa.",
    account: "@clavicula_coffee",
    type: "post",
    thumb: "/assets/clavicula/places/depan-tempat-clavicula-slawi.webp",
  },
  {
    postUrl: "https://www.instagram.com/clavicula_coffee/",
    caption: "Signature Coffee berfilosofi anatomi: Manubrium, Acromion, Subclavius, Sternum, Costa & Scapula racikan barista Clavicula.",
    account: "@clavicula_coffee",
    type: "post",
    thumb: "/images/manubrium.jpg",
  },
  {
    postUrl: "https://www.instagram.com/clavicula_coffee/",
    caption: "Single origin Nusantara diseduh dengan metode presisi V60 di Slow Bar Clavicula untuk profil rasa paling jernih.",
    account: "@clavicula_coffee",
    type: "post",
    thumb: "/assets/clavicula/places/slow-bar-v60-clavicula.jpg",
  },
  {
    postUrl: "https://www.instagram.com/clavicula_coffee/",
    caption: "Clavicula Tenderloin Steak empuk dengan saus spesial & kentang mashed gurih, sajian terbaik menemani santap malam.",
    account: "@clavicula_coffee",
    type: "post",
    thumb: "/assets/clavicula/foods/steak-tenderloin-card.jpg",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function ReelCard({ reel, index }: { reel: ReelCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  const isHills = reel.account === "@clavicula_hills";
  const accentColor = isHills ? "bg-forest" : "bg-chestnut";
  const accentBorder = isHills ? "border-forest/30" : "border-chestnut/30";
  const accentText = isHills ? "text-forest" : "text-chestnut";

  return (
    <a
      href={reel.postUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-chestnut/15 bg-white shadow-sm hover:shadow-warm-card hover:-translate-y-1.5 transition-all duration-500 cursor-pointer block h-full"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-vanilla">
        {reel.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={reel.thumb}
            alt={reel.caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-vanilla/60">
            <InstagramIcon size={48} className="text-chestnut/30" />
          </div>
        )}

        {/* Play overlay for Reels */}
        {reel.type === "reel" && (
          <div
            className={`absolute inset-0 bg-espresso/40 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
              <Play size={24} className="text-espresso fill-espresso ml-1" />
            </div>
          </div>
        )}

        {/* Type badge */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-white uppercase ${accentColor}`}
        >
          {reel.type === "reel" ? "▶ Reel" : "✦ Post"}
        </div>

        {/* Account badge */}
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wide bg-white/90 border ${accentBorder} ${accentText} flex items-center gap-1`}
        >
          <InstagramIcon size={9} />
          {reel.account}
        </div>
      </div>

      {/* Caption + CTA */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <p className="text-sm text-espresso/75 font-serif italic leading-relaxed line-clamp-3">
          {reel.caption}
        </p>
        <span
          className={`mt-auto inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase ${accentText} group-hover:underline`}
        >
          Lihat di Instagram <ExternalLink size={12} />
        </span>
      </div>
    </a>
  );
}

export default function InstagramReels() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-28 px-4 md:px-8 border-b border-chestnut/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div
            className={`p-3 bg-gradient-to-br from-chestnut to-caramel rounded-2xl text-white mb-5 shadow-md transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <InstagramIcon size={28} />
          </div>
          <div className="text-xs font-mono tracking-widest text-chestnut uppercase font-semibold mb-3">
            @clavicula_coffee &bull; @clavicula_hills
          </div>
          <h2
            className={`text-3xl md:text-5xl font-black text-espresso mb-4 transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Momen Langsung dari{" "}
            <span className="font-serif italic text-chestnut">Instagram</span>
          </h2>
          <p
            className={`text-sm md:text-base text-espresso/60 max-w-2xl font-serif italic leading-relaxed transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ikuti perjalanan kami setiap hari — live roasting, suasana kafe, minuman signature, 
            dan pemandangan Clavicula Hills yang menakjubkan langsung dari feed kami.
          </p>
        </div>

        {/* Reels Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Featured large card (first item) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:row-span-1">
            <ReelCard reel={REELS[0]} index={0} />
          </div>
          {/* Middle large (second) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <ReelCard reel={REELS[1]} index={1} />
          </div>
          {/* Third */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <ReelCard reel={REELS[2]} index={2} />
          </div>
          {/* Bottom row */}
          {REELS.slice(3).map((reel, i) => (
            <div key={i + 3} className="col-span-1 md:col-span-1 lg:col-span-2">
              <ReelCard reel={reel} index={i + 3} />
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a
            href="https://www.instagram.com/clavicula_coffee/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-chestnut to-caramel text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            <InstagramIcon size={16} />
            Follow @clavicula_coffee
          </a>
          <a
            href="https://www.instagram.com/clavicula_hills/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-forest to-forest/80 text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
          >
            <InstagramIcon size={16} />
            Follow @clavicula_hills
          </a>
          <a
            href="https://linktr.ee/clavicula_coffee"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-chestnut/30 text-chestnut text-sm font-bold hover:bg-chestnut/5 transition-all"
          >
            🔗 Linktree Clavicula
          </a>
        </div>
      </div>
    </section>
  );
}
