with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove the Hero "Interactive Ambiance & Color Theme Switcher Bar" block
# (the whole div from comment to after </div>)
hero_switcher_old = '''          {/* Interactive Ambiance & Color Theme Switcher Bar */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* Suasana Foto Hero */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15 shadow-xl">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#e7a93c] px-3 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e7a93c] animate-pulse"></span>
                Foto Hero:
              </span>
              {HERO_BG_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedBg(preset.id)}
                  className={`px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
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

            {/* Tema Warna Halaman */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-black/55 backdrop-blur-md border border-[#e7a93c]/35 shadow-xl">
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#e7a93c] px-3 font-semibold flex items-center gap-1.5">
                🎨 Tema Warna:
              </span>
              {[
                { id: "chestnut", label: "🌰 Warm Chestnut", desc: "Gradasi hangat roasted hazelnut & buttermilk" },
                { id: "noir", label: "🌙 Midnight Roastery", desc: "Full dark luxury tanpa silau putih" },
                { id: "forest", label: "🌲 Guci Pine Hills", desc: "Nuansa pinus dan kabut sejuk Guci" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setColorTheme(theme.id as ColorTheme)}
                  className={`px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                    colorTheme === theme.id
                      ? "bg-[#e7a93c] text-[#100d0a] font-bold shadow-md scale-[1.03]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  title={theme.desc}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          {/* Eyebrow */}'''

hero_switcher_new = '''          {/* Eyebrow */}'''

assert hero_switcher_old in code, "Hero switcher block not found"
code = code.replace(hero_switcher_old, hero_switcher_new, 1)

# 2. Remove the Quick Theme Switcher from the Full Menu section header
# Keep only the View Switcher
qts_block_old = '''            {/* View Mode Switcher & Quick Theme Switcher */}
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
            </div>'''

qts_block_new = '''            {/* View Mode Switcher */}
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
            </div>'''

assert qts_block_old in code, "Quick theme switcher block not found"
code = code.replace(qts_block_old, qts_block_new, 1)

# 3. Lock colorTheme to 'chestnut' (remove state, hardcode it)
# Replace: const [colorTheme, setColorTheme] = useState<ColorTheme>("chestnut");
state_old = '  const [colorTheme, setColorTheme] = useState<ColorTheme>("chestnut");'
state_new = '  const colorTheme: ColorTheme = "chestnut";'
assert state_old in code, "colorTheme state not found"
code = code.replace(state_old, state_new, 1)

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done! Removed all theme switchers and locked to chestnut theme.")
