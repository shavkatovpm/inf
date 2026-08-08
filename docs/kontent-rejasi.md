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

## 2. Ketma-ketlik

### Bosqich 0 — kod ✅ bajarildi

| Ish | Holat |
| --- | --- |
| `BuyCta` ni mahsulotga moslashtirish | ✅ Endi shu mahsulotni sotadigan **barcha** botli xizmat CTA oladi. Premium → 3 ta, Stars → 2 ta, Gifts → 1 ta |
| Bo'lim ro'yxatini markazlashtirish | ✅ `src/lib/sections.ts` — yagona manba. Ro'yxat kolleksiyalardan farq qilsa `npm run check` xato beradi |

### Bosqich 1 — mavjud bo'limlarga (yangi kod kerak emas)

**1. Premium muddatlari: 1, 3, 6, 12 oy — qaysi biri arzon?**

- `/taqqoslash/premium-muddatlari` · `/ru/...` · `/en/...`
- So'rov: *"telegram premium 3 oy narxi"*, *"qaysi muddat arzon"*
- Dublikat emas: `/telegram-premium` narxni ko'rsatadi, 1 oyga tushadigan qiymatni tahlil qilmaydi
- Ma'lumot: `premiumPerMonth()` allaqachon mavjud — hisob kodda tayyor
- CTA: StarsJoy + Uzgets + PremiumSend
- Havolalar: `/telegram-premium`, `/narxlar`, `/reyting/telegram-premium`

**2. Stars paketlari: 50 / 100 / 500 / 1000 — chegirma bormi?**

- `/taqqoslash/stars-paketlari` · `/ru/...` · `/en/...`
- So'rov: *"1000 stars qancha"*, *"katta paket arzonmi"*
- Dublikat emas: kalkulyator hisoblaydi, javob bermaydi
- Ma'lumot: ikkala xizmatda ham `flatRate: true` — **katta paket chegirma bermaydi**.
  Bu ma'lumotdan chiqqan, iqtibos olinadigan xulosa
- CTA: StarsJoy + Uzgets

**3. Telegram Premium'ni Visa kartasiz olish**

- `/qollanma/visa-siz-telegram-premium` · `/ru/...` · `/en/...`
- So'rov: *"premium visa kerakmi"*, *"uzcard bilan premium"*
- Dublikat emas: mavjud `visa-siz-telegram-stars` faqat Stars haqida
- Ma'lumot: `commonPayments()` — uchala xizmat qabul qiladigan usullar
- CTA: StarsJoy + Uzgets + PremiumSend
- Havolalar: `/qollanma/visa-siz-telegram-stars`, `/telegram-premium`

### Bosqich 2 — yangi bo'lim: `/imkoniyatlar`

Yangi bo'lim oqlanadi, chunki bu intent mavjud uchta klasterning birortasiga tushmaydi:
`qollanma` — *qanday olinadi*, `taqqoslash` — *qaysi biri*, `xavfsizlik` — *qanday himoyalanadi*.
Bu esa — *nima beradi*.

**4. Telegram Premium nima beradi: 30+ funksiya**

- `/imkoniyatlar/telegram-premium-funksiyalari` · `/ru/...` · `/en/...`
- So'rov: *"premium nima beradi"*, *"premium funksiyalari"*
- Websearch majburiy: funksiyalar ro'yxati Telegram tomonidan o'zgaradi
- CTA: StarsJoy + Uzgets + PremiumSend

**5. Telegram Stars bilan nima qilish mumkin: 9 usul**

- `/imkoniyatlar/telegram-stars-bilan-nima-qilish` · `/ru/...` · `/en/...`
- So'rov: *"stars nimaga kerak"*, *"stars bilan nima qilsa bo'ladi"*
- CTA: StarsJoy + Uzgets

### Bosqich 3 — ma'lumot (maqola emas)

**6. Telegram Gifts narxlari**

Blog post emas — `providers.json` ga qo'shiladi. Shundan keyin `/telegram-gifts`,
`/narxlar`, `/api/narxlar.json` va JSON-LD **o'zi to'ladi**.

AI matn ichidagi ro'yxatni emas, strukturali ma'lumotni iqtibos qiladi. Rejadagi eng
qimmatli bo'shliq shu.

### Bosqich 4 — hisobot seriyasi (oyiga bitta)

**7. Oylik narx hisoboti**

- `/hisobot/2026-08` · `/ru/...` · `/en/...`
- Mazmun: shu oyda nima o'zgardi, nima o'zgarmadi, sabab
- Bu **birlamchi manba**: modelda bu ma'lumot boshqa joydan yo'q
- Sarlavhada aniq oy va yil — bu seriya, arxiv qiymati bor
- CTA: mahsulotga qarab

---

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
- [ ] `answer` 40–60 so'z, `faq` ≥ 4 ta
- [ ] uz + ru + en — uchalasi tayyor
- [ ] Kamida 3 ta ichki havola
- [ ] `npm run check` — 0 xato
- [ ] Build'da singan havola yo'q

---

## 6. Filtrdan o'tmaganlar

**Sotuvchi hujjati — saytning pozitsiyasini buzadi**

`/oferta`, `/info` (StarsJoy haqida rasmiy sahifa). Infogram sotuvchi emas. Oferta
qo'yilsa, sayt yuridik jihatdan sotuvchiga aylanadi; hamkor haqida "rasmiy" sahifa esa
`/reyting` va `/mezonlar` ning qiymatini yo'q qiladi.

**Mavjud sahifa dublikati**

`/premium` → `/telegram-premium` bor · `/stars` → `/telegram-stars` bor ·
"Premium sotib olishning eng oson yo'li" → `/qollanma/telegram-premium-qanday-olinadi` ·
"Stars qanday sotib olinadi" → `/qollanma/stars-qanday-sotib-olinadi` ·
"Stars Visa kartasiz" → `/qollanma/visa-siz-telegram-stars` ·
"Stars firibgarlikdan himoya" → `/xavfsizlik/firibgarlik-belgilari` ·
"Fragmentdan tashqari qayerdan" → `/taqqoslash/rasmiy-vs-mahalliy` ·
"Uzcard orqali Premium" va "eng yaxshi 3 usul" → mavjud Premium qo'llanmasi qamraydi

**Bir-birini yeydiganlar** — "3-6 oy", "1 oylik", "12 oylik", "paketlar taqqoslash"
to'rttasi bitta intent. Bitta sahifaga birlashtirildi (material 1).

**Mavzudan tashqari** — "Telegram SMS kod kelmayapti": xaridga aloqasi yo'q, topik
avtoritetni suyultiradi. Bu savol uchun AI Telegram hujjatini iqtibos qiladi.

**O'z FAQ'iga zid** — "Stars'ni kartaga chiqarish / Cash Out": `pillar.ts` da oddiy
foydalanuvchi uchun Stars naqd pulga qaytarilmasligi yozilgan.

**Kerak emas** — `/blog` indeksi. Xronologik blog mavzuviy klasterni buzadi va mavjud
sahifalar bilan kannibalizatsiya qiladi. Material mavzu bo'yicha bo'limga tushadi.
