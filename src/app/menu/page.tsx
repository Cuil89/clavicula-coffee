"use client";

import { useState } from "react";

const categories = ["All", "Viennoiserie", "Sourdough Breads", "Savory Hearth", "Pour-Overs", "Signature Drinks"];

const menuItems = [
  { name: "The Truffle & Wild Mushroom Brioche", price: 460, category: "Savory Hearth", desc: "Earthy wild mushrooms, truffle butter, soft laminated brioche." },
  { name: "Double-Baked Almond & Orange Blossom Croissant", price: 340, category: "Viennoiserie", desc: "Frangipane core, flaked almonds, hint of citrus." },
  { name: "Whipped Ricotta & Slow-Roasted Fig Toast", price: 380, category: "Savory Hearth", desc: "Thick cut sourdough, honey drizzle, sea salt." },
  { name: "84% PDO Beurre Laminated Croissant", price: 280, category: "Viennoiserie", desc: "Classic honeycomb crumb, shatter-crisp shell." },
  { name: "Country Loaf (Whole)", price: 450, category: "Sourdough Breads", desc: "72-hour cold fermented, dark caramelized crust." },
  { name: "Olive & Rosemary Fougasse", price: 350, category: "Sourdough Breads", desc: "Kalamata olives, fresh herbs, pull-apart texture." },
  { name: "Chikmagalur Honey-Sun (Chemex)", price: 250, category: "Pour-Overs", desc: "Stone fruit sweetness, clean bright finish. Served for two." },
  { name: "Araku Anaerobic (AeroPress)", price: 280, category: "Pour-Overs", desc: "Wild fermented complexity, deep caramel." },
  { name: "Maison Espresso Noir", price: 180, category: "Signature Drinks", desc: "Double shot, thick crema, valrhona cacao notes." },
  { name: "Iced Vanilla Oat Foam Matcha", price: 320, category: "Signature Drinks", desc: "Ceremonial grade matcha, house-made oat milk, vanilla bean foam." },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-linen">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-chestnut mb-4 block">L&apos;ATELIER DU PAIN &amp; ROASTERY</span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-espresso mb-6">The Complete Menu</h1>
          <p className="text-xl font-serif italic text-espresso/70 max-w-2xl mx-auto">
            Everything baked and roasted in-house. Served fresh daily until sold out.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-chestnut text-white shadow-md' 
                  : 'bg-vanilla text-espresso/70 hover:bg-buttermilk border border-chestnut/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-x-24 gap-y-12">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="group border-b border-chestnut/10 pb-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="text-xl font-medium text-espresso group-hover:text-chestnut transition-colors leading-tight">
                  {item.name}
                </h4>
                <span className="text-lg font-serif italic text-chestnut whitespace-nowrap">₹{item.price}</span>
              </div>
              <p className="text-sm text-espresso/60 leading-relaxed pr-12">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
