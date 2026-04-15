import { useState, useEffect, useRef } from "react";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  forest:     "#0e4f2f",
  forestDeep: "#0a3a22",
  forestMid:  "#155c38",
  green:      "#4a9e6b",
  greenLight: "#6ab88a",
  greenPale:  "#edf7f1",
  greenFaint: "#f3faf6",
  ink:        "#0e1a14",
  inkMid:     "#3d5047",
  inkLight:   "#6b7a72",
  inkFaint:   "#9aaba2",
  canvas:     "#f7f6f3",
  white:      "#ffffff",
  border:     "#e4e9e6",
  borderMid:  "#d0d9d4",
  amber:      "#d97706",
  amberPale:  "#fffbeb",
  red:        "#dc2626",
  redPale:    "#fef2f2",
};

const DISPLAY = "'Lora', Georgia, serif";
const BODY    = "'DM Sans', -apple-system, sans-serif";

// ─── Hooks ──────────────────────────────────────────────────────────────────────
const SEP_2026 = new Date("2026-09-01T00:00:00").getTime();

function useCountdown() {
  const calc = () => {
    const d = Math.max(0, SEP_2026 - Date.now());
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      mins:  Math.floor((d / 60000) % 60),
      secs:  Math.floor((d / 1000) % 60),
    };
  };
  const [t, set] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => set(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function useReveal(delay = 0) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setOn(true); },
        { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, {
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
  }];
}

function useScrolled() {
  const [s, set] = useState(false);
  useEffect(() => {
    const fn = () => set(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return s;
}

// ─── Icons ──────────────────────────────────────────────────────────────────────
const Icon = {
  check: (col = T.green, size = 13) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2.5" style={{ flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
  ),
  cross: (col = T.red, size = 12) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2.5">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
  ),
  shield: (col = T.forest, size = 22) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
  ),
  settings: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
  ),
  bolt: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
  ),
  file: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
  ),
  pill: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <path d="M10.5 20.5 3.5 13.5a5 5 0 0 1 7.07-7.07l7 7a5 5 0 0 1-7.07 7.07z" />
        <line x1="8.5" y1="11.5" x2="15.5" y2="4.5" />
      </svg>
  ),
  tag: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
  ),
  clipboard: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
  ),
  bell: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
  ),
  search: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
  ),
  building: (col = T.inkMid, size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="1.75">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
  ),
  alertTriangle: (col = T.red, size = 16) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
  ),
  clock: (col = T.amber, size = 16) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
  ),
  users: (col = T.amber, size = 16) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
  ),
  xCircle: (col = T.red, size = 16) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
      </svg>
  ),
  checkCircle: (col = T.green, size = 16) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
  ),
};

// ─── Shared components ──────────────────────────────────────────────────────────
function Logo({ dark = false }) {
  return (
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <svg width="28" height="32" viewBox="0 0 40 44" fill="none">
          <rect x="6" y="4" width="5.5" height="36" rx="2.5" fill={T.green} />
          <path d="M11.5 4 Q30 4 30 16 Q30 28 11.5 28" stroke={T.green} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="31" cy="7" r="4.5" fill={T.green} />
        </svg>
        <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 21, letterSpacing: "-0.015em", color: dark ? T.white : T.ink, lineHeight: 1 }}>
        Prescripia
      </span>
      </div>
  );
}

function Eyebrow({ children, light = false, center = false }) {
  return (
      <div style={{
        fontFamily: BODY, fontSize: 11, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: light ? T.greenLight : T.green,
        marginBottom: 14, textAlign: center ? "center" : "left",
      }}>
        {children}
      </div>
  );
}

function H2({ children, light = false, center = false, style: s = {} }) {
  return (
      <h2 style={{
        fontFamily: DISPLAY, fontSize: "clamp(28px,3.6vw,44px)",
        fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em",
        color: light ? T.white : T.ink,
        textAlign: center ? "center" : "left",
        ...s,
      }}>
        {children}
      </h2>
  );
}

function PrimaryBtn({ label, href = "#pricing", size = "md", onClick }) {
  const [hov, setHov] = useState(false);
  const lg = size === "lg";
  return (
      <a
          href={href}
          onClick={onClick}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            fontFamily: BODY, fontWeight: 700, fontSize: lg ? 16 : 14,
            textDecoration: "none", letterSpacing: "0.01em",
            padding: lg ? "15px 32px" : "11px 22px", borderRadius: 100,
            background: hov ? T.forestDeep : T.forest,
            color: T.white,
            transition: "all .18s",
            transform: hov ? "translateY(-1px)" : "none",
            boxShadow: hov ? "0 8px 24px rgba(14,79,47,0.3)" : "0 2px 8px rgba(14,79,47,0.15)",
          }}
      >
        {label}
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: lg ? 28 : 22, height: lg ? 28 : 22, borderRadius: "50%",
          background: "rgba(255,255,255,0.18)", fontSize: lg ? 14 : 12,
          transition: "transform .18s",
          transform: hov ? "translateX(2px)" : "none",
        }}>
        →
      </span>
      </a>
  );
}

function OutlineBtn({ label, href = "#how-it-works", light = false }) {
  return (
      <a
          href={href}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: BODY, fontWeight: 600, fontSize: 15,
            textDecoration: "none",
            color: light ? "rgba(255,255,255,0.7)" : T.inkMid,
            padding: "11px 22px", borderRadius: 100,
            border: `1.5px solid ${light ? "rgba(255,255,255,0.2)" : T.borderMid}`,
          }}
      >
        {label}
      </a>
  );
}

// ─── Dashboard mockup ───────────────────────────────────────────────────────────
function DashboardMockup() {
  const rows = [
    { name: "Rufus (Labrador)",  med: "Metacam 1.5 mg/ml",  vet: "Dr. Taylor", status: "Compliant", col: T.green },
    { name: "Nola (Cat)",        med: "Gabapentin 100 mg",   vet: "Dr. Carter", status: "Compliant", col: T.green },
    { name: "Barley (Spaniel)",  med: "Apoquel 16 mg",       vet: "Dr. Linje",  status: "Review",    col: T.amber },
  ];
  return (
      <div style={{
        background: T.white, borderRadius: 16, border: `1px solid ${T.border}`,
        overflow: "hidden", fontFamily: BODY,
        boxShadow: "0 24px 64px rgba(14,26,20,0.1), 0 4px 16px rgba(14,26,20,0.06)",
      }}>
        {/* Window chrome */}
        <div style={{ background: T.canvas, borderBottom: `1px solid ${T.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          {["#ff5f56","#ffbd2e","#27c93f"].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: T.inkFaint }}>
            prescripia.com/dashboard
          </div>
        </div>
        {/* Header */}
        <div style={{ padding: "14px 20px 10px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Prescription Tracker</div>
            <div style={{ fontSize: 11, color: T.inkFaint, marginTop: 2 }}>Today · Westgate Vets</div>
          </div>
          <div style={{ background: T.greenPale, color: T.forest, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em" }}>
            CMA READY
          </div>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${T.border}` }}>
          {[["12","Logged today"],["98%","Compliance"],["1","Pending"]].map(([v, l], i) => (
              <div key={i} style={{ padding: "12px 16px", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.ink, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 11, color: T.inkFaint, marginTop: 3 }}>{l}</div>
              </div>
          ))}
        </div>
        {/* Table head */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px", padding: "8px 16px", background: T.canvas }}>
          {["Patient","Medication","Vet","Status"].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint }}>{h}</div>
          ))}
        </div>
        {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 80px", padding: "10px 16px", borderTop: `1px solid ${T.border}`, alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.ink }}>{r.name}</div>
              <div style={{ fontSize: 11, color: T.inkMid }}>{r.med}</div>
              <div style={{ fontSize: 11, color: T.inkLight }}>{r.vet}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: r.col, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: r.col }}>{r.status}</span>
              </div>
            </div>
        ))}
        <div style={{ padding: "10px 16px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 11, color: T.inkFaint }}>Last updated: 14:32 today</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.green, cursor: "pointer" }}>Export evidence PDF →</div>
        </div>
      </div>
  );
}

// ─── Nav ────────────────────────────────────────────────────────────────────────
function Nav() {
  const scrolled = useScrolled();
  return (
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, height: 62,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 clamp(24px,5vw,80px)",
        background: scrolled ? "rgba(247,246,243,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition: "all .3s ease",
      }}>
        <Logo />
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <div style={{ display: "flex", gap: 26 }}>
            {["Features","Pricing","FAQ"].map(l => (
                <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    style={{ fontFamily: BODY, fontSize: 14, fontWeight: 500, color: T.inkMid, textDecoration: "none" }}
                >
                  {l}
                </a>
            ))}
          </div>
          <PrimaryBtn label="Get CMA Ready" href="#pricing" size="sm" />
        </div>
      </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────────
function Hero() {
  return (
      <section style={{ background: T.canvas, paddingTop: 62, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle, ${T.borderMid} 1px, transparent 1px)`,
          backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 50%, ${T.canvas} 100%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "88px clamp(20px,6vw,80px) 80px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              {/* Urgency pill */}
              <div style={{ animation: "fadeUp .5s ease .05s both" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: T.amberPale, color: T.amber,
                fontSize: 12, fontWeight: 600,
                padding: "5px 13px", borderRadius: 20,
                letterSpacing: "0.04em", marginBottom: 28,
                border: "1px solid #fde68a",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.amber, display: "inline-block" }} />
                CMA Orders enforceable September 2026
              </span>
              </div>

              <h1 style={{
                fontFamily: DISPLAY, fontSize: "clamp(36px,4.2vw,54px)", fontWeight: 700,
                lineHeight: 1.1, letterSpacing: "-0.03em", color: T.ink,
                marginBottom: 24, animation: "fadeUp .6s ease .15s both",
              }}>
                Could your practice prove<br />
                <span style={{ color: T.forest }}>CMA compliance</span><br />
                right now?
              </h1>

              <p style={{
                fontFamily: BODY, fontSize: "clamp(16px,1.6vw,18px)", color: T.inkMid,
                lineHeight: 1.75, maxWidth: 460, marginBottom: 16,
                animation: "fadeUp .6s ease .28s both",
              }}>
                Prescripia gives UK independent practices a complete, inspection-ready compliance trail. Prescription records, price transparency, written estimates and complaints. Logged in seconds, evidenced on demand.
              </p>

              {/* Credibility badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: T.greenPale, borderRadius: 8,
                padding: "7px 13px", marginBottom: 32,
                animation: "fadeUp .6s ease .35s both",
              }}>
                {Icon.check(T.forest, 14)}
                <span style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: T.forest }}>
                Built by an MRCVS. Mapped directly to the CMA Final Report.
              </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, animation: "fadeUp .6s ease .42s both" }}>
                <PrimaryBtn label="Get CMA Ready" href="#pricing" size="lg" />
                <OutlineBtn label="See how it works" href="#how-it-works" />
              </div>

              <div style={{ fontFamily: BODY, fontSize: 13, color: T.inkFaint, animation: "fadeUp .6s ease .52s both" }}>
                14-day free trial &nbsp;·&nbsp; No card required &nbsp;·&nbsp; Ready in under 10 minutes
              </div>
            </div>

            <div style={{ animation: "fadeUp .7s ease .3s both" }}>
              <DashboardMockup />
            </div>
          </div>
        </div>
      </section>
  );
}

// ─── Trust bar ───────────────────────────────────────────────────────────────────
function TrustBar() {
  const stats = [
    { n: "5,300+",   l: "UK practices affected" },
    { n: "21",       l: "mandatory CMA remedies" },
    { n: "Sep 2026", l: "Orders enforceable" },
    { n: "5%",       l: "maximum turnover fine" },
  ];
  return (
      <div style={{ background: T.forest, padding: "20px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          {stats.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
                {i > 0 && <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.1)", marginRight: 10 }} />}
                <div>
                  <div style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 700, color: T.white, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: BODY, fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2, letterSpacing: "0.04em" }}>{s.l}</div>
                </div>
              </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: BODY, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
            {Icon.check(T.green, 13)}
            Source: CMA Final Report, March 2026
          </div>
        </div>
      </div>
  );
}

// ─── Pain section ────────────────────────────────────────────────────────────────
function PainSection() {
  const pains = [
    {
      icon: Icon.file(T.inkMid, 18),
      title: "The spreadsheet nobody updates",
      body: "Someone set it up in the spring. It is now blank. When an inspector asks for prescription rights evidence, you will be reconstructing months of consultations from memory.",
      highlight: false,
    },
    {
      icon: Icon.clock(T.amber, 18),
      title: "The complaint nobody tracked",
      body: "The CMA requires acknowledgement within five working days and resolution within eight weeks. One missed deadline is a documented breach. There is no grace period.",
      highlight: false,
    },
    {
      icon: Icon.tag(T.inkMid, 18),
      title: "A price list that is six months out of date",
      body: "Published prices must be current and displayed in practice and online. An outdated PDF from last year is not compliance. It is evidence of non-compliance.",
      highlight: false,
    },
    {
      icon: Icon.users(T.amber, 18),
      title: "Every vet logging differently",
      body: "One vet records everything. One records nothing. The locum has not heard of the CMA. The gap in your evidence lives wherever your least consistent team member is.",
      highlight: false,
    },
    {
      icon: Icon.alertTriangle(T.red, 18),
      title: "An inspection with nothing to show",
      body: "The Orders are binding. The CMA can impose financial penalties of up to 5% of annual turnover. For an average independent practice, that is between £15,000 and £30,000.",
      highlight: true,
    },
  ];
  const [ref, style] = useReveal();
  return (
      <section style={{ background: T.white, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div ref={ref} style={style}>
            <Eyebrow>The cost of doing nothing</Eyebrow>
            <H2 s={{ maxWidth: 540, marginBottom: 16 }}>
              September 2026 is not a suggestion.
              <br />It is a binding legal obligation.
            </H2>
            <p style={{ fontFamily: BODY, fontSize: 16, color: T.inkMid, lineHeight: 1.75, maxWidth: 560, marginBottom: 52 }}>
              The CMA Final Report imposes 21 mandatory remedies on every UK veterinary practice. Independent practices have no compliance team. Most have no system. Here is what that looks like.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {pains.map((p, i) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
              const [r, s] = useReveal(i * 60);
              return (
                  <div key={i} ref={r} style={{
                    ...s, padding: "24px 22px",
                    background: p.highlight ? T.redPale : T.canvas,
                    border: `1px solid ${p.highlight ? "#fecaca" : T.border}`,
                    borderRadius: 12,
                  }}>
                    <div style={{ marginBottom: 12 }}>{p.icon}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, color: p.highlight ? T.red : T.ink, lineHeight: 1.35, marginBottom: 8 }}>
                      {p.title}
                    </div>
                    <div style={{ fontFamily: BODY, fontSize: 13, color: p.highlight ? "#991b1b" : T.inkMid, lineHeight: 1.7 }}>
                      {p.body}
                    </div>
                  </div>
              );
            })}
            {/* Positive resolution card */}
            {(() => {
              const [r, s] = useReveal(5 * 60);
              return (
                  <div ref={r} style={{
                    ...s, padding: "24px 22px",
                    background: T.greenPale, border: "1px solid #bbf7d0",
                    borderRadius: 12, display: "flex", flexDirection: "column", justifyContent: "center",
                  }}>
                    <div style={{ marginBottom: 12 }}>{Icon.checkCircle(T.forest, 20)}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 700, color: T.forest, lineHeight: 1.35, marginBottom: 8 }}>
                      A complete evidence trail, ready today.
                    </div>
                    <div style={{ fontFamily: BODY, fontSize: 13, color: T.inkMid, lineHeight: 1.7, marginBottom: 18 }}>
                      Prescripia logs everything as you go. One click produces a dated, inspection-ready evidence pack.
                    </div>
                    <PrimaryBtn label="Get CMA Ready" href="#pricing" size="sm" />
                  </div>
              );
            })()}
          </div>
        </div>
      </section>
  );
}

// ─── How it works ────────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Icon.settings(T.inkMid, 22),
      iconDark: Icon.settings("rgba(255,255,255,0.5)", 22),
      title: "Set up in under ten minutes",
      body: "Add your practice prices, your team and your sites. Prescripia maps everything to the 14 CMA remedies automatically. Nothing to configure manually.",
    },
    {
      n: "02",
      icon: Icon.bolt(T.inkMid, 22),
      iconDark: Icon.bolt("rgba(255,255,255,0.5)", 22),
      title: "Log in 30 seconds per patient",
      body: "Every prescription rights conversation, written estimate and complaint is recorded before you move to the next room. Fast enough that the whole team does it, every time.",
    },
    {
      n: "03",
      icon: Icon.file(T.inkMid, 22),
      iconDark: Icon.file("rgba(255,255,255,0.5)", 22),
      title: "Audit-ready evidence on demand",
      body: "One button generates a complete, dated evidence bundle covering every consultation, complaint and price list change. Timestamped. Formatted for inspection.",
    },
  ];
  const [ref, style] = useReveal();
  return (
      <section id="how-it-works" style={{ background: T.canvas, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div ref={ref} style={style}>
            <Eyebrow>How it works</Eyebrow>
            <H2 s={{ maxWidth: 440, marginBottom: 56 }}>Built for the 30 seconds between patients.</H2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {steps.map((s, i) => {
              const [r, st] = useReveal(i * 100);
              const isDark = i === 1;
              return (
                  <div key={i} ref={r} style={{
                    ...st, padding: "36px 30px",
                    background: isDark ? T.forest : T.white,
                    borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : "0",
                    border: !isDark ? `1px solid ${T.border}` : "none",
                    position: "relative",
                  }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: 11, fontWeight: 700, color: isDark ? "rgba(255,255,255,0.15)" : T.border, marginBottom: 16, letterSpacing: "0.05em" }}>
                      {s.n}
                    </div>
                    <div style={{ marginBottom: 14 }}>{isDark ? s.iconDark : s.icon}</div>
                    <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: isDark ? T.white : T.ink, lineHeight: 1.3, marginBottom: 10 }}>
                      {s.title}
                    </div>
                    <div style={{ fontFamily: BODY, fontSize: 13, color: isDark ? "rgba(255,255,255,0.55)" : T.inkMid, lineHeight: 1.7 }}>
                      {s.body}
                    </div>
                    {i < 2 && (
                        <div style={{
                          position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)",
                          width: 22, height: 22, borderRadius: "50%",
                          background: T.white, border: `1px solid ${T.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          zIndex: 1, fontSize: 11, color: T.inkFaint,
                        }}>
                          ›
                        </div>
                    )}
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Icon.pill(T.forest, 18),
    tag: "Remedy 6",
    title: "Prescription Rights Tracker",
    outcome: "Every consultation covered, every time",
    body: "Logs in under 30 seconds per patient. Records the medication choice, own-brand alternatives offered and prescription fee compliance. Automatically flagged if anything is missing.",
    cma: "CMA Remedy 6 requires evidence that clients were informed of their right to a written prescription at every relevant consultation.",
  },
  {
    icon: Icon.tag(T.forest, 18),
    tag: "Remedy 3",
    title: "Price List Generator",
    outcome: "Your website sorted today, not next quarter",
    body: "Builds a fully CMA-compliant published price list across all required treatment categories. Correctly formatted and ready to upload. Updated in one place, applied everywhere.",
    cma: "CMA Remedy 3 requires all practices to publish a standard price list covering specified treatments on their website and in practice.",
  },
  {
    icon: Icon.clipboard(T.forest, 18),
    tag: "Remedy 4",
    title: "Written Estimates",
    outcome: "The £500 threshold, never missed",
    body: "Auto-prompts a written estimate the moment a case crosses the cost threshold. Generates itemised bills, tracks quoted against actual and stores every estimate with a timestamp.",
    cma: "CMA Remedy 4 requires a written estimate before any treatment expected to exceed the specified cost threshold.",
  },
  {
    icon: Icon.bell(T.forest, 18),
    tag: "Remedy 9",
    title: "Complaints Manager",
    outcome: "Every deadline met, every time",
    body: "Tracks complaints from first contact to resolution. Five-day acknowledgement and eight-week resolution windows are monitored automatically. Nothing falls through the gap.",
    cma: "CMA Remedy 9 mandates a formal complaints process with specific response and resolution timeframes for all UK veterinary practices.",
  },
  {
    icon: Icon.search(T.forest, 18),
    tag: "All 14 remedies",
    title: "Compliance Dashboard",
    outcome: "Know exactly where you stand",
    body: "A single view across all 14 CMA requirements. What is complete, what needs attention and what the Orders actually require of your practice — in plain language, not legal text.",
    cma: "The CMA's 21 remedies cover pricing, prescriptions, estimates, complaints, ownership transparency and cremation pricing.",
  },
  {
    icon: Icon.building(T.forest, 18),
    tag: "Multi-site",
    title: "Group Compliance",
    outcome: "One account across every practice you run",
    body: "Each site keeps its own records and audit trail. Group reporting surfaces compliance across your entire estate from a single dashboard, without chasing individual practices.",
    cma: "Corporate groups and multi-site independents must demonstrate compliance across all FOPs. The RCVS will monitor and report breaches to the CMA.",
  },
];

function FeatureCard({ f, i }) {
  const [ref, style] = useReveal(i * 55);
  const [exp, setExp] = useState(false);
  return (
      <div ref={ref} style={{
        ...style, background: T.white, border: `1px solid ${T.border}`,
        borderRadius: 12, padding: "24px 22px", display: "flex", flexDirection: "column", gap: 10,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: T.greenPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {f.icon}
          </div>
          <span style={{ fontFamily: BODY, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.inkFaint, background: T.canvas, padding: "3px 9px", borderRadius: 4 }}>
          {f.tag}
        </span>
        </div>
        <div>
          <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: T.ink, lineHeight: 1.3, marginBottom: 4 }}>
            {f.title}
          </div>
          <div style={{ fontFamily: BODY, fontSize: 12, fontWeight: 600, color: T.green }}>
            {f.outcome}
          </div>
        </div>
        <div style={{ fontFamily: BODY, fontSize: 13, color: T.inkMid, lineHeight: 1.65, flex: 1 }}>
          {f.body}
        </div>
        <button
            onClick={() => setExp(!exp)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", gap: 5,
              fontFamily: BODY, fontSize: 11, fontWeight: 600, color: T.inkFaint, textAlign: "left",
            }}
        >
          <span style={{ transform: exp ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform .2s" }}>›</span>
          What the CMA requires
        </button>
        {exp && (
            <div style={{ fontFamily: BODY, fontSize: 12, color: T.inkMid, background: T.greenFaint, padding: "10px 12px", borderRadius: 6, borderLeft: `3px solid ${T.green}`, lineHeight: 1.6 }}>
              {f.cma}
            </div>
        )}
      </div>
  );
}

function Features() {
  const [ref, style] = useReveal();
  return (
      <section id="features" style={{ background: T.white, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div ref={ref} style={{ ...style, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <div>
              <Eyebrow>Features</Eyebrow>
              <H2 s={{ maxWidth: 400 }}>Every requirement covered. Nothing added for show.</H2>
            </div>
            <p style={{ fontFamily: BODY, fontSize: 14, color: T.inkMid, maxWidth: 300, lineHeight: 1.7 }}>
              Each module maps to a named CMA remedy. Select any card to see the exact requirement it satisfies.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(288px,1fr))", gap: 14 }}>
            {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
          </div>
        </div>
      </section>
  );
}

// ─── Before / After ───────────────────────────────────────────────────────────────
function BeforeAfter() {
  const [hoverLeft,  setHoverLeft]  = useState(null);
  const [hoverRight, setHoverRight] = useState(null);
  const [ref, style] = useReveal();

  const left = [
    {
      icon: Icon.xCircle(T.red, 15),
      title: "No evidence trail",
      body: "An inspector asks for six months of prescription records. You have a spreadsheet with eight rows and a gap from December.",
      tag: "Compliance risk",
      tagColor: T.red,
      tagBg: "#fef2f2",
    },
    {
      icon: Icon.xCircle(T.red, 15),
      title: "Every deadline a gamble",
      body: "Complaint acknowledgement is due in five days. Nobody tracked when it came in. Someone thinks it was Tuesday. Someone else says Monday.",
      tag: "Operational risk",
      tagColor: "#b45309",
      tagBg: "#fffbeb",
    },
    {
      icon: Icon.xCircle(T.red, 15),
      title: "Every vet doing it differently",
      body: "One vet logs everything. One logs nothing. One locum has never heard of the CMA. The evidence gap lives wherever your least consistent team member is.",
      tag: "Staff inconsistency",
      tagColor: "#b45309",
      tagBg: "#fffbeb",
    },
    {
      icon: Icon.xCircle(T.red, 15),
      title: "Prices published nowhere",
      body: "The Orders require a current, published price list in practice and online. The PDF on your website is from 2024 and missing seven treatment categories.",
      tag: "Immediate breach",
      tagColor: T.red,
      tagBg: "#fef2f2",
    },
    {
      icon: Icon.xCircle(T.red, 15),
      title: "Dread before every inspection",
      body: "You know the records are incomplete. The question is whether anyone asks. That is not a compliance position. It is a liability waiting to be found.",
      tag: "Up to 5% turnover fine",
      tagColor: T.red,
      tagBg: "#fef2f2",
    },
  ];

  const right = [
    {
      icon: Icon.checkCircle(T.forest, 15),
      title: "Complete evidence trail, always current",
      body: "Every prescription rights conversation timestamped. Every consultation logged. One click generates a dated evidence pack formatted for inspection.",
      tag: "Audit ready",
      tagColor: T.forest,
      tagBg: T.greenPale,
    },
    {
      icon: Icon.checkCircle(T.forest, 15),
      title: "Every deadline tracked automatically",
      body: "Complaints are flagged the moment they arrive. Five-day and eight-week windows are tracked in real time. Nothing slips. Nothing is left to memory.",
      tag: "Zero missed deadlines",
      tagColor: T.forest,
      tagBg: T.greenPale,
    },
    {
      icon: Icon.checkCircle(T.forest, 15),
      title: "One process across every vet",
      body: "30 seconds per consultation. Whether it is a partner, a new hire or a locum on a Friday, the same record is created every time.",
      tag: "Whole team consistent",
      tagColor: T.forest,
      tagBg: T.greenPale,
    },
    {
      icon: Icon.checkCircle(T.forest, 15),
      title: "Price list built and maintained",
      body: "Prescripia generates a CMA-compliant published price list across all required treatment categories. Update in one place. Applied everywhere.",
      tag: "Remedy 3 covered",
      tagColor: T.forest,
      tagBg: T.greenPale,
    },
    {
      icon: Icon.checkCircle(T.forest, 15),
      title: "Confidence before any inspection",
      body: "You know the records are complete because the system makes it so. That is a fundamentally different professional position.",
      tag: "Protected",
      tagColor: T.forest,
      tagBg: T.greenPale,
    },
  ];

  const ColItem = ({ item, side, idx, hovIdx, setHov }) => {
    const isLeft = side === "left";
    const isHov  = hovIdx === idx;
    return (
        <div
            onMouseEnter={() => setHov(idx)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: "flex", gap: 14, padding: "18px 20px",
              borderBottom: `1px solid ${isLeft ? "rgba(220,38,38,0.1)" : "rgba(14,79,47,0.1)"}`,
              background: isHov
                  ? (isLeft ? "rgba(220,38,38,0.04)" : "rgba(14,79,47,0.04)")
                  : "transparent",
              transition: "background .2s ease",
              cursor: "default",
            }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: isLeft ? "#fef2f2" : T.greenPale,
            transition: "transform .2s ease",
            transform: isHov ? "scale(1.08)" : "scale(1)",
          }}>
            {item.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: isLeft ? "#7f1d1d" : T.forest, lineHeight: 1.3 }}>
              {item.title}
            </span>
              <span style={{
                fontFamily: BODY, fontSize: 10, fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: item.tagColor, background: item.tagBg,
                padding: "3px 8px", borderRadius: 4,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
              {item.tag}
            </span>
            </div>
            <p style={{ fontFamily: BODY, fontSize: 13, lineHeight: 1.7, color: isLeft ? "#991b1b" : T.inkMid, opacity: isLeft ? 0.85 : 0.9, margin: 0 }}>
              {item.body}
            </p>
          </div>
        </div>
    );
  };

  return (
      <section style={{ background: T.canvas, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div ref={ref} style={{ ...style, textAlign: "center", marginBottom: 56 }}>
            <Eyebrow center>Two positions. One choice.</Eyebrow>
            <H2 center s={{ maxWidth: 600, margin: "0 auto 16px" }}>
              Every independent practice in September 2026.{" "}
              <span style={{ color: T.forest }}>Which one is yours?</span>
            </H2>
            <p style={{ fontFamily: BODY, fontSize: 16, color: T.inkMid, lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
              The CMA Orders are binding for all 5,300 UK practices. The difference between exposure and confidence is a system that takes 30 seconds per consultation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 32px rgba(14,26,20,0.08), 0 1px 4px rgba(14,26,20,0.04)" }}>
            {/* Left */}
            <div style={{ background: "#fff8f8", borderRight: "1px solid rgba(220,38,38,0.12)" }}>
              <div style={{ padding: "20px 24px 18px", background: "#fef2f2", borderBottom: "1px solid rgba(220,38,38,0.12)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Icon.cross(T.red, 11)}
                </div>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.red }}>
                    Without Prescripia
                  </div>
                  <div style={{ fontFamily: BODY, fontSize: 12, color: "#991b1b", opacity: 0.7, marginTop: 1 }}>
                    Exposed. Inconsistent. Unprovable.
                  </div>
                </div>
              </div>
              {left.map((item, i) => (
                  <ColItem key={i} item={item} side="left" idx={i} hovIdx={hoverLeft} setHov={setHoverLeft} />
              ))}
            </div>

            {/* Right */}
            <div style={{ background: T.greenFaint }}>
              <div style={{ padding: "20px 24px 18px", background: T.greenPale, borderBottom: `1px solid rgba(14,79,47,0.12)`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {Icon.check(T.forest, 11)}
                </div>
                <div>
                  <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.forest }}>
                    With Prescripia
                  </div>
                  <div style={{ fontFamily: BODY, fontSize: 12, color: T.forestMid, opacity: 0.75, marginTop: 1 }}>
                    Organised. Evidenced. Protected.
                  </div>
                </div>
              </div>
              {right.map((item, i) => (
                  <ColItem key={i} item={item} side="right" idx={i} hovIdx={hoverRight} setHov={setHoverRight} />
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "24px 32px", background: T.white, border: `1px solid ${T.border}`, borderRadius: 12 }}>
            <div>
              <div style={{ fontFamily: DISPLAY, fontSize: 17, fontWeight: 700, color: T.ink, marginBottom: 4 }}>
                The right position costs £99 a month.
              </div>
              <div style={{ fontFamily: BODY, fontSize: 13, color: T.inkMid, lineHeight: 1.6 }}>
                14-day free trial. No card required. Running before your next consult.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <PrimaryBtn label="Get CMA Ready" href="#pricing" size="md" />
              <OutlineBtn label="See how it works" href="#how-it-works" />
            </div>
          </div>
        </div>
      </section>
  );
}

// ─── Objections ──────────────────────────────────────────────────────────────────
function Objections() {
  const items = [
    {
      obj: "We can manage compliance ourselves with spreadsheets.",
      ans: "The question is not whether you can manage it. It is whether you can prove it. A spreadsheet with gaps is not evidence. A timestamped, dated audit trail is. When an inspector asks, they want the latter.",
    },
    {
      obj: "We are too busy to add another system.",
      ans: "Prescripia is designed for 30 seconds per consultation. If your team can log a note in your practice management system, they can log compliance in Prescripia. The system adds no meaningful time. Not having it adds significant legal exposure.",
    },
    {
      obj: "The September deadline is still months away.",
      ans: "Practices that start now will have months of clean records when enforcement begins. The CMA will ask for evidence going back to when the Orders came into force. Starting in August gives you days of evidence. Starting today gives you a complete trail.",
    },
    {
      obj: "We are a small practice. The CMA will focus on the big corporates.",
      ans: "The Orders apply to all 5,300 UK practices regardless of size. The CMA's remedies package specifically addresses independent practices. There is no small-practice exemption.",
    },
    {
      obj: "We already have RoboVet. Can we not use that?",
      ans: "RoboVet manages patient records and clinical workflow. It does not log prescription rights conversations, generate compliant price lists, track complaint deadlines or produce a CMA evidence bundle. These are separate obligations. Prescripia sits alongside your practice management system. It does not replace it.",
    },
  ];
  const [open, setOpen] = useState(null);
  const [ref, style] = useReveal();
  return (
      <section style={{ background: T.white, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div ref={ref} style={style}>
            <Eyebrow>Common questions</Eyebrow>
            <H2 s={{ marginBottom: 12 }}>The objections we hear most.</H2>
            <p style={{ fontFamily: BODY, fontSize: 15, color: T.inkMid, lineHeight: 1.7, marginBottom: 48 }}>
              We would rather answer them here than leave them unaddressed.
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {items.map((item, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <button
                      onClick={() => setOpen(open === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", gap: 16, textAlign: "left" }}
                  >
                <span style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>
                  "{item.obj}"
                </span>
                    <span style={{ fontFamily: BODY, fontSize: 18, color: T.green, flexShrink: 0, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block", lineHeight: 1, marginTop: 2 }}>
                  +
                </span>
                  </button>
                  <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <p style={{ fontFamily: BODY, fontSize: 14, color: T.inkMid, lineHeight: 1.75, paddingBottom: 22 }}>
                      {item.ans}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Solo",
    price: "£49",
    desc: "Single-vet or single-site practice",
    features: [
      "All 6 compliance modules",
      "Prescription rights tracker",
      "CMA-compliant price list generator",
      "PDF evidence export",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
    note: "Under £1.65 per day",
  },
  {
    name: "Practice",
    price: "£99",
    desc: "Multi-vet or small group practice",
    features: [
      "Everything in Solo",
      "Multiple user accounts",
      "Written estimates tracker",
      "Full complaints management",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlight: true,
    note: "Under £3.30 per day",
  },
  {
    name: "Group",
    price: "£179",
    desc: "Multi-site independent group",
    features: [
      "Everything in Practice",
      "Unlimited sites",
      "Group compliance dashboard",
      "Site-by-site reporting",
      "Onboarding call included",
    ],
    cta: "Book a Demo",
    highlight: false,
    note: "From £25 per site per month",
  },
];

function PricingCard({ p, i }) {
  const [ref, style] = useReveal(i * 100);
  return (
      <div ref={ref} style={{
        ...style,
        background: p.highlight ? T.forest : T.white,
        border: p.highlight ? "none" : `1px solid ${T.border}`,
        borderRadius: 14, padding: "36px 28px",
        display: "flex", flexDirection: "column", gap: 20,
        position: "relative",
        boxShadow: p.highlight ? "0 24px 64px rgba(14,79,47,0.28)" : "none",
      }}>
        {p.highlight && (
            <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: T.green, color: T.white, fontFamily: BODY, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap" }}>
              Most Popular
            </div>
        )}
        <div>
          <div style={{ fontFamily: BODY, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: p.highlight ? T.greenLight : T.green, marginBottom: 8 }}>
            {p.name}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em", color: p.highlight ? T.white : T.ink, lineHeight: 1 }}>
            {p.price}
          </span>
            <span style={{ fontFamily: BODY, fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.4)" : T.inkFaint }}>
            /month
          </span>
          </div>
          <div style={{ fontFamily: BODY, fontSize: 11, color: p.highlight ? T.greenLight : T.green, fontWeight: 600, marginBottom: 4 }}>
            {p.note}
          </div>
          <div style={{ fontFamily: BODY, fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.45)" : T.inkFaint }}>
            {p.desc}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
          {p.features.map((f, j) => (
              <div key={j} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                {Icon.check(T.green, 13)}
                <span style={{ fontFamily: BODY, fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.65)" : T.inkMid, lineHeight: 1.45 }}>
              {f}
            </span>
              </div>
          ))}
        </div>
        <a href="#" style={{ display: "block", textAlign: "center", padding: "13px 20px", borderRadius: 100, fontFamily: BODY, fontWeight: 700, fontSize: 14, textDecoration: "none", background: p.highlight ? T.green : T.forest, color: T.white, letterSpacing: "0.01em" }}>
          {p.cta}
        </a>
      </div>
  );
}

function Pricing() {
  const [ref, style] = useReveal();
  return (
      <section id="pricing" style={{ background: T.canvas, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div ref={ref} style={{ ...style, textAlign: "center", marginBottom: 48 }}>
            <Eyebrow center>Pricing</Eyebrow>
            <H2 center s={{ marginBottom: 12 }}>Start free. Stay because it works.</H2>
            <p style={{ fontFamily: BODY, fontSize: 15, color: T.inkMid, maxWidth: 420, margin: "0 auto" }}>
              14-day free trial on every plan. No card required. Most practices are running within 10 minutes.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px,1fr))", gap: 16, alignItems: "center" }}>
            {PLANS.map((p, i) => <PricingCard key={i} p={p} i={i} />)}
          </div>
          {/* Guarantee */}
          <div style={{ marginTop: 32, padding: "20px 28px", background: T.greenPale, border: "1px solid #bbf7d0", borderRadius: 10, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            {Icon.shield(T.forest, 22)}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 700, color: T.forest, marginBottom: 3 }}>
                30-day compliance guarantee
              </div>
              <div style={{ fontFamily: BODY, fontSize: 13, color: T.inkMid, lineHeight: 1.6 }}>
                Use Prescripia consistently for 30 days. If your compliance dashboard does not reach 100% across every module we cover, we will issue a full refund. No questions asked.
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 16, fontFamily: BODY, fontSize: 13, color: T.inkFaint }}>
            All prices exclude VAT &nbsp;·&nbsp; Cancel any time &nbsp;·&nbsp;
            <a href="mailto:hello@prescripia.com" style={{ color: T.forest, fontWeight: 600, textDecoration: "none" }}>
              {" "}Need a quote for a larger group? →
            </a>
          </div>
        </div>
      </section>
  );
}

// ─── Urgency ──────────────────────────────────────────────────────────────────────
function Urgency() {
  const cd = useCountdown();
  const [ref, style] = useReveal();
  return (
      <section style={{ background: T.white, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "56px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div ref={ref} style={{ ...style, display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ maxWidth: 500 }}>
              <Eyebrow>The window is closing</Eyebrow>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: T.ink, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 14 }}>
                Every week without records is a week you cannot get back.
              </h3>
              <p style={{ fontFamily: BODY, fontSize: 15, color: T.inkMid, lineHeight: 1.75, marginBottom: 12 }}>
                The CMA Orders are not retrospective. You cannot log prescriptions that happened before you started. Practices that begin now will have a complete evidence trail from the first day of enforcement. Practices that wait until August will have days.
              </p>
              <p style={{ fontFamily: BODY, fontSize: 13, color: T.inkFaint, lineHeight: 1.6 }}>
                Source: CMA Final Report, 24 March 2026. Orders expected September 2026.
              </p>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {[["days",cd.days],["hours",cd.hours],["mins",cd.mins],["secs",cd.secs]].map(([label, val], i) => (
                  <div key={i} style={{ textAlign: "center", minWidth: 60 }}>
                    <div style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: T.forest, lineHeight: 1, letterSpacing: "-0.04em" }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <div style={{ fontFamily: BODY, fontSize: 10, color: T.inkFaint, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 5 }}>
                      {label}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Does Prescripia cover what the CMA actually requires?",
    a: "Every module maps directly to a named remedy in the CMA Final Report (March 2026). Prescripia does not make your practice compliant on its own. That depends on your team using it consistently. What it does is give you a system that captures the right evidence in the right format. Without a system, proving compliance is genuinely difficult.",
  },
  {
    q: "How long does setup take?",
    a: "Under 10 minutes for a single-site practice. You add your prices, your team names and your sites. You will have your first prescription logged before your next consultation ends.",
  },
  {
    q: "How is this different from our practice management system?",
    a: "Your PMS handles clinical workflow. Patient records, appointments, dispensing, billing. It does not log prescription rights conversations, generate CMA-compliant price lists, track complaint deadlines or produce a CMA evidence bundle. These are different obligations. Prescripia sits alongside your PMS and covers the compliance gap it was never designed to fill.",
  },
  {
    q: "We have multiple sites. Does the Group plan cover all of them?",
    a: "Yes. Each site maintains its own records and audit trail. The group dashboard shows compliance status across all sites from a single screen. The RCVS will monitor compliance across all FOPs and report group-level breaches to the CMA, so visibility across your whole estate is essential.",
  },
  {
    q: "What exactly does the 30-day guarantee cover?",
    a: "Use Prescripia consistently for 30 days. Log prescriptions, manage your price list and track estimates and complaints. If your dashboard does not show 100% compliance across every module we cover, contact us for a full refund. We are confident the product works and we want to stand behind it.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "No contract and no minimum term. Monthly billing, cancel any time. We would rather keep you because the product earns its place.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, style] = useReveal();
  return (
      <section id="faq" style={{ background: T.canvas, padding: "96px clamp(20px,6vw,80px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div ref={ref} style={style}>
            <Eyebrow>FAQ</Eyebrow>
            <H2 s={{ marginBottom: 12 }}>Everything you need to know.</H2>
            <p style={{ fontFamily: BODY, fontSize: 15, color: T.inkMid, lineHeight: 1.7, marginBottom: 48 }}>
              Not answered here? Email hello@prescripia.com and we will reply the same day.
            </p>
          </div>
          <div style={{ borderTop: `1px solid ${T.border}` }}>
            {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${T.border}` }}>
                  <button
                      onClick={() => setOpen(open === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", gap: 16, textAlign: "left" }}
                  >
                <span style={{ fontFamily: DISPLAY, fontSize: 16, fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>
                  {f.q}
                </span>
                    <span style={{ fontFamily: BODY, fontSize: 18, color: T.green, flexShrink: 0, transition: "transform .25s", transform: open === i ? "rotate(45deg)" : "none", display: "inline-block", lineHeight: 1, marginTop: 2 }}>
                  +
                </span>
                  </button>
                  <div style={{ maxHeight: open === i ? 300 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                    <p style={{ fontFamily: BODY, fontSize: 14, color: T.inkMid, lineHeight: 1.75, paddingBottom: 22 }}>
                      {f.a}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────────
function FinalCTA() {
  const [ref, style] = useReveal();
  const items = [
    "All 6 compliance modules. Prescriptions, prices, estimates, complaints.",
    "Audit-ready PDF evidence export. One click, any time.",
    "Built by an MRCVS. Mapped to the CMA Final Report (March 2026).",
    "30-day compliance guarantee. Full refund if it does not work.",
  ];
  return (
      <section style={{ background: T.forestDeep, padding: "104px clamp(20px,6vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(74,158,107,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(74,158,107,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div ref={ref} style={{ ...style, maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <Eyebrow light center>Start today</Eyebrow>
          <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(36px,5vw,56px)", fontWeight: 700, color: T.white, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Your practice.<br />
            <span style={{ color: T.green }}>Inspection-ready.</span>
          </h2>
          <p style={{ fontFamily: BODY, fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 40px" }}>
            14-day free trial. No card needed. Set up in under 10 minutes, with your first prescription logged before your next consult ends.
          </p>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "18px 24px", marginBottom: 36, textAlign: "left" }}>
            {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < items.length - 1 ? 10 : 0 }}>
                  {Icon.check(T.green, 13)}
                  <span style={{ fontFamily: BODY, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                {item}
              </span>
                </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            <PrimaryBtn label="Start Free Trial" href="#pricing" size="lg" />
            <OutlineBtn label="Book a 15-minute demo" href="mailto:hello@prescripia.com" light />
          </div>
          <div style={{ fontFamily: BODY, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Solo £49 &nbsp;·&nbsp; Practice £99 &nbsp;·&nbsp; Group £179 &nbsp;·&nbsp; per month plus VAT
          </div>
        </div>
      </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────────
function Footer() {
  return (
      <footer style={{ background: "#060d09", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px clamp(20px,5vw,72px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Logo dark />
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy","Terms","Contact"].map(l => (
                <a key={l} href="#" style={{ fontFamily: BODY, fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ fontFamily: BODY, fontSize: 12, color: "rgba(255,255,255,0.15)" }}>
            © 2026 Prescripia. Built by an MRCVS for UK independent veterinary practices.
          </div>
        </div>
      </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; background: #f7f6f3; }
        #features, #pricing, #faq, #how-it-works { scroll-margin-top: 62px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        a { cursor: pointer; }
        button { font-family: inherit; }
      `}</style>
        <Nav />
        <Hero />
        <TrustBar />
        <PainSection />
        <HowItWorks />
        <Features />
        <BeforeAfter />
        <Objections />
        <Pricing />
        <Urgency />
        <FAQ />
        <FinalCTA />
        <Footer />
      </>
  );
}