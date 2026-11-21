with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update <main> tag to use dynamic background
main_old = '<main className="flex min-h-screen flex-col overflow-hidden bg-linen text-espresso selection:bg-chestnut selection:text-white">'
main_new = '<main className={`flex min-h-screen flex-col overflow-hidden ${t.mainBg} selection:bg-chestnut selection:text-white transition-colors duration-500`}>'
assert main_old in code, "main_old not found"
code = code.replace(main_old, main_new, 1)

# 2. Add transition ribbon between Manifesto and Lineup
manifesto_end = '</section>\n\n      {/* ─── 4. THE SIGNATURE LINEUP'
assert manifesto_end in code, "manifesto_end not found"

transition_ribbon = '''</section>

      {/* ─── TRANSITION GRADIENT: SMOOTH ATMOSPHERIC BRIDGE ─────────── */}
      <div className={`w-full h-24 md:h-36 transition-all duration-700 ${t.transitionGradient}`} />

      {/* ─── 4. THE SIGNATURE LINEUP'''

code = code.replace(manifesto_end, transition_ribbon, 1)

# 3. Update Lineup section tag
lineup_old = '<section id="lineup" className="bg-[#FAF5ED] py-20 md:py-28 overflow-hidden border-b border-chestnut/15">'
lineup_new = '<section id="lineup" className={`${t.sectionBg} py-20 md:py-28 overflow-hidden border-b ${t.sectionBorder} transition-colors duration-500`}>'
assert lineup_old in code, "lineup_old not found"
code = code.replace(lineup_old, lineup_new, 1)

# 4. Update Lineup heading and text
h2_old = '''              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-espresso leading-tight">
                Delapan Sajian Ikonik,<br />
                <span className="font-serif italic font-normal text-chestnut">
                  Ragam Karakter Rasa
                </span>
              </h2>'''

h2_new = '''              <h2 className={`font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight ${t.headingColor} leading-tight`}>
                Delapan Sajian Ikonik,<br />
                <span className={`font-serif italic font-normal ${t.accentColor}`}>
                  Ragam Karakter Rasa
                </span>
              </h2>'''
assert h2_old in code, "h2_old not found"
code = code.replace(h2_old, h2_new, 1)

# 5. Update Lineup Scroll Buttons
btns_old = '''              <button
                onClick={() => scrollLineup("left")}
                aria-label="Scroll left"
                className="w-12 h-12 rounded-full border border-chestnut/25 bg-white text-espresso flex items-center justify-center hover:bg-chestnut hover:text-white shadow-sm transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollLineup("right")}
                aria-label="Scroll right"
                className="w-12 h-12 rounded-full border border-chestnut/25 bg-white text-espresso flex items-center justify-center hover:bg-chestnut hover:text-white shadow-sm transition-all"
              >
                <ChevronRight size={20} />
              </button>'''

btns_new = '''              <button
                onClick={() => scrollLineup("left")}
                aria-label="Scroll left"
                className={`w-12 h-12 rounded-full border ${t.controlBorder} ${t.controlBg} ${t.headingColor} flex items-center justify-center hover:scale-105 shadow-sm transition-all`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollLineup("right")}
                aria-label="Scroll right"
                className={`w-12 h-12 rounded-full border ${t.controlBorder} ${t.controlBg} ${t.headingColor} flex items-center justify-center hover:scale-105 shadow-sm transition-all`}
              >
                <ChevronRight size={20} />
              </button>'''
assert btns_old in code, "btns_old not found"
code = code.replace(btns_old, btns_new, 1)

# 6. Update Lineup Article Card
card_old = '''            <article
              key={sig.index}
              className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start bg-white border border-chestnut/20 rounded-[2rem] overflow-hidden hover:-translate-y-2 hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between shadow-sm group"
            >
              {/* Media Container (Ember 4:5 Aspect Ratio) */}
              <div className="relative aspect-[4/5] w-full bg-[#FAF6F0] overflow-hidden border-b border-chestnut/10">'''

card_new = '''            <article
              key={sig.index}
              className={`w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start ${t.cardBg} border ${t.cardBorder} rounded-[2rem] overflow-hidden hover:-translate-y-2 ${t.cardShadow} transition-all duration-300 flex flex-col justify-between group`}
            >
              {/* Media Container (Ember 4:5 Aspect Ratio) */}
              <div className={`relative aspect-[4/5] w-full ${t.cardImageBg} overflow-hidden border-b ${t.sectionBorder}`}>'''
assert card_old in code, "card_old not found"
code = code.replace(card_old, card_new, 1)

# 7. Update Lineup Card Index & Badge
badge_old = '''                {/* Top Right Index (01, 02...) */}
                <span className="absolute top-4 right-4 font-display font-black text-2xl text-espresso/80 bg-white/90 backdrop-blur-md px-3 py-1 rounded-2xl border border-chestnut/15 shadow-sm">
                  {sig.index}
                </span>

                {/* Badge if present */}
                {sig.badge && (
                  <span className="absolute top-4 left-4 bg-chestnut text-white font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {sig.badge}
                  </span>
                )}'''

badge_new = '''                {/* Top Right Index (01, 02...) */}
                <span className={`absolute top-4 right-4 font-display font-black text-2xl ${t.headingColor} ${t.cardBg} backdrop-blur-md px-3 py-1 rounded-2xl border ${t.cardBorder} shadow-sm`}>
                  {sig.index}
                </span>

                {/* Badge if present */}
                {sig.badge && (
                  <span className={`absolute top-4 left-4 ${t.badgeBg} ${t.badgeText} font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm`}>
                    {sig.badge}
                  </span>
                )}'''
assert badge_old in code, "badge_old not found"
code = code.replace(badge_old, badge_new, 1)

# 8. Update Lineup Card Body typography
body_old = '''                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-2xl font-black text-espresso group-hover:text-chestnut transition-colors leading-tight">
                      {sig.name}
                    </h3>
                    <span className="font-mono text-lg font-bold text-chestnut whitespace-nowrap">
                      Rp {sig.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className="text-sm text-espresso/85 font-medium leading-relaxed mb-3">
                    {sig.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-chestnut/10 mt-auto">
                  <p className="text-xs text-espresso/60 font-serif italic leading-relaxed">
                    {sig.concept}
                  </p>
                </div>'''

body_new = '''                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className={`font-display text-2xl font-black ${t.headingColor} transition-colors leading-tight`}>
                      {sig.name}
                    </h3>
                    <span className={`font-mono text-lg font-bold ${t.accentColor} whitespace-nowrap`}>
                      Rp {sig.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <p className={`text-sm ${t.subtextColor} font-medium leading-relaxed mb-3`}>
                    {sig.notes}
                  </p>
                </div>

                <div className={`pt-3 border-t ${t.sectionBorder} mt-auto`}>
                  <p className={`text-xs ${t.subtextColor} font-serif italic leading-relaxed opacity-80`}>
                    {sig.concept}
                  </p>
                </div>'''
assert body_old in code, "body_old not found"
code = code.replace(body_old, body_new, 1)

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Applied Lineup section theme styles successfully!")
