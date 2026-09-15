"use client";

import Image from "next/image";

export default function TerroirPage() {
  return (
    <main className="min-h-screen pt-32 bg-vanilla">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-24 text-center">
        <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4 block">ORIGIN REGISTRY</span>
        <h1 className="text-5xl md:text-7xl lg:text-[88px] leading-[0.9] font-black tracking-tighter text-espresso mb-6">
          The Terroir
        </h1>
        <p className="text-2xl font-serif italic text-espresso/70 max-w-3xl mx-auto">
          Sourced from the high altitudes of Chikmagalur and the wild canopies of Araku Valley.
        </p>
      </div>

      {/* Video Loop & Probat Stats */}
      <div className="w-full bg-espresso text-linen py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <video 
            src="/assets/video-roaster-cooling.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">1968 Probat Flame Roaster</h2>
            <p className="text-lg text-linen/70 mb-8 font-serif italic">
              &quot;Heat transferred through thick cast iron to develop deep, sweet Maillard reactions without scorching the delicate cellular structure of the bean.&quot;
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-xs font-mono tracking-widest text-chestnut mb-1">BATCH SIZE</div>
                <div className="text-2xl font-light">12 KG</div>
              </div>
              <div>
                <div className="text-xs font-mono tracking-widest text-chestnut mb-1">DRUM TEMP MAX</div>
                <div className="text-2xl font-light">210°C</div>
              </div>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden border border-white/10">
            <Image src="/assets/roasting-craft-flame.jpeg" alt="Flame Roasting" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Origin Details */}
      <div className="mx-auto max-w-5xl px-4 md:px-8 py-32 space-y-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-black text-espresso mb-4">Chikmagalur Micro-Lots</h3>
            <p className="text-espresso/70 leading-relaxed mb-6">
              Nestled in the Baba Budangiri hills, our partner estates grow coffee under a dense canopy of silver oak and jackfruit trees. The slow maturation at 1,450 meters results in dense beans bursting with stone fruit sweetness and a clean, bright finish.
            </p>
            <div className="text-sm font-mono text-chestnut uppercase tracking-widest">Process: Honey-Sun Dried</div>
          </div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-t-full rounded-b-3xl overflow-hidden shadow-warm-card border border-chestnut/10">
            <Image src="/assets/roastery-pouches-lineup.jpeg" alt="Coffee Pouches" fill className="object-cover" />
          </div>
        </div>

      </div>
    </main>
  );
}
