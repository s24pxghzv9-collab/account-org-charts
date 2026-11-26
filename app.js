(function () {
  const KEY = "account-org-charts.v2";
  const STAGES = ["Not started", "Prospecting", "Discovery", "Qualified", "Proposal", "Negotiation", "Won", "On hold"];
  const RELS = ["—", "Contacted", "Met", "Engaged", "Champion", "Blocker"];
  const LABELS = { verified: "Verified", corrected: "Corrected", partial: "Partly verified", unverified: "Unverified", vacant: "Vacant / TBC" };
  const uid = () => Math.random().toString(36).slice(2, 10);

  // ---------- data ----------
  function seedPeople(A) {
    const P = (p, position) => ({
      id: uid(), position, name: p.name || "", title: p.title || "", remit: p.remit || "",
      status: p.status || "unverified", evidence: p.evidence || "", isNew: !!p.isNew, highlight: !!p.highlight,
      email: p.email || "", phone: p.phone || "", linkedin: p.linkedin || "", rel: "—", note: "",
    });
    return [
      ...(A.leader ? [P(A.leader, "leader")] : []),
      ...(A.sidekick ? [P(A.sidekick, "sidekick")] : []),
      ...(A.reports || []).map(p => P(p, "report")),
      ...(A.adjacent || []).map(p => P(p, "adjacent")),
    ];
  }
  function seedAccount(A) {
    return {
      id: A.id, name: A.name, asOf: A.asOf || "", source: A.source || "",
      slideTitle: A.slideTitle || `${A.name} Technology Org Chart`, supportBox: A.supportBox ?? "", footer: A.footer ?? "",
      entryOrder: [...(A.entryOrder || [])], validationNotes: [...(A.validationNotes || [])],
      people: seedPeople(A), stage: "Not started", next: "", log: [],
    };
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && Array.isArray(s.accounts)) return s;
    } catch {}
    return { version: 2, accounts: ACCOUNTS.map(seedAccount) };
  }
  let state = load();
  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(state));
    const s = document.getElementById("savedFlag");
    if (s) { s.classList.add("on"); clearTimeout(save.t); save.t = setTimeout(() => s.classList.remove("on"), 1200); }
  };
  save();

  let current = location.hash.slice(1);
  const cur = () => state.accounts.find(a => a.id === current) || state.accounts[0];

  // ---------- helpers ----------
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = u => { u = String(u || "").trim(); if (!u) return ""; if (!/^https?:\/\//i.test(u)) u = "https://" + u; return /^https?:\/\/[^\s"<>]+$/i.test(u) ? u : ""; };
  const telHref = t => "tel:" + String(t).replace(/[^\d+]/g, "");

  // ---------- render ----------
  function renderTabs() {
    const A = cur();
    document.getElementById("tabs").innerHTML = state.accounts.map(a =>
      `<button data-id="${esc(a.id)}" class="${a === A ? "active" : ""}">${esc(a.name)}<span class="stage-dot">${a.stage === "Not started" ? "" : esc(a.stage)}</span></button>`).join("");
  }

  function personCard(p, extraClass = "") {
    const status = p.status || "unverified";
    const li = safeUrl(p.linkedin);
    const contacts = [
      p.email && `<a href="mailto:${esc(p.email)}">✉ ${esc(p.email)}</a>`,
      p.phone && `<a href="${esc(telHref(p.phone))}">☎ ${esc(p.phone)}</a>`,
      li && `<a href="${esc(li)}" target="_blank" rel="noopener">in LinkedIn</a>`,
    ].filter(Boolean).join("");
    return `<div class="person s-${status} ${p.highlight ? "hl" : ""} ${extraClass}">
      <button class="edit" data-edit="${p.id}" title="Edit">✎</button>
      <div class="name">${esc(p.name)}
        ${p.isNew ? `<span class="badge b-new">NEW</span>` : ""}
        <span class="badge b-${status}" title="${esc(p.evidence)}">${LABELS[status] || status}</span>
      </div>
      <div class="title">${esc(p.title)}</div>
      ${p.remit ? `<div class="remit">${esc(p.remit)}</div>` : ""}
      ${p.evidence ? `<div class="evidence">${esc(p.evidence)}</div>` : ""}
      ${contacts ? `<div class="contacts">${contacts}</div>` : ""}
      <div class="rel">
        <select data-rel="${p.id}" data-v="${esc(p.rel || "—")}" title="Relationship">${RELS.map(r => `<option ${r === (p.rel || "—") ? "selected" : ""}>${r}</option>`).join("")}</select>
        <input data-note="${p.id}" placeholder="Quick note…" value="${esc(p.note)}">
      </div>
    </div>`;
  }

  function render() {
    const A = cur();
    if (!A) { document.getElementById("app").innerHTML = `<p class="empty">No accounts yet – click “+ Account”.</p>`; renderTabs(); return; }
    current = A.id;
    renderTabs();
    const by = pos => A.people.filter(p => p.position === pos);
    const counts = {};
    A.people.forEach(p => counts[p.status] = (counts[p.status] || 0) + 1);
    const list = arr => arr.length ? arr.map(x => `<li>${esc(x)}</li>`).join("") : `<li class="empty">None</li>`;

    document.getElementById("app").innerHTML = `
      <div class="layout">
        <section>
          <div class="toolbar">
            <div class="meta">${esc(A.asOf)}${A.source ? ` · Source: ${esc(A.source)}` : ""}</div>
            <button class="btn2" data-add="report">+ Add person</button>
            <button class="btn2" id="acctSettings">Account settings</button>
            <button class="btn2 blue" id="exportOne">Export to PowerPoint</button>
          </div>
          <div class="legend">${Object.keys(LABELS).filter(k => counts[k]).map(k => `<span class="badge b-${k}">${LABELS[k]} · ${counts[k]}</span>`).join("")}</div>
          <div class="top">
            ${by("leader").map(p => personCard(p)).join("") || `<button class="addcard" data-add="leader" style="width:340px">+ Add leader</button>`}
            ${by("sidekick").map(p => personCard(p, "side")).join("")}
          </div>
          <div class="grid">${by("report").map(p => personCard(p)).join("")}<button class="addcard" data-add="report">+ Add direct report</button></div>
          <h3 class="section">Adjacent executives &amp; influencers</h3>
          <div class="grid" style="border-top:0;padding-top:0">${by("adjacent").map(p => personCard(p)).join("")}<button class="addcard" data-add="adjacent">+ Add influencer</button></div>
          <div class="boxes">
            <div class="panel"><h2>Suggested entry order</h2><ol>${list(A.entryOrder)}</ol></div>
            <div class="panel warn"><h2>Still to validate</h2><ul>${list(A.validationNotes)}</ul></div>
          </div>
        </section>
        <aside class="side-panel">
          <div class="panel">
            <h2>Where we're up to <span class="saved" id="savedFlag">Saved</span></h2>
            <label for="stage">Stage</label>
            <select id="stage">${STAGES.map(s => `<option ${s === A.stage ? "selected" : ""}>${s}</option>`).join("")}</select>
            <label for="next">Next step</label>
            <input id="next" placeholder="e.g. Intro meeting with the CIO" value="${esc(A.next)}">
          </div>
          <div class="panel">
            <h2>Notes</h2>
            <textarea id="noteText" placeholder="What happened? (Ctrl/⌘+Enter to add)"></textarea>
            <button class="primary" id="addNote">Add note</button>
            <ul class="log">${A.log.length ? A.log.map((n, i) => `<li><div class="d">${esc(new Date(n.at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }))}</div><div class="t">${esc(n.text)}</div><button class="x" data-i="${i}" title="Delete note">×</button></li>`).join("") : `<li class="empty">No notes yet.</li>`}</ul>
          </div>
        </aside>
      </div>
      <div class="foot">Everything you add or edit (people, contact details, notes) is saved in this browser only. Use <b>Backup</b> regularly to keep a copy or move it to another device, and <b>Restore</b> to load it back. The PowerPoint export includes the leader, chief of staff and direct reports; contact details go in the speaker notes.</div>`;
  }

  // ---------- person dialog ----------
  const pDlg = document.getElementById("personDlg"), pForm = document.getElementById("personForm");
  let editing = null; // {person, isNew}
  function openPerson(person, isNewPerson) {
    editing = { person, isNewPerson };
    document.getElementById("personDlgTitle").textContent = isNewPerson ? "Add person" : "Edit person";
    for (const el of pForm.elements) {
      if (!el.name) continue;
      if (el.type === "checkbox") el.checked = !!person[el.name]; else el.value = person[el.name] ?? "";
    }
    document.getElementById("delPerson").style.display = isNewPerson ? "none" : "";
    document.getElementById("moveUp").style.display = document.getElementById("moveDown").style.display = isNewPerson ? "none" : "";
    pDlg.showModal();
    pForm.elements.name.focus();
  }
  pForm.addEventListener("submit", () => {
    const A = cur(), p = editing.person;
    for (const el of pForm.elements) {
      if (!el.name) continue;
      p[el.name] = el.type === "checkbox" ? el.checked : el.value.trim();
    }
    if (editing.isNewPerson) A.people.push(p);
    save(); render();
  });
  document.getElementById("cancelPerson").onclick = () => pDlg.close();
  document.getElementById("delPerson").onclick = () => {
    const A = cur();
    if (!confirm(`Remove ${editing.person.name} from ${A.name}?`)) return;
    A.people = A.people.filter(x => x !== editing.person); save(); pDlg.close(); render();
  };
  function move(dir) {
    const A = cur(), p = editing.person;
    const same = A.people.filter(x => x.position === p.position);
    const j = same.indexOf(p) + dir;
    if (j < 0 || j >= same.length) return;
    const a = A.people.indexOf(p), b = A.people.indexOf(same[j]);
    [A.people[a], A.people[b]] = [A.people[b], A.people[a]];
    save(); render();
  }
  document.getElementById("moveUp").onclick = () => move(-1);
  document.getElementById("moveDown").onclick = () => move(1);

  // ---------- account dialog ----------
  const aDlg = document.getElementById("acctDlg"), aForm = document.getElementById("acctForm");
  function openAccount() {
    const A = cur();
    aForm.elements.name.value = A.name;
    aForm.elements.slideTitle.value = A.slideTitle || "";
    aForm.elements.supportBox.value = A.supportBox || "";
    aForm.elements.footer.value = A.footer || "";
    aForm.elements.entryOrder.value = A.entryOrder.join("\n");
    aForm.elements.validationNotes.value = A.validationNotes.join("\n");
    document.getElementById("resetAcct").style.display = ACCOUNTS.some(x => x.id === A.id) ? "" : "none";
    aDlg.showModal();
  }
  aForm.addEventListener("submit", () => {
    const A = cur(), f = aForm.elements, lines = v => v.split("\n").map(s => s.trim()).filter(Boolean);
    A.name = f.name.value.trim() || A.name;
    A.slideTitle = f.slideTitle.value.trim();
    A.supportBox = f.supportBox.value.trim();
    A.footer = f.footer.value.trim();
    A.entryOrder = lines(f.entryOrder.value);
    A.validationNotes = lines(f.validationNotes.value);
    save(); render();
  });
  document.getElementById("cancelAcct").onclick = () => aDlg.close();
  document.getElementById("delAcct").onclick = () => {
    const A = cur();
    if (!confirm(`Delete the ${A.name} account, including all its people and notes? (Make a Backup first if unsure.)`)) return;
    state.accounts = state.accounts.filter(a => a !== A); current = state.accounts[0]?.id;
    save(); aDlg.close(); render();
  };
  document.getElementById("resetAcct").onclick = () => {
    const A = cur();
    if (!confirm(`Replace ${A.name}'s people with the original validated list? Your edits, contacts and per-person notes for this account will be lost. Account notes are kept.`)) return;
    A.people = seedPeople(ACCOUNTS.find(x => x.id === A.id)); save(); aDlg.close(); render();
  };

  // ---------- events ----------
  document.getElementById("tabs").addEventListener("click", e => {
    const b = e.target.closest("button[data-id]"); if (!b) return;
    current = b.dataset.id; history.replaceState(null, "", "#" + current); render();
  });
  const app = document.getElementById("app");
  app.addEventListener("change", e => {
    const A = cur(), t = e.target;
    if (t.id === "stage") { A.stage = t.value; save(); renderTabs(); }
    else if (t.dataset.rel) { const p = A.people.find(x => x.id === t.dataset.rel); p.rel = t.value; t.dataset.v = t.value; save(); }
  });
  app.addEventListener("input", e => {
    const A = cur(), t = e.target;
    if (t.id === "next") { A.next = t.value; save(); }
    else if (t.dataset.note) { A.people.find(x => x.id === t.dataset.note).note = t.value; save(); }
  });
  function addNote() {
    const ta = document.getElementById("noteText"); const text = ta.value.trim(); if (!text) return;
    cur().log.unshift({ at: new Date().toISOString(), text }); save(); render();
  }
  app.addEventListener("click", e => {
    const t = e.target;
    if (t.id === "addNote") return addNote();
    if (t.id === "acctSettings") return openAccount();
    if (t.id === "exportOne") return doExport([cur()]);
    const ed = t.closest("[data-edit]");
    if (ed) return openPerson(cur().people.find(p => p.id === ed.dataset.edit), false);
    const add = t.closest("[data-add]");
    if (add) return openPerson({ id: uid(), position: add.dataset.add, name: "", title: "", remit: "", status: "unverified", evidence: "", isNew: false, highlight: false, email: "", phone: "", linkedin: "", rel: "—", note: "" }, true);
    const x = t.closest(".log .x");
    if (x && confirm("Delete this note?")) { cur().log.splice(+x.dataset.i, 1); save(); render(); }
  });
  app.addEventListener("keydown", e => { if (e.target.id === "noteText" && e.key === "Enter" && (e.ctrlKey || e.metaKey)) addNote(); });

  document.getElementById("addAccountBtn").onclick = () => {
    const name = prompt("Account name?"); if (!name || !name.trim()) return;
    const A = seedAccount({ id: uid(), name: name.trim(), supportBox: "Gartner Support", footer: "RESTRICTED", leader: { name: "TBD", title: "CIO", status: "vacant" } });
    state.accounts.push(A); current = A.id; history.replaceState(null, "", "#" + current); save(); render();
  };

  async function doExport(accts) {
    const date = new Date().toISOString().slice(0, 10);
    const name = accts.length === 1 ? `${accts[0].name} Technology Org Chart ${date}.pptx` : `Account Org Charts ${date}.pptx`;
    try { await exportOrgChartPptx(accts, name.replace(/[\\/:*?"<>|]/g, "")); }
    catch (err) { alert("PowerPoint export failed: " + err.message); }
  }
  document.getElementById("exportAllBtn").onclick = () => doExport(state.accounts);

  document.getElementById("exportBtn").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `account-org-charts-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click();
  };
  document.getElementById("importFile").onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!data || !Array.isArray(data.accounts)) throw 0;
      if (!confirm("Replace everything in this browser with the backup file?")) return;
      state = data; current = state.accounts[0]?.id; save(); render();
    } catch { alert("That file isn't a valid backup."); }
    e.target.value = "";
  };

  render();
})();
