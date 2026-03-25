import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400&family=DM+Mono:wght@300;400;500&family=Source+Sans+3:wght@300;400;500;600&display=swap');`;

const styles = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #F4F0E8; --cream-dark: #EAE5D9; --ink: #1A1814; --ink-light: #4A453E;
    --ink-muted: #8C8278; --green: #2D6A4F; --green-light: #E8F2EC; --green-mid: #4A9B73;
    --border: #DDD8CE; --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'Source Sans 3', sans-serif; --font-mono: 'DM Mono', monospace;
  }
  html { scroll-behavior: smooth; }
  body { background: var(--cream); font-family: var(--font-body); color: var(--ink); overflow-x: hidden; }

  /* NAV */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 60px; display: flex; align-items: center; justify-content: space-between; background: rgba(244,240,232,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--ink); }
  .nav-logo span { color: var(--green); }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link { font-size: 14px; color: var(--ink-light); cursor: pointer; transition: color 0.15s; }
  .nav-link:hover { color: var(--ink); }
  .nav-cta { font-family: var(--font-mono); font-size: 12px; background: var(--ink); color: var(--cream); padding: 9px 20px; border-radius: 4px; border: none; cursor: pointer; transition: background 0.15s; }
  .nav-cta:hover { background: var(--green); }

  /* HERO */
  .hero { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 100px 48px 60px; position: relative; overflow: hidden; gap: 60px; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 70% 50%, rgba(45,106,79,0.05) 0%, transparent 70%); pointer-events: none; }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.35; pointer-events: none; }
  .hero-content { position: relative; animation: fadeUp 0.8s ease both; }
  .hero-eyebrow { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--green); margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
  .hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--green); }
  .hero-title { font-family: var(--font-display); font-size: clamp(40px, 4.5vw, 72px); font-weight: 600; line-height: 1.05; color: var(--ink); margin-bottom: 24px; letter-spacing: -2px; }
  .hero-title em { font-style: italic; color: var(--green); font-weight: 400; }
  .hero-sub { font-size: 17px; line-height: 1.7; color: var(--ink-light); margin-bottom: 14px; font-weight: 300; }
  .hero-data-line { font-size: 13px; line-height: 1.65; color: var(--ink-muted); margin-bottom: 36px; font-weight: 300; }
  .hero-actions { display: flex; gap: 12px; align-items: center; margin-bottom: 48px; }
  .btn-primary { font-family: var(--font-mono); font-size: 13px; background: var(--ink); color: var(--cream); padding: 13px 28px; border-radius: 4px; border: none; cursor: pointer; transition: all 0.2s; }
  .btn-primary:hover { background: var(--green); transform: translateY(-1px); }
  .btn-secondary { font-family: var(--font-mono); font-size: 13px; color: var(--ink); padding: 13px 28px; border-radius: 4px; border: 1px solid var(--border); background: transparent; cursor: pointer; transition: all 0.2s; }
  .btn-secondary:hover { border-color: var(--ink); }
  .hero-stats { display: flex; gap: 36px; padding-top: 36px; border-top: 1px solid var(--border); }
  .hero-stat-value { font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--ink); line-height: 1; margin-bottom: 5px; }
  .hero-stat-label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--ink-muted); }

  /* DASHBOARD PANELS */
  .hero-panels { position: relative; display: flex; flex-direction: column; gap: 12px; animation: fadeUp 0.9s 0.15s ease both; }
  .panel { background: white; border-radius: 10px; border: 1px solid var(--border); box-shadow: 0 4px 20px rgba(26,24,20,0.07); overflow: hidden; }
  .panel-header { padding: 10px 14px; border-bottom: 1px solid var(--border); background: #FAFAF7; display: flex; align-items: center; justify-content: space-between; }
  .panel-title { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--ink-muted); }
  .panel-badge { font-family: var(--font-mono); font-size: 10px; padding: 2px 8px; border-radius: 3px; }
  .badge-green { background: var(--green-light); color: var(--green); }
  .badge-amber { background: #F7F0E0; color: #92660A; }

  /* PANEL 1 - APPRAISAL METRICS */
  .panel-metrics { padding: 14px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .pm { padding: 10px 12px; border-radius: 6px; background: var(--cream); border: 1px solid var(--border); }
  .pm-label { font-family: var(--font-mono); font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink-muted); margin-bottom: 5px; }
  .pm-value { font-family: var(--font-mono); font-size: 15px; font-weight: 500; color: var(--ink); }
  .pm-value.green { color: var(--green); }
  .pm-value.blue { color: #2C4A6E; }
  .pm-sub { font-size: 9px; color: var(--ink-muted); margin-top: 2px; }

  /* PANEL 2 - COST BREAKDOWN */
  .panel-costs { padding: 14px; }
  .cost-row-p { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
  .cost-row-p:last-child { margin-bottom: 0; }
  .cr-label { font-size: 11px; color: var(--ink-light); width: 130px; min-width: 130px; }
  .cr-track { flex: 1; background: var(--border); border-radius: 2px; height: 5px; }
  .cr-fill { height: 5px; border-radius: 2px; }
  .cr-val { font-family: var(--font-mono); font-size: 10px; color: var(--ink-muted); width: 48px; text-align: right; }

  /* PANEL 3 - SENSITIVITY */
  .panel-sens { padding: 14px; }
  .sens-label { font-family: var(--font-mono); font-size: 9px; color: var(--ink-muted); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .sens-row { display: flex; gap: 4px; margin-bottom: 4px; }
  .sens-cell-p { flex: 1; padding: 6px 4px; text-align: center; border-radius: 3px; font-family: var(--font-mono); font-size: 10px; font-weight: 500; }

  /* PANEL 4 - CASHFLOW MINI */
  .panel-cf { padding: 14px; display: flex; gap: 8px; align-items: flex-end; height: 72px; }
  .cf-bar-wrap { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; }
  .cf-bar { border-radius: 2px 2px 0 0; width: 100%; transition: height 0.3s; }

  /* LOGOS */
  .logos { padding: 36px 48px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--cream-dark); }
  .logos-label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--ink-muted); text-align: center; margin-bottom: 20px; }
  .logos-row { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
  .logo-item { font-family: var(--font-display); font-size: 15px; font-weight: 500; color: var(--ink-muted); opacity: 0.6; }

  /* HOW */
  .how { padding: 120px 48px; }
  .section-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--green); margin-bottom: 16px; }
  .section-title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 52px); font-weight: 600; color: var(--ink); letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.1; }
  .section-sub { font-size: 16px; color: var(--ink-light); max-width: 520px; line-height: 1.65; margin-bottom: 64px; font-weight: 300; }
  .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
  .step { background: white; padding: 32px 28px; border: 1px solid var(--border); transition: transform 0.2s; }
  .step:hover { transform: translateY(-4px); z-index: 1; box-shadow: 0 12px 32px rgba(26,24,20,0.08); }
  .step-num { font-family: var(--font-display); font-size: 52px; font-weight: 300; color: var(--border); line-height: 1; margin-bottom: 20px; }
  .step-title { font-family: var(--font-display); font-size: 19px; font-weight: 500; color: var(--ink); margin-bottom: 10px; }
  .step-desc { font-size: 14px; color: var(--ink-light); line-height: 1.65; font-weight: 300; }
  .step-tag { display: inline-block; font-family: var(--font-mono); font-size: 10px; background: var(--green-light); color: var(--green); padding: 4px 10px; border-radius: 3px; margin-top: 14px; }

  /* FEATURES */
  .features { padding: 120px 48px; background: var(--ink); }
  .features .section-label { color: var(--green-mid); }
  .features .section-title { color: var(--cream); }
  .features .section-sub { color: rgba(244,240,232,0.6); }
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.08); }
  .feature { padding: 40px 36px; background: var(--ink); transition: background 0.2s; }
  .feature:hover { background: rgba(255,255,255,0.04); }
  .feature-icon { margin-bottom: 20px; }
  .feature-icon svg { width: 26px; height: 26px; stroke: var(--green-mid); fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
  .feature-title { font-family: var(--font-display); font-size: 19px; font-weight: 500; color: var(--cream); margin-bottom: 10px; }
  .feature-desc { font-size: 14px; color: rgba(244,240,232,0.55); line-height: 1.7; font-weight: 300; }

  /* WAITLIST */
  .waitlist { padding: 120px 48px; background: var(--cream-dark); border-top: 1px solid var(--border); }
  .waitlist-inner { max-width: 560px; }
  .waitlist-title { font-family: var(--font-display); font-size: clamp(32px, 4vw, 52px); font-weight: 600; color: var(--ink); letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.1; }
  .waitlist-title em { font-style: italic; color: var(--green); font-weight: 400; }
  .waitlist-sub { font-size: 16px; color: var(--ink-light); margin-bottom: 32px; font-weight: 300; line-height: 1.65; }
  .waitlist-form { display: flex; gap: 12px; }
  .waitlist-input { flex: 1; padding: 14px 18px; border: 1px solid var(--border); border-radius: 4px; background: white; font-family: var(--font-body); font-size: 15px; color: var(--ink); outline: none; transition: border 0.15s; }
  .waitlist-input:focus { border-color: var(--green); }
  .waitlist-btn { font-family: var(--font-mono); font-size: 12px; background: var(--ink); color: var(--cream); padding: 14px 28px; border-radius: 4px; border: none; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
  .waitlist-btn:hover { background: var(--green); }
  .waitlist-note { font-family: var(--font-mono); font-size: 11px; color: var(--ink-muted); margin-top: 14px; }
  .success-msg { background: var(--green-light); border: 1px solid var(--green); border-radius: 4px; padding: 14px 20px; font-size: 14px; color: var(--green); margin-top: 16px; }

  /* FOOTER */
  .footer { padding: 40px 48px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--ink); }
  .footer-logo span { color: var(--green); }
  .footer-copy { font-family: var(--font-mono); font-size: 11px; color: var(--ink-muted); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @media (max-width: 1100px) { .hero { grid-template-columns: 1fr; } .hero-panels { display: none; } .steps { grid-template-columns: repeat(2, 1fr); } .features-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .nav { padding: 0 24px; } .hero, .how, .features, .pricing, .waitlist { padding: 80px 24px; } .hero { padding-top: 100px; } .steps, .features-grid, .pricing-grid { grid-template-columns: 1fr; } .waitlist-form { flex-direction: column; } .hero-stats { gap: 24px; flex-wrap: wrap; } .footer { flex-direction: column; gap: 16px; text-align: center; } }
`;

const sensCells = [
  [{v:"9.1%",t:"r"},{v:"12.4%",t:"r"},{v:"15.8%",t:"g"},{v:"19.1%",t:"g"},{v:"22.3%",t:"g"}],
  [{v:"6.2%",t:"a"},{v:"9.5%",t:"r"},{v:"12.9%",t:"r"},{v:"16.2%",t:"g"},{v:"19.4%",t:"g"}],
  [{v:"3.1%",t:"a"},{v:"6.4%",t:"a"},{v:"9.8%",t:"r"},{v:"13.1%",t:"r"},{v:"16.3%",t:"g"}],
  [{v:"-0.1%",t:"x"},{v:"3.2%",t:"a"},{v:"6.6%",t:"a"},{v:"9.9%",t:"r"},{v:"13.1%",t:"r"}],
  [{v:"-3.2%",t:"x"},{v:"0.1%",t:"x"},{v:"3.5%",t:"a"},{v:"6.8%",t:"a"},{v:"10.0%",t:"r"}],
];

const sensColor = (t) => ({
  g: {background:"#E8F2EC",color:"#2D6A4F"},
  r: {background:"#EBF0F7",color:"#2C4A6E"},
  a: {background:"#F7F0E0",color:"#92660A"},
  x: {background:"#F7EBEB",color:"#8B3A3A"},
}[t]);

const cfBars = [12,18,28,42,58,72,81,88,91,88,80,65,44,20,-8,-42,-80,-120];

export default function LandingPage({ onEnterApp }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <style>{styles}</style>

      <nav className="nav">
        <div className="nav-logo">Feasa<span>.</span>ie</div>
        <div className="nav-links">
          <span className="nav-link" onClick={() => document.getElementById("how").scrollIntoView({ behavior: "smooth" })}>How it works</span>
          
          <span className="nav-link" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>Early access</span>
          <button className="nav-cta" onClick={onEnterApp}>View Demo →</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-grid" />

        {/* LEFT — COPY */}
        <div className="hero-content">
          <div className="hero-eyebrow">Property development feasibility software, built for Ireland.</div>
          <h1 className="hero-title">Know if a site<br /><em>stacks up</em><br />in minutes.</h1>
          <p className="hero-sub">
            Feasa gives you an instant development appraisal for any Irish site. Input a location and building type and get construction cost estimates, revenue projections, cash flow and returns straight away. Benchmarks are pre-loaded so you are never starting from a blank spreadsheet and every figure is yours to edit.
          </p>
          <p className="hero-data-line">
            Built on Irish data including the Property Price Register, construction cost benchmarks, Local authority levies and more. Irish benchmarks pre-loaded. Edit any figure to your own numbers in seconds.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onEnterApp}>Try the demo →</button>
            <button className="btn-secondary" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>Join waitlist</button>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-value">26</div><div className="hero-stat-label">Counties covered</div></div>
            <div><div className="hero-stat-value">5 min</div><div className="hero-stat-label">Appraisal time</div></div>
            <div><div className="hero-stat-value">16</div><div className="hero-stat-label">Cost elements</div></div>
          </div>
        </div>

        {/* RIGHT — MULTIPLE PANELS */}
        <div className="hero-panels">

          {/* PANEL 1: Appraisal metrics */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Ballycullen Road, Dublin 16 — Appraisal</span>
              <span className="panel-badge badge-green">Strongly Viable</span>
            </div>
            <div className="panel-metrics">
              <div className="pm"><div className="pm-label">GDV</div><div className="pm-value blue">€37.9m</div><div className="pm-sub">Net €36.8m</div></div>
              <div className="pm"><div className="pm-label">Profit on GDV</div><div className="pm-value green">18.4%</div><div className="pm-sub">Target ≥15%</div></div>
              <div className="pm"><div className="pm-label">IRR</div><div className="pm-value green">22.1%</div><div className="pm-sub">Equity IRR</div></div>
              <div className="pm"><div className="pm-label">Equity Multiple</div><div className="pm-value">1.94x</div><div className="pm-sub">ROE 38.2%</div></div>
            </div>
          </div>

          {/* PANEL 2: Cost breakdown */}
          <div className="panel">
            <div className="panel-header">
              <span className="panel-title">Cost Breakdown</span>
              <span className="panel-badge badge-amber">Total €30.9m</span>
            </div>
            <div className="panel-costs">
              {[
                {label:"Construction",val:"€19.1m",w:92,c:"#2C4A6E"},
                {label:"Professional Fees",val:"€2.5m",w:32,c:"#4A9B73"},
                {label:"Development Finance",val:"€1.8m",w:24,c:"#8B3A3A"},
                {label:"Statutory Levies",val:"€1.2m",w:16,c:"#92660A"},
                {label:"Land Acquisition",val:"€4.2m",w:48,c:"#6B6459"},
                {label:"VAT + Marketing",val:"€2.1m",w:28,c:"#A0856C"},
              ].map((r,i)=>(
                <div key={i} className="cost-row-p">
                  <div className="cr-label">{r.label}</div>
                  <div className="cr-track"><div className="cr-fill" style={{width:`${r.w}%`,background:r.c}}/></div>
                  <div className="cr-val">{r.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PANELS 3+4 side by side */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>

            {/* PANEL 3: Sensitivity */}
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Sensitivity — Profit on GDV</span>
              </div>
              <div className="panel-sens">
                <div className="sens-label">Revenue vs Cost variation</div>
                {sensCells.map((row,i)=>(
                  <div key={i} className="sens-row">
                    {row.map((cell,j)=>(
                      <div key={j} className="sens-cell-p" style={sensColor(cell.t)}>{cell.v}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* PANEL 4: Key metrics */}
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Key Metrics</span>
              </div>
              <div style={{padding:"14px"}}>
                {[
                  {label:"Residual Land Value",val:"€4.62m",sub:"Ask: €4.20m ✓"},
                  {label:"NPV (8% discount)",val:"€4.1m",sub:"Positive"},
                  {label:"Equity Required",val:"€10.8m",sub:"65% LTC debt"},
                  {label:"Peak Funding",val:"€18.4m",sub:"Month 18"},
                  {label:"Profit Erosion",val:"6.2 months",sub:"Cost overrun buffer"},
                ].map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<4?"1px solid var(--border)":"none"}}>
                    <div style={{fontSize:11,color:"var(--ink-light)"}}>{m.label}</div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:12,fontWeight:500,color:"var(--ink)"}}>{m.val}</div>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:9,color:"var(--ink-muted)"}}>{m.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <div className="logos">
        <div className="logos-label">Built on Irish data sources</div>
        <div className="logos-row">
          {["Property Price Register","SCSI","Local Authority Levies","Part V","BC(A)R"].map((l,i)=>(<div key={i} className="logo-item">{l}</div>))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="section-label">How it works</div>
        <h2 className="section-title">From site to appraisal<br />in four steps.</h2>
        <p className="section-sub">Stop piecing together spreadsheets and PDFs. Feasa gives you a structured starting point for any Irish site, with every figure editable to your own assumptions.</p>
        <div className="steps">
          {[
            {num:"01",title:"Select your site",desc:"Choose from live Irish development sites or input your own location, size and zoning. The appraisal framework is set up instantly.",tag:"Any Irish location"},
            {num:"02",title:"Review the benchmarks",desc:"Construction costs, revenue estimates and statutory charges are pre-loaded based on Irish data. You are never starting from zero.",tag:"Pre-loaded Irish data"},
            {num:"03",title:"Edit to your numbers",desc:"Swap in your own build costs, sale prices, finance rates or unit mix. Every figure is editable and the model updates instantly.",tag:"Fully editable"},
            {num:"04",title:"Read your appraisal",desc:"Profit on GDV, IRR, NPV, residual land value, monthly cash flow and sensitivity analysis — in minutes, not weeks.",tag:"Institutional grade output"},
          ].map((s,i)=>(
            <div key={i} className="step">
              <div className="step-num">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
              <span className="step-tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-label">What is included</div>
        <h2 className="section-title">Not a replacement for your QS.<br />A faster way to know if a site<br />is worth one.</h2>
        <p className="section-sub">Feasa is a screening tool, not a cost plan. It gives you a structured, editable appraisal based on Irish benchmarks so you can make faster go or no-go decisions before committing professional fees.</p>
        <div className="features-grid">
          {[
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,title:"Full development appraisal",desc:"GDV, net GDV, total costs, profit on GDV and profit on cost. A complete picture based on Irish benchmarks, editable to your own figures."},
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,title:"Monthly cash flow",desc:"S-curve construction spend, phased professional fees and rolling interest calculation. See your peak funding requirement month by month."},
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>,title:"Cost breakdown",desc:"16 cost elements from substructure to contingency, plus professional fees and all Irish statutory costs including Part V, BC(A)R and Irish Water charges."},
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,title:"Residual land value",desc:"Works backwards from a target margin to show the maximum you should pay for a site. Instantly flags if the asking price stacks up."},
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,title:"Sensitivity analysis",desc:"See how your margin changes across different cost and revenue scenarios. Six named risk scenarios including construction overrun and market downturn."},
            {icon:<svg viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4A9B73" fill="none" strokeLinecap="round" strokeLinejoin="round" width="26" height="26"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,title:"Build to rent vs build to sell",desc:"Side by side comparison of both exit strategies with gross yield, net yield and payback period. Useful for sites where BTR is a realistic option."},
          ].map((f,i)=>(
            <div key={i} className="feature">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      {/* WAITLIST */}
      <section className="waitlist" id="waitlist">
        <div className="waitlist-inner">
          <div className="section-label">Early access</div>
          <h2 className="waitlist-title">Be first to use<br /><em>Feasa</em> in Ireland.</h2>
          <p className="waitlist-sub">We are onboarding a small group of Irish developers, QS firms and architects before public launch. Early access is free for 3 months.</p>
          {!submitted ? (
            <>
              <div className="waitlist-form">
                <input className="waitlist-input" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&email.includes("@")&&setSubmitted(true)}/>
                <button className="waitlist-btn" onClick={()=>email.includes("@")&&setSubmitted(true)}>Request access →</button>
              </div>
              <div className="waitlist-note">No spam. No commitment. Early access pricing locked in.</div>
            </>
          ) : (
            <div className="success-msg">You are on the list. We will be in touch shortly with early access details.</div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">Feasa<span>.</span>ie</div>
        <div className="footer-copy">© 2025 Feasa. Built in Ireland.</div>
      </footer>
    </div>
  );
}
