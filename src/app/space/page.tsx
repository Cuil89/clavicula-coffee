"use client";

import Image from "next/image";

export default function SpacePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-buttermilk">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        <div className="text-center mb-24">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4 block">ARCHITECTURE & SANCTUARY</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-espresso mb-6">The Physical Space</h1>
          <p className="text-2xl font-serif italic text-espresso/70 max-w-3xl mx-auto">
            A quiet retreat from the Kala Ghoda streets. Built with acoustic lime plaster, reclaimed teak, and deliberate calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start mb-32">
          <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border border-chestnut/10">
            <Image src="/assets/sanctuary-interior-arches.jpeg" alt="Interior Arches" fill className="object-cover" />
          </div>
          <div className="pt-12">
            <h2 className="text-3xl font-black text-espresso mb-6">Material Honesty</h2>
            <p className="text-lg text-espresso/70 leading-relaxed mb-12">
              We stripped the heritage building back to its bones. Exposed brick arches transition into smooth lime-washed walls that naturally absorb city noise. The bar is a single slab of raw travertine, anchoring the room with geological weight.
            </p>
            <div className="space-y-8 border-l border-chestnut/20 pl-8">
              <div>
                <h4 className="font-bold text-espresso mb-2">Acoustic Lime Plaster</h4>
                <p className="text-sm text-espresso/60">Applied by hand over three weeks, dampening harsh frequencies to create a hushed atmosphere.</p>
              </div>
              <div>
                <h4 className="font-bold text-espresso mb-2">Reclaimed Teak Wood</h4>
                <p className="text-sm text-espresso/60">Sourced from dismantled colonial estates, providing warmth and tactile comfort to our seating.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative h-[600px] rounded-[32px] overflow-hidden">
          <Image src="/assets/cafe-twilight-pavilion.jpeg" alt="Twilight Pavilion" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso to-transparent flex flex-col justify-end p-12">
            <h3 className="text-3xl font-serif italic text-white mb-2">The Courtyard Garden</h3>
            <p className="text-white/80 max-w-xl">An open-air haven shaded by ancient banyan trees. Perfect for slow mornings and evening aperitifs under the Mumbai sky.</p>
          </div>
        </div>

      </div>
    </main>
  );
}
