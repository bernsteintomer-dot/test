export const site = {
  name: "פורמולה תשתיות",
  nameEn: "Formula Infrastructure",
  tagline: "Building the foundation of tomorrow",
  taglineHe: "בונים את התשתית של מחר",
  parent: { name: "פורמולה מערכות", nameEn: "Formula Systems", url: "https://formulasystems.com/" },
  contact: {
    email: "info@formulainfra.co.il",
    phone: "03-9348883",
    address: "נחשון 9, אזור התעשייה סגולה, פתח תקווה",
  },
};

export type Pillar = {
  slug: string;
  num: string;
  title: string;
  titleEn: string;
  short: string;
  body: string;
  companies: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "information",
    num: "01",
    title: "מידע וטכנולוגיה",
    titleEn: "Information & Technology",
    short: "איסוף, עיבוד וניהול של מידע הנדסי וגאו־מרחבי.",
    body:
      "כל פרויקט תשתית מתחיל במידע. אנחנו אוספים אותו מהאוויר, מהקרקע ומהשטח — צילומי אוויר, סריקות LiDAR, מדידות גאודטיות וסקרי מצב תשתית — ומעבדים אותו לשכבות מידע שעליהן אפשר לתכנן, לנהל ולבצע.",
    companies: ["ofek", "yona", "geopoint"],
  },
  {
    slug: "engineering",
    num: "02",
    title: "ייזום, תכנון הנדסי ובקרת איכות",
    titleEn: "Engineering Design & Quality Control",
    short: "תכנון, ייעוץ, ניהול פרויקטים ופיקוח לאורך כל חיי הפרויקט.",
    body:
      "מהמידע לתוכנית. תכנון הנדסי של מערכות חשמל, תאורה, תקשורת ובקרה, לצד ניהול פרויקטים, ניהול מכרזים, בקרת ואבטחת איכות ופיקוח צמוד — בפרויקטי תחבורה, תעשייה, אנרגיה ובנייה מורכבת.",
    companies: ["advance", "barhom"],
  },
  {
    slug: "execution",
    num: "03",
    title: "ביצוע ואינטגרציית מערכות",
    titleEn: "Execution & Systems Integration",
    short: "פריסה והתקנה בשטח של מערכות תשתית וטכנולוגיה.",
    body:
      "מהתוכנית לשטח. פריסת סיבים אופטיים, קידוח אופקי מכוון, חדרי תקשורת, מערכות ביטחון ובקרה, כריזה וחירום ומולטימדיה — כולל שירות ותחזוקה ארצית לאורך חיי המערכת.",
    companies: ["shamrad", "hashachar", "mlbs"],
  },
];

export type Company = {
  slug: string;
  name: string;
  nameEn: string;
  pillar: string;
  lead: string;
  capabilities: string[];
  url?: string;
  parentSlug?: string;
  projects?: string[];
};

export const companies: Company[] = [
  {
    slug: "ofek",
    name: "אופק צילומי אוויר",
    nameEn: "Ofek Aerial Photography",
    pillar: "information",
    url: "https://ofek-air.com/",
    lead:
      "חברת טכנולוגיה גאו־מרחבית מובילה, המתמחה באיסוף וניתוח מידע מרחבי באמצעות צילום אווירי, LiDAR ומערכות מיפוי מתקדמות עבור תכנון, תשתיות ויישומים סביבתיים.",
    capabilities: [
      "צילומי אוויר, סריקת LiDAR והפקת אורתופוטו",
      "מיפוי גאו־מרחבי וניתוח נתוני GIS",
      "מודלים תלת־ממדיים ופיתוח תאום דיגיטלי עירוני",
      "מיפוי נייד וסקרי תשתיות",
      "פיתוח מאגרי מידע גאו־מרחביים ומוצרי מידע מרחבי",
    ],
  },
  {
    slug: "yona",
    name: "יונה ניהול הנדסה וייעוץ",
    nameEn: "Yona Engineering Management & Consulting",
    pillar: "information",
    parentSlug: "ofek",
    url: "http://yonaltd.com/index_he.html",
    lead:
      "חברת ייעוץ הנדסי המתמחה בניהול ופיקוח על פרויקטי תשתיות תחבורה, לצד איסוף וניתוח נתוני תשתית.",
    capabilities: [
      "פיקוח על עבודות ריבוד וכרסום כבישים",
      "איסוף וניתוח נתוני מצב תשתית",
      "ניהול תחזוקת כבישים מהירים",
      "איסוף נתוני שטח ותיעוד תשתיות",
      "ניהול פרויקטים עבור רשויות תחבורה וגופי תשתית ציבוריים",
    ],
  },
  {
    slug: "geopoint",
    name: "גיאופויינט",
    nameEn: "Geopoint",
    pillar: "information",
    parentSlug: "ofek",
    url: "https://geopoint.me/",
    lead:
      "חברת הנדסה ומדידות גאו־מרחבית המתמחה במדידות קרקע, קדסטר ורישום מקרקעין, GIS ושירותי מיפוי לפרויקטי תשתית, בנייה ותכנון עירוני.",
    capabilities: [
      "מדידות גאודטיות והנדסיות לתשתיות ובנייה",
      "קדסטר ורישום מקרקעין — מיפוי חלקות ותשריטי חלוקה",
      "סריקת לייזר ומודלים תלת־ממדיים",
      "ניהול נתוני GIS וניתוח מרחבי",
      "פיתוח כלים דיגיטליים לניהול מדידות ומידע גאו־מרחבי",
    ],
  },
  {
    slug: "advance",
    name: "אדוונס הנדסה",
    nameEn: "Advance Engineering",
    pillar: "engineering",
    url: "https://www.advance-eng.net/",
    lead:
      "חברת הנדסה המתמחה בניהול פרויקטים, פיקוח ואבטחת איכות בפרויקטי תשתית, תעשייה ואנרגיה בקנה מידה גדול.",
    capabilities: [
      "ניהול פרויקטים, אבטחת ובקרת איכות (QA/QC)",
      "פיקוח על הקמת מפעלי תעשייה ומתקני אנרגיה",
      "ליווי פרויקטי תחבורה ומנהור",
      "בקרת תכנון, ניהול מכרזים וניהול לוחות זמנים",
      "ייעוץ הנדסי, חוות דעת מומחה וליווי בהליכי מחלוקת",
    ],
    projects: ["צנרת מי ים ותמלחות", "מסוף מכולות HTC בנמל אשדוד", "תחנת שאיבה בים המלח"],
  },
  {
    slug: "barhom",
    name: "דוד ברהום מהנדסים ויועצים",
    nameEn: "David Barhom Engineers & Consultants",
    pillar: "engineering",
    url: "https://barhom.co.il/",
    lead:
      "משרד תכנון הנדסי המתמחה בתכנון מערכות חשמל, תאורה, תקשורת ובקרה לפרויקטי תשתית, תחבורה ומבנים מורכבים.",
    capabilities: [
      "תכנון מערכות חשמל, תאורה ותקשורת",
      "תכנון תשתיות למנהרות, כבישים ומערכות רכבת",
      "תכנון תשתיות לשכונות מגורים ולערים חכמות",
      "מערכות חשמל ותקשורת למבני ציבור ומסחר",
      "תכנון תשתיות טעינה לרכב ולאוטובוסים חשמליים",
    ],
    projects: ["תחנת רכבת אלעד", "פארק גלישה תל אביב", "עמדות טעינה"],
  },
  {
    slug: "shamrad",
    name: "שמרד אלקטרוניקה",
    nameEn: "Shamrad Electronics",
    pillar: "execution",
    url: "https://www.shamrad.co.il/",
    lead:
      "חברת אינטגרציה טכנולוגית המתמחה בתכנון, פריסה ותחזוקה של מערכות ביטחון, תקשורת ובקרה עבור גופים ציבוריים וארגונים.",
    capabilities: [
      "מערכות ביטחון ובקרה — טמ״ס, בקרת כניסה, שליטה ובקרה",
      "תשתיות מחשוב ותקשורת וחדרי שרתים",
      "מערכות כריזה וצופרי חירום",
      "מולטימדיה ופתרונות תצוגה מתקדמים",
      "שירות טכני, תחזוקה ותמיכה הנדסית ארצית",
    ],
  },
  {
    slug: "hashachar",
    name: "השחר טלקום וחשמל",
    nameEn: "Hashachar Telecom & Electricity",
    pillar: "execution",
    lead:
      "חברת תשתיות תקשורת המתמחה בתכנון, פריסה ותחזוקה של רשתות סיבים אופטיים ותקשורת עבור מפעילי תקשורת ופרויקטי תשתית. החברה הרחיבה את יכולותיה ברכישת א.א. תקשורת, וחיזקה את יכולת הביצוע שלה בפריסות סיבים בקנה מידה גדול.",
    capabilities: [
      "פריסת תשתיות סיבים אופטיים (Street Pass)",
      "התקנת תשתיות תקשורת בתוך מבנים (Home Pass)",
      "הקמת חדרי תקשורת ותשתיות תקשורת ארגוניות",
      "עבודות תשתיות תקשורת בפרויקטי תשתית גדולים",
      "פריסה, תחזוקה ושירות ארצי",
    ],
  },
  {
    slug: "mlbs",
    name: "מ.ל.ב.ס טכנולוגיות",
    nameEn: "M.L.B.S Technologies",
    pillar: "execution",
    lead:
      "קבלן המתמחה בעבודות תשתית תת־קרקעיות מורכבות, עם מומחיות בקידוח אופקי מכוון (HDD) והתקנת תשתיות תקשורת ותשתיות עירוניות.",
    capabilities: [
      "קידוח אופקי מכוון (HDD) לתשתיות תת־קרקעיות",
      "התקנת תשתיות תקשורת, חשמל, מים וביוב",
      "הסטת תשתיות תוך שמירה על רציפות שירות",
      "ביצוע פרויקטים בסביבה עירונית צפופה",
      "פרויקטים עבור מפעילי תקשורת ורשויות תשתית לאומיות",
    ],
  },
];

export const companyBySlug = (slug: string) => companies.find((c) => c.slug === slug);
export const pillarBySlug = (slug: string) => pillars.find((p) => p.slug === slug);
export const companiesOfPillar = (slug: string) => companies.filter((c) => c.pillar === slug);

export const lifecycle = [
  {
    step: "01",
    label: "סקירה ומדידה",
    company: "אופק · גיאופויינט",
    body: "צילום אווירי, סריקת LiDAR ומדידות גאודטיות מייצרים את מודל הבסיס של השטח.",
  },
  {
    step: "02",
    label: "תכנון הנדסי",
    company: "דוד ברהום",
    body: "על גבי המודל מתוכננות מערכות החשמל, התאורה, התקשורת והבקרה.",
  },
  {
    step: "03",
    label: "ניהול ובקרת איכות",
    company: "אדוונס · יונה",
    body: "ניהול הפרויקט, ניהול המכרז, בקרת התכנון ופיקוח צמוד לאורך הביצוע.",
  },
  {
    step: "04",
    label: "ביצוע בשטח",
    company: "שמרד · השחר · מ.ל.ב.ס",
    body: "קידוח, פריסת סיבים, הקמת חדרי תקשורת והתקנת מערכות הביטחון והבקרה.",
  },
  {
    step: "05",
    label: "שירות ותחזוקה",
    company: "שמרד · השחר",
    body: "תחזוקה, שירות ותמיכה הנדסית ארצית לאורך כל חיי המערכת.",
  },
];

export const stats = [
  { value: 8, label: "חברות בקבוצה", suffix: "" },
  { value: 3, label: "עוגני פעילות", suffix: "" },
  { value: 1, label: "מחזור חיים שלם", suffix: "" },
];

export const nav = [
  { href: "/about", label: "אודות" },
  { href: "/pillars", label: "תחומי פעילות" },
  { href: "/companies", label: "חברות הקבוצה" },
  { href: "/capabilities", label: "יכולות" },
  { href: "/projects", label: "פרויקטים" },
  { href: "/careers", label: "קריירה" },
  { href: "/contact", label: "צור קשר" },
];

export type Project = {
  slug: string;
  name: string;
  client?: string;
  sector: string;
  companies: string[];
  body: string;
};

export const projects: Project[] = [
  {
    slug: "elad-train-station",
    name: "תחנת רכבת אלעד",
    sector: "תחבורה",
    companies: ["barhom"],
    body:
      "תכנון מערכות החשמל, התאורה, התקשורת והבקרה של תחנת הרכבת, כולל תשתיות הזנה ומערכות בטיחות.",
  },
  {
    slug: "ashdod-htc",
    name: "מסוף מכולות HTC, נמל אשדוד",
    sector: "נמלים ותשתיות ימיות",
    companies: ["advance"],
    body:
      "ניהול פרויקט, פיקוח ובקרת איכות בהקמת מסוף מכולות בנמל אשדוד — סביבה תפעולית פעילה בעלת דרישות בטיחות מחמירות.",
  },
  {
    slug: "dead-sea-pumping",
    name: "תחנת שאיבה בים המלח",
    sector: "אנרגיה ותעשייה",
    companies: ["advance"],
    body:
      "ליווי הנדסי, פיקוח ובקרת איכות בהקמת תחנת שאיבה בסביבה כימית קורוזיבית במיוחד.",
  },
  {
    slug: "seawater-brine-pipelines",
    name: "צנרת מי ים ותמלחות",
    sector: "אנרגיה ותעשייה",
    companies: ["advance"],
    body:
      "ניהול ופיקוח על הקמת מערכות צנרת להולכת מי ים ותמלחות, כולל בקרת איכות על חומרים וריתוכים.",
  },
  {
    slug: "ev-charging",
    name: "תשתיות טעינה לרכב ולאוטובוסים חשמליים",
    sector: "אנרגיה ותחבורה",
    companies: ["barhom"],
    body:
      "תכנון תשתיות ההזנה והבקרה לעמדות טעינה, כולל התאמת התשתית לעומסי הספק גבוהים בסביבה עירונית.",
  },
  {
    slug: "surf-park-tlv",
    name: "פארק גלישה תל אביב",
    sector: "מבני ציבור ופנאי",
    companies: ["barhom"],
    body:
      "תכנון מערכות החשמל, התאורה והבקרה של המתחם, כולל מערכות ההפעלה של בריכת הגלים.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
