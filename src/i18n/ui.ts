export type Locale = 'uz' | 'ru' | 'en';

export const ui = {
  uz: {
    'nav.menu': 'Menyu',
    'nav.main': 'Asosiy',
    'nav.lang': 'Til',
    'nav.stars': 'Stars',
    'nav.premium': 'Premium',
    'nav.gifts': 'Gifts',
    'nav.narxlar': 'Narxlar',
    'nav.reyting': 'Reyting',
    'nav.taqqoslash': 'Taqqoslash',
    'nav.xavfsizlik': 'Xavfsizlik',
    'nav.qollanma': "Qo'llanma",
    'nav.mezonlar': 'Mezonlar',

    'seg.arzon': 'Eng arzon',
    'seg.ishonchli': 'Eng ishonchli',
    'seg.tez': 'Eng tez',
    'seg.arzon.desc': 'Faqat yakuniy narx muhim bo‘lganda',
    'seg.ishonchli.desc': 'Birinchi marta olayotganlar va katta summalar uchun',
    'seg.tez.desc': 'Yetkazish tezligi hal qiluvchi bo‘lganda',

    'crit.price': 'Narx',
    'crit.deliverySpeed': 'Yetkazish tezligi',
    'crit.paymentCoverage': "To‘lov usullari",
    'crit.trackRecord': 'Bozordagi muddat',
    'crit.verifiedReviews': 'Ochiq sharhlar',
    'crit.guarantee': 'Pul qaytarish kafolati',

    'label.perStar': '1 Star narxi',
    'label.provider': 'Provayder',
    'label.payments': "To‘lov",
    'label.delivery': 'Yetkazish',
    'label.updated': 'Yangilangan',
    'label.sources': 'Manbalar',
    'label.open': 'Ochish',
    'label.approx': 'taxminiy',
    'label.notPublished': "e’lon qilinmagan",
    'label.months': 'oy',
    'label.perMonth': '1 oyga',

    'note.approx':
      "Provayder faqat boshlang‘ich narxni e’lon qilgan — yakuniy summa botda hisoblanadi.",
    'note.unknownPenalty':
      "E’lon qilinmagan ma’lumot ball bermaydi: isbotlanmagan ustunlik hisobga olinmaydi.",
    'cta.buyStars': 'Stars sotib olish',
    'cta.buyPremium': 'Premium sotib olish',
    'cta.sendGift': 'Sovg‘a yuborish',
    'cta.via': 'orqali',
    'cta.calc': 'Kalkulyatorda hisoblash',
  },

  ru: {
    'nav.menu': 'Меню',
    'nav.main': 'Основное',
    'nav.lang': 'Язык',
    'nav.stars': 'Stars',
    'nav.premium': 'Premium',
    'nav.gifts': 'Подарки',
    'nav.narxlar': 'Цены',
    'nav.reyting': 'Рейтинг',
    'nav.taqqoslash': 'Сравнение',
    'nav.xavfsizlik': 'Безопасность',
    'nav.qollanma': 'Инструкции',
    'nav.mezonlar': 'Критерии',

    'seg.arzon': 'Самый дешёвый',
    'seg.ishonchli': 'Самый надёжный',
    'seg.tez': 'Самый быстрый',
    'seg.arzon.desc': 'Когда важна только итоговая цена',
    'seg.ishonchli.desc': 'Для первой покупки и крупных сумм',
    'seg.tez.desc': 'Когда решает скорость доставки',

    'crit.price': 'Цена',
    'crit.deliverySpeed': 'Скорость доставки',
    'crit.paymentCoverage': 'Способы оплаты',
    'crit.trackRecord': 'Срок работы',
    'crit.verifiedReviews': 'Открытые отзывы',
    'crit.guarantee': 'Гарантия возврата',

    'label.perStar': 'Цена 1 Star',
    'label.provider': 'Сервис',
    'label.payments': 'Оплата',
    'label.delivery': 'Доставка',
    'label.updated': 'Обновлено',
    'label.sources': 'Источники',
    'label.open': 'Открыть',
    'label.approx': 'примерно',
    'label.notPublished': 'не опубликовано',
    'label.months': 'мес.',
    'label.perMonth': 'за месяц',

    'note.approx':
      'Сервис публикует только начальную цену — итоговая сумма считается в боте.',
    'note.unknownPenalty':
      'Неопубликованные данные не дают баллов: недоказанное преимущество не учитывается.',
    'cta.buyStars': 'Купить Stars',
    'cta.buyPremium': 'Купить Premium',
    'cta.sendGift': 'Отправить подарок',
    'cta.via': 'через',
    'cta.calc': 'Посчитать в калькуляторе',
  },

  en: {
    'nav.menu': 'Menu',
    'nav.main': 'Main',
    'nav.lang': 'Language',
    'nav.stars': 'Stars',
    'nav.premium': 'Premium',
    'nav.gifts': 'Gifts',
    'nav.narxlar': 'Prices',
    'nav.reyting': 'Rankings',
    'nav.taqqoslash': 'Comparisons',
    'nav.xavfsizlik': 'Safety',
    'nav.qollanma': 'Guides',
    'nav.mezonlar': 'Criteria',

    'seg.arzon': 'Cheapest',
    'seg.ishonchli': 'Most trusted',
    'seg.tez': 'Fastest',
    'seg.arzon.desc': 'When only the final price matters',
    'seg.ishonchli.desc': 'For first-time buyers and larger amounts',
    'seg.tez.desc': 'When delivery speed decides',

    'crit.price': 'Price',
    'crit.deliverySpeed': 'Delivery speed',
    'crit.paymentCoverage': 'Payment methods',
    'crit.trackRecord': 'Time in market',
    'crit.verifiedReviews': 'Public reviews',
    'crit.guarantee': 'Money-back guarantee',

    'label.perStar': 'Price per Star',
    'label.provider': 'Provider',
    'label.payments': 'Payment',
    'label.delivery': 'Delivery',
    'label.updated': 'Updated',
    'label.sources': 'Sources',
    'label.open': 'Open',
    'label.approx': 'approx.',
    'label.notPublished': 'not published',
    'label.months': 'mo',
    'label.perMonth': 'per month',

    'note.approx':
      'The provider publishes a starting price only — the final amount is calculated in the bot.',
    'note.unknownPenalty':
      'Unpublished data scores zero: an unproven advantage is not counted.',
    'cta.buyStars': 'Buy Stars',
    'cta.buyPremium': 'Buy Premium',
    'cta.sendGift': 'Send a gift',
    'cta.via': 'via',
    'cta.calc': 'Open the calculator',
  },
} as const;

export function t(locale: Locale) {
  return (key: keyof (typeof ui)['uz']): string =>
    (ui[locale] as Record<string, string>)[key] ?? (ui.uz as Record<string, string>)[key] ?? key;
}
