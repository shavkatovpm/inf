/**
 * Maqola bo'limlarining YAGONA ro'yxati.
 *
 * Nima uchun alohida fayl: bo'lim ro'yxati ilgari llms.txt.ts va rss.xml.ts
 * ichida alohida-alohida qotib yozilgan edi. Yangi bo'lim qo'shilganda
 * ulardan birini yangilash unutilsa, bo'lim o'sha faylda jimgina yo'qolardi
 * va build xato ham bermasdi — ya'ni AI uchun eng muhim ikki fayldan
 * (llms.txt va RSS) tushib qolardi.
 *
 * Endi bo'lim qo'shish uchun shu ro'yxatga bitta qator qo'shiladi;
 * content.config.ts dagi kolleksiyalar bilan mosligi kompilyatsiya
 * vaqtida tekshiriladi (pastdagi izohga qarang).
 */
export const CONTENT_SECTIONS = ['taqqoslash', 'xavfsizlik', 'qollanma'] as const;

export type ContentSection = (typeof CONTENT_SECTIONS)[number];
