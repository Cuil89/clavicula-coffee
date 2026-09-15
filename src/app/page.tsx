"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import { useUI } from "@/components/UIProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { addToCart, setSpecialRequest, addToast } = useUI();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "01 / Light & Floral", name: "Guji Highlands", origin: "Ethiopia - 2,100m", sweet: 78, floral: 92, body: 44, temp: "93.5°C", pour: "Hario V60, 1:16.5", pastry: "Lemon Thyme Brioche Feuilletée", notes: "A delicate dance of jasmine and bright citrus." },
    { id: 1, label: "02 / Balanced Amber", name: "Honey Sun", origin: "Chikmagalur - 1,450m", sweet: 85, floral: 40, body: 70, temp: "92.0°C", pour: "Chemex, 1:15", pastry: "Double-Baked Almond Croissant", notes: "Rich stone fruit sweetness with a clean finish." },
    { id: 2, label: "03 / Medium Caramel", name: "Araku Anaerobic", origin: "Andhra Pradesh - 1,200m", sweet: 90, floral: 30, body: 85, temp: "91.5°C", pour: "AeroPress, 1:12", pastry: "Whipped Ricotta Fig Toast", notes: "Wild fermented complexity with deep caramel." },
    { id: 3, label: "04 / Dark & Velvety", name: "Maison Espresso Noir", origin: "House Blend", sweet: 60, floral: 10, body: 95, temp: "94.0°C", pour: "Espresso, 1:2", pastry: "Truffle & Mushroom Brioche", notes: "Thick, syrupy crema with dark cocoa nibs." },
  ];

  const currentTab = tabs[activeTab];

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image zoom out on scroll
      gsap.to(".hero-image", {
        scale: 1.1,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal stagger for value pillars
      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".value-section",
            start: "top 75%",
          },
        }
      );

      // Coffee collection cards
      gsap.fromTo(
        ".coffee-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: ".coffee-section",
            start: "top 75%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleAddSensoryFlight = () => {
    setSpecialRequest(`Cupping Flight Preference: ${currentTab.name} (${currentTab.pour})`);
    addToast(`${currentTab.name} preference attached to reservation.`);
    const reservationSection = document.getElementById("reservation-section");
    if (reservationSection) {
      reservationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      
      {/* 01. HERO VIEWPORT */}
      <section className="hero-section relative min-h-[100dvh] w-full flex items-center pt-24 pb-12 px-4 md:px-8">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (55% ≈ 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-chestnut/20 bg-vanilla px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-chestnut animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-chestnut">BATCH #14 FLAME-ROASTED TODAY - 06:45 AM</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[88px] leading-[0.9] font-black tracking-tighter text-espresso mb-6">
              MAISON BREW
            </h1>
            
            <p className="text-3xl md:text-4xl font-serif italic text-chestnut mb-6">
              Coffee, thoughtfully made in the heart of the city.
            </p>
            
            <p className="text-lg md:text-xl text-espresso/70 max-w-[45ch] mb-10 leading-relaxed">
              Between natural lime-plastered walls and the crackle of our 1968 Probat flame roaster, we celebrate dawn extractions, unhurried 72-hour wild-ferment laminations, and single-estate micro-lots cultivated with reverence.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <Link href="/space" className="rounded-full bg-chestnut px-8 py-3.5 text-sm font-medium text-white transition-transform active:scale-95 hover:bg-chestnut/90">
                Visit the Café
              </Link>
              <Link href="/menu" className="rounded-full border border-chestnut px-8 py-3.5 text-sm font-medium text-chestnut transition-colors active:scale-95 hover:bg-chestnut/5">
                Explore Menu
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 w-full border-t border-chestnut/10 pt-8">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-espresso">88.5</span>
                <span className="text-xs uppercase tracking-wider text-espresso/50 mt-1">SCA CUPPING SCORE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-espresso">72h</span>
                <span className="text-xs uppercase tracking-wider text-espresso/50 mt-1">COLD LAMINATION</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-espresso">100%</span>
                <span className="text-xs uppercase tracking-wider text-espresso/50 mt-1">SINGLE ORIGIN</span>
              </div>
            </div>
          </div>

          {/* Right Column (45% ≈ 5 cols) */}
          <div className="lg:col-span-5 relative h-[600px] lg:h-[800px] w-full mt-12 lg:mt-0 group">
            <div className="absolute inset-0 rounded-t-[240px] rounded-b-[24px] overflow-hidden shadow-warm-card border border-chestnut/10 z-0 bg-buttermilk">
              <div className="relative w-full h-full hero-image-container overflow-hidden">
                <Image 
                  src="/assets/hero-sunlit-hearth.jpeg" 
                  alt="Sunlit hearth at Maison Brew" 
                  fill 
                  className="object-cover object-center hero-image transition-opacity duration-700 group-hover:opacity-0"
                  priority
                />
                <video 
                  src="/assets/video-steam-sunlight.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute -left-12 top-24 bg-vanilla px-4 py-2 rounded-full border border-chestnut/15 shadow-sm hidden md:block">
              <span className="text-xs font-mono tracking-wider text-chestnut uppercase">100% ARABICA // MICRO-BATCH NO. 14</span>
            </div>
            <div className="absolute -right-8 top-1/2 bg-white px-5 py-3 rounded-full border border-chestnut/10 shadow-lg hidden md:block z-20">
              <span className="text-sm font-serif italic text-espresso">Notes: Valrhona Cacao &amp; Roasted Hazelnut</span>
            </div>
            <div className="absolute left-10 bottom-12 bg-espresso px-4 py-2 rounded-full shadow-lg hidden md:block z-20">
              <span className="text-xs font-bold tracking-widest text-white">89.5 SCA - GUJI HIGHLANDS</span>
            </div>
          </div>

        </div>
      </section>

      {/* 02. VALUE PILLARS */}
      <section className="value-section relative w-full bg-vanilla/30 py-32 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4">TERRE &amp; ETHOS</span>
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-espresso mb-6">Crafted With Purpose</h2>
            <p className="text-2xl font-serif italic text-espresso/70 max-w-2xl">
              &quot;Rooted in fair agrarian covenants, heritage cast-iron thermodynamics, and uncompromised slow fermentation.&quot;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", category: "DIRECT HARVEST", title: "Ethically Sourced", copy: "Direct relationships with single-estate farmers, ensuring fair compensation and sustainable terroir stewardship.", cta: "Trace Lot Pedigree", link: "/terroir", img: "/assets/roastery-pouches-lineup.jpeg" },
              { num: "02", category: "CAST IRON", title: "Flame Drum Roasting", copy: "Vintage 1968 Probat roasting. Heat transferred through thick cast iron to develop deep, sweet Maillard reactions.", cta: "View Drum Roaster Log", link: "/terroir", img: "/assets/roasting-craft-flame.jpeg" },
              { num: "03", category: "72H HEARTH", title: "Wild-Ferment Lamination", copy: "Patience yields flavor. Our doughs rest for three days to build complex lactic acids and open, delicate crumb structures.", cta: "Morning Oven Hours", link: "/menu", img: "/assets/viennoiserie-open-crumb.jpeg" },
              { num: "04", category: "ARCHITECTURE", title: "Circular Sanctuary", copy: "Designed as a retreat from the city. Natural materials, lime-washed acoustics, and deliberate architectural calm.", cta: "Read Sustainability Treaty", link: "/space", img: "/assets/sanctuary-interior-arches.jpeg" },
            ].map((pillar, i) => (
              <Link href={pillar.link} key={i} className="value-card group flex flex-col justify-between bg-vanilla rounded-[24px] p-7 border border-chestnut/10 hover:shadow-warm-card transition-all duration-500 hover:-translate-y-1">
                <div>
                  <div className="text-xs font-mono text-chestnut/60 mb-4">{pillar.num} / {pillar.category}</div>
                  <h3 className="text-xl font-bold text-espresso mb-3">{pillar.title}</h3>
                  <p className="text-sm text-espresso/70 leading-relaxed mb-6">{pillar.copy}</p>
                  {pillar.img && (
                    <div className="relative w-full h-32 mb-6 rounded-xl overflow-hidden shadow-sm">
                      <Image src={pillar.img} alt={pillar.title} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 25vw" />
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm font-medium text-chestnut group-hover:underline decoration-chestnut/30 underline-offset-4">
                  {pillar.cta} <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 03. ROASTER'S SHOWCASE */}
      <section className="coffee-section relative w-full bg-buttermilk py-32 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 overflow-hidden -mt-1 opacity-20 pointer-events-none">
           <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full preserve-3d">
             <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 45C840 60 960 90 1080 105C1200 120 1320 120 1380 120H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="#FAF7F2"/>
           </svg>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4 block">ORIGIN REGISTRY</span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-espresso lg:w-1/2">
                Our Coffee Collection
              </h2>
              <p className="text-lg text-espresso/70 lg:w-1/3 leading-relaxed">
                Handcrafted roasts delivered directly from our flame roasters to your cup. Whole bean, nitrogen-sealed for untamed aroma.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Chikmagalur Honey-Sun", badge: "Honey Sun", roast: 2, price: 650 },
              { name: "Maison Espresso Noir", badge: "Signature Roast", roast: 4, price: 580 },
              { name: "Araku Valley Anaerobic", badge: "Wild Ferment", roast: 3, price: 720 },
              { name: "Nilgiris Mountain Decaf", badge: "Pure Water", roast: 2, price: 620 },
            ].map((coffee, i) => (
              <div key={i} className="coffee-card bg-vanilla rounded-[24px] p-5 border border-chestnut/10 flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-warm-card">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vanilla/20 pointer-events-none"></div>
                
                <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden bg-linen flex items-center justify-center">
                  <Image src="/assets/roastery-pouches-lineup.jpeg" alt={coffee.name} fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-chestnut">
                    {coffee.badge}
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-espresso mb-1">{coffee.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs text-espresso/50 uppercase tracking-widest mr-2">Roast</span>
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < coffee.roast ? 'bg-chestnut' : 'bg-chestnut/20'}`}></div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-chestnut/10">
                    <span className="text-lg font-serif italic text-espresso">₹{coffee.price}</span>
                    <button 
                      onClick={() => addToCart({ name: coffee.name, price: coffee.price, grind: 'Whole Bean' })}
                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-transparent border border-chestnut text-sm font-medium text-chestnut hover:bg-chestnut hover:text-white transition-colors"
                    >
                      <ShoppingBag size={14} /> Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. SIGNATURE MOMENT: SENSORY DIAL */}
      <section className="w-full bg-linen py-32 px-4 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-espresso mb-4">Aroma &amp; Cupping Selector</h2>
            <p className="text-chestnut font-serif italic text-xl">Discover your perfect extraction.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((tab, idx) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === idx 
                    ? 'bg-chestnut text-white shadow-md' 
                    : 'bg-vanilla text-espresso/70 hover:bg-buttermilk border border-chestnut/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-vanilla rounded-[24px] p-8 md:p-12 border border-chestnut/15 shadow-warm-card transition-all duration-500 min-h-[400px] flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
              <div className="md:col-span-7">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-espresso mb-2">{currentTab.name}</h3>
                  <div className="text-chestnut font-serif italic text-lg">{currentTab.origin}</div>
                  <p className="text-sm text-espresso/70 mt-3">{currentTab.notes}</p>
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Caramel Sweetness", val: currentTab.sweet },
                    { label: "Floral Jasmine Acidity", val: currentTab.floral },
                    { label: "Tactile Body & Crema", val: currentTab.body },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-espresso/60 mb-2">
                        <span>{bar.label}</span>
                        <span>{bar.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-chestnut/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-chestnut rounded-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]"
                          style={{ width: `${bar.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-center gap-8 pl-0 md:pl-8 md:border-l border-chestnut/10">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-chestnut mb-2">Optimal Temp</div>
                  <div className="text-4xl font-light text-espresso">{currentTab.temp}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-chestnut mb-2">Recommended Pour</div>
                  <div className="text-xl font-medium text-espresso">{currentTab.pour}</div>
                  <div className="text-sm text-espresso/60 mt-1">300g total yield</div>
                </div>
              </div>
            </div>

            <div className="bg-buttermilk rounded-2xl p-6 border border-chestnut/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-chestnut mb-1">ATELIER PASTRY PAIRING</div>
                <div className="text-lg font-serif italic text-espresso">{currentTab.pastry}</div>
              </div>
              <button onClick={handleAddSensoryFlight} className="whitespace-nowrap px-6 py-2.5 rounded-full bg-white text-chestnut text-sm font-medium border border-chestnut/10 hover:border-chestnut/30 transition-colors active:scale-95">
                Add to Reservation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 05. KITCHEN ATELIER PLATES */}
      <section className="w-full bg-vanilla/50 py-32 px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative group">
              <div className="relative w-full aspect-[3/4] rounded-t-[200px] rounded-b-[24px] overflow-hidden shadow-warm-card border border-chestnut/10">
                <Image 
                  src="/assets/viennoiserie-open-crumb.jpeg" 
                  alt="Open crumb viennoiserie" 
                  fill 
                  className="object-cover object-center transition-opacity duration-700 group-hover:opacity-0" 
                />
                <video 
                  src="/assets/video-pastry-flaking.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-white rounded-2xl p-6 shadow-xl border border-chestnut/5 max-w-xs z-10">
                <div className="text-xs font-mono tracking-widest text-chestnut mb-2 uppercase">L&apos;ATELIER DU PAIN</div>
                <p className="text-sm font-serif italic text-espresso/80">&quot;Flour, butter, spring water, and twenty-two hours of patient wild fermentation.&quot;</p>
              </div>
            </div>

            <div className="pl-0 lg:pl-12">
              <h2 className="text-4xl md:text-5xl font-black text-espresso mb-12">Kitchen Atelier Plates</h2>
              
              <div className="space-y-8">
                {[
                  { name: "The Truffle & Wild Mushroom Brioche", price: 460 },
                  { name: "Double-Baked Almond & Orange Blossom Croissant", price: 340 },
                  { name: "Whipped Ricotta & Slow-Roasted Fig Toast", price: 380 },
                  { name: "84% PDO Beurre Laminated Croissant", price: 280 },
                ].map((item, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex items-end justify-between gap-4 mb-2">
                      <h4 className="text-xl font-medium text-espresso group-hover:text-chestnut transition-colors">{item.name}</h4>
                      <div className="flex-grow border-b border-dashed border-chestnut/20 mb-1.5 hidden sm:block"></div>
                      <span className="text-lg font-serif italic text-chestnut whitespace-nowrap">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-espresso/50">Freshly baked in limited daily batches.</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-chestnut/10">
                <Link href="/menu" className="flex items-center gap-2 text-chestnut font-medium hover:underline underline-offset-4">
                  View Complete Atelier Menu <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 06. PATRON LOVE */}
      <section className="w-full bg-linen py-32 px-4 md:px-8 border-b border-chestnut/5">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-caramel text-caramel" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-espresso mb-3">Trusted by Connoisseurs</h2>
            <div className="text-sm font-mono tracking-wider text-chestnut uppercase">4.98 / 5.0 (2,400+ Cupping Logs)</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "The most deliberate, respectful extraction of single-origin beans in the city. The space itself commands a quiet reverence for the craft.", author: "Ananya Kapoor", role: "Architectural Digest Contributor" },
              { text: "Their handling of the Araku anaerobic lot is masterclass. The wild ferment notes are preserved perfectly without overwhelming the cup.", author: "Jean-Marc Laurent", role: "SCA Certified Master Q-Grader" },
              { text: "It's rare to find a sanctuary that balances brutalist material honesty with such warm, hospitable service. A daily necessity.", author: "Rhea Varma", role: "Design Director, Studio Sōl" },
            ].map((review, i) => (
              <div key={i} className="bg-vanilla rounded-3xl p-8 border border-chestnut/10 flex flex-col justify-between">
                <p className="text-lg font-serif italic text-espresso/80 leading-relaxed mb-8">&quot;{review.text}&quot;</p>
                <div>
                  <div className="font-bold text-espresso">{review.author}</div>
                  <div className="text-xs text-chestnut/80 mt-1 uppercase tracking-widest">{review.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
