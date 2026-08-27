// FitFlow Icon System
// All icons: 24x24 viewBox · stroke-width 1.75 · round linecap/join · currentColor
// Style: athletic-precise — geometric but not cold, purposeful curves

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

type P = IconProps;

const base = (children: React.ReactNode, p: P) => (
  <svg
    width={p.size ?? 22}
    height={p.size ?? 22}
    viewBox="0 0 24 24"
    fill="none"
    stroke={p.color ?? "currentColor"}
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={p.style}
  >
    {children}
  </svg>
);

// ── Navigation ────────────────────────────────────────────────────────────────

export const IcHome = (p: P) => base(
  // House: roof as triangle peak, walls, door
  <>
    <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10.5z" />
    <rect x="9" y="13" width="6" height="10" rx="0.5" />
  </>,
  p
);

export const IcClipboard = (p: P) => base(
  // Clipboard with two lines — scheda allenamento
  <>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3a3 3 0 0 0 6 0" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="13" y2="14" />
  </>,
  p
);

export const IcApple = (p: P) => base(
  // Apple with leaf — dieta
  <>
    <path d="M12 6C12 6 9.5 2 6.5 3c0 3 2.5 4.5 5.5 3z" />
    <path d="M12 6c-3.5 0-6 2.5-6 6.5 0 4 2.5 6.5 5 6.5.8 0 1.5-.3 2-.5.5.2 1.2.5 2 .5 2.5 0 5-2.5 5-6.5C20 8.5 17.5 6 14 6c-.8 0-1.5.2-2 .5C11.5 6.2 12 6 12 6z" />
    <path d="M12 6v1.5" />
  </>,
  p
);

export const IcClock = (p: P) => base(
  // Clean clock — storico
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14.5" />
  </>,
  p
);

export const IcPlus = (p: P) => base(
  <>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>,
  p
);

// ── Navigation / UI ───────────────────────────────────────────────────────────

export const IcBell = (p: P) => base(
  // Bell with gentle curve
  <>
    <path d="M18 9A6 6 0 0 0 6 9c0 5.5-2.5 7.5-2.5 7.5h17S18 14.5 18 9z" />
    <path d="M10.3 20.5a2 2 0 0 0 3.4 0" />
  </>,
  p
);

export const IcChevronLeft = (p: P) => base(
  <polyline points="15 18 9 12 15 6" />,
  p
);

export const IcChevronRight = (p: P) => base(
  <polyline points="9 18 15 12 9 6" />,
  p
);

export const IcChevronDown = (p: P) => base(
  <polyline points="6 9 12 15 18 9" />,
  p
);

export const IcPencil = (p: P) => base(
  // Pencil / edit
  <>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </>,
  p
);

export const IcCamera = (p: P) => base(
  <>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </>,
  p
);

export const IcFilter = (p: P) => base(
  // Slider filter icon (3 horizontal sliders)
  <>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none" />
    <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
  </>,
  p
);

export const IcClose = (p: P) => base(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
  p
);

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const IcDumbbell = (p: P) => base(
  // Dumbbell — workout / allenamento
  <>
    <line x1="6.5" y1="6.5" x2="17.5" y2="17.5" />
    <path d="M4 4.5 5.5 3 9 6.5 7.5 8 4 4.5z" />
    <path d="M20 19.5 18.5 21 15 17.5l1.5-1.5L20 19.5z" />
    <line x1="3" y1="6" x2="6" y2="3" />
    <line x1="18" y1="21" x2="21" y2="18" />
  </>,
  p
);

export const IcCalendar = (p: P) => base(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <rect x="7" y="14" width="3" height="3" rx="0.5" fill="currentColor" stroke="none" />
    <rect x="14" y="14" width="3" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </>,
  p
);

export const IcFire = (p: P) => base(
  // Flame — streak
  <>
    <path d="M12 2c0 0-4 4-4 9a4 4 0 0 0 8 0c0-2.5-1.5-4-2-5.5C13.5 7 14 9 12 10c0 0-2-1.5-2-3.5C10 5 12 2 12 2z" />
    <path d="M8.5 17.5a4 4 0 0 0 7 0" />
  </>,
  p
);

export const IcTarget = (p: P) => base(
  // Bullseye — obiettivo
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </>,
  p
);

export const IcTrendUp = (p: P) => base(
  <>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </>,
  p
);

// ── Exercise / Scheda ─────────────────────────────────────────────────────────

export const IcLink = (p: P) => base(
  // Chain link — esercizi / serie
  <>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </>,
  p
);

export const IcTimer = (p: P) => base(
  // Stopwatch — recupero
  <>
    <circle cx="12" cy="13" r="8" />
    <polyline points="12 9 12 13 14.5 15" />
    <line x1="9" y1="2" x2="15" y2="2" />
    <line x1="12" y1="2" x2="12" y2="5" />
  </>,
  p
);

export const IcWeight = (p: P) => base(
  // Weight plate — carico
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 9V4M12 20v-5" strokeWidth="2.5" />
    <rect x="3" y="9" width="3.5" height="6" rx="1.5" />
    <rect x="17.5" y="9" width="3.5" height="6" rx="1.5" />
    <line x1="6.5" y1="12" x2="9" y2="12" />
    <line x1="15" y1="12" x2="17.5" y2="12" />
  </>,
  p
);

export const IcTrash = (p: P) => base(
  <>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </>,
  p
);

// ── Meals / Dieta ─────────────────────────────────────────────────────────────

export const IcCoffee = (p: P) => base(
  // Coffee cup — colazione
  <>
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="5" />
    <line x1="10" y1="2" x2="10" y2="5" />
    <line x1="14" y1="2" x2="14" y2="5" />
  </>,
  p
);

export const IcUtensils = (p: P) => base(
  // Fork + knife — pasto principale
  <>
    <line x1="8" y1="2" x2="8" y2="22" />
    <path d="M5 2v6a3 3 0 0 0 6 0V2" />
    <line x1="17" y1="2" x2="17" y2="22" />
  </>,
  p
);

export const IcDroplet = (p: P) => base(
  // Water drop — acqua
  <>
    <path d="M12 2 C12 2 5 10 5 15a7 7 0 0 0 14 0C19 10 12 2 12 2z" />
  </>,
  p
);

export const IcLeaf = (p: P) => base(
  // Leaf — snack / vegetale
  <>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </>,
  p
);

export const IcFish = (p: P) => base(
  // Fish — cena proteica
  <>
    <path d="M20 12c-2-2.5-6-4-9-4C7 8 3 11 2 12c1 1 5 4 9 4 3 0 7-1.5 9-4z" />
    <path d="M22 6l-2 6-2-6" />
    <circle cx="10" cy="12" r="1" fill="currentColor" stroke="none" />
  </>,
  p
);

export const IcCheck = (p: P) => base(
  <polyline points="20 6 9 17 4 12" />,
  p
);

export const IcCheckCircle = (p: P) => base(
  <>
    <circle cx="12" cy="12" r="9" />
    <polyline points="16 9 10.5 14.5 8 12" />
  </>,
  p
);

// ── Account ───────────────────────────────────────────────────────────────────

export const IcGear = (p: P) => base(
  <>
    <circle cx="12" cy="12" r="3.5" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </>,
  p
);

export const IcBookOpen = (p: P) => base(
  // Open book — glossario
  <>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </>,
  p
);

export const IcMessage = (p: P) => base(
  // Chat bubble — messaggi
  <>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </>,
  p
);

export const IcShield = (p: P) => base(
  // Shield — privacy
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </>,
  p
);

export const IcHeadset = (p: P) => base(
  // Headset — assistenza
  <>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </>,
  p
);

export const IcLogout = (p: P) => base(
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </>,
  p
);

export const IcUser = (p: P) => base(
  <>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
  p
);

// ── Storico ───────────────────────────────────────────────────────────────────

export const IcBarChart = (p: P) => base(
  // Bar chart — riepilogo mensile
  <>
    <rect x="3" y="12" width="4" height="9" rx="0.5" />
    <rect x="10" y="7" width="4" height="14" rx="0.5" />
    <rect x="17" y="4" width="4" height="17" rx="0.5" />
    <line x1="2" y1="21" x2="22" y2="21" />
  </>,
  p
);

export const IcNotes = (p: P) => base(
  // Note / PT notes
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="8" y1="16" x2="12" y2="16" />
  </>,
  p
);

export const IcPlay = (p: P) => base(
  <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />,
  p
);

export const IcPause = (p: P) => base(
  <>
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
  </>,
  p
);

export const IcStop = (p: P) => base(
  <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" stroke="none" />,
  p
);

export const IcRefresh = (p: P) => base(
  <>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.99" />
  </>,
  p
);

export const IcVideo = (p: P) => base(
  <>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </>,
  p
);

export const IcVolume = (p: P) => base(
  // Volume / kg totali
  <>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
  </>,
  p
);
