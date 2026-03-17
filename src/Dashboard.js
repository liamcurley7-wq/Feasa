import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const GOOGLE_FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Mono:wght@300;400;500&family=Source+Sans+3:wght@300;400;500;600&display=swap');
`;

const styles = `
  ${GOOGLE_FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #F5F2EC;
    --card: #FDFCF8;
    --border: #E8E3DA;
    --border-strong: #D4CCBF;
    --text-primary: #1A1814;
    --text-secondary: #6B6459;
    --text-muted: #9C9186;
    --accent-blue: #2C4A6E;
    --accent-green: #2D6A4F;
    --accent-red: #8B3A3A;
    --accent-amber: #92660A;
    --accent-blue-light: #EBF0F7;
    --accent-green-light: #EBF4EF;
    --accent-red-light: #F7EBEB;
    --accent-amber-light: #F7F0E0;
    --font-display: 'Fraunces', Georgia, serif;
    --font-body: 'Source Sans 3', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }
  body { background: var(--cream); font-family: var(--font-body); color: var(--text-primary); }
  .app { display: flex; flex-direction: column; min-height: 100vh; }
  
  /* HEADER */
  .header { background: var(--card); border-bottom: 1px solid var(--border); padding: 0 40px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; }
  .header-logo { font-family: var(--font-display); font-size: 22px; font-weight: 600; color: var(--text-primary); letter-spacing: -0.5px; }
  .header-logo span { color: var(--accent-green); }
  .header-nav { display: flex; gap: 8px; align-items: center; }
  .header-badge { font-family: var(--font-mono); font-size: 11px; background: var(--accent-green-light); color: var(--accent-green); padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }

  /* LAYOUT */
  .layout { display: flex; flex: 1; }
  .sidebar { width: 360px; min-width: 360px; background: var(--card); border-right: 1px solid var(--border); overflow-y: auto; height: calc(100vh - 64px); position: sticky; top: 64px; }
  .main { flex: 1; overflow-y: auto; padding: 32px 40px; }

  /* SIDEBAR */
  .sidebar-header { padding: 20px 24px 16px; border-bottom: 1px solid var(--border); }
  .sidebar-title { font-family: var(--font-display); font-size: 13px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
  .filter-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .filter-btn { font-family: var(--font-mono); font-size: 11px; padding: 5px 12px; border-radius: 20px; border: 1px solid var(--border-strong); background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; }
  .filter-btn.active { background: var(--accent-blue); color: white; border-color: var(--accent-blue); }
  .filter-btn:hover:not(.active) { background: var(--border); }

  /* SITE CARDS */
  .site-card { padding: 20px 24px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; position: relative; }
  .site-card:hover { background: var(--cream); }
  .site-card.active { background: var(--accent-blue-light); border-left: 3px solid var(--accent-blue); }
  .site-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; }
  .site-name { font-family: var(--font-display); font-size: 16px; font-weight: 500; color: var(--text-primary); line-height: 1.3; }
  .site-badge { font-family: var(--font-mono); font-size: 11px; padding: 3px 8px; border-radius: 4px; white-space: nowrap; }
  .badge-green { background: var(--accent-green-light); color: var(--accent-green); }
  .badge-blue { background: var(--accent-blue-light); color: var(--accent-blue); }
  .badge-amber { background: var(--accent-amber-light); color: var(--accent-amber); }
  .site-location { font-size: 13px; color: var(--text-secondary); margin-bottom: 10px; }
  .site-price { font-family: var(--font-mono); font-size: 20px; font-weight: 500; color: var(--text-primary); margin-bottom: 8px; }
  .site-meta { display: flex; gap: 0; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }
  .site-meta span { padding-right: 10px; margin-right: 10px; border-right: 1px solid var(--border-strong); }
  .site-meta span:last-child { border-right: none; }

  /* MAIN CONTENT */
  .site-detail-header { margin-bottom: 28px; }
  .site-detail-title { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
  .site-detail-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 16px; }
  .tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--border); margin-bottom: 28px; }
  .tab { font-family: var(--font-body); font-size: 14px; font-weight: 500; padding: 10px 20px; border: none; background: none; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
  .tab.active { color: var(--accent-blue); border-bottom-color: var(--accent-blue); }
  .tab:hover:not(.active) { color: var(--text-primary); }

  /* CARDS */
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 24px; margin-bottom: 20px; }
  .card-title { font-family: var(--font-display); font-size: 15px; font-weight: 500; color: var(--text-primary); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
  .metric-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 18px 20px; }
  .metric-label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 8px; }
  .metric-value { font-family: var(--font-mono); font-size: 22px; font-weight: 500; color: var(--text-primary); margin-bottom: 4px; }
  .metric-sub { font-size: 12px; color: var(--text-muted); }
  .metric-card.blue { border-left: 3px solid var(--accent-blue); }
  .metric-card.green { border-left: 3px solid var(--accent-green); }
  .metric-card.red { border-left: 3px solid var(--accent-red); }
  .metric-card.amber { border-left: 3px solid var(--accent-amber); }

  /* TABLES */
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--text-primary); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--cream); }
  .td-mono { font-family: var(--font-mono); font-size: 13px; }
  .td-right { text-align: right; }

  /* COST BARS */
  .cost-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .cost-row:last-child { border-bottom: none; }
  .cost-label { font-size: 13px; color: var(--text-secondary); width: 180px; min-width: 180px; }
  .cost-bar-wrap { flex: 1; background: var(--border); border-radius: 3px; height: 6px; }
  .cost-bar { height: 6px; border-radius: 3px; }
  .cost-value { font-family: var(--font-mono); font-size: 12px; color: var(--text-primary); width: 100px; text-align: right; }

  /* VERDICT */
  .verdict { border-radius: 8px; padding: 20px 24px; margin-bottom: 20px; border-left: 4px solid; }
  .verdict.viable { background: var(--accent-green-light); border-color: var(--accent-green); }
  .verdict.marginal { background: var(--accent-amber-light); border-color: var(--accent-amber); }
  .verdict.unviable { background: var(--accent-red-light); border-color: var(--accent-red); }
  .verdict-title { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 4px; }
  .verdict-sub { font-size: 14px; color: var(--text-secondary); }

  /* INPUTS */
  .params-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .param-item label { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); display: block; margin-bottom: 6px; }
  .param-item input, .param-item select { width: 100%; padding: 10px 12px; border: 1px solid var(--border-strong); border-radius: 6px; background: var(--cream); font-family: var(--font-mono); font-size: 14px; color: var(--text-primary); outline: none; transition: border 0.15s; }
  .param-item input:focus, .param-item select:focus { border-color: var(--accent-blue); }

  /* SENSITIVITY */
  .sens-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
  .sens-cell { padding: 12px 8px; text-align: center; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; font-weight: 500; }

  /* TWO COL */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }

  /* EMPTY STATE */
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 400px; color: var(--text-muted); text-align: center; }
  .empty-state h3 { font-family: var(--font-display); font-size: 22px; margin-bottom: 8px; color: var(--text-secondary); }
  .empty-title { font-family: var(--font-display); font-size: 32px; font-weight: 300; color: var(--text-primary); margin-bottom: 40px; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 3px; }

  /* COMPARABLE */
  .comp-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border); }
  .comp-item:last-child { border-bottom: none; }
  .comp-address { font-size: 13px; color: var(--text-primary); }
  .comp-date { font-size: 12px; color: var(--text-muted); }
  .comp-price { font-family: var(--font-mono); font-size: 14px; font-weight: 500; color: var(--accent-blue); }

  /* SCENARIO BADGES */
  .scenario-badge { display: inline-block; font-family: var(--font-mono); font-size: 11px; padding: 3px 10px; border-radius: 20px; margin-right: 6px; }

  @media (max-width: 1200px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
`;

const SITES = [
  {
    id: 1,
    name: "Ballycullen Road",
    location: "Dublin 16, Dublin",
    county: "Dublin",
    status: "Planning Granted",
    statusType: "green",
    landCost: 4200000,
    acres: 3.2,
    units: 87,
    buildingType: "Apartments",
    pricePerSqm: 5800,
    avgUnitSize: 75,
    financeRate: 7.0,
    ltc: 65,
    equity: 35,
    discountRate: 8,
    constraints: ["Protected tree line on eastern boundary", "15m setback from Ballycullen Road"],
    opportunities: ["Full planning granted for 87 units", "Near Luas Cross City extension"],
    planningRef: "D21A/0847",
    comparables: [
      { address: "14 Ballycullen Ave", date: "Nov 2024", price: "€485,000", sqm: "82m²", psm: "€5,915" },
      { address: "7 Knocklyon Manor", date: "Oct 2024", price: "€510,000", sqm: "90m²", psm: "€5,667" },
      { address: "22 Firhouse Rd", date: "Sep 2024", price: "€460,000", sqm: "78m²", psm: "€5,897" }
    ],
    devLevy: 28000,
    partV: 10,
    monthlyRent: 2100
  },
  {
    id: 2,
    name: "Blessington Road",
    location: "Naas, Co. Kildare",
    county: "Kildare",
    status: "Zoned Residential",
    statusType: "amber",
    landCost: 1850000,
    acres: 4.8,
    units: 52,
    buildingType: "Housing Estate",
    pricePerSqm: 3800,
    avgUnitSize: 105,
    financeRate: 6.5,
    ltc: 60,
    equity: 40,
    discountRate: 8,
    constraints: ["Flood risk zone adjacent — OPW report required", "Overhead power lines (ESB wayleave)"],
    opportunities: ["Large site with potential to increase density", "Close to Naas town centre and M7"],
    planningRef: "Pre-application stage",
    comparables: [
      { address: "Monread Heights, Naas", date: "Oct 2024", price: "€390,000", sqm: "108m²", psm: "€3,611" },
      { address: "Sallins Road, Naas", date: "Sep 2024", price: "€365,000", sqm: "95m²", psm: "€3,842" },
      { address: "Lakelands, Naas", date: "Aug 2024", price: "€410,000", sqm: "112m²", psm: "€3,661" }
    ],
    devLevy: 14000,
    partV: 10,
    monthlyRent: 1650
  },
  {
    id: 3,
    name: "Carrigtwohill East",
    location: "Carrigtwohill, Co. Cork",
    county: "Cork",
    status: "SHD Approved",
    statusType: "green",
    landCost: 2900000,
    acres: 6.1,
    units: 142,
    buildingType: "Mixed (Houses & Apts)",
    pricePerSqm: 4200,
    avgUnitSize: 88,
    financeRate: 7.0,
    ltc: 65,
    equity: 35,
    discountRate: 8,
    constraints: ["Archaeological survey required (Phase 1 complete)", "Access road upgrade required"],
    opportunities: ["Strategic location near Carrigtwohill IDA Business Park", "Strong rental demand from APCOA, Apple, Pfizer workers"],
    planningRef: "SHD Cork 2022/03",
    comparables: [
      { address: "Castle Village, Carrigtwohill", date: "Nov 2024", price: "€360,000", sqm: "92m²", psm: "€3,913" },
      { address: "Midleton Park", date: "Oct 2024", price: "€380,000", sqm: "98m²", psm: "€3,878" },
      { address: "Ballincollig Crescent", date: "Sep 2024", price: "€395,000", sqm: "102m²", psm: "€3,873" }
    ],
    devLevy: 12500,
    partV: 10,
    monthlyRent: 1800
  },
  {
    id: 4,
    name: "Wine Street Site",
    location: "Sligo Town, Co. Sligo",
    county: "Sligo",
    status: "Zoned Town Centre",
    statusType: "blue",
    landCost: 620000,
    acres: 0.8,
    units: 28,
    buildingType: "Apartments",
    pricePerSqm: 3200,
    avgUnitSize: 65,
    financeRate: 7.5,
    ltc: 60,
    equity: 40,
    discountRate: 9,
    constraints: ["Protected structure within 50m", "Town centre height restrictions (4 storeys max)"],
    opportunities: ["Town centre location — high demand for rental", "URDF funding potentially available"],
    planningRef: "Pre-application stage",
    comparables: [
      { address: "Cleveragh, Sligo", date: "Oct 2024", price: "€210,000", sqm: "68m²", psm: "€3,088" },
      { address: "Oakfield, Sligo", date: "Sep 2024", price: "€225,000", sqm: "72m²", psm: "€3,125" },
      { address: "Rathcormack, Sligo", date: "Aug 2024", price: "€195,000", sqm: "64m²", psm: "€3,047" }
    ],
    devLevy: 8000,
    partV: 10,
    monthlyRent: 1100
  },
  {
    id: 5,
    name: "Oranmore Village",
    location: "Oranmore, Co. Galway",
    county: "Galway",
    status: "Planning Granted",
    statusType: "green",
    landCost: 1400000,
    acres: 2.4,
    units: 38,
    buildingType: "Housing Estate",
    pricePerSqm: 4000,
    avgUnitSize: 98,
    financeRate: 6.5,
    ltc: 65,
    equity: 35,
    discountRate: 8,
    constraints: ["Environmental impact — proximity to Oranmore Bay SAC", "Archaeology condition on planning"],
    opportunities: ["Close to M18/M6 interchange", "Strong demand from Galway city overspill and IDA park"],
    planningRef: "GY21/1204",
    comparables: [
      { address: "Oranmore Gate", date: "Nov 2024", price: "€390,000", sqm: "102m²", psm: "€3,824" },
      { address: "Castlegar, Galway", date: "Oct 2024", price: "€375,000", sqm: "96m²", psm: "€3,906" },
      { address: "Renmore Park", date: "Sep 2024", price: "€405,000", sqm: "108m²", psm: "€3,750" }
    ],
    devLevy: 15000,
    partV: 10,
    monthlyRent: 1750
  },
  {
    id: 6,
    name: "North Quays SDZ",
    location: "Waterford City, Co. Waterford",
    county: "Waterford",
    status: "SDZ Designated",
    statusType: "blue",
    landCost: 3100000,
    acres: 5.5,
    units: 95,
    buildingType: "Apartments",
    pricePerSqm: 3600,
    avgUnitSize: 72,
    financeRate: 7.0,
    ltc: 60,
    equity: 40,
    discountRate: 8,
    constraints: ["Flood risk — OPW coastal flood assessment required", "Cultural heritage — Viking archaeological zone"],
    opportunities: ["SDZ status — fast track planning", "Major public infrastructure investment planned"],
    planningRef: "Waterford SDZ 2023",
    comparables: [
      { address: "The Granary, Waterford", date: "Oct 2024", price: "€290,000", sqm: "74m²", psm: "€3,919" },
      { address: "Newtown, Waterford", date: "Sep 2024", price: "€275,000", sqm: "70m²", psm: "€3,929" },
      { address: "Kilcohan, Waterford", date: "Aug 2024", price: "€260,000", sqm: "68m²", psm: "€3,824" }
    ],
    devLevy: 10000,
    partV: 10,
    monthlyRent: 1400
  },
  {
    id: 7,
    name: "Trim Road Land",
    location: "Trim, Co. Meath",
    county: "Meath",
    status: "Zoned Residential",
    statusType: "amber",
    landCost: 980000,
    acres: 3.8,
    units: 42,
    buildingType: "Housing Estate",
    pricePerSqm: 3500,
    avgUnitSize: 102,
    financeRate: 6.5,
    ltc: 62,
    equity: 38,
    discountRate: 8,
    constraints: ["Proximity to Trim Castle ACA (Architectural Conservation Area)", "Traffic impact assessment required"],
    opportunities: ["Planning policy supportive of residential in this area", "Commuter demand from Dublin — 45km via M3"],
    planningRef: "Pre-application stage",
    comparables: [
      { address: "Newhaggard, Trim", date: "Nov 2024", price: "€320,000", sqm: "104m²", psm: "€3,077" },
      { address: "Manorlands, Trim", date: "Oct 2024", price: "€310,000", sqm: "99m²", psm: "€3,131" },
      { address: "Knightsbrook, Trim", date: "Sep 2024", price: "€335,000", sqm: "108m²", psm: "€3,102" }
    ],
    devLevy: 11000,
    partV: 10,
    monthlyRent: 1450
  },
  {
    id: 8,
    name: "Cherrywood SHD",
    location: "Cherrywood, Dublin 18",
    county: "Dublin",
    status: "SHD Approved",
    statusType: "green",
    landCost: 12500000,
    acres: 9.2,
    units: 340,
    buildingType: "Apartments",
    pricePerSqm: 6200,
    avgUnitSize: 72,
    financeRate: 6.5,
    ltc: 65,
    equity: 35,
    discountRate: 7.5,
    constraints: ["Cherrywood SDZ design guidelines compliance", "Luas Green Line interface requirements"],
    opportunities: ["Direct Luas Green Line access", "Established SDZ with full services infrastructure"],
    planningRef: "SHD D18/0092",
    comparables: [
      { address: "Bride's Glen, D18", date: "Nov 2024", price: "€520,000", sqm: "74m²", psm: "€7,027" },
      { address: "Sandyford Village", date: "Oct 2024", price: "€495,000", sqm: "70m²", psm: "€7,071" },
      { address: "Leopardstown Rd", date: "Sep 2024", price: "€545,000", sqm: "78m²", psm: "€6,987" }
    ],
    devLevy: 28000,
    partV: 10,
    monthlyRent: 2400
  }
];

const fmt = (n) => "€" + Math.round(n).toLocaleString("en-IE");
const fmtM = (n) => "€" + (n / 1000000).toFixed(2) + "m";
const pct = (n) => n.toFixed(1) + "%";

function calcMetrics(site, params) {
  const { units, landCost, pricePerSqm, financeRate, buildingType } = params;

  const baseBuildCost = buildingType === "Apartments" ? 2200 :
    buildingType === "Housing Estate" ? 1650 : 1900;

  const totalGFA = units * site.avgUnitSize;
  const constructionCost = totalGFA * baseBuildCost;
  const professionalFees = constructionCost * 0.13;
  const devLevy = units * site.devLevy;
  const partVCost = constructionCost * (site.partV / 100) * 0.8;
  const bcar = units * 1800;
  const irishWater = units * 3500;
  const vat = constructionCost * 0.135;
  const marketing = constructionCost * 0.025;
  const contingency = constructionCost * 0.05;

  const totalDevCost = constructionCost + professionalFees + devLevy + partVCost + bcar + irishWater + vat + marketing + contingency;
  const totalProjectCost = landCost + totalDevCost;
  const financeMonths = buildingType === "Apartments" ? 30 : 22;
  const financeCost = totalProjectCost * (financeRate / 100) * (financeMonths / 12) * 0.6;
  const totalCost = totalProjectCost + financeCost;

  const avgUnitPrice = pricePerSqm * site.avgUnitSize;
  const gdv = avgUnitPrice * units;
  const netGDV = gdv * 0.97;

  const profit = netGDV - totalCost;
  const profitOnGDV = (profit / gdv) * 100;
  const profitOnCost = (profit / totalCost) * 100;
  const equityRequired = totalCost * ((100 - params.ltc) / 100);
  const returnOnEquity = (profit / equityRequired) * 100;
  const equityMultiple = (profit + equityRequired) / equityRequired;

  const rlv = netGDV - totalDevCost - financeCost - (netGDV * 0.15);
  const profitErosionMonths = (profit / (totalCost / financeMonths));

  // IRR approximation
  const irr = profit > 0 ? ((profit / equityRequired) / (financeMonths / 12)) * 0.72 : 0;

  // NPV
  const npv = profit / Math.pow(1 + params.discountRate / 100, financeMonths / 12);

  // BTR
  const annualRent = site.monthlyRent * 12 * units * 0.95;
  const grossYield = (annualRent / totalCost) * 100;
  const opCost = annualRent * 0.25;
  const netYield = ((annualRent - opCost) / totalCost) * 100;

  const viability = profitOnGDV >= 15 ? "viable" : profitOnGDV >= 8 ? "marginal" : "unviable";
  const viabilityLabel = profitOnGDV >= 15 ? "Strongly Viable" : profitOnGDV >= 8 ? "Marginal" : "Not Viable";

  // QS breakdown
  const qs = [
    { label: "Substructure & Foundations", pct: 8.5, cost: constructionCost * 0.085 },
    { label: "Frame & Upper Floors", pct: 14.0, cost: constructionCost * 0.14 },
    { label: "Roof Construction", pct: 5.5, cost: constructionCost * 0.055 },
    { label: "External Walls & Cladding", pct: 11.0, cost: constructionCost * 0.11 },
    { label: "Windows & External Doors", pct: 6.5, cost: constructionCost * 0.065 },
    { label: "Internal Partitions", pct: 4.5, cost: constructionCost * 0.045 },
    { label: "Internal Finishes", pct: 9.0, cost: constructionCost * 0.09 },
    { label: "Mechanical Services (HVAC)", pct: 10.0, cost: constructionCost * 0.10 },
    { label: "Electrical Services", pct: 8.0, cost: constructionCost * 0.08 },
    { label: "Lifts & Vertical Transport", pct: 3.5, cost: constructionCost * 0.035 },
    { label: "External Works & Landscaping", pct: 6.0, cost: constructionCost * 0.06 },
    { label: "Site Services & Drainage", pct: 4.5, cost: constructionCost * 0.045 },
    { label: "Preliminaries", pct: 10.0, cost: constructionCost * 0.10 },
    { label: "Contingency (5%)", pct: 5.0, cost: constructionCost * 0.05 },
  ];

  // Cash flow
  const monthlyData = [];
  let cumulative = 0;
  for (let m = 1; m <= financeMonths; m++) {
    const progress = m / financeMonths;
    const sCurve = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const prevCurve = (m - 1) / financeMonths < 0.5
      ? 2 * Math.pow((m - 1) / financeMonths, 2)
      : 1 - Math.pow(-2 * (m - 1) / financeMonths + 2, 2) / 2;
    const monthConstruction = constructionCost * (sCurve - prevCurve);
    const monthProfFees = professionalFees / financeMonths;
    const monthStatutory = m <= 3 ? (devLevy + partVCost + bcar + irishWater) / 3 : 0;
    const monthTotal = monthConstruction + monthProfFees + monthStatutory;
    const monthRevenue = m > financeMonths * 0.7
      ? (netGDV / (financeMonths * 0.3)) * (m - financeMonths * 0.7)
      : 0;
    cumulative += monthRevenue - monthTotal;
    monthlyData.push({
      month: `M${m}`,
      cost: Math.round(monthTotal / 1000),
      revenue: Math.round(monthRevenue / 1000),
      cumulative: Math.round(cumulative / 1000)
    });
  }

  return {
    constructionCost, professionalFees, devLevy, partVCost, bcar, irishWater,
    vat, marketing, contingency, totalDevCost, totalCost, financeCost, gdv,
    netGDV, profit, profitOnGDV, profitOnCost, equityRequired, returnOnEquity,
    equityMultiple, rlv, irr, npv, viability, viabilityLabel, qs,
    monthlyData, annualRent, grossYield, netYield, profitErosionMonths,
    avgUnitPrice, totalProjectCost
  };
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState("All");
  const [params, setParams] = useState({});

  const site = SITES.find(s => s.id === selectedId);

  useEffect(() => {
    if (site) {
      setParams({
        units: site.units,
        landCost: site.landCost,
        pricePerSqm: site.pricePerSqm,
        financeRate: site.financeRate,
        buildingType: site.buildingType,
        ltc: site.ltc,
        equity: site.equity,
        discountRate: site.discountRate,
      });
    }
}, [selectedId, site]);

  const metrics = site && Object.keys(params).length ? calcMetrics(site, params) : null;

  const filters = ["All", "Dublin", "Cork", "Kildare", "Galway", "Meath", "Waterford", "Sligo"];
  const filteredSites = filter === "All" ? SITES : SITES.filter(s => s.county === filter);

  const updateParam = (key, val) => {
    setParams(p => ({ ...p, [key]: isNaN(val) ? val : Number(val) }));
  };

  return (
    <div className="app">
      <style>{styles}</style>

      <header className="header">
        <div className="header-logo">Feasa<span>.</span>ie</div>
        <div className="header-nav">
          <span className="header-badge">Ireland Beta</span>
        </div>
      </header>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">Development Sites</div>
            <div className="filter-row">
              {filters.map(f => (
                <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          {filteredSites.map(s => (
            <div key={s.id} className={`site-card ${selectedId === s.id ? "active" : ""}`} onClick={() => { setSelectedId(s.id); setActiveTab("overview"); }}>
              <div className="site-card-top">
                <div className="site-name">{s.name}</div>
                <span className={`site-badge badge-${s.statusType}`}>{s.status}</span>
              </div>
              <div className="site-location">{s.location}</div>
              <div className="site-price">{fmtM(s.landCost)}</div>
              <div className="site-meta">
                <span>{s.acres} acres</span>
                <span>{s.units} units</span>
                <span>{fmt(s.pricePerSqm)}/m²</span>
              </div>
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main className="main">
          {!site ? (
            <div className="empty-state">
              <div className="empty-title">Development Intelligence<br />for the Irish Market</div>
              <h3>Select a site to begin analysis</h3>
              <p style={{ marginTop: 8, fontSize: 14 }}>8 live Irish development sites with full feasibility modelling</p>
            </div>
          ) : (
            <>
              <div className="site-detail-header">
                <div className="site-detail-title">{site.name}</div>
                <div className="site-detail-sub">{site.location} · {site.acres} acres · Planning Ref: {site.planningRef}</div>
              </div>

              <div className="tabs">
                {["overview", "appraisal", "qs", "cashflow", "sensitivity", "funding", "btr"].map(t => (
                  <button key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
                    {t === "qs" ? "QS Costs" : t === "cashflow" ? "Cash Flow" : t === "btr" ? "BTR Analysis" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <>
                  <div className="card">
                    <div className="card-title">Adjustable Parameters</div>
                    <div className="params-grid">
                      <div className="param-item">
                        <label>Units</label>
                        <input type="number" value={params.units || ""} onChange={e => updateParam("units", e.target.value)} />
                      </div>
                      <div className="param-item">
                        <label>Land Cost (€)</label>
                        <input type="number" value={params.landCost || ""} onChange={e => updateParam("landCost", e.target.value)} />
                      </div>
                      <div className="param-item">
                        <label>Sale Price (€/m²)</label>
                        <input type="number" value={params.pricePerSqm || ""} onChange={e => updateParam("pricePerSqm", e.target.value)} />
                      </div>
                      <div className="param-item">
                        <label>Finance Rate (%)</label>
                        <input type="number" step="0.1" value={params.financeRate || ""} onChange={e => updateParam("financeRate", e.target.value)} />
                      </div>
                      <div className="param-item">
                        <label>Building Type</label>
                        <select value={params.buildingType || ""} onChange={e => updateParam("buildingType", e.target.value)}>
                          <option>Apartments</option>
                          <option>Housing Estate</option>
                          <option>Mixed (Houses & Apts)</option>
                        </select>
                      </div>
                      <div className="param-item">
                        <label>Discount Rate (%)</label>
                        <input type="number" step="0.5" value={params.discountRate || ""} onChange={e => updateParam("discountRate", e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="two-col">
                    <div className="card">
                      <div className="card-title">Constraints</div>
                      {site.constraints.map((c, i) => (
                        <div key={i} style={{ fontSize: 14, color: "var(--text-secondary)", padding: "8px 0", borderBottom: i < site.constraints.length - 1 ? "1px solid var(--border)" : "none" }}>⚠ {c}</div>
                      ))}
                    </div>
                    <div className="card">
                      <div className="card-title">Opportunities</div>
                      {site.opportunities.map((o, i) => (
                        <div key={i} style={{ fontSize: 14, color: "var(--accent-green)", padding: "8px 0", borderBottom: i < site.opportunities.length - 1 ? "1px solid var(--border)" : "none" }}>✓ {o}</div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-title">Comparable Sales Evidence (PPR)</div>
                    <table>
                      <thead><tr><th>Address</th><th>Date</th><th className="td-right">Price</th><th className="td-right">Size</th><th className="td-right">€/m²</th></tr></thead>
                      <tbody>
                        {site.comparables.map((c, i) => (
                          <tr key={i}>
                            <td>{c.address}</td>
                            <td className="td-mono">{c.date}</td>
                            <td className="td-mono td-right">{c.price}</td>
                            <td className="td-mono td-right">{c.sqm}</td>
                            <td className="td-mono td-right">{c.psm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* APPRAISAL TAB */}
              {activeTab === "appraisal" && metrics && (
                <>
                  <div className={`verdict ${metrics.viability}`}>
                    <div className="verdict-title">{metrics.viabilityLabel}</div>
                    <div className="verdict-sub">Profit on GDV: {pct(metrics.profitOnGDV)} · Profit on Cost: {pct(metrics.profitOnCost)} · IRR: {pct(metrics.irr)}</div>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-card blue">
                      <div className="metric-label">Gross Dev Value</div>
                      <div className="metric-value">{fmtM(metrics.gdv)}</div>
                      <div className="metric-sub">Net GDV: {fmtM(metrics.netGDV)}</div>
                    </div>
                    <div className="metric-card green">
                      <div className="metric-label">Profit</div>
                      <div className="metric-value">{fmtM(metrics.profit)}</div>
                      <div className="metric-sub">{pct(metrics.profitOnGDV)} on GDV</div>
                    </div>
                    <div className="metric-card amber">
                      <div className="metric-label">IRR (Equity)</div>
                      <div className="metric-value">{pct(metrics.irr)}</div>
                      <div className="metric-sub">NPV: {fmtM(metrics.npv)}</div>
                    </div>
                    <div className="metric-card green">
                      <div className="metric-label">Equity Multiple</div>
                      <div className="metric-value">{metrics.equityMultiple.toFixed(2)}x</div>
                      <div className="metric-sub">ROE: {pct(metrics.returnOnEquity)}</div>
                    </div>
                  </div>
                  <div className="two-col">
                    <div className="card">
                      <div className="card-title">Revenue</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Value</th></tr></thead>
                        <tbody>
                          <tr><td>{params.units} units @ {fmt(metrics.avgUnitPrice)}</td><td className="td-mono td-right">{fmtM(metrics.gdv)}</td></tr>
                          <tr><td>Part V deduction ({site.partV}%)</td><td className="td-mono td-right" style={{ color: "var(--accent-red)" }}>-{fmtM(metrics.gdv * site.partV / 100 * 0.03)}</td></tr>
                          <tr><td style={{ fontWeight: 600 }}>Net GDV</td><td className="td-mono td-right" style={{ fontWeight: 600 }}>{fmtM(metrics.netGDV)}</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="card">
                      <div className="card-title">Total Cost Summary</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Value</th></tr></thead>
                        <tbody>
                          <tr><td>Land Acquisition</td><td className="td-mono td-right">{fmtM(params.landCost)}</td></tr>
                          <tr><td>Construction</td><td className="td-mono td-right">{fmtM(metrics.constructionCost)}</td></tr>
                          <tr><td>Professional Fees (13%)</td><td className="td-mono td-right">{fmtM(metrics.professionalFees)}</td></tr>
                          <tr><td>Development Levy</td><td className="td-mono td-right">{fmtM(metrics.devLevy)}</td></tr>
                          <tr><td>Part V Obligation</td><td className="td-mono td-right">{fmtM(metrics.partVCost)}</td></tr>
                          <tr><td>Finance Cost ({params.financeRate}%)</td><td className="td-mono td-right">{fmtM(metrics.financeCost)}</td></tr>
                          <tr><td style={{ fontWeight: 600 }}>Total Cost</td><td className="td-mono td-right" style={{ fontWeight: 600 }}>{fmtM(metrics.totalCost)}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-title">Key Metrics</div>
                    <table>
                      <thead><tr><th>Metric</th><th className="td-right">Value</th><th>Benchmark</th></tr></thead>
                      <tbody>
                        <tr><td>Profit on GDV</td><td className="td-mono td-right">{pct(metrics.profitOnGDV)}</td><td style={{ color: "var(--text-muted)", fontSize: 13 }}>Target: ≥15%</td></tr>
                        <tr><td>Profit on Cost</td><td className="td-mono td-right">{pct(metrics.profitOnCost)}</td><td style={{ color: "var(--text-muted)", fontSize: 13 }}>Target: ≥20%</td></tr>
                        <tr><td>IRR (Project)</td><td className="td-mono td-right">{pct(metrics.irr)}</td><td style={{ color: "var(--text-muted)", fontSize: 13 }}>Target: ≥15%</td></tr>
                        <tr><td>Equity Required</td><td className="td-mono td-right">{fmtM(metrics.equityRequired)}</td><td style={{ color: "var(--text-muted)", fontSize: 13 }}>{params.ltc}% LTC debt</td></tr>
                        <tr><td>Residual Land Value</td><td className="td-mono td-right">{fmtM(metrics.rlv)}</td><td style={{ color: metrics.rlv >= params.landCost ? "var(--accent-green)" : "var(--accent-red)", fontSize: 13 }}>{metrics.rlv >= params.landCost ? `${pct(((metrics.rlv - params.landCost) / params.landCost) * 100)} above ask` : `${fmtM(params.landCost - metrics.rlv)} over RLV`}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* QS TAB */}
              {activeTab === "qs" && metrics && (
                <>
                  <div className="card">
                    <div className="card-title">Elemental Cost Breakdown — Construction ({fmtM(metrics.constructionCost)})</div>
                    {metrics.qs.map((q, i) => (
                      <div key={i} className="cost-row">
                        <div className="cost-label">{q.label}</div>
                        <div className="cost-bar-wrap">
                          <div className="cost-bar" style={{ width: `${(q.pct / 14) * 100}%`, background: `hsl(${200 + i * 8}, 45%, 45%)` }} />
                        </div>
                        <div className="cost-value">{fmt(q.cost)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="card">
                    <div className="card-title">Professional Fees & Statutory Costs</div>
                    <table>
                      <thead><tr><th>Item</th><th className="td-right">Cost</th><th className="td-right">Rate</th></tr></thead>
                      <tbody>
                        <tr><td>Architect</td><td className="td-mono td-right">{fmt(metrics.constructionCost * 0.045)}</td><td className="td-mono td-right">4.5%</td></tr>
                        <tr><td>Structural Engineer</td><td className="td-mono td-right">{fmt(metrics.constructionCost * 0.02)}</td><td className="td-mono td-right">2.0%</td></tr>
                        <tr><td>Mechanical & Electrical Engineer</td><td className="td-mono td-right">{fmt(metrics.constructionCost * 0.018)}</td><td className="td-mono td-right">1.8%</td></tr>
                        <tr><td>Quantity Surveyor</td><td className="td-mono td-right">{fmt(metrics.constructionCost * 0.015)}</td><td className="td-mono td-right">1.5%</td></tr>
                        <tr><td>Planning Consultant</td><td className="td-mono td-right">{fmt(metrics.constructionCost * 0.01)}</td><td className="td-mono td-right">1.0%</td></tr>
                        <tr><td>Assigned Certifier (BC(A)R)</td><td className="td-mono td-right">{fmt(metrics.bcar)}</td><td className="td-mono td-right">{fmt(site.devLevy / 15.5)}/unit</td></tr>
                        <tr><td>Irish Water Connection Charges</td><td className="td-mono td-right">{fmt(metrics.irishWater)}</td><td className="td-mono td-right">€3,500/unit</td></tr>
                        <tr><td>Development Contribution Levy</td><td className="td-mono td-right">{fmt(metrics.devLevy)}</td><td className="td-mono td-right">{fmt(site.devLevy)}/unit</td></tr>
                        <tr><td>Part V Obligation</td><td className="td-mono td-right">{fmt(metrics.partVCost)}</td><td className="td-mono td-right">{site.partV}%</td></tr>
                        <tr><td>VAT on Construction (13.5%)</td><td className="td-mono td-right">{fmt(metrics.vat)}</td><td className="td-mono td-right">13.5%</td></tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* CASH FLOW TAB */}
              {activeTab === "cashflow" && metrics && (
                <>
                  <div className="card">
                    <div className="card-title">Monthly Cost & Revenue (€000s)</div>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={metrics.monthlyData} barGap={0}>
                        <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "DM Mono" }} interval={3} />
                        <YAxis tick={{ fontSize: 10, fontFamily: "DM Mono" }} />
                        <Tooltip formatter={(v) => `€${v}k`} contentStyle={{ fontFamily: "DM Mono", fontSize: 12 }} />
                        <Bar dataKey="cost" name="Cost" fill="#8B3A3A" opacity={0.8} />
                        <Bar dataKey="revenue" name="Revenue" fill="#2D6A4F" opacity={0.8} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="card">
                    <div className="card-title">Cumulative Position (€000s)</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={metrics.monthlyData}>
                        <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "DM Mono" }} interval={3} />
                        <YAxis tick={{ fontSize: 10, fontFamily: "DM Mono" }} />
                        <Tooltip formatter={(v) => `€${v}k`} contentStyle={{ fontFamily: "DM Mono", fontSize: 12 }} />
                        <Area type="monotone" dataKey="cumulative" stroke="#2C4A6E" fill="#EBF0F7" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="card">
                    <div className="card-title">Monthly Detail (€000s)</div>
                    <div style={{ maxHeight: 320, overflowY: "auto" }}>
                      <table>
                        <thead><tr><th>Month</th><th className="td-right">Cost</th><th className="td-right">Revenue</th><th className="td-right">Net</th><th className="td-right">Cumulative</th></tr></thead>
                        <tbody>
                          {metrics.monthlyData.map((row, i) => (
                            <tr key={i}>
                              <td className="td-mono">{row.month}</td>
                              <td className="td-mono td-right" style={{ color: "var(--accent-red)" }}>-€{row.cost}k</td>
                              <td className="td-mono td-right" style={{ color: "var(--accent-green)" }}>€{row.revenue}k</td>
                              <td className="td-mono td-right">{row.revenue - row.cost >= 0 ? "+" : ""}€{row.revenue - row.cost}k</td>
                              <td className="td-mono td-right" style={{ color: row.cumulative >= 0 ? "var(--accent-green)" : "var(--accent-red)" }}>€{row.cumulative}k</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* SENSITIVITY TAB */}
              {activeTab === "sensitivity" && metrics && (
                <>
                  <div className="card">
                    <div className="card-title">Profit on GDV Sensitivity — Revenue vs Construction Cost</div>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>Rows = Revenue change · Columns = Cost change</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: 4 }}>
                      <div />
                      {[-10, -5, 0, +5, +10].map(c => (
                        <div key={c} style={{ fontFamily: "var(--font-mono)", fontSize: 11, textAlign: "center", color: "var(--text-muted)", padding: "4px 0" }}>{c > 0 ? "+" : ""}{c}%</div>
                      ))}
                      {[-10, -5, 0, +5, +10].map(r => (
                        <>
                          <div key={`r${r}`} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>{r > 0 ? "+" : ""}{r}%</div>
                          {[-10, -5, 0, +5, +10].map(c => {
                            const adjRevenue = metrics.netGDV * (1 + r / 100);
                            const adjCost = metrics.totalCost * (1 + c / 100);
                            const adjProfit = adjRevenue - adjCost;
                            const adjProfPct = (adjProfit / adjRevenue) * 100;
                            const bg = adjProfPct >= 15 ? "var(--accent-green-light)" : adjProfPct >= 8 ? "var(--accent-amber-light)" : "var(--accent-red-light)";
                            const col = adjProfPct >= 15 ? "var(--accent-green)" : adjProfPct >= 8 ? "var(--accent-amber)" : "var(--accent-red)";
                            return (
                              <div key={c} className="sens-cell" style={{ background: bg, color: col }}>
                                {pct(adjProfPct)}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-title">Risk Scenarios</div>
                    <table>
                      <thead><tr><th>Scenario</th><th className="td-right">GDV</th><th className="td-right">Cost</th><th className="td-right">Profit</th><th className="td-right">% GDV</th></tr></thead>
                      <tbody>
                        {[
                          { name: "Base Case", label: "blue", rev: 1, cost: 1 },
                          { name: "Construction Overrun (+10%)", label: "amber", rev: 1, cost: 1.1 },
                          { name: "Market Downturn (-10%)", label: "amber", rev: 0.9, cost: 1 },
                          { name: "Worst Case (-10% rev, +10% cost)", label: "red", rev: 0.9, cost: 1.1 },
                          { name: "Best Case (+10% rev, -5% cost)", label: "green", rev: 1.1, cost: 0.95 },
                          { name: "Inflation Scenario (+15% cost)", label: "red", rev: 1, cost: 1.15 },
                        ].map((sc, i) => {
                          const adjGDV = metrics.netGDV * sc.rev;
                          const adjCost = metrics.totalCost * sc.cost;
                          const adjProfit = adjGDV - adjCost;
                          const adjPct = (adjProfit / adjGDV) * 100;
                          return (
                            <tr key={i}>
                              <td><span className={`scenario-badge badge-${sc.label}`}>{sc.name}</span></td>
                              <td className="td-mono td-right">{fmtM(adjGDV)}</td>
                              <td className="td-mono td-right">{fmtM(adjCost)}</td>
                              <td className="td-mono td-right" style={{ color: adjProfit > 0 ? "var(--accent-green)" : "var(--accent-red)" }}>{fmtM(adjProfit)}</td>
                              <td className="td-mono td-right" style={{ color: adjPct >= 15 ? "var(--accent-green)" : adjPct >= 8 ? "var(--accent-amber)" : "var(--accent-red)" }}>{pct(adjPct)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* FUNDING TAB */}
              {activeTab === "funding" && metrics && (
                <>
                  <div className="two-col">
                    <div className="card">
                      <div className="card-title">Capital Structure</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Amount</th></tr></thead>
                        <tbody>
                          <tr><td>Total Project Cost</td><td className="td-mono td-right">{fmtM(metrics.totalCost)}</td></tr>
                          <tr><td>Senior Debt ({params.ltc}% LTC)</td><td className="td-mono td-right">{fmtM(metrics.totalCost * params.ltc / 100)}</td></tr>
                          <tr><td>Equity Required</td><td className="td-mono td-right">{fmtM(metrics.equityRequired)}</td></tr>
                          <tr><td>Interest Rate</td><td className="td-mono td-right">{params.financeRate}%</td></tr>
                          <tr><td>Finance Cost</td><td className="td-mono td-right">{fmtM(metrics.financeCost)}</td></tr>
                          <tr><td>Return on Equity</td><td className="td-mono td-right">{pct(metrics.returnOnEquity)}</td></tr>
                          <tr><td>Equity Multiple</td><td className="td-mono td-right">{metrics.equityMultiple.toFixed(2)}x</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="card">
                      <div className="card-title">Irish Statutory Costs Detail</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Rate</th><th className="td-right">Total</th></tr></thead>
                        <tbody>
                          <tr><td>Development Contribution Levy</td><td className="td-mono td-right">{fmt(site.devLevy)}/unit</td><td className="td-mono td-right">{fmtM(metrics.devLevy)}</td></tr>
                          <tr><td>Part V (Social Housing)</td><td className="td-mono td-right">{site.partV}%</td><td className="td-mono td-right">{fmtM(metrics.partVCost)}</td></tr>
                          <tr><td>BC(A)R Certifier</td><td className="td-mono td-right">€1,800/unit</td><td className="td-mono td-right">{fmtM(metrics.bcar)}</td></tr>
                          <tr><td>Irish Water Connection</td><td className="td-mono td-right">€3,500/unit</td><td className="td-mono td-right">{fmtM(metrics.irishWater)}</td></tr>
                          <tr><td>VAT on Construction</td><td className="td-mono td-right">13.5%</td><td className="td-mono td-right">{fmtM(metrics.vat)}</td></tr>
                          <tr><td>Marketing & Sales</td><td className="td-mono td-right">2.5%</td><td className="td-mono td-right">{fmtM(metrics.marketing)}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* BTR TAB */}
              {activeTab === "btr" && metrics && (
                <>
                  <div className="two-col">
                    <div className="card">
                      <div className="card-title">Build to Sell</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Value</th></tr></thead>
                        <tbody>
                          <tr><td>Net GDV</td><td className="td-mono td-right">{fmtM(metrics.netGDV)}</td></tr>
                          <tr><td>Total Cost</td><td className="td-mono td-right">{fmtM(metrics.totalCost)}</td></tr>
                          <tr><td>Profit</td><td className="td-mono td-right" style={{ color: "var(--accent-green)" }}>{fmtM(metrics.profit)}</td></tr>
                          <tr><td>Profit on GDV</td><td className="td-mono td-right">{pct(metrics.profitOnGDV)}</td></tr>
                          <tr><td>IRR</td><td className="td-mono td-right">{pct(metrics.irr)}</td></tr>
                          <tr><td>Equity Multiple</td><td className="td-mono td-right">{metrics.equityMultiple.toFixed(2)}x</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="card">
                      <div className="card-title">Build to Rent</div>
                      <table>
                        <thead><tr><th>Item</th><th className="td-right">Value</th></tr></thead>
                        <tbody>
                          <tr><td>Monthly Rent (avg)</td><td className="td-mono td-right">{fmt(site.monthlyRent)}/unit</td></tr>
                          <tr><td>Annual Rent Roll (95% occ.)</td><td className="td-mono td-right">{fmtM(metrics.annualRent)}</td></tr>
                          <tr><td>Gross Yield on Cost</td><td className="td-mono td-right">{pct(metrics.grossYield)}</td></tr>
                          <tr><td>Operating Costs (25%)</td><td className="td-mono td-right">-{fmtM(metrics.annualRent * 0.25)}</td></tr>
                          <tr><td>Net Yield on Cost</td><td className="td-mono td-right">{pct(metrics.netYield)}</td></tr>
                          <tr><td>Payback Period</td><td className="td-mono td-right">{(metrics.totalCost / (metrics.annualRent * 0.75)).toFixed(1)} years</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-title">Exit Strategy Comparison</div>
                    <table>
                      <thead><tr><th>Metric</th><th className="td-right">Build to Sell</th><th className="td-right">Build to Rent</th></tr></thead>
                      <tbody>
                        <tr><td>Total Return</td><td className="td-mono td-right">{fmtM(metrics.profit)}</td><td className="td-mono td-right">{fmtM(metrics.annualRent * 0.75 * 10)} (10yr)</td></tr>
                        <tr><td>Annual Yield</td><td className="td-mono td-right">{pct(metrics.profitOnGDV)} (one-off)</td><td className="td-mono td-right">{pct(metrics.netYield)} p.a.</td></tr>
                        <tr><td>Risk Profile</td><td className="td-mono td-right">Medium — market timing</td><td className="td-mono td-right">Low — recurring income</td></tr>
                        <tr><td>Capital Recycling</td><td className="td-mono td-right">Fast — exit on completion</td><td className="td-mono td-right">Slow — long-term hold</td></tr>
                        <tr><td>Recommended</td><td className="td-mono td-right" style={{ color: metrics.profitOnGDV > metrics.netYield * 3 ? "var(--accent-green)" : "var(--text-muted)" }}>{metrics.profitOnGDV > metrics.netYield * 3 ? "✓ Preferred" : "—"}</td><td className="td-mono td-right" style={{ color: metrics.netYield > metrics.profitOnGDV / 3 ? "var(--accent-green)" : "var(--text-muted)" }}>{metrics.netYield > metrics.profitOnGDV / 3 ? "✓ Preferred" : "—"}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
