with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update THEME_CONFIGS
pos_tc_start = code.find('const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {')
pos_tc_end = code.find('const HERO_BG_PRESETS = [', pos_tc_start)
assert pos_tc_start != -1 and pos_tc_end != -1, "THEME_CONFIGS not found"

theme_configs_replacement = '''const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {
  chestnut: {
    id: "chestnut",
    name: "Warm Chestnut & Amber",
    label: "🌰 Warm Chestnut",
    icon: "🌰",
    desc: "Harmonisasi hangat gradasi roasted mocha, butir hazelnut & terakota hangat",
    mainBg: "bg-[#F3EDE2] text-[#1E1610]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#2A170F] via-35% via-[#572E18] via-70% to-[#EDE5D8]",
    sectionBg: "bg-[#EDE5D8]",
    sectionAltBg: "bg-[#E5DACE]",
    sectionBorder: "border-[#8C4A22]/20",
    cardBg: "bg-[#FAF6F0]",
    cardImageBg: "bg-[#EFE7DC]",
    cardBorder: "border-[#8C4A22]/20 hover:border-[#8C4A22]/60",
    cardShadow: "shadow-[0_12px_36px_-12px_rgba(140,74,34,0.14)] hover:shadow-[0_20px_44px_-10px_rgba(140,74,34,0.22)]",
    headingColor: "text-[#1E1610]",
    subtextColor: "text-[#1E1610]/75",
    accentColor: "text-[#8C4A22]",
    badgeBg: "bg-[#8C4A22]",
    badgeText: "text-[#FAF6F0]",
    controlBg: "bg-[#FAF6F0]",
    controlBorder: "border-[#8C4A22]/25",
    pillActive: "bg-[#8C4A22] text-[#FAF6F0] shadow-md font-bold",
    pillInactive: "bg-[#E2D6C5] text-[#3D2818] border border-[#8C4A22]/20 hover:bg-[#8C4A22]/15",
  },
  noir: {
    id: "noir",
    name: "Midnight Roastery Sanctuary",
    label: "🌙 Midnight Roastery",
    icon: "🌙",
    desc: "Kemewahan noir roastery tanpa silau putih, full dark mode amber emas",
    mainBg: "bg-[#140F0C] text-[#F7F2E8]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#16100D] to-[#140F0C]",
    sectionBg: "bg-[#140F0C]",
    sectionAltBg: "bg-[#19130F]",
    sectionBorder: "border-white/10",
    cardBg: "bg-[#1E1611]",
    cardImageBg: "bg-[#130E0A]",
    cardBorder: "border-white/10 hover:border-[#e7a93c]/50",
    cardShadow: "shadow-2xl hover:shadow-[0_20px_44px_-10px_rgba(231,169,60,0.18)]",
    headingColor: "text-[#F7F2E8]",
    subtextColor: "text-[#D5CCC1]",
    accentColor: "text-[#e7a93c]",
    badgeBg: "bg-[#e7a93c]",
    badgeText: "text-[#100d0a]",
    controlBg: "bg-[#1E1611]",
    controlBorder: "border-white/15",
    pillActive: "bg-[#e7a93c] text-[#100d0a] shadow-md font-bold",
    pillInactive: "bg-[#1E1611] text-[#D5CCC1] border border-white/15 hover:border-[#e7a93c]/40",
  },
  forest: {
    id: "forest",
    name: "Guci Pine & Highland Mist",
    label: "🌲 Guci Pine Hills",
    icon: "🌲",
    desc: "Kesejukan kabut pinus pegunungan Guci dengan gradasi hijau botani alami",
    mainBg: "bg-[#E1E7DF] text-[#131F16]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#182319] via-40% via-[#314736] via-75% to-[#E1E7DF]",
    sectionBg: "bg-[#E1E7DF]",
    sectionAltBg: "bg-[#D6DFD4]",
    sectionBorder: "border-[#2C4334]/20",
    cardBg: "bg-[#F7FAF6]",
    cardImageBg: "bg-[#E4ECE3]",
    cardBorder: "border-[#2C4334]/20 hover:border-[#2C4334]/60",
    cardShadow: "shadow-sm hover:shadow-[0_16px_36px_-10px_rgba(44,67,52,0.18)]",
    headingColor: "text-[#131F16]",
    subtextColor: "text-[#131F16]/75",
    accentColor: "text-[#2C4334]",
    badgeBg: "bg-[#2C4334]",
    badgeText: "text-[#F7FAF6]",
    controlBg: "bg-[#F7FAF6]",
    controlBorder: "border-[#2C4334]/25",
    pillActive: "bg-[#2C4334] text-[#F7FAF6] shadow-md font-bold",
    pillInactive: "bg-[#D3DBD0] text-[#1B291F] border border-[#2C4334]/20 hover:bg-[#2C4334]/15",
  },
};

'''

code = code[:pos_tc_start] + theme_configs_replacement + code[pos_tc_end:]

# 2. Manifesto section tag
manifesto_tag_old = '<section className="relative py-20 md:py-28 bg-[#120E0C] text-[#F7F2E8] border-b border-[#2A1D15] overflow-hidden">'
manifesto_tag_new = '<section className="relative py-20 md:py-28 bg-[#120E0C] text-[#F7F2E8] overflow-hidden">'
if manifesto_tag_old in code:
    code = code.replace(manifesto_tag_old, manifesto_tag_new, 1)

# 3. Transition ribbon height
ribbon_old = '<div className={`w-full h-24 md:h-36 transition-all duration-700 ${t.transitionGradient}`} />'
ribbon_new = '<div className={`w-full h-32 md:h-48 transition-all duration-700 ${t.transitionGradient}`} />'
if ribbon_old in code:
    code = code.replace(ribbon_old, ribbon_new, 1)

# 4. Outlets Section replacement by slice
pos_outlets_start = code.find('{/* ─── 5. SANCTUARY OUTLETS')
pos_outlets_end = code.find('{/* ─── 6. THE RITUAL')
assert pos_outlets_start != -1 and pos_outlets_end != -1, "Outlets boundaries not found"

outlets_section_new = '''{/* ─── 5. SANCTUARY OUTLETS SHOWCASE (REAL CLAVICULA PLACES) ─────── */}
      <section className={`py-20 md:py-28 ${t.sectionAltBg} border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
              DUA RUANG SANCTUARY // SLAWI &amp; GUCI HILLS
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor}`}>
              Dua Suasana, Satu Cita Rasa
            </h2>
            <p className={`mt-2 text-sm ${t.subtextColor} font-serif italic max-w-2xl`}>
              Pilih ritme Anda: bar roastery berenergi kreatif di Slawi, atau ketenangan kabut sejuk hutan pinus di Clavicula Hills Guci.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Outlet 1: Slawi Roastery */}
            <div className={`group ${t.cardBg} rounded-[2.5rem] overflow-hidden border ${t.cardBorder} ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/hero-slowbar-clavicula.jpg"
                  alt="Clavicula Coffee &amp; Idea Slow Bar Slawi"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 01 · Slawi (Kalisapu)
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                  Jl. DR. Soetomo No.3, Kalisapu, Slawi, Tegal
                </span>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-2 transition-colors`}>
                  Slow Bar &amp; Roastery Lab Slawi
                </h3>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Pusat eksplorasi sangrai kopi dengan Slow Bar manual brew V60, interior berkonsep modern industrial yang sejuk untuk WFC, dan outdoor terrace untuk diskusi kreatif.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Slow Bar V60</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Roastery In-House</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Co-Working &amp; WFC</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Live Music Weekend</span>
                </div>
              </div>
            </div>

            {/* Outlet 2: Guci Hills */}
            <div className={`group ${t.cardBg} rounded-[2.5rem] overflow-hidden border ${t.cardBorder} ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
                <Image
                  src="/assets/clavicula/places/ruang-wfc-slawi-dan-view-guci.jpg"
                  alt="Clavicula Coffee &amp; Hills Guci Highland View"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 02 · Guci Hills (Highland)
                </span>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white/90">
                  Kawasan Wisata Guci, Bojong, Tegal (Lereng Gn. Slamet)
                </span>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-2 transition-colors`}>
                  Highland Sanctuary Hutan Pinus Guci
                </h3>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Nikmati udara pegunungan yang sangat dingin dan segar dengan area rooftop terbuka. Menikmati semangkuk tomyam hangat, steak, dan seduhan kopi di tengah panorama hijau.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Highland Pine View</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Open-Air Rooftop Deck</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Hawa Dingin Pegunungan</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Steak &amp; Tomyam Warmth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      '''

code = code[:pos_outlets_start] + outlets_section_new + code[pos_outlets_end:]

# 5. Ritual Section replacement by slice
pos_ritual_start = code.find('{/* ─── 6. THE RITUAL')
pos_ritual_end = code.find('{/* ─── 7. THE STATS')
assert pos_ritual_start != -1 and pos_ritual_end != -1, "Ritual boundaries not found"

ritual_section_new = '''{/* ─── 6. THE RITUAL (EDITORIAL 2-COLUMN) ─────────────────────── */}
      <section id="ritual" className={`py-20 md:py-28 ${t.sectionBg} border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Media: Authentic V60 Pouring at Clavicula */}
            <div className={`lg:col-span-5 relative aspect-[3/4] rounded-[2rem] overflow-hidden border ${t.cardBorder} shadow-xl ${t.cardBg}`}>
              <Image
                src="/assets/clavicula/places/slow-bar-v60-clavicula.jpg"
                alt="Slow bar pour and manual brew ritual at Clavicula Coffee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className={`inline-block px-3 py-1 rounded-full ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider mb-2`}>
                  Slow Bar &amp; Roastery Lab
                </span>
                <p className="text-xs font-serif italic text-white/90">
                  Diseduh dengan presisi rasio, temperatur, dan waktu demi memunculkan potensi terbaik biji kopi arabika pilihan.
                </p>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-7">
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                THE RITUAL // SENI MENIKMATI KOPI
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor} leading-tight mb-8`}>
                Empat Langkah Menikmati Sajian Clavicula
              </h2>

              <ol className="space-y-6">
                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    01
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Hirup Aromanya
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Sebelum menyesap, dekatkan cangkir dan hirup aroma karamel, rempah buah, atau wangi floral yang terperangkap dalam crema espresso murni.
                    </p>
                  </div>
                </li>

                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    02
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Sesap Layer Pertama
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Untuk menu anatomi berlayer seperti Manubrium atau Sternum, sesap dahulu krim halusnya sebelum diaduk agar seluruh lapisan rasa terasa utuh.
                    </p>
                  </div>
                </li>

                <li className={`flex gap-5 pb-6 border-b ${t.sectionBorder}`}>
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    03
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Padukan dengan Santapan Dapur
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Seduhan kopi semakin sempurna disandingkan dengan gurihnya Clavicula Tenderloin Steak lada hitam, semangkuk tomyam hangat, atau camilan manis croffle.
                    </p>
                  </div>
                </li>

                <li className="flex gap-5">
                  <span className={`font-display text-2xl md:text-3xl font-extrabold ${t.accentColor} min-w-[2.5rem]`}>
                    04
                  </span>
                  <div>
                    <h3 className={`font-display text-xl font-bold ${t.headingColor} mb-1`}>
                      Duduk &amp; Bertukar Ide
                    </h3>
                    <p className={`text-sm ${t.subtextColor} leading-relaxed`}>
                      Biarkan waktu melambat. Ruang kafe kami di Slawi dan pemandangan pinus Guci dirancang agar Anda bisa berdiskusi, bekerja santai, atau melepas penat bersama kerabat.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      '''

code = code[:pos_ritual_start] + ritual_section_new + code[pos_ritual_end:]

# 6. Stats Section replacement by slice
pos_stats_start = code.find('{/* ─── 7. THE STATS')
pos_stats_end = code.find('{/* ─── 8. THE COMPLETE CAFE')
assert pos_stats_start != -1 and pos_stats_end != -1, "Stats boundaries not found"

stats_section_new = '''{/* ─── 7. THE STATS SECTION ───────────────────────────────────── */}
      <section className={`${t.sectionAltBg} py-16 border-b ${t.sectionBorder} transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                6+
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Signature Anatomi Ikonik
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                2
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Sanctuary Outlet (Slawi &amp; Guci)
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                120+
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Menu Minuman &amp; Santapan Dapur
              </p>
            </div>

            <div className={`border-l ${t.sectionBorder} pl-5`}>
              <span className={`font-display font-black text-4xl md:text-5xl ${t.accentColor} block leading-none`}>
                100%
              </span>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-mono uppercase tracking-wider`}>
                Halal Certified Kitchen
              </p>
            </div>
          </div>
        </div>
      </section>

      '''

code = code[:pos_stats_start] + stats_section_new + code[pos_stats_end:]

# 7. Full Menu Section replacement by slice
pos_fullmenu_start = code.find('{/* ─── 8. THE COMPLETE CAFE')
pos_fullmenu_end = code.find('{/* ─── 9. QUOTE ATMOSPHERE')
assert pos_fullmenu_start != -1 and pos_fullmenu_end != -1, "Full Menu boundaries not found"

fullmenu_section_new = '''{/* ─── 8. THE COMPLETE CAFE MENU (ALL 120+ ITEMS FROM PDF) ─────── */}
      <section id="full-menu" className={`py-20 md:py-28 ${t.sectionBg} scroll-mt-24 transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b ${t.sectionBorder}`}>
            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                DAFTAR MENU RESMI // BUKU MENU KAFE LENGKAP
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor}`}>
                The Complete Cafe Menu
              </h2>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-serif italic`}>
                Seluruh hidangan dan seduhan resmi dari buku menu fisik kafe Slawi &amp; Guci. Semua harga sudah nett termasuk PPN.
              </p>
            </div>

            {/* View Mode Switcher & Quick Theme Switcher */}
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              {/* Quick Theme Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-full ${t.controlBg} border ${t.controlBorder} shadow-sm`}>
                {[
                  { id: "chestnut", label: "🌰 Warm" },
                  { id: "noir", label: "🌙 Noir" },
                  { id: "forest", label: "🌲 Guci" },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setColorTheme(th.id as ColorTheme)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                      colorTheme === th.id
                        ? `${t.badgeBg} ${t.badgeText} font-bold shadow-sm scale-105`
                        : `${t.subtextColor} hover:${t.headingColor}`
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>

              {/* View Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-full ${t.controlBg} border ${t.controlBorder} shadow-sm`}>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    viewMode === "card"
                      ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                      : `${t.subtextColor} hover:${t.headingColor}`
                  }`}
                >
                  Kartu Bergambar
                </button>
                <button
                  onClick={() => setViewMode("paper")}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    viewMode === "paper"
                      ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                      : `${t.subtextColor} hover:${t.headingColor}`
                  }`}
                >
                  Buku Menu (Paper)
                </button>
              </div>
            </div>
          </div>

          {/* Official Scanned PDF Posters Drawer */}
          {showPosterGallery && (
            <div className={`mb-14 p-6 md:p-8 ${t.sectionAltBg} rounded-3xl border ${t.sectionBorder} shadow-sm animate-in fade-in duration-300`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`font-display text-lg md:text-xl font-bold ${t.headingColor}`}>
                    Lembar Dokumen Menu Asli PDF (12 Lembar Kafe)
                  </h3>
                  <p className={`text-xs ${t.subtextColor} font-serif italic`}>
                    Arsip visual dokumen resmi dari meja kasir dan dapur Clavicula Slawi &amp; Guci Hills
                  </p>
                </div>
                <button
                  onClick={() => setShowPosterGallery(false)}
                  className={`text-xs font-mono ${t.accentColor} hover:underline font-semibold`}
                >
                  Tutup Galeri
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                {POSTER_GALLERY.map((poster, idx) => (
                  <div
                    key={idx}
                    className={`snap-start shrink-0 w-64 md:w-72 ${t.cardBg} rounded-2xl overflow-hidden border ${t.cardBorder} shadow-sm`}
                  >
                    <div className="relative aspect-[1/1.41] bg-black">
                      <Image
                        src={poster.src}
                        alt={poster.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className={`p-3 ${t.cardBg} border-t ${t.sectionBorder}`}>
                      <span className={`text-xs font-bold ${t.headingColor} line-clamp-1 block`}>
                        {poster.title}
                      </span>
                      <a
                        href={poster.src}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-[10px] font-mono ${t.accentColor} hover:underline flex items-center gap-1 mt-1 font-semibold`}
                      >
                        Buka Resolusi Penuh →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Box & Item Counter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-80">
              <Search
                size={16}
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${t.subtextColor} opacity-60`}
              />
              <input
                type="text"
                placeholder="Cari menu, kopi, steak, tomyam, camilan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${t.controlBg} rounded-full pl-11 pr-4 py-3 text-xs md:text-sm border ${t.controlBorder} ${t.headingColor} placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#8C4A22]/20 transition-all shadow-sm`}
              />
            </div>
            <div className={`text-xs font-mono ${t.subtextColor} self-center`}>
              Menampilkan <span className={`font-bold ${t.accentColor}`}>{filteredItems.length}</span> pilihan menu
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? `${t.pillActive} scale-105`
                    : `${t.pillInactive}`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ─── DISPLAY: CARD VIEW (EMBER COFFEE LUXURY LIGHT CARDS) ──── */}
          {filteredItems.length === 0 ? (
            <div className={`py-20 text-center ${t.subtextColor} ${t.cardBg} rounded-3xl border ${t.cardBorder} p-8 shadow-sm`}>
              <p className={`font-serif italic text-2xl ${t.headingColor} mb-2`}>Menu tidak ditemukan</p>
              <p className="text-xs">Coba gunakan kata kunci pencarian yang lain.</p>
            </div>
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`group ${t.cardBg} rounded-3xl p-5 border ${t.cardBorder} hover:-translate-y-1.5 ${t.cardShadow} transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    {item.image ? (
                      <div className={`relative w-full aspect-[4/3] mb-4 rounded-2xl overflow-hidden ${t.cardImageBg} border ${t.sectionBorder}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className={`group-hover:scale-105 transition-transform duration-500 ${
                            item.image.endsWith(".webp")
                              ? "object-contain p-3"
                              : "object-cover"
                          }`}
                        />
                        {item.badge && (
                          <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full ${t.badgeBg} ${t.badgeText} font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className={`w-full h-20 mb-4 rounded-2xl ${t.cardImageBg} border ${t.sectionBorder} flex items-center justify-between px-4`}>
                        <span className={`text-[11px] font-mono tracking-wider ${t.accentColor} uppercase font-semibold`}>
                          ✦ {item.category}
                        </span>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded ${t.badgeBg} ${t.badgeText} font-mono text-[9px] font-bold uppercase`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className={`font-display text-lg font-bold ${t.headingColor} transition-colors leading-snug`}>
                        {item.name}
                      </h4>
                      <span className={`font-mono text-base font-bold ${t.accentColor} whitespace-nowrap`}>
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <p className={`text-xs ${t.subtextColor} leading-relaxed mb-4`}>
                      {item.notes}
                    </p>
                  </div>

                  <div className={`pt-3 border-t ${t.sectionBorder} flex items-center justify-between text-[11px] font-mono ${t.subtextColor}`}>
                    <span>{item.category}</span>
                    <span className={`${t.accentColor} font-semibold`}>Tersedia di Outlet</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ─── DISPLAY: PAPER STYLE MENU (CLASSIC EDITORIAL LIST) ─── */
            <div className={`${t.cardBg} rounded-3xl p-6 md:p-10 border ${t.cardBorder} shadow-sm divide-y ${t.sectionBorder}`}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 hover:${t.sectionAltBg} px-4 rounded-xl transition-colors`}
                >
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-display text-base font-bold ${t.headingColor} leading-snug`}>
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${t.badgeBg} ${t.badgeText} font-bold`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className={`text-xs ${t.subtextColor} font-serif italic mt-0.5`}>
                      {item.notes}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className={`font-mono text-base font-bold ${t.accentColor}`}>
                      Rp {item.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          '''

code = code[:pos_fullmenu_start] + fullmenu_section_new + code[pos_fullmenu_end:]

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully applied complete theme styles across all sections via slice replacement!")
