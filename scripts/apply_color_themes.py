import re

with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Define THEME_CONFIGS and ColorTheme type
theme_definitions = '''type ColorTheme = "chestnut" | "noir" | "forest";

interface ThemeConfig {
  id: ColorTheme;
  name: string;
  label: string;
  icon: string;
  desc: string;
  mainBg: string;
  transitionGradient: string;
  sectionBg: string;
  sectionAltBg: string;
  sectionBorder: string;
  cardBg: string;
  cardImageBg: string;
  cardBorder: string;
  cardShadow: string;
  headingColor: string;
  subtextColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  controlBg: string;
  controlBorder: string;
  pillActive: string;
  pillInactive: string;
}

const THEME_CONFIGS: Record<ColorTheme, ThemeConfig> = {
  chestnut: {
    id: "chestnut",
    name: "Warm Chestnut & Amber",
    label: "🌰 Warm Chestnut",
    icon: "🌰",
    desc: "Harmonisasi hangat gradasi roasted mocha, butir hazelnut & terakota hangat",
    mainBg: "bg-[#F3EDE2] text-[#1E1610]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#322016] via-45% to-[#EDE5D8]",
    sectionBg: "bg-[#EDE5D8]",
    sectionAltBg: "bg-[#E6DCCE]",
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
    transitionGradient: "bg-gradient-to-b from-[#120E0C] to-[#140F0C]",
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
    mainBg: "bg-[#E3E8E1] text-[#131F16]",
    transitionGradient: "bg-gradient-to-b from-[#120E0C] via-[#1E2B20] via-45% to-[#E3E8E1]",
    sectionBg: "bg-[#E3E8E1]",
    sectionAltBg: "bg-[#D8DFD5]",
    sectionBorder: "border-[#2C4334]/20",
    cardBg: "bg-[#F8FAF7]",
    cardImageBg: "bg-[#E5EAE2]",
    cardBorder: "border-[#2C4334]/20 hover:border-[#2C4334]/60",
    cardShadow: "shadow-sm hover:shadow-[0_16px_36px_-10px_rgba(44,67,52,0.18)]",
    headingColor: "text-[#131F16]",
    subtextColor: "text-[#131F16]/75",
    accentColor: "text-[#2C4334]",
    badgeBg: "bg-[#2C4334]",
    badgeText: "text-[#F8FAF7]",
    controlBg: "bg-[#F8FAF7]",
    controlBorder: "border-[#2C4334]/25",
    pillActive: "bg-[#2C4334] text-[#F8FAF7] shadow-md font-bold",
    pillInactive: "bg-[#D3DBD0] text-[#1B291F] border border-[#2C4334]/20 hover:bg-[#2C4334]/15",
  },
};
'''

# Insert THEME_CONFIGS right before HERO_BG_PRESETS
hero_bg_pos = code.find('const HERO_BG_PRESETS = [')
assert hero_bg_pos != -1, "HERO_BG_PRESETS not found"
code = code[:hero_bg_pos] + theme_definitions + "\n" + code[hero_bg_pos:]

# Add colorTheme state to MenuPage
state_needle = 'const [selectedBg, setSelectedBg] = useState<string>("twilight");'
state_replacement = '''const [selectedBg, setSelectedBg] = useState<string>("twilight");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("chestnut");
  const t = THEME_CONFIGS[colorTheme] || THEME_CONFIGS.chestnut;'''
assert state_needle in code, "state_needle not found"
code = code.replace(state_needle, state_replacement, 1)

# In the Hero section, add the Theme Switcher next to Suasana
switcher_needle = '{/* Interactive Aesthetic Atmosphere / Background Switcher */}'
switcher_replacement = '''{/* Interactive Ambiance & Color Theme Switcher Bar */}
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
          </div>'''

# Replace old single switcher
old_switcher_block_start = code.find('{/* Interactive Aesthetic Atmosphere / Background Switcher */}')
old_switcher_block_end = code.find('{/* Eyebrow */}', old_switcher_block_start)
assert old_switcher_block_start != -1, "old_switcher_block_start not found"
assert old_switcher_block_end != -1, "old_switcher_block_end not found"

code = code[:old_switcher_block_start] + switcher_replacement + "\n\n          " + code[old_switcher_block_end:]

with open('src/app/menu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Added THEME_CONFIGS and Hero Theme Switcher!")
