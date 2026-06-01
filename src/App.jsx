import React, { useState, useEffect, useRef } from 'react';

const BRAND = 'negishot';

/* פיסקה: כל משפט בשורה נפרדת (אחרי . ? !) */
function Para({ text, className }) {
  const parts = String(text).split(/(?<=[.?!])\s+/).filter(Boolean);
  return (
    <p className={className}>
      {parts.map((s, i) => <span className="ln" key={i}>{s}</span>)}
    </p>
  );
}

function LogoMark({ s = 36 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" className="logo-mark" aria-hidden="true">
      <defs>
        <linearGradient id="ngsg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b50e0" />
          <stop offset="1" stopColor="#10b6a6" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#ngsg)" />
      <circle cx="24" cy="14.5" r="3.7" fill="#fff" />
      <path d="M12.5 21c7.5 3.2 15.5 3.2 23 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M24 20.5V28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 28l-5.4 8.4M24 28l5.4 8.4" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function Logo() {
  return <span className="logo"><LogoMark /><span className="logo-txt">{BRAND}</span></span>;
}

const Mail = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 5.5L20 7" /></svg>
);
const Check = ({ w = 16 }) => (
  <svg viewBox="0 0 24 24" width={w} height={w} fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
);
const I = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

const IC = {
  size:    <><path d="M4 8h7M7.5 8v9" /><path d="M14 12h5M16.5 12v5" /></>,
  lines:   <><path d="M5 7h14M5 12h14M5 17h9" /></>,
  align:   <><path d="M4 6h16M9 12h11M4 18h16" /></>,
  font:    <><path d="M6 18L11 6l5 12M7.6 14h7" /></>,
  contrast:<><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" /></>,
  color:   <><circle cx="12" cy="12" r="8" /><path d="M9 12a3 3 0 0 1 6 0" /></>,
  link:    <><path d="M10.5 13a3 3 0 0 0 4 .3l2-2a3 3 0 0 0-4-4l-1 1" /><path d="M13.5 11a3 3 0 0 0-4-.3l-2 2a3 3 0 0 0 4 4l1-1" /></>,
  mask:    <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></>,
  focus:   <><path d="M4 8V5h3M17 4h3v3M20 16v3h-3M7 20H4v-3" /></>,
  cursor:  <><path d="M5 3l6 15 2.2-6.2L19.5 9.5z" fill="currentColor" stroke="none" /></>,
  imgoff:  <><path d="M3 3l18 18" /><path d="M20 16V6a2 2 0 0 0-2-2H8" /><path d="M4 8v10a2 2 0 0 0 2 2h10" /></>,
  pause:   <><path d="M9 5v14M15 5v14" /></>,
  struct:  <><circle cx="4.2" cy="6" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.2" cy="12" r="1.2" fill="currentColor" stroke="none" /><circle cx="4.2" cy="18" r="1.2" fill="currentColor" stroke="none" /><path d="M8 6h12M8 12h10M8 18h7" /></>,
  speak:   <><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5" /></>,
};

const TXT = [['גודל טקסט', 'size'], ['גובה שורה', 'lines'], ['מרווח אותיות', 'lines'], ['מרווח מילים', 'lines'], ['יישור טקסט', 'align'], ['גופן קריא', 'font']];
const VIS = [['ניגודיות', 'contrast'], ['גווני צבע', 'color'], ['הסתרת תמונות', 'imgoff'], ['השהיית אנימציות', 'pause']];
const NAVT = [['הדגשת קישורים', 'link'], ['מסכת קריאה', 'mask'], ['מסגרת מיקוד', 'focus'], ['סמן עכבר גדול', 'cursor'], ['מבנה עמוד', 'struct'], ['הקראת טקסט', 'speak']];
const ALL = [...TXT, ...VIS, ...NAVT];

const STEPS = [
  { n: '01', t: 'מוסיפים שורת סקריפט', d: 'מעתיקים שורת קוד אחת ומדביקים אותה לאתר. עובד בכל פלטפורמה גם בלי React.' },
  { n: '02', t: 'הכפתור עולה באתר', d: 'כפתור נגישות צף מופיע בכל עמוד. אפשר לקבוע צבע מיקום וגודל בהתאמה אישית.' },
  { n: '03', t: 'המבקרים מתאימים לעצמם', d: 'כל מבקר פותח את הפאנל ובוחר כלים. ההעדפות נשמרות אוטומטית גם לעמוד הבא.' },
];

const FACTS = [
  ['בהתאם לת"י 5568', 'מבוסס על הנחיות WCAG 2.0 ו 2.1 ברמה AA.'],
  ['נגיש למקלדת', 'כל הכלים נפתחים ונשלטים במקלדת מלאה.'],
  ['עברית ו RTL', 'נבנה מהיסוד לעברית ולכיוון ימין לשמאל.'],
  ['שמירה אוטומטית', 'ההעדפות נשמרות בדפדפן ונשארות בין ביקורים.'],
  ['קל משקל', 'ללא תלויות חיצוניות. כמעט לא משפיע על מהירות האתר.'],
  ['עדכון מרכזי', 'שיפור אחד מגיע לכל האתרים יחד.'],
];

const PLANS = [
  { name: 'חינם', price: '0', per: 'לתמיד', desc: 'מתאים לאתר קטן או להתנסות. מתחילים בלי התחייבות.', feats: ['כל 16 כלי ההנגשה', 'שמירת העדפות אוטומטית', 'עדכונים אוטומטיים', 'התקנה בשורה אחת'], cta: 'התחלה חינם', kind: 'free' },
  { name: 'עסקי', price: '299', per: 'לשנה', desc: 'מתאים לרוב האתרים העסקיים. כל היכולות בלי הגבלה.', feats: ['כל מה שבחינם', 'שינוי צבע מיקום וגודל', 'הסתרת המיתוג בתחתית', 'תמיכה מלאה בעברית'], cta: 'בחירת חבילה', kind: 'pop' },
  { name: 'Enterprise', price: 'מותאם', per: 'אישית', desc: 'לרשתות ולארגונים עם כמה אתרים. דרישות מיוחדות בהתאמה.', feats: ['כל מה שבעסקי', 'התקנה על אתרים מרובים', 'התאמות מיוחדות', 'ליווי בהטמעה'], cta: 'דברו איתנו', kind: 'ent' },
];

const FAQ = [
  { q: 'האם negishot מבטיח עמידה מלאה בתקן הנגישות?', a: 'negishot הוא כלי עזר חזק לשיפור חוויית הנגישות. עמידה מלאה בתקן דורשת גם קוד תקין הצהרת נגישות ובדיקה ידנית.' },
  { q: 'כמה זמן לוקחת ההתקנה?', a: 'בערך חמש דקות. מוסיפים שורת סקריפט אחת לאתר. הכפתור מופיע מיד.' },
  { q: 'האם זה עובד על כל אתר?', a: 'כן. הסקריפט עובד בכל אתר גם בלי React. אפשר להטמיע בכל פלטפורמה שמאפשרת הוספת קוד.' },
  { q: 'האם יש תמיכה בעברית?', a: 'בהחלט. הכלי נבנה מההתחלה לעברית ולכיוון ימין לשמאל.' },
  { q: 'אפשר לשנות צבע מיקום וגודל?', a: 'כן. קובעים צבע מיקום גודל צורה ולוגו דרך מאפיינים פשוטים בשורת הסקריפט.' },
  { q: 'ההעדפות נשמרות בין עמודים?', a: 'כן. הבחירות של כל מבקר נשמרות בדפדפן ונשארות גם בעמוד הבא ובביקור הבא.' },
  { q: 'איך מסתירים או מסירים את הכפתור?', a: 'כל מבקר יכול להסתיר את הכפתור לשעות או לצמיתות. תמיד אפשר להחזיר אותו עם Alt+Shift+A. להסרה מלאה מורידים את שורת הסקריפט.' },
];

const MSG = {
  nav:  { t: 'נעים שבאתם', m: 'באתם לבחור חבילה ועוד לא בטוחים איזו, נשמח לעזור לכם להחליט. השאירו מייל ונחזור אליכם בהקדם.' },
  hero: { t: 'יאללה מתחילים', m: 'נראה שבאתם להנגיש את האתר, אנחנו כאן בדיוק בשביל זה. השאירו מייל ונחזור אליכם עם כל מה שצריך.' },
  free: { t: 'מתחילים בחינם', m: 'כיף שבאתם להתחיל, החבילה החינמית מושלמת להתנסות בלי התחייבות. השאירו מייל ונלווה אתכם בהתקנה.' },
  pop:  { t: 'בחירה מצוינת', m: 'אני רואה שבאתם לבחור חבילה, החבילה העסקית היא בחירה מעולה לרוב האתרים. השאירו מייל ונחזור אליכם עם כל הפרטים.' },
  ent:  { t: 'בואו נדבר', m: 'אתם נשמעים כמו אתר גדול, חבילת Enterprise נתפרת בדיוק למידות שלכם. השאירו מייל ונחזור אליכם להתאמה אישית.' },
};

const ABOUT = {
  title: 'אודות negishot',
  lead: 'negishot הוא פאנל נגישות צף לאתרים. המטרה שלנו פשוטה. אנחנו רוצים שכל אדם יוכל להשתמש בכל אתר בנוחות.',
  blocks: [
    { h: 'מה אנחנו עושים', p: ['הפאנל מציע למבקרים שישה עשר כלים להתאמת הטקסט הצבע והניווט. הכל נפתח בלחיצה אחת על כפתור קבוע בפינת המסך. ההעדפות של כל מבקר נשמרות בין העמודים.'] },
    { h: 'איך זה בנוי', p: ['הכלי נבנה בהתאם לתקן הישראלי ת"י 5568 ברמה AA. יש תמיכה מלאה בעברית ובכיוון ימין לשמאל. ההתקנה היא שורת קוד אחת והכלי מתעדכן באופן מרכזי לכל האתרים יחד.'] },
    { h: 'בכנות מלאה', p: ['negishot מסייע לשפר את חוויית הנגישות אך אינו תחליף לבנייה נגישה של האתר עצמו. עמידה מלאה בתקן דורשת גם קוד תקין הצהרת נגישות ובדיקה ידנית.'] },
  ],
  updated: '',
};

const ACCESS = {
  title: 'הצהרת נגישות',
  lead: 'אנחנו ב negishot רואים חשיבות רבה בהנגשת השירות לכלל הציבור. אנו פועלים כדי שהאתר יעמוד בהוראות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013 ובתקן הישראלי ת"י 5568 ברמה AA.',
  blocks: [
    { h: 'רמת הנגישות באתר', p: ['האתר הונגש לרמה AA בהתאם לתקן הישראלי 5568 שמבוסס על הנחיות WCAG 2.0 ו 2.1.'] },
    { h: 'מה נעשה באתר', p: ['בנינו מבנה כותרות תקין וסדר הגיוני של תוכן. כל הפעולות נגישות לניווט מלא במקלדת. הוספנו סימון מיקוד ברור לכל רכיב פעיל. שמרנו על ניגודיות צבעים תקינה. התוכן נתמך בקוראי מסך נפוצים. האתר בנוי לעברית ולכיוון ימין לשמאל.'] },
    { h: 'כלי הנגישות בעמוד', p: ['בכל עמוד מופיע פאנל negishot. הוא מאפשר להגדיל טקסט לשנות ניגודיות וצבע להדגיש קישורים להפעיל מסכת קריאה וסמן גדול ועוד. ההעדפות נשמרות בין העמודים.'] },
    { h: 'נתקלתם בבעיה', p: ['אנו ממשיכים לשפר את הנגישות כל הזמן. אם מצאתם רכיב שאינו נגיש או שיש לכם הצעה נשמח שתפנו אלינו. נשתדל לתת מענה ולתקן בהקדם.'] },
    { h: 'דרכי פנייה בנושא נגישות', p: ['אחראי נגישות מטעם negishot. דואר אלקטרוני eladshi1326@gmail.com.'] },
  ],
  updated: 'ההצהרה עודכנה ביוני 2026.',
};

const PRIVACY = {
  title: 'מדיניות פרטיות',
  lead: 'הפרטיות שלכם חשובה לנו. מדיניות זו מסבירה איזה מידע נאסף באתר וכיצד אנו עושים בו שימוש. המדיניות נכתבה ברוח חוק הגנת הפרטיות (התשמ"א 1981) ותיקון 13 לחוק שנכנס לתוקף באוגוסט 2025.',
  blocks: [
    { h: 'איזה מידע נאסף', p: ['כאשר אתם משאירים כתובת מייל בטופס באתר אנו שומרים אותה כדי לחזור אליכם. בנוסף נאסף מידע טכני בסיסי כמו סוג הדפדפן וכתובת IP לצורך תפעול האתר ואבטחתו.'] },
    { h: 'מטרת השימוש', p: ['אנו משתמשים במידע כדי ליצור קשר בנוגע לשירות לספק מענה ולשפר את האתר. איננו עושים במידע שימוש אחר ללא הסכמתכם.'] },
    { h: 'שמירה ואבטחה', p: ['אנו נוקטים אמצעים סבירים לאבטחת המידע מפני גישה לא מורשית. בהתאם לתיקון 13 במקרה של אירוע אבטחה חמור נפעל לדווח לרשות להגנת הפרטיות כנדרש בחוק.'] },
    { h: 'מסירת מידע לצד שלישי', p: ['איננו מוכרים את המידע ואיננו מעבירים אותו לצד שלישי. חריג לכך הוא ספק שירות שמסייע בתפעול האתר או דרישה חוקית של רשות מוסמכת.'] },
    { h: 'הזכויות שלכם', p: ['על פי החוק עומדות לכם הזכויות הבאות.'], list: ['לעיין במידע שנשמר עליכם', 'לבקש לתקן מידע שגוי', 'לבקש למחוק את המידע'], after: ['למימוש כל זכות אפשר לפנות אלינו בדואר אלקטרוני.'] },
    { h: 'עוגיות', p: ['האתר עשוי לעשות שימוש בעוגיות לצורך תפעול ושמירת העדפות נגישות. אפשר לחסום עוגיות דרך הגדרות הדפדפן.'] },
    { h: 'שינויים במדיניות', p: ['אנו רשאים לעדכן מדיניות זו מעת לעת. נוסח מעודכן יפורסם בעמוד זה.'] },
    { h: 'יצירת קשר', p: ['בכל שאלה בנושא פרטיות אפשר לפנות בדואר אלקטרוני eladshi1326@gmail.com.'] },
  ],
  updated: 'המדיניות עודכנה ביוני 2026.',
};

function Frow({ tag, title, text, chips, visual, idx }) {
  return (
    <div className="frow reveal" data-reveal style={{ transitionDelay: (idx * 60) + 'ms' }}>
      <div className="frow-text">
        <span className="tag">{tag}</span>
        <h3>{title}</h3>
        <Para className="muted big" text={text} />
        <div className="chips">{chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      </div>
      <div className="frow-visual">{visual}</div>
    </div>
  );
}

function LegalPage({ data, goHome }) {
  return (
    <section className="sec legal-sec">
      <div className="wrap narrow legal">
        <h1 className="legal-h1">{data.title}</h1>
        {data.lead && <Para className="legal-lead" text={data.lead} />}
        {data.blocks.map((b, i) => (
          <div className="legal-block" key={i}>
            {b.h && <h2>{b.h}</h2>}
            {b.p.map((para, j) => <Para key={j} text={para} />)}
            {b.list && <ul className="legal-list">{b.list.map((x) => <li key={x}>{x}</li>)}</ul>}
            {b.after && b.after.map((para, j) => <Para key={'a' + j} text={para} />)}
          </div>
        ))}
        {data.updated && <p className="legal-updated">{data.updated}</p>}
        <div className="legal-back"><button className="btn btn-outline pill" onClick={goHome}>חזרה לעמוד הבית</button></div>
      </div>
    </section>
  );
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [open, setOpen] = useState(0);
  const [modal, setModal] = useState(null);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingRef = useRef(null);
  const modalRef = useRef(null);
  const lastFocus = useRef(null);

  const openModal = (key) => { setSent(false); setEmail(''); setModal({ key: key || 'nav' }); };
  const closeModal = () => setModal(null);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const go = (r) => { setMenuOpen(false); setRoute(r); };
  const goHome = () => { setMenuOpen(false); pendingRef.current = null; setRoute('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navTo = (id) => {
    setMenuOpen(false);
    if (route === 'home') { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    else { pendingRef.current = id; setRoute('home'); }
  };

  useEffect(() => {
    if (route === 'home') {
      if (pendingRef.current) {
        const id = pendingRef.current; pendingRef.current = null;
        requestAnimationFrame(() => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); });
      }
    } else { window.scrollTo(0, 0); }
  }, [route]);

  useEffect(() => {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -30% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    const revealBottom = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => { el.classList.add('in'); io.unobserve(el); });
      }
    };
    window.addEventListener('scroll', revealBottom, { passive: true });
    window.addEventListener('resize', revealBottom);
    return () => { io.disconnect(); window.removeEventListener('scroll', revealBottom); window.removeEventListener('resize', revealBottom); };
  }, [route]);

  useEffect(() => {
    if (!modal) return;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const node = modalRef.current;
    const f = () => Array.from(node.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.disabled && el.offsetParent !== null);
    const first = (node && (node.querySelector('input') || node.querySelector('button')));
    if (first) first.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'Tab') {
        const els = f(); if (!els.length) return;
        const i = els.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); els[els.length - 1].focus(); }
        else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [modal]);

  useEffect(() => {
    if (modal && modalRef.current) {
      const el = modalRef.current.querySelector('input, button');
      if (el) el.focus();
    }
  }, [sent]);

  const msg = modal ? (MSG[modal.key] || MSG.nav) : null;

  return (
    <div className="page">
      <a className="skip" href="#main">דלג לתוכן</a>

      <header className="nav">
        <div className="nav-in">
          <button className="brand" onClick={goHome} aria-label="negishot, מעבר לעמוד הבית"><Logo /></button>
          <nav className={'nav-links' + (menuOpen ? ' open' : '')} aria-label="ניווט ראשי">
            <button onClick={() => navTo('features')}>יכולות</button>
            <button onClick={() => navTo('tools')}>הכלים</button>
            <button onClick={() => navTo('how')}>איך זה עובד</button>
            <button onClick={() => navTo('plans')}>חבילות</button>
            <button onClick={() => navTo('faq')}>שאלות נפוצות</button>
            <button className="btn btn-primary pill menu-cta" onClick={() => { setMenuOpen(false); openModal('nav'); }}>בחירת חבילה</button>
          </nav>
          <button className="btn btn-primary pill header-cta" onClick={() => openModal('nav')}>בחירת חבילה</button>
          <button className="nav-burger" aria-label="תפריט" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">{menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {route === 'about' && <LegalPage data={ABOUT} goHome={goHome} />}
        {route === 'accessibility' && <LegalPage data={ACCESS} goHome={goHome} />}
        {route === 'privacy' && <LegalPage data={PRIVACY} goHome={goHome} />}

        {route === 'home' && (
          <>
            <section className="hero">
              <div className="hero-grid">
                <div className="hero-text reveal-load">
                  <span className="pill-badge"><span className="pulse" />תוסף נגישות בהתאם לת"י 5568</span>
                  <h1>הופכים כל אתר<br />לנגיש יותר,<br /><span className="accent">בקלות.</span></h1>
                  <Para className="sub" text="פאנל נגישות צף שמופיע בכל עמוד באתר. כל מבקר מתאים לעצמו את הטקסט את הצבע ואת הניווט. ההעדפות נשמרות אוטומטית בין עמודים. ההתקנה היא שורת קוד אחת." />
                  <div className="hero-cta">
                    <button className="btn btn-primary pill" onClick={() => openModal('hero')}>בחירת חבילה</button>
                    <button className="btn btn-outline pill" onClick={() => navTo('how')}>איך זה עובד</button>
                  </div>
                  <div className="stats">
                    <div><strong>5 דקות</strong><span>זמן התקנה</span></div>
                    <div><strong>16 כלים</strong><span>בפאנל אחד</span></div>
                    <div><strong>שורה אחת</strong><span>להטמעה באתר</span></div>
                  </div>
                </div>
                <div className="hero-mock reveal-load delay">
                  <div className="mock">
                    <div className="mock-bar"><span className="dot r" /><span className="dot y" /><span className="dot g" /><span className="mock-url">yoursite.co.il</span></div>
                    <div className="mock-tools">
                      {ALL.map(([t, ic], i) => (
                        <div className="mtile" key={t} style={{ animationDelay: (i * 35) + 'ms' }}><span className="mtile-ic"><I d={IC[ic]} /></span><span>{t}</span></div>
                      ))}
                    </div>
                    <div className="mock-fabs"><span className="fab esc">ESC</span><span className="fab main"><LogoMark s={24} /><span className="fab-ok" /></span></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="sec" id="features">
              <div className="wrap center reveal" data-reveal>
                <span className="tag">יכולות</span>
                <h2 className="h2"><span className="ln">כל מה שצריך כדי להנגיש.</span><span className="ln">בפאנל אחד פשוט.</span></h2>
              </div>
              <div className="wrap frows">
                <Frow idx={0} tag="טקסט" title="טקסט שמתאים לכל קורא"
                  text="מגדילים את הטקסט בחמש רמות. פותחים את גובה השורה ואת המרווח בין האותיות והמילים. בוחרים יישור לימין למרכז או לשמאל. מפעילים גופן קריא שמקל על קוראים עם דיסלקציה."
                  chips={['גודל טקסט', 'גובה שורה', 'מרווח אותיות ומילים', 'יישור טקסט', 'גופן קריא']}
                  visual={(
                    <div className="demo demo-txt">
                      <div className="d-row"><span className="d-lab">גודל טקסט</span><span className="d-aa"><b className="s1">א</b><b className="s2">א</b><b className="s3">א</b></span></div>
                      <div className="d-row"><span className="d-lab">גובה שורה</span><span className="d-lines"><i /><i /><i /></span></div>
                      <div className="d-row"><span className="d-lab">גופן קריא</span><span className="d-dys">משפט לדוגמה לקריאה נוחה</span></div>
                    </div>
                  )} />
                <Frow idx={1} tag="ויזואלי" title="ניגודיות וצבע בשליטה מלאה"
                  text="עוברים למצב כהה או בהיר. הופכים את צבעי המסך בלחיצה אחת. עוברים לגווני אפור או ספיה. מדגישים את כל הקישורים בעמוד כדי שיבלטו."
                  chips={['ניגודיות כהה ובהירה', 'היפוך צבעים', 'גווני אפור', 'ספיה', 'הדגשת קישורים']}
                  visual={(
                    <div className="demo demo-vis">
                      <span className="sw dark">כהה</span>
                      <span className="sw light">בהיר</span>
                      <span className="sw invert">היפוך</span>
                      <span className="sw gray">אפור</span>
                      <span className="sw sepia">ספיה</span>
                      <span className="sw linkdemo">קישור מודגש</span>
                    </div>
                  )} />
                <Frow idx={2} tag="ניווט וקריאה" title="ניווט וקריאה בלי מאמץ"
                  text="מסכת קריאה ממקדת את העין בשורה אחת. מסגרת מיקוד מראה היכן נמצא המקלדת. סמן עכבר גדול קל יותר לאיתור. מבנה עמוד מציג את הכותרות לקפיצה מהירה. אפשר גם להשהות אנימציות להסתיר תמונות ולהפעיל הקראה."
                  chips={['מסכת קריאה', 'מסגרת מיקוד', 'סמן עכבר גדול', 'מבנה עמוד', 'הקראת טקסט']}
                  visual={(
                    <div className="demo demo-nav">
                      <div className="dn-mask"><span>מסכת קריאה</span></div>
                      <div className="dn-chips">
                        <span className="dn-focus">מסגרת מיקוד</span>
                        <span className="dn-cursor"><I d={IC.cursor} />סמן גדול</span>
                      </div>
                      <div className="dn-struct"><b>H1</b><b>H2</b><b>H3</b><span>מבנה עמוד</span></div>
                    </div>
                  )} />
              </div>
            </section>

            <section className="sec alt" id="tools">
              <div className="wrap center reveal" data-reveal>
                <span className="tag">כל הכלים</span>
                <h2 className="h2"><span className="ln">16 כלים.</span><span className="ln">פאנל אחד.</span></h2>
                <Para className="section-sub" text="כל הכלים מסודרים בשלוש קטגוריות בתוך הפאנל. המבקר בוחר מה שמתאים לו." />
              </div>
              <div className="wrap">
                <div className="cats">
                  {[['טקסט', TXT], ['ויזואלי', VIS], ['ניווט וקריאה', NAVT]].map(([title, items], ci) => (
                    <div className="card cat reveal" data-reveal style={{ transitionDelay: (ci * 90) + 'ms' }} key={title}>
                      <div className="cat-h">{title}</div>
                      <ul className="cat-list">
                        {items.map(([t, ic]) => <li key={t}><span className="cat-ic"><I d={IC[ic]} /></span>{t}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="sec" id="how">
              <div className="wrap center reveal" data-reveal>
                <span className="tag">איך זה עובד</span>
                <h2 className="h2"><span className="ln">שלושה שלבים.</span><span className="ln">חמש דקות.</span><span className="ln">אתר שמתאים את עצמו.</span></h2>
                <div className="cols-3 steps">
                  {STEPS.map((s, si) => (
                    <div className="card step reveal" data-reveal style={{ transitionDelay: (si * 90) + 'ms' }} key={s.n}>
                      <span className="step-n">{s.n}</span>
                      <h3>{s.t}</h3>
                      <Para className="muted" text={s.d} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="sec alt" id="std">
              <div className="wrap center reveal" data-reveal>
                <span className="tag">תקן ותאימות</span>
                <h2 className="h2"><span className="ln">בנוי נכון.</span><span className="ln">עומד בכללים.</span></h2>
                <div className="facts">
                  {FACTS.map(([t, d], fi) => (
                    <div className="fact reveal" data-reveal style={{ transitionDelay: ((fi % 3) * 80) + 'ms' }} key={t}>
                      <span className="fact-ic"><Check /></span>
                      <div><b>{t}</b><Para className="muted" text={d} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="sec" id="plans">
              <div className="wrap center reveal" data-reveal>
                <span className="tag">חבילות</span>
                <h2 className="h2"><span className="ln">תמחור פשוט.</span><span className="ln">בלי הפתעות.</span></h2>
                <Para className="section-sub" text="כל החבילות כוללות את 16 הכלים. בוחרים לפי הצרכים של האתר." />
                <div className="cols-3 plans">
                  {PLANS.map((p, pi) => (
                    <div className={'card plan reveal ' + p.kind} data-reveal style={{ transitionDelay: (pi * 90) + 'ms' }} key={p.name}>
                      {p.kind === 'pop' && <span className="pop-badge">הכי פופולרית</span>}
                      <div className="plan-name">{p.name}</div>
                      <Para className="muted plan-desc" text={p.desc} />
                      <div className="plan-price"><span className="amount">{p.price}</span><span className="unit">{p.price === 'מותאם' ? '' : '₪'} {p.per}</span></div>
                      <ul className="feats">
                        {p.feats.map((f) => <li key={f}><span className="ok"><Check /></span>{f}</li>)}
                      </ul>
                      <button className={'btn pill block ' + (p.kind === 'pop' ? 'btn-primary' : 'btn-outline')} onClick={() => openModal(p.kind)}>{p.cta}</button>
                    </div>
                  ))}
                </div>
                <div className="note reveal" data-reveal>
                  <strong>שימו לב.</strong>
                  <p className="note-text">negishot הוא תוסף לשיפור הנגישות באתר, הוא אינו מבטיח הנגשה מלאה או עמידה בתקן כלשהו, ההנגשה המלאה תלויה במבנה האתר עצמו ובפעולות נוספות בצידו.</p>
                </div>
              </div>
            </section>

            <section className="sec alt" id="faq">
              <div className="wrap narrow center">
                <div className="reveal" data-reveal>
                  <span className="tag">שאלות נפוצות</span>
                  <h2 className="h2"><span className="ln">דברים שכדאי לדעת.</span></h2>
                </div>
                <div className="faq reveal-group" data-reveal>
                  {FAQ.map((f, i) => (
                    <div className={'faq-item' + (open === i ? ' on' : '')} key={i}>
                      <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                        <span className="faq-qt">{f.q}</span>
                        <span className="faq-chev" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></span>
                      </button>
                      <div className="faq-aw"><div className="faq-ai"><Para className="faq-a" text={f.a} /></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="foot">
        <button className="brand" onClick={goHome} aria-label="negishot, מעבר לעמוד הבית"><Logo /></button>
        <nav className="foot-links" aria-label="ניווט תחתון">
          <button onClick={() => go('about')}>אודות</button>
          <button onClick={() => go('accessibility')}>הצהרת נגישות</button>
          <button onClick={() => go('privacy')}>מדיניות פרטיות</button>
        </nav>
        <Para className="foot-tag" text='כלי נגישות לאתרים. בהתאם לתקן הישראלי ת"י 5568.' />
        <div className="foot-copy">© 2026 negishot. כל הזכויות שמורות.</div>
      </footer>

      {modal && (
        <div className="modal-ov" onClick={closeModal}>
          <div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={(e) => e.stopPropagation()}>
            <button className="modal-x" onClick={closeModal} aria-label="סגירת החלון">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            {!sent ? (
              <form className="modal-body" onSubmit={submit}>
                <span className="modal-ic"><Mail /></span>
                <h3 id="modalTitle">{msg.t}</h3>
                <p className="modal-msg">{msg.m}</p>
                <input className="modal-input" type="email" required dir="ltr" aria-label="כתובת דואר אלקטרוני" placeholder="name@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary pill block">שליחה</button>
              </form>
            ) : (
              <div className="modal-body">
                <span className="modal-ic ok"><Check w={28} /></span>
                <h3 id="modalTitle">תודה רבה</h3>
                <Para className="muted" text="קיבלנו את הפרטים. נחזור אליכם בהקדם עם כל המידע." />
                <button className="btn btn-primary pill block" onClick={closeModal}>סגירה</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
