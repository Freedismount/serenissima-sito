/* Parti comuni a tutte le pagine: dati, intestazione, piè di pagina.
   I dati arrivano da data/agenzia.json e data/immobili.json,
   che tuo papà modifica dal pannello /admin. */

const TIPI = { affitto: "Affitto", vendita: "Vendita", attivita: "Attività" };

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function slugify(s) {
  return String(s || "immobile").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "immobile";
}

function telHref(t) { return "tel:" + String(t || "").replace(/[^\d+]/g, ""); }

function paragrafi(testo) {
  return String(testo || "").split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean)
    .map(p => `<p>${esc(p)}</p>`).join("");
}

async function getJSON(url) {
  const r = await fetch(url + "?v=" + Date.now(), { cache: "no-store" });
  if (!r.ok) throw new Error(url + " " + r.status);
  return r.json();
}

/* Carica tutto e prepara gli immobili: solo quelli visibili, ognuno con un id unico per la sua pagina */
async function caricaDati() {
  const [agenzia, dati] = await Promise.all([getJSON("data/agenzia.json"), getJSON("data/immobili.json")]);
  const usati = {};
  const immobili = (dati.immobili || [])
    .filter(i => i && i.titolo && i.visibile !== false)
    .map(i => {
      let id = slugify(i.titolo);
      usati[id] = (usati[id] || 0) + 1;
      if (usati[id] > 1) id += "-" + usati[id];
      const foto = (i.foto || []).map(f => (typeof f === "string" ? f : f && f.src)).filter(Boolean);
      const caratteristiche = Array.isArray(i.caratteristiche)
        ? i.caratteristiche.filter(Boolean)
        : String(i.caratteristiche || "").split(",").map(s => s.trim()).filter(Boolean);
      return { ...i, id, foto, caratteristiche, tipo: TIPI[i.tipo] ? i.tipo : "vendita" };
    });
  return { agenzia, immobili };
}

const ICONE = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

/* Intestazione e piè di pagina, uguali su tutte le pagine */
function disegnaCornice(a, home) {
  const h = home ? "" : "index.html";
  const j = t => home ? "#immobili" : "index.html?tipo=" + t + "#immobili";
  const top = document.getElementById("cornice-top");
  top.innerHTML = `
    ${a.avviso ? `<div class="avviso">${esc(a.avviso)}</div>` : ""}
    <div class="topbar"><div class="wrap">
      <div class="info">
        <a href="${telHref(a.telefono)}">☎ ${esc(a.telefono)}</a>
        <a class="hide-s" href="mailto:${esc(a.email)}">✉ ${esc(a.email)}</a>
      </div>
      <div class="info"><span class="hide-m">${esc(a.orari_breve)}</span></div>
    </div></div>
    <header><div class="wrap">
      <a href="${home ? "#top" : "index.html"}" class="logo" aria-label="${esc(a.nome)}">
        ${a.logo ? `<img src="${esc(a.logo)}" alt="${esc(a.nome)}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">` : ""}
        <span class="logo-fallback" ${a.logo ? "" : 'style="display:block"'}>${esc(a.nome)}</span>
      </a>
      <nav>
        <button class="burger" aria-label="Menu">☰</button>
        <ul>
          <li><a href="${j("vendita")}" data-jump="vendita">Vendite</a></li>
          <li><a href="${j("affitto")}" data-jump="affitto">Affitti</a></li>
          <li><a href="${h}#servizi">Servizi</a></li>
          <li><a href="${h}#agenzia">Agenzia</a></li>
          <li><a href="${h}#contatti" class="btn btn-navy">Contattaci</a></li>
        </ul>
      </nav>
    </div></header>`;
  const ul = top.querySelector("nav ul");
  top.querySelector(".burger").onclick = () => ul.classList.toggle("open");
  top.querySelectorAll("nav a").forEach(x => x.addEventListener("click", () => ul.classList.remove("open")));

  document.getElementById("cornice-bottom").innerHTML = `
    <footer><div class="wrap">
      <div class="cols">
        <div>
          ${a.logo ? `<div class="logo-w"><img src="${esc(a.logo)}" alt="${esc(a.nome)}" onerror="this.parentElement.style.display='none'"></div>` : `<h4>${esc(a.nome)}</h4>`}
          <p>Appartamenti a Jesolo Lido in vendita e in affitto. Compravendite, attività commerciali, stime e affitti turistici.</p>
        </div>
        <div><h4>Immobili</h4><ul>
          <li><a href="${j("vendita")}" data-jump="vendita">Vendite a Jesolo</a></li>
          <li><a href="${j("affitto")}" data-jump="affitto">Affitti a Jesolo</a></li>
          <li><a href="${j("attivita")}" data-jump="attivita">Attività commerciali</a></li>
        </ul></div>
        <div><h4>Agenzia</h4><ul>
          <li><a href="${h}#agenzia">Chi siamo</a></li>
          <li><a href="${h}#servizi">Servizi</a></li>
          ${a.condizioni_affitto_url ? `<li><a target="_blank" rel="noopener" href="${esc(a.condizioni_affitto_url)}">Condizioni d'affitto</a></li>` : ""}
          <li><a href="${h}#contatti">Dove siamo</a></li>
        </ul></div>
        <div><h4>Contatti</h4><ul>
          <li>${esc(a.indirizzo)}</li>
          <li><a href="${telHref(a.telefono)}">${esc(a.telefono)}</a></li>
          <li><a href="mailto:${esc(a.email)}">${esc(a.email)}</a></li>
        </ul></div>
      </div>
      <div class="bottom">
        <span>© ${new Date().getFullYear()} ${esc(a.nome)}${a.piva ? " · P.IVA " + esc(a.piva) : ""} · Jesolo Lido (VE)</span>
        <span>
          ${a.privacy_url ? `<a target="_blank" rel="noopener" href="${esc(a.privacy_url)}">Privacy</a>` : ""}
          ${a.cookie_url ? ` · <a target="_blank" rel="noopener" href="${esc(a.cookie_url)}">Cookie policy</a>` : ""}
        </span>
      </div>
    </div></footer>
    <a class="fab" href="${telHref(a.telefono)}" aria-label="Chiama l'agenzia">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
    </a>`;
}

/* Animazioni allo scroll */
function attivaRivela() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".rv:not(.in)").forEach(el => io.observe(el));
}
