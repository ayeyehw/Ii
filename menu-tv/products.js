/* Productos ilustrados en capas que se "abren" para mostrar sus ingredientes.
 * Cada capa: { label, svg, dy (cuánto sube al abrirse), x, y (punto de la etiqueta), side: "l" | "r" }.
 * Coordenadas del producto armado: centro en x = 300, base cerca de y = 950.
 */
(function () {
  // Disco/rebanada (capa líquida o sólida) con lado ahusado: rxTop arriba, rxBot abajo.
  const disc = (cx, y1, y2, rxTop, rxBot, top, side, ryK = 0.26) => {
    const r1 = rxTop * ryK, r2 = rxBot * ryK;
    return `<path d="M${cx - rxTop},${y1} L${cx - rxBot},${y2} A${rxBot},${r2} 0 0 0 ${cx + rxBot},${y2} L${cx + rxTop},${y1} Z" fill="${side}"/>
      <ellipse cx="${cx}" cy="${y1}" rx="${rxTop}" ry="${r1}" fill="${top}"/>`;
  };
  const glass = (y1, y2, rxTop, rxBot, extra = "") => `
    <path d="M${300 - rxTop},${y1} L${300 - rxBot},${y2} A${rxBot},${rxBot * 0.26} 0 0 0 ${300 + rxBot},${y2} L${300 + rxTop},${y1}"
      fill="rgba(255,255,255,.35)" stroke="#C9B2A6" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="300" cy="${y1}" rx="${rxTop}" ry="${rxTop * 0.26}" fill="none" stroke="#C9B2A6" stroke-width="5"/>
    <path d="M${300 - rxTop + 26},${y1 + 40} L${300 - rxBot + 20},${y2 - 30}" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".8"/>
    ${extra}`;
  const swirl = (cx, y, w, fill = "#FFFDF8", shade = "#EFE3D6") => `
    <path d="M${cx - w},${y} C${cx - w},${y - 40} ${cx + w},${y - 40} ${cx + w},${y} C${cx + w},${y + 22} ${cx - w},${y + 22} ${cx - w},${y}Z" fill="${shade}"/>
    <path d="M${cx - w},${y - 8} C${cx - w},${y - 52} ${cx + w},${y - 52} ${cx + w},${y - 8} C${cx + w * 0.6},${y + 8} ${cx - w * 0.6},${y + 8} ${cx - w},${y - 8}Z" fill="${fill}"/>
    <path d="M${cx - w * 0.7},${y - 40} C${cx - w * 0.7},${y - 80} ${cx + w * 0.7},${y - 80} ${cx + w * 0.7},${y - 40} C${cx + w * 0.4},${y - 26} ${cx - w * 0.4},${y - 26} ${cx - w * 0.7},${y - 40}Z" fill="${fill}"/>
    <path d="M${cx - w * 0.4},${y - 70} C${cx - w * 0.3},${y - 112} ${cx + w * 0.1},${y - 120} ${cx + w * 0.08},${y - 138} C${cx + w * 0.45},${y - 100} ${cx + w * 0.4},${y - 70} ${cx + w * 0.3},${y - 64}Z" fill="${fill}"/>`;
  const sprinkles = (cx, y, w, colors, n = 26, seed = 7) => {
    let s = seed, out = "";
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < n; i++) {
      const x = cx + (rnd() - 0.5) * w * 2, yy = y + (rnd() - 0.5) * 50, a = rnd() * 180;
      out += `<rect x="${x - 11}" y="${yy - 4}" width="22" height="8" rx="4" fill="${colors[i % colors.length]}" transform="rotate(${a} ${x} ${yy})"/>`;
    }
    return out;
  };
  const dots = (cx, y, w, color, n = 40, r = 4, seed = 3) => {
    let s = seed, out = "";
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < n; i++) out += `<circle cx="${cx + (rnd() - 0.5) * w * 2}" cy="${y + (rnd() - 0.5) * 34}" r="${r * (0.6 + rnd() * 0.8)}" fill="${color}"/>`;
    return out;
  };
  const banana = (x, y, r = 34) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#F6E3A1" stroke="#E8C96A" stroke-width="5"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="none" stroke="#D9B85A" stroke-width="3" stroke-dasharray="4 6"/>`;
  const drizzle = (y, w, color, width = 12) =>
    `<path d="M${300 - w},${y} C${300 - w * 0.6},${y + 40} ${300 - w * 0.3},${y - 30} ${300},${y + 10} S${300 + w * 0.6},${y - 20} ${300 + w},${y + 20}
      M${300 - w * 0.5},${y + 10} q10,40 4,70 M${300 + w * 0.35},${y + 8} q-6,34 2,54" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;

  window.PRODUCTS = {
    shake: {
      ingredients: ["Sorvete de morango", "Calda de morango", "Geleia de frutos vermelhos", "Chantilly", "Granulado de morango"],
      layers: [
        { label: "Copo 500 ml", dy: 0, x: 420, y: 700, side: "r",
          svg: glass(430, 860, 140, 88, `<path d="M255,860 Q300,900 345,860 L330,935 Q300,950 270,935Z" fill="rgba(255,255,255,.5)" stroke="#C9B2A6" stroke-width="5"/><ellipse cx="300" cy="945" rx="105" ry="24" fill="rgba(255,255,255,.6)" stroke="#C9B2A6" stroke-width="5"/>`) },
        { label: "Sorvete de morango", dy: -90, x: 175, y: 720, side: "l", svg: disc(300, 600, 845, 126, 90, "#F7B8C6", "#EF9AB0") + dots(300, 700, 80, "#fff", 14, 6) },
        { label: "Calda de morango", dy: -200, x: 430, y: 575, side: "r", svg: disc(300, 565, 590, 130, 128, "#E2475F", "#C8344D") + `<path d="M220,590 q6,50 -2,80 M360,590 q-4,40 4,64" stroke="#C8344D" stroke-width="12" stroke-linecap="round"/>` },
        { label: "Geleia de frutos vermelhos", dy: -300, x: 160, y: 452, side: "l", svg: disc(300, 440, 468, 138, 134, "#8E1E3A", "#6E1430") + dots(300, 440, 90, "#B83A5C", 18, 8) },
        { label: "Chantilly", dy: -400, x: 440, y: 380, side: "r", svg: swirl(300, 430, 130) },
        { label: "Granulado de morango", dy: -490, x: 170, y: 320, side: "l", svg: sprinkles(300, 330, 90, ["#F07A98", "#FFC2D1", "#E2475F"], 30) }
      ]
    },
    cappuccino: {
      ingredients: ["Espresso", "Leite vaporizado", "Espuma cremosa", "Canela"],
      layers: [
        { label: "Pires", dy: 0, x: 540, y: 840, side: "r", svg: disc(300, 830, 852, 240, 230, "#FBF4EC", "#E6D6C6", 0.2) + `<ellipse cx="300" cy="830" rx="130" ry="24" fill="#EEE1D3"/>` },
        { label: "Xícara", dy: -110, x: 470, y: 690, side: "r",
          svg: `<path d="M448,640 c80,-10 90,110 -10,120" fill="none" stroke="#F3E9DE" stroke-width="22"/>
            <path d="M140,570 L172,780 Q300,840 428,780 L460,570 Z" fill="#FFFBF5" stroke="#E6D6C6" stroke-width="5"/>
            <path d="M170,600 L192,760" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
            <ellipse cx="300" cy="570" rx="160" ry="40" fill="none" stroke="#E6D6C6" stroke-width="5"/>` },
        { label: "Espresso", dy: -250, x: 130, y: 625, side: "l", svg: disc(300, 612, 640, 152, 150, "#5A2E1A", "#3F1F11") },
        { label: "Leite vaporizado", dy: -360, x: 470, y: 600, side: "r", svg: disc(300, 592, 612, 155, 153, "#E9CDB0", "#D7B593") },
        { label: "Espuma cremosa", dy: -460, x: 125, y: 572, side: "l", svg: `<path d="M142,575 Q300,500 458,575 Q300,622 142,575Z" fill="#F7E4CC" stroke="#E2C6A5" stroke-width="4"/>` + dots(300, 566, 110, "#FFF6EA", 22, 8) },
        { label: "Canela", dy: -560, x: 470, y: 548, side: "r",
          svg: dots(300, 560, 90, "#A0522D", 46, 3.4, 11) + `<g transform="rotate(-18 420 545)"><rect x="350" y="534" width="150" height="20" rx="10" fill="#9C5B33"/><rect x="350" y="548" width="150" height="14" rx="7" fill="#7E4524"/></g>` }
      ]
    },
    acai: {
      ingredients: ["Açaí batido", "Leite", "Whey protein", "Banana"],
      layers: [
        { label: "Copo", dy: 0, x: 410, y: 760, side: "r", svg: glass(470, 900, 120, 92) },
        { label: "Açaí batido", dy: -110, x: 180, y: 720, side: "l", svg: disc(300, 540, 890, 112, 88, "#7B2F6B", "#5E1F52") + dots(300, 650, 70, "#9A4A86", 16, 6) },
        { label: "Leite", dy: -230, x: 420, y: 525, side: "r", svg: disc(300, 512, 532, 114, 113, "#FFFDF7", "#EDE6DA") },
        { label: "Whey protein", dy: -330, x: 175, y: 480, side: "l", svg: `<path d="M196,500 Q300,420 404,500 Q300,520 196,500Z" fill="#EAD9B8"/>` + dots(300, 488, 70, "#D9C39A", 24, 4) },
        { label: "Banana", dy: -440, x: 430, y: 455, side: "r", svg: banana(250, 470) + banana(318, 455, 38) + banana(372, 478, 30) }
      ]
    },
    waffle: {
      ingredients: ["Bubble waffle", "Sorvete", "Banana", "Chocolate", "Coco ralado", "Chantilly"],
      layers: [
        { label: "Cone Mimi Café", dy: 0, x: 400, y: 820, side: "r",
          svg: `<path d="M188,620 L300,960 L412,620 Z" fill="#D8B48A" stroke="#C49A6C" stroke-width="5"/>
            <text x="300" y="760" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="40" fill="#7A4B2E">Mimi</text>
            <text x="300" y="800" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="34" fill="#7A4B2E">Café</text>` },
        { label: "Bubble waffle", dy: -90, x: 165, y: 600, side: "l",
          svg: (() => { let o = `<path d="M170,640 Q160,450 300,430 Q440,450 430,640 Z" fill="#E4A54B"/>`; for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const x = 190 + c * 44 + (r % 2) * 22, y = 470 + r * 38; if (x < 420) o += `<circle cx="${x}" cy="${y}" r="20" fill="#F2BE68" stroke="#D08F36" stroke-width="3"/>`; } return o; })() },
        { label: "Sorvete", dy: -200, x: 430, y: 440, side: "r", svg: `<circle cx="300" cy="445" r="96" fill="#F7C3D1"/><path d="M204,460 q20,30 48,8 q28,26 56,2 q30,24 58,-2 q26,24 38,-6" fill="#F7C3D1"/><circle cx="270" cy="410" r="40" fill="#FBDDE5"/>` + dots(300, 440, 70, "#EC9BB2", 14, 8) },
        { label: "Banana", dy: -300, x: 160, y: 420, side: "l", svg: banana(220, 430, 30) + banana(380, 420, 30) + banana(300, 395, 26) },
        { label: "Chocolate", dy: -390, x: 450, y: 390, side: "r", svg: drizzle(370, 120, "#4A2214", 14) },
        { label: "Coco ralado", dy: -470, x: 165, y: 355, side: "l", svg: dots(300, 360, 110, "#FFFFFF", 50, 4, 21) },
        { label: "Chantilly", dy: -560, x: 430, y: 300, side: "r", svg: swirl(300, 350, 95) }
      ]
    }
  };
})();
