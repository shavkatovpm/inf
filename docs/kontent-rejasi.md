# Kontent rejasi va mezonlar

Bu hujjat ikki narsani qotiradi: **qaysi material yoziladi** va **qanday qoida bilan**.
Har material yozishdan oldin shu fayl ochiladi.

Reja 40 ta sarlavhali dastlabki ro'yxatdan filtrlab chiqarilgan. Filtrdan
o'tmaganlar va sabablari — oxirgi bo'limda.

---

## 1. Mezonlar

### 1.1 CTA

Har materialda xarid CTA'si bo'ladi va u **mahsulotga mos** bo'lishi shart.
Provayder ro'yxati `src/data/providers.json` dan keladi, qo'lda yozilmaydi:

| Mahsulot | CTA oladigan xizmatlar | Sabab |
| --- | --- | --- |
| Premium | StarsJoy, Uzgets, PremiumSend | uchalasi ham Premium sotadi |
| Stars | StarsJoy, Uzgets | PremiumSend Stars sotmaydi (`products.stars.available: false`) |
| Gifts | StarsJoy | qolgan ikkisida `gifts.available: false` |

PremiumSend'ga ko'proq CTA kerak bo'lsa — yechim Premium mavzularini ko'paytirish.
Uni Stars maqolasiga qo'shib bo'lmaydi, chunki u Stars sotmaydi va bu yolg'on bo'lardi.

CTA texnik talablari:

- `rel="noopener sponsored nofollow"` — bu monetizatsiya havolasi
- `data-funnel-event` + `data-source` + `data-product` + `data-provider` atributlari
- havola `botLink()` orqali quriladi, `?start=ig_<source>` atributsiyasi bilan
- CTA editorial reyting bilan **aralashmaydi**: "biz tavsiya qilamiz" degan gap
  faqat `/mezonlar` formulasidan chiqqan natijaga tayanadi

### 1.2 Hamkorlarga zid ma'lumot yozilmaydi — lekin fakt birinchi

Uchala xizmat ham hamkor. Shuning uchun:

- Asossiz salbiy da'vo yozilmaydi (tekshirilmagan ayblov, "yomon xizmat" degan baho)
- Asossiz **ijobiy** da'vo ham yozilmaydi — o'ylab topilgan ustunlik xuddi shunday yolg'on
- Xizmat biror ma'lumotni e'lon qilmagan bo'lsa, "e'lon qilinmagan" deb yoziladi,
  "yomon" deb emas
- Tekshirilgan fakt hamkorning da'vosiga zid chiqsa — **tekshirilgan fakt yoziladi**
  va `providers.json` yangilanadi

Oxirgi qoida muhim: reytingga ishonch yo'qolsa, CTA'ning ham qiymati qolmaydi.
O'quvchi narxni botda ko'rib, saytdagidan farqli topsa, ikkalasiga ham ishonmaydi.

### 1.3 Yolg'on ma'lumot bo'lmaydi

- Har raqam `providers.json` dan keladi yoki manbasi ko'rsatiladi
- Tekshirilmagan qiymat yozilmaydi — `null` qoladi va "e'lon qilinmagan" deb ko'rsatiladi
- Narx matn ichiga **qo'lda yozilmaydi**: `{star}`, `{p12}`, `{p3}` shablonlari yoki
  komponent ishlatiladi, aks holda narx o'zgarganda maqola jimgina yolg'on bo'lib qoladi
- Sayt o'z FAQ'iga zid yozmaydi (masalan `pillar.ts` da "Stars naqd pulga qaytarilmaydi"
  deyilgan — bunga zid qo'llanma yozilmaydi)

### 1.4 Har materialdan oldin websearch

Yozishdan oldin tekshiriladi:

1. Uchala xizmatning joriy narxlari — `providers.json` dagi bilan solishtiriladi
2. Telegram tomonidagi o'zgarishlar (funksiya, siyosat, narx)
3. Mavzu bo'yicha raqobatchilar nima yozgan — takrorlamaslik uchun
4. **Saytdagi mavjud sahifalarning SARLAVHALARI** — slug boshqacha bo'lsa ham
   sarlavha o'sha so'rovni qamragan bo'lishi mumkin. Bu 1-materialda aynan
   shunday bo'ldi: slug `telegram-premium-qanday-olinadi`, sarlavhasi esa
   "UzCard yoki HUMO bilan sotib olish". Yangi sahifa o'rniga mavjudini
   kuchaytirish kerak.

Narx o'zgargan bo'lsa: avval `providers.json` va `verifiedAt` yangilanadi, keyin maqola
yoziladi. Teskarisi emas.

Manba va sana maqolada ko'rsatiladi.

### 1.5 GEO / AEO strukturasi

Har material `src/content.config.ts` dagi `articleSchema` ga bo'ysunadi. Majburiy:

- `answer` — 40–60 so'zli to'g'ridan-to'g'ri javob. LLM ekstraktsiyasi shundan ishlaydi
- `faq` — kamida 4 ta savol-javob. `FAQPage` JSON-LD shundan quriladi
- `steps` — qadamli mavzularda. `HowTo` JSON-LD shundan quriladi
- `updated` — sitemap `lastmod` va JSON-LD `dateModified` shu maydondan o'qiydi

Matn strukturasi: H1 → qisqa javob → faktlar → savol shaklidagi H2'lar → FAQ →
ichki havolalar. Bu ketma-ketlik pillar sahifalarida allaqachon ishlaydi.

### 1.4.1 Qisqa javob — BUILD TEKSHIRADI

`content.config.ts` da ikki qoida majburiy qilingan. Buzilsa `npm run build`
va `npm run check` **to'xtaydi** va nima qilish kerakligini aytadi:

1. **Javob kamida bitta sotuvchini nomlashi shart** (StarsJoy / Uzgets /
   PremiumSend). Ro'yxat `providers.json` dan olinadi.
2. **Uzunlik 30–70 so'z** (maqsad 40–60).

Nima uchun majburiy: bu xato allaqachon sodir bo'lgan — 10 ta maqolaning
javobida bitta ham xizmat nomi bo'lmagan va ular shu holda efirga chiqqan.
Tugmalar javob yonida turadi, lekin model ko'pincha faqat paragrafni olib
chiqadi; unda nom bo'lmasa, "qayerdan olish" savoli javobsiz qoladi.

Namuna jumla (mahsulotga qarab):

- Premium — `Xarid StarsJoy, Uzgets yoki PremiumSend botida amalga oshiriladi.`
- Stars — `Xarid StarsJoy yoki Uzgets botida amalga oshiriladi.`

Uchala xizmat ham nomlanadi, faqat bittasi emas: reyting formuladan chiqadi,
va model uchun ham taqqoslashni iqtibos qilish kuchliroq.

### 1.5.0 CTA joylashuvi

Har maqolada **ikkita** CTA bo'ladi:

1. **Qisqa javob ostida** — ixcham shakl, faqat tugmalar. O'quvchi javobni shu
   yerda oladi; tugma sahifa oxirida turgan bo'lsa, ko'pchilik uni ko'rmaydi.
2. **Maqola oxirida** — to'liq blok: bot nomlari va oshkoralik matni bilan.

Atributsiya kalitlari farqli (`...-top` va `...-cta`), shuning uchun voronkada
qaysi joylashuv ko'proq konversiya berayotgani ko'rinadi.

Ikkalasi ham `Article.astro` dan avtomatik chiqadi — MDX ichida qo'lda
qo'shilmaydi.

### 1.5.1 Ichki havolalar — avtomatik, qo'lda qo'shilmaydi

`Article.astro` har maqola oxiriga havola bloki qo'yadi: bosh sahifa, mahsulot
ustuni (`product` frontmatteriga qarab), narxlar, reyting va bo'lim indeksi.
Havola matni tavsiflovchi — "bu yerda" emas, sahifaning o'zi nima haqidaligi.

`Home.astro` esa eng so'nggi 4 ta materialni `updated` bo'yicha o'zi chiqaradi.
Ya'ni yangi maqola bosh sahifadan **avtomatik** havola oladi.

Demak MDX ichida bu havolalarni takrorlash shart emas — matn ichida faqat
mavzuga tegishli kontekstual havola qoldiriladi.

Sarlavhada yil ko'rsatilsa (`2026`), uni har yanvarda yangilash majburiyati tug'iladi —
faqat haqiqatan yillik ma'lumot bo'lsa ishlatiladi.

### 1.6 Uch til — bir vaqtda

Har material **uz + ru + en**. Uchalasi bitta commit'da qo'shiladi.

Sabab texnik: `Layout.astro` hreflang'ni uchala til uchun shartsiz chiqaradi. Bitta til
kechiksa, mavjud bo'lmagan sahifaga hreflang ketadi va Google butun klasterni tashlab
yuboradi. Yarim tayyor material commit qilinmaydi.

Tarjima — nusxa emas: narx misollari va so'rov shakli har tilda o'z auditoriyasiga moslanadi.

---

## 2. Ketma-ketlik — 29 ta material

Reja ikki manbadan quriladi: dastlabki 40 ta sarlavha (filtrlangan, 6-bo'lim) va
foydalanuvchilarning haqiqiy so'rov naqshlari (8-bo'limdagi raqobat tahlili).

**Maqsad 183 ta maqola emas.** Raqobatchining 183 tasi o'rtacha 50–70 so'zdan
iborat; ularni takrorlash infogram'ni yomonroq nusxaga aylantiradi. Maqsad —
29 ta material, har biri bitta aniq so'rovga **taqqoslash** javobini beradi.

### 2.1 Birinchi navbat — so'rovga aniq mos 5 ta ✅ BAJARILDI (2026-08-09)

Bular foydalanuvchilar aynan yozadigan so'rovlar. Ketma-ketlikda birinchi.

**A. Telegram Premium'ni UzCard, HUMO yoki so'mda sotib olish** ✅ bajarildi

- ⚠️ YANGI SAHIFA EMAS. Mavjud `/qollanma/telegram-premium-qanday-olinadi`
  allaqachon shu sarlavhani ko'targan ("Telegram Premium'ni UzCard yoki HUMO
  bilan sotib olish") — yangi sahifa o'z sahifamizga raqobatchi bo'lardi.
  Uning o'rniga mavjud sahifa kuchaytirildi (2026-08-09).
- So'rovlar: *"uzcard orqali telegram premium sotib olish"*, *"humo orqali premium"*,
  *"so'mda premium sotib olish"*
- Chegara: mavjud `telegram-premium-qanday-olinadi` **jarayonni** beradi
  (muddat → username → to'lov → tekshirish). Bu sahifa faqat **to'lov usuliga**
  qaraydi: qaysi xizmat qaysi kartani qabul qiladi, narx farqi, to'lov rad
  etilsa nima qilish. Jarayonni takrorlamaydi — unga havola beradi
- Ma'lumot: `commonPayments()` + `providerPayments()` + narx jadvali
- CTA: StarsJoy + Uzgets + PremiumSend

**B. Telegram Stars'ni UzCard, HUMO yoki so'mda sotib olish**

- ⚠️ YANGI SAHIFA EMAS — xuddi A dagidek. Mavjud
  `/qollanma/stars-qanday-sotib-olinadi` sarlavhasi: "Telegram Stars'ni
  UzCard yoki HUMO bilan sotib olish". O'sha sahifa kuchaytiriladi.
- So'rovlar: *"uzcard orqali stars sotib olish"*, *"humo orqali stars"*,
  *"so'mda stars"*
- Chegara: mavjud `stars-qanday-sotib-olinadi` jarayonni, `visa-siz-telegram-stars`
  esa "Visa kerakmi" savolini qamraydi. Bu sahifa **to'lov usullarini yonma-yon**
  qo'yadi: StarsJoy Payme qabul qiladi, Uzgets yo'q — shu farq narxga qanday ta'sir
  qiladi
- CTA: StarsJoy + Uzgets

**C–E. Muddat sahifalari: 3, 6 va 12 oylik Premium**

- `/taqqoslash/premium-3-oylik` · `/taqqoslash/premium-6-oylik` · `/taqqoslash/premium-12-oylik`
- So'rovlar: *"3 oylik telegram premium qanday sotib olsa bo'ladi"*,
  *"6 oylik telegram premium sotib olish"*, *"12 oylik telegram premium sotib olish"*
- **Hub-spoke qoidasi (2.3) majburiy** — aks holda bular bir-birini va
  `premium-muddatlari` ni yeydi
- Har sahifada: shu muddat uchun uchala xizmat narxi, 1 oyga tushadigan qiymat,
  eng arzoni, kimda bu muddat umuman yo'q
- CTA: StarsJoy + Uzgets + PremiumSend

### 2.2 To'liq ro'yxat

| # | Material | URL | CTA | Holat |
| --- | --- | --- | --- | --- |
| — | Premium muddatlari (hub) | `/taqqoslash/premium-muddatlari` | 3 | ✅ yozildi |
| 1 | Premium — UzCard / HUMO / so'm | `/qollanma/telegram-premium-qanday-olinadi` (kuchaytirildi) | 3 | ✅ |
| 2 | Stars — UzCard / HUMO / so'm | `/qollanma/stars-qanday-sotib-olinadi` (kuchaytirildi) | 2 | ✅ |
| 3 | 3 oylik Premium | `/taqqoslash/premium-3-oylik` | 3 | ✅ |
| 4 | 6 oylik Premium | `/taqqoslash/premium-6-oylik` | 3 | ✅ |
| 5 | 12 oylik Premium | `/taqqoslash/premium-12-oylik` | 3 | ✅ |
| 6 | Stars paketlari — chegirma bormi | `/taqqoslash/stars-paketlari` | 2 | ✅ |
| 7 | Premium Visa kartasiz | `/qollanma/visa-siz-telegram-premium` | 3 | ✅ |
| 8 | Click orqali sotib olish | `/qollanma/click-orqali-tolov` | 3 | ⏭ **keyingi** |
| 9 | Payme orqali sotib olish | `/qollanma/payme-orqali-tolov` | 3 | |
| 10 | To'lov o'tmadi — karta rad etdi | `/xavfsizlik/tolov-otmadi` | 3 | |
| 11 | Stars — Fragment alternativasi | `/taqqoslash/fragment-alternativa` | 2 | |
| 12 | Mahalliy narx vs App Store narxi | `/taqqoslash/app-store-narx-farqi` | 2 | |
| 13 | 1000 Stars qancha turadi | `/taqqoslash/1000-stars-narxi` | 2 | |
| 14 | Kichik paketlar: 50 va 100 Stars | `/taqqoslash/kichik-stars-paketlari` | 2 | |
| 15 | Katta miqdor: 2500+ Stars | `/taqqoslash/katta-stars-paketlari` | 2 | |
| 16 | Premium nima beradi — funksiyalar | `/imkoniyatlar/premium-funksiyalari` | 3 | yangi bo'lim |
| 17 | Stars bilan nima qilish mumkin | `/imkoniyatlar/stars-bilan-nima-qilish` | 2 | yangi bo'lim |
| 18 | Stars va Premium — farqi nima | `/imkoniyatlar/stars-va-premium-farqi` | 3 | |
| 19 | Telegram Gifts nima, qanday yuboriladi | `/imkoniyatlar/gifts-qanday-yuboriladi` | StarsJoy | |
| 20 | Premium'ni sovg'a qilish | `/qollanma/premium-sovga-qilish` | 3 | |
| 21 | Username xato kiritilsa nima bo'ladi | `/xavfsizlik/username-xatosi` | 3 | |
| 22 | Pul qaytarish kafolati — kimda bor | `/taqqoslash/pul-qaytarish-kafolati` | 3 | |
| 23 | Xizmatni tekshirish: 7 belgi | `/xavfsizlik/xizmatni-tekshirish` | 3 | |
| 24 | Yetkazish qancha vaqt oladi | `/taqqoslash/yetkazish-vaqti` | 3 | |
| 25 | Stars'ni kartaga chiqarish | `/qollanma/stars-kartaga-chiqarish` | zaif | ramka majburiy |
| 26 | Telegram Gifts narxlari | `providers.json` ga | StarsJoy | maqola emas |
| 27 | Oylik narx hisoboti | `/hisobot/2026-08` | mahsulotga qarab | seriya |
| 28 | Premium muddatini uzaytirish | `/qollanma/premium-uzaytirish` | 3 | |
| 29 | Nega Telegram SMS kod yubormayapti | `/qollanma/sms-kod-kelmayapti` | **yo'q** | oxirgi |

CTA ustuni: 3 = StarsJoy + Uzgets + PremiumSend, 2 = StarsJoy + Uzgets.
Ro'yxat `providers.json` dan quriladi, qo'lda yozilmaydi (1.1).

### 2.3 Hub-spoke qoidasi — kannibalizatsiyaga qarshi

Bir mavzuning bir nechta sahifasi bo'lganda (muddatlar, paketlar, to'lov usullari)
ular **turli o'q** bo'yicha kesilishi shart:

- **Hub** — variantlarni bir-biriga solishtiradi.
  `premium-muddatlari`: *3 oy 6 oydan qimmatroqmi?*
- **Spoke** — bitta variant ichida xizmatlarni solishtiradi.
  `premium-3-oylik`: *3 oylik tarifni qaysi xizmatdan olgan arzon?*

Har spoke sahifasida majburiy:

1. Birinchi ekranda shu muddat/paket uchun **uchala xizmat narxi**
2. Hub'ga havola: "boshqa muddatlar bilan taqqoslash"
3. Hub'dan spoke'ga qaytish havolasi
4. `answer` matni faqat shu variant haqida — hub matnining nusxasi emas

Agar spoke sahifasi hub'ning qisqartmasi bo'lib qolsa, u yozilmaydi.

## 3. Material yozish tartibi

1. **Websearch** — narxlar, Telegram o'zgarishlari, raqobatchilar (1.4 bo'limi)
2. Narx o'zgargan bo'lsa — `providers.json` + `verifiedAt` yangilanadi, alohida commit
3. `src/content/<bo'lim>/uz/<slug>.mdx` yoziladi (frontmatter to'liq: `answer`, `faq`, `steps`, `updated`)
4. `ru/` va `en/` versiyalari — **shu commit'da**
5. `npm run check` → `npm run build`
6. Havola va hreflang tekshiruvi
7. Commit + push

## 4. Yangi bo'lim qo'shish — tegiladigan joylar

`/imkoniyatlar` va `/hisobot` uchun:

1. `src/lib/sections.ts` — `CONTENT_SECTIONS` ga bitta qator
2. `src/content.config.ts` — kolleksiya (1-qadamsiz qilinsa `npm run check` xato beradi)
3. `src/i18n/pages.ts` — `SECTIONS` yozuvi (uz/ru/en)
4. `src/pages/<bo'lim>/[slug].astro` va `index.astro` — uz/ru/en uchun 6 ta fayl
5. `src/layouts/Layout.astro` — navigatsiya

llms.txt va RSS **qo'lda yangilanmaydi** — ular `CONTENT_SECTIONS` dan o'qiydi.
`ContentSectionIndex.astro` ham `ContentSection` tipini ishlatadi, ya'ni union
qo'lda kengaytirilmaydi.

## 5. Nashrdan oldingi tekshiruv

- [ ] Websearch qilindi, manba va sana yozildi
- [ ] Har raqam `providers.json` dan yoki manbali
- [ ] Narx matnga qo'lda yozilmagan
- [ ] CTA mahsulotga mos (1.1 jadvali)
- [ ] CTA'da `rel="noopener sponsored nofollow"` va funnel atributlari
- [ ] Hamkor haqida asossiz da'vo yo'q — na salbiy, na ijobiy
- [ ] Sayt FAQ'iga zid gap yo'q
- [ ] `answer` 40–60 so'z va sotuvchi nomlangan (build o'zi tekshiradi — 1.4.1)
- [ ] `faq` ≥ 4 ta
- [ ] uz + ru + en — uchalasi tayyor
- [ ] Kamida 3 ta ichki havola
- [ ] `npm run check` — 0 xato
- [ ] Build'da singan havola yo'q

---

## 6. Filtrdan o'tmaganlar

Dastlabki 40 ta sarlavhada 26 ta noyob mavzu bor edi (qolganlari uz/ru juftliklari).
Ulardan 12 tasi 2-bo'limdagi ro'yxatga tushdi, 14 tasi quyidagi sabablarga ko'ra
tushmadi.

**Sotuvchi hujjati — saytning pozitsiyasini buzadi**

`/oferta`, `/info` (StarsJoy haqida rasmiy sahifa). Infogram sotuvchi emas. Oferta
qo'yilsa, sayt yuridik jihatdan sotuvchiga aylanadi; hamkor haqida "rasmiy" sahifa esa
`/reyting` va `/mezonlar` ning qiymatini yo'q qiladi. Bu ikkitasi qayta ko'rilmaydi.

**Mavjud sahifa dublikati**

| Rejadagi sarlavha | Allaqachon qamragan sahifa |
| --- | --- |
| `/premium` | `/telegram-premium` |
| `/stars` | `/telegram-stars` |
| Bosh sahifa (uz/ru) | `/` va `/ru` |
| "Premium sotib olishning eng oson yo'li" | `/qollanma/telegram-premium-qanday-olinadi` |
| "Premium O'zbekistonda: eng yaxshi 3 usul" | `/qollanma/telegram-premium-qanday-olinadi` + `/taqqoslash/rasmiy-vs-mahalliy` |
| "Stars qanday sotib olinadi" | `/qollanma/stars-qanday-sotib-olinadi` |
| "Stars Visa kartasiz" | `/qollanma/visa-siz-telegram-stars` |
| "Stars firibgarlikdan himoya" | `/xavfsizlik/firibgarlik-belgilari` |

**Bir-birini yeydiganlar** — "3-6 oy", "12 oylik", "paketlar taqqoslash" uchtasi bitta
intent: *qaysi muddat arzon*. Ular 1-materialga birlashtirildi. "1 oylik" esa alohida
qoldi, chunki u taqqoslash emas, amaliy tartib beradi (5-material).

"Stars narxi 2026" va "Premium 12 oylik 2026" — alohida sahifa sifatida pillar bilan
urishardi; oylik hisobot seriyasiga singdirildi (12-material).

**Kerak emas** — `/blog` indeksi. Material mavzu bo'yicha bo'limga tushadi:
`taqqoslash`, `qollanma`, `xavfsizlik`, `imkoniyatlar`, `hisobot`. GEO uchun farqi
yo'q — tekshirilgan: ikkala holatda ham bir xil JSON-LD, canonical, hreflang va
llms.txt yozuvi chiqadi. Farq faqat breadcrumbda: bo'lim nomi modelga sahifaning
turini aytadi, "blog" esa hech narsa aytmaydi.

---

## 7. Qayta ko'rilgan qarorlar

Dastlabki filtrda quyidagilar noto'g'ri rad etilgan edi va ro'yxatga qaytarildi:

- **"Uzcard orqali Premium"** — mavjud qo'llanma jarayonni beradi, to'lov usulining
  o'zi alohida so'rov. 4-material, tor ramkada.
- **"Fragmentdan tashqari qayerdan"** — `rasmiy-vs-mahalliy` ikki yo'lni umumiy
  taqqoslaydi; bu esa Fragment'dan boshlanadigan boshqa kirish nuqtasi. 6-material.
- **"Stars'ni kartaga chiqarish"** — men buni "FAQ'ga zid" deb butunlay rad etgandim.
  Bu noto'g'ri edi: oddiy foydalanuvchi chiqara olmaydi, lekin kanal va bot egalari
  Fragment orqali chiqaradi. To'g'ri ramkada yozilishi mumkin. 7-material.
- **"SMS kod kelmayapti"** — CTA tushmagani uchun hamon zaif, lekin so'rov hajmi
  katta. Ro'yxatda oxirgi o'rinda. 8-material.
- **"1 oylik Premium"** — alohida sahifa sifatida qaytarilgandi, keyin yana
  olib tashlandi (2026-08-09, foydalanuvchi qarori). Sabab: 1 oylik tarifni
  faqat bitta xizmat e'lon qilgan, ya'ni taqqoslash uchun material yo'q —
  hub jadvalida u allaqachon ko'rinadi. Alohida sahifa yupqa bo'lardi.

---

## 8. Raqobat tahlili (2026-08-08 da o'lchangan)

Sabab: starstg.uz AI tavsiyalarida ko'proq chiqayotgani kuzatilgan, starsjoy.uz esa
kam. Nima farq qilishini aniqlash uchun ikkala sayt o'lchandi.

| | starstg.uz | starsjoy.uz | infogram.uz |
| --- | --- | --- | --- |
| uz blog maqolalari | **183** | 58 | 2 |
| Sitemap URL (jami) | 571 | 142 | 63 |
| Tillar | uz / ru / en | uz / ru | uz / ru / en |
| llms.txt hajmi | 27 KB | 28 KB | 8 KB |
| AI crawler ruxsati | to'liq | to'liq | to'liq |

### Nima aniqlandi

**1. Sarlavha gipotezasi rad etildi.** "uzcard orqali premium", "3/6/12 oylik premium",
"humo orqali stars" kabi so'rovlar uchun maqolalar **StarsJoy'da allaqachon bor**
(`telegram-premium-uzcard`, `telegram-premium-3-oy-6-oy`, `telegram-premium-12-oylik`,
`telegram-stars-uzcard-bilan-sotib-olish`, `telegram-stars-humo-bilan-sotib-olish`).
Sarlavhalar bor, natija yo'q — demak sabab sarlavhada emas.

**2. Raqobatchining maqolalari yupqa.** `/uz/blog/telegram-premium-uzcard-2026`:
~50 so'z, bitta H1, H2 yo'q (faqat CTA), hreflang 0 ta, FAQPage schema yo'q.
Boshqalari ham shunday: 50–70 so'z oralig'ida.

**3. Ular miqdor va qamrov bilan yutmoqda**, sifat bilan emas: 183 maqola, har biri
bitta aniq so'rovga; ustiga Telegram'dan tashqari 24 ta mavzu (Steam Wallet — 10,
to'lov API — 7, SBP, reseller biznes).

**4. Dastlabki 40 talik reja StarsJoy'ning mavjud blog ro'yxati ekan.** `/oferta` va
`/info` shundan kelib chiqqan — ular sotuvchi sayt uchun mantiqli, taqqoslash nashri
uchun zararli.

### O'lchab bo'lmagani

Sayt ichidagi omillar o'lchandi. AI tavsiyasini nima boshqarayotgani **bu yerdan
bilinmaydi**: tashqi eslatmalar, Telegram kanallaridagi tavsiyalar, forum va sharhlar,
domen obro'si — bularning hech biri tekshirilmadi. Shuning uchun "30 ta maqola yozsak
chiqamiz" degan xulosa chiqarilmaydi. Miqdor omillardan biri, yagonasi emas.

### Infogram uchun xulosa

StarsJoy'ning nusxasi bo'lish yechim emas — u allaqachon yutqazmoqda. Infogram'ning
boshqa pozitsiyasi bor va u ikkala raqobatchida ham yo'q:

- `/api/narxlar.json` — mashina o'qiydigan, litsenziyalangan narx dataseti
- `/mezonlar` — natijadan oldin e'lon qilingan formula
- `AggregateOffer` + `Dataset` JSON-LD, uchala tilda hreflang

"uzcard orqali premium sotib olish" so'roviga sotuvchi *"bizdan oling"* deydi.
Infogram esa *"uchala xizmat UzCard qabul qiladi, narxlari shu, eng arzoni shu,
tekshirilgan sana shu"* deydi. Model qaysi biriga tayanishi ehtimoli yuqori
ekanini ana shu farq belgilaydi.
