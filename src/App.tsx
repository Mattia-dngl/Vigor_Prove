import { useState } from "react";
import {
  IcHome, IcClipboard, IcApple, IcClock, IcPlus,
  IcBell, IcChevronLeft, IcChevronRight, IcChevronDown,
  IcPencil, IcCamera, IcFilter, IcClose,
  IcDumbbell, IcCalendar, IcFire, IcTarget, IcTrendUp,
  IcLink, IcTimer, IcWeight, IcTrash,
  IcCoffee, IcUtensils, IcDroplet, IcLeaf, IcFish,
  IcCheck, IcCheckCircle,
  IcGear, IcBookOpen, IcMessage, IcShield, IcHeadset, IcLogout, IcUser,
  IcBarChart, IcNotes, IcVolume,
  IcPlay, IcPause, IcStop, IcRefresh, IcVideo,
} from "./icons";
import { useEffect, useRef } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const OR = "#F97316";
const OR_LIGHT = "#FFF4ED";
const BG = "#F2F2F7";
const CARD = "#FFFFFF";
const TEXT = "#1A1A1A";
const MUTED = "#8A8A8E";
const BORDER = "#E5E5EA";

type Screen = "dashboard" | "scheda" | "dieta" | "storico" | "account" | "nuovo";
type Tab = "dashboard" | "scheda" | "dieta" | "storico";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function Bar({ pct }: { pct: number }) {
  return (
    <div style={{ height: 6, background: "#E5E5EA", borderRadius: 3, overflow: "hidden", flex: 1 }}>
      <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: OR, borderRadius: 3 }} />
    </div>
  );
}

function RingProgress({ pct, size = 80, stroke = 8 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E5EA" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={OR} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round" />
    </svg>
  );
}

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
      <IcChevronLeft size={16} color={TEXT} />
    </button>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ goTo }: { goTo: (s: Screen) => void }) {
  const days = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
  const dates = [21, 22, 23, 24, 25, 26, 27];
  const today = 3;
  const workoutDays = [0, 2, 4];

  return (
    <div style={{ paddingBottom: 90, background: BG, minHeight: "100%" }}>
      <div style={{ background: CARD, padding: "52px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: TEXT }}>Ciao, Marco</h1>
            <p style={{ margin: "3px 0 0", fontSize: 13, color: MUTED }}>Giovedì, 24 Ottobre</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <button onClick={() => goTo("account")} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <IcBell size={18} color={TEXT} />
              </button>
              <span style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, background: OR, borderRadius: "50%", border: "2px solid " + CARD }} />
            </div>
            <button onClick={() => goTo("account")} style={{ width: 40, height: 40, borderRadius: "50%", border: "none", overflow: "hidden", cursor: "pointer", padding: 0 }}>
              <img src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?w=80&h=80&fit=crop&auto=format" alt="Marco" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {/* Week strip */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 10px", marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {days.map((d, i) => {
              const isToday = i === today;
              const isPast = i < today;
              const hasWorkout = workoutDays.includes(i);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: isToday ? OR : MUTED }}>{d}</span>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: isToday ? OR : isPast ? OR_LIGHT : BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: isToday ? "#fff" : isPast ? OR : TEXT }}>{dates[i]}</span>
                  </div>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: hasWorkout ? (isPast || isToday ? OR : "#D0D0D0") : "transparent" }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Prossimo allenamento */}
        <div style={{ background: CARD, borderRadius: 16, padding: "16px", marginBottom: 14, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: OR_LIGHT, borderRadius: 20, padding: "5px 12px" }}>
              <IcDumbbell size={13} color={OR} />
              <span style={{ fontSize: 11, fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: 0.5 }}>Prossimo allenamento</span>
            </div>
            <span style={{ fontSize: 12, color: OR, fontWeight: 600 }}>Oggi · 18:30</span>
          </div>
          <h2 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT }}>Upper Body - Forza</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 12 }}>
            <IcUser size={13} color={MUTED} />
            <p style={{ margin: 0, fontSize: 13, color: MUTED }}>Programma personalizzato di <strong style={{ color: TEXT }}>PT Valerio</strong></p>
          </div>
          <div style={{ borderTop: "1px solid " + BORDER, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <IcTimer size={13} color={MUTED} />
                <span style={{ fontSize: 13, color: MUTED }}>65 min</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <IcFire size={13} color={MUTED} />
                <span style={{ fontSize: 13, color: MUTED }}>450 kcal</span>
              </div>
            </div>
            <button onClick={() => goTo("scheda")} style={{ display: "flex", alignItems: "center", gap: 5, background: OR, border: "none", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "var(--font-display)", cursor: "pointer", borderRadius: 20, padding: "6px 14px" }}>
              Inizia
              <IcChevronRight size={13} color="#fff" />
            </button>
          </div>
        </div>

        {/* Stats 3 tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { Ic: IcCalendar, label: "ALLENAMENTI", value: "12", sub: "/ mese" },
            { Ic: IcFire, label: "STREAK", value: "5", sub: "giorni" },
            { Ic: IcTarget, label: "OBIETTIVO", value: "4/5", sub: "sett." },
          ].map((s) => (
            <div key={s.label} style={{ background: CARD, borderRadius: 14, padding: "12px 10px", border: "1px solid " + BORDER }}>
              <div style={{ marginBottom: 6 }}><s.Ic size={18} color={OR} /></div>
              <p style={{ margin: 0, fontSize: 9, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{s.label}</p>
              <p style={{ margin: "4px 0 0", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: TEXT }}>
                {s.value} <span style={{ fontSize: 11, fontWeight: 500, color: MUTED }}>{s.sub}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Scheda attiva */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", marginBottom: 14, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: OR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IcClipboard size={20} color={OR} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 11, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>Scheda attiva</p>
              <p style={{ margin: "2px 0 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: TEXT }}>Hipertrophy Phase 2</p>
            </div>
            <button onClick={() => goTo("scheda")} style={{ background: BG, border: "1px solid " + BORDER, borderRadius: 20, padding: "6px 14px", fontWeight: 600, fontSize: 13, color: TEXT, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              Vedi <IcChevronRight size={12} color={TEXT} />
            </button>
          </div>
        </div>

        {/* Dieta di oggi */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", marginBottom: 14, border: "1px solid " + BORDER }}>
          <button onClick={() => goTo("dieta")} style={{ width: "100%", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IcApple size={18} color={OR} />
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: TEXT }}>Dieta di oggi</span>
              </div>
              <span style={{ fontSize: 13, color: MUTED }}>1.850 / 2.300 kcal</span>
            </div>
            {[
              { label: "Proteine", cur: 140, max: 160 },
              { label: "Carboidrati", cur: 210, max: 250 },
              { label: "Grassi", cur: 58, max: 75 },
            ].map((m) => (
              <div key={m.label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: OR }} />
                    <span style={{ fontSize: 13, color: TEXT }}>{m.label}</span>
                  </div>
                  <span style={{ fontSize: 13, color: MUTED }}><strong style={{ color: TEXT }}>{m.cur}</strong> / {m.max} g</span>
                </div>
                <Bar pct={(m.cur / m.max) * 100} />
              </div>
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SCHEDA ──────────────────────────────────────────────────────────────────
const schedaGiorni = [
  { n: 1, label: "Petto e Tricipiti", esercizi: [
    { nome: "Panca piana con bilanciere", sets: "4x10", rec: "90s", peso: "60 kg" },
    { nome: "Croci ai cavi", sets: "3x12", rec: "60s", peso: "15 kg" },
    { nome: "Panca inclinata manubri", sets: "4x10", rec: "90s", peso: "22 kg" },
    { nome: "French press", sets: "3x12", rec: "60s", peso: "20 kg" },
    { nome: "Pushdown al cavo", sets: "3x15", rec: "45s", peso: "25 kg" },
  ]},
  { n: 2, label: "Schiena e Bicipiti", esercizi: [
    { nome: "Trazioni alla sbarra", sets: "4x8", rec: "90s", peso: "BW" },
    { nome: "Rematore con bilanciere", sets: "4x10", rec: "90s", peso: "60 kg" },
    { nome: "Lat machine", sets: "3x12", rec: "60s", peso: "55 kg" },
    { nome: "Curl con bilanciere", sets: "3x12", rec: "60s", peso: "25 kg" },
    { nome: "Curl ai cavi", sets: "3x15", rec: "45s", peso: "12 kg" },
  ]},
  { n: 3, label: "Gambe e Glutei", esercizi: [
    { nome: "Squat", sets: "4x10", rec: "120s", peso: "80 kg" },
    { nome: "Leg press", sets: "4x12", rec: "90s", peso: "120 kg" },
    { nome: "Romanian deadlift", sets: "3x10", rec: "90s", peso: "60 kg" },
    { nome: "Leg curl", sets: "3x12", rec: "60s", peso: "35 kg" },
    { nome: "Hip thrust", sets: "4x12", rec: "60s", peso: "70 kg" },
  ]},
  { n: 4, label: "Spalle e Core", esercizi: [
    { nome: "Military press", sets: "4x10", rec: "90s", peso: "40 kg" },
    { nome: "Alzate laterali", sets: "3x15", rec: "60s", peso: "10 kg" },
    { nome: "Arnold press", sets: "3x12", rec: "60s", peso: "16 kg" },
    { nome: "Plank", sets: "3x60s", rec: "30s", peso: "" },
    { nome: "Russian twist", sets: "3x20", rec: "30s", peso: "8 kg" },
  ]},
];

// ─── Workout Timer ────────────────────────────────────────────────────────────
function WorkoutTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function reset() { setRunning(false); setSeconds(0); }

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const display = h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // progress ring — max 60 min shown as full circle
  const pct = Math.min((seconds / 3600) * 100, 100);
  const r = 46;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ background: CARD, borderRadius: 20, padding: "20px 16px", marginBottom: 16, border: "1px solid " + BORDER }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
        <IcTimer size={15} color={OR} />
        <span style={{ fontSize: 12, fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: 0.6 }}>Timer Allenamento</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Ring */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width={108} height={108} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={54} cy={54} r={r} fill="none" stroke={BORDER} strokeWidth={6} />
            <circle
              cx={54} cy={54} r={r} fill="none"
              stroke={running ? OR : "#9A9A9A"}
              strokeWidth={6}
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct / 100)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.5s, stroke 0.3s" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: TEXT, letterSpacing: -1 }}>{display}</span>
            <span style={{ fontSize: 10, color: MUTED, fontWeight: 600, marginTop: 2 }}>{running ? "in corso" : seconds > 0 ? "in pausa" : "pronto"}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => setRunning(r => !r)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: running ? "#FFF0F0" : OR,
              border: "none", borderRadius: 14,
              padding: "13px 0", cursor: "pointer",
              color: running ? "#EF4444" : "#fff",
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15,
              boxShadow: running ? "none" : `0 6px 16px ${OR}44`,
              transition: "all 0.2s",
            }}
          >
            {running ? <IcPause size={17} color="#EF4444" /> : <IcPlay size={17} color="#fff" />}
            {running ? "Pausa" : seconds > 0 ? "Riprendi" : "Avvia"}
          </button>
          <button
            onClick={reset}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: BG, border: "1px solid " + BORDER, borderRadius: 14, padding: "10px 0", cursor: "pointer", color: MUTED, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}
          >
            <IcRefresh size={14} color={MUTED} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({ nome, onClose }: { nome: string; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", zIndex: 60, backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: CARD, borderRadius: "24px 24px 0 0", width: "100%", paddingBottom: 40, overflow: "hidden" }}>
        {/* Fake video area */}
        <div style={{ width: "100%", aspectRatio: "16/9", background: "#111", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&h=450&fit=crop&auto=format"
            alt={nome}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
          />
          {/* Play button overlay */}
          <div style={{ position: "absolute", width: 56, height: 56, borderRadius: "50%", background: OR, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px ${OR}88` }}>
            <IcPlay size={22} color="#fff" />
          </div>
          {/* Close */}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <IcClose size={14} color="#fff" />
          </button>
          {/* Duration badge */}
          <div style={{ position: "absolute", bottom: 10, right: 12, background: "rgba(0,0,0,0.65)", borderRadius: 6, padding: "3px 8px" }}>
            <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>1:24</span>
          </div>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: TEXT }}>{nome}</h3>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: MUTED }}>Esecuzione corretta · PT Luca Bianchi</p>

          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Muscoli", value: "Petto, Tricipiti" },
              { label: "Attrezzi", value: "Bilanciere" },
              { label: "Livello", value: "Intermedio" },
            ].map((t) => (
              <div key={t.label} style={{ flex: 1, background: BG, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 9, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{t.label}</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, fontWeight: 700, color: TEXT, fontFamily: "var(--font-display)" }}>{t.value}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, background: OR_LIGHT, borderRadius: 12, padding: "12px 14px" }}>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: OR, marginBottom: 4 }}>Consigli del PT</p>
            <p style={{ margin: 0, fontSize: 12, color: TEXT, lineHeight: 1.5 }}>
              Tieni i piedi ben piantati a terra. Abbassa il bilanciere fino a sfiorare il petto, poi spingi in modo esplosivo verso l'alto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Scheda({ goBack }: { goBack: () => void }) {
  const [openDay, setOpenDay] = useState(1);
  const [videoExercise, setVideoExercise] = useState<string | null>(null);

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ background: CARD, padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <BackBtn onBack={goBack} />
        <h1 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, textAlign: "center" }}>La tua Scheda</h1>
        <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IcPencil size={15} color={TEXT} />
        </button>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Program card */}
        <div style={{ background: CARD, borderRadius: 16, padding: "16px", marginBottom: 16, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: TEXT }}>Programma Forza - Fase 2</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                <IcUser size={12} color={MUTED} />
                <p style={{ margin: 0, fontSize: 12, color: MUTED }}>PT: Luca Bianchi</p>
              </div>
            </div>
            <span style={{ background: OR_LIGHT, color: OR, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>ATTIVO</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: MUTED }}>Durata: 8 settimane</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: OR }}>Settimana 3/8</span>
          </div>
          <div style={{ height: 6, background: BORDER, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: "37.5%", background: OR, borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <IcCalendar size={13} color={MUTED} />
              <span style={{ fontSize: 12, color: MUTED }}>4 giorni / settimana</span>
            </div>
            <span style={{ fontSize: 12, color: MUTED }}>Inizio: 5 Ago 2026</span>
          </div>
        </div>

        {/* Workout Timer */}
        <WorkoutTimer />

        {/* Days accordion */}
        {schedaGiorni.map((g) => {
          const isOpen = openDay === g.n;
          return (
            <div key={g.n} style={{ background: CARD, borderRadius: 16, marginBottom: 10, border: "1px solid " + BORDER, overflow: "hidden" }}>
              <button onClick={() => setOpenDay(isOpen ? 0 : g.n)} style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                <div>
                  <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: isOpen ? OR : MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>GIORNO {g.n}</p>
                  <p style={{ margin: "3px 0 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: TEXT }}>{g.label}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: MUTED }}>{g.esercizi.length} esercizi</span>
                  <div style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <IcChevronDown size={16} color={MUTED} />
                  </div>
                </div>
              </button>
              {isOpen && (
                <div style={{ borderTop: "1px solid " + BORDER }}>
                  {g.esercizi.map((e, i) => (
                    <div key={i} style={{ padding: "13px 16px", borderBottom: i < g.esercizi.length - 1 ? "1px solid " + BORDER : "none", display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Number badge */}
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: OR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: OR, fontFamily: "var(--font-display)" }}>{i + 1}</span>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)", color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.nome}</p>
                        <div style={{ display: "flex", gap: 10, marginTop: 4, flexWrap: "wrap" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <IcLink size={10} color={MUTED} />
                            <span style={{ fontSize: 11, color: MUTED }}>{e.sets}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                            <IcTimer size={10} color={MUTED} />
                            <span style={{ fontSize: 11, color: MUTED }}>Rec: {e.rec}</span>
                          </div>
                          {e.peso && (
                            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                              <IcWeight size={10} color={OR} />
                              <span style={{ fontSize: 11, color: OR, fontWeight: 700 }}>{e.peso}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Video play button */}
                      <button
                        onClick={() => setVideoExercise(e.nome)}
                        style={{
                          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                          background: OR, border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: `0 3px 10px ${OR}44`,
                        }}
                        title={`Vedi video: ${e.nome}`}
                      >
                        <IcVideo size={15} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Note PT */}
        <div style={{ background: OR_LIGHT, borderRadius: 16, padding: "14px 16px", border: `1px solid ${OR}33` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
            <IcNotes size={14} color={OR} />
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: 0.5 }}>Note del PT</p>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: TEXT, lineHeight: 1.5 }}>
            Aumentare il carico sulla panca piana se riesci a completare tutte le serie. Buon lavoro!
          </p>
        </div>
      </div>

      {/* Video modal */}
      {videoExercise && (
        <VideoModal nome={videoExercise} onClose={() => setVideoExercise(null)} />
      )}
    </div>
  );
}

// ─── DIETA ───────────────────────────────────────────────────────────────────
const pastiData = [
  { IcMeal: IcCoffee, nome: "Colazione", completato: true, cibi: [{ name: "Yogurt greco con muesli", kcal: 350 }, { name: "Banana", kcal: 90 }], totale: 440 },
  { IcMeal: IcLeaf, nome: "Spuntino mattina", completato: true, cibi: [{ name: "Barretta proteica", kcal: 220 }, { name: "Mela", kcal: 80 }], totale: 300 },
  { IcMeal: IcUtensils, nome: "Pranzo", completato: true, cibi: [{ name: "Petto di pollo alla griglia", kcal: 280 }, { name: "Riso basmati 80g", kcal: 290 }, { name: "Insalata mista", kcal: 50 }], totale: 620 },
  { IcMeal: IcLeaf, nome: "Spuntino pomeriggio", completato: false, cibi: [{ name: "Frutta secca 30g", kcal: 180 }], totale: 180 },
  { IcMeal: IcFish, nome: "Cena", completato: false, cibi: [{ name: "Salmone al forno", kcal: 350 }, { name: "Verdure grigliate", kcal: 80 }, { name: "Pane integrale", kcal: 120 }], totale: 550 },
];

function Dieta({ goBack }: { goBack: () => void }) {
  const [water, setWater] = useState(1.5);
  const eaten = 1820;
  const total = 2450;
  const pct = Math.round((eaten / total) * 100);

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ background: CARD, padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <BackBtn onBack={goBack} />
        <h1 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, textAlign: "center" }}>Dieta</h1>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", marginBottom: 14, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid " + BORDER, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcChevronLeft size={13} color={TEXT} />
            </button>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: TEXT }}>Lunedì 25 Agosto</span>
            <button style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid " + BORDER, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcChevronRight size={13} color={TEXT} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <RingProgress pct={pct} size={80} stroke={8} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: TEXT }}>{pct}%</span>
                <span style={{ fontSize: 9, color: MUTED }}>fatto</span>
              </div>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: MUTED, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>Calorie odierne</p>
              <p style={{ margin: "3px 0 2px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: TEXT }}>
                {eaten.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: MUTED }}>/ {total.toLocaleString()} kcal</span>
              </p>
              <p style={{ margin: 0, fontSize: 12, color: OR, fontWeight: 600 }}>{(total - eaten).toLocaleString()} kcal rimanenti</p>
            </div>
          </div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[{ label: "Proteine", cur: 165, max: 160 }, { label: "Carboidrati", cur: 220, max: 250 }, { label: "Grassi", cur: 58, max: 75 }].map((m) => (
              <div key={m.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: MUTED }}>{m.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: TEXT }}>{m.cur}g</span>
                </div>
                <Bar pct={(m.cur / m.max) * 100} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, borderTop: "1px solid " + BORDER, paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcDroplet size={16} color={OR} />
              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>Acqua Assunta</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: OR, fontWeight: 700 }}>{water.toFixed(1)} / 2.5 L</span>
              <button onClick={() => setWater(w => Math.min(w + 0.25, 2.5))} style={{ background: OR_LIGHT, border: "none", borderRadius: 8, padding: "4px 10px", color: OR, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+250ml</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: TEXT }}>Pasti della giornata</span>
          <span style={{ fontSize: 12, color: OR, fontWeight: 700 }}>DIARIO ALIMENTARE</span>
        </div>

        {pastiData.map((p) => (
          <div key={p.nome} style={{ background: CARD, borderRadius: 16, padding: "14px 16px", marginBottom: 10, border: "1px solid " + BORDER, opacity: p.completato ? 1 : 0.72 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: p.completato ? OR_LIGHT : BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p.IcMeal size={17} color={p.completato ? OR : MUTED} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: TEXT }}>{p.nome}</span>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: p.completato ? "none" : `1.5px solid ${MUTED}`, background: p.completato ? OR_LIGHT : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.completato && <IcCheck size={12} color={OR} />}
              </div>
            </div>
            {p.cibi.map((c) => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: p.completato ? TEXT : MUTED }}>{c.name}</span>
                <span style={{ fontSize: 13, color: p.completato ? TEXT : MUTED, fontWeight: 500 }}>{c.kcal} kcal</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid " + BORDER, paddingTop: 8, marginTop: 6, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: MUTED }}>Subtotale</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: p.completato ? OR : MUTED }}>{p.totale} kcal</span>
            </div>
          </div>
        ))}
        <p style={{ textAlign: "center", fontSize: 12, color: MUTED, marginTop: 8 }}>Piano assegnato da: <strong>Luca Bianchi</strong></p>
      </div>
    </div>
  );
}

// ─── STORICO ─────────────────────────────────────────────────────────────────
const calDayLabels = ["L", "M", "M", "G", "V", "S", "D"];
const workoutDaysSet = new Set([1, 4, 5, 8, 11, 12, 14, 15, 18, 19, 20, 22]);

function Storico({ goBack }: { goBack: () => void }) {
  const [selected, setSelected] = useState(20);
  const daysInMonth = 31;
  const startOffset = 4;
  const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: 90 }}>
      <div style={{ background: CARD, padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <BackBtn onBack={goBack} />
        <h1 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, textAlign: "center" }}>Storico</h1>
        <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IcFilter size={16} color={TEXT} />
        </button>
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ background: CARD, borderRadius: 16, padding: "16px", marginBottom: 16, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid " + BORDER, background: OR_LIGHT, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcChevronLeft size={13} color={OR} />
            </button>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: TEXT }}>Agosto 2026</span>
            <button style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid " + BORDER, background: OR_LIGHT, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IcChevronRight size={13} color={OR} />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
            {calDayLabels.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: MUTED, padding: "2px 0" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const isToday = day === 25;
              const isSel = day === selected;
              const hasW = workoutDaysSet.has(day);
              return (
                <button key={i} onClick={() => hasW && setSelected(day)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 0", background: "none", border: isSel ? `2px solid ${OR}` : isToday ? `2px solid ${OR}44` : "none", borderRadius: 8, cursor: hasW ? "pointer" : "default" }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: isSel ? OR : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: isSel || isToday ? 800 : 400, color: isSel ? "#fff" : isToday ? OR : TEXT, fontFamily: "var(--font-display)" }}>{day}</span>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: hasW ? OR : "transparent" }} />
                </button>
              );
            })}
          </div>
        </div>

        {selected && (
          <>
            <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: TEXT }}>Mercoledì {selected} Agosto</h3>
            <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", marginBottom: 16, border: "1px solid " + BORDER }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: OR_LIGHT, borderRadius: 20, padding: "4px 10px" }}>
                  <IcDumbbell size={12} color={OR} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: 0.5 }}>Forza</span>
                </div>
                <span style={{ fontSize: 12, color: MUTED }}>Da scheda PT</span>
              </div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: TEXT }}>Upper Body - Petto e Tricipiti</h3>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IcTimer size={13} color={MUTED} />
                  <span style={{ fontSize: 12, color: MUTED }}>58 min</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IcClipboard size={13} color={MUTED} />
                  <span style={{ fontSize: 12, color: MUTED }}>5 esercizi</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IcVolume size={13} color={MUTED} />
                  <span style={{ fontSize: 12, color: MUTED }}>4.250 kg totali</span>
                </div>
              </div>
              <button style={{ marginTop: 12, background: "none", border: "none", color: OR, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                Vedi dettagli workout <IcChevronRight size={13} color={OR} />
              </button>
            </div>
          </>
        )}

        <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: TEXT }}>Riepilogo Agosto 2026</h3>
        <div style={{ background: CARD, borderRadius: 16, padding: "16px", border: "1px solid " + BORDER }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { Ic: IcCalendar, label: "ALLENAMENTI TOTALI", value: "14", sub: "sessioni", orange: false },
              { Ic: IcTimer, label: "TEMPO SPESO", value: "12h 45min", sub: "", orange: false },
              { Ic: IcVolume, label: "VOLUME TOTALE", value: "52.800 kg", sub: "", orange: false },
              { Ic: IcFire, label: "MIGLIOR STREAK", value: "5", sub: "giorni", orange: true },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ marginBottom: 4 }}><s.Ic size={15} color={s.orange ? OR : MUTED} /></div>
                <p style={{ margin: 0, fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.4 }}>{s.label}</p>
                <p style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: s.orange ? OR : TEXT }}>
                  {s.value} {s.sub && <span style={{ fontSize: 12, fontWeight: 500, color: MUTED }}>{s.sub}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NUOVO ALLENAMENTO ───────────────────────────────────────────────────────
type Exercise = { nome: string; serie: { n: number; reps: string; kg: string }[] };
const initialExercises: Exercise[] = [
  { nome: "Panca piana", serie: [{ n: 1, reps: "10", kg: "60" }, { n: 2, reps: "10", kg: "60" }, { n: 3, reps: "8", kg: "65" }, { n: 4, reps: "8", kg: "65" }] },
  { nome: "Croci ai cavi", serie: [{ n: 1, reps: "12", kg: "15" }, { n: 2, reps: "12", kg: "15" }, { n: 3, reps: "10", kg: "15" }] },
  { nome: "Dips", serie: [{ n: 1, reps: "12", kg: "BW" }, { n: 2, reps: "10", kg: "BW" }, { n: 3, reps: "10", kg: "BW" }] },
];

function NuovoAllenamento({ goBack, onSave }: { goBack: () => void; onSave: () => void }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Forza");
  const [durata, setDurata] = useState("45");
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [note, setNote] = useState("");
  const [showTipo, setShowTipo] = useState(false);

  return (
    <div style={{ background: BG, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: CARD, padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IcClose size={16} color={TEXT} />
        </button>
        <h1 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, textAlign: "center" }}>Nuovo Allenamento</h1>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: "20px 16px 0", flex: 1, overflowY: "auto" }}>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Nome allenamento</label>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Es. Upper Body, Cardio HIIT..." style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid " + BORDER, fontSize: 14, color: TEXT, background: CARD, outline: "none", boxSizing: "border-box", marginBottom: 16, fontFamily: "var(--font-body)" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Tipo</label>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowTipo(v => !v)} style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: `1.5px solid ${OR}`, background: OR_LIGHT, fontSize: 14, fontWeight: 700, color: OR, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-body)" }}>
                {tipo}
                <IcChevronDown size={14} color={OR} />
              </button>
              {showTipo && (
                <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: CARD, border: "1px solid " + BORDER, borderRadius: 10, overflow: "hidden", zIndex: 10 }}>
                  {["Forza", "Ipertrofia", "Cardio", "Mobilità", "HIIT"].map((t) => (
                    <button key={t} onClick={() => { setTipo(t); setShowTipo(false); }} style={{ width: "100%", padding: "10px 14px", border: "none", background: tipo === t ? OR_LIGHT : CARD, color: tipo === t ? OR : TEXT, fontSize: 13, fontWeight: tipo === t ? 700 : 400, cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)" }}>{t}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Durata stimata</label>
            <div style={{ display: "flex", alignItems: "center", background: CARD, border: "1px solid " + BORDER, borderRadius: 12, padding: "11px 14px", gap: 6 }}>
              <input value={durata} onChange={e => setDurata(e.target.value)} style={{ width: "100%", border: "none", outline: "none", fontSize: 14, color: TEXT, background: "transparent", fontFamily: "var(--font-body)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 13, color: MUTED }}>min</span>
                <IcTimer size={14} color={MUTED} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: TEXT }}>Esercizi</span>
          <span style={{ color: OR, fontWeight: 800, fontSize: 17, fontFamily: "var(--font-display)" }}>({exercises.length})</span>
        </div>

        {exercises.map((ex, i) => (
          <div key={i} style={{ background: CARD, borderRadius: 14, padding: "14px 14px 12px", marginBottom: 12, border: "1px solid " + BORDER }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: TEXT }}>{i + 1}. {ex.nome}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: MUTED }}>{ex.serie.length} serie</p>
              </div>
              <button onClick={() => setExercises(prev => prev.filter((_, idx) => idx !== i))} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid #FFD0D0", background: "#FFF5F5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <IcTrash size={13} color="#EF4444" />
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.serie.map((s) => (
                <div key={s.n} style={{ background: BG, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: TEXT, fontWeight: 500 }}>
                  <span style={{ color: OR, fontWeight: 700 }}>{s.n}:</span> {s.reps}x{s.kg}kg
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => setExercises(prev => [...prev, { nome: "Nuovo esercizio", serie: [{ n: 1, reps: "10", kg: "0" }] }])} style={{ width: "100%", padding: "13px", borderRadius: 14, border: `1.5px dashed ${OR}`, background: OR_LIGHT, color: OR, fontWeight: 700, fontSize: 14, fontFamily: "var(--font-display)", cursor: "pointer", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <IcPlus size={16} color={OR} />
          Aggiungi esercizio
        </button>

        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Note</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Aggiungi note..." rows={3} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid " + BORDER, fontSize: 14, color: TEXT, background: CARD, outline: "none", resize: "none", boxSizing: "border-box", marginBottom: 20, fontFamily: "var(--font-body)" }} />
      </div>

      <div style={{ padding: "12px 16px 32px", background: CARD, borderTop: "1px solid " + BORDER, flexShrink: 0 }}>
        <button onClick={onSave} style={{ width: "100%", padding: "16px", borderRadius: 16, background: OR, border: "none", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: `0 6px 20px ${OR}55` }}>
          Salva Allenamento
        </button>
      </div>
    </div>
  );
}

// ─── ACCOUNT ─────────────────────────────────────────────────────────────────
function Account({ goBack }: { goBack: () => void }) {
  const menuItems = [
    { Ic: IcGear, label: "Impostazioni" },
    { Ic: IcBookOpen, label: "Glossario" },
    { Ic: IcMessage, label: "Messaggi" },
    { Ic: IcBell, label: "Notifiche" },
    { Ic: IcShield, label: "Privacy e Sicurezza" },
    { Ic: IcHeadset, label: "Assistenza" },
  ];
  return (
    <div style={{ background: BG, minHeight: "100%", paddingBottom: 40 }}>
      <div style={{ background: CARD, padding: "52px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <BackBtn onBack={goBack} />
        <h1 style={{ flex: 1, margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, textAlign: "center" }}>Account</h1>
        <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid " + BORDER, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <IcPencil size={15} color={TEXT} />
        </button>
      </div>

      <div style={{ padding: "24px 16px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <img src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?w=120&h=120&fit=crop&auto=format" alt="Marco Rossi" style={{ width: 88, height: 88, borderRadius: "50%", objectFit: "cover", border: "3px solid " + BORDER }} />
            <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: OR, border: "2px solid " + CARD, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <IcCamera size={13} color="#fff" />
            </button>
          </div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT }}>Marco Rossi</h2>
          <p style={{ margin: "4px 0 12px", fontSize: 13, color: MUTED }}>marco.rossi@email.com</p>
          <button style={{ background: OR_LIGHT, border: "none", borderRadius: 20, padding: "8px 20px", color: OR, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Modifica profilo
          </button>
        </div>

        <div style={{ background: CARD, borderRadius: 16, padding: "16px", marginBottom: 16, border: "1px solid " + BORDER }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: OR }} />
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: OR, textTransform: "uppercase", letterSpacing: 0.5 }}>Dati personali</p>
          </div>
          {[
            { label: "Età", value: "28 anni" },
            { label: "Altezza", value: "178 cm" },
            { label: "Peso", value: "75 kg" },
            { label: "Obiettivo", value: "Massa muscolare" },
            { label: "Palestra", value: "FitZone Milano" },
            { label: "Personal Trainer", value: "Luca Bianchi" },
          ].map((r, i, arr) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: i < arr.length - 1 ? 10 : 0, marginBottom: i < arr.length - 1 ? 10 : 0, borderBottom: i < arr.length - 1 ? "1px solid " + BORDER : "none" }}>
              <span style={{ fontSize: 14, color: MUTED }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{r.value}</span>
            </div>
          ))}
        </div>

        {menuItems.map((item) => (
          <button key={item.label} style={{ width: "100%", background: CARD, border: "1px solid " + BORDER, borderRadius: 14, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: OR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <item.Ic size={18} color={OR} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{item.label}</span>
            </div>
            <IcChevronRight size={15} color={MUTED} />
          </button>
        ))}

        <button style={{ width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: OR, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, cursor: "pointer", padding: "16px 0" }}>
          <IcLogout size={18} color={OR} />
          Esci
        </button>
      </div>
    </div>
  );
}

// ─── FAB MODAL ───────────────────────────────────────────────────────────────
function FabModal({ onClose, goTo }: { onClose: () => void; goTo: (s: Screen) => void }) {
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "flex-end", zIndex: 50, backdropFilter: "blur(3px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: CARD, borderRadius: "24px 24px 0 0", padding: "8px 20px 36px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ width: 36, height: 4, background: BORDER, borderRadius: 2, margin: "12px auto 22px" }} />
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: TEXT, margin: "0 0 18px" }}>Nuovo allenamento</h3>
        {[
          { Ic: IcClipboard, label: "Segui la mia scheda", sub: "Petto + Tricipiti — Giorno 1", action: () => { onClose(); goTo("scheda"); } },
          { Ic: IcDumbbell, label: "Allenamento libero", sub: "Crea da zero, scegli gli esercizi", action: () => { onClose(); goTo("nuovo"); } },
          { Ic: IcTarget, label: "Allenamento rapido", sub: "Template pronti, inizia subito", action: () => { onClose(); goTo("nuovo"); } },
        ].map((opt) => (
          <button key={opt.label} onClick={opt.action} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, background: BG, border: "1px solid " + BORDER, borderRadius: 16, padding: "14px 16px", marginBottom: 10, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: OR_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <opt.Ic size={20} color={OR} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-display)", color: TEXT }}>{opt.label}</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: MUTED }}>{opt.sub}</p>
            </div>
            <IcChevronRight size={15} color={MUTED} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab, onFab }: { tab: Tab; setTab: (t: Tab) => void; onFab: () => void }) {
  const navItems: { id: Tab; label: string; Ic: React.ComponentType<{ size?: number; color?: string }> }[] = [
    { id: "dashboard", label: "Dashboard", Ic: IcHome },
    { id: "scheda", label: "Scheda", Ic: IcClipboard },
    { id: "dieta", label: "Dieta", Ic: IcApple },
    { id: "storico", label: "Storico", Ic: IcClock },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: CARD, borderTop: "1px solid " + BORDER, height: 80, display: "grid", gridTemplateColumns: "1fr 1fr 72px 1fr 1fr", alignItems: "center", paddingBottom: 14, paddingLeft: 4, paddingRight: 4, zIndex: 20 }}>
      {navItems.slice(0, 2).map((item) => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: "none", background: "transparent", cursor: "pointer", color: tab === item.id ? OR : MUTED, padding: "8px 0 0" }}>
          <item.Ic size={22} color={tab === item.id ? OR : MUTED} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
        </button>
      ))}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <button onClick={onFab} style={{ width: 56, height: 56, borderRadius: 17, background: OR, border: "none", boxShadow: `0 8px 20px ${OR}55`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginTop: -16 }}>
          <IcPlus size={24} color="#fff" />
        </button>
      </div>
      {navItems.slice(2).map((item) => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, border: "none", background: "transparent", cursor: "pointer", color: tab === item.id ? OR : MUTED, padding: "8px 0 0" }}>
          <item.Ic size={22} color={tab === item.id ? OR : MUTED} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [overlay, setOverlay] = useState<"account" | "nuovo" | null>(null);
  const [fabOpen, setFabOpen] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  function goTo(s: Screen) {
    if (s === "account" || s === "nuovo") { setOverlay(s); }
    else { setTab(s as Tab); }
    setFabOpen(false);
  }

  function handleSave() {
    setOverlay(null);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#D0D0D0" }}>
      <div style={{ width: 390, height: 844, background: BG, borderRadius: 44, overflow: "hidden", position: "relative", boxShadow: "0 40px 80px rgba(0,0,0,0.3), 0 0 0 10px #1A1A1A, 0 0 0 13px #444" }}>

        {/* Status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44, background: CARD, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 30 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <svg width="17" height="12" viewBox="0 0 17 12"><rect x="0" y="3.5" width="3" height="8.5" rx="0.5" fill={TEXT} /><rect x="4.5" y="2" width="3" height="10" rx="0.5" fill={TEXT} /><rect x="9" y="0.5" width="3" height="11.5" rx="0.5" fill={TEXT} /><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={TEXT} opacity="0.3" /></svg>
            <svg width="16" height="12" viewBox="0 0 24 18"><path d="M1 5C8 0 16 0 23 5" stroke={TEXT} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M4 9C9 5.5 15 5.5 20 9" stroke={TEXT} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M8 13C10 11 14 11 16 13" stroke={TEXT} strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="12" cy="17" r="1.5" fill={TEXT} /></svg>
            <div style={{ width: 22, height: 11, border: `1.5px solid ${TEXT}`, borderRadius: 3, padding: "1.5px", display: "flex", alignItems: "stretch", position: "relative" }}>
              <div style={{ width: "80%", background: TEXT, borderRadius: 1.5 }} />
              <div style={{ position: "absolute", right: -4, top: "50%", transform: "translateY(-50%)", width: 2.5, height: 5, background: TEXT, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", inset: 0, overflowY: "auto", overflowX: "hidden" }}>
          {tab === "dashboard" && !overlay && <Dashboard goTo={goTo} />}
          {tab === "scheda" && !overlay && <Scheda goBack={() => setTab("dashboard")} />}
          {tab === "dieta" && !overlay && <Dieta goBack={() => setTab("dashboard")} />}
          {tab === "storico" && !overlay && <Storico goBack={() => setTab("dashboard")} />}
          {overlay === "account" && <Account goBack={() => setOverlay(null)} />}
          {overlay === "nuovo" && <NuovoAllenamento goBack={() => setOverlay(null)} onSave={handleSave} />}
        </div>

        {!overlay && <BottomNav tab={tab} setTab={(t) => { setTab(t); setFabOpen(false); }} onFab={() => setFabOpen(v => !v)} />}
        {fabOpen && !overlay && <FabModal onClose={() => setFabOpen(false)} goTo={goTo} />}

        {savedToast && (
          <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "#1A1A1A", color: "#fff", padding: "10px 20px", borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", zIndex: 60, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 7 }}>
            <IcCheckCircle size={16} color={OR} />
            Allenamento salvato!
          </div>
        )}
      </div>
    </div>
  );
}
