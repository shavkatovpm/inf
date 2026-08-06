# Infogram → StarsJoy funnel o'lchovi

## Maqsad

Bir xil `source` qiymati bilan saytdagi CTA bosilishi, botning `/start`
hodisasi va yakunlangan to'lovni bog'lash.

```
Organic query → Infogram URL → CTA click → /start ig_<source> → order → paid
```

## Sayt eventlari

Har CTA `infogram_cta_click` eventini `dataLayer`ga yuboradi. GTM/GA4da
shu eventni GA4 event sifatida qabul qiling va quyidagi parametrlarni saqlang:

- `source` — masalan, `telegram-stars-cta`
- `product` — `stars`, `premium`, `gifts` yoki `comparison`
- `provider` — provayder identifikatori
- `page_path` — tashrif buyurilgan sahifa

Plausible ishlatilsa event nomi `Infogram CTA Click` bo'ladi va ayni
parametrlar custom properties sifatida uzatiladi.

## Bot contracti

Bot `/start` payloadidan `ig_` prefiksini olib tashlab, quyidagilarni yozishi
kerak. `source` foydalanuvchi sessiyasiga birinchi kelgan qiymat sifatida
biriktiriladi va buyurtma yakunlanguncha saqlanadi.

| Event | Majburiy maydonlar |
| --- | --- |
| `bot_start` | `user_id`, `source`, `started_at` |
| `order_created` | `order_id`, `user_id`, `source`, `product`, `amount_uzs` |
| `payment_success` | `order_id`, `source`, `product`, `amount_uzs`, `paid_at` |
| `delivery_success` | `order_id`, `source`, `delivered_at` |

`source` bo'sh bo'lsa `direct` yozilsin. Bot identifikatorlarini Analytics
platformasiga yubormang; agregat konversiyalarni server tomonida jo'nating.

## Hisobot

Haftalik kesimda `source × product` bo'yicha quyidagilarni ko'ring:

- CTA click → bot start foizi
- bot start → payment_success foizi
- tushum (`amount_uzs`) va o'rtacha buyurtma qiymati
- Google Search Console query/landing-page kliklari

Search Console'ni domen property sifatida ulang, keyin `Performance` hisobotini
landing page bo'yicha eksport qilib, yuqoridagi `source` bilan solishtiring.
Bu qadam Google akkaunti va StarsJoy bot backendiga kirishni talab qiladi;
u sayt kodidan mustaqil bajariladi.
