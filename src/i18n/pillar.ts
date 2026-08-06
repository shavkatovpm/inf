import type { Locale } from './ui';
import type { ProductSlug } from './pages';

/**
 * Mahsulot pillar sahifalarining kontenti.
 *
 * Har sahifa BITTA search intent'ga qaratilgan: mahsulot entity'sining
 * o'zi ("telegram stars", "telegram premium"). Narx, xarid tartibi va
 * xavfsizlik shu sahifa ichida bo'limlar sifatida turadi — alohida
 * sahifaga ajratilsa kalit so'z kannibalizatsiyasi bo'ladi.
 *
 * Struktura AEO uchun: H1 → 40–60 so'zlik javob → faktlar jadvali →
 * savol-formatdagi H2'lar → FAQ. LLM extraction shu ketma-ketlikdan ishlaydi.
 */

export interface PillarSection {
  /** Savol shaklidagi H2 — AEO uchun majburiy. */
  h: string;
  body: string[];
}

export interface PillarCopy {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Fold ustidagi to'g'ridan-to'g'ri javob. {price} o'rniga raqam qo'yiladi. */
  answer: string;
  /** Tezkor faktlar jadvali. */
  facts: { k: string; v: string }[];
  sections: PillarSection[];
  faq: { q: string; a: string }[];
  steps: { name: string; text: string }[];
}

type Table = Record<Locale, Record<ProductSlug, PillarCopy>>;

export const PILLAR: Table = {
  uz: {
    'telegram-stars': {
      h1: 'Telegram Stars — narxi, xaridi va xavfsizligi',
      metaTitle: "Telegram Stars — narxi va sotib olish (O'zbekiston, 2026) | Infogram",
      metaDescription:
        "Telegram Stars nima, O'zbekistonda qancha turadi va so'mda qanday sotib olinadi. Narx jadvali, xarid tartibi, xavfsizlik qoidalari va FAQ.",
      answer:
        "Telegram Stars — Telegram ichidagi rasmiy virtual valyuta. O'zbekistonda so'mda to'lov qabul qiladigan xizmatlarda 1 Star {star} so'mdan boshlanadi va UzCard, HUMO, Click yoki Payme bilan sotib olinadi. Xarid uchun faqat username kerak — parol yoki SMS kod hech qachon so'ralmaydi.",
      facts: [
        { k: 'Nima', v: 'Telegram ichidagi rasmiy virtual valyuta' },
        { k: 'Narx', v: '{star} so‘mdan / 1 dona' },
        { k: 'To‘lov', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'Kerakli ma’lumot', v: 'faqat Telegram username' },
        { k: 'Yetkazish', v: 'odatda bir necha daqiqada' },
        { k: 'Visa kartasi', v: 'shart emas' },
      ],
      sections: [
        {
          h: 'Telegram Stars nima?',
          body: [
            "Telegram Stars — Telegram tomonidan joriy qilingan rasmiy ichki valyuta. U ilova ichidagi to'lovlar uchun ishlatiladi va foydalanuvchi balansida saqlanadi.",
            "Stars bilan kanal va botlardagi pulli kontentni ochish, boshqa foydalanuvchilarga sovg'a yuborish, mini-ilovalarda to'lov qilish va kontent mualliflarini qo'llab-quvvatlash mumkin.",
          ],
        },
        {
          h: 'Telegram Stars O‘zbekistonda qancha turadi?',
          body: [
            "So'mda ishlaydigan xizmatlarda 1 Star narxi {star} so'mdan boshlanadi. Narx xizmatga qarab farq qiladi — quyidagi jadvalda barcha e'lon qilingan narxlar keltirilgan.",
            "Rasmiy yo'lda (App Store, Google Play, Fragment) narx so'mda e'lon qilinmaydi: yakuniy summa do'kon komissiyasi va valyuta kursiga bog'liq bo'ladi.",
          ],
        },
        {
          h: 'Telegram Stars qanday sotib olinadi?',
          body: [
            "Xarid xizmatning Telegram botida amalga oshiriladi. Kerakli miqdor tanlanadi, Stars kimga tushishi kerak bo'lsa o'sha username kiritiladi va so'mda to'lov qilinadi.",
            "Akkauntga kirish talab qilinmaydi — yetkazish faqat username orqali bajariladi.",
          ],
        },
        {
          h: 'Stars sotib olish xavfsizmi?',
          body: [
            "Asosiy qoida bitta: **ishonchli xizmat parol, SMS kod yoki 2FA parolni so'ramaydi**. Bular so'ralsa, maqsad mahsulot yetkazish emas, akkauntni egallash.",
            "Bozor o'rtachasidan keskin past narx, ochiq sharhlarning yo'qligi va faqat shaxsiy kartaga to'lov — asosiy ogohlantirish belgilari.",
          ],
        },
        {
          h: 'Stars bilan Premium orasidagi farq nima?',
          body: [
            "Stars — bir martalik to'lov uchun ishlatiladigan valyuta: sovg'a, pulli post, mini-ilova. Premium esa obuna, ya'ni muddatli tarif bo'lib, ilovaning imkoniyatlarini kengaytiradi.",
            "Ikkalasi alohida sotib olinadi va bir-birini almashtirmaydi.",
          ],
        },
      ],
      faq: [
        { q: "O'zbekistonda 1 Telegram Star qancha turadi?", a: "So'mda to'lov qabul qiladigan xizmatlarda 1 Star {star} so'mdan boshlanadi. Aniq narx miqdorga va xizmatga bog'liq." },
        { q: 'Telegram Stars sotib olish uchun Visa kerakmi?', a: "Yo'q. Taqqoslangan xizmatlarning barchasi UzCard va HUMO qabul qiladi, ko'pchiligi Click va Payme ham." },
        { q: 'Stars sotib olishda parol so‘raladimi?', a: "Yo'q va so'ralmasligi kerak. Yetkazish faqat username orqali bajariladi. Parol yoki SMS kod so'ralsa — bu firibgarlik belgisi." },
        { q: 'Stars boshqa odamga yuborilishi mumkinmi?', a: "Ha. Xarid paytida o'z username'ingiz o'rniga qabul qiluvchining username'i kiritiladi." },
        { q: 'Stars necha daqiqada keladi?', a: 'Xizmatga qarab bir necha soniyadan bir necha daqiqagacha. Kechiksa, to‘lov tasdiqlanganini tekshirib, qo‘llab-quvvatlashga chek bilan murojaat qiling.' },
        { q: 'Stars muddati tugaydimi?', a: 'Telegram Stars balansda saqlanadi va muddatli emas. Ular sarflanmaguncha hisobda qoladi.' },
        { q: 'Stars’ni pulga qaytarish mumkinmi?', a: "Oddiy foydalanuvchi uchun Stars naqd pulga qaytarilmaydi. Ular ilova ichidagi to'lovlar uchun mo'ljallangan." },
        { q: 'Mahalliy xizmatdan olingan Stars rasmiymi?', a: "Ha — Stars'ning o'zi Telegram tizimidagi bir xil valyuta. Farq faqat sotib olish kanali va to'lov usulida." },
      ],
      steps: [
        { name: 't.me/starsjoybot ni oching', text: "Telegramda t.me/starsjoybot manzilini oching va /start bosing." },
        { name: 'Stars bo‘limini tanlang', text: 'Menyudan Stars bo‘limiga o‘ting.' },
        { name: 'Miqdorni belgilang', text: 'Tayyor paketlardan birini tanlang yoki kerakli miqdorni kiriting.' },
        { name: 'Username kiriting', text: "Stars kimga tushishi kerak bo'lsa, o'sha username kiritiladi. Parol so'ralmaydi." },
        { name: 'To‘lovni bajaring', text: "UzCard, HUMO, Click yoki Payme orqali so'mda to'lang va chekni saqlang." },
        { name: 'Balansni tekshiring', text: 'Telegram sozlamalaridagi Stars balansini oching va tushganini tasdiqlang.' },
      ],
    },

    'telegram-premium': {
      h1: 'Telegram Premium — narxi, tariflari va faollashtirish',
      metaTitle: "Telegram Premium — narxi va sotib olish (O'zbekiston, 2026) | Infogram",
      metaDescription:
        "Telegram Premium nima beradi, O'zbekistonda 1/3/6/12 oylik tariflar qancha turadi va so'mda qanday sotib olinadi. Narx jadvali, xarid tartibi va FAQ.",
      answer:
        "Telegram Premium — Telegram'ning obuna asosidagi rasmiy tarifi. O'zbekistonda so'mda 12 oylik obuna {p12} so'mdan, 3 oylik {p3} so'mdan boshlanadi. To'lov UzCard, HUMO, Click yoki Payme bilan amalga oshiriladi va faollashtirish uchun faqat username kerak.",
      facts: [
        { k: 'Nima', v: 'Muddatli rasmiy obuna tarifi' },
        { k: '12 oylik', v: '{p12} so‘mdan' },
        { k: '3 oylik', v: '{p3} so‘mdan' },
        { k: 'To‘lov', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'Kerakli ma’lumot', v: 'faqat Telegram username' },
        { k: 'Visa kartasi', v: 'shart emas' },
      ],
      sections: [
        {
          h: 'Telegram Premium nima beradi?',
          body: [
            "Premium — Telegram'ning rasmiy obunasi. U fayl yuklash limitini oshiradi, rasmiy kanallardagi reklamani olib tashlaydi, chat va papka limitlarini kengaytiradi.",
            "Bundan tashqari maxsus emoji va stikerlar, profilni sozlash imkoniyatlari va tezroq yuklab olish beriladi.",
          ],
        },
        {
          h: 'Telegram Premium O‘zbekistonda qancha turadi?',
          body: [
            "So'mda ishlaydigan xizmatlarda 12 oylik obuna {p12} so'mdan, 3 oylik esa {p3} so'mdan boshlanadi. Uzoqroq tarif odatda bir oyga arzonroq tushadi.",
            "Quyidagi jadvalda barcha muddatlar bo'yicha e'lon qilingan narxlar keltirilgan.",
          ],
        },
        {
          h: 'Premium qanday faollashtiriladi?',
          body: [
            "Xizmatning botida tarif tanlanadi, obuna kimga tegishli bo'lsa o'sha username kiritiladi va so'mda to'lov qilinadi. Faollashtirish odatda bir necha daqiqada bajariladi.",
            "Akkauntga kirish, parol yoki SMS kod talab qilinmaydi.",
          ],
        },
        {
          h: 'Premium’ni sovg‘a qilish mumkinmi?',
          body: [
            "Ha. Xarid paytida o'z username'ingiz o'rniga qabul qiluvchining username'ini kiritish yetarli — obuna to'g'ridan-to'g'ri o'sha akkauntga faollashadi.",
          ],
        },
        {
          h: 'Obuna tugagach nima bo‘ladi?',
          body: [
            "Mahalliy xizmat orqali olingan obuna muddat tugagach avtomatik uzaytirilmaydi — bu avtomatik yechib olishning oldini oladi. Davom ettirish uchun yangi tarif sotib olinadi.",
          ],
        },
      ],
      faq: [
        { q: "O'zbekistonda Telegram Premium qancha turadi?", a: "So'mda 12 oylik obuna {p12} so'mdan, 3 oylik {p3} so'mdan boshlanadi. Aniq narx xizmatga bog'liq." },
        { q: 'Premium uchun Visa kartasi kerakmi?', a: "Yo'q. Taqqoslangan xizmatlar UzCard va HUMO qabul qiladi." },
        { q: 'Premium faollashtirish uchun parol kerakmi?', a: "Yo'q. Faollashtirish username orqali bajariladi. Parol yoki SMS kod so'ralsa — bu firibgarlik belgisi." },
        { q: 'Premium’ni do‘stimga sovg‘a qila olamanmi?', a: "Ha, xarid paytida uning username'ini kiritish kifoya." },
        { q: 'Qaysi tarif tejamkorroq?', a: 'Uzoqroq muddat odatda bir oyga arzonroq tushadi. Jadvalda har tarifning 1 oyga tushadigan narxini solishtirish mumkin.' },
        { q: 'Obuna avtomatik uzayadimi?', a: "Mahalliy xizmat orqali olingan obuna avtomatik uzaytirilmaydi — kartadan takroriy yechib olish bo'lmaydi." },
        { q: 'Premium bilan Stars orasidagi farq nima?', a: 'Premium — muddatli obuna; Stars — bir martalik to‘lovlar uchun valyuta. Ular alohida sotib olinadi.' },
      ],
      steps: [
        { name: 't.me/starsjoybot ni oching', text: 'Telegramda t.me/starsjoybot manzilini oching va /start bosing.' },
        { name: 'Premium bo‘limini tanlang', text: 'Menyudan Premium bo‘limiga o‘ting.' },
        { name: 'Tarifni tanlang', text: '1, 3, 6 yoki 12 oylik tariflardan birini tanlang.' },
        { name: 'Username kiriting', text: "Obuna kimga tegishli bo'lsa, o'sha username kiritiladi." },
        { name: 'To‘lovni bajaring', text: "UzCard, HUMO, Click yoki Payme orqali so'mda to'lang." },
        { name: 'Faollashganini tekshiring', text: 'Telegram profilida Premium belgisi paydo bo‘lganini tasdiqlang.' },
      ],
    },

    'telegram-gifts': {
      h1: 'Telegram Gifts — sovg‘alar, narxlar va kolleksiya',
      metaTitle: "Telegram Gifts — sovg'a yuborish va narxlar | Infogram",
      metaDescription:
        "Telegram Gifts qanday ishlaydi, sovg'a qanday yuboriladi va narxi nimaga bog'liq. Stars bilan aloqasi, kolleksion sovg'alar va FAQ.",
      answer:
        "Telegram Gifts — foydalanuvchiga yuboriladigan virtual sovg'alar. Ular Stars evaziga sotib olinadi, ya'ni sovg'aning yakuniy narxi Stars narxiga bog'liq: 1 Star {star} so'mdan. Ba'zi sovg'alar kolleksion (collectible) maqomiga ega bo'lib, cheklangan tirajda chiqariladi.",
      facts: [
        { k: 'Nima', v: 'Foydalanuvchiga yuboriladigan virtual sovg‘a' },
        { k: 'Nimadan sotib olinadi', v: 'Stars balansidan' },
        { k: 'Stars narxi', v: '{star} so‘mdan / 1 dona' },
        { k: 'Kerakli ma’lumot', v: 'qabul qiluvchining username’i' },
        { k: 'Kolleksion', v: 'ba’zi sovg‘alar cheklangan tirajda' },
      ],
      sections: [
        {
          h: 'Telegram Gifts qanday ishlaydi?',
          body: [
            "Sovg'a Stars balansidan sotib olinadi va tanlangan foydalanuvchiga yuboriladi. Qabul qiluvchi uni profilida ko'rsatishi yoki Stars ga qaytarishi mumkin.",
            "Sovg'aning narxi Stars da belgilanadi — demak so'mdagi yakuniy summa Stars narxidan kelib chiqadi.",
          ],
        },
        {
          h: 'Kolleksion sovg‘a nima?',
          body: [
            "Ba'zi sovg'alar cheklangan tirajda chiqariladi va kolleksion (collectible) maqomiga ega bo'ladi. Ularning qiymati tirajga va talabga bog'liq bo'lib, oddiy sovg'alardan farq qiladi.",
          ],
        },
        {
          h: 'Sovg‘a yuborish uchun nima kerak?',
          body: [
            "Yetarli Stars balansi va qabul qiluvchining username'i. Akkauntga kirish yoki parol talab qilinmaydi.",
          ],
        },
      ],
      faq: [
        { q: 'Telegram sovg‘asi qancha turadi?', a: "Sovg'a narxi Stars da belgilanadi. So'mdagi summa Stars narxidan chiqadi — 1 Star {star} so'mdan." },
        { q: 'Sovg‘ani anonim yuborish mumkinmi?', a: "Telegram sovg'a yuborishda yuboruvchini ko'rsatmaslik imkonini beradi; bu xarid paytida tanlanadi." },
        { q: 'Sovg‘ani qaytarib Stars olish mumkinmi?', a: "Ko'p hollarda qabul qiluvchi sovg'ani Stars ga qaytarishi mumkin. Kolleksion sovg'alarda shartlar farq qiladi." },
        { q: 'Sovg‘a yuborish uchun Premium kerakmi?', a: "Yo'q, sovg'a yuborish uchun Premium shart emas — yetarli Stars balansi kifoya." },
      ],
      steps: [
        { name: 'Stars balansini to‘ldiring', text: "Sovg'a narxiga yetadigan Stars balansini tayyorlang." },
        { name: 'Sovg‘ani tanlang', text: "Telegram yoki xizmat botidagi sovg'alar ro'yxatidan birini tanlang." },
        { name: 'Qabul qiluvchini ko‘rsating', text: "Sovg'a yuboriladigan foydalanuvchining username'ini kiriting." },
        { name: 'Yuboring', text: "Tasdiqlang — sovg'a qabul qiluvchining profiliga tushadi." },
      ],
    },
  },

  ru: {
    'telegram-stars': {
      h1: 'Telegram Stars — цена, покупка и безопасность',
      metaTitle: 'Telegram Stars — цена и покупка (Узбекистан, 2026) | Infogram',
      metaDescription:
        'Что такое Telegram Stars, сколько они стоят в Узбекистане и как купить их за сумы. Таблица цен, порядок покупки, правила безопасности и FAQ.',
      answer:
        'Telegram Stars — официальная внутренняя валюта Telegram. В Узбекистане у сервисов с оплатой в сумах 1 Star стоит от {star} сум и покупается картой UzCard, HUMO, через Click или Payme. Для покупки нужен только username — пароль и SMS-код не запрашиваются никогда.',
      facts: [
        { k: 'Что это', v: 'Официальная внутренняя валюта Telegram' },
        { k: 'Цена', v: 'от {star} сум за штуку' },
        { k: 'Оплата', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'Что нужно', v: 'только username в Telegram' },
        { k: 'Доставка', v: 'обычно за несколько минут' },
        { k: 'Карта Visa', v: 'не нужна' },
      ],
      sections: [
        {
          h: 'Что такое Telegram Stars?',
          body: [
            'Telegram Stars — официальная внутренняя валюта, введённая Telegram. Она используется для платежей внутри приложения и хранится на балансе пользователя.',
            'Звёздами открывают платный контент в каналах и ботах, отправляют подарки другим пользователям, оплачивают мини-приложения и поддерживают авторов.',
          ],
        },
        {
          h: 'Сколько стоят Telegram Stars в Узбекистане?',
          body: [
            'У сервисов, работающих в сумах, цена 1 Star начинается от {star} сум. Цена зависит от сервиса — в таблице ниже собраны все опубликованные цены.',
            'Официальный путь (App Store, Google Play, Fragment) цену в сумах не публикует: итоговая сумма зависит от комиссии магазина и курса валюты.',
          ],
        },
        {
          h: 'Как купить Telegram Stars?',
          body: [
            'Покупка выполняется в Telegram-боте сервиса. Выбирается нужное количество, вводится username того, кому должны прийти Stars, и производится оплата в сумах.',
            'Вход в аккаунт не требуется — доставка выполняется только по username.',
          ],
        },
        {
          h: 'Безопасно ли покупать Stars?',
          body: [
            'Главное правило одно: **надёжный сервис не спрашивает пароль, SMS-код или пароль 2FA**. Если их просят, цель — не доставка товара, а захват аккаунта.',
            'Цена резко ниже рыночной, отсутствие открытых отзывов и оплата только на личную карту — основные предупреждающие признаки.',
          ],
        },
        {
          h: 'Чем Stars отличаются от Premium?',
          body: [
            'Stars — валюта для разовых платежей: подарки, платные посты, мини-приложения. Premium — подписка на срок, расширяющая возможности приложения.',
            'Они покупаются отдельно и не заменяют друг друга.',
          ],
        },
      ],
      faq: [
        { q: 'Сколько стоит 1 Telegram Star в Узбекистане?', a: 'У сервисов с оплатой в сумах — от {star} сум. Точная цена зависит от количества и сервиса.' },
        { q: 'Нужна ли карта Visa для покупки Stars?', a: 'Нет. Все сравниваемые сервисы принимают UzCard и HUMO, большинство также Click и Payme.' },
        { q: 'Спрашивают ли пароль при покупке Stars?', a: 'Нет, и не должны. Доставка выполняется по username. Запрос пароля или SMS-кода — признак мошенничества.' },
        { q: 'Можно ли отправить Stars другому человеку?', a: 'Да. При покупке вводится username получателя вместо вашего.' },
        { q: 'За сколько минут приходят Stars?', a: 'В зависимости от сервиса — от нескольких секунд до нескольких минут. При задержке проверьте подтверждение оплаты и обратитесь в поддержку с чеком.' },
        { q: 'Истекает ли срок действия Stars?', a: 'Нет. Telegram Stars хранятся на балансе бессрочно, пока не будут потрачены.' },
        { q: 'Можно ли вывести Stars в деньги?', a: 'Для обычного пользователя Stars не выводятся в наличные — они предназначены для платежей внутри приложения.' },
        { q: 'Настоящие ли Stars из локального сервиса?', a: 'Да — сами Stars это одна и та же валюта в системе Telegram. Различается только канал покупки.' },
      ],
      steps: [
        { name: 'Откройте t.me/starsjoybot', text: 'Откройте в Telegram t.me/starsjoybot и нажмите /start.' },
        { name: 'Выберите раздел Stars', text: 'Перейдите в раздел Stars в меню.' },
        { name: 'Укажите количество', text: 'Выберите готовый пакет или введите нужное количество.' },
        { name: 'Введите username', text: 'Указывается username того, кому должны прийти Stars. Пароль не запрашивается.' },
        { name: 'Оплатите', text: 'Оплатите в сумах через UzCard, HUMO, Click или Payme и сохраните чек.' },
        { name: 'Проверьте баланс', text: 'Откройте баланс Stars в настройках Telegram и убедитесь в зачислении.' },
      ],
    },

    'telegram-premium': {
      h1: 'Telegram Premium — цена, тарифы и активация',
      metaTitle: 'Telegram Premium — цена и покупка (Узбекистан, 2026) | Infogram',
      metaDescription:
        'Что даёт Telegram Premium, сколько стоят тарифы на 1/3/6/12 месяцев в Узбекистане и как купить подписку за сумы. Таблица цен и FAQ.',
      answer:
        'Telegram Premium — официальная подписка Telegram. В Узбекистане годовая подписка стоит от {p12} сум, трёхмесячная — от {p3} сум. Оплата картой UzCard, HUMO, через Click или Payme; для активации нужен только username.',
      facts: [
        { k: 'Что это', v: 'Официальная подписка на срок' },
        { k: '12 месяцев', v: 'от {p12} сум' },
        { k: '3 месяца', v: 'от {p3} сум' },
        { k: 'Оплата', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'Что нужно', v: 'только username в Telegram' },
        { k: 'Карта Visa', v: 'не нужна' },
      ],
      sections: [
        {
          h: 'Что даёт Telegram Premium?',
          body: [
            'Premium — официальная подписка Telegram. Она повышает лимит на загрузку файлов, убирает рекламу в официальных каналах, расширяет лимиты чатов и папок.',
            'Дополнительно доступны эксклюзивные эмодзи и стикеры, настройки профиля и ускоренная загрузка.',
          ],
        },
        {
          h: 'Сколько стоит Telegram Premium в Узбекистане?',
          body: [
            'У сервисов с оплатой в сумах годовая подписка начинается от {p12} сум, трёхмесячная — от {p3} сум. Более длинный тариф обычно дешевле в пересчёте на месяц.',
            'В таблице ниже собраны опубликованные цены по всем срокам.',
          ],
        },
        {
          h: 'Как активировать Premium?',
          body: [
            'В боте сервиса выбирается тариф, вводится username владельца подписки и производится оплата в сумах. Активация обычно занимает несколько минут.',
            'Вход в аккаунт, пароль или SMS-код не требуются.',
          ],
        },
        {
          h: 'Можно ли подарить Premium?',
          body: [
            'Да. При покупке достаточно ввести username получателя вместо своего — подписка активируется прямо на его аккаунте.',
          ],
        },
        {
          h: 'Что происходит после окончания подписки?',
          body: [
            'Подписка, купленная через локальный сервис, не продлевается автоматически — это исключает повторные списания. Для продолжения покупается новый тариф.',
          ],
        },
      ],
      faq: [
        { q: 'Сколько стоит Telegram Premium в Узбекистане?', a: 'Годовая подписка — от {p12} сум, трёхмесячная — от {p3} сум. Точная цена зависит от сервиса.' },
        { q: 'Нужна ли карта Visa для Premium?', a: 'Нет. Сравниваемые сервисы принимают UzCard и HUMO.' },
        { q: 'Нужен ли пароль для активации Premium?', a: 'Нет. Активация выполняется по username. Запрос пароля или SMS-кода — признак мошенничества.' },
        { q: 'Можно ли подарить Premium другу?', a: 'Да, достаточно ввести его username при покупке.' },
        { q: 'Какой тариф выгоднее?', a: 'Более длинный срок обычно дешевле в пересчёте на месяц. В таблице можно сравнить цену за месяц по каждому тарифу.' },
        { q: 'Продлевается ли подписка автоматически?', a: 'Подписка через локальный сервис автоматически не продлевается — повторных списаний с карты не будет.' },
        { q: 'Чем Premium отличается от Stars?', a: 'Premium — подписка на срок; Stars — валюта для разовых платежей. Покупаются отдельно.' },
      ],
      steps: [
        { name: 'Откройте t.me/starsjoybot', text: 'Откройте в Telegram t.me/starsjoybot и нажмите /start.' },
        { name: 'Выберите раздел Premium', text: 'Перейдите в раздел Premium в меню.' },
        { name: 'Выберите тариф', text: 'Выберите срок: 1, 3, 6 или 12 месяцев.' },
        { name: 'Введите username', text: 'Указывается username владельца подписки.' },
        { name: 'Оплатите', text: 'Оплатите в сумах через UzCard, HUMO, Click или Payme.' },
        { name: 'Проверьте активацию', text: 'Убедитесь, что в профиле Telegram появился значок Premium.' },
      ],
    },

    'telegram-gifts': {
      h1: 'Telegram Gifts — подарки, цены и коллекционные',
      metaTitle: 'Telegram Gifts — отправка подарков и цены | Infogram',
      metaDescription:
        'Как работают подарки Telegram, как отправить подарок и от чего зависит цена. Связь со Stars, коллекционные подарки и FAQ.',
      answer:
        'Telegram Gifts — виртуальные подарки, отправляемые пользователям. Они покупаются за Stars, поэтому итоговая цена подарка зависит от цены звёзд: 1 Star от {star} сум. Часть подарков имеет коллекционный статус и выпускается ограниченным тиражом.',
      facts: [
        { k: 'Что это', v: 'Виртуальный подарок пользователю' },
        { k: 'За что покупается', v: 'с баланса Stars' },
        { k: 'Цена Stars', v: 'от {star} сум за штуку' },
        { k: 'Что нужно', v: 'username получателя' },
        { k: 'Коллекционные', v: 'часть подарков ограниченным тиражом' },
      ],
      sections: [
        {
          h: 'Как работают Telegram Gifts?',
          body: [
            'Подарок покупается с баланса Stars и отправляется выбранному пользователю. Получатель может оставить его в профиле или обменять обратно на Stars.',
            'Цена подарка задаётся в звёздах — значит итоговая сумма в сумах зависит от цены Stars.',
          ],
        },
        {
          h: 'Что такое коллекционный подарок?',
          body: [
            'Часть подарков выпускается ограниченным тиражом и получает коллекционный статус. Их ценность зависит от тиража и спроса и отличается от обычных подарков.',
          ],
        },
        {
          h: 'Что нужно для отправки подарка?',
          body: [
            'Достаточный баланс Stars и username получателя. Вход в аккаунт или пароль не требуются.',
          ],
        },
      ],
      faq: [
        { q: 'Сколько стоит подарок в Telegram?', a: 'Цена подарка задаётся в Stars. Сумма в сумах считается из цены звёзд — 1 Star от {star} сум.' },
        { q: 'Можно ли отправить подарок анонимно?', a: 'Telegram позволяет не показывать отправителя; это выбирается при покупке.' },
        { q: 'Можно ли обменять подарок обратно на Stars?', a: 'В большинстве случаев получатель может обменять подарок на Stars. Для коллекционных условия отличаются.' },
        { q: 'Нужен ли Premium для отправки подарка?', a: 'Нет, Premium не требуется — достаточно баланса Stars.' },
      ],
      steps: [
        { name: 'Пополните баланс Stars', text: 'Подготовьте баланс Stars, достаточный для стоимости подарка.' },
        { name: 'Выберите подарок', text: 'Выберите подарок из списка в Telegram или боте сервиса.' },
        { name: 'Укажите получателя', text: 'Введите username пользователя, которому отправляется подарок.' },
        { name: 'Отправьте', text: 'Подтвердите — подарок поступит в профиль получателя.' },
      ],
    },
  },

  en: {
    'telegram-stars': {
      h1: 'Telegram Stars — price, buying and safety',
      metaTitle: 'Telegram Stars — price and how to buy (Uzbekistan, 2026) | Infogram',
      metaDescription:
        'What Telegram Stars are, how much they cost in Uzbekistan and how to buy them in UZS. Price table, buying steps, safety rules and FAQ.',
      answer:
        'Telegram Stars is Telegram’s official in-app currency. In Uzbekistan, services accepting UZS price 1 Star from {star} UZS, payable by UzCard, HUMO, Click or Payme. Only a username is needed — a password or SMS code is never requested.',
      facts: [
        { k: 'What it is', v: 'Telegram’s official in-app currency' },
        { k: 'Price', v: 'from {star} UZS per unit' },
        { k: 'Payment', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'What is needed', v: 'a Telegram username only' },
        { k: 'Delivery', v: 'usually within minutes' },
        { k: 'Visa card', v: 'not required' },
      ],
      sections: [
        {
          h: 'What are Telegram Stars?',
          body: [
            'Telegram Stars is the official in-app currency introduced by Telegram. It is used for payments inside the app and held on the user’s balance.',
            'Stars unlock paid content in channels and bots, send gifts to other users, pay inside mini apps and support creators.',
          ],
        },
        {
          h: 'How much do Telegram Stars cost in Uzbekistan?',
          body: [
            'Among services working in UZS, 1 Star starts at {star} UZS. The price varies by service — the table below lists every published price.',
            'The official route (App Store, Google Play, Fragment) publishes no UZS price: the final amount depends on store commission and the exchange rate.',
          ],
        },
        {
          h: 'How do you buy Telegram Stars?',
          body: [
            'The purchase happens in the service’s Telegram bot. You pick the amount, enter the username that should receive the Stars, and pay in UZS.',
            'Account sign-in is not required — delivery runs on the username alone.',
          ],
        },
        {
          h: 'Is buying Stars safe?',
          body: [
            'One rule matters most: **a trustworthy service never asks for a password, SMS code or 2FA password**. If it does, the goal is account takeover, not delivery.',
            'A price far below market, no public reviews and payment only to a personal card are the main warning signs.',
          ],
        },
        {
          h: 'How do Stars differ from Premium?',
          body: [
            'Stars is a currency for one-off payments: gifts, paid posts, mini apps. Premium is a time-based subscription that expands the app’s features.',
            'They are bought separately and do not substitute for each other.',
          ],
        },
      ],
      faq: [
        { q: 'How much does 1 Telegram Star cost in Uzbekistan?', a: 'Among services accepting UZS, from {star} UZS. The exact price depends on the amount and the service.' },
        { q: 'Do I need a Visa card to buy Stars?', a: 'No. Every compared service accepts UzCard and HUMO, and most also accept Click and Payme.' },
        { q: 'Is a password requested when buying Stars?', a: 'No, and it should not be. Delivery runs on the username. A password or SMS-code request is a fraud signal.' },
        { q: 'Can Stars be sent to someone else?', a: 'Yes. Enter the recipient’s username instead of your own at checkout.' },
        { q: 'How fast do Stars arrive?', a: 'From seconds to a few minutes depending on the service. If delayed, confirm the payment went through, then contact support with the receipt.' },
        { q: 'Do Stars expire?', a: 'No. Telegram Stars stay on the balance indefinitely until spent.' },
        { q: 'Can Stars be cashed out?', a: 'For an ordinary user, Stars cannot be converted to cash — they are meant for in-app payments.' },
        { q: 'Are Stars from a local service genuine?', a: 'Yes — Stars themselves are the same currency inside Telegram. Only the purchase channel differs.' },
      ],
      steps: [
        { name: 'Open t.me/starsjoybot', text: 'Open t.me/starsjoybot in Telegram and press /start.' },
        { name: 'Choose the Stars section', text: 'Go to the Stars section in the menu.' },
        { name: 'Set the amount', text: 'Pick a ready-made package or enter the amount you need.' },
        { name: 'Enter the username', text: 'Enter the username that should receive the Stars. No password is requested.' },
        { name: 'Pay', text: 'Pay in UZS via UzCard, HUMO, Click or Payme and keep the receipt.' },
        { name: 'Check the balance', text: 'Open the Stars balance in Telegram settings and confirm it arrived.' },
      ],
    },

    'telegram-premium': {
      h1: 'Telegram Premium — price, plans and activation',
      metaTitle: 'Telegram Premium — price and how to buy (Uzbekistan, 2026) | Infogram',
      metaDescription:
        'What Telegram Premium offers, how much 1/3/6/12-month plans cost in Uzbekistan and how to buy in UZS. Price table and FAQ.',
      answer:
        'Telegram Premium is Telegram’s official subscription. In Uzbekistan a 12-month plan starts at {p12} UZS and a 3-month plan at {p3} UZS. Payment is by UzCard, HUMO, Click or Payme, and activation needs only a username.',
      facts: [
        { k: 'What it is', v: 'Official time-based subscription' },
        { k: '12 months', v: 'from {p12} UZS' },
        { k: '3 months', v: 'from {p3} UZS' },
        { k: 'Payment', v: 'UzCard, HUMO, Click, Payme' },
        { k: 'What is needed', v: 'a Telegram username only' },
        { k: 'Visa card', v: 'not required' },
      ],
      sections: [
        {
          h: 'What does Telegram Premium give you?',
          body: [
            'Premium is Telegram’s official subscription. It raises the file upload limit, removes ads in official channels and expands chat and folder limits.',
            'It also adds exclusive emoji and stickers, profile customisation and faster downloads.',
          ],
        },
        {
          h: 'How much does Telegram Premium cost in Uzbekistan?',
          body: [
            'Among services working in UZS, a 12-month plan starts at {p12} UZS and a 3-month plan at {p3} UZS. Longer plans usually cost less per month.',
            'The table below lists published prices across every duration.',
          ],
        },
        {
          h: 'How is Premium activated?',
          body: [
            'In the service’s bot you choose a plan, enter the subscriber’s username and pay in UZS. Activation usually takes a few minutes.',
            'Account sign-in, a password or an SMS code are not required.',
          ],
        },
        {
          h: 'Can Premium be given as a gift?',
          body: [
            'Yes. Enter the recipient’s username instead of your own at checkout — the subscription activates directly on their account.',
          ],
        },
        {
          h: 'What happens when the subscription ends?',
          body: [
            'A subscription bought through a local service does not auto-renew, which rules out repeat charges. To continue, you buy a new plan.',
          ],
        },
      ],
      faq: [
        { q: 'How much does Telegram Premium cost in Uzbekistan?', a: 'A 12-month plan starts at {p12} UZS and a 3-month plan at {p3} UZS. The exact price depends on the service.' },
        { q: 'Do I need a Visa card for Premium?', a: 'No. The compared services accept UzCard and HUMO.' },
        { q: 'Is a password needed to activate Premium?', a: 'No. Activation runs on the username. A password or SMS-code request is a fraud signal.' },
        { q: 'Can I gift Premium to a friend?', a: 'Yes — just enter their username at checkout.' },
        { q: 'Which plan is better value?', a: 'Longer durations usually cost less per month. The table lets you compare the per-month price of each plan.' },
        { q: 'Does the subscription auto-renew?', a: 'A subscription bought through a local service does not auto-renew — there are no repeat card charges.' },
        { q: 'How does Premium differ from Stars?', a: 'Premium is a time-based subscription; Stars is a currency for one-off payments. They are bought separately.' },
      ],
      steps: [
        { name: 'Open t.me/starsjoybot', text: 'Open t.me/starsjoybot in Telegram and press /start.' },
        { name: 'Choose the Premium section', text: 'Go to the Premium section in the menu.' },
        { name: 'Pick a plan', text: 'Choose a duration: 1, 3, 6 or 12 months.' },
        { name: 'Enter the username', text: 'Enter the username of the subscription owner.' },
        { name: 'Pay', text: 'Pay in UZS via UzCard, HUMO, Click or Payme.' },
        { name: 'Confirm activation', text: 'Check that the Premium badge appears on the Telegram profile.' },
      ],
    },

    'telegram-gifts': {
      h1: 'Telegram Gifts — gifts, prices and collectibles',
      metaTitle: 'Telegram Gifts — sending gifts and prices | Infogram',
      metaDescription:
        'How Telegram gifts work, how to send one and what drives the price. The link to Stars, collectible gifts and FAQ.',
      answer:
        'Telegram Gifts are virtual gifts sent to users. They are bought with Stars, so a gift’s final price follows the Stars price: 1 Star from {star} UZS. Some gifts carry collectible status and are issued in limited runs.',
      facts: [
        { k: 'What it is', v: 'A virtual gift sent to a user' },
        { k: 'Bought with', v: 'a Stars balance' },
        { k: 'Stars price', v: 'from {star} UZS per unit' },
        { k: 'What is needed', v: 'the recipient’s username' },
        { k: 'Collectibles', v: 'some gifts in limited runs' },
      ],
      sections: [
        {
          h: 'How do Telegram Gifts work?',
          body: [
            'A gift is bought from a Stars balance and sent to a chosen user. The recipient can display it on their profile or convert it back to Stars.',
            'Gift prices are set in Stars — so the final UZS amount follows the Stars price.',
          ],
        },
        {
          h: 'What is a collectible gift?',
          body: [
            'Some gifts are issued in limited runs and carry collectible status. Their value depends on the run size and demand, unlike ordinary gifts.',
          ],
        },
        {
          h: 'What do you need to send a gift?',
          body: [
            'A sufficient Stars balance and the recipient’s username. Account sign-in or a password are not required.',
          ],
        },
      ],
      faq: [
        { q: 'How much does a Telegram gift cost?', a: 'Gift prices are set in Stars. The UZS amount follows the Stars price — 1 Star from {star} UZS.' },
        { q: 'Can a gift be sent anonymously?', a: 'Telegram allows hiding the sender; this is chosen at checkout.' },
        { q: 'Can a gift be converted back to Stars?', a: 'In most cases the recipient can convert a gift back to Stars. Terms differ for collectibles.' },
        { q: 'Is Premium needed to send a gift?', a: 'No, Premium is not required — a sufficient Stars balance is enough.' },
      ],
      steps: [
        { name: 'Top up your Stars balance', text: 'Prepare a Stars balance that covers the gift price.' },
        { name: 'Choose a gift', text: 'Pick a gift from the list in Telegram or the service’s bot.' },
        { name: 'Specify the recipient', text: 'Enter the username of the user receiving the gift.' },
        { name: 'Send', text: 'Confirm — the gift lands on the recipient’s profile.' },
      ],
    },
  },
};
