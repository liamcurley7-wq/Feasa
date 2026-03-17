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
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 60px; display: flex; align-items: center; justify-content: space-between; background: rgba(244,240,232,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--ink); }
  .nav-logo span { color: var(--green); }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link { font-size: 14px; color: var(--ink-light); cursor: pointer; transition: color 0.15s; }
  .nav-link:hover { color: var(--ink); }
  .nav-cta { font-family: var(--font-mono); font-size: 12px; background: var(--ink); color: var(--cream); padding: 9px 20px; border-radius: 4px; border: none; cursor: pointer; transition: background 0.15s; }
  .nav-cta:hover { background: var(--green); }
  .hero { min-height: 100vh; display: flex; align-items: center; padding: 120px 48px 80px; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 60% 40%, rgba(45,106,79,0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; opacity: 0.4; pointer-events: none; }
  .hero-content { max-width: 680px; position: relative; animation: fadeUp 0.8s ease both; }
  .hero-eyebrow { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: var(--green); margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
  .hero-eyebrow::before { content: ''; width: 32px; height: 1px; background: var(--green); }
  .hero-title { font-family: var(--font-display); font-size: clamp(44px, 6vw, 78px); font-weight: 600; line-height: 1.05; color: var(--ink); margin-bottom: 28px; letter-spacing: -2px; }
  .hero-title em { font-style: italic; color: var(--green); font-weight: 400; }
  .hero-sub { font-size: 18px; line-height: 1.7; color: var(--ink-light); max-width: 520px; margin-bottom: 16px; font-weight: 300; }
  .hero-data-line { font-size: 14px; line-height: 1.65; color: var(--ink-muted); max-width: 520px; margin-bottom: 40px; font-weight: 300; }
  .hero-actions { display: flex; gap: 16px; align-items: center; }
  .btn-primary { font-family: var(--font-mono); font-size: 13px; background: var(--ink); color: var(--cream); padding: 14px 32px; border-radius: 4px; border: none; cursor: pointer; transition: all 0.2s; }
  .btn-primary:hover { background: var(--green); transform: translateY(-1px); }
  .btn-secondary { font-family: var(--font-mono); font-size: 13px; color: var(--ink); padding: 14px 32px; border-radius: 4px; border: 1px solid var(--border); background: transparent; cursor: pointer; transition: all 0.2s; }
  .btn-secondary:hover { border-color: var(--ink); }
  .hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 48px; border-top: 1px solid var(--border); }
  .hero-stat-value { font-family: var(--font-display); font-size: 36px; font-weight: 600; color: var(--ink); line-height: 1; margin-bottom: 6px; }
  .hero-stat-label { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--ink-muted); }
  .hero-right { position: absolute; right: -20px; top: 50%; transform: translateY(-50%); width: 500px; animation: fadeLeft 1s 0.3s ease both; }
  .mockup { background: white; border-radius: 12px; box-shadow: 0 32px 80px rgba(26,24,20,0.15), 0 0 0 1px var(--border); overflow: hidden; }
  .mockup-bar { background: #F8F7F4; border-bottom: 1px solid var(--border); padding: 12px 16px; display: flex; align-items: center; gap: 8px; }
  .mockup-dot { width: 10px; height: 10px; border-radius: 50%; }
  .mockup-url { flex: 1; background: var(--cream); border-radius: 4px; padding: 4px 10px; font-family: var(--font-mono); font-size: 10px; color: var(--ink-muted); margin: 0 12px; }
  .mockup-body { padding: 20px; display: grid; grid-template-columns: 150px 1fr; gap: 14px; height: 300px; }
  .mockup-sidebar { display: flex; flex-direction: column; gap: 8px; }
  .mockup-site { background: var(--cream); border-radius: 6px; padding: 10px; border: 1px solid var(--border); }
  .mockup-site.active { background: #EBF0F7; border-color: #2C4A6E; }
  .mockup-site-name { font-size: 9px; font-weight: 600; color: var(--ink); margin-bottom: 2px; }
  .mockup-site-price { font-family: var(--font-mono); font-size: 11px; color: #2C4A6E; }
  .mockup-main { display: flex; flex-direction: column; gap: 10px; }
  .mockup-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .mockup-metric { background: var(--cream); border-radius: 6px; padding: 10px; border: 1px solid var(--border); }
  .mockup-metric-label { font-family: var(--font-mono); font-size: 8px; color: var(--ink-muted); text-transform: uppercase; margin-bottom: 4px; }
  .mockup-metric-val { font-family: var(--font-mono); font-size: 14px; font-weight: 500; color: var(--ink); }
  .mockup-metric.green .mockup-metric-val { color: var(--green); }
  .mockup-chart { background: var(--cream); border-radius: 6px; padding: 12px; border: 1px solid var(--border); flex: 1; }
  .mockup-chart-label { font-family: var(--font-mono); font-size: 8px; color: var(--ink-muted); margin-bottom: 10px; }
  .mockup-chart-row { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
  .mockup-chart-name { font-size: 8px; color: var(--ink-light); width: 72px; }
  .mockup-chart-track { flex: 1; background: var(--border); border-radius: 2px; height: 5px; }
  .mockup-chart-fill { height: 5px; border-radius: 2px; }
  .mockup-chart-val { font-family: var(--font-mono); font-size: 8px; color: var(--ink-muted); width: 36px; text-align: right; }
  .logos { padding: 40px 48px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--cream-dark); }
  .logos-label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--ink-muted); text-align: center; margin-bottom: 24px; }
  .logos-row { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
  .logo-item { font-family: var(--font-display); font-size: 15px; font-weight: 500; color: var(--ink-muted); opacity: 0.6; }
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
  .pricing { padding: 120px 48px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 960px; }
  .price-card { background: white; border: 1px solid var(--border); border-radius: 8px; padding: 40px 36px; position: relative; transition: transform 0.2s, box-shadow 0.2s; }
  .price-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(26,24,20,0.1); }
  .price-card.featured { border-color: var(--green); border-width: 2px; }
  .price-featured-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); font-family: var(--font-mono); font-size: 10px; background: var(--green); color: white; padding: 4px 14px; border-radius: 20px; white-space: nowrap; }
  .price-tier { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--ink-muted); margin-bottom: 16px; }
  .price-amount { font-family: var(--font-display); font-size: 48px; font-weight: 600; color: var(--ink); line-height: 1; margin-bottom: 6px; }
  .price-amount span { font-size: 20px; font-weight: 400; color: var(--ink-muted); vertical-align: super; font-family: var(--font-body); }
  .price-period { font-family: var(--font-mono); font-size: 12px; color: var(--ink-muted); margin-bottom: 24px; }
  .price-desc { font-size: 14px; color: var(--ink-light); line-height: 1.6; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); font-weight: 300; }
  .price-features { list-style: none; margin-bottom: 28px; }
  .price-features li { font-size: 14px; color: var(--ink-light); padding: 6px 0; display: flex; align-items: center; gap: 10px; }
  .price-features li::before { content: '✓'; color: var(--green); font-weight: 600; font-size: 13px; }
  .price-btn { width: 100%; padding: 13px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; cursor: pointer; transition: all 0.2s; border: 1px solid var(--border); background: transparent; color: var(--ink); }
  .price-btn:hover { border-color: var(--ink); }
  .price-btn.featured-btn { background: var(--ink); color: var(--cream); border-color: var(--ink); }
  .price-btn.featured-btn:hover { background: var(--green); border-color: var(--green); }
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
  .footer { padding: 40px 48px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--ink); }
  .footer-logo span { color: var(--green); }
  .footer-copy { font-family: var(--font-mono); font-size: 11px; color: var(--ink-muted); }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeLeft { from { opacity: 0; transform: translate(40px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
  @media (max-width: 1100px) { .hero-right { display: none; } .steps { grid-template-columns: repeat(2, 1fr); } .features-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px) { .nav { padding: 0 24px; } .hero, .how, .features, .pricing, .waitlist { padding: 80px 24px; } .hero { padding-top: 100px; } .steps, .features-grid, .pricing-grid { grid-template-columns: 1fr; } .waitlist-form { flex-direction: column; } .hero-stats { gap: 28px; flex-wrap: wrap; } .footer { flex-direction: column; gap: 16px; text-align: center; } }
`;

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
          <span className="nav-link" onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}>Pricing</span>
          <span className="nav-link" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>Early access</span>
          <button className="nav-cta" onClick={onEnterApp}>View Demo →</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-eyebrow">Development Intelligence for Ireland</div>
          <h1 className="hero-title">Know if a site<br /><em>stacks up</em><br />in minutes.</h1>
          <p className="hero-sub">
            Feasa gives you an instant development appraisal for any Irish site. Input a location and building type and get construction cost estimates, revenue projections, cash flow and returns straight away. Benchmarks are pre-loaded so you are never starting from a blank spreadsheet and every figure is yours to edit.
          </p>
          <p className="hero-data-line">
            Built on Irish data including the Property Price Register, SCSI construction benchmarks, Local authority levies and more. Irish benchmarks pre-loaded — edit any figure to your own numbers in seconds.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onEnterApp}>Try the demo →</button>
            <button className="btn-secondary" onClick={() => document.getElementById("waitlist").scrollIntoView({ behavior: "smooth" })}>Join waitlist</button>
          </div>
          <div className="hero-stats">
            <div><div className="hero-stat-value">26</div><div className="hero-stat-label">Counties covered</div></div>
            <div><div className="hero-stat-value">5 min</div><div className="hero-stat-label">Average appraisal time</div></div>
            <div><div className="hero-stat-value">16</div><div className="hero-stat-label">Cost elements in breakdown</div></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="mockup">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{background:"#FF5F57"}}/><div className="mockup-dot" style={{background:"#FEBC2E"}}/><div className="mockup-dot" style={{background:"#28C840"}}/>
              <div className="mockup-url">feasa.ie/dashboard</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                {["Ballycullen Rd","Blessington Rd","Carrigtwohill","Wine St, Sligo"].map((s,i)=>(
                  <div key={i} className={`mockup-site ${i===0?"active":""}`}>
                    <div className="mockup-site-name">{s}</div>
                    <div className="mockup-site-price">{["€4.20m","€1.85m","€2.90m","€620k"][i]}</div>
                  </div>
                ))}
              </div>
              <div className="mockup-main">
                <div className="mockup-metrics">
                  <div className="mockup-metric green"><div className="mockup-metric-label">Profit/GDV</div><div className="mockup-metric-val">18.4%</div></div>
                  <div className="mockup-metric"><div className="mockup-metric-label">IRR</div><div className="mockup-metric-val">22.1%</div></div>
                  <div className="mockup-metric"><div className="mockup-metric-label">GDV</div><div className="mockup-metric-val">€37.9m</div></div>
                </div>
                <div className="mockup-chart">
                  <div className="mockup-chart-label">Cost Breakdown</div>
                  {[{label:"Construction",val:"€19.1m",w:85,c:"#2C4A6E"},{label:"Prof. Fees",val:"€2.5m",w:35,c:"#4A9B73"},{label:"Finance",val:"€1.8m",w:25,c:"#8B3A3A"},{label:"Statutory",val:"€1.2m",w:18,c:"#92660A"}].map((b,i)=>(
                    <div key={i} className="mockup-chart-row">
                      <div className="mockup-chart-name">{b.label}</div>
                      <div className="mockup-chart-track"><div className="mockup-chart-fill" style={{width:`${b.w}%`,background:b.c}}/></div>
                      <div className="mockup-chart-val">{b.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logos">
        <div className="logos-label">Built on Irish data sources</div>
        <div className="logos-row">
          {["Property Price Register","SCSI","Local Authority Levies","Part V","BC(A)R"].map((l,i)=>(<div key={i} className="logo-item">{l}</div>))}
        </div>
      </div>

      <section className="how" id="how">
        <div className="section-label">How it works</div>
        <h2 className="section-title">From site to appraisal<br />in four steps.</h2>
        <p className="section-sub">Stop piecing together spreadsheets and PDFs. Feasa gives you a structured starting point for any Irish site, with every figure editable to your own assumptions.</p>
        <div className="steps">
          {[
            {num:"01",title:"Select your site",desc:"Choose from live Irish development sites or input your own location, size and zoning. The platform sets up the appraisal framework instantly.",tag:"Any Irish location"},
            {num:"02",title:"Review the benchmarks",desc:"Construction costs, revenue estimates and statutory charges are pre-loaded based on Irish data. You are never starting from zero.",tag:"Pre-loaded Irish data"},
            {num:"03",title:"Edit to your numbers",desc:"Swap in your own build costs, sale prices, finance rates or unit mix. Every figure is editable and the model updates instantly.",tag:"Fully editable"},
            {num:"04",title:"Read your appraisal",desc:"Get a full development appraisal — profit on GDV, IRR, NPV, residual land value, monthly cash flow and sensitivity analysis — in minutes, not weeks.",tag:"Institutional grade output"},
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

      <section className="pricing" id="pricing">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Simple, transparent pricing.</h2>
        <p className="section-sub">No setup fees, no contracts. Cancel anytime. Early access pricing locked in for founding customers.</p>
        <div className="pricing-grid">
          {[
            {tier:"Starter",price:"149",desc:"For smaller developers screening sites and running early-stage appraisals.",features:["10 appraisals per month","Full cost breakdown","Cash flow modelling","PDF export","1 user seat"],featured:false},
            {tier:"Professional",price:"299",desc:"For active developers and QS practices running multiple schemes at once.",features:["Unlimited appraisals","All Starter features","Sensitivity analysis","BTR vs BTS comparison","Residual land value","3 user seats","Priority support"],featured:true},
            {tier:"Enterprise",price:"499",desc:"For larger developers and consultancies managing a pipeline of opportunities.",features:["Everything in Professional","Unlimited user seats","API access","Custom branded reports","Dedicated onboarding","SLA guarantee"],featured:false},
          ].map((p,i)=>(
            <div key={i} className={`price-card ${p.featured?"featured":""}`}>
              {p.featured&&<div className="price-featured-badge">Most popular</div>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-amount"><span>€</span>{p.price}</div>
              <div className="price-period">per seat / month</div>
              <p className="price-desc">{p.desc}</p>
              <ul className="price-features">{p.features.map((f,j)=><li key={j}>{f}</li>)}</ul>
              <button className={`price-btn ${p.featured?"featured-btn":""}`} onClick={()=>document.getElementById("waitlist").scrollIntoView({behavior:"smooth"})}>
                {p.featured?"Get early access →":"Join waitlist →"}
              </button>
            </div>
          ))}
        </div>
      </section>

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
