/* Lucas Ribeiro: portfólio
   Dados (projetos, textos, contato) ficam em data.js. */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
if (hasGsap) gsap.registerPlugin(ScrollTrigger);

const lang = "pt"; // site somente em português
let filter = "all";
let activeSkill = null;
const t = (k) => I18N[lang][k];
const ui = (k) => I18N[lang].ui[k];

/* =========================================================
   Smooth scroll (Lenis) ligado ao ScrollTrigger
   ========================================================= */
let lenis = null;
if (!reduced && typeof Lenis !== "undefined" && hasGsap) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : document.querySelector(id);
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  });
}
const lockScroll = (on) => lenis && (on ? lenis.stop() : lenis.start());

/* =========================================================
   i18n
   ========================================================= */
function applyLang() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  $$("[data-i18n]").forEach((el) => { const v = t(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
  splitScrub();
  renderFilters(); renderTrack(); renderStops(); renderSkills(); renderContact(); renderMarquee();
  if (activeSkill) showSkill(activeSkill);
  if (hasGsap) requestAnimationFrame(() => { buildRoad(); ScrollTrigger.refresh(); });
}

/* =========================================================
   Texto que "acende" palavra por palavra
   ========================================================= */
function splitScrub() {
  const el = $("#scrubText");
  el.innerHTML = el.textContent.split(/\s+/).map((w) => `<span class="w">${esc(w)}</span>`).join(" ");
  if (scrubST) scrubST.refresh();
}
let scrubST = null;
function setupScrub() {
  if (!hasGsap || reduced) return;
  scrubST = ScrollTrigger.create({
    trigger: "#scrubText", start: "top 80%", end: "bottom 40%", scrub: true,
    onUpdate(self) {
      const ws = $$("#scrubText .w"), lit = Math.round(self.progress * ws.length);
      ws.forEach((w, i) => (w.style.opacity = i < lit ? 1 : 0.14));
    },
  });
}

/* =========================================================
   Mockups (projetos sem screenshot)
   ========================================================= */
function mockHTML(kind) {
  if (kind === "chat") return `<div class="mock chat">
    <div class="bubble in">Oi! Vocês abrem domingo?</div>
    <div class="bubble out">Olá! 👋 Abrimos das 10h às 18h. Quer que eu reserve um horário?</div>
    <div class="bubble in">Quero, às 15h pra 2 pessoas</div>
    <div class="bubble out typing"><i></i><i></i><i></i></div></div>`;
  if (kind === "cal") {
    const ev = { 4: "ev", 9: "ev2", 12: "ev", 18: "ev", 19: "ev2", 25: "ev", 27: "ev2" };
    return `<div class="mock cal"><div class="cal-head"><span>NOV 2026</span><span>● 7 shows</span></div><div class="cal-grid">${
      Array.from({ length: 28 }, (_, i) => `<span class="${ev[i] || ""}">${i + 1}</span>`).join("")}</div></div>`;
  }
  if (kind === "bible") return `<div class="mock bible"><div class="side"><span>❧ semente</span><span>Bíblia</span><span>Biblioteca</span><span>Meus estudos</span></div>
    <div class="verse"><b>Apocalipse 21</b><br/>³ … Eis o tabernáculo de Deus com os homens, <mark>pois com eles habitará</mark>, e eles serão o seu povo…</div></div>`;
  if (kind === "sheet") return `<div class="mock sheet"><div class="row h"><span>empresa</span><span>segmento</span><span style="text-align:right">score</span></div>${
    [["Studio Aurora", "eventos", 92], ["Vértice Marcas", "varejo", 88], ["Casa Lume", "gastronomia", 81], ["Pulse Fest", "festivais", 79], ["Nobre Imóveis", "imobiliário", 74]]
      .map((r) => `<div class="row"><span>${r[0]}</span><span>${r[1]}</span><span class="score">${r[2]}</span></div>`).join("")}</div>`;
  if (kind === "video") return `<div class="mock video"><div class="play">▶</div><div style="margin-top:12px">EP. 01 · Apocalipse: a primeira curiosidade</div><div class="wave">${
    Array.from({ length: 28 }, (_, i) => `<i style="animation-delay:${(i % 7) * 0.12}s"></i>`).join("")}</div></div>`;
  return "";
}
const visual = (p) => (p.img ? `<img src="${p.img}" alt="${esc(p[lang].title)}" loading="lazy" />` : mockHTML(p.mock));

/* =========================================================
   Projetos
   ========================================================= */
function renderFilters() {
  const f = t("filters");
  $("#filters").innerHTML = Object.keys(f).map((k) => {
    const n = k === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cats.includes(k)).length;
    return `<button class="chip" role="tab" data-f="${k}" aria-selected="${filter === k}">${f[k]}<span class="n">${n}</span></button>`;
  }).join("");
}
$("#filters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-f]"); if (!b) return;
  filter = b.dataset.f; renderFilters(); applyFilter();
  if (hasGsap) ScrollTrigger.refresh();
});
function applyFilter() {
  $$(".card").forEach((c) => c.classList.toggle("hide", filter !== "all" && !c.dataset.cats.split(" ").includes(filter)));
}
function renderTrack() {
  $("#track").innerHTML = PROJECTS.map((p, i) => {
    const d = p[lang];
    const badge = p.live ? `<span class="badge live">${ui("live")}</span>` : p.proto ? `<span class="badge">${ui("proto")}</span>` : "";
    return `<button class="card" data-id="${p.id}" data-cats="${p.cats.join(" ")}">
      <span class="idx">${String(i + 1).padStart(2, "0")}</span>
      <div class="thumb">${badge}${visual(p)}</div>
      <div class="card-body">
        <span class="card-meta">${esc(d.type)} · ${p.year}</span>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.short)}</p>
        <div class="tags">${p.stack.slice(0, 4).map((s) => `<span class="tag">${esc(s)}</span>`).join("")}${p.stack.length > 4 ? `<span class="tag">+${p.stack.length - 4}</span>` : ""}</div>
        <span class="more">${ui("details")} →</span>
      </div></button>`;
  }).join("");
  applyFilter();
  bindTilt();
}
$("#track").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c && !dragged) openProject(c.dataset.id); });

function bindTilt() {
  if (reduced || matchMedia("(hover: none)").matches) return;
  $$(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`); card.style.setProperty("--my", `${y * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ""; });
  });
}
let dragged = false;

/* =========================================================
   Modal de projeto
   ========================================================= */
const modal = $("#modal");
let current = 0;
function openProject(id) {
  current = PROJECTS.findIndex((p) => p.id === id);
  if (current < 0) return;
  const p = PROJECTS[current], d = p[lang];
  $("#modalBody").innerHTML = `
    <div class="m-hero">${visual(p)}</div>
    <div class="m-content">
      <span class="card-meta">${esc(d.type)} · ${p.year}</span>
      <h3 id="mTitle">${esc(d.title)}</h3>
      <p>${esc(d.short)}</p>
      <div class="m-cols">
        <div>
          <h4>${ui("problem")}</h4><p>${esc(d.problem)}</p>
          <h4>${ui("solution")}</h4><p>${esc(d.solution)}</p>
          <h4>${ui("highlights")}</h4><ul>${d.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>${ui("stack")}</h4>
          <div class="tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          ${p.live ? `<div class="m-actions"><a class="btn dark" href="${p.live}" target="_blank" rel="noopener">${ui("visit")} ↗</a></div>` : ""}
        </div>
      </div>
    </div>
    <div class="m-nav"><button data-step="-1">${ui("prev")}</button><span>${current + 1} / ${PROJECTS.length}</span><button data-step="1">${ui("next")}</button></div>`;
  if (!modal.open) { modal.showModal(); lockScroll(true); }
  modal.scrollTop = 0;
  history.replaceState(null, "", `#${p.id}`);
}
modal.addEventListener("close", () => { lockScroll(false); history.replaceState(null, "", location.pathname + location.search); });
$("#modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
  const s = e.target.closest("[data-step]");
  if (s) openProject(PROJECTS[(current + +s.dataset.step + PROJECTS.length) % PROJECTS.length].id);
});
document.addEventListener("keydown", (e) => {
  if (!modal.open) return;
  if (e.key === "ArrowRight") openProject(PROJECTS[(current + 1) % PROJECTS.length].id);
  if (e.key === "ArrowLeft") openProject(PROJECTS[(current - 1 + PROJECTS.length) % PROJECTS.length].id);
});

/* =========================================================
   Trajetória: estrada com caminhão
   ========================================================= */
function renderStops() {
  // ordem cronológica: do Exército até hoje
  $("#stops").innerHTML = [...JOURNEY].reverse().map((j) => {
    const d = j[lang];
    return `<li class="stop"><span class="when">${j.when}</span><h3>${esc(d.title)}</h3><div class="org">${esc(d.org)}</div>
      <ul>${d.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></li>`;
  }).join("");
}
let roadLen = 0;
function buildRoad() {
  const body = $("#roadBody"), svg = $("#roadSvg");
  const W = body.clientWidth, H = body.clientHeight;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const mobile = W < 900;
  const pts = [[mobile ? 42 : W / 2, 0]];
  $$(".stop").forEach((s, i) => {
    const y = s.offsetTop + s.offsetHeight / 2;
    pts.push([mobile ? 42 : (i % 2 === 0 ? W * 0.68 : W * 0.32), y]);
  });
  pts.push([mobile ? 42 : W / 2, H]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], dy = (y1 - y0) / 2;
    d += ` C${x0},${y0 + dy} ${x1},${y1 - dy} ${x1},${y1}`;
  }
  ["#roadPath", "#roadEdge", "#roadAsphalt", "#roadTint", "#roadLine"].forEach((id) => $(id).setAttribute("d", d));
  // caminhão visto de cima: foto 700x120, cabine apontando para a esquerda
  const len = mobile ? 130 : 220, wid = len * (120 / 700);
  const img = $("#roadTruckImg");
  img.setAttribute("width", len); img.setAttribute("height", wid);
  img.setAttribute("x", -len / 2); img.setAttribute("y", -wid / 2);
  img.setAttribute("transform", "rotate(180)");
  roadLen = $("#roadPath").getTotalLength();
  placeTruck(roadProgress);
}
let roadProgress = 0;
function placeTruck(p) {
  roadProgress = p;
  const path = $("#roadPath");
  if (!roadLen) return;
  const L = Math.max(0, Math.min(roadLen - 1, p * roadLen));
  const a = path.getPointAtLength(L), b = path.getPointAtLength(Math.min(roadLen, L + 2));
  const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
  $("#roadTruck").setAttribute("transform", `translate(${a.x},${a.y}) rotate(${ang})`);
  $$(".stop").forEach((s) => s.classList.toggle("on", reduced || a.y >= s.offsetTop + 20));
}

/* =========================================================
   Skills
   ========================================================= */
const skillName = (s) => (typeof s === "string" ? s : s.n);
const skillLvl = (s) => (typeof s === "string" ? "strong" : s.l);
function renderSkills() {
  $("#skillGroups").innerHTML = SKILLS.map((g) => `<div class="skill-group"><h3>${g.group[lang]}</h3><div class="skill-list">${
    g.items.map((s) => `<button class="skill" data-skill="${esc(skillName(s))}" aria-pressed="${activeSkill === skillName(s)}"><span class="lvl ${skillLvl(s)}"></span>${esc(skillName(s))}</button>`).join("")
  }</div></div>`).join("") + `<div class="legend"><span><span class="lvl"></span>${ui("strong")}</span><span><span class="lvl learning"></span>${ui("learning")}</span></div>`;
  if (!activeSkill) $("#skillPanel").innerHTML = `<p class="sp-muted">${t("skills.pick")}</p>`;
}
function showSkill(name) {
  activeSkill = name;
  $$(".skill").forEach((b) => b.setAttribute("aria-pressed", b.dataset.skill === name));
  const used = PROJECTS.filter((p) => p.stack.includes(name));
  $("#skillPanel").innerHTML = `<p class="kicker mono">${ui("usedIn")}</p><h4>${esc(name)}</h4>
    <p class="sp-muted">${used.length} ${ui("projects")}</p>
    ${used.length ? `<div class="sp-list">${used.map((p) => `<button class="sp-item" data-open="${p.id}"><span>${esc(p[lang].title)}</span><span class="sp-muted">→</span></button>`).join("")}</div>`
      : `<p class="sp-muted" style="margin-top:14px">${ui("noProjects")}</p>`}`;
}
$("#skillGroups").addEventListener("click", (e) => {
  const b = e.target.closest(".skill"); if (!b) return;
  if (activeSkill === b.dataset.skill) { activeSkill = null; renderSkills(); }
  else showSkill(b.dataset.skill);
});
$("#skillPanel").addEventListener("click", (e) => { const b = e.target.closest("[data-open]"); if (b) openProject(b.dataset.open); });

/* =========================================================
   Contato + marquee
   ========================================================= */
function renderContact() {
  const links = [
    { label: "LinkedIn", value: CONFIG.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: CONFIG.linkedin },
    { label: "GitHub", value: CONFIG.github.replace(/^https?:\/\//, ""), href: CONFIG.github },
    { label: "Email", value: CONFIG.email, copy: CONFIG.email },
  ];
  for (let i = links.length - 1; i >= 0; i--) if (!links[i].href && !links[i].copy) links.splice(i, 1);
  if (CONFIG.resume) links.push({ label: lang === "pt" ? "Currículo" : "Résumé", value: "PDF", href: CONFIG.resume });
  $("#contactLinks").innerHTML = links.map((l) => l.copy
    ? `<button class="c-link" data-copy="${esc(l.copy)}"><span><small>${l.label}</small>${esc(l.value)}</span><span class="arrow" data-lbl>${ui("copy")}</span></button>`
    : `<a class="c-link" href="${esc(l.href)}" target="_blank" rel="noopener"><span><small>${l.label}</small>${esc(l.value)}</span><span class="arrow">↗</span></a>`).join("");
}
$("#contactLinks").addEventListener("click", async (e) => {
  const b = e.target.closest("[data-copy]"); if (!b) return;
  try { await navigator.clipboard.writeText(b.dataset.copy); } catch { location.href = `mailto:${b.dataset.copy}`; return; }
  const lbl = $("[data-lbl]", b); lbl.textContent = ui("copied"); setTimeout(() => (lbl.textContent = ui("copy")), 1600);
});
function renderMarquee() {
  $("#marquee").innerHTML = Array.from({ length: 6 }, () => `<span>${esc(t("contact.big"))} ·</span>`).join("");
}

/* =========================================================
   Globo (canvas 2D): arraste para girar
   ========================================================= */
(function globe() {
  const c = $("#globe"), ctx = c.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W, H, R, cx, cy, rot = 0.55, vel = 0, tilt = -0.32, drag = null, visible = true;
  const N = 2600, pts = [];
  for (let i = 0; i < N; i++) {           // esfera de Fibonacci
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = Math.PI * (3 - Math.sqrt(5)) * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  const ll = (lat, lon) => { const a = (lat * Math.PI) / 180, b = (lon * Math.PI) / 180; return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)]; };
  const cities = {
    sp: { p: ll(-23.5, -46.6), n: "SÃO PAULO" }, ny: { p: ll(40.7, -74), n: "NEW YORK" }, lis: { p: ll(38.7, -9.1), n: "LISBOA" },
    sf: { p: ll(37.7, -122.4), n: "SAN FRANCISCO" }, lon: { p: ll(51.5, -0.1), n: "LONDON" }, tok: { p: ll(35.7, 139.7), n: "TOKYO" },
  };
  const routes = ["ny", "lis", "sf", "lon", "tok"].map((k, i) => ({ to: cities[k], off: i * 0.22 }));
  function project([x, y, z]) {
    const ca = Math.cos(rot), sa = Math.sin(rot), cb = Math.cos(tilt), sb = Math.sin(tilt);
    const x1 = x * ca + z * sa, z1 = -x * sa + z * ca;
    const y2 = y * cb - z1 * sb, z2 = y * sb + z1 * cb;
    return [cx + x1 * R, cy - y2 * R, z2];
  }
  function slerp(a, b, t) {
    const dot = Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), om = Math.acos(dot), so = Math.sin(om) || 1;
    const k1 = Math.sin((1 - t) * om) / so, k2 = Math.sin(t * om) / so, lift = 1 + 0.2 * Math.sin(Math.PI * t);
    return [(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift];
  }
  function size() {
    W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const mobile = W < 900;
    R = mobile ? W * 0.55 : Math.min(W * 0.27, H * 0.44);
    cx = mobile ? W * 0.78 : W * 0.73; cy = mobile ? H * 0.2 : H * 0.53;
  }
  c.addEventListener("pointerdown", (e) => { drag = e.clientX; c.setPointerCapture(e.pointerId); });
  c.addEventListener("pointermove", (e) => { if (drag === null) return; vel = (e.clientX - drag) * 0.004; rot += vel; drag = e.clientX; });
  c.addEventListener("pointerup", () => (drag = null));
  new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(c);
  let time = 0;
  function frame() {
    requestAnimationFrame(frame);
    if (!visible) return;
    time += 0.006;
    if (drag === null) { vel *= 0.95; rot += (reduced ? 0 : 0.0016) + vel; }
    ctx.clearRect(0, 0, W, H);
    // halo
    const g = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.22);
    g.addColorStop(0, "rgba(122,162,255,0)"); g.addColorStop(0.18, "rgba(198,244,50,.35)"); g.addColorStop(0.32, "rgba(122,162,255,.18)"); g.addColorStop(1, "rgba(31,51,255,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill();
    const body = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
    body.addColorStop(0, "#0d1440"); body.addColorStop(1, "#03040b");
    ctx.fillStyle = body; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    // pontos
    for (const p of pts) {
      const [x, y, z] = project(p);
      if (z < 0) continue;
      ctx.globalAlpha = 0.15 + z * 0.75;
      ctx.fillStyle = "#b9c8ff";
      ctx.fillRect(x, y, 1.6, 1.6);
    }
    ctx.globalAlpha = 1;
    // rotas
    const sp = cities.sp.p;
    for (const r of routes) {
      const head = ((time + r.off) % 1.4) / 1.0;
      ctx.beginPath();
      let started = false;
      for (let i = 0; i <= 60; i++) {
        const tt = i / 60;
        if (tt > Math.min(1, head)) break;
        const [x, y, z] = project(slerp(sp, r.to.p, tt));
        if (z < -0.05) { started = false; continue; }
        if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(198,244,50,.85)"; ctx.lineWidth = 1.6; ctx.stroke();
      const [tx, ty, tz] = project(r.to.p);
      if (tz > 0 && head >= 1) { ctx.fillStyle = "#c6f432"; ctx.beginPath(); ctx.arc(tx, ty, 3, 0, Math.PI * 2); ctx.fill(); }
    }
    // marcadores
    ctx.font = "500 11px 'JetBrains Mono', monospace";
    for (const k in cities) {
      const [x, y, z] = project(cities[k].p);
      if (z < 0.1) continue;
      const main = k === "sp";
      ctx.fillStyle = main ? "#c6f432" : "rgba(255,255,255,.85)";
      ctx.beginPath(); ctx.arc(x, y, main ? 5 : 2.5, 0, Math.PI * 2); ctx.fill();
      if (main) { ctx.strokeStyle = "rgba(198,244,50,.5)"; ctx.beginPath(); ctx.arc(x, y, 9 + Math.sin(time * 8) * 3, 0, Math.PI * 2); ctx.stroke(); }
      ctx.globalAlpha = Math.min(1, z * 2);
      ctx.fillText(cities[k].n, x + 10, y - 8);
      ctx.globalAlpha = 1;
    }
  }
  size(); addEventListener("resize", size); frame();
})();

/* =========================================================
   Animações de scroll
   ========================================================= */
function setupScroll() {
  if (!hasGsap) return;
  const mm = gsap.matchMedia();

  // entrada do título
  if (!reduced) gsap.from(".hero .mega .line > span", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 });

  // hero sai: texto sobe, globo cresce
  if (!reduced) {
    gsap.to("#heroInner", { yPercent: -25, opacity: 0, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to("#globe", { scale: 1.35, yPercent: 12, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
  }

  setupScrub();

  // contadores
  $$(".count").forEach((el) => {
    const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => gsap.to(o, { v: +el.dataset.to, duration: reduced ? 0 : 1.6, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) }) });
  });

  // título em dois tons
  if (!reduced) gsap.from(".two-tone span", { yPercent: 40, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".two-tone", start: "top 85%" } });

  // cena do caminhão: entra pela esquerda, para no centro, sai pela direita
  if (!reduced) {
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: "#story", start: "top top", end: "+=240%", scrub: 1.2, pin: true } });
    tl.fromTo("#storyBig", { xPercent: 8 }, { xPercent: -58, duration: 1 }, 0)
      .fromTo("#truck", { x: () => -innerWidth * 1.25 }, { x: 0, duration: 0.38, ease: "power2.out" }, 0)
      .to("#truck", { x: () => innerWidth * 1.3, duration: 0.36, ease: "power2.in" }, 0.62)
      .fromTo("#storyLane", { backgroundPositionX: 0 }, { backgroundPositionX: -900, duration: 0.38, ease: "power2.out" }, 0)
      .to("#storyLane", { backgroundPositionX: -1800, duration: 0.36, ease: "power2.in" }, 0.62);
  }

  // projetos: cards aparecem inteiros, em sequência, conforme a rolagem
  if (!reduced) {
    ScrollTrigger.batch(".card", {
      start: "top 90%", once: true,
      onEnter: (els) => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true }),
    });
  }

  // estrada
  ScrollTrigger.create({ trigger: "#roadBody", start: "top 55%", end: "bottom 55%", onUpdate: (s) => placeTruck(s.progress), onRefresh: (s) => placeTruck(s.progress) });

  // navio atravessa a tela devagar
  if (!reduced) {
    gsap.fromTo("#shipImg", { xPercent: 12, scale: 1.15 }, { xPercent: -12, scale: 1, ease: "none", scrollTrigger: { trigger: "#ship", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(".ship-text h2", { yPercent: 30, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: "#ship", start: "top 40%" } });
  }

  // marquee do contato
  gsap.fromTo("#marquee", { xPercent: 0 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom bottom", scrub: true } });

  // barra de progresso
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => ($("#progressBar").style.width = `${s.progress * 100}%`) });

  addEventListener("resize", () => { clearTimeout(window.__rb); window.__rb = setTimeout(() => { buildRoad(); ScrollTrigger.refresh(); }, 200); });
}

/* =========================================================
   Terminal
   ========================================================= */
const term = $("#term"), tOut = $("#termOut"), tIn = $("#termInput");
const hist = []; let hIdx = 0;
function print(html) { tOut.insertAdjacentHTML("beforeend", html + "\n"); tOut.scrollTop = tOut.scrollHeight; }
function openTerm() {
  term.hidden = false;
  if (!tOut.textContent) print(lang === "pt"
    ? `<span class="c">Bem-vindo(a) ao terminal do Lucas.</span>\nDigite <span class="b">help</span> para ver os comandos.`
    : `<span class="c">Welcome to Lucas's terminal.</span>\nType <span class="b">help</span> to see the commands.`);
  setTimeout(() => tIn.focus(), 30);
}
function closeTerm() { term.hidden = true; }
$("#termBtn").addEventListener("click", () => (term.hidden ? openTerm() : closeTerm()));
$("#heroTerm").addEventListener("click", openTerm);
$("#termClose").addEventListener("click", closeTerm);
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && term.hidden && !modal.open && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openTerm(); }
  else if (e.key === "Escape" && !term.hidden) closeTerm();
});
const go = (sel) => { closeTerm(); lenis ? lenis.scrollTo(sel, { duration: 1.6 }) : document.querySelector(sel).scrollIntoView({ behavior: "smooth" }); return null; };
const COMMANDS = {
  help: () => (lang === "pt" ? `Comandos disponíveis:
  <span class="b">whoami</span>       quem sou eu
  <span class="b">projetos</span>     lista os projetos
  <span class="b">open &lt;id&gt;</span>    abre um projeto (ex: open leaf-chat)
  <span class="b">stack</span>        tecnologias que uso
  <span class="b">trajetoria</span>   experiência profissional
  <span class="b">contato</span>      como falar comigo
  <span class="b">goto &lt;seção&gt;</span> rola até projetos | trajetoria | skills | contato
  <span class="b">clear</span>        limpa a tela
  <span class="b">exit</span>         fecha o terminal` : `Available commands:
  <span class="b">whoami</span>       who I am
  <span class="b">projects</span>     list projects
  <span class="b">open &lt;id&gt;</span>    open a project (e.g. open leaf-chat)
  <span class="b">stack</span>        technologies I use
  <span class="b">journey</span>      work experience
  <span class="b">contact</span>      how to reach me
  <span class="b">goto &lt;section&gt;</span> scroll to projetos | trajetoria | skills | contato
  <span class="b">lang</span>         switch language
  <span class="b">clear</span>        clear the screen
  <span class="b">exit</span>         close the terminal`),
  whoami: () => (lang === "pt"
    ? `<span class="c">${CONFIG.name}</span> · ${CONFIG.location}\nEx-sargento de logística do Exército (8 anos), hoje trabalhando com IA aplicada e machine learning.\nMachine Learning @ Stanford ✓ · Deep Learning · AWS · ADS (cursando)\nInglês fluente.`
    : `<span class="c">${CONFIG.name}</span> · ${CONFIG.location}\nFormer Army logistics sergeant (8 years), now building AI-powered web products.\nMachine Learning @ Stanford ✓ · Deep Learning · AWS · Systems Analysis (in progress)\nFluent English.`),
  projetos: () => PROJECTS.map((p) => `<span class="c">${p.id.padEnd(18)}</span>${esc(p[lang].short)}`).join("\n") + `\n<span class="d">${lang === "pt" ? "→ use open &lt;id&gt; para detalhes" : "→ use open &lt;id&gt; for details"}</span>`,
  stack: () => SKILLS.map((g) => `<span class="c">${g.group[lang]}:</span> ${g.items.map(skillName).join(", ")}`).join("\n"),
  trajetoria: () => JOURNEY.map((j) => `<span class="b">${j.when.padEnd(12)}</span>${esc(j[lang].title)} <span class="d">· ${esc(j[lang].org)}</span>`).join("\n"),
  contato: () => (CONFIG.linkedin ? `LinkedIn  <a href="${esc(CONFIG.linkedin)}" target="_blank" rel="noopener">${esc(CONFIG.linkedin)}</a>\n` : "") + `GitHub    <a href="${esc(CONFIG.github)}" target="_blank" rel="noopener">${esc(CONFIG.github)}</a>\nEmail     ${esc(CONFIG.email)}`,
  clear: () => { tOut.innerHTML = ""; return null; },
  exit: () => { closeTerm(); return null; },
  sudo: () => `<span class="e">${lang === "pt" ? "permissão negada. mas a vaga pode ser concedida 😉" : "permission denied. but the job offer can be granted 😉"}</span>`,
  ls: () => PROJECTS.map((p) => p.id).join("  "),
  hire: () => go("#contato"),
};
Object.assign(COMMANDS, { projects: COMMANDS.projetos, journey: COMMANDS.trajetoria, contact: COMMANDS.contato, about: COMMANDS.whoami, sobre: COMMANDS.whoami, skills: COMMANDS.stack });

$("#termForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const raw = tIn.value.trim(); tIn.value = "";
  print(`<span class="c">$</span> ${esc(raw)}`);
  if (!raw) return;
  hist.push(raw); hIdx = hist.length;
  const [cmd, ...args] = raw.split(/\s+/);
  const key = cmd.toLowerCase();
  if (key === "open") {
    const p = PROJECTS.find((x) => x.id === (args[0] || "").toLowerCase());
    if (p) { print(`<span class="d">${lang === "pt" ? "abrindo" : "opening"} ${p.id}…</span>`); closeTerm(); openProject(p.id); }
    else print(`<span class="e">${lang === "pt" ? "projeto não encontrado. tente:" : "project not found. try:"}</span> ${PROJECTS.map((x) => x.id).join(", ")}`);
    return;
  }
  if (key === "goto") {
    const map = { projetos: "#projetos", projects: "#projetos", trajetoria: "#trajetoria", journey: "#trajetoria", skills: "#skills", contato: "#contato", contact: "#contato" };
    const sel = map[(args[0] || "").toLowerCase()];
    if (sel) go(sel); else print(`<span class="e">goto: projetos | trajetoria | skills | contato</span>`);
    return;
  }
  const fn = COMMANDS[key];
  const out = fn ? fn(args) : `<span class="e">${lang === "pt" ? "comando não encontrado" : "command not found"}: ${esc(cmd)}</span>. ${lang === "pt" ? "digite" : "type"} <span class="b">help</span>`;
  if (out) print(out);
});
tIn.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && hIdx > 0) { tIn.value = hist[--hIdx]; e.preventDefault(); }
  else if (e.key === "ArrowDown") { hIdx = Math.min(hist.length, hIdx + 1); tIn.value = hist[hIdx] || ""; e.preventDefault(); }
  else if (e.key === "Tab") {
    e.preventDefault();
    const v = tIn.value.toLowerCase();
    if (v.startsWith("open ")) { const m = PROJECTS.find((p) => p.id.startsWith(v.slice(5))); if (m) tIn.value = `open ${m.id}`; }
    else { const m = [...Object.keys(COMMANDS), "open", "goto"].find((k) => k.startsWith(v)); if (m) tIn.value = m; }
  }
});
// o terminal rola sozinho, sem mover a página
[tOut, modal].forEach((el) => el.setAttribute("data-lenis-prevent", ""));

/* =========================================================
   Boot
   ========================================================= */
$("#year").textContent = new Date().getFullYear();
applyLang();
setupScroll();
document.fonts?.ready.then(() => { buildRoad(); hasGsap && ScrollTrigger.refresh(); });
addEventListener("load", () => { buildRoad(); hasGsap && ScrollTrigger.refresh(); });
const deep = location.hash.slice(1);
if (PROJECTS.some((p) => p.id === deep)) setTimeout(() => openProject(deep), 400);
