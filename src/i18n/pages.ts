import type { Locale } from './ui';

/**
 * Bo'lim sahifalarining matni.
 *
 * ui.ts — qisqa yorliqlar; bu fayl — sahifa kontenti (sarlavha, meta,
 * kirish matni, FAQ). Uch til bir joyda turadi, shunda paritet
 * buzilganda darhol ko'rinadi.
 */

export type ProductSlug = 'telegram-stars' | 'telegram-premium' | 'telegram-gifts';
export const PRODUCT_SLUGS: ProductSlug[] = ['telegram-stars', 'telegram-premium', 'telegram-gifts'];

/** URL slug → providers.json dagi mahsulot kaliti. */
export const SLUG_TO_PRODUCT = {
  'telegram-stars': 'stars',
  'telegram-premium': 'premium',
  'telegram-gifts': 'gifts',
} as const;

interface ProductCopy {
  name: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  what: { h: string; body: string };
}

export const PRODUCTS: Record<Locale, Record<ProductSlug, ProductCopy>> = {
  uz: {
    'telegram-stars': {
      name: 'Telegram Stars',
      h1: 'Telegram Stars narxlari — O‘zbekiston',
      title: 'Telegram Stars narxi — O‘zbekistonda so‘mda | Infogram',
      description:
        'Telegram Stars narxlari so‘mda: 1 dona qancha turadi, paket narxlari va to‘lov usullari. Mustaqil taqqoslash, har hafta yangilanadi.',
      intro:
        'Telegram Stars — Telegram ichidagi rasmiy virtual valyuta. Quyida so‘mda to‘lov qabul qiladigan xizmatlarning e’lon qilingan narxlari keltirilgan.',
      what: {
        h: 'Telegram Stars nima uchun kerak?',
        body: 'Stars orqali kanal va botlardagi pulli kontentni ochish, sovg‘a yuborish, mini-ilovalarda to‘lov qilish va kontent mualliflarini qo‘llab-quvvatlash mumkin.',
      },
    },
    'telegram-premium': {
      name: 'Telegram Premium',
      h1: 'Telegram Premium narxlari — O‘zbekiston',
      title: 'Telegram Premium narxi — 1, 3, 6, 12 oy so‘mda | Infogram',
      description:
        'Telegram Premium obunasi narxlari so‘mda: 1, 3, 6 va 12 oylik tariflar taqqoslandi. UzCard va HUMO bilan to‘lov, Visa kerak emas.',
      intro:
        'Telegram Premium — obuna asosidagi rasmiy tarif. Quyida so‘mda to‘lov qabul qiladigan xizmatlarning tariflari taqqoslangan.',
      what: {
        h: 'Telegram Premium nima beradi?',
        body: 'Kattaroq fayl yuklash limiti, reklama ko‘rsatilmasligi, kengaytirilgan chat va papka limitlari, maxsus emoji va stikerlar, profil sozlamalari.',
      },
    },
    'telegram-gifts': {
      name: 'Telegram Gifts',
      h1: 'Telegram Gifts — sovg‘alar va narxlar',
      title: 'Telegram Gifts sotib olish — O‘zbekiston | Infogram',
      description:
        'Telegram sovg‘alari (Gifts) qanday ishlaydi, qaysi xizmatlar so‘mda taklif qiladi va rasmiy yo‘ldan farqi nimada.',
      intro:
        'Telegram Gifts — foydalanuvchiga yuboriladigan virtual sovg‘alar. Ular Stars evaziga sotib olinadi, ba’zilari kolleksion (collectible) maqomiga ega.',
      what: {
        h: 'Telegram Gifts qanday ishlaydi?',
        body: 'Sovg‘a Stars balansidan sotib olinadi va tanlangan foydalanuvchiga yuboriladi. Qabul qiluvchi uni profilida saqlashi yoki Stars ga qaytarishi mumkin.',
      },
    },
  },

  ru: {
    'telegram-stars': {
      name: 'Telegram Stars',
      h1: 'Цены на Telegram Stars — Узбекистан',
      title: 'Цена Telegram Stars — в сумах, Узбекистан | Infogram',
      description:
        'Цены на Telegram Stars в сумах: стоимость одной звезды, цены пакетов и способы оплаты. Проверяемые данные с датой проверки.',
      intro:
        'Telegram Stars — официальная внутренняя валюта Telegram. Ниже опубликованные цены сервисов, принимающих оплату в сумах.',
      what: {
        h: 'Зачем нужны Telegram Stars?',
        body: 'Звёздами открывают платный контент в каналах и ботах, отправляют подарки, оплачивают мини-приложения и поддерживают авторов.',
      },
    },
    'telegram-premium': {
      name: 'Telegram Premium',
      h1: 'Цены на Telegram Premium — Узбекистан',
      title: 'Цена Telegram Premium — 1, 3, 6, 12 месяцев | Infogram',
      description:
        'Цены на подписку Telegram Premium в сумах: тарифы на 1, 3, 6 и 12 месяцев. Оплата картой UzCard и HUMO, Visa не нужна.',
      intro:
        'Telegram Premium — официальная подписка. Ниже сравнение тарифов сервисов, принимающих оплату в сумах.',
      what: {
        h: 'Что даёт Telegram Premium?',
        body: 'Больший лимит на загрузку файлов, отсутствие рекламы, расширенные лимиты чатов и папок, эксклюзивные эмодзи и стикеры, настройки профиля.',
      },
    },
    'telegram-gifts': {
      name: 'Telegram Gifts',
      h1: 'Telegram Gifts — подарки и цены',
      title: 'Купить Telegram Gifts — Узбекистан | Infogram',
      description:
        'Как работают подарки Telegram, какие сервисы предлагают их за сумы и чем это отличается от официального пути.',
      intro:
        'Telegram Gifts — виртуальные подарки для пользователей. Покупаются за Stars, часть из них имеет коллекционный статус.',
      what: {
        h: 'Как работают Telegram Gifts?',
        body: 'Подарок покупается с баланса Stars и отправляется выбранному пользователю. Получатель может оставить его в профиле или обменять обратно на Stars.',
      },
    },
  },

  en: {
    'telegram-stars': {
      name: 'Telegram Stars',
      h1: 'Telegram Stars prices — Uzbekistan',
      title: 'Telegram Stars price — in UZS, Uzbekistan | Infogram',
      description:
        'Telegram Stars prices in UZS: cost per star, package prices and payment methods. Independent comparison, updated weekly.',
      intro:
        'Telegram Stars is Telegram’s official in-app currency. Below are the published prices of services that accept payment in UZS.',
      what: {
        h: 'What are Telegram Stars for?',
        body: 'Stars unlock paid content in channels and bots, send gifts, pay inside mini apps and support creators.',
      },
    },
    'telegram-premium': {
      name: 'Telegram Premium',
      h1: 'Telegram Premium prices — Uzbekistan',
      title: 'Telegram Premium price — 1, 3, 6, 12 months | Infogram',
      description:
        'Telegram Premium subscription prices in UZS: 1, 3, 6 and 12-month plans compared. Pay with UzCard and HUMO — no Visa needed.',
      intro:
        'Telegram Premium is the official subscription tier. Below is a comparison of services accepting payment in UZS.',
      what: {
        h: 'What does Telegram Premium give you?',
        body: 'Larger upload limits, no ads, expanded chat and folder limits, exclusive emoji and stickers, and profile customisation.',
      },
    },
    'telegram-gifts': {
      name: 'Telegram Gifts',
      h1: 'Telegram Gifts — gifts and prices',
      title: 'Buy Telegram Gifts — Uzbekistan | Infogram',
      description:
        'How Telegram gifts work, which services offer them for UZS, and how that differs from the official route.',
      intro:
        'Telegram Gifts are virtual gifts sent to users. They are bought with Stars, and some carry collectible status.',
      what: {
        h: 'How do Telegram Gifts work?',
        body: 'A gift is purchased from a Stars balance and sent to a chosen user. The recipient can keep it on their profile or convert it back to Stars.',
      },
    },
  },
};

/** Bo'lim indekslari uchun matn. */
export const SECTIONS = {
  uz: {
    narxlar: {
      h1: 'Telegram Stars va Premium narxlari — O‘zbekiston',
      title: 'Telegram Stars va Premium narxlari O‘zbekistonda | Infogram',
      description:
        'O‘zbekistonda Telegram Stars va Premium sotib olish narxlari: arzon takliflar, paketlar, UzCard va HUMO to‘lovi taqqoslandi. Har hafta tekshiriladi.',
      intro: 'Telegram Stars, Premium va Gifts’ni O‘zbekistonda so‘mda sotib olish narxlari, paketlar, to‘lov usullari va yetkazish vaqtlari.',
    },
    reyting: {
      h1: 'Telegram Stars va Premium xizmatlari reytingi',
      title: 'Telegram Stars va Premium xizmatlari reytingi | Infogram',
      description:
        'Telegram Stars va Premium xizmatlarining segmentlar bo‘yicha reytingi: eng arzon, eng ishonchli, eng tez. Ochiq mezonlar.',
      intro:
        'Reyting qo‘lda tuzilmaydi — ochiq e’lon qilingan vaznlar bo‘yicha hisoblanadi. Bitta umumiy “eng yaxshi” yo‘q, shuning uchun uch segment.',
    },
    taqqoslash: {
      h1: 'Taqqoslash',
      title: 'Telegram xizmatlarini taqqoslash — O‘zbekiston | Infogram',
      description:
        'Mahalliy xizmatlar, rasmiy yo‘l va to‘lov usullari yonma-yon taqqoslandi.',
      intro: 'Yonma-yon taqqoslashlar: qaysi holatda qaysi yo‘l qulayroq.',
    },
    xavfsizlik: {
      h1: 'Telegram Stars va Premium’ni xavfsiz sotib olish',
      title: 'Telegram Stars va Premium — firibgarlikdan himoya | Infogram',
      description:
        'Telegram Stars va Premium sotib olishda firibgarlik belgilari, xavfsiz xarid qoidalari va pul qaytarish tartibi.',
      intro:
        'Bu bo‘limda xarid oldidan tekshiriladigan belgilar va muammo yuzaga kelganda nima qilish kerakligi yig‘ilgan.',
    },
    qollanma: {
      h1: 'Telegram Stars va Premium sotib olish qo‘llanmalari',
      title: 'Telegram Stars va Premium’ni UzCard, HUMO bilan olish | Infogram',
      description: 'O‘zbekistonda Telegram Stars va Premium’ni UzCard, HUMO, Click yoki Payme orqali sotib olish bo‘yicha bosqichma-bosqich qo‘llanmalar.',
      intro: 'UzCard, HUMO, Click va Payme orqali so‘mda xarid qilish, faollashtirish va muammolarni hal qilish bo‘yicha amaliy yo‘riqnomalar.',
    },
    kalkulyator: {
      h1: 'Telegram Stars kalkulyatori',
      title: 'Telegram Stars kalkulyatori — so‘mdagi narx | Infogram',
      description:
        'Kerakli Stars miqdorini kiriting — so‘mdagi narx barcha xizmatlar bo‘yicha hisoblanadi va eng arzoni belgilanadi.',
      intro: 'Miqdorni tanlang yoki kiriting — narx barcha xizmatlar bo‘yicha darhol hisoblanadi.',
    },
  },

  ru: {
    narxlar: {
      h1: 'Цены Telegram Stars и Premium в Узбекистане',
      title: 'Цены на Telegram Stars, Premium и Gifts — Узбекистан | Infogram',
      description:
        'Цены сервисов, принимающих оплату в сумах, на Telegram Stars, Premium и Gifts. Перепроверяются еженедельно.',
      intro: 'По каждому продукту — отдельная таблица цен, способы оплаты и сроки доставки.',
    },
    reyting: {
      h1: 'Рейтинг сервисов Telegram Stars и Premium',
      title: 'Рейтинг Telegram-сервисов — Узбекистан | Infogram',
      description:
        'Рейтинг сервисов Telegram Stars и Premium по сегментам: самый дешёвый, самый надёжный, самый быстрый. Открытая методология.',
      intro:
        'Рейтинг не составляется вручную — он считается по опубликованным весам. Единого «лучшего» нет, поэтому три сегмента.',
    },
    taqqoslash: {
      h1: 'Сравнение',
      title: 'Сравнение Telegram-сервисов — Узбекистан | Infogram',
      description: 'Локальные сервисы, официальный путь и способы оплаты — сравнение бок о бок.',
      intro: 'Сравнения бок о бок: какой путь удобнее в каком случае.',
    },
    xavfsizlik: {
      h1: 'Безопасная покупка Telegram Stars и Premium',
      title: 'Telegram Stars и Premium — защита от мошенничества | Infogram',
      description:
        'Признаки мошенничества при покупке Telegram Stars и Premium, правила безопасной покупки и порядок возврата.',
      intro: 'Здесь собраны признаки, которые стоит проверить до покупки, и что делать при проблеме.',
    },
    qollanma: {
      h1: 'Как купить Telegram Stars и Premium в Узбекистане',
      title: 'Telegram Stars и Premium — пошаговые инструкции | Infogram',
      description: 'Как купить Telegram Stars и Premium в Узбекистане через UzCard, HUMO, Click или Payme: пошаговые инструкции, активация и решение проблем.',
      intro: 'Пошаговые инструкции по оплате в сумах, активации и решению проблем с Telegram Stars и Premium.',
    },
    kalkulyator: {
      h1: 'Калькулятор Telegram Stars',
      title: 'Калькулятор Telegram Stars — цена в сумах | Infogram',
      description:
        'Введите нужное количество Stars — цена в сумах посчитается по всем сервисам, самая низкая будет отмечена.',
      intro: 'Выберите или введите количество — цена посчитается по всем сервисам сразу.',
    },
  },

  en: {
    narxlar: {
      h1: 'Telegram Stars and Premium prices in Uzbekistan',
      title: 'Telegram Stars, Premium and Gifts prices — Uzbekistan | Infogram',
      description:
        'Prices from services accepting UZS for Telegram Stars, Premium and Gifts. Re-checked weekly.',
      intro: 'A separate price table for each product, with payment methods and delivery times.',
    },
    reyting: {
      h1: 'Telegram Stars and Premium service rankings',
      title: 'Telegram service rankings — Uzbekistan | Infogram',
      description:
        'Rankings of Telegram Stars and Premium services by segment: cheapest, most trusted, fastest. Open methodology.',
      intro:
        'The ranking is not hand-curated — it is computed from published weights. There is no single “best”, hence three segments.',
    },
    taqqoslash: {
      h1: 'Comparisons',
      title: 'Telegram service comparisons — Uzbekistan | Infogram',
      description: 'Local services, the official route and payment methods, compared side by side.',
      intro: 'Side-by-side comparisons: which route suits which situation.',
    },
    xavfsizlik: {
      h1: 'Buying Telegram Stars and Premium safely',
      title: 'Telegram Stars and Premium — avoiding fraud | Infogram',
      description:
        'Fraud warning signs when buying Telegram Stars and Premium, safe-purchase rules and the refund process.',
      intro: 'What to check before buying, and what to do if something goes wrong.',
    },
    qollanma: {
      h1: 'How to buy Telegram Stars and Premium in Uzbekistan',
      title: 'Telegram Stars and Premium — step-by-step guides | Infogram',
      description: 'How to buy Telegram Stars and Premium in Uzbekistan with UzCard, HUMO, Click or Payme: step-by-step payment, activation and troubleshooting guides.',
      intro: 'Step-by-step guides to paying in UZS, activating Telegram products and resolving purchase problems.',
    },
    kalkulyator: {
      h1: 'Telegram Stars calculator',
      title: 'Telegram Stars calculator — price in UZS | Infogram',
      description:
        'Enter the number of Stars you need — the UZS price is calculated across every service and the cheapest is highlighted.',
      intro: 'Pick or type an amount — the price is calculated across all services at once.',
    },
  },
} as const;

export type SectionKey = keyof (typeof SECTIONS)['uz'];
