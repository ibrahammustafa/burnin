/* BurnIn app: hash router, views, test engine, progress, pricing, command palette. No build step. */
(() => {
  "use strict";
  const C = window.BURNIN_CONFIG || {};
  const PACKS = window.BURNIN_PACKS || [];
  const ROLES = PACKS.flatMap(p => p.roles.map(r => Object.assign({}, r, { company: p.company, pack: p })));
  const MODES = { diag: "Diagnostic", tech: "Technical drill", behave: "Behavioral" };
  const app = document.getElementById("app");

  /* ---------------- utils */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem("burnin:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("burnin:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  /* analytics: GoatCounter (no cookies). Set C.goatcounter to your code to enable. */
  function track(name) { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "event-" + name, title: name, event: true }); } catch (e) { /* ignore */ } }
  if (C.goatcounter) {
    const g = document.createElement("script"); g.async = true; g.src = "https://gc.zgo.at/count.js";
    g.dataset.goatcounter = `https://${C.goatcounter}.goatcounter.com/count`;
    g.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    document.head.appendChild(g);
  }
  function trackPage() { try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: "/" + (location.hash.slice(1) || "home") }); } catch (e) { /* ignore */ } }
  const ICON = {
    diag: '<svg viewBox="0 0 24 24"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>',
    tech: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="m8 9 3 2-3 2M13 14h3"/></svg>',
    behave: '<svg viewBox="0 0 24 24"><path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/></svg>',
    lock: '<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>',
    check: '<svg viewBox="0 0 20 20"><path d="m4 10.5 4 4 8-9"/></svg>',
    dash: '<svg viewBox="0 0 20 20"><path d="M5 10h10"/></svg>',
    arrow: '<svg viewBox="0 0 20 20"><path d="M4 10h12m-5-5 5 5-5 5"/></svg>',
    ext: '<svg viewBox="0 0 20 20"><path d="M8 4H4v12h12v-4M11 4h5v5M16 4l-7 7"/></svg>'
  };

  /* ---------------- progress + access */
  const prog = () => store.get("prog", {});
  const saveProg = p => store.set("prog", p);
  const roleProg = id => prog()[id] || { diagBest: null, diagRuns: 0, tech: {}, behave: {} };
  function updateRole(id, fn) { const p = prog(); p[id] = fn(Object.assign({ diagBest: null, diagRuns: 0, tech: {}, behave: {} }, p[id])); p[id].last = Date.now(); saveProg(p); }
  function ratingPct(map, n) { if (!n) return 0; let s = 0; for (let i = 0; i < n; i++) s += (map[i] == null ? 0 : map[i] / 2); return Math.round((s / n) * 100); }
  function readiness(role) {
    const p = roleProg(role.id);
    const d = p.diagBest || 0, t = ratingPct(p.tech, role.tech.length), b = ratingPct(p.behave, role.behavioral.length);
    return Math.round(d * 0.5 + t * 0.35 + b * 0.15);
  }
  const ownerActive = () => false;
  let entitled = null, sessionUser = null;
  const isPro = () => !!entitled;
  function canAccess(role, mode) { if (mode === "diag" || isPro()) return true; return ROLES.indexOf(role) < (C.freeFullTracks || 0); }

  /* ---------------- theme */
  const root = document.documentElement;
  const savedTheme = store.get("theme", null);
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  const isDark = () => root.getAttribute("data-theme") ? root.getAttribute("data-theme") === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  $("#theme-toggle").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    const go = () => { root.setAttribute("data-theme", next); store.set("theme", next); };
    if (document.startViewTransition && !reduced()) document.startViewTransition(go); else go();
  });

  /* ---------------- toast + modal */
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.innerHTML = msg;
    $("#toasts").appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 3200);
  }
  const modal = $("#modal");
  let lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    $("#modal-body").innerHTML = html; modal.hidden = false;
    const f = $("#modal-body button, #modal-body a, #modal-body input", modal); (f || $(".modal-x")).focus();
  }
  function closeModal() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
  modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });

  /* ---------------- code highlight (python-ish) */
  function highlight(code) {
    const re = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(import|from|def|return|for|in|if|elif|else|try|except|with|as|while|not|and|or|None|True|False|lambda|print)\b/g;
    let out = "", last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      out += m[1] ? `<span class="cm">${esc(m[1])}</span>` : m[2] ? `<span class="st">${esc(m[2])}</span>` : `<span class="kw">${esc(m[3])}</span>`;
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  }

  /* ---------------- shared fragments */
  const fitBars = n => `<span class="fit" title="Fit with your background: ${n}%">${[20, 40, 60, 80, 95].map(t => `<i class="${n >= t ? "on" : ""}"></i>`).join("")}</span>`;
  const ring = (p, size, c) => `<div class="ring" style="--p:${p};${size ? `--size:${size}px;` : ""}${c ? `--c:${c};` : ""}"><span class="tnum">${p}%</span></div>`;
  function roleCard(r, i) {
    const rd = readiness(r);
    const locked = !canAccess(r, "tech");
    return `<a class="card rise" style="--i:${i}" href="#role-${r.id}">
      <div class="card-top"><div><span class="chip cu">${esc(r.company)}</span></div>${ring(rd, 54)}</div>
      <h3>${esc(r.title)}</h3>
      <p>${esc(r.summary)}</p>
      <div class="card-foot"><span>${esc(r.family)} · ${r.mc.length + r.tech.length + r.behavioral.length} Qs</span>
      ${locked ? `<span class="lock">${ICON.lock} Pro</span>` : fitBars(r.fit)}</div></a>`;
  }
  function soonCard(s, i) {
    return `<div class="card soon rise" style="--i:${i}"><div class="card-top"><span class="chip">${esc(s.company)}</span><span class="chip">Waitlist</span></div>
      <h3>${esc(s.company)} tracks</h3><p>${s.roles.map(esc).join(" · ")}</p>
      <div class="card-foot"><span>In development</span><a href="#waitlist" class="mono" style="color:var(--copper)">Get notified</a></div></div>`;
  }
  function pricingBlock() {
    const yearly = store.get("bill", "yearly") === "yearly";
    const P = C.prices || {};
    const pro = yearly ? (P.proYearly / 12) : P.proMonthly;
    const save = Math.round((1 - P.proYearly / (P.proMonthly * 12)) * 100);
    const li = (t, no) => `<li class="${no ? "no" : ""}">${no ? ICON.dash : ICON.check}<span>${t}</span></li>`;
    return `
    <div class="bill"><span>Monthly</span><button class="switch" id="bill" role="switch" aria-checked="${yearly}" aria-label="Bill yearly"></button><span>Yearly</span><span class="save">Save ${save}%</span></div>
    <div class="plans">
      <div class="plan rise" style="--i:0"><div><h3>Free</h3><p class="muted">See where you stand.</p></div>
        <div class="price"><b>$0</b><span>forever</span></div>
        <ul>${li("Diagnostic test for every role")}${li(`${C.freeFullTracks || 1} full role track with model answers`)}${li("Readiness score and progress tracking")}${li("Every other track's drills", true)}</ul>
        <a class="btn btn-ghost" href="#test-${ROLES[0] ? ROLES[0].id : ""}-diag">Start free</a></div>
      <div class="plan hot rise" style="--i:1"><span class="flag">Most picked</span><div><h3>Pro</h3><p class="muted">Every track, every answer.</p></div>
        <div class="price"><b class="roll tnum" id="pro-price">$${pro % 1 ? pro.toFixed(2) : pro}</b><span>/ month${yearly ? `, billed $${P.proYearly} yearly` : ""}</span></div>
        <ul>${C.trialDays ? li(`<b>${C.trialDays}-day free trial</b>, card required`) : ""}${li(`All ${ROLES.length} role tracks across ${PACKS.length} companies`)}${li("Technical drills with model answers and code")}${li("Behavioral STAR builder")}${li("New company packs as they launch")}</ul>
        <button class="btn btn-primary" data-buy="${yearly ? "proYearly" : "proMonthly"}">${C.trialDays ? `Start ${C.trialDays}-day free trial` : "Get Pro"}</button>
        ${C.trialDays ? `<p class="muted" style="font-size:13px;margin-top:-8px">You won't be charged until day ${C.trialDays + 1}. Cancel anytime before then.</p>` : ""}</div>
      <div class="plan rise" style="--i:2"><div><h3>Sprint</h3><p class="muted">Interview in the next few weeks.</p></div>
        <div class="price"><b>$${P.sprint}</b><span>one time</span></div>
        <ul>${li("30 days of full Pro access")}${li("Never renews, nothing to cancel")}${li("Built for one focused push")}${li("Ongoing new packs after 30 days", true)}</ul>
        <button class="btn btn-copper" data-buy="sprint">Start a sprint</button></div>
    </div>
    <div class="tbl-wrap"><table><thead><tr><th>What you get</th><th>Free</th><th>Sprint</th><th>Pro</th></tr></thead><tbody>
      ${[["Diagnostics for every role", 1, 1, 1], ["Readiness score per role", 1, 1, 1], ["Full tracks", "1", "All", "All"], ["Model answers and code walkthroughs", "1 track", 1, 1], ["Behavioral STAR builder", "1 track", 1, 1], ["New company packs", 0, "30 days", 1]]
        .map(r => `<tr><td>${r[0]}</td>${r.slice(1).map(v => `<td class="${v === 0 ? "no-c" : "yes"}">${v === 1 ? "✓" : v === 0 ? "–" : v}</td>`).join("")}</tr>`).join("")}
    </tbody></table></div>`;
  }
  function bindPricing(scope) {
    const sw = $("#bill", scope);
    if (sw) sw.addEventListener("click", () => { store.set("bill", sw.getAttribute("aria-checked") === "true" ? "monthly" : "yearly"); const host = sw.closest("[data-pricing]"); host.innerHTML = pricingBlock(); bindPricing(host); $("#bill", host).focus(); });
    $$("[data-buy]", scope).forEach(b => b.addEventListener("click", () => buy(b.dataset.buy)));
  }
  function buy(plan) {
    const url = (testCheckoutOn() ? C.testCheckout || {} : C.checkout || {})[plan];
    track("checkout-" + plan);
    if (isPro()) return accountModal();
    if (url) {
      if (!sessionUser) { store.set("pending", plan); return authModal("signup"); }
      store.set("pending", null);
      location.assign(`${url}?client_reference_id=${encodeURIComponent(sessionUser.id)}&prefilled_email=${encodeURIComponent(sessionUser.email || "")}`);
      return;
    }
    openModal(`<h2>Plans open soon</h2>
      <p>Checkout isn't open yet. The free diagnostics and your first full track are ready now.</p>
      <a class="btn btn-primary" href="#tracks" data-close>Browse tracks</a>`);
  }
  function paywall(role) {
    openModal(`<span class="chip cu">Pro track</span><h2>${esc(role.title)}</h2>
      <p>The diagnostic is free. Technical drills, model answers and behavioral prompts for this role are part of Pro or a 30-day Sprint.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="#pricing" data-close>See plans</a><a class="btn btn-ghost" href="#test-${role.id}-diag" data-close>Take the free diagnostic</a></div>`);
  }

  /* ---------------- accounts: Supabase auth, server-side entitlements */
  const sb = (window.supabase && C.supabaseUrl) ? window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, { auth: { flowType: "pkce", persistSession: true, detectSessionInUrl: true } }) : null;
  function testCheckoutOn() {
    try {
      if (new URLSearchParams(location.search).get("stripe") === "test") sessionStorage.setItem("burnin:testCheckout", "1");
      return sessionStorage.getItem("burnin:testCheckout") === "1";
    } catch (e) { return false; }
  }
  const siteUrl = () => location.origin + location.pathname;
  async function loadAccess() {
    entitled = null;
    if (!sb || !sessionUser) return;
    const { data, error } = await sb.from("entitlements").select("plan,status,access_until").eq("user_id", sessionUser.id).maybeSingle();
    if (error) throw error;
    const live = data && ["active", "trialing", "past_due"].includes(data.status) && (!data.access_until || Date.parse(data.access_until) > Date.now());
    if (!live) return;
    const res = await sb.from("premium_tracks").select("role_id,tech,behavioral");
    if (res.error) throw res.error;
    res.data.forEach(row => { const r = ROLES.find(x => x.id === row.role_id); if (r) { r.tech = row.tech; r.behavioral = row.behavioral; } });
    entitled = data;
  }
  function drawAcct() { const b = $("#acct-btn"); if (b) b.textContent = sessionUser ? "Account" : "Sign in"; }
  function authModal(mode, note) {
    if (!sb) return toast("Sign-in isn't available right now. Please try again later.");
    const signup = mode === "signup", reset = mode === "reset";
    openModal(`<h2>${signup ? "Create your account" : reset ? "Reset your password" : "Sign in"}</h2>
      ${note ? `<p>${esc(note)}</p>` : store.get("pending", null) ? "<p>Create an account or sign in first, then you'll go straight to checkout.</p>" : ""}
      <form class="acct-form" id="acct-form">
        <label>Email<input id="acct-email" type="email" required autocomplete="email"></label>
        ${reset ? "" : `<label>Password<input id="acct-pass" type="password" required minlength="8" autocomplete="${signup ? "new-password" : "current-password"}"></label>`}
        <p class="acct-err" id="acct-err" role="alert" hidden></p>
        <button class="btn btn-primary" type="submit">${signup ? "Create account" : reset ? "Send reset link" : "Sign in"}</button>
      </form>
      <div class="acct-alt">
        ${signup ? '<button type="button" data-auth="signin">Have an account? Sign in</button>' : '<button type="button" data-auth="signup">Create an account</button>'}
        ${mode === "signin" ? '<button type="button" data-auth="reset">Forgot password?</button>' : ""}
      </div>`);
    $$("[data-auth]").forEach(b => b.addEventListener("click", () => authModal(b.dataset.auth)));
    const form = $("#acct-form");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const email = $("#acct-email").value.trim(), pass = reset ? "" : $("#acct-pass").value, err = $("#acct-err"), sub = form.querySelector("button[type=submit]");
      err.hidden = true; sub.disabled = true;
      try {
        if (reset) {
          const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: siteUrl() });
          if (error) throw error;
          return authModal("signin", "If that email has an account, a reset link is on its way.");
        }
        if (signup) {
          const { data, error } = await sb.auth.signUp({ email, password: pass, options: { emailRedirectTo: siteUrl() } });
          if (error) throw error;
          if (!data.session) return authModal("signin", "Check your email and click the link to confirm your account, then sign in.");
        } else {
          const { error } = await sb.auth.signInWithPassword({ email, password: pass });
          if (error) throw error;
        }
      } catch (ex) { err.textContent = ex.message || "Something went wrong. Please try again."; err.hidden = false; sub.disabled = false; }
    });
  }
  function newPasswordModal() {
    openModal(`<h2>Choose a new password</h2><form class="acct-form" id="pw-form">
      <label>New password<input id="pw-new" type="password" required minlength="8" autocomplete="new-password"></label>
      <p class="acct-err" id="pw-err" role="alert" hidden></p>
      <button class="btn btn-primary" type="submit">Save password</button></form>`);
    $("#pw-form").addEventListener("submit", async e => {
      e.preventDefault();
      const { error } = await sb.auth.updateUser({ password: $("#pw-new").value });
      if (error) { const x = $("#pw-err"); x.textContent = error.message; x.hidden = false; return; }
      closeModal(); toast("Password updated.");
    });
  }
  function accountModal() {
    if (!sessionUser) return authModal("signin");
    const until = entitled && entitled.access_until ? new Date(entitled.access_until).toLocaleDateString() : "";
    const label = !entitled ? "Free plan" : entitled.plan === "sprint" ? `Sprint, access until ${until}` : entitled.plan === "comp" ? "Full access" : entitled.status === "trialing" ? "Pro, free trial" : "Pro";
    openModal(`<h2>Your account</h2><p>${esc(sessionUser.email)}</p><p><b>${esc(label)}</b></p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${entitled ? (entitled.plan === "pro" ? `<a class="btn btn-primary" href="${esc(C.manageUrl)}" target="_blank" rel="noopener">Manage or cancel subscription</a>` : "") : '<a class="btn btn-primary" href="#pricing" data-close>See plans</a>'}
        <button class="btn btn-ghost" id="sign-out" type="button">Sign out</button>
      </div>`);
    $("#sign-out").addEventListener("click", async () => { await sb.auth.signOut(); location.hash = "home"; location.reload(); });
  }
  async function refreshAccess(session) {
    sessionUser = session ? session.user : null;
    try { await loadAccess(); } catch (e) { toast("We couldn't load your plan. Please refresh."); }
    drawAcct();
  }
  async function afterCheckout() {
    const q = new URLSearchParams(location.search);
    if (q.get("checkout") !== "success") return;
    q.delete("checkout");
    const rest = q.toString();
    history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash);
    toast("Payment received. Unlocking your plan…");
    for (let i = 0; i < 15 && !isPro(); i++) {
      await new Promise(r => setTimeout(r, 2000));
      try { await loadAccess(); } catch (e) { /* retry */ }
    }
    if (isPro()) { toast("You're unlocked. Every track is open."); location.hash = "tracks"; route(); }
    else toast("Your payment went through, but unlocking is taking longer than usual. Refresh in a minute, or contact us.");
  }
  async function bootAccount() {
    const top = $(".top-actions");
    if (top) {
      const b = document.createElement("button");
      b.id = "acct-btn"; b.type = "button"; b.className = "btn btn-ghost btn-sm"; b.textContent = "Sign in";
      b.addEventListener("click", accountModal);
      top.insertBefore(b, top.lastElementChild);
    }
    if (!sb) return;
    const { data } = await sb.auth.getSession();
    await refreshAccess(data.session);
    sb.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") { setTimeout(newPasswordModal, 0); return; }
      const next = session ? session.user.id : null, prev = sessionUser ? sessionUser.id : null;
      if (next === prev) return;
      setTimeout(async () => {
        await refreshAccess(session);
        if (!modal.hidden) closeModal();
        const plan = store.get("pending", null);
        if (session && plan && !isPro()) return buy(plan);
        route();
      }, 0);
    });
  }

  /* ---------------- views */
  let cleanup = [];
  const onCleanup = fn => cleanup.push(fn);

  function viewHome() {
    const totalQ = ROLES.reduce((s, r) => s + r.mc.length + r.tech.length + r.behavioral.length, 0);
    const sample = ROLES[0] && ROLES[0].mc[0];
    app.innerHTML = `
    <section class="hero"><canvas id="traces" aria-hidden="true"></canvas>
      <div class="wrap hero-in">
        <div>
          <span class="status"><span class="led"></span>${PACKS.length} company packs · ${ROLES.length} roles</span>
          <h1><span class="ln"><span>Burn in</span></span><span class="ln cu"><span style="--d:.12s">before you ship.</span></span></h1>
          <p class="hero-sub">${esc(C.tagline || "")}</p>
          <div class="hero-cta"><a class="btn btn-primary" href="#test-${ROLES[0].id}-diag">Take a free diagnostic ${ICON.arrow}</a><a class="btn btn-ghost" href="#tracks">Browse tracks</a></div>
          <div class="hero-meta"><div><b class="tnum" data-count="${totalQ}">0</b><span>practice questions</span></div><div><b class="tnum" data-count="${ROLES.length}">0</b><span>role tracks</span></div><div><b class="tnum">90s</b><span>per diagnostic Q</span></div></div>
        </div>
        ${sample ? `<div class="probe rise" style="--i:2" id="hero-probe">
          <div class="probe-head"><span class="chip cu">Try one · ${esc(ROLES[0].company)}</span><span class="chip">${esc(sample.topic)}</span></div>
          <h3>${esc(sample.q)}</h3>
          <div class="opts">${sample.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${"ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>
          <div id="hero-why"></div></div>` : ""}
      </div>
    </section>

    <section class="section"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">How it works</span><h2>Three passes, like real hardware</h2><p>Every role track runs the same loop you'd run on a new server: find the faults, stress the weak spots, then ship with a number you trust.</p></div>
      <div class="steps">
        <div class="step"><span class="n">01 · DIAGNOSE</span><h3>Find the gaps</h3><p>A timed multiple-choice diagnostic scores you by topic, so you know exactly where you're weak.</p><div class="bar"><i style="--w:38%"></i></div></div>
        <div class="step"><span class="n">02 · DRILL</span><h3>Say it out loud</h3><p>Open technical questions with a speaking timer. Reveal the key points, check off what you covered, read the model answer.</p><div class="bar"><i style="--w:72%"></i></div></div>
        <div class="step"><span class="n">03 · SHIP</span><h3>Walk in ready</h3><p>Your readiness score per role combines the diagnostic, drills and behavioral reps, and tells you when to stop studying.</p><div class="bar"><i style="--w:96%"></i></div></div>
      </div></div></section>

    <section class="section"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">Tracks</span><h2>${PACKS.length} companies, one bench</h2><p>NVIDIA, Apple, Google, AMD, Samsung, Meta, X / xAI, OpenAI, Anthropic, Cisco, Intel, Broadcom, plus cleared roles at government contractors. Every pack has at least 20 practice items.</p></div>
      <div class="filters">${PACKS.map(p => `<button class="chip cu" style="cursor:pointer;border:0;padding:9px 12px" data-co="${esc(p.company)}">${esc(p.company)} · ${p.roles.length}</button>`).join("")}</div>
      <div class="grid">${PACKS.map((p, i) => roleCard(ROLES.find(r => r.pack === p), i)).join("")}</div>
      <div style="margin-top:20px"><a class="btn btn-ghost" href="#tracks">See all ${ROLES.length} tracks ${ICON.arrow}</a></div>
    </div></section>

    <section class="section" id="pricing-sec"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">Pricing</span><h2>Pay for the weeks you need it</h2><p>Free to find your gaps. Pro or a one-time Sprint when the interview is on the calendar.</p></div>
      <div data-pricing>${pricingBlock()}</div></div></section>

    <section class="section" id="faq"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">FAQ</span><h2>Questions</h2></div>
      <div class="faq">${[
        ["Are these real NVIDIA interview questions?", "No. They're original practice questions built from public job postings and the technical areas those roles cover: power, cooling, cabling, fabrics, validation, observability and program management. Nothing here is leaked interview content."],
        ["Who is this for?", "People interviewing for hands-on infrastructure roles: data center engineers and technicians, lab engineers, hardware and systems validation, infrastructure automation, and technical program managers."],
        ["How is the readiness score calculated?", "50% from your best full diagnostic, 35% from how you rate yourself on technical drills, and 15% from behavioral reps. Unrated questions count as zero, so the score only rises when you actually practice."],
        ["Where is my progress saved?", "In this browser on this device. Clearing site data resets it."],
        ["Can I cancel Pro?", "Yes. Pro renews monthly or yearly until you cancel. Sprint is a single payment and never renews."]
      ].map(([q, a]) => `<details><summary>${q}<i></i></summary><div class="ans">${a}</div></details>`).join("")}</div>
    </div></section>

    <section class="section" id="waitlist"><div class="wrap">
      <div class="band"><div><h2>AWS, Microsoft and Tesla packs are next</h2><p>Tell us which company you're interviewing with and we'll email you when its pack is ready.</p></div>
      <form id="wl"><div class="row"><input id="wl-email" type="email" required placeholder="you@email.com" aria-label="Email"><select id="wl-co" aria-label="Company">${(C.comingSoon || []).map(s => `<option>${esc(s.company)}</option>`).join("")}<option>Other</option></select></div><button class="btn" type="submit">Notify me</button></form></div>
    </div></section>`;

    bindPricing($("[data-pricing]"));
    // hero sample
    const probe = $("#hero-probe");
    if (probe) $$(".opt", probe).forEach(b => b.addEventListener("click", () => {
      const pick = +b.dataset.i;
      $$(".opt", probe).forEach((o, i) => { o.disabled = true; o.classList.add(i === sample.a ? "right" : i === pick ? "wrong" : "dim"); });
      $("#hero-why").innerHTML = `<div class="why"><b>${pick === sample.a ? "Correct" : "Not quite"}</b>${esc(sample.why)} <a href="#test-${ROLES[0].id}-diag" style="color:var(--copper);font-weight:600">Take the full diagnostic →</a></div>`;
    }));
    // count up
    $$("[data-count]").forEach(el => {
      const to = +el.dataset.count; if (reduced()) { el.textContent = to; return; }
      const t0 = performance.now(); const step = t => { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step);
    });
    $$("[data-co]").forEach(b => b.addEventListener("click", () => { store.set("trackCo", b.dataset.co); location.hash = "tracks"; }));
    bindWaitlist();
    startTraces();
  }

  function bindWaitlist() {
    const f = $("#wl"); if (!f) return;
    f.addEventListener("submit", async e => {
      e.preventDefault();
      const email = $("#wl-email").value.trim(), company = $("#wl-co").value;
      const list = store.get("waitlist", []); list.push({ email, company, at: Date.now() }); store.set("waitlist", list);
      if (C.waitlistEndpoint) {
        try { await fetch(C.waitlistEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email, company }) }); toast(`You're on the ${esc(company)} list.`); track("waitlist-signup"); }
        catch (err) { toast("That didn't go through. Check your connection and try again."); }
      } else if (ownerActive()) toast("Saved on this device. Add a form endpoint in config.js to collect real signups.");
      else toast(`Signups open soon. Email ${esc(C.contactEmail || "us")} to get on the ${esc(company)} list.`);
      f.reset();
    });
  }

  function viewTracks() {
    const fams = ["All"].concat(Array.from(new Set(ROLES.map(r => r.family))).sort());
    const cos = ["All"].concat(PACKS.map(p => p.company));
    let fam = "All", q = "", co = store.get("trackCo", "All");
    if (!cos.includes(co)) co = "All";
    store.set("trackCo", "All");
    app.innerHTML = `<section class="section"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">Role tracks</span><h2>Pick the job you want</h2><p>Each track has a timed diagnostic, technical drills with model answers, and behavioral prompts. Fit bars show how closely the role matches a hardware, lab and data center background.</p></div>
      <div class="filters"><div class="seg" role="group" aria-label="Filter by company">${cos.map(c => `<button type="button" aria-pressed="${c === co}" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div></div>
      <div class="filters"><select class="search" id="track-fam" aria-label="Filter by role family" style="max-width:240px">${fams.map(f => `<option value="${esc(f)}">${f === "All" ? "All role families" : esc(f)}</option>`).join("")}</select>
      <input class="search" id="track-q" type="search" placeholder="Search roles or topics" aria-label="Search roles"></div>
      <div class="grid" id="track-grid"></div></div></section>`;
    const draw = () => {
      const ql = q.toLowerCase();
      const list = ROLES.filter(r => (co === "All" || r.company === co) && (fam === "All" || r.family === fam) && (!ql || (r.title + " " + r.summary + " " + r.topics.join(" ")).toLowerCase().includes(ql)));
      $("#track-grid").innerHTML = list.map(roleCard).join("") + (fam === "All" && co === "All" && !ql ? (C.comingSoon || []).map((s, i) => soonCard(s, list.length + i)).join("") : "") ||
        `<div class="empty">No roles match “${esc(q)}”.<button class="btn btn-ghost btn-sm" id="clear-q">Clear search</button></div>`;
      const cq = $("#clear-q"); if (cq) cq.onclick = () => { q = ""; $("#track-q").value = ""; draw(); };
    };
    $$(".seg button").forEach(b => b.addEventListener("click", () => { co = b.dataset.c; $$(".seg button").forEach(x => x.setAttribute("aria-pressed", x === b)); draw(); }));
    $("#track-fam").addEventListener("change", e => { fam = e.target.value; draw(); });
    $("#track-q").addEventListener("input", e => { q = e.target.value; draw(); });
    draw();
  }

  function viewRole(id) {
    const r = ROLES.find(x => x.id === id); if (!r) return viewMissing();
    const p = roleProg(r.id), rd = readiness(r);
    const topicScore = store.get("topics:" + r.id, {});
    app.innerHTML = `<section class="role-hero"><div class="wrap">
      <div class="crumbs"><a href="#tracks">Tracks</a><span>/</span><span>${esc(r.company)}</span></div>
      <h1>${esc(r.title)}</h1>
      <div class="role-meta"><span class="chip cu">${esc(r.company)}</span><span class="chip">${esc(r.family)}</span><span class="chip">${esc(r.level)}</span><span class="chip">${esc(r.pay)}</span></div>
      <p class="role-sum">${esc(r.summary)}</p>
      </div></section>
      <div class="wrap role-layout"><div class="modes">
        ${[["diag", `${r.mc.length} timed questions, scored by topic. Free for every role.`, p.diagBest == null ? "Not taken" : `Best ${p.diagBest}%`],
           ["tech", `${r.tech.length} open technical questions with key points, model answers${r.tech.some(t => t.code) ? " and code" : ""}.`, `${Object.keys(p.tech).length}/${r.tech.length} rated`],
           ["behave", `${r.behavioral.length} STAR prompts mapped to stories from your background.`, `${Object.keys(p.behave).length}/${r.behavioral.length} rated`]]
          .map(([m, d, s], i) => { const ok = canAccess(r, m); return `<button class="mode rise" style="--i:${i}" data-mode="${m}">
            <span class="mode-ic">${ICON[m]}</span><span><h3>${MODES[m]}</h3><p>${d}</p></span>
            <span class="go">${ok ? `${esc(s)} ${ICON.arrow}` : `${ICON.lock} Pro`}</span></button>`; }).join("")}
        <div class="panel rise" style="--i:3"><h4>Stories to have ready</h4><ul>${r.yourEdge.map(e => `<li>${esc(e)}</li>`).join("")}</ul></div>
        <div class="panel rise" style="--i:4"><h4>What ${esc(r.company)} interviewers listen for</h4><div class="values">${r.pack.values.map(([k, v]) => `<div><b>${esc(k)}</b><span class="muted">${esc(v)}</span></div>`).join("")}</div></div>
      </div>
      <aside class="side">
        <div class="panel" style="justify-items:center;text-align:center"><h4>Readiness</h4>${ring(rd, 132)}<p class="muted" style="font-size:14px">${rd >= 75 ? "Ready to interview. Keep it warm." : rd >= 40 ? "Getting there. Drill your weakest topic next." : "Start with the diagnostic to find your gaps."}</p></div>
        <div class="panel"><h4>Topics</h4>${r.topics.map(t => { const v = topicScore[t]; return `<div class="topic-row"><span>${esc(t)}</span><span class="mono muted tnum">${v == null ? "–" : v + "%"}</span><div class="meter"><i style="--w:${v || 0}%;--c:${v == null ? "var(--line)" : v >= 75 ? "var(--pass)" : v >= 50 ? "var(--warn)" : "var(--fail)"}"></i></div></div>`; }).join("")}</div>
        <div class="panel"><h4>Where to apply</h4><a class="btn btn-ghost btn-sm" href="${esc(r.posting)}" target="_blank" rel="noopener">${esc(r.postingLabel || "Open job listing")} ${ICON.ext}</a><p class="muted" style="font-size:13px">${r.postingLabel ? "Links to the company's careers search." : "Check it's still open before you apply."}</p></div>
      </aside></div>`;
    $$("[data-mode]").forEach(b => b.addEventListener("click", () => {
      const m = b.dataset.mode; if (!canAccess(r, m)) return paywall(r); location.hash = `test-${r.id}-${m}`;
    }));
  }

  /* ---------------- test engine */
  function viewTest(id, mode) {
    const r = ROLES.find(x => x.id === id); if (!r || !MODES[mode]) return viewMissing();
    if (!canAccess(r, mode)) { viewRole(id); return paywall(r); }
    if (mode === "diag") return runDiag(r, null);
    return runDrill(r, mode);
  }

  function runDiag(r, subset) {
    const src = subset || r.mc;
    const qs = shuffle(src).map(q => { const order = shuffle(q.o.map((t, i) => i)); return Object.assign({}, q, { o: order.map(i => q.o[i]), a: order.indexOf(q.a), orig: q }); });
    const st = { i: 0, picks: [], left: 90, timer: null };
    const shell = () => `<section class="runner"><div class="wrap">
      <div class="run-head"><div class="grow"><div class="crumbs"><a href="#role-${r.id}">${esc(r.title)}</a><span>/</span><span>${subset ? "Retest missed" : "Diagnostic"}</span></div>
      <div class="run-title" style="margin-top:8px">Question <span class="tnum" id="qn">1</span> of ${qs.length}</div><div class="progress"><i id="bar"></i></div></div>
      <span class="clock tnum" id="clock">1:30</span></div><div id="stage"></div></div></section>`;
    app.innerHTML = shell();
    const stage = $("#stage");
    const stop = () => clearInterval(st.timer);
    onCleanup(stop);
    function show() {
      const q = qs[st.i];
      $("#qn").textContent = st.i + 1; $("#bar").style.setProperty("--w", `${(st.i / qs.length) * 100}%`);
      stage.innerHTML = `<article class="qcard" aria-live="polite"><span class="chip">${esc(q.topic)}</span><h2>${esc(q.q)}</h2>
        <div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>
        <div id="why"></div><div class="qnav"><span class="hint-keys">Keys 1–4 to answer · Enter for next</span><button class="btn btn-primary" id="next" disabled>${st.i === qs.length - 1 ? "See results" : "Next"} ${ICON.arrow}</button></div></article>`;
      $$(".opt", stage).forEach(b => b.addEventListener("click", () => pick(+b.dataset.i)));
      $("#next").addEventListener("click", next);
      st.left = 90; tick(); stop(); st.timer = setInterval(() => { st.left--; tick(); if (st.left <= 0) pick(-1); }, 1000);
    }
    function tick() { const c = $("#clock"); if (!c) return; c.textContent = fmt(Math.max(0, st.left)); c.classList.toggle("hot", st.left <= 15); }
    function pick(i) {
      if (st.picks[st.i] !== undefined) return; stop();
      const q = qs[st.i]; st.picks[st.i] = i;
      $$(".opt", stage).forEach((o, k) => { o.disabled = true; o.classList.add(k === q.a ? "right" : k === i ? "wrong" : "dim"); });
      $("#why").innerHTML = `<div class="why"><b>${i === q.a ? "Correct" : i === -1 ? "Time's up" : "Not quite"}</b>${esc(q.why)}</div>`;
      const n = $("#next"); n.disabled = false; n.focus();
    }
    function next() { if (st.picks[st.i] === undefined) return; if (st.i < qs.length - 1) { st.i++; transition(show); } else transition(results); }
    function results() {
      stop();
      const right = qs.filter((q, i) => st.picks[i] === q.a).length, pct = Math.round((right / qs.length) * 100);
      const byTopic = {};
      qs.forEach((q, i) => { const t = byTopic[q.topic] || (byTopic[q.topic] = [0, 0]); t[1]++; if (st.picks[i] === q.a) t[0]++; });
      if (!subset) {
        track("diagnostic-complete"); updateRole(r.id, p => { p.diagRuns++; p.diagBest = Math.max(p.diagBest || 0, pct); return p; });
        const ts = store.get("topics:" + r.id, {}); Object.entries(byTopic).forEach(([t, [a, b]]) => ts[t] = Math.round((a / b) * 100)); store.set("topics:" + r.id, ts);
      }
      const missed = qs.filter((q, i) => st.picks[i] !== q.a);
      const pass = pct >= 75;
      $("#bar").style.setProperty("--w", "100%"); $("#clock").textContent = `${right}/${qs.length} correct`; $(".run-title").textContent = subset ? "Retest results" : "Results";
      stage.innerHTML = `<div class="results">
        <div class="score">${ring(0, 168, pass ? "var(--pass)" : "var(--fail)")}<div class="stamp ${pass ? "pass" : "fail"}">${pass ? "Pass" : "Retest"}</div>
          <p class="muted">${pass ? "Solid. Move to the technical drill and practice saying it out loud." : "Your gaps are below. Read the explanations, then retest what you missed."}</p></div>
        <div style="display:grid;gap:18px;min-width:0">
          <div class="panel"><h4>By topic</h4>${Object.entries(byTopic).map(([t, [a, b]]) => { const v = Math.round((a / b) * 100); return `<div class="topic-row"><span>${esc(t)}</span><span class="mono muted tnum">${a}/${b}</span><div class="meter"><i style="--w:0%;--c:${v >= 75 ? "var(--pass)" : v >= 50 ? "var(--warn)" : "var(--fail)"}" data-w="${v}%"></i></div></div>`; }).join("")}</div>
          ${missed.length ? `<div class="missed"><span class="sub-h">Review what you missed</span>${missed.map(q => `<details><summary>${esc(q.q)}<span class="chip bad">${esc(q.topic)}</span></summary><p><b style="color:var(--pass)">Answer:</b> ${esc(q.o[q.a])}</p><p>${esc(q.why)}</p></details>`).join("")}</div>` : `<div class="panel"><h4>Clean run</h4><p>No misses. Go drill the open questions.</p></div>`}
          <div style="display:flex;gap:10px;flex-wrap:wrap">${missed.length ? `<button class="btn btn-primary" id="retry-missed">Retest the ${missed.length} missed</button>` : ""}
            <button class="btn btn-ghost" id="retry-all">Full retest</button><a class="btn btn-ghost" href="#test-${r.id}-tech">Technical drill ${ICON.arrow}</a></div>
        </div></div>`;
      requestAnimationFrame(() => {
        animateRing($(".score .ring"), pct);
        $$("[data-w]", stage).forEach(m => setTimeout(() => m.style.setProperty("--w", m.dataset.w), 150));
      });
      const rm = $("#retry-missed"); if (rm) rm.onclick = () => transition(() => runDiag(r, missed.map(q => q.orig)));
      $("#retry-all").onclick = () => transition(() => runDiag(r, null));
    }
    keyHandler = e => {
      if (e.target.matches("input, textarea, select")) return;
      if (/^[1-4]$/.test(e.key) && $(".opt") && !$(".opt").disabled) { const i = +e.key - 1; if (i < qs[st.i].o.length) pick(i); }
      else if (e.key === "Enter" && $("#next") && !$("#next").disabled) { e.preventDefault(); next(); }
    };
    show();
  }

  function animateRing(el, to) {
    if (!el) return; const span = $("span", el);
    if (reduced()) { el.style.setProperty("--p", to); span.textContent = to + "%"; return; }
    const t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 1200), v = Math.round(to * (1 - Math.pow(1 - k, 3))); el.style.setProperty("--p", v); span.textContent = v + "%"; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function runDrill(r, mode) {
    const items = mode === "tech" ? r.tech : r.behavioral;
    const key = mode === "tech" ? "tech" : "behave";
    let i = 0, speak = null, left = 120;
    app.innerHTML = `<section class="runner"><div class="wrap">
      <div class="run-head"><div class="grow"><div class="crumbs"><a href="#role-${r.id}">${esc(r.title)}</a><span>/</span><span>${MODES[mode]}</span></div>
      <div class="run-title" style="margin-top:8px">${MODES[mode]} <span class="tnum" id="qn">1</span> / ${items.length}</div><div class="progress"><i id="bar"></i></div></div>
      <button class="clock tnum" id="speak" type="button" title="Practice answering out loud">▶ 2:00</button></div><div id="stage"></div></div></section>`;
    const stage = $("#stage");
    const stopSpeak = () => { clearInterval(speak); speak = null; const b = $("#speak"); if (b) { b.textContent = `▶ ${fmt(120)}`; b.classList.remove("hot"); } left = 120; };
    onCleanup(stopSpeak);
    $("#speak").addEventListener("click", () => {
      if (speak) return stopSpeak();
      left = 120; const b = $("#speak");
      speak = setInterval(() => { left--; b.textContent = `■ ${fmt(Math.max(0, left))}`; b.classList.toggle("hot", left <= 20); if (left <= 0) { stopSpeak(); toast("Two minutes. Wrap it up in one sentence."); } }, 1000);
      b.textContent = `■ ${fmt(left)}`;
    });
    const draftKey = (k) => `draft:${r.id}:${mode}:${i}${k ? ":" + k : ""}`;
    function show() {
      stopSpeak();
      const it = items[i], rated = roleProg(r.id)[key][i];
      $("#qn").textContent = i + 1; $("#bar").style.setProperty("--w", `${(i / items.length) * 100}%`);
      const body = mode === "tech"
        ? `<p class="probe-line"><b>What they're probing:</b> ${esc(it.probe)}</p>
           <label class="sub-h" for="draft">Your answer (notes or full script)</label><textarea id="draft" placeholder="Outline it here, then say it out loud with the timer.">${esc(store.get(draftKey(), ""))}</textarea>`
        : `<div class="story"><b>Your story to use</b>${esc(it.story)}</div>
           <div class="star-grid">${["Situation", "Task", "Action", "Result"].map(s => `<label>${s}<textarea data-star="${s}">${esc(store.get(draftKey(s), ""))}</textarea></label>`).join("")}</div>`;
      stage.innerHTML = `<article class="qcard">${it.topic ? `<span class="chip">${esc(it.topic)}</span>` : `<span class="chip cu">Behavioral</span>`}<h2>${esc(it.q)}</h2>${body}
        <div class="qnav"><button class="btn btn-ghost" id="prev" ${i === 0 ? "disabled" : ""}>Back</button><button class="btn btn-primary" id="reveal">Reveal ${mode === "tech" ? "key points" : "STAR checklist"}</button></div>
        <div id="rev"></div></article>`;
      const d = $("#draft"); if (d) d.addEventListener("input", () => store.set(draftKey(), d.value));
      $$("[data-star]").forEach(t => t.addEventListener("input", () => store.set(draftKey(t.dataset.star), t.value)));
      $("#prev").onclick = () => { if (i > 0) { i--; transition(show); } };
      $("#reveal").onclick = () => reveal(it, rated);
      if (rated != null) reveal(it, rated, true);
    }
    function reveal(it, rated, quiet) {
      $("#reveal").hidden = true;
      const pts = mode === "tech" ? it.points : it.star;
      $("#rev").innerHTML = `<div class="reveal">
        <div><span class="sub-h">${mode === "tech" ? "Key points: check what you covered" : "STAR checklist"} <span class="tnum" id="hit">0/${pts.length}</span></span><div class="checks">${pts.map((p, k) => `<label class="check"><input type="checkbox" data-k="${k}"><span>${esc(p)}</span></label>`).join("")}</div></div>
        ${it.answer ? `<div class="model"><h4>Model answer</h4><p>${esc(it.answer)}</p></div>` : ""}
        ${it.code ? `<div><span class="sub-h">Code</span><pre><code>${highlight(it.code)}</code></pre></div>` : ""}
        ${it.follow ? `<div><span class="sub-h">Likely follow-ups</span><ul class="follow">${it.follow.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>` : ""}
        <div><span class="sub-h">How did you do?</span><div class="rate">${[["Missed", "Rework it"], ["Partial", "Close"], ["Nailed", "Interview ready"]].map(([a, b], k) => `<button class="r${k}" data-r="${k}" aria-pressed="${rated === k}">${a}<small>${b}</small></button>`).join("")}</div></div>
      </div>`;
      const boxes = $$("#rev input[type=checkbox]");
      boxes.forEach(b => b.addEventListener("change", () => { const n = boxes.filter(x => x.checked).length; $("#hit").textContent = `${n}/${pts.length}`; }));
      $$("[data-r]").forEach(b => b.addEventListener("click", () => {
        const v = +b.dataset.r; updateRole(r.id, p => { p[key][i] = v; return p; });
        $$("[data-r]").forEach(x => x.setAttribute("aria-pressed", x === b));
        toast(v === 2 ? "Locked in." : v === 1 ? "Marked partial. Worth one more rep." : "Marked for rework.");
        setTimeout(() => { if (i < items.length - 1) { i++; transition(show); } else transition(summary); }, 550);
      }));
      if (!quiet) $("#rev").scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "nearest" });
    }
    function summary() {
      stopSpeak();
      const map = roleProg(r.id)[key], counts = [0, 0, 0]; let unrated = 0;
      items.forEach((_, k) => map[k] == null ? unrated++ : counts[map[k]]++);
      $("#bar").style.setProperty("--w", "100%"); $(".run-title").textContent = `${MODES[mode]} summary`;
      const rd = readiness(r);
      stage.innerHTML = `<div class="results"><div class="score">${ring(0, 168)}<p class="muted">Readiness for ${esc(r.title)}</p></div>
        <div style="display:grid;gap:16px;min-width:0"><div class="kpis" style="grid-template-columns:repeat(3,minmax(0,1fr));margin:0">
          <div class="kpi"><b class="tnum" style="color:var(--pass)">${counts[2]}</b><span>Nailed</span></div><div class="kpi"><b class="tnum" style="color:var(--warn)">${counts[1]}</b><span>Partial</span></div><div class="kpi"><b class="tnum" style="color:var(--fail)">${counts[0] + unrated}</b><span>Rework</span></div></div>
          <div class="panel"><h4>Rework list</h4>${items.map((it, k) => map[k] === 2 ? "" : `<button class="opt" data-go="${k}" style="grid-template-columns:1fr"><span>${esc(it.q)}</span></button>`).join("") || "<p>Nothing left. You're ready on this section.</p>"}</div>
          <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-primary" href="#role-${r.id}">Back to role</a>${mode === "tech" ? `<a class="btn btn-ghost" href="#test-${r.id}-behave">Behavioral ${ICON.arrow}</a>` : `<a class="btn btn-ghost" href="#progress">See progress</a>`}</div></div></div>`;
      requestAnimationFrame(() => animateRing($(".score .ring"), rd));
      $$("[data-go]").forEach(b => b.onclick = () => { i = +b.dataset.go; transition(show); });
    }
    keyHandler = null;
    show();
  }

  function viewProgress() {
    const p = prog();
    const touched = ROLES.filter(r => p[r.id]);
    const avg = touched.length ? Math.round(touched.reduce((s, r) => s + readiness(r), 0) / touched.length) : 0;
    const reps = touched.reduce((s, r) => s + Object.keys(p[r.id].tech).length + Object.keys(p[r.id].behave).length, 0);
    const runs = touched.reduce((s, r) => s + (p[r.id].diagRuns || 0), 0);
    const best = touched.slice().sort((a, b) => readiness(b) - readiness(a))[0];
    app.innerHTML = `<section class="section"><div class="wrap">
      <div class="sec-head"><span class="eyebrow">Progress</span><h2>Your bench</h2><p>Everything is saved in this browser. Readiness = 50% diagnostic, 35% technical drills, 15% behavioral.</p></div>
      <div class="kpis"><div class="kpi"><b class="tnum">${avg}%</b><span>Avg readiness</span></div><div class="kpi"><b class="tnum">${runs}</b><span>Diagnostics run</span></div><div class="kpi"><b class="tnum">${reps}</b><span>Drill reps rated</span></div><div class="kpi"><b>${best ? esc(best.title.split(",")[0].split(" ").slice(0, 2).join(" ")) : "–"}</b><span>Strongest track</span></div></div>
      ${touched.length ? `<div class="dash">${ROLES.map((r, i) => { const rd = readiness(r), pr = roleProg(r.id); return `<a class="card rise" style="--i:${i}" href="#role-${r.id}"><div class="card-top"><span class="chip cu">${esc(r.company)}</span>${ring(rd, 64, rd >= 75 ? "var(--pass)" : undefined)}</div><h3>${esc(r.title)}</h3>
        <div class="topic-row"><span>Diagnostic best</span><span class="mono tnum">${pr.diagBest == null ? "–" : pr.diagBest + "%"}</span><div class="meter"><i style="--w:${pr.diagBest || 0}%"></i></div></div>
        <div class="topic-row"><span>Technical</span><span class="mono tnum">${ratingPct(pr.tech, r.tech.length)}%</span><div class="meter"><i style="--w:${ratingPct(pr.tech, r.tech.length)}%;--c:var(--copper)"></i></div></div>
        <div class="topic-row"><span>Behavioral</span><span class="mono tnum">${ratingPct(pr.behave, r.behavioral.length)}%</span><div class="meter"><i style="--w:${ratingPct(pr.behave, r.behavioral.length)}%;--c:var(--mask-2)"></i></div></div></a>`; }).join("")}</div>
        <div style="margin-top:24px"><button class="btn btn-ghost btn-sm" id="reset">Reset all progress</button></div>`
      : `<div class="empty"><b style="color:var(--ink);font-size:18px">Nothing on the bench yet</b><p>Take a diagnostic and your scores show up here.</p><a class="btn btn-primary" href="#test-${ROLES[0].id}-diag">Start the first diagnostic</a></div>`}
    </div></section>`;
    const rs = $("#reset");
    if (rs) rs.onclick = () => {
      if (rs.dataset.armed) { store.set("prog", {}); ROLES.forEach(r => store.set("topics:" + r.id, {})); toast("Progress cleared."); viewProgress(); }
      else { rs.dataset.armed = "1"; rs.textContent = "Click again to confirm"; rs.classList.add("btn-copper"); setTimeout(() => { if (rs.isConnected) { delete rs.dataset.armed; rs.textContent = "Reset all progress"; rs.classList.remove("btn-copper"); } }, 4000); }
    };
  }

  function viewPricing() {
    app.innerHTML = `<section class="section"><div class="wrap"><div class="sec-head"><span class="eyebrow">Pricing</span><h2>Pay for the weeks you need it</h2><p>Free to find your gaps. Pro or a one-time Sprint when the interview is on the calendar.</p></div><div data-pricing>${pricingBlock()}</div></div></section>`;
    bindPricing($("[data-pricing]"));
  }
  function viewMissing() { app.innerHTML = `<section class="section"><div class="wrap"><div class="empty"><b style="color:var(--ink);font-size:20px">That page doesn't exist</b><p>The link may be old or mistyped.</p><a class="btn btn-primary" href="#tracks">Browse tracks</a></div></div></section>`; }

  /* ---------------- hero traces (canvas) */
  let traceRAF = 0;
  function startTraces() {
    const cv = $("#traces"); if (!cv) return;
    const ctx = cv.getContext("2d"); let w, h, dpr, paths = [];
    function build() {
      dpr = Math.min(2, window.devicePixelRatio || 1); w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paths = []; const n = Math.max(6, Math.round(w / 140)); let seed = 7;
      const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
      for (let k = 0; k < n; k++) {
        let x = -20, y = h * (0.08 + rnd() * 0.84); const pts = [[x, y]];
        while (x < w + 40) { x += 60 + rnd() * 120; pts.push([x, y]); if (rnd() > .45) { const dy = (rnd() > .5 ? 1 : -1) * (20 + rnd() * 50); x += Math.abs(dy); y = Math.min(h - 10, Math.max(10, y + dy)); pts.push([x, y]); } }
        let len = 0; for (let j = 1; j < pts.length; j++) len += Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]);
        paths.push({ pts, len, off: rnd() * len, speed: 40 + rnd() * 60 });
      }
    }
    const css = n => getComputedStyle(root).getPropertyValue(n).trim();
    function frame(t) {
      if (!cv.isConnected) return;
      ctx.clearRect(0, 0, w, h);
      const line = css("--line"), cu = css("--copper");
      paths.forEach(p => {
        ctx.beginPath(); p.pts.forEach(([x, y], j) => j ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
        ctx.strokeStyle = line; ctx.lineWidth = 1.4; ctx.setLineDash([]); ctx.globalAlpha = .55; ctx.stroke();
        const head = ((t / 1000) * p.speed + p.off) % (p.len + 200);
        ctx.setLineDash([80, p.len + 400]); ctx.lineDashOffset = -head + 80; ctx.strokeStyle = cu; ctx.lineWidth = 2; ctx.globalAlpha = .75; ctx.stroke();
        p.pts.forEach(([x, y], j) => { if (j && j % 3 === 0) { ctx.globalAlpha = .5; ctx.setLineDash([]); ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fillStyle = line; ctx.fill(); } });
      });
      ctx.globalAlpha = 1;
      if (!reduced()) traceRAF = requestAnimationFrame(frame);
    }
    build(); cancelAnimationFrame(traceRAF); traceRAF = requestAnimationFrame(frame);
    const ro = new ResizeObserver(build); ro.observe(cv); onCleanup(() => { ro.disconnect(); cancelAnimationFrame(traceRAF); });
  }

  /* ---------------- motion helpers */
  function addRail() {
    const hero = $(".hero", app); if (!hero || $(".rail", app)) return;
    const set = PACKS.map(p => `<a href="#tracks" data-rail="${esc(p.company)}">${esc(p.company)}</a>`).join("");
    hero.insertAdjacentHTML("afterend", `<div class="rail"><div class="rail-track"><div class="rail-set">${set}</div><div class="rail-set" aria-hidden="true">${set.replace(/<a /g, '<a tabindex="-1" ')}</div></div></div>`);
  }
  app.addEventListener("click", e => { const l = e.target.closest("[data-rail]"); if (l) store.set("trackCo", l.dataset.rail); });
  const navEl = $(".nav"), navPill = document.createElement("span");
  navPill.className = "nav-pill"; if (navEl) navEl.prepend(navPill);
  function movePill() {
    if (!navEl) return;
    const a = $("a.active", navEl);
    if (!a) { navPill.style.opacity = 0; return; }
    navPill.style.opacity = 1; navPill.style.width = a.offsetWidth + "px"; navPill.style.transform = `translateX(${a.offsetLeft}px)`;
  }
  window.addEventListener("resize", movePill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
  if ("IntersectionObserver" in window && !reduced()) {
    document.documentElement.classList.add("js-motion");
    const io = new IntersectionObserver(items => {
      let k = 0;
      items.forEach(it => { if (!it.isIntersecting) return; it.target.style.setProperty("--i", k++ % 5); it.target.classList.add("in"); io.unobserve(it.target); });
    }, { rootMargin: "0px 0px -5% 0px" });
    const watch = () => {
      $$(".sec-head, .step, .tbl-wrap, .band", app).forEach(el => { if (!el.classList.contains("rise")) el.classList.add("reveal"); });
      $$(".rise:not(.in), .reveal:not(.in)", app).forEach(el => io.observe(el));
    };
    new MutationObserver(watch).observe(app, { childList: true, subtree: true });
    app.addEventListener("animationend", e => { if (e.animationName === "rise") e.target.classList.remove("rise"); });
  }
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduced()) {
    let frame = 0;
    app.addEventListener("pointermove", e => {
      const c = e.target.closest("a.card, .plan"); if (!c || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
        c.style.setProperty("--ry", (x - .5) * 5 + "deg"); c.style.setProperty("--rx", (.5 - y) * 5 + "deg");
      });
    });
    app.addEventListener("pointerout", e => { const c = e.target.closest("a.card, .plan"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });
  }
  const sbar = $("#scrollbar");
  let sTick = 0;
  const drawBar = () => { sTick = 0; const m = document.documentElement.scrollHeight - innerHeight; if (sbar) sbar.style.transform = `scaleX(${m > 0 ? Math.min(1, scrollY / m) : 0})`; };
  window.addEventListener("scroll", () => { if (!sTick) sTick = requestAnimationFrame(drawBar); }, { passive: true });

  /* ---------------- router */
  let keyHandler = null;
  document.addEventListener("keydown", e => { if (keyHandler && modal.hidden && $("#cmdk").hidden) keyHandler(e); });
  /* slide wipe between pages: direction follows the page order */
  const wiper = $("#wiper"), wipeRank = h => !h || h === "home" || h === "faq" || h === "waitlist" ? 0 : h === "tracks" ? 1 : h.startsWith("role-") ? 2 : h.startsWith("test-") ? 3 : h === "progress" ? 4 : h === "pricing" ? 5 : 6;
  let lastHash = null, wipeBusy = false, wipeNext = null;
  const settle = anims => Promise.race([Promise.all(anims.map(x => x.finished)), new Promise(r => setTimeout(r, 520))]).catch(() => {});
  async function wipe(fn, d) {
    if (wipeBusy) { wipeNext = fn; return; }
    wipeBusy = true; wipeNext = fn; wiper.hidden = false;
    const [w1, w2] = [$(".w1", wiper), $(".w2", wiper)], ease = "cubic-bezier(.76,0,.24,1)";
    const slide = (el, from, to, delay) => el.animate([{ transform: `translateX(${from}%)` }, { transform: `translateX(${to}%)` }], { duration: 250, delay, easing: ease, fill: "both" });
    const inn = [slide(w1, -100 * d, 0, 0), slide(w2, -100 * d, 0, 60)];
    await settle(inn);
    const run = wipeNext; wipeNext = null; if (run) run();
    const out = [slide(w2, 0, 100 * d, 40), slide(w1, 0, 100 * d, 100)];
    await settle(out);
    inn.concat(out).forEach(x => x.cancel()); wiper.hidden = true; wipeBusy = false;
    if (wipeNext) { const n = wipeNext; wipeNext = null; n(); }
  }
  function transition(fn) {
    const h = decodeURIComponent(location.hash.slice(1)), prev = lastHash; lastHash = h;
    if (prev === null || prev === h || reduced() || document.hidden || !wiper || !wiper.animate) return fn();
    wipe(fn, wipeRank(h) >= wipeRank(prev) ? 1 : -1);
  }
  function route() {
    cleanup.forEach(f => { try { f(); } catch (e) { /* ignore */ } }); cleanup = []; keyHandler = null;
    const h = decodeURIComponent(location.hash.slice(1));
    let nav = "", scrollTo = null;
    const run = () => {
      if (!h || h === "home") { viewHome(); addRail(); }
      else if (h === "faq" || h === "waitlist") { viewHome(); addRail(); scrollTo = h; }
      else if (h === "tracks") { viewTracks(); nav = "tracks"; }
      else if (h === "progress") { viewProgress(); nav = "progress"; }
      else if (h === "pricing") { viewPricing(); nav = "pricing"; }
      else if (h.startsWith("role-")) { viewRole(h.slice(5)); nav = "tracks"; }
      else if (h.startsWith("test-")) { const m = h.match(/^test-(.+)-(diag|tech|behave)$/); m ? viewTest(m[1], m[2]) : viewMissing(); nav = "tracks"; }
      else viewMissing();
      $$("[data-nav]").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
      $$(".mobile-nav a").forEach(a => a.classList.toggle("active", (a.dataset.m || "") === (nav || "home")));
      movePill();
      if (scrollTo) { const el = document.getElementById(scrollTo); if (el) setTimeout(() => el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" }), 60); }
      else window.scrollTo({ top: 0 });
      trackPage();
    };
    transition(run);
  }
  window.addEventListener("hashchange", route);

  /* ---------------- command palette */
  const cmdk = $("#cmdk"), cIn = $("#cmdk-input"), cList = $("#cmdk-list");
  const entries = [["Home", "Page", "home"], ["All tracks", "Page", "tracks"], ["Progress", "Page", "progress"], ["Pricing", "Page", "pricing"], ["FAQ", "Page", "faq"]]
    .concat(ROLES.flatMap(r => [[r.title, r.company + " role", "role-" + r.id], [r.title + " diagnostic", "Test", `test-${r.id}-diag`], [r.title + " technical drill", "Drill", `test-${r.id}-tech`]]));
  let sel = 0, shown = [];
  function drawCmd() {
    const q = cIn.value.toLowerCase().split(/\s+/).filter(Boolean);
    shown = entries.filter(e => q.every(t => (e[0] + " " + e[1]).toLowerCase().includes(t))).slice(0, 12);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    cList.innerHTML = shown.map((e, i) => `<li role="option" aria-selected="${i === sel}" data-i="${i}"><span>${esc(e[0])}</span><small>${esc(e[1])}</small></li>`).join("") || `<li>No matches</li>`;
  }
  function openCmd() { cmdk.hidden = false; cIn.value = ""; sel = 0; drawCmd(); cIn.focus(); }
  function closeCmd() { cmdk.hidden = true; }
  function goCmd(i) { const e = shown[i]; if (!e) return; closeCmd(); location.hash = e[2]; }
  $("#cmdk-open").addEventListener("click", openCmd);
  cIn.addEventListener("input", () => { sel = 0; drawCmd(); });
  cList.addEventListener("click", e => { const li = e.target.closest("[data-i]"); if (li) goCmd(+li.dataset.i); });
  cmdk.addEventListener("click", e => { if (e.target.matches("[data-close]")) closeCmd(); });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); cmdk.hidden ? openCmd() : closeCmd(); return; }
    if (e.key === "Escape") { if (!cmdk.hidden) closeCmd(); else if (!modal.hidden) closeModal(); }
    if (!cmdk.hidden) {
      if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); drawCmd(); }
      if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(0, sel - 1); drawCmd(); }
      if (e.key === "Enter") { e.preventDefault(); goCmd(sel); }
    }
  });

  /* ---------------- chrome: scroll state, mobile nav, owner badge */
  const bar = $("#topbar");
  window.addEventListener("scroll", () => bar.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
  const mnav = document.createElement("nav"); mnav.className = "mobile-nav"; mnav.setAttribute("aria-label", "Quick");
  mnav.innerHTML = `<a href="#home" data-m="home">Home</a><a href="#tracks" data-m="tracks">Tracks</a><a href="#progress" data-m="progress">Progress</a><a href="#pricing" data-m="pricing">Pricing</a>`;
  document.body.appendChild(mnav);
  (async () => {
    try { await bootAccount(); } catch (e) { /* the free site still works */ }
    route();
    afterCheckout();
  })();
})();
