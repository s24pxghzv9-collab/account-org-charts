// Builds org-chart slides matching the "Technology Org Chart" slide layout:
// big bold title, CIO box + chief-of-staff box, elbow connectors down to a row of
// direct-report boxes, white boxes with a thick left accent bar (navy, or blue when
// highlighted), small blue "NEW" labels above boxes, optional support box underneath.
window.exportOrgChartPptx = function (accounts, fileName) {
  const W = 13.333, H = 7.5;
  const NAVY = "1B2038", BLUE = "1F5BD8", INK = "1F2430", BORDER = "BFBFBF", LINE = "8C8C8C";
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.title = fileName.replace(/\.pptx$/, "");

  const line = (slide, x1, y1, x2, y2) =>
    slide.addShape(pptx.ShapeType.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.0001, h: Math.abs(y2 - y1) || 0.0001, line: { color: LINE, width: 0.75 } });

  function box(slide, p, x, y, w, h, nameSize, titleSize) {
    slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: "FFFFFF" }, line: { color: BORDER, width: 0.75 } });
    slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.09, h, fill: { color: p.highlight ? BLUE : NAVY }, line: { color: p.highlight ? BLUE : NAVY, width: 0 } });
    // shrink the name if its longest word won't fit on one line (avoids "Krishnamoort-hy")
    const longest = Math.max(...String(p.name || "TBD").split(/\s+/).map(x => x.length));
    nameSize = Math.max(7, Math.min(nameSize, ((w - 0.2) * 72) / (0.62 * longest)));
    titleSize = Math.min(titleSize, nameSize);
    const runs = [{ text: p.name || "TBD", options: { bold: true, fontSize: nameSize, breakLine: !!p.title } }];
    if (p.title) runs.push({ text: p.title, options: { fontSize: titleSize } });
    slide.addText(runs, { x: x + 0.1, y, w: w - 0.12, h, align: "center", valign: "middle", fontFace: "Arial", color: INK, margin: 2, fit: "shrink" });
    if (p.isNew) slide.addText("NEW", { x: x - 0.02, y: y - 0.22, w: 0.6, h: 0.2, fontFace: "Arial", fontSize: 7, bold: true, color: BLUE, margin: 0 });
  }

  accounts.forEach((A, idx) => {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    const leaders = A.people.filter(p => p.position === "leader");
    const sides = A.people.filter(p => p.position === "sidekick");
    const reports = A.people.filter(p => p.position === "report");

    slide.addText(A.slideTitle || `${A.name} Technology Org Chart`, { x: 0.55, y: 0.45, w: 12.2, h: 0.85, fontFace: "Arial Black", fontSize: 32, bold: true, color: INK, margin: 0 });

    // Top row: leader(s), then chief of staff to the right
    const LW = 1.8, LH = 0.66, topY = 2.05, gap = 0.35;
    const lead = leaders.length ? leaders : [{ name: "TBD", title: "CIO" }];
    const leadTotal = lead.length * LW + (lead.length - 1) * 0.2;
    let lx = (W - leadTotal) / 2;
    const leadCentres = [];
    lead.forEach(p => { box(slide, p, lx, topY, LW, LH, 12, 11); leadCentres.push(lx + LW / 2); lx += LW + 0.2; });
    let sx = lx - 0.2 + gap;
    sides.forEach(p => {
      line(slide, sx - gap, topY + LH / 2, sx, topY + LH / 2);
      box(slide, p, sx, topY + 0.03, 1.75, LH, 11.5, 11);
      sx += 1.75 + gap;
    });

    // Direct reports (wrap onto extra rows if there are many)
    const margin = 0.55, avail = W - margin * 2, bgap = 0.1;
    const perRow = reports.length <= 11 ? Math.max(reports.length, 1) : Math.ceil(reports.length / Math.ceil(reports.length / 11));
    const bw = Math.min(1.75, (avail - bgap * (perRow - 1)) / perRow);
    const bh = 1.0, rowGap = 0.55;
    const nameSize = bw < 1.05 ? 9 : bw < 1.3 ? 10 : 11, titleSize = nameSize - 1;
    const trunkX = leadCentres[0] ?? W / 2;
    let y = topY + LH + 0.55, lastBottom = topY + LH;
    const firstBusY = topY + LH + 0.3;

    for (let r = 0; r * perRow < reports.length; r++) {
      const row = reports.slice(r * perRow, (r + 1) * perRow);
      const rowW = row.length * bw + (row.length - 1) * bgap;
      let x = (W - rowW) / 2;
      const busY = y - 0.25;
      const centres = row.map((_, i) => x + i * (bw + bgap) + bw / 2);
      // horizontal bus for the row (extend to trunk on row 0)
      const busL = Math.min(...centres, r === 0 ? trunkX : Infinity), busR = Math.max(...centres, r === 0 ? trunkX : -Infinity);
      line(slide, busL, busY, busR, busY);
      if (r === 0) line(slide, trunkX, topY + LH, trunkX, busY);
      else { // link extra rows back to the first bus via a side rail on the left
        const railX = Math.min(...centres) - bw / 2 - 0.12;
        line(slide, railX, firstBusY, railX, busY);
        line(slide, railX, firstBusY, Math.min(...centres), firstBusY);
        line(slide, railX, busY, Math.min(...centres), busY);
      }
      row.forEach((p, i) => {
        line(slide, centres[i], busY, centres[i], y);
        box(slide, p, x + i * (bw + bgap), y, bw, bh, nameSize, titleSize);
      });
      lastBottom = y + bh;
      y += bh + rowGap;
    }

    if (A.supportBox) {
      const sw = 2.7, sh = 0.32;
      box(slide, { name: A.supportBox, highlight: true }, (W - sw) / 2, Math.min(lastBottom + 0.75, H - 1.3), sw, sh, 9.5, 9);
    }
    if (A.footer) slide.addText(A.footer, { x: 0.85, y: 6.85, w: 3, h: 0.2, fontFace: "Arial", fontSize: 7, bold: true, color: INK, margin: 0 });
    slide.addText(String(idx + 1), { x: 0.45, y: 6.95, w: 0.3, h: 0.25, fontFace: "Arial", fontSize: 9, color: INK, margin: 0 });

    // Speaker notes: contact details and remits for everyone on the chart
    const notes = A.people.map(p => {
      const c = [p.email, p.phone, p.linkedin].filter(Boolean).join(" | ");
      return `${p.name} – ${p.title}${p.remit ? `\n  ${p.remit}` : ""}${c ? `\n  ${c}` : ""}`;
    }).join("\n");
    if (notes) slide.addNotes(notes);
  });

  return pptx.writeFile({ fileName });
};
