import { useState, useEffect, useRef } from "react";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
    forest:    "#0e4f2f",
    forestDp:  "#0a3a22",
    forestMid: "#1a6640",
    green:     "#4a9e6b",
    greenLt:   "#6ab88a",
    greenPale: "#edf7f1",
    ink:       "#0c1810",
    inkMid:    "#364840",
    inkLight:  "#647068",
    inkFaint:  "#9eaaa2",
    canvas:    "#f8f7f4",
    canvasDark:"#f0ede8",
    white:     "#ffffff",
    border:    "#e2e8e4",
    borderMd:  "#cdd6d0",
    shadow:    "rgba(12,24,16,0.06)",
    shadowMd:  "rgba(12,24,16,0.12)",
    redPale:   "#fef2f2",
    redBdr:    "#fcd5d5",
    red:       "#b91c1c",
    redText:   "#7f1d1d",
};

const FD = "'IBM Plex Serif', Georgia, serif";
const FB = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

// ─── Hooks ────────────────────────────────────────────────────────────────────
const SEP = new Date("2026-09-01T00:00:00").getTime();

function useCountdown() {
    const get = () => {
        const d = Math.max(0, SEP - Date.now());
        return { days:Math.floor(d/86400000), hours:Math.floor((d/3600000)%24), mins:Math.floor((d/60000)%60), secs:Math.floor((d/1000)%60) };
    };
    const [t, set] = useState(get);
    useEffect(() => { const id = setInterval(() => set(get()), 1000); return () => clearInterval(id); }, []);
    return t;
}

function useReveal(delay = 0) {
    const ref = useRef(null);
    const [on, setOn] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.05 });
        obs.observe(el); return () => obs.disconnect();
    }, []);
    return [ref, { opacity:on?1:0, transform:on?"translateY(0)":"translateY(18px)", transition:`opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms` }];
}

function useScrolled() {
    const [s, set] = useState(false);
    useEffect(() => {
        const fn = () => set(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return s;
}

function useMobile() {
    const [m, set] = useState(typeof window !== "undefined" && window.innerWidth < 768);
    useEffect(() => {
        const fn = () => set(window.innerWidth < 768);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);
    return m;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = {
    rx:        (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
    tag:       (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    gbp:       (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    msg:       (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    grid:      (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    house:     (c=T.green) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    settings:  (c=T.green) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    pulse:     (c="#fff")  => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    file:      (c=T.green) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>,
    check:     (c=T.green) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    x:         (c="#ef4444") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    shield:    (c=T.green) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    clock:     (c=T.green) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    lock:      (c=T.green) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    document:  (c=T.green) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    menu:      () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close:     () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ dark = false, onClick }) {
    return (
        <div onClick={onClick} style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", userSelect:"none" }}>
            <svg width="26" height="30" viewBox="0 0 40 44" fill="none">
                <rect x="6" y="4" width="5.5" height="36" rx="2.5" fill={T.green}/>
                <path d="M11.5 4 Q30 4 30 16 Q30 28 11.5 28" stroke={T.green} strokeWidth="5.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="31" cy="7" r="4.5" fill={T.green}/>
            </svg>
            <span style={{ fontFamily:FD, fontWeight:600, fontSize:19, letterSpacing:"-0.01em", color:dark?T.white:T.ink, lineHeight:1 }}>Prescripia</span>
        </div>
    );
}

// ─── Primitives ───────────────────────────────────────────────────────────────
function Label({ children, light = false }) {
    return <div style={{ fontFamily:FB, fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:light?T.greenLt:T.green, marginBottom:12 }}>{children}</div>;
}

function H1({ children, style = {} }) {
    return <h1 style={{ fontFamily:FD, fontSize:"clamp(32px,4.2vw,54px)", fontWeight:600, lineHeight:1.1, letterSpacing:"-0.025em", color:T.ink, ...style }}>{children}</h1>;
}

function H2({ children, light = false, center = false, style = {} }) {
    return <h2 style={{ fontFamily:FD, fontSize:"clamp(24px,3vw,38px)", fontWeight:600, lineHeight:1.18, letterSpacing:"-0.02em", color:light?T.white:T.ink, textAlign:center?"center":"left", ...style }}>{children}</h2>;
}

function H3({ children, light = false, style = {} }) {
    return <h3 style={{ fontFamily:FD, fontSize:"clamp(16px,1.8vw,20px)", fontWeight:600, lineHeight:1.3, letterSpacing:"-0.015em", color:light?T.white:T.ink, ...style }}>{children}</h3>;
}

function Body({ children, light = false, size = 15, style = {} }) {
    return <p style={{ fontFamily:FB, fontSize:size, lineHeight:1.75, color:light?"rgba(255,255,255,0.58)":T.inkMid, fontWeight:400, margin:0, ...style }}>{children}</p>;
}

// Primary pill CTA
function PrimaryBtn({ label, onClick, size = "md", style = {} }) {
    const [h, setH] = useState(false);
    const lg = size === "lg";
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                display:"inline-flex", alignItems:"center", gap:8,
                fontFamily:FB, fontWeight:600, fontSize:lg?15:13,
                letterSpacing:"0.01em",
                padding:lg?"13px 28px":"9px 18px",
                borderRadius:100,
                background:h?"#093d23":T.forest,
                color:T.white, border:"none", cursor:"pointer",
                transform:h?"translateY(-1px)":"none",
                boxShadow:h?"0 8px 24px rgba(14,79,47,0.3)":"0 2px 8px rgba(14,79,47,0.15)",
                transition:"all .18s",
                ...style
            }}
        >
            {label}
            <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:lg?22:18, height:lg?22:18, borderRadius:"50%", background:"rgba(255,255,255,0.16)", fontSize:lg?11:9, transition:"transform .18s", transform:h?"translateX(2px)":"none" }}>→</span>
        </button>
    );
}

// Ghost outline CTA
function OutlineBtn({ label, onClick, dark = false, style = {} }) {
    const [h, setH] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setH(true)}
            onMouseLeave={() => setH(false)}
            style={{
                display:"inline-flex", alignItems:"center", gap:6,
                fontFamily:FB, fontWeight:500, fontSize:14,
                padding:"10px 20px", borderRadius:100, cursor:"pointer",
                background:"transparent",
                border:`1.5px solid ${dark?"rgba(255,255,255,0.2)":T.borderMd}`,
                color:dark?h?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)":h?T.forest:T.inkMid,
                transition:"all .18s",
                ...style
            }}
        >
            {label}
        </button>
    );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
    const scrolled = useScrolled();
    const mobile = useMobile();
    const [open, setOpen] = useState(false);
    const go = (id) => { setPage(id); setOpen(false); window.scrollTo(0,0); };
    const links = [{ id:"home", label:"Home" }, { id:"features", label:"Features" }, { id:"pricing", label:"Pricing" }, { id:"faq", label:"FAQ" }];

    return (
        <>
            <nav style={{
                position:"fixed", top:0, left:0, right:0, zIndex:400,
                height:60,
                display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:"0 clamp(20px,5vw,80px)",
                background:scrolled||open?"rgba(248,247,244,0.97)":"transparent",
                backdropFilter:scrolled||open?"blur(20px)":"none",
                borderBottom:scrolled||open?`1px solid ${T.border}`:"none",
                transition:"all .3s ease",
            }}>
                <Logo onClick={() => go("home")}/>
                {mobile ? (
                    <button onClick={() => setOpen(o => !o)} style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center" }}>
                        {open ? Icon.close() : Icon.menu()}
                    </button>
                ) : (
                    <div style={{ display:"flex", alignItems:"center", gap:36 }}>
                        <div style={{ display:"flex", gap:6 }}>
                            {links.map(l => (
                                <button key={l.id} onClick={() => go(l.id)} style={{
                                    fontFamily:FB, fontSize:14, fontWeight:400,
                                    color:page===l.id?T.forest:T.inkLight,
                                    background:"none", border:"none", cursor:"pointer",
                                    padding:"6px 12px", borderRadius:8,
                                    letterSpacing:"0.01em",
                                    transition:"color .15s",
                                }}>{l.label}</button>
                            ))}
                        </div>
                        <PrimaryBtn label="Start free trial" onClick={() => go("pricing")} size="sm"/>
                    </div>
                )}
            </nav>

            {mobile && (
                <div style={{
                    position:"fixed", top:60, left:0, right:0, zIndex:399,
                    background:"rgba(248,247,244,0.99)", backdropFilter:"blur(20px)",
                    borderBottom:`1px solid ${T.border}`,
                    maxHeight:open?420:0, overflow:"hidden",
                    transition:"max-height .35s ease",
                }}>
                    <div style={{ padding:open?"20px 24px 28px":"0 24px", display:"flex", flexDirection:"column" }}>
                        {links.map(l => (
                            <button key={l.id} onClick={() => go(l.id)} style={{
                                fontFamily:FB, fontSize:16, fontWeight:page===l.id?600:400,
                                color:page===l.id?T.forest:T.ink,
                                background:"none", border:"none", cursor:"pointer",
                                textAlign:"left", padding:"14px 0",
                                borderBottom:`1px solid ${T.border}`,
                            }}>{l.label}</button>
                        ))}
                        <div style={{ marginTop:20 }}>
                            <PrimaryBtn label="Start free trial" onClick={() => go("pricing")} size="lg" style={{ width:"100%", justifyContent:"center" }}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ─── Dashboard mockup ─────────────────────────────────────────────────────────
function Mockup() {
    const rows = [
        { name:"Max (Labrador)",  med:"Metacam 1.5mg/ml", vet:"Dr. Harris",   status:"Compliant", c:T.green },
        { name:"Bella (Cat)",     med:"Gabapentin 100mg",  vet:"Dr. Fletcher", status:"Compliant", c:T.green },
        { name:"Oscar (Spaniel)", med:"Apoquel 16mg",      vet:"Dr. Linje",    status:"Review",    c:"#c47c10" },
    ];
    return (
        <div style={{
            background:T.white, borderRadius:16,
            border:`1px solid ${T.border}`,
            boxShadow:`0 4px 6px ${T.shadow}, 0 24px 48px ${T.shadowMd}`,
            overflow:"hidden", fontFamily:FB,
        }}>
            {/* Window bar */}
            <div style={{ background:T.canvasDark, borderBottom:`1px solid ${T.border}`, padding:"10px 16px", display:"flex", alignItems:"center", gap:6 }}>
                {["#ff5f57","#ffbd2e","#28ca42"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
                <span style={{ flex:1, textAlign:"center", fontSize:10, color:T.inkFaint, letterSpacing:"0.04em" }}>prescripia.com / dashboard</span>
            </div>

            {/* Header */}
            <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                    <div style={{ fontSize:12, fontWeight:600, color:T.ink, letterSpacing:"0.01em" }}>Prescription records</div>
                    <div style={{ fontSize:10, color:T.inkFaint, marginTop:2 }}>April 2026 · Westgate Veterinary Practice</div>
                </div>
                <div style={{ background:T.greenPale, color:T.forest, fontSize:10, fontWeight:600, padding:"4px 10px", borderRadius:6, letterSpacing:"0.05em" }}>
                    CMA COMPLIANT
                </div>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:`1px solid ${T.border}` }}>
                {[{ v:"12", l:"Logged today" }, { v:"98%", l:"Compliance rate" }, { v:"1", l:"Pending review" }].map((s,i) => (
                    <div key={i} style={{ padding:"12px 16px", borderRight:i<2?`1px solid ${T.border}`:"none" }}>
                        <div style={{ fontFamily:FD, fontSize:22, fontWeight:600, color:T.ink, lineHeight:1 }}>{s.v}</div>
                        <div style={{ fontSize:10, color:T.inkFaint, marginTop:3 }}>{s.l}</div>
                    </div>
                ))}
            </div>

            {/* Table header */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 76px 70px", padding:"7px 16px", background:T.canvasDark }}>
                {["Patient","Medication","Vet","Status"].map(h => (
                    <div key={h} style={{ fontSize:9, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:T.inkFaint }}>{h}</div>
                ))}
            </div>

            {/* Rows */}
            {rows.map((r,i) => (
                <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 76px 70px", padding:"10px 16px", borderTop:`1px solid ${T.border}`, alignItems:"center" }}>
                    <div style={{ fontSize:11, fontWeight:600, color:T.ink }}>{r.name}</div>
                    <div style={{ fontSize:10, color:T.inkMid }}>{r.med}</div>
                    <div style={{ fontSize:10, color:T.inkLight }}>{r.vet}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:r.c, flexShrink:0 }}/>
                        <span style={{ fontSize:10, fontWeight:600, color:r.c }}>{r.status}</span>
                    </div>
                </div>
            ))}

            {/* Footer */}
            <div style={{ padding:"10px 16px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:T.canvasDark }}>
                <span style={{ fontSize:10, color:T.inkFaint }}>Last updated: today, 14:32</span>
                <span style={{ fontSize:10, fontWeight:600, color:T.green, cursor:"pointer" }}>Export evidence report →</span>
            </div>
        </div>
    );
}

// ─── Comparison section ───────────────────────────────────────────────────────
const COMPARE = [
    {
        icon: Icon.rx,
        before: "Prescription rights going unrecorded",
        after:  "Every consultation logged in under 30 seconds",
        bd: "Without a consistent process, compliance rests on individual recall under clinical pressure. Both are unreliable.",
        ad: "A structured log between consultations creates a defensible record without adding meaningful time to the working day.",
    },
    {
        icon: Icon.document,
        before: "No audit trail to present during an inspection",
        after:  "A complete, timestamped evidence trail on demand",
        bd: "The CMA may request records at any time. Knowing you have been compliant is not the same as being able to demonstrate it.",
        ad: "Every record is structured, dated, and exportable. One action produces the documentation an inspector expects to see.",
    },
    {
        icon: Icon.gbp,
        before: "Written estimate obligations being missed",
        after:  "Automatic prompts at the relevant threshold",
        bd: "The £500 written estimate requirement is easy to overlook when clinical decisions are the priority. The obligation remains regardless.",
        ad: "Prescripia flags the requirement at the point it becomes relevant, so the obligation is met without relying on recall.",
    },
    {
        icon: Icon.msg,
        before: "Complaint response windows slipping past",
        after:  "Response deadlines tracked from receipt",
        bd: "Complaints handled informally, without a formal record, create accountability gaps that are difficult to close after the event.",
        ad: "Each complaint is logged at receipt, tracked through to resolution, and retained as part of the practice evidence record.",
    },
    {
        icon: Icon.tag,
        before: "Published pricing falling short of the specification",
        after:  "A compliant price list, correctly formatted for publication",
        bd: "The Order sets out precisely what must be published, where, and how. A price page that does not meet the specification is a formal breach.",
        ad: "Prescripia generates a price list that meets the CMA requirement, ready to publish on your website and display in practice.",
    },
];

function ComparisonSection() {
    const [view, setView] = useState("before");
    const [ref, style] = useReveal();
    const isBefore = view === "before";

    return (
        <section style={{ background:T.canvas, padding:"96px clamp(20px,6vw,80px)" }}>
            <div style={{ maxWidth:1080, margin:"0 auto" }}>
                <div ref={ref} style={style}>
                    <Label>The exposure</Label>
                    <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end", gap:20, marginBottom:20 }}>
                        <H2 style={{ maxWidth:520 }}>
                            {isBefore
                                ? "Where most independent practices stand today."
                                : "What having the right system in place changes."}
                        </H2>
                    </div>

                    {/* Toggle */}
                    <div style={{ display:"inline-flex", background:T.white, border:`1px solid ${T.border}`, borderRadius:100, padding:4, gap:4, marginBottom:36 }}>
                        <button onClick={() => setView("before")} style={{ fontFamily:FB, fontWeight:500, fontSize:13, padding:"8px 18px", borderRadius:100, border:"none", cursor:"pointer", background:isBefore?"#fef2f2":"transparent", color:isBefore?T.red:T.inkFaint, transition:"all .2s", display:"inline-flex", alignItems:"center", gap:6 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={isBefore?T.red:T.inkFaint} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Without Prescripia
                        </button>
                        <button onClick={() => setView("after")} style={{ fontFamily:FB, fontWeight:500, fontSize:13, padding:"8px 18px", borderRadius:100, border:"none", cursor:"pointer", background:!isBefore?T.greenPale:"transparent", color:!isBefore?T.forest:T.inkFaint, transition:"all .2s", display:"inline-flex", alignItems:"center", gap:6 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={!isBefore?T.forest:T.inkFaint} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            With Prescripia
                        </button>
                    </div>

                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {COMPARE.map((item, i) => {
                            const [r, s] = useReveal(i * 40);
                            const ic = isBefore ? "#ef4444" : T.green;
                            return (
                                <div key={i} ref={r} style={{ ...s, background:isBefore?T.redPale:T.white, border:`1px solid ${isBefore?T.redBdr:T.border}`, borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:14, transition:"background .3s, border-color .3s" }}>
                                    <div style={{ width:38, height:38, borderRadius:9, background:isBefore?"#fee2e2":T.greenPale, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                                        {item.icon(ic)}
                                    </div>
                                    <div style={{ flex:1, minWidth:0, textAlign:"left" }}>
                                        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                                            {isBefore
                                                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                                : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                            }
                                            <span style={{ fontFamily:FB, fontWeight:600, fontSize:14, color:isBefore?T.redText:T.ink, lineHeight:1.3, textAlign:"left" }}>
                        {isBefore ? item.before : item.after}
                      </span>
                                        </div>
                                        <p style={{ fontFamily:FB, fontSize:13, color:isBefore?"#9a3030":T.inkMid, lineHeight:1.65, margin:0, textAlign:"left" }}>
                                            {isBefore ? item.bd : item.ad}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop:18 }}>
                        <button onClick={() => setView(isBefore?"after":"before")} style={{ fontFamily:FB, fontSize:13, fontWeight:400, color:T.inkFaint, background:"none", border:"none", cursor:"pointer" }}>
                            {isBefore ? "See what changes with Prescripia in place →" : "← See the position without a system"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Feature data ─────────────────────────────────────────────────────────────
const FEATURES = [
    { icon:Icon.rx,    remedy:"Remedy 6",    title:"Prescription records",   outcome:"A defensible record for every consultation",     body:"Records prescription rights communication, medication dispensed, and client decisions. Time-stamped, structured, and exportable. Fee cap compliance monitored automatically." },
    { icon:Icon.tag,   remedy:"Remedy 3",    title:"Published price list",    outcome:"Meeting the specification from the first day",   body:"Generates a price list across all 35 required treatment categories, formatted for your website and in-practice display. Updated by you, presented to the CMA standard." },
    { icon:Icon.gbp,   remedy:"Remedy 4",    title:"Written estimates",       outcome:"Obligations met at the point they arise",        body:"Prompts a written estimate when a case crosses the £500 threshold. Produces an itemised document for client acknowledgement alongside a record of the final invoice." },
    { icon:Icon.msg,   remedy:"Remedy 9",    title:"Complaints handling",     outcome:"A complete record from receipt to resolution",   body:"Logs each complaint at receipt, tracks progress to resolution, and monitors response deadlines. Every step is time-stamped. The full record exports at any point." },
    { icon:Icon.grid,  remedy:"All remedies",title:"Compliance overview",     outcome:"A clear view of your current position",          body:"Presents the status of all 14 CMA obligations in one view. Shows what is in order, what requires attention, and what each remedy requires of your practice." },
    { icon:Icon.house, remedy:"Groups",      title:"Multi-site operation",    outcome:"Consistent governance across every location",    body:"Each site maintains its own records and audit trail. Group-level reporting consolidates compliance status across your estate without duplicating administrative effort." },
];

// ═════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═════════════════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
    const mobile = useMobile();
    const [hr, hs] = useReveal(0);

    return (
        <>
            {/* ── Hero ── */}
            <section style={{ background:T.canvas, paddingTop:60, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${T.borderMd} 1px, transparent 1px)`, backgroundSize:"26px 26px", backgroundPosition:"13px 13px", opacity:0.4, pointerEvents:"none" }}/>
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(170deg, transparent 55%, ${T.canvas} 95%)`, pointerEvents:"none" }}/>

                <div style={{ maxWidth:1080, margin:"0 auto", padding:`${mobile?"52px":"88px"} clamp(20px,6vw,80px) 80px`, position:"relative" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:mobile?44:64, alignItems:"center" }}>

                        {/* Left */}
                        <div style={{ flex:"1 1 320px", minWidth:0 }}>
                            {/* Pill badge */}
                            <div style={{ animation:"fu .55s ease .05s both" }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:7, background:T.greenPale, color:T.forest, fontSize:11, fontWeight:500, padding:"4px 12px 4px 8px", borderRadius:20, letterSpacing:"0.02em", marginBottom:22 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:18, height:18, borderRadius:"50%", background:T.green }}>
                    {Icon.check("#fff")}
                  </span>
                  CMA Orders take effect September 2026
                </span>
                            </div>

                            <H1 style={{ marginBottom:22, animation:"fu .7s ease .12s both" }}>
                                Is your practice<br/>
                                <span style={{ color:T.forest }}>ready for enforcement?</span>
                            </H1>

                            <Body style={{ maxWidth:460, marginBottom:32, fontSize:16, animation:"fu .7s ease .24s both" }}>
                                Prescripia helps independent UK veterinary practices meet their obligations under the CMA's 14 remedies. Prescription records, published pricing, written estimates, and complaints handling: maintained consistently, with a clear evidence trail.
                            </Body>

                            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20, animation:"fu .7s ease .36s both" }}>
                                <PrimaryBtn label="Start free trial" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }} size="lg"/>
                                <OutlineBtn label="How it works" onClick={() => { setPage("features"); window.scrollTo(0,0); }}/>
                            </div>

                            <div style={{ display:"flex", flexWrap:"wrap", gap:16, animation:"fu .7s ease .48s both" }}>
                                {[
                                    { icon:Icon.clock,    text:"Free for 14 days" },
                                    { icon:Icon.lock,     text:"No payment details required" },
                                    { icon:Icon.shield,   text:"Built by an MRCVS" },
                                ].map((item, i) => (
                                    <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:FB, fontSize:12, color:T.inkLight }}>
                    {item.icon(T.inkLight)} {item.text}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Right: mockup */}
                        {!mobile && (
                            <div style={{ flex:"1 1 340px", minWidth:0, animation:"fu .8s ease .28s both" }}>
                                <Mockup/>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Trust bar ── */}
            <div style={{ background:T.white, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"20px clamp(20px,6vw,80px)" }}>
                <div style={{ maxWidth:1080, margin:"0 auto" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
                        {/* Audience pills */}
                        {["Independent practices","Practice owners","Clinical directors","Group operators","Practice managers"].map((item, i) => (
                            <span key={i} style={{
                                fontFamily:FB, fontSize:12, fontWeight:400, color:T.inkMid,
                                background:T.canvas, border:`1px solid ${T.border}`,
                                padding:"5px 12px", borderRadius:20,
                                whiteSpace:"nowrap",
                            }}>{item}</span>
                        ))}
                        {/* Spacer on wide screens, line-break handled by flexWrap */}
                        <span style={{ flex:"1 1 auto", minWidth:12 }}/>
                        {/* CMA credential — stands apart */}
                        <span style={{
                            display:"inline-flex", alignItems:"center", gap:6,
                            fontFamily:FB, fontSize:12, fontWeight:500, color:T.forest,
                            background:T.greenPale, border:`1px solid #c6e8d5`,
                            padding:"5px 12px", borderRadius:20,
                            whiteSpace:"nowrap",
                        }}>
              {Icon.check(T.forest)} Aligned to the CMA Final Report (March 2026)
            </span>
                    </div>
                </div>
            </div>

            {/* ── How it works ── */}
            <section style={{ background:T.white, padding:`${mobile?"64px":"88px"} clamp(20px,6vw,80px)` }}>
                <div style={{ maxWidth:1080, margin:"0 auto" }}>
                    <Label>How it works</Label>
                    <H2 style={{ maxWidth:460, marginBottom:48 }}>Designed to fit the pace of a working practice.</H2>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:14 }}>
                        {[
                            { n:"01", icon:Icon.settings, title:"Configure once",            body:"Enter your practice details, fee schedule, and team. Prescripia maps your setup against the 14 CMA remedies automatically.", bg:T.canvas, dark:true },
                            { n:"02", icon:Icon.pulse,    title:"Record as you go",           body:"A brief log between consultations captures what the remedies require. Designed around 30 seconds, not a session at the end of the day.", bg:T.forest, dark:false },
                            { n:"03", icon:Icon.file,     title:"Evidence available on demand",body:"One action produces a dated, structured evidence report. Share it with a partner, a practice manager, or a regulator.", bg:T.canvas, dark:true },
                        ].map((s, i) => {
                            const [r, st] = useReveal(i * 100);
                            return (
                                <div key={i} ref={r} style={{ ...st, background:s.bg, borderRadius:12, padding:"28px 24px", border:s.dark?`1px solid ${T.border}`:"none", boxShadow:!s.dark?"0 20px 48px rgba(14,79,47,0.22)":"none" }}>
                                    <div style={{ fontFamily:FD, fontSize:11, fontWeight:600, color:s.dark?T.borderMd:"rgba(255,255,255,0.2)", marginBottom:16, letterSpacing:"0.05em" }}>{s.n}</div>
                                    <div style={{ marginBottom:14 }}>{s.icon(s.dark?T.green:"#fff")}</div>
                                    <H3 light={!s.dark} style={{ marginBottom:10 }}>{s.title}</H3>
                                    <Body light={!s.dark} size={13}>{s.body}</Body>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop:32, textAlign:"center" }}>
                        <OutlineBtn label="View all features" onClick={() => { setPage("features"); window.scrollTo(0,0); }}/>
                    </div>
                </div>
            </section>

            {/* ── Comparison ── */}
            <ComparisonSection/>

            {/* ── Proof placeholder ── */}
            <section style={{ background:T.white, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"56px clamp(20px,6vw,80px)" }}>
                <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:48, alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ maxWidth:520 }}>
                        <Label>Built for UK veterinary practices</Label>
                        <H3 style={{ marginBottom:12, fontSize:18 }}>Mapped to the CMA Final Report. Operational from day one.</H3>
                        <Body size={14}>
                            Every module in Prescripia addresses a named CMA remedy. The platform does not interpret the obligations loosely. It implements them precisely, so your records reflect what the Orders actually require.
                        </Body>
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                        {[
                            { icon:Icon.shield,   label:"CMA Final Report aligned" },
                            { icon:Icon.lock,     label:"Secure practice records" },
                            { icon:Icon.document, label:"Exportable evidence reports" },
                            { icon:Icon.check,    label:"MRCVS founded" },
                        ].map((item, i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", background:T.canvas, borderRadius:8, border:`1px solid ${T.border}` }}>
                                {item.icon(T.forest)}
                                <span style={{ fontFamily:FB, fontSize:13, fontWeight:500, color:T.inkMid }}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section style={{ background:T.forestDp, padding:`${mobile?"64px":"88px"} clamp(20px,6vw,80px)`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, rgba(74,158,107,0.07) 1px, transparent 1px)`, backgroundSize:"28px 28px", pointerEvents:"none" }}/>
                <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative" }}>
                    <H2 light center style={{ marginBottom:14 }}>
                        Your practice.<br/><span style={{ color:T.green }}>Inspection-ready.</span>
                    </H2>
                    <Body light style={{ marginBottom:40, fontSize:16 }}>
                        14-day free trial. No payment details required. Set up in under 10 minutes, with your first prescription logged before your next consultation ends.
                    </Body>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:44 }}>
                        <PrimaryBtn label="Start free trial" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }} size="lg"/>
                        <OutlineBtn label="View pricing" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }} dark/>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:10, textAlign:"left" }}>
                        {[
                            { icon:Icon.grid,     text:"All 6 compliance modules. Prescriptions, prices, estimates, complaints." },
                            { icon:Icon.file,     text:"Audit-ready PDF evidence export. One action, any time." },
                            { icon:Icon.shield,   text:"Built by an OVS and MRCVS. Mapped to the CMA Final Report (March 2026)." },
                            { icon:Icon.check,    text:"30-day compliance guarantee. Full refund if it does not work." },
                        ].map((item, i) => (
                            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"13px 16px", background:"rgba(255,255,255,0.05)", borderRadius:10, border:"1px solid rgba(255,255,255,0.07)" }}>
                                <div style={{ flexShrink:0, marginTop:2, opacity:0.7 }}>{item.icon(T.greenLt)}</div>
                                <span style={{ fontFamily:FB, fontSize:12, color:"rgba(255,255,255,0.5)", lineHeight:1.65 }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// FEATURES PAGE
// ═════════════════════════════════════════════════════════════════════════════
function FeaturesPage({ setPage }) {
    return (
        <div style={{ paddingTop:60 }}>
            <div style={{ background:T.canvas, padding:"64px clamp(20px,6vw,80px) 48px" }}>
                <div style={{ maxWidth:1080, margin:"0 auto" }}>
                    <Label>Compliance modules</Label>
                    <H2 style={{ maxWidth:520, marginBottom:16 }}>Six modules. Fourteen remedies. One system.</H2>
                    <Body style={{ maxWidth:520, fontSize:15 }}>
                        Each module addresses a specific set of CMA obligations. Together they provide the records, processes, and evidence needed to demonstrate compliance under the Orders.
                    </Body>
                </div>
            </div>
            <div style={{ background:T.white, padding:"48px clamp(20px,6vw,80px)" }}>
                <div style={{ maxWidth:1080, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:16 }}>
                    {FEATURES.map((f, i) => {
                        const [r, s] = useReveal(i * 60);
                        return (
                            <div key={i} ref={r} style={{ ...s, background:T.white, border:`1px solid ${T.border}`, borderRadius:12, padding:"26px 22px", display:"flex", flexDirection:"column", gap:14 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                    <div style={{ width:40, height:40, borderRadius:10, background:T.greenPale, display:"flex", alignItems:"center", justifyContent:"center" }}>{f.icon(T.green)}</div>
                                    <span style={{ fontFamily:FB, fontSize:10, fontWeight:500, letterSpacing:"0.08em", textTransform:"uppercase", color:T.inkFaint, background:T.canvas, padding:"3px 8px", borderRadius:4 }}>{f.remedy}</span>
                                </div>
                                <div>
                                    <H3 style={{ marginBottom:4, fontSize:17 }}>{f.title}</H3>
                                    <div style={{ fontFamily:FB, fontSize:12, fontWeight:500, color:T.green }}>{f.outcome}</div>
                                </div>
                                <Body size={13} style={{ flex:1 }}>{f.body}</Body>
                            </div>
                        );
                    })}
                </div>
                <div style={{ maxWidth:1080, margin:"48px auto 0", textAlign:"center" }}>
                    <PrimaryBtn label="Start free trial" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }} size="lg"/>
                    <p style={{ fontFamily:FB, fontSize:12, color:T.inkFaint, marginTop:12 }}>14-day free trial. No payment details required.</p>
                </div>
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICING PAGE
// ═════════════════════════════════════════════════════════════════════════════
const PLANS = [
    {
        name: "Solo",
        price: "£49",
        period: "/month",
        desc: "Single vet or single-site practice",
        features: ["All six compliance modules","Prescription records log","Published price list tool","PDF evidence reports","Email support"],
        cta: "Start free trial",
        highlight: false,
    },
    {
        name: "Practice",
        price: "£99",
        period: "/month",
        desc: "Multi-vet practice or small group",
        features: ["Everything in Solo","Multiple user accounts","Complaints management","Written estimates tracker","Priority support"],
        cta: "Start free trial",
        highlight: true,
    },
    {
        name: "Group",
        price: "£179",
        period: "/month",
        desc: "Multi-site independent group",
        features: ["Everything in Practice","Unlimited sites","Group compliance overview","Site-by-site reporting","Onboarding session included"],
        cta: "Arrange a call",
        highlight: false,
    },
];

function PricingPage() {
    const cd = useCountdown();
    const mobile = useMobile();
    return (
        <div style={{ paddingTop:60, background:T.canvas, minHeight:"100vh" }}>
            <div style={{ maxWidth:1080, margin:"0 auto", padding:"64px clamp(20px,6vw,80px)" }}>

                <div style={{ textAlign:"center", marginBottom:48 }}>
                    <Label>Pricing</Label>
                    <H2 center style={{ marginBottom:12 }}>Clear pricing. No contractual lock-in.</H2>
                    <Body center size={14} style={{ textAlign:"center" }}>
                        Billed monthly. Cancel at any time. Most practices recover the cost in the administrative time they no longer spend on manual record-keeping.
                    </Body>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16, alignItems:"center", marginBottom:16 }}>
                    {PLANS.map((p, i) => {
                        const [r, s] = useReveal(i * 100);
                        return (
                            <div key={i} ref={r} style={{ ...s, background:p.highlight?T.forest:T.white, border:p.highlight?"none":`1px solid ${T.border}`, borderRadius:14, padding:"34px 28px", display:"flex", flexDirection:"column", gap:20, position:"relative", boxShadow:p.highlight?"0 24px 56px rgba(14,79,47,0.25)":"0 2px 8px "+T.shadow }}>
                                {p.highlight && (
                                    <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:T.green, color:T.white, fontFamily:FB, fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 14px", borderRadius:20, whiteSpace:"nowrap" }}>
                                        Most common
                                    </div>
                                )}
                                <div>
                                    <div style={{ fontFamily:FB, fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:p.highlight?T.greenLt:T.green, marginBottom:10 }}>{p.name}</div>
                                    <div style={{ display:"flex", alignItems:"baseline", gap:3, marginBottom:6 }}>
                                        <span style={{ fontFamily:FD, fontSize:44, fontWeight:600, letterSpacing:"-0.04em", color:p.highlight?T.white:T.ink, lineHeight:1 }}>{p.price}</span>
                                        <span style={{ fontFamily:FB, fontSize:13, color:p.highlight?"rgba(255,255,255,0.4)":T.inkFaint }}>{p.period}</span>
                                    </div>
                                    <div style={{ fontFamily:FB, fontSize:13, color:p.highlight?"rgba(255,255,255,0.5)":T.inkFaint }}>{p.desc}</div>
                                </div>
                                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:10 }}>
                                    {p.features.map((f, j) => (
                                        <div key={j} style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
                                            <span style={{ flexShrink:0, marginTop:1 }}>{Icon.check(T.green)}</span>
                                            <span style={{ fontFamily:FB, fontSize:13, color:p.highlight?"rgba(255,255,255,0.68)":T.inkMid, lineHeight:1.5 }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => {}} style={{ display:"block", width:"100%", padding:"13px 20px", borderRadius:100, fontFamily:FB, fontWeight:600, fontSize:14, border:"none", cursor:"pointer", background:p.highlight?T.green:T.forest, color:T.white, letterSpacing:"0.01em" }}>
                                    {p.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <p style={{ textAlign:"center", fontFamily:FB, fontSize:13, color:T.inkFaint }}>
                    All prices are exclusive of VAT &nbsp;·&nbsp; Cancel at any time &nbsp;·&nbsp;{" "}
                    <a href="mailto:hello@prescripia.com" style={{ color:T.forest, fontWeight:500, textDecoration:"none" }}>Group pricing enquiries →</a>
                </p>

                {/* Risk reduction strip */}
                <div style={{ marginTop:40, display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:12 }}>
                    {[
                        { icon:Icon.lock,     title:"No lock-in",          body:"Monthly billing only. Leave whenever you choose." },
                        { icon:Icon.shield,   title:"30-day guarantee",    body:"Full refund if Prescripia does not work for your practice." },
                        { icon:Icon.clock,    title:"Operational in minutes", body:"Set up in under 10 minutes from account creation." },
                        { icon:Icon.document, title:"Evidence from day one",  body:"Your records begin the moment you log your first consultation." },
                    ].map((item, i) => (
                        <div key={i} style={{ padding:"18px 20px", background:T.white, borderRadius:10, border:`1px solid ${T.border}` }}>
                            <div style={{ marginBottom:8 }}>{item.icon(T.forest)}</div>
                            <div style={{ fontFamily:FD, fontSize:14, fontWeight:600, color:T.ink, marginBottom:4 }}>{item.title}</div>
                            <div style={{ fontFamily:FB, fontSize:12, color:T.inkMid, lineHeight:1.6 }}>{item.body}</div>
                        </div>
                    ))}
                </div>

                {/* Enforcement timeline */}
                <div style={{ marginTop:40, background:T.white, borderRadius:14, border:`1px solid ${T.border}`, padding:mobile?"28px 24px":"36px 44px", display:"flex", flexWrap:"wrap", gap:36, alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ maxWidth:440 }}>
                        <Label>Enforcement timeline</Label>
                        <H3 style={{ marginBottom:10 }}>The Orders take effect this year.</H3>
                        <Body size={14}>
                            Practices that establish compliant processes now will have a substantive evidence trail by the time enforcement begins. Those that act in the final weeks will not. There is no regulatory credit for late compliance.
                        </Body>
                    </div>
                    <div style={{ display:"flex", gap:mobile?16:28, flexWrap:"wrap" }}>
                        {[["days",cd.days],["hours",cd.hours],["mins",cd.mins],["secs",cd.secs]].map(([l,v], i) => (
                            <div key={i} style={{ textAlign:"center", minWidth:48 }}>
                                <div style={{ fontFamily:FD, fontSize:"clamp(28px,4vw,44px)", fontWeight:600, color:T.forest, lineHeight:1, letterSpacing:"-0.04em" }}>{String(v).padStart(2,"0")}</div>
                                <div style={{ fontFamily:FB, fontSize:9, color:T.inkFaint, letterSpacing:"0.12em", textTransform:"uppercase", marginTop:5 }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// FAQ PAGE
// ═════════════════════════════════════════════════════════════════════════════
const FAQS = [
    {
        q: "Does Prescripia cover what the CMA actually requires?",
        a: "The platform is built directly from the CMA Final Report published in March 2026. Each module maps to a named remedy and produces the records the Orders require. The software creates the framework. Your practice must use it consistently for the evidence trail to hold up under scrutiny."
    },
    {
        q: "How long does initial setup take?",
        a: "For a single-site practice, setup takes under 10 minutes. You enter your fee schedule, configure your team, and the system is ready to use. No technical knowledge is required."
    },
    {
        q: "We operate across several sites. Does the platform accommodate that?",
        a: "Yes. The Group plan provides each site with its own records and audit trail, while group-level reporting gives a consolidated view across your estate. Sites operate independently; governance sits centrally."
    },
    {
        q: "What is the compliance deadline?",
        a: "The CMA Orders are expected to take effect from September 2026. Individual remedies carry different implementation windows, ranging from three to twelve months. Practices should treat today as the point from which preparation begins, not the enforcement date itself."
    },
    {
        q: "What does the 30-day guarantee mean in practice?",
        a: "If within the first 30 days you find that Prescripia does not address your compliance obligations as described, we will refund your subscription in full. No complex process, no negotiation."
    },
    {
        q: "Is there a minimum subscription term?",
        a: "No. Prescripia is billed monthly and can be cancelled at any time. There is no contractual commitment beyond the current billing period."
    },
    {
        q: "How is practice data handled?",
        a: "All data is held securely and is not shared with any third party. Each practice account is fully isolated. In multi-site configurations, individual practice records are not accessible across sites."
    },
];

function FAQPage({ setPage }) {
    const [open, setOpen] = useState(null);
    return (
        <div style={{ paddingTop:60, background:T.canvas, minHeight:"100vh" }}>
            <div style={{ maxWidth:700, margin:"0 auto", padding:"64px clamp(20px,6vw,40px)" }}>
                <Label>Common questions</Label>
                <H2 style={{ marginBottom:48 }}>Answers to the questions we hear most.</H2>

                <div style={{ borderTop:`1px solid ${T.border}` }}>
                    {FAQS.map((f, i) => (
                        <div key={i} style={{ borderBottom:`1px solid ${T.border}` }}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                style={{ width:"100%", background:"none", border:"none", padding:"19px 0", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", gap:16, textAlign:"left" }}
                            >
                                <span style={{ fontFamily:FD, fontSize:15, fontWeight:600, color:T.ink, lineHeight:1.4 }}>{f.q}</span>
                                <span style={{ color:T.green, flexShrink:0, fontSize:20, lineHeight:1, display:"inline-block", transition:"transform .25s", transform:open===i?"rotate(45deg)":"none" }}>+</span>
                            </button>
                            <div style={{ maxHeight:open===i?300:0, overflow:"hidden", transition:"max-height .35s ease" }}>
                                <Body size={14} style={{ paddingBottom:20 }}>{f.a}</Body>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop:48, background:T.white, borderRadius:12, border:`1px solid ${T.border}`, padding:"28px 28px", textAlign:"center" }}>
                    <H3 style={{ marginBottom:8, fontSize:16 }}>Further questions</H3>
                    <Body size={14} style={{ marginBottom:20 }}>We respond to all enquiries on the day they are received.</Body>
                    <a href="mailto:hello@prescripia.com" style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:FB, fontWeight:500, fontSize:14, color:T.forest, textDecoration:"none", border:`1.5px solid ${T.forest}`, padding:"10px 22px", borderRadius:100 }}>
                        hello@prescripia.com →
                    </a>
                </div>

                <div style={{ marginTop:32, textAlign:"center" }}>
                    <PrimaryBtn label="Start free trial" onClick={() => { setPage("pricing"); window.scrollTo(0,0); }} size="lg"/>
                    <p style={{ fontFamily:FB, fontSize:12, color:T.inkFaint, marginTop:12 }}>14-day free trial. No payment details required.</p>
                </div>
            </div>
        </div>
    );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
    return (
        <footer style={{ background:"#06100a", borderTop:"1px solid rgba(255,255,255,0.05)", padding:"32px clamp(20px,5vw,72px)" }}>
            <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:16 }}>
                <Logo dark onClick={() => { setPage("home"); window.scrollTo(0,0); }}/>
                <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                    {[["Features","features"],["Pricing","pricing"],["FAQ","faq"]].map(([l,id]) => (
                        <button key={id} onClick={() => { setPage(id); window.scrollTo(0,0); }} style={{ fontFamily:FB, fontSize:13, color:"rgba(255,255,255,0.28)", background:"none", border:"none", cursor:"pointer" }}>{l}</button>
                    ))}
                </div>
                <div style={{ fontFamily:FB, fontSize:12, color:"rgba(255,255,255,0.16)" }}>
                    © 2026 Prescripia. Built for UK independent veterinary practices.
                </div>
            </div>
        </footer>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// ROOT
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
    const [page, setPage] = useState("home");
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; width:100%; }
        body {
          -webkit-font-smoothing:antialiased;
          background:#f8f7f4;
          font-family:'Inter',-apple-system,sans-serif;
          width:100%;
          min-height:100vh;
          text-align:left;
        }
        #root {
          width:100%;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          text-align:left;
        }
        @keyframes fu { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        button { font-family:inherit; }
        #features, #pricing, #faq { scroll-margin-top:60px; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#cdd6d0; border-radius:3px; }
      `}</style>
            <Nav page={page} setPage={setPage}/>
            <main style={{ flex:1 }}>
                {page === "home"     && <HomePage     setPage={setPage}/>}
                {page === "features" && <FeaturesPage setPage={setPage}/>}
                {page === "pricing"  && <PricingPage  setPage={setPage}/>}
                {page === "faq"      && <FAQPage      setPage={setPage}/>}
            </main>
            <Footer setPage={setPage}/>
        </>
    );
}