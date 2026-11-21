with open('src/app/menu/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

s1 = 'className="group bg-white rounded-[2.5rem] overflow-hidden border border-chestnut/20 shadow-sm hover:shadow-warm-card transition-all duration-300 flex flex-col justify-between"'
print('Outlet card found count:', code.count(s1))

s2 = 'className="lg:col-span-5 relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-chestnut/25 shadow-xl bg-white"'
print('Ritual card found count:', code.count(s2))

s3 = 'className="group bg-white rounded-3xl p-5 border border-chestnut/15 hover:border-chestnut/40 hover:shadow-warm-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-sm"'
print('Full menu card found count:', code.count(s3))

s4 = 'className="py-20 md:py-28 bg-linen border-b border-chestnut/15"'
print('bg-linen border-b found count:', code.count(s4))

s5 = 'className="bg-vanilla/40 py-16 border-b border-chestnut/15"'
print('Stats section found count:', code.count(s5))

s6 = 'className="py-20 md:py-28 bg-linen scroll-mt-24"'
print('Full menu section found count:', code.count(s6))
