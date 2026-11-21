import re

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Define the presets
presets_code = '''const HERO_BG_PRESETS = [
  {
    id: "twilight",
    name: "Twilight Sanctuary",
    label: "01 · Twilight Pavilion",
    src: "/assets/cafe-twilight-pavilion.jpeg",
    alt: "Warm ambient twilight architectural cafe pavilion with incandescent glow",
    description: "Pendar lampu hangat, interior kayu estetik, dan suasana senja yang tenang.",
    brightness: "brightness-[0.55] contrast-[1.08]",
  },
  {
    id: "slowbar",
    name: "Slow Bar Slawi",
    label: "02 · Slow Bar Slawi (Asli)",
    src: "/assets/clavicula/places/hero-slowbar-clavicula.jpg",
    alt: "Authentic Clavicula Coffee Slow Bar with artisan espresso station",
    description: "Ruang bar asli Clavicula Slawi dengan mesin espresso dan cahaya temaram hangat.",
    brightness: "brightness-[0.50] contrast-[1.10]",
  },
  {
    id: "arches",
    name: "Sunlit Arches",
    label: "03 · Sunlit Arches",
    src: "/assets/sanctuary-interior-arches.jpeg",
    alt: "Minimalist sunlit architectural arches with warm linen daylight",
    description: "Sentuhan arsitektur modern minimalis dengan cahaya alami yang menenangkan.",
    brightness: "brightness-[0.48] contrast-[1.08]",
  },
  {
    id: "guci",
    name: "Guci Pine Hills",
    label: "04 · Pine Forest Guci (Asli)",
    src: "/assets/clavicula/places/suasana-tempat-clavicula-guci-hills.png",
    alt: "Clavicula Hills Guci surrounded by cool mountain pine trees",
    description: "Kesejukan udara pegunungan dan panorama hutan pinus Clavicula Hills Guci.",
    brightness: "brightness-[0.45] contrast-[1.12]",
  },
];
'''

# Find insertion point before export default function MenuPage
export_idx = code.find('export default function MenuPage() {')
assert export_idx != -1, "export default function MenuPage not found"

new_code = code[:export_idx] + presets_code + "\n" + code[export_idx:]

# Add selectedBg state
state_search = 'const [showPosterGallery, setShowPosterGallery] = useState(false);'
state_replace = '''const [showPosterGallery, setShowPosterGallery] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string>("twilight");
  const activeBgPreset = HERO_BG_PRESETS.find((p) => p.id === selectedBg) || HERO_BG_PRESETS[0];'''
assert state_search in new_code, "state_search not found"
new_code = new_code.replace(state_search, state_replace, 1)

# Find Hero section to replace
hero_start = new_code.find('{/* ─── 1. HERO SECTION (ATMOSPHERIC EMBER COFFEE PHOTO HERO) ───── */}')
hero_end = new_code.find('{/* ─── 3. MANIFESTO PHILOSOPHY SECTION', hero_start)
assert hero_start != -1, "hero_start not found"
assert hero_end != -1, "hero_end not found"

new_hero_marquee = '''{/* ─── 1. HERO SECTION (ATMOSPHERIC SANCTUARY COFFEE PHOTO HERO) ───── */}
      <section className="relative min-h-[92svh] flex flex-col justify-center overflow-hidden pt-40 md:pt-48 pb-16 text-[#f1e7d6]">
        {/* Dynamic Atmospheric Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            key={activeBgPreset.id}
            src={activeBgPreset.src}
            alt={activeBgPreset.alt}
            fill
            priority
            className={`object-cover object-center transition-all duration-700 ease-in-out ${activeBgPreset.brightness}`}
          />
          {/* Subtle cinematic gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b09] via-[#0e0b09]/55 to-[#0e0b09]/75 pointer-events-none"></div>
          {/* Subtle amber radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(14,11,9,0.5)_100%)] pointer-events-none"></div>
        </div>

        <div className="container relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full">
          {/* Interactive Aesthetic Atmosphere / Background Switcher */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 shadow-xl">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#e7a93c] px-3 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
                Pilihan Suasana:
              </span>
              {HERO_BG_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedBg(preset.id)}
                  className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    selectedBg === preset.id
                      ? "bg-[#e7a93c] text-[#100d0a] font-bold shadow-md scale-[1.03]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  title={preset.description}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <span className="hidden xl:inline-block text-[11px] font-mono text-white/50 italic">
              ✦ {activeBgPreset.description}
            </span>
          </div>

          {/* Eyebrow */}
          <p className="ember-eyebrow mb-4">
            Small batch · Anatomical roastery · Slawi &amp; Guci Hills
          </p>

          {/* Heading with generous clearance below floating navbar */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight text-[#f7f2e8] leading-[0.98] max-w-4xl">
            Coffee worth<br />
            <span className="font-serif italic font-normal text-[#e7a93c] tracking-normal">
              slowing down for.
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-[rgba(241,231,214,0.85)] font-light leading-relaxed">
            Sebuah ruang perjumpaan antara presisi anatomi tubuh dan seni sangrai kopi nusantara. 
            Dari bar roastery di Slawi hingga sejuknya kabut pegunungan pinus di Guci, 
            nikmati kurasi sajian single origin, anatomical signature series, serta hidangan dapur spesial.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#lineup"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6] hover:-translate-y-0.5 transition-all shadow-[0_18px_40px_-16px_rgba(231,169,60,0.5)]"
            >
              Jelajahi The Lineup ⟶
            </a>
            <a
              href="#full-menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#f1e7d6] border border-white/20 hover:bg-white/10 transition-all"
            >
              Daftar Menu Lengkap (120+ Menu)
            </a>
            <button
              onClick={() => setShowPosterGallery(!showPosterGallery)}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-mono text-xs uppercase tracking-wider text-[#e7a93c] border border-[#e7a93c]/40 hover:bg-[#e7a93c]/15 transition-all font-semibold shadow-sm"
            >
              <BookOpen size={15} />
              {showPosterGallery ? "Tutup Lembar PDF" : "Buku Menu Fisik (PDF 12 Lembar)"}
            </button>
          </div>

          {/* Hero Foot (Key Metrics) */}
          <div className="mt-14 pt-8 border-t border-[rgba(241,231,214,0.15)] flex flex-wrap items-center gap-6 md:gap-10 text-xs font-mono uppercase tracking-wider text-[rgba(241,231,214,0.7)]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Slawi &amp; Guci Hills, Tegal
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Est. 2020
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Anatomy &amp; Single Origin
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              100% Halal Certified Kitchen
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. TRANSISI MARQUEE REFINED (REFINED ESPRESSO & WARM GOLD TICKER) ───────────── */}
      <section className="bg-[#120e0b] text-[#e7a93c] py-4 md:py-4.5 overflow-hidden border-y border-[#e7a93c]/20 select-none font-display font-bold text-sm md:text-base tracking-[0.18em] uppercase shadow-inner">
        <div className="animate-ember-marquee flex items-center gap-6 whitespace-nowrap">
          <span>ANATOMICAL COFFEE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>FRESH ROASTED IN-HOUSE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SLOW BAR SANCTUARY</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>STEAK &amp; TOMYAM WARMTH</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>MANUAL BREW NUSANTARA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>ALL PRICES NETT (INCL. PPN)</span>
          <span className="text-[#e7a93c]/50">✦</span>

          {/* Loop repeat */}
          <span>ANATOMICAL COFFEE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SPECIALTY GRADE ARABICA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>FRESHLY GROUND DAILY</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>COZY PINUS CLAVICULA HILLS GUCI</span>
          <span className="text-[#e7a93c]/50">✦</span>
        </div>
      </section>

      '''

new_code = new_code[:hero_start] + new_hero_marquee + new_code[hero_end:]

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Applied updated Hero & Marquee to src/app/menu/page.tsx!")
