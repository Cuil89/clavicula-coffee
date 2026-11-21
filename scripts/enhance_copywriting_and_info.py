with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update Hero section copy
hero_start = code.find('{/* Eyebrow */}')
hero_end = code.find('{/* ─── 2. TRANSISI MARQUEE')
assert hero_start != -1 and hero_end != -1, "Hero block not found"

hero_new = '''{/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#e7a93c]/30 text-[#e7a93c] text-xs font-mono uppercase tracking-widest mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
            Small Batch · In-House Roastery · Slawi &amp; Guci Hills
          </div>

          {/* Heading with generous clearance below floating navbar */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight text-[#f7f2e8] leading-[0.98] max-w-4xl">
            Coffee worth<br />
            <span className="font-serif italic font-normal text-[#e7a93c] tracking-normal">
              slowing down for.
            </span>
          </h1>

          {/* Sub-tagline quote */}
          <p className="mt-4 text-lg sm:text-2xl font-serif italic text-white/90 font-light">
            &ldquo;Secangkir jeda berharga di tengah ritme dunia yang serba terburu-buru.&rdquo;
          </p>

          {/* Lead Paragraph with rich real information */}
          <p className="mt-4 md:mt-6 max-w-2xl text-base sm:text-lg text-[rgba(241,231,214,0.85)] font-light leading-relaxed">
            Dilahirkan dari latar belakang medis di Slawi, nama <strong className="text-white font-medium">Clavicula</strong> (tulang selangka) menjadi simbol simpul penyeimbang yang menyatukan ide, raga, dan rasa. Dari aroma sangrai segar di bar roastery Slawi hingga sejuknya kabut hutan pinus di Clavicula Hills Guci (1.050 mdpl), nikmati kurasi 120+ sajian halal: deretan signature anatomi berlayer, seduhan single origin arabika nusantara, serta hidangan dapur hangat mulai dari Tenderloin Steak hingga semangkuk Tomyam gurih.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#lineup"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm bg-[#e7a93c] text-[#100d0a] hover:bg-[#faf3e6] hover:-translate-y-0.5 transition-all shadow-[0_18px_40px_-16px_rgba(231,169,60,0.5)] font-mono tracking-wide"
            >
              Jelajahi The Lineup ⟶
            </a>
            <a
              href="#full-menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm text-[#f1e7d6] border border-white/20 hover:bg-white/10 transition-all font-mono tracking-wide"
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
              2 Ruang Sanctuary: Slawi &amp; Guci Hills
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Est. 2020 · In-House Roastery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              Anatomy &amp; Single Origin
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
              100% Halal Certified Kitchen · All Nett (PPN Incl.)
            </span>
          </div>
        </div>
      </section>

      '''

code = code[:hero_start] + hero_new + code[hero_end:]

# 2. Update Marquee Ticker
marquee_start = code.find('{/* ─── 2. TRANSISI MARQUEE')
marquee_end = code.find('{/* ─── 3. MANIFESTO PHILOSOPHY')
assert marquee_start != -1 and marquee_end != -1, "Marquee block not found"

marquee_new = '''{/* ─── 2. TRANSISI MARQUEE REFINED (REFINED ESPRESSO & WARM GOLD TICKER) ───────────── */}
      <section className="bg-[#120e0b] text-[#e7a93c] py-4 md:py-4.5 overflow-hidden border-y border-[#e7a93c]/20 select-none font-display font-bold text-sm md:text-base tracking-[0.18em] uppercase shadow-inner">
        <div className="animate-ember-marquee flex items-center gap-6 whitespace-nowrap">
          <span>ANATOMICAL SIGNATURE COFFEE</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>IN-HOUSE ROASTERY LAB SLAWI</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>COZY HIGHLAND PINUS GUCI (1.050 MDPL)</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>CLAVICULA TENDERLOIN STEAK 80K NETT</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>SLOW BAR V60 MANUAL BREW NUSANTARA</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>100% HALAL CERTIFIED KITCHEN</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>ALL PRICES NETT (PPN INCLUDED)</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>CO-WORKING SPACE &amp; FAST WIFI</span>
          <span className="text-[#e7a93c]/50">✦</span>
          <span>TOMYAM SEAFOOD WARMTH</span>
          <span className="text-[#e7a93c]/50">✦</span>

          {/* Loop repeat */}
          <span>ANATOMICAL SIGNATURE COFFEE</span>
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

code = code[:marquee_start] + marquee_new + code[marquee_end:]

# 3. Update Manifesto Narrative & Badges
manifesto_start = code.find('{/* ─── 3. MANIFESTO PHILOSOPHY')
manifesto_end = code.find('{/* ─── TRANSITION GRADIENT')
assert manifesto_start != -1 and manifesto_end != -1, "Manifesto block not found"

manifesto_new = '''{/* ─── 3. MANIFESTO PHILOSOPHY SECTION (COHESIVE ESPRESSO EDITORIAL SPREAD) ─── */}
      <section className="relative py-20 md:py-28 bg-[#120E0C] text-[#F7F2E8] overflow-hidden">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-[#e7a93c]/[0.06] rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column (7 cols): Editorial Typography & Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              {/* Eyebrow with hairline rule */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[#e7a93c]/70"></span>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#e7a93c] font-bold">
                  01 // FILOSOFI ANATOMI &bull; COFFEE &amp; IDEA
                </span>
              </div>

              {/* Big Serif Pull Quote */}
              <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal text-[#F7F2E8] leading-[1.12] tracking-tight mb-8">
                &ldquo;Kami percaya secangkir kopi lebih dari sekadar tegukan yang berlalu.&rdquo;
              </blockquote>

              {/* Storytelling Narrative Paragraphs */}
              <div className="space-y-4 text-base sm:text-lg text-[#D5CCC1] font-light leading-relaxed max-w-xl mb-8">
                <p>
                  Terinspirasi dari istilah medis <em className="font-serif italic font-medium text-white">clavicula</em> (tulang selangka)—tulang horizontal tunggal yang mengaitkan lengan dengan tubuh utama, menjaga keseimbangan dan gerak presisi—Clavicula Coffee &amp; Idea lahir di Slawi sebagai ruang temu yang bersahaja.
                </p>
                <p>
                  Bagi kami, seduhan kopi adalah seni presisi yang berakar pada sains: rasio gramasi yang tepat, temperatur air terkontrol, serta profil sangrai drum cast-iron yang disesuaikan dengan karakter tiap varietas biji nusantara. Semuanya diracik demi{" "}
                  <span className="font-serif italic font-normal text-[#e7a93c] text-lg sm:text-xl">
                    menyatukan ide, percakapan hangat, dan kejujuran rasa.
                  </span>
                </p>
                <p className="text-sm sm:text-base text-[#D5CCC1]/85">
                  Kopi adalah katalis, sedangkan &ldquo;Idea&rdquo; adalah gagasan yang lahir darinya. Di meja kami, Anda bebas melambat, membaca buku, bekerja, atau bertukar cerita tanpa diburu waktu.
                </p>
              </div>

              {/* Editorial Highlights / Badges Row */}
              <div className="flex flex-wrap items-center gap-3.5 pt-6 border-t border-white/10 w-full">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>DUA OUTLET &bull; SLAWI &amp; GUCI</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>IN-HOUSE CAST-IRON ROAST</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm text-xs font-mono text-[#D5CCC1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7a93c]"></span>
                  <span>ALL PRICES NETT (PPN INCL.)</span>
                </div>
                <a
                  href="#lineup"
                  className="text-xs font-mono tracking-wider uppercase text-[#e7a93c] font-semibold hover:underline inline-flex items-center gap-1.5 ml-auto pt-1"
                >
                  Jelajahi 8 Sajian Ikonik &rarr;
                </a>
              </div>

            </div>

            {/* Right Column (5 cols): Cohesive Video Composition */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#1A1410] shadow-2xl group max-w-[420px] mx-auto lg:ml-auto hover:border-[#e7a93c]/30 transition-all duration-500">
                <div className="relative aspect-[9/14] sm:aspect-[4/5] w-full overflow-hidden bg-black">
                  <video
                    src="/assets/vidio-rostery.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>

                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm text-[10px] font-mono uppercase tracking-wider text-[#e7a93c] font-semibold flex items-center gap-2 z-10 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
                    Slow Bar &amp; Espresso
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 z-10 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e7a93c] font-semibold block mb-1">
                      DAILY COFFEE CRAFT &bull; SLAWI
                    </span>
                    <p className="font-display font-bold text-lg text-white leading-snug">
                      Freshly Ground for Every Cup
                    </p>
                    <p className="text-xs text-white/70 font-serif italic mt-1 leading-relaxed">
                      Biji kopi pilihan digiling segar untuk racikan espresso dan seduhan presisi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      '''

code = code[:manifesto_start] + manifesto_new + code[manifesto_end:]

# 4. Update Lineup section subtitle
lineup_h2_old = '''            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-chestnut font-semibold block mb-2">
                THE SIGNATURE LINEUP // CURATED ROASTS &amp; ANATOMY
              </span>
              <h2 className={`font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight ${t.headingColor} leading-tight`}>
                Delapan Sajian Ikonik,<br />
                <span className={`font-serif italic font-normal ${t.accentColor}`}>
                  Ragam Karakter Rasa
                </span>
              </h2>
            </div>'''

lineup_h2_new = '''            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                THE SIGNATURE LINEUP // CURATED ROASTS &amp; ANATOMY
              </span>
              <h2 className={`font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight ${t.headingColor} leading-tight`}>
                Delapan Sajian Ikonik,<br />
                <span className={`font-serif italic font-normal ${t.accentColor}`}>
                  Ragam Karakter Rasa
                </span>
              </h2>
              <p className={`mt-3 text-sm sm:text-base ${t.subtextColor} font-serif italic max-w-xl leading-relaxed`}>
                Setiap resep signature diciptakan dengan filosofi anatomi gerak tubuh manusia—memadukan kekuatan double shot espresso, kelembutan krim susu, dan sentuhan otentik rempah nusantara.
              </p>
            </div>'''

assert lineup_h2_old in code, "Lineup heading block not found"
code = code.replace(lineup_h2_old, lineup_h2_new, 1)

# 5. Update Sanctuary Outlets details
outlets_start = code.find('{/* ─── 5. SANCTUARY OUTLETS')
outlets_end = code.find('{/* ─── 6. THE RITUAL')
assert outlets_start != -1 and outlets_end != -1, "Outlets block not found"

outlets_new = '''{/* ─── 5. SANCTUARY OUTLETS SHOWCASE (REAL CLAVICULA PLACES) ─────── */}
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
              Pilih ritme Anda: bar roastery berenergi kreatif di Slawi, atau ketenangan kabut sejuk hutan pinus di Clavicula Hills Guci (1.050 mdpl).
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 01 · Slawi (Kalisapu)
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span>📍 Jl. DR. Soetomo No.3, Kalisapu, Slawi</span>
                  <span className="text-[#e7a93c] font-semibold">⏰ 09.00 – 23.00 WIB</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-1 transition-colors`}>
                  Slow Bar &amp; Roastery Lab Slawi
                </h3>
                <span className={`text-xs font-mono ${t.accentColor} font-semibold block mb-3`}>
                  Pusat Sangrai Kopi &amp; Ruang Kolaborasi Kreatif (WFC Sanctuary)
                </span>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Pusat eksplorasi sangrai kopi di jantung Slawi. Mengusung interior modern industrial yang tenang dan sejuk ber-AC, dilengkapi Slow Bar V60 manual brew, colokan di setiap meja, dan WiFi berkecepatan tinggi yang sangat nyaman untuk kerja laptop (WFC), meeting santai, hingga obrolan hangat malam hari.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Slow Bar V60</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ In-House Roastery</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Indoor AC &amp; Colokan WFC</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Outdoor Terrace Rindang</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md`}>
                  Outlet 02 · Guci Hills (1.050 MDPL)
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                  <span>📍 Kawasan Wisata Guci, Bojong, Tegal</span>
                  <span className="text-[#e7a93c] font-semibold">⏰ 08.00 – 22.00 WIB</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className={`font-display text-2xl font-bold ${t.headingColor} mb-1 transition-colors`}>
                  Highland Sanctuary Hutan Pinus Guci
                </h3>
                <span className={`text-xs font-mono ${t.accentColor} font-semibold block mb-3`}>
                  Kesejukan Kabut Alami Lereng Gunung Slamet &amp; Rooftop Deck
                </span>
                <p className={`text-sm ${t.subtextColor} leading-relaxed mb-6`}>
                  Sanctuary pegunungan di ketinggian 1.050 mdpl berlatar rimbunnya hutan pinus yang asri. Rasakan hembusan udara dingin yang menyegarkan di area rooftop deck terbuka. Pilihan sempurna untuk menghangatkan badan dengan semangkuk Tomyam Seafood pedas asam, Tenderloin Steak gurih, dan cangkir kopi panas di tengah kabut.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ 360° Highland Pine View</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Open-Air Rooftop Deck</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Hawa Dingin Sejuk Alami</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Steak &amp; Tomyam Warmth</span>
                  <span className={`px-3 py-1 rounded-full ${t.controlBg} border ${t.controlBorder} ${t.subtextColor}`}>✓ Spot Foto Estetik Alam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      '''

code = code[:outlets_start] + outlets_new + code[outlets_end:]

# 6. Update Full Menu Header & Add Quick Ordering Tips Box
full_menu_header_start = code.find('{/* ─── 8. THE COMPLETE CAFE')
full_menu_header_end = code.find('{/* Official Scanned PDF Posters Drawer */}')
assert full_menu_header_start != -1 and full_menu_header_end != -1, "Full menu header block not found"

full_menu_header_new = '''{/* ─── 8. THE COMPLETE CAFE MENU (ALL 120+ ITEMS FROM PDF) ─────── */}
      <section id="full-menu" className={`py-20 md:py-28 ${t.sectionBg} scroll-mt-24 transition-colors duration-500`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          
          {/* Section Header */}
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b ${t.sectionBorder}`}>
            <div>
              <span className={`text-[11px] font-mono tracking-[0.2em] uppercase ${t.accentColor} font-semibold block mb-2`}>
                DAFTAR MENU RESMI // BUKU MENU KAFE LENGKAP
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight ${t.headingColor}`}>
                The Complete Cafe Menu
              </h2>
              <p className={`mt-2 text-xs md:text-sm ${t.subtextColor} font-serif italic max-w-2xl`}>
                Seluruh hidangan dan seduhan resmi dari buku menu fisik kafe Slawi &amp; Guci Hills. Semua harga sudah nett termasuk pajak (PPN) tanpa biaya layanan tersembunyi.
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-full ${t.controlBg} border ${t.controlBorder} shadow-sm self-start md:self-auto`}>
              <button
                onClick={() => setViewMode("card")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "card"
                    ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                    : `${t.subtextColor}`
                }`}
              >
                Kartu Bergambar
              </button>
              <button
                onClick={() => setViewMode("paper")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "paper"
                    ? `${t.badgeBg} ${t.badgeText} shadow-sm`
                    : `${t.subtextColor}`
                }`}
              >
                Buku Menu (Paper)
              </button>
            </div>
          </div>

          {/* Quick Ordering & Coffee Tips Box */}
          <div className={`mb-8 p-4 md:p-5 rounded-2xl ${t.sectionAltBg} border ${t.sectionBorder} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div>
                <span className={`font-bold ${t.headingColor} block font-mono uppercase text-[11px] tracking-wider`}>
                  Panduan Pemesanan Kopi &amp; Dapur:
                </span>
                <p className={`${t.subtextColor} mt-0.5`}>
                  Seluruh varian kopi berbasis espresso dapat dipesan panas (Hot) maupun dingin (Ice). Untuk pilihan biji sangrai manual brew V60 harian (Gayo, Kamojang, Sindoro, Temanggung), tanyakan beans siap seduh hari ini kepada barista kami!
                </p>
              </div>
            </div>
            <div className={`shrink-0 px-3 py-1.5 rounded-full ${t.controlBg} border ${t.controlBorder} font-mono text-[11px] font-semibold ${t.accentColor}`}>
              ✓ 100% Halal Certified Kitchen
            </div>
          </div>

          '''

code = code[:full_menu_header_start] + full_menu_header_new + code[full_menu_header_end:]

# 7. Update Section 10: Dine-In Reservation & Social CTA
cta_start = code.find('{/* ─── 10. DINE-IN RESERVATION FOOTER CTA')
cta_end = code.find('</main>')
assert cta_start != -1 and cta_end != -1, "CTA block not found"

cta_new = '''{/* ─── 10. DINE-IN RESERVATION FOOTER CTA ──────────────────── */}
          <div className="mt-16 bg-gradient-to-r from-espresso via-chestnut to-espresso text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-caramel mb-3 block font-semibold">
                DINE-IN · SLOW BAR · OUTDOOR SANCTUARY
              </span>
              <h3 className="font-display text-2xl md:text-4xl font-bold mb-4">
                Nikmati Sajian Langsung di Meja Anda
              </h3>
              <p className="text-xs md:text-sm text-white/85 font-serif italic mb-6 leading-relaxed">
                Rencanakan kunjungan Anda bersama keluarga atau rekan kerja. Kunjungi outlet Clavicula Slawi untuk suasana roastery bar &amp; ruang diskusi kreatif (WFC), atau nikmati sejuknya kabut pegunungan pinus di Clavicula Hills Guci.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-xs font-mono text-white/80">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-left">
                  <span className="text-[#e7a93c] font-bold block mb-1">📍 Outlet Slawi (Kalisapu)</span>
                  <p className="text-[11px] text-white/70">Jl. DR. Soetomo No.3 · Buka 09.00 – 23.00 WIB</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-left">
                  <span className="text-[#e7a93c] font-bold block mb-1">📍 Clavicula Hills Guci</span>
                  <p className="text-[11px] text-white/70">Wisata Guci, Bojong · Buka 08.00 – 22.00 WIB</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/reserve"
                  className="px-8 py-3.5 rounded-full bg-caramel text-espresso text-xs font-bold hover:bg-caramel/90 transition-all shadow-md hover:-translate-y-0.5"
                >
                  Reservasi Meja Sekarang →
                </Link>
                <a
                  href="https://ig.me/m/clavicula_coffee"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <InstagramIcon size={14} className="text-white" />
                  DM Instagram @clavicula_coffee
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    '''

code = code[:cta_start] + cta_new + code[cta_end:]

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully enhanced copywriting and information across all sections!")
