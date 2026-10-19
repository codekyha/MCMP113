// MCMP113 · Week 2 — Flowcharts and Their Symbols · Basic Flowchart Examples
// Generator: node build_week02.js  ->  MCMP113_Week02_Flowcharts.pptx
const { createDeck } = require('/home/claude/mcmp/lib/deck.js');
const fs = require('fs');
const path = require('path');

// ---- code excerpts are read from the tested projects (never retyped) ----
const CODE = path.join(__dirname, 'code');
const lines = (dir) => fs.readFileSync(path.join(CODE, dir, 'Program.cs'), 'utf8').replace(/\r/g, '').replace(/\n+$/, '').split('\n');
const body = (dir) => lines(dir).slice(3).join('\n');                 // drop 2-line header + blank
const from = (dir, marker) => { const L = lines(dir); const i = L.findIndex((l) => l.includes(marker)); if (i < 0) throw new Error('marker ' + marker); return L.slice(i).join('\n'); };

(async () => {
  const D = await createDeck({ week: 2, title: 'Flowcharts and Their Symbols', subtitle: 'Basic flowchart examples · from pictures to pseudocode to a first look at C#' });
  const { C, T, I, pres, MF, HF } = D;

  // ================= flowchart helpers =================
  // node: fcNode with font 13 and corrected left/right anchors for the parallelogram (preset offset = w/5 → w/10 at mid-height)
  const node = (s, type, cx, cy, w, h, text, o = {}) => {
    const n = D.fcNode(s, type, cx, cy, w, h, text, { fs: o.fs || 13, fill: o.fill });
    if (type === 'io') { n.left = [cx - w / 2 + w / 10, cy]; n.right = [cx + w / 2 - w / 10, cy]; }
    return n;
  };
  const down = (s, a, b) => { if (Math.abs(a.cx - b.cx) > 1e-6) throw new Error('down(): not aligned ' + a.cx + ' ' + b.cx); D.seg(s, a.bottom[0], a.bottom[1], b.top[0], b.top[1]); };
  const line = (s, pts, arrow = true) => D.path(s, pts, { arrow });
  const lbl = (s, x, y, text, color, align = 'left', fs = 12) => T(s, text, { x: align === 'right' ? x - 0.55 : x, y, w: 0.55, h: 0.24, fontSize: fs, bold: true, color, align });
  // yes/no labels next to a decision exit
  const labR = (s, d, t) => lbl(s, d.right[0] + 0.05, d.cy - 0.27, t, t === 'yes' ? C.green : C.red);
  const labL = (s, d, t) => lbl(s, d.left[0] - 0.05, d.cy - 0.27, t, t === 'yes' ? C.green : C.red, 'right');
  const labB = (s, d, t) => lbl(s, d.cx + 0.07, d.bottom[1] - 0.02, t, t === 'yes' ? C.green : C.red);
  const h3 = (s, x, y, w, text, color = C.ink, fs = 17) => T(s, text, { x, y, w, h: 0.36, fontFace: HF, fontSize: fs, bold: true, color });
  const small = (s, x, y, w, h, text, o = {}) => T(s, text, { x, y, w, h, fontSize: 13, color: C.slate, valign: 'top', ...o });
  const hdr = (t, fill = C.ink) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: fill }, align: 'center' } });

  // ---------- reusable charts ----------
  // Absolute value (Week 1 example): returns nothing
  const chartAbs = (s, cx, y0) => {
    const a = node(s, 'term', cx, y0 + 0.21, 1.3, 0.42, 'Start');
    const b = node(s, 'io', cx, y0 + 0.87, 1.6, 0.46, 'Read x');
    const d = node(s, 'dec', cx, y0 + 1.78, 1.6, 0.78, 'x < 0 ?');
    const p = node(s, 'proc', cx + 1.9, y0 + 1.78, 1.1, 0.46, 'x ← −x');
    const o = node(s, 'io', cx, y0 + 2.73, 1.6, 0.46, 'Print x');
    const e = node(s, 'term', cx, y0 + 3.4, 1.3, 0.42, 'End');
    down(s, a, b); down(s, b, d); D.seg(s, ...d.right, ...p.left); labR(s, d, 'yes');
    down(s, d, o); labB(s, d, 'no'); line(s, [p.bottom, [p.cx, o.cy], o.right]); down(s, o, e);
  };
  // Sign of a number (flowchart → pseudocode exercise)
  const chartSign = (s, cx, xr) => {
    const a = node(s, 'term', cx, 1.93, 1.3, 0.4, 'Start');
    const b = node(s, 'io', cx, 2.55, 1.6, 0.46, 'Read x');
    const d1 = node(s, 'dec', cx, 3.45, 1.7, 0.76, 'x > 0 ?');
    const d2 = node(s, 'dec', cx, 4.6, 1.7, 0.76, 'x < 0 ?');
    const p1 = node(s, 'io', xr, 3.45, 2.2, 0.46, 'Print "positive"');
    const p2 = node(s, 'io', xr, 4.6, 2.2, 0.46, 'Print "negative"');
    const p3 = node(s, 'io', cx, 5.6, 1.9, 0.46, 'Print "zero"');
    const e = node(s, 'term', cx, 6.38, 1.3, 0.4, 'End');
    down(s, a, b); down(s, b, d1);
    D.seg(s, ...d1.right, ...p1.left); labR(s, d1, 'yes');
    down(s, d1, d2); labB(s, d1, 'no');
    D.seg(s, ...d2.right, ...p2.left); labR(s, d2, 'yes');
    down(s, d2, p3); labB(s, d2, 'no');
    down(s, p3, e);
    const xj = xr + 1.45;
    line(s, [p1.right, [xj, p1.cy], [xj, e.cy]], false);
    line(s, [p2.right, [xj, p2.cy]], false);
    line(s, [[xj, e.cy], e.right]);
  };
  // Predict-the-output chart (sum of even numbers up to n)
  const chartEven = (s, fillK) => {
    const cx = 2.9;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.6, 0.42, 'Read n');
    const c = node(s, 'proc', cx, 2.98, 1.8, 0.4, 's ← 0,  k ← 1');
    const d1 = node(s, 'dec', cx, 3.86, 1.6, 0.66, 'k ≤ n ?');
    const d2 = node(s, 'dec', cx, 4.86, 2.1, 0.7, 'k mod 2 = 0 ?');
    const p = node(s, 'proc', 5.15, 4.86, 1.35, 0.42, 's ← s + k', { fill: fillK });
    const q = node(s, 'proc', cx, 5.8, 1.6, 0.4, 'k ← k + 1');
    const o = node(s, 'io', 6.95, 4.86, 1.5, 0.44, 'Print s');
    const e = node(s, 'term', 6.95, 5.8, 1.3, 0.38, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d1);
    down(s, d1, d2); labB(s, d1, 'yes');
    D.seg(s, ...d2.right, ...p.left); labR(s, d2, 'yes');
    down(s, d2, q); lbl(s, cx - 0.07, d2.bottom[1] - 0.02, 'no', C.red, 'right');
    line(s, [p.bottom, [p.cx, 5.42], [cx, 5.42]]);
    line(s, [q.bottom, [cx, 6.2], [1.35, 6.2], [1.35, 3.34], [cx, 3.34]]);
    line(s, [d1.right, [o.cx, d1.cy], o.top]); labR(s, d1, 'no');
    down(s, o, e);
  };

  // =====================================================================
  // 1. TITLE
  D.titleSlide(['> draw --flowchart', '( Start )', '   ↓', '/ Read x /', '   ↓', '< x < 0 ? >', '   ↓', '( End )', '> _'],
    'Welcome back. Timing for the whole session: Part 1 symbols ~35 min, Part 2 structures and conversion ~35 min, Part 3 worked examples ~60 min, Part 4 mistakes, quiz, tools and exercises ~40 min. Bring paper and pencil: flowcharts are drawn by hand in the exams. Last week we wrote algorithms in pseudocode; today we draw the same algorithms as pictures, and at the end of each example we peek at the C# that the flowchart turns into (syntax is taught from Week 3).');

  // 2. OBJECTIVES
  {
    const s = D.slide('Week 2 · learning objectives', 'By the End of Today You Can …',
      'Read the objectives aloud (~2 min). Emphasise objective 4: converting in both directions is a standard exam question (draw the flowchart for this pseudocode / write the pseudocode for this flowchart). Objective 6 is only "read and map": nobody is expected to write C# yet.');
    const obj = [
      [D.I.sitemap, 'Name the symbols', 'Recognise and draw the standard flowchart symbols (ISO 5807) and say what each one means.'],
      [D.I.clipboard, 'Follow the rules', 'Apply the drawing rules: one Start, one End, two labelled exits per decision, arrows everywhere.'],
      [D.I.layer, 'Spot the structures', 'Recognise sequence, selection and repetition as flowchart patterns.'],
      [D.I.exchange, 'Convert both ways', 'Turn pseudocode into a flowchart and a flowchart into pseudocode.'],
      [D.I.search, 'Trace a flowchart', 'Execute a flowchart by hand with a trace table and predict its output.'],
      [D.I.code, 'Map to C# (preview)', 'See how each box becomes one or two lines of a C# program.'],
    ];
    obj.forEach((o, i) => {
      const x = 0.6 + (i % 3) * 4.1, y = 1.75 + Math.floor(i / 3) * 2.5;
      D.iconCard(s, x, y, 3.9, 2.3, o[0], o[1], o[2], { fs: 15 });
    });
  }

  // 3. RECAP / BRIDGE
  {
    const s = D.slide('Recap · Week 1 → Week 2', 'One Algorithm, Three Notations',
      'Bridge (~4 min). This is the absolute-value algorithm from Week 1, section "four ways to write an algorithm". Ask the class: which line of the pseudocode became which box? Point out that the IF has two exits in the flowchart: the "no" exit simply skips the process box. The C# column is code folder example 02_02 (AbsoluteValue); run it live with -7.25 and 12 if time permits. The C# uses double, so 7.25 prints as 7.25.');
    h3(s, 0.6, 1.72, 3.0, 'Week 1 · pseudocode', C.slate, 15);
    D.pseudo(s, 0.6, 2.12, 3.0, 3.35, 'START\n  READ x\n  IF x < 0 THEN\n    x ← −x\n  END IF\n  PRINT x\nEND', { fs: 15 });
    h3(s, 3.95, 1.72, 3.4, 'Week 2 · flowchart', C.amberDk, 15);
    chartAbs(s, 4.75, 2.12);
    h3(s, 7.75, 1.72, 5.0, 'Week 3+ · C# (02_02_AbsoluteValue)', C.slate, 15);
    D.code(s, 7.75, 2.12, 5.0, 3.35, body('02_02_AbsoluteValue').replace(/ {10}\/\/ .*$/m, ''), { fs: 12 });
    D.callout(s, 0.6, 5.85, 12.15, 0.8, D.I.lightbulb_ink, [
      { text: 'Same steps, different clothes. ', options: { bold: true, color: C.ink } },
      { text: 'Pseudocode is quick to write, a flowchart shows the paths at a glance, C# can be run.' }], { fs: 15 });
  }

  // =====================================================================
  D.section(1, 'Flowchart Symbols', 'Six shapes, one kind of line — and the rules that make a chart readable');

  // 5. WHAT IS A FLOWCHART
  {
    const s = D.slide('Definition', 'What Is a Flowchart?',
      'About 4 min. Definition first, then the short history as motivation: flowcharts are older than computers (Gilbreth, industrial engineering, 1921). Goldstine and von Neumann used "flow diagrams" in 1947 to plan programs for early computers. ANSI X3.5 (1970) and ISO 5807 (1985) standardised the shapes, which is why every textbook uses the same six symbols. Today UML activity diagrams and BPMN use the same idea. Likely question: "Do programmers still draw flowcharts?" Honest answer: professionals rarely draw full program flowcharts, but they constantly sketch the tricky part (a loop, a nested decision) on a whiteboard; for beginners the chart makes control flow visible.');
    D.card(s, 0.6, 1.75, 6.2, 2.45, C.ink);
    T(s, 'Flowchart', { x: 0.9, y: 1.95, w: 5.6, h: 0.45, fontFace: HF, fontSize: 22, bold: true, color: C.amber });
    T(s, 'A diagram of an algorithm: each shape is one step, and the shape tells you the kind of step. Arrows (flow lines) show the order in which the steps run.',
      { x: 0.9, y: 2.45, w: 5.6, h: 1.6, fontSize: 16, color: C.paper, valign: 'top' });
    const why = [[D.I.eye, 'Visual: branches and loops are easy to see.'], [D.I.users, 'Language-independent: anyone can read it.'], [D.I.pencil, 'Exam tool: drawn by hand, like pseudocode.']];
    why.forEach((w, i) => {
      const y = 4.45 + i * 0.75;
      D.circIcon(s, w[0], 0.6, y, 0.55, C.amber);
      T(s, w[1], { x: 1.35, y, w: 5.4, h: 0.55, fontSize: 15, valign: 'middle' });
    });
    h3(s, 7.3, 1.75, 5.4, 'A short history', C.ink, 18);
    const ev = [['1921', 'F. & L. Gilbreth present the “flow process chart” for factory work.'],
      ['1947', 'Goldstine & von Neumann plan computer programs with “flow diagrams”.'],
      ['1970', 'ANSI X3.5 standardises the symbols in the USA.'],
      ['1985', 'ISO 5807 — the international standard we follow.'],
      ['today', 'UML activity diagrams, BPMN, Flowgorithm: same idea.']];
    s.addShape(pres.shapes.LINE, { x: 7.62, y: 2.35, w: 0, h: 4.05, line: { color: C.line, width: 2 } });
    ev.forEach((e, i) => {
      const y = 2.3 + i * 0.86;
      s.addShape(pres.shapes.OVAL, { x: 7.5, y: y + 0.1, w: 0.24, h: 0.24, fill: { color: i === 3 ? C.amber : C.ink }, line: { color: C.paper, width: 1.5 } });
      T(s, e[0], { x: 7.95, y, w: 0.85, h: 0.45, fontFace: MF, fontSize: 15, bold: true, color: i === 3 ? C.amberDk : C.ink, valign: 'top' });
      T(s, e[1], { x: 8.8, y, w: 3.95, h: 0.8, fontSize: 14, valign: 'top' });
    });
  }

  // 6. SIX SYMBOLS
  {
    const s = D.slide('The building blocks', 'The Six Basic Symbols',
      'About 6 min. Draw each symbol on the board while explaining. Memory aids: the terminal is a rounded "pill" (like a start button); input/output is slanted because data "slides in or out"; the decision diamond has corners that point to its exits. Predefined process (double side lines) = "a named sub-algorithm described somewhere else", e.g. GCD(a, b); in C# this becomes a method call (Week 12). Connector: a small circle with a letter, used to join lines or to continue a chart that does not fit. Rule of thumb: never mix kinds in one box; "Read x and add 1" is two boxes.');
    const sym = [
      ['term', 'Start', 'Terminal', 'Start or End of the algorithm. One Start, one End.'],
      ['io', 'Read x', 'Input / Output', 'READ data from the keyboard or PRINT results.'],
      ['proc', 'sum ← sum + x', 'Process', 'A calculation or assignment (←).'],
      ['dec', 'x > 0 ?', 'Decision', 'A yes/no question. Exactly two labelled exits.'],
      ['pre', 'GCD(a, b)', 'Predefined process', 'A named sub-algorithm defined elsewhere.'],
      ['conn', 'A', 'Connector', 'Joins flow lines or continues the chart at the same letter.'],
    ];
    sym.forEach((m, i) => {
      const x = 0.6 + (i % 3) * 4.1, y = 1.75 + Math.floor(i / 3) * 2.5;
      D.card(s, x, y, 3.9, 2.3);
      const w = m[0] === 'conn' ? 0.62 : m[0] === 'dec' ? 1.9 : 2.0, h = m[0] === 'conn' ? 0.62 : m[0] === 'dec' ? 0.8 : 0.58;
      node(s, m[0], x + 1.95, y + 0.62, w, h, m[1], { fs: 14 });
      T(s, m[2], { x: x + 0.25, y: y + 1.15, w: 3.4, h: 0.38, fontFace: HF, fontSize: 17, bold: true, color: C.ink, align: 'center' });
      T(s, m[3], { x: x + 0.25, y: y + 1.55, w: 3.4, h: 0.65, fontSize: 14, align: 'center', valign: 'top' });
    });
  }

  // 7. LINES, CONNECTORS, ANNOTATION
  {
    const s = D.slide('The glue', 'Flow Lines, Connectors and Annotations',
      'About 4 min. Flow lines: the default direction is top-to-bottom and left-to-right, but draw arrowheads on every line anyway, because loops go upwards. On-page connector: a circle with the same letter at both ends means "the line continues here"; use it to avoid crossing lines. Off-page connector (home-plate shape) continues the chart on another page; we rarely need it. Annotation: an open bracket with a dashed line adds a comment; it is not a step and is never executed, exactly like // comments in C#.');
    // panel 1: flow lines
    D.card(s, 0.6, 1.75, 3.9, 4.9);
    h3(s, 0.85, 1.9, 3.4, 'Flow lines');
    const a = node(s, 'proc', 2.55, 2.75, 1.7, 0.46, 'step 1');
    const b = node(s, 'proc', 2.55, 3.75, 1.7, 0.46, 'step 2');
    down(s, a, b);
    const c = node(s, 'proc', 1.55, 4.8, 1.3, 0.46, 'step 3');
    const d = node(s, 'proc', 3.55, 4.8, 1.3, 0.46, 'step 4');
    D.seg(s, ...c.right, ...d.left);
    small(s, 0.85, 5.35, 3.4, 1.2, 'Top → bottom, left → right. Always draw the arrowhead: loops flow upwards.', { color: C.body });
    // panel 2: connectors
    D.card(s, 4.72, 1.75, 3.9, 4.9);
    h3(s, 4.97, 1.9, 3.4, 'Connectors');
    const p = node(s, 'proc', 5.9, 2.75, 1.5, 0.46, 'x ← x + 1');
    const k1 = node(s, 'conn', 5.9, 3.7, 0.5, 0.5, 'A', { fs: 14 });
    down(s, p, k1);
    const k2 = node(s, 'conn', 7.45, 2.75, 0.5, 0.5, 'A', { fs: 14 });
    const q = node(s, 'io', 7.45, 3.7, 1.5, 0.46, 'Print x');
    down(s, k2, q);
    s.addShape(pres.shapes.FLOWCHART_OFFPAGE_CONNECTOR, { x: 6.37, y: 4.3, w: 0.62, h: 0.62, fill: { color: C.softAmber }, line: { color: C.ink, width: 1.25 } });
    T(s, 'P2', { x: 6.37, y: 4.3, w: 0.62, h: 0.5, fontSize: 13, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    small(s, 4.97, 5.05, 3.4, 1.5, 'Same letter = same point. The home-plate shape continues on another page (here: page 2).', { color: C.body });
    // panel 3: annotation
    D.card(s, 8.85, 1.75, 3.9, 4.9);
    h3(s, 9.1, 1.9, 3.4, 'Annotation');
    const r = node(s, 'proc', 9.75, 3.2, 1.5, 0.5, 'r ← a mod b');
    s.addShape(pres.shapes.LINE, { x: 10.5, y: 3.2, w: 0.35, h: 0, line: { color: C.slate, width: 1, dashType: 'dash' } });
    s.addShape(pres.shapes.LEFT_BRACKET, { x: 10.85, y: 2.8, w: 0.18, h: 0.8, line: { color: C.slate, width: 1.25 } });
    T(s, 'remainder of a ÷ b', { x: 11.08, y: 2.8, w: 1.6, h: 0.8, fontSize: 13, italic: true, color: C.slate, valign: 'middle' });
    small(s, 9.1, 4.2, 3.4, 2.3, 'An open bracket + dashed line adds a comment. It is not a step and never “runs” — like // comments in C#.', { color: C.body });
  }

  // 8. MAPPING TABLE
  {
    const s = D.slide('Symbol ↔ pseudocode ↔ C#', 'Every Box Has a Pseudocode Line',
      'About 4 min. This table is the dictionary for the rest of the course. Go row by row; stress that the decision diamond is used for BOTH IF and WHILE: what makes a WHILE is the arrow that goes back up (next part). The C# column is only for recognition today. Note: in C#, = assigns and == compares; in pseudocode, ← assigns and = compares.');
    const rows = [
      ['term', 'Start', 'START … END', 'the program begins / ends'],
      ['io', 'Read x', 'READ x', 'x = int.Parse(Console.ReadLine());'],
      ['io', 'Print x', 'PRINT x', 'Console.WriteLine(x);'],
      ['proc', 'x ← x + 1', 'x ← x + 1', 'x = x + 1;'],
      ['dec', 'x < 0 ?', 'IF x < 0 THEN …   /   WHILE i ≤ N …', 'if (x < 0) …   /   while (i <= n) …'],
      ['pre', 'GCD(a, b)', 'use sub-algorithm GCD(a, b)', 'a method call, e.g. Math.Sqrt(x)  (Week 12)'],
    ];
    const y0 = 1.75, rh = 0.62;
    const data = [[hdr('Symbol'), hdr('Pseudocode (Week 1)'), hdr('C# (from Week 3)')]];
    rows.forEach((r, i) => data.push([{ text: '', options: {} }, { text: r[2], options: { fontFace: MF } }, { text: r[3], options: { fontFace: MF } }]));
    D.table(s, data, 0.6, y0, 12.15, [2.35, 4.4, 5.4], { fs: 14, rowH: [0.45, rh, rh, rh, rh, rh, rh] });
    rows.forEach((r, i) => {
      const cy = y0 + 0.45 + rh * i + rh / 2;
      const w = r[0] === 'dec' ? 1.7 : 1.75, h = r[0] === 'dec' ? 0.54 : 0.44;
      node(s, r[0], 0.6 + 2.35 / 2, cy, w, h, r[1], { fs: 13 });
    });
    D.callout(s, 0.6, 6.0, 12.15, 0.65, D.I.warn_ink, [{ text: '← assigns, = compares ', options: { bold: true, color: C.ink } }, { text: '(pseudocode)   ·   C#:  = assigns, == compares.' }], { fs: 15 });
  }

  // 9. RULES
  {
    const s = D.slide('Drawing rules', 'Eight Rules for a Correct Flowchart',
      'About 5 min. These rules are the grading checklist for flowchart questions in the exams. Rule 3 is the most frequently broken: a diamond with one exit, or exits without yes/no labels. Rule 5: crossings are avoided by re-routing or by a connector. Rule 7 anticipates the infinite-loop mistake of Part 4. Ask: why "one End"? Several End symbols are allowed by some books, but one End forces all paths to join, which matches structured programming (one entry, one exit) and is our course convention.');
    const rules = [
      ['One Start, one End', 'Every path from Start must reach End.'],
      ['Arrows on every line', 'Main direction top → bottom, left → right.'],
      ['Decisions: exactly two exits', 'Label them yes / no (or true / false).'],
      ['Boxes: one way in, one way out', 'Branches join again before continuing.'],
      ['No crossing lines', 'Re-route, or use a connector circle.'],
      ['Short, precise text', '“sum ← sum + i”, not “add it up”.'],
      ['Loops must make progress', 'Something the condition tests must change.'],
      ['Same names as the pseudocode', 'One idea per box; no mixed READ + calculate.'],
    ];
    rules.forEach((r, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.6 + col * 6.13, y = 1.75 + row * 1.24;
      D.card(s, x, y, 6.0, 1.1);
      s.addShape(pres.shapes.OVAL, { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, fill: { color: C.ink }, line: { color: C.ink } });
      T(s, String(i + 1), { x: x + 0.22, y: y + 0.24, w: 0.62, h: 0.62, fontFace: MF, fontSize: 18, bold: true, color: C.amber, align: 'center', valign: 'middle' });
      T(s, r[0], { x: x + 1.05, y: y + 0.12, w: 4.8, h: 0.42, fontFace: HF, fontSize: 17, bold: true, color: C.ink, valign: 'middle' });
      T(s, r[1], { x: x + 1.05, y: y + 0.55, w: 4.8, h: 0.42, fontSize: 14.5, valign: 'middle' });
    });
  }

  // 10. QUIZ: WHICH SYMBOL
  const quizItems = [
    ['Read age', 'io'], ['total ← total + price', 'proc'], ['age ≥ 18 ?', 'dec'], ['Print "Welcome"', 'io'],
    ['GCD(a, b) — described on page 2', 'pre'], ['Start', 'term'], ['Read x, then x ← 2 × x', 'two'],
  ];
  {
    const s = D.slide('Quick quiz · 3 min', 'Which Symbol Would You Use?',
      'Give pairs 2 to 3 minutes, then take answers by show of hands (A to F). Item 7 is a trap: it contains an input AND a calculation, so it needs two boxes (an input parallelogram followed by a process rectangle). Answers on the next slide: 1 B, 2 C, 3 D, 4 B, 5 E, 6 A, 7 B then C.');
    const data = [[hdr('#'), { text: 'Step', options: { bold: true, color: C.paper, fill: { color: C.ink } } }]];
    quizItems.forEach((q, i) => data.push([{ text: String(i + 1), options: { align: 'center', bold: true } }, { text: q[0], options: { fontFace: MF } }]));
    D.table(s, data, 0.6, 1.8, 6.4, [0.7, 5.7], { fs: 16, rowH: 0.56 });
    D.card(s, 7.4, 1.8, 5.35, 4.5);
    const opts = [['term', 'A'], ['io', 'B'], ['proc', 'C'], ['dec', 'D'], ['pre', 'E'], ['conn', 'F']];
    opts.forEach((o, i) => {
      const cx = 8.55 + (i % 2) * 2.55, cy = 2.5 + Math.floor(i / 2) * 1.35;
      const w = o[0] === 'conn' ? 0.62 : 1.7, h = o[0] === 'conn' ? 0.62 : o[0] === 'dec' ? 0.8 : 0.56;
      node(s, o[0], cx, cy, w, h, '', {});
      T(s, o[1], { x: cx - 1.3, y: cy - 0.2, w: 0.35, h: 0.4, fontFace: MF, fontSize: 18, bold: true, color: C.amberDk, valign: 'middle' });
    });
    small(s, 7.4, 6.35, 5.35, 0.35, 'Match each step 1–7 to a shape A–F.', { align: 'center', color: C.slate });
  }
  // 11. ANSWERS
  {
    const s = D.slide('Quiz · answers', 'Each Step in Its Shape',
      'Walk through the answers. Stress item 7: never combine an input and a calculation in one box; the flowchart must show that reading happens first. Also point out that the question mark in the decision text is a convention that makes the yes/no nature obvious.');
    quizItems.slice(0, 6).forEach((q, i) => {
      const cx = 1.95 + (i % 3) * 3.3, cy = 2.25 + Math.floor(i / 3) * 1.7;
      const w = q[1] === 'dec' ? 2.3 : q[1] === 'pre' ? 2.9 : 2.5, h = q[1] === 'dec' ? 0.85 : 0.6;
      node(s, q[1], cx, cy, w, h, q[1] === 'pre' ? 'GCD(a, b)' : q[0], { fs: 14 });
      T(s, `${i + 1} · ${{ io: 'input / output', proc: 'process', dec: 'decision', pre: 'predefined process', term: 'terminal' }[q[1]]}`, { x: cx - 1.5, y: cy + 0.48, w: 3.0, h: 0.35, fontSize: 14, bold: true, color: C.slate, align: 'center' });
    });
    D.card(s, 10.3, 1.75, 2.45, 3.5, C.softRed);
    T(s, '7 · trap!', { x: 10.45, y: 1.85, w: 2.15, h: 0.35, fontFace: HF, fontSize: 16, bold: true, color: C.red, align: 'center' });
    const a = node(s, 'io', 11.525, 2.7, 1.9, 0.5, 'Read x', { fs: 14 });
    const b = node(s, 'proc', 11.525, 3.75, 1.9, 0.5, 'x ← 2 × x', { fs: 14 });
    down(s, a, b);
    T(s, 'two boxes', { x: 10.45, y: 4.3, w: 2.15, h: 0.35, fontSize: 14, bold: true, color: C.red, align: 'center' });
    D.callout(s, 0.6, 5.55, 12.15, 1.05, D.I.lightbulb_ink, [{ text: 'One idea per box. ', options: { bold: true, color: C.ink } },
      { text: 'Item 5 (GCD) uses the predefined-process shape because the details are written elsewhere; its “page 2” chart would start with its own Start.' }], { fs: 14.5 });
  }

  // =====================================================================
  D.section(2, 'Three Structures as Flowchart Patterns', 'Sequence, selection, repetition — and converting between charts and pseudocode');

  // 13. SEQUENCE + SELECTION
  {
    const s = D.slide('Patterns 1 & 2', 'Sequence and Selection',
      'About 6 min. Every pattern has exactly ONE entry arrow and ONE exit arrow; that is what allows patterns to be nested (a whole IF can be one "box" inside a loop). IF-THEN: the "no" exit skips the block. IF-THEN-ELSE: exactly one of A or B runs, then the two paths join. Colours follow Week 1: sequence ink, selection blue. Ask: in the IF-THEN pattern, what happens if we forget the join and draw A straight to End? (Then the "yes" path skips everything after the IF, a typical exam mistake.)');
    const panels = [[0.6, 'Sequence', C.ink], [4.72, 'Selection · IF–THEN', C.blue], [8.85, 'Selection · IF–THEN–ELSE', C.blue]];
    panels.forEach((p) => { D.card(s, p[0], 1.75, 3.9, 3.35); T(s, p[1], { x: p[0] + 0.2, y: 1.85, w: 3.5, h: 0.36, fontFace: HF, fontSize: 16, bold: true, color: p[2] }); });
    // sequence
    {
      const cx = 2.55;
      const a = node(s, 'proc', cx, 2.75, 1.9, 0.44, 'statement 1');
      const b = node(s, 'proc', cx, 3.5, 1.9, 0.44, 'statement 2');
      const c = node(s, 'proc', cx, 4.25, 1.9, 0.44, 'statement 3');
      D.seg(s, cx, 2.28, ...a.top); down(s, a, b); down(s, b, c); D.seg(s, ...c.bottom, cx, 4.95);
    }
    // if-then
    {
      const cx = 5.95;
      const d = node(s, 'dec', cx, 2.95, 1.75, 0.72, 'condition ?');
      const a = node(s, 'proc', 7.75, 2.95, 0.95, 0.44, 'A');
      D.seg(s, cx, 2.28, ...d.top);
      D.seg(s, ...d.right, ...a.left); labR(s, d, 'yes');
      D.seg(s, ...d.bottom, cx, 4.95); labB(s, d, 'no');
      line(s, [a.bottom, [a.cx, 4.05], [cx, 4.05]]);
    }
    // if-then-else
    {
      const cx = 10.8;
      const d = node(s, 'dec', cx, 2.95, 1.75, 0.72, 'condition ?');
      const a = node(s, 'proc', 12.15, 3.75, 0.9, 0.44, 'A');
      const b = node(s, 'proc', 9.45, 3.75, 0.9, 0.44, 'B');
      D.seg(s, cx, 2.28, ...d.top);
      line(s, [d.right, [a.cx, d.cy], a.top]); labR(s, d, 'yes');
      line(s, [d.left, [b.cx, d.cy], b.top]); labL(s, d, 'no');
      line(s, [a.bottom, [a.cx, 4.35], [cx, 4.35]], false);
      line(s, [b.bottom, [b.cx, 4.35], [cx, 4.35]], false);
      D.seg(s, cx, 4.35, cx, 4.95);
    }
    D.pseudo(s, 0.6, 5.25, 3.9, 1.42, 'statement 1\nstatement 2\nstatement 3', { fs: 14 });
    D.pseudo(s, 4.72, 5.25, 3.9, 1.42, 'IF condition THEN\n   A\nEND IF', { fs: 14 });
    D.pseudo(s, 8.85, 5.25, 3.9, 1.42, 'IF condition THEN\n   A\nELSE\n   B\nEND IF', { fs: 13 });
  }

  // 14. REPETITION
  {
    const s = D.slide('Pattern 3', 'Repetition: the Arrow That Goes Back Up',
      'About 6 min. The only difference between an IF and a loop in a flowchart is the back-edge: an arrow from the end of the body back to a point ABOVE the decision. Pre-test (WHILE): condition first, so the body may run zero times. Post-test: body first, so it runs at least once; C# has do-while for this (Week 7). Our pseudocode convention only has WHILE and FOR; a FOR loop i ← 1 TO N is drawn as: i ← 1, decision i ≤ N, body, i ← i + 1, back-edge. Likely question: does the back-edge point into the decision or into the line above it? Either is accepted; we draw it into the line just above the diamond so the diamond keeps one entry.');
    D.card(s, 0.6, 1.75, 6.0, 3.85);
    T(s, 'Pre-test loop · WHILE', { x: 0.8, y: 1.85, w: 5.6, h: 0.36, fontFace: HF, fontSize: 16, bold: true, color: C.green });
    {
      const cx = 2.35;
      const d = node(s, 'dec', cx, 3.05, 1.8, 0.72, 'condition ?');
      const b = node(s, 'proc', cx, 4.15, 1.6, 0.44, 'body');
      D.seg(s, cx, 2.3, ...d.top);
      down(s, d, b); labB(s, d, 'yes');
      line(s, [b.bottom, [cx, 4.7], [0.9, 4.7], [0.9, 2.5], [cx, 2.5]]);
      line(s, [d.right, [3.85, d.cy], [3.85, 5.3]]); labR(s, d, 'no');
      T(s, 'exit', { x: 3.95, y: 5.05, w: 0.6, h: 0.3, fontSize: 13, italic: true, color: C.slate });
    }
    D.pseudo(s, 4.35, 2.35, 2.05, 1.3, 'WHILE cond\n   body\nEND WHILE', { fs: 14 });
    small(s, 4.35, 3.8, 2.1, 1.7, 'Condition first: the body may run 0 times.', { color: C.body, fontSize: 14 });
    D.card(s, 6.75, 1.75, 6.0, 3.85);
    T(s, 'Post-test loop · preview (Week 7)', { x: 6.95, y: 1.85, w: 5.6, h: 0.36, fontFace: HF, fontSize: 16, bold: true, color: C.green });
    {
      const cx = 8.75;
      const b = node(s, 'proc', cx, 2.85, 1.6, 0.44, 'body');
      const d = node(s, 'dec', cx, 3.95, 1.8, 0.72, 'condition ?');
      D.seg(s, cx, 2.3, ...b.top);
      down(s, b, d);
      line(s, [d.left, [7.25, d.cy], [7.25, 2.5], [cx, 2.5]]); labL(s, d, 'yes');
      D.seg(s, ...d.bottom, cx, 5.3); labB(s, d, 'no');
      T(s, 'exit', { x: cx + 0.1, y: 5.05, w: 0.6, h: 0.3, fontSize: 13, italic: true, color: C.slate });
    }
    D.code(s, 10.5, 2.35, 2.05, 1.55, 'do\n{\n    body\n} while (cond);', { fs: 12 });
    small(s, 10.5, 4.0, 2.15, 1.5, 'Body first: runs at least once.', { color: C.body, fontSize: 14 });
    D.callout(s, 0.6, 5.8, 12.15, 0.85, D.I.redo_ink, [{ text: 'An arrow pointing upwards = repetition. ', options: { bold: true, color: C.ink } },
      { text: 'Something inside the body must change the condition, or the loop never ends.' }], { fs: 15 });
  }

  // 15. PSEUDOCODE -> FLOWCHART (countdown)
  {
    const s = D.slide('Conversion 1 · pseudocode → flowchart', 'Countdown: One Line, One Box',
      'About 5 min. Week 1 exercise D. Do it live on the board: go line by line. START and END become terminals; READ and PRINT become parallelograms; the WHILE line becomes a diamond; END WHILE becomes the back-edge; the statement after END WHILE hangs on the "no" exit. Trace quickly for N = 3: prints 3, 2, 1, Go!. Edge case N = 0: the condition is false at once and only "Go!" is printed. Question: what if we forget N ← N − 1? Infinite loop printing the same number forever.');
    D.pseudo(s, 0.6, 1.75, 4.1, 3.7, 'START\n  READ N\n  WHILE N ≥ 1\n    PRINT N\n    N ← N − 1\n  END WHILE\n  PRINT "Go!"\nEND', { fs: 16, title: 'Week 1 · exercise D' });
    const cx = 6.6;
    const a = node(s, 'term', cx, 1.93, 1.3, 0.4, 'Start');
    const b = node(s, 'io', cx, 2.55, 1.6, 0.46, 'Read N');
    const d = node(s, 'dec', cx, 3.6, 1.6, 0.74, 'N ≥ 1 ?');
    const p = node(s, 'io', cx, 4.6, 1.6, 0.46, 'Print N');
    const q = node(s, 'proc', cx, 5.4, 1.6, 0.46, 'N ← N − 1');
    const o = node(s, 'io', 9.05, 4.6, 1.8, 0.46, 'Print "Go!"');
    const e = node(s, 'term', 9.05, 5.4, 1.3, 0.4, 'End');
    down(s, a, b); down(s, b, d); down(s, d, p); labB(s, d, 'yes'); down(s, p, q);
    line(s, [q.bottom, [cx, 5.9], [5.25, 5.9], [5.25, 3.02], [cx, 3.02]]);
    line(s, [d.right, [o.cx, d.cy], o.top]); labR(s, d, 'no');
    down(s, o, e);
    const map = [['READ / PRINT', 'parallelogram'], ['x ← …', 'rectangle'], ['WHILE cond', 'diamond'], ['END WHILE', 'arrow back up']];
    map.forEach((m, i) => {
      const y = 1.8 + i * 1.0;
      D.card(s, 10.45, y, 2.3, 0.85);
      T(s, m[0], { x: 10.6, y: y + 0.07, w: 2.0, h: 0.35, fontFace: MF, fontSize: 13, bold: true, color: C.blue });
      T(s, '→ ' + m[1], { x: 10.6, y: y + 0.42, w: 2.05, h: 0.35, fontSize: 14 });
    });
    small(s, 0.6, 5.65, 4.1, 0.95, 'Trace N = 3 →  3, 2, 1, Go!\nEdge case N = 0 →  only “Go!”', { fontFace: MF, color: C.ink, fontSize: 13 });
  }

  // 16. FLOWCHART -> PSEUDOCODE (question)
  {
    const s = D.slide('Conversion 2 · flowchart → pseudocode', 'Your Turn: Write the Pseudocode',
      'Give 4 minutes in pairs. Hints if students are stuck: a diamond whose two exits join again later (no arrow going back up) is an IF; here the second IF sits inside the ELSE of the first one. Ask them to give three test inputs that together visit every box: one positive, one negative, and zero. Answer on the next slide.');
    chartSign(s, 2.6, 5.0);
    D.card(s, 7.3, 1.75, 5.45, 4.9, C.cream);
    D.circIcon(s, D.I.pencil, 7.55, 2.0, 0.62, C.amber);
    T(s, 'Task (pairs · 4 min)', { x: 8.35, y: 2.0, w: 4.2, h: 0.62, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle' });
    D.bullets(s, ['Write the pseudocode, using IF … THEN … ELSE … END IF.',
      'Which kind of structure is this: sequence, selection or repetition? How can you tell?',
      'Choose three test inputs so that every box is visited at least once.'], 7.6, 2.85, 4.95, 3.6, { fs: 16, numbered: true, space: 12 });
  }
  // 17. ANSWER
  {
    const s = D.slide('Conversion 2 · answer', 'Nested Selection',
      'The second decision sits on the "no" exit of the first, so the second IF goes inside the ELSE. There is no arrow going back up, so there is no loop. Tests 5, −3, 0 visit all three outputs. In Week 5 the same logic is written with else if (an "else-if ladder"). Common student error: writing three separate IFs (x > 0, x < 0, x = 0); that also works here but tests conditions that are already known, and it does not match this flowchart.');
    chartSign(s, 2.6, 5.0);
    D.pseudo(s, 7.3, 1.75, 5.45, 3.55, 'START\n  READ x\n  IF x > 0 THEN\n    PRINT "positive"\n  ELSE\n    IF x < 0 THEN\n      PRINT "negative"\n    ELSE\n      PRINT "zero"\n    END IF\n  END IF\nEND', { fs: 14 });
    D.table(s, [[hdr('x'), hdr('path'), hdr('output')], ['5', 'yes', 'positive'], ['−3', 'no → yes', 'negative'], ['0', 'no → no', 'zero']], 7.3, 5.45, 5.45, [1.1, 2.15, 2.2], { fs: 13, rowH: 0.29, align: ['center', 'center', 'center'] });
  }

  // 18. TRACING
  {
    const s = D.slide('Desk-checking a flowchart', 'Tracing a Flowchart with a Trace Table',
      'About 6 min. Put a finger on Start and follow the arrows; every time a box changes a variable, write a new value in the table. Trace for n = 20 gives 5. Ask the class what the chart computes: the number of doublings needed to reach at least n, i.e. the smallest k with 2^k ≥ n (for n ≥ 1). For n = 1000 the answer is 10 because 2^10 = 1024, the same 10 as the worst case of the halving guessing game from Week 1. Edge case: n = 1 prints 0 (the loop body never runs).');
    const cx = 2.5;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.6, 0.42, 'Read n');
    const c = node(s, 'proc', cx, 3.0, 1.8, 0.42, 'p ← 1,  k ← 0');
    const d = node(s, 'dec', cx, 3.95, 1.6, 0.7, 'p < n ?');
    const p1 = node(s, 'proc', cx, 4.9, 1.6, 0.42, 'p ← p × 2');
    const p2 = node(s, 'proc', cx, 5.55, 1.6, 0.42, 'k ← k + 1');
    const o = node(s, 'io', 5.0, 4.9, 1.4, 0.42, 'Print k');
    const e = node(s, 'term', 5.0, 5.55, 1.3, 0.38, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d); down(s, d, p1); labB(s, d, 'yes'); down(s, p1, p2);
    line(s, [p2.bottom, [cx, 6.0], [1.05, 6.0], [1.05, 3.4], [cx, 3.4]]);
    line(s, [d.right, [o.cx, d.cy], o.top]); labR(s, d, 'no'); down(s, o, e);
    h3(s, 6.3, 1.75, 6.4, 'Trace for n = 20');
    const rows = [[hdr('step'), hdr('p < n ?'), hdr('p'), hdr('k'), hdr('output')],
      ['start', '—', '1', '0', ''], ['1', 'yes', '2', '1', ''], ['2', 'yes', '4', '2', ''], ['3', 'yes', '8', '3', ''], ['4', 'yes', '16', '4', ''], ['5', 'yes', '32', '5', ''],
      [{ text: 'exit', options: { bold: true } }, { text: 'no', options: { color: C.red, bold: true } }, '32', '5', { text: '5', options: { bold: true, color: C.green } }]];
    D.table(s, rows, 6.3, 2.2, 6.45, [1.2, 1.45, 1.2, 1.2, 1.4], { fs: 14, rowH: 0.38, mono: [0, 1, 2, 3, 4], align: ['center', 'center', 'center', 'center', 'center'] });
    D.callout(s, 6.3, 5.4, 6.45, 1.25, D.I.question_ink, [{ text: 'What does it compute? ', options: { bold: true, color: C.ink } }, { text: 'Predict the output for n = 1000, then check with a table.' }], { fs: 15 });
  }

  // =====================================================================
  D.section(3, 'Basic Flowchart Examples', 'Problem → flowchart → C# preview → a real run');

  // 20. RECTANGLE (sequence)
  {
    const s = D.slide('Example 1 · sequence', 'Rectangle: Area and Perimeter',
      'About 5 min. Pure sequence: six boxes, no decisions, every box runs exactly once. Point at each C# line and name its box (comments say input/process/output). Formulas: area = width × height, perimeter = 2 × (width + height). Test: 4.5 by 3 gives 13.5 and 15. Discussion: what happens with a negative width? The algorithm happily prints a negative area; input validation needs selection (Part 3 continues). Syntax details (double, Parse, $"...") are Week 3 topics, do not explain them in depth today.');
    const cx = 2.05;
    const a = node(s, 'term', cx, 1.95, 1.3, 0.42, 'Start');
    const b = node(s, 'io', cx, 2.7, 2.6, 0.5, 'Read width, height');
    const c = node(s, 'proc', cx, 3.5, 2.6, 0.5, 'area ← width × height');
    const d = node(s, 'proc', cx, 4.4, 2.6, 0.66, 'perimeter ←\n2 × (width + height)');
    const o = node(s, 'io', cx, 5.3, 2.6, 0.5, 'Print area, perimeter');
    const e = node(s, 'term', cx, 6.1, 1.3, 0.42, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d); down(s, d, o); down(s, o, e);
    D.code(s, 3.8, 1.75, 8.95, 3.35, body('02_01_RectangleArea'), { fs: 14, title: 'code/02_01_RectangleArea/Program.cs' });
    D.consoleOut(s, 3.8, 5.25, 8.95, 1.42, 'Width: [[4.5]]\nHeight: [[3]]\nArea: 13.5\nPerimeter: 15', { fs: 13 });
  }

  // 21. EVEN / ODD
  {
    const s = D.slide('Example 2 · selection (IF–THEN–ELSE)', 'Even or Odd?',
      'About 4 min. n is even exactly when n mod 2 = 0 (C#: n % 2 == 0). Both branches print, then join before End. Test with 14 (even), −7 (odd) and 0 (even). Why test == 0 and not == 1 for odd? In C# the remainder of a negative number is negative: −7 % 2 is −1, so a test "n % 2 == 1" would call −7 even. The IF-THEN version (one branch) was the absolute-value example, code folder 02_02.');
    const cx = 2.2;
    const a = node(s, 'term', cx, 1.95, 1.3, 0.42, 'Start');
    const b = node(s, 'io', cx, 2.65, 1.8, 0.48, 'Read n');
    const d = node(s, 'dec', cx, 3.65, 2.2, 0.8, 'n mod 2 = 0 ?');
    const p = node(s, 'io', 4.5, 3.65, 1.75, 0.48, 'Print "even"');
    const q = node(s, 'io', cx, 4.75, 1.75, 0.48, 'Print "odd"');
    const e = node(s, 'term', cx, 5.65, 1.3, 0.42, 'End');
    down(s, a, b); down(s, b, d); D.seg(s, ...d.right, ...p.left); labR(s, d, 'yes');
    down(s, d, q); labB(s, d, 'no'); down(s, q, e);
    line(s, [p.bottom, [p.cx, e.cy], e.right]);
    D.code(s, 5.7, 1.75, 7.05, 3.35, body('02_03_EvenOdd'), { fs: 13, title: 'code/02_03_EvenOdd/Program.cs' });
    D.consoleOut(s, 5.7, 5.25, 7.05, 1.42, 'Enter an integer: [[14]]\n14 is even\nEnter an integer: [[-7]]\n-7 is odd', { fs: 13, title: 'Console · two runs' });
  }

  // 22. PASS / FAIL
  {
    const s = D.slide('Example 3 · selection with a boundary', 'Grade → PASS or FAIL',
      'About 4 min. The specification says 50 is a pass, so the condition is grade ≥ 50 (C#: >=). The boundary is where bugs hide: the test table deliberately includes 49.5 and exactly 50. Ask: what would change if someone wrote grade > 50? Only the test with exactly 50 would reveal it. Invalid inputs such as 120 or −5 are not handled yet; validation comes in Week 5.');
    const cx = 2.2;
    const a = node(s, 'term', cx, 1.95, 1.3, 0.42, 'Start');
    const b = node(s, 'io', cx, 2.65, 1.9, 0.48, 'Read grade');
    const d = node(s, 'dec', cx, 3.65, 2.1, 0.8, 'grade ≥ 50 ?');
    const p = node(s, 'io', 4.45, 3.65, 1.7, 0.48, 'Print "PASS"');
    const q = node(s, 'io', cx, 4.75, 1.7, 0.48, 'Print "FAIL"');
    const e = node(s, 'term', cx, 5.65, 1.3, 0.42, 'End');
    down(s, a, b); down(s, b, d); D.seg(s, ...d.right, ...p.left); labR(s, d, 'yes');
    down(s, d, q); labB(s, d, 'no'); down(s, q, e);
    line(s, [p.bottom, [p.cx, e.cy], e.right]);
    D.code(s, 5.7, 1.75, 7.05, 3.35, body('02_04_PassFail'), { fs: 13, title: 'code/02_04_PassFail/Program.cs' });
    D.consoleOut(s, 5.7, 5.25, 3.7, 1.42, 'Grade (0-100): [[49.5]]\nFAIL\nGrade (0-100): [[50]]\nPASS', { fs: 13, title: 'Console · two runs' });
    D.table(s, [[hdr('test grade'), hdr('output')], ['0', 'FAIL'], ['49.5', 'FAIL'], [{ text: '50', options: { bold: true, color: C.amberDk } }, { text: 'PASS', options: { bold: true, color: C.amberDk } }], ['100', 'PASS']],
      9.6, 5.25, 3.15, [1.75, 1.4], { fs: 13, rowH: 0.28, mono: [0, 1], align: ['center', 'center'] });
  }

  // 23. MAX OF THREE — nested
  {
    const s = D.slide('Example 4 · nested decisions', 'Maximum of Three: Method 1 (Nested)',
      'About 6 min. First compare a and b; the winner is then compared with c. Two different decisions can lead to "Print c", so both exits merge into one box, which keeps the chart at 9 symbols. Trace (4, 9, 7): a > b? no, b > c? yes, print 9. Ties: (8, 3, 8): a > b yes, a > c? 8 > 8 is false, print c = 8, which is still correct because c equals the maximum. Warm-up for students who finish early: draw max of TWO numbers (one decision, two outputs). The C# of this method is in code/02_05_MaxOfThree (Method 1) and in the notes; it is a set of nested if statements.');
    const cx = 4.2;
    const a = node(s, 'term', cx, 1.93, 1.3, 0.4, 'Start');
    const b = node(s, 'io', cx, 2.55, 1.9, 0.46, 'Read a, b, c');
    const d1 = node(s, 'dec', cx, 3.45, 1.7, 0.74, 'a > b ?');
    const d2 = node(s, 'dec', 1.9, 4.45, 1.7, 0.74, 'a > c ?');
    const d3 = node(s, 'dec', 6.5, 4.45, 1.7, 0.74, 'b > c ?');
    const pa = node(s, 'io', 1.9, 5.5, 1.5, 0.46, 'Print a');
    const pc = node(s, 'io', cx, 5.5, 1.5, 0.46, 'Print c');
    const pb = node(s, 'io', 6.5, 5.5, 1.5, 0.46, 'Print b');
    const e = node(s, 'term', cx, 6.35, 1.3, 0.4, 'End');
    down(s, a, b); down(s, b, d1);
    line(s, [d1.left, [d2.cx, d1.cy], d2.top]); labL(s, d1, 'yes');
    line(s, [d1.right, [d3.cx, d1.cy], d3.top]); labR(s, d1, 'no');
    down(s, d2, pa); labB(s, d2, 'yes');
    down(s, d3, pb); labB(s, d3, 'yes');
    line(s, [d2.right, [cx, d2.cy]], false); labR(s, d2, 'no');
    line(s, [d3.left, [cx, d3.cy]], false); labL(s, d3, 'no');
    D.seg(s, cx, d2.cy, ...pc.top);
    down(s, pc, e);
    line(s, [pa.bottom, [pa.cx, e.cy], e.left]);
    line(s, [pb.bottom, [pb.cx, e.cy], e.right]);
    h3(s, 8.0, 1.75, 4.75, 'Test every path');
    D.table(s, [[hdr('a, b, c'), hdr('decisions'), hdr('max')],
      ['4, 9, 7', 'no → yes', '9'], ['8, 3, 8', 'yes → no', '8'], ['2, 5, 9', 'no → no', '9'], ['9, 1, 4', 'yes → yes', '9'], ['−2, −5, −1', 'yes → no', '−1']],
    8.0, 2.2, 4.75, [1.6, 1.9, 1.25], { fs: 14, rowH: 0.42, mono: [0, 2], align: ['center', 'center', 'center'] });
    D.callout(s, 8.0, 5.0, 4.75, 1.6, D.I.route_ink, [{ text: '4 paths → at least 4 tests. ', options: { bold: true, color: C.ink } }, { text: 'Negative numbers must work too.' }], { fs: 14 });
  }

  // 24. MAX OF THREE — running max
  {
    const s = D.slide('Example 4 · a second design', 'Maximum of Three: Method 2 (Running Max)',
      'About 5 min. Same problem, different algorithm: keep "the largest so far" in max and let each new number challenge it. Two IF-THEN patterns in sequence, no nesting. This design scales: for 100 numbers it is the same two boxes inside a loop (Week 6), while the nested design would explode. The console shows the real program, which prints both methods so students can see they agree. Initialising max with a (not with 0) is what makes negative inputs work.');
    const cx = 2.2;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.9, 0.42, 'Read a, b, c');
    const c = node(s, 'proc', cx, 3.02, 1.6, 0.42, 'max ← a');
    const d1 = node(s, 'dec', cx, 3.85, 1.9, 0.7, 'b > max ?');
    const p1 = node(s, 'proc', 4.25, 3.85, 1.3, 0.42, 'max ← b');
    const d2 = node(s, 'dec', cx, 5.0, 1.9, 0.7, 'c > max ?');
    const p2 = node(s, 'proc', 4.25, 5.0, 1.3, 0.42, 'max ← c');
    const o = node(s, 'io', cx, 5.95, 1.7, 0.4, 'Print max');
    const e = node(s, 'term', cx, 6.48, 1.3, 0.36, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d1);
    D.seg(s, ...d1.right, ...p1.left); labR(s, d1, 'yes');
    down(s, d1, d2); labB(s, d1, 'no');
    line(s, [p1.bottom, [p1.cx, 4.43], [cx, 4.43]]);
    D.seg(s, ...d2.right, ...p2.left); labR(s, d2, 'yes');
    down(s, d2, o); labB(s, d2, 'no');
    line(s, [p2.bottom, [p2.cx, 5.55], [cx, 5.55]]);
    down(s, o, e);
    D.code(s, 5.4, 1.75, 7.35, 3.1, from('02_05_MaxOfThree', '// Method 2'), { fs: 13, title: 'code/02_05_MaxOfThree/Program.cs  (Method 2)' });
    D.consoleOut(s, 5.4, 4.98, 7.35, 1.69, 'a = [[4]]\nb = [[9]]\nc = [[7]]\nMethod 1 (nested): 9\nMethod 2 (running max): 9', { fs: 13 });
  }

  // 25. LEAP YEAR
  {
    const s = D.slide('Example 5 · three nested decisions', 'Leap Year',
      'About 6 min. Gregorian rule: divisible by 4, except century years, which must be divisible by 400. The chart checks 4, then 100, then 400; the four outcomes merge into only two output boxes, drawn on the left (not leap) and right (leap) so no lines cross. Test the four classic years: 2024 leap, 2026 not, 1900 not (century, not divisible by 400), 2000 leap. The real program (code folder 02_06) prints the nested result and the single-condition result, and they agree for all four. Exercise for fast students: which of 2100, 2400 is a leap year? (2100 no, 2400 yes).');
    const cx = 3.55, xL = 1.55, xR = 5.6;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.47, 1.8, 0.44, 'Read year');
    const d1 = node(s, 'dec', cx, 3.28, 2.35, 0.66, 'year mod 4 = 0 ?');
    const d2 = node(s, 'dec', cx, 4.23, 2.35, 0.66, 'year mod 100 = 0 ?');
    const d3 = node(s, 'dec', cx, 5.18, 2.35, 0.66, 'year mod 400 = 0 ?');
    const nl = node(s, 'io', xL, 5.95, 1.9, 0.44, 'Print "not leap"');
    const lp = node(s, 'io', xR, 5.95, 1.6, 0.44, 'Print "leap"');
    const e = node(s, 'term', cx, 6.45, 1.2, 0.36, 'End');
    down(s, a, b); down(s, b, d1);
    down(s, d1, d2); labB(s, d1, 'yes');
    down(s, d2, d3); labB(s, d2, 'yes');
    line(s, [d1.left, [xL, d1.cy], nl.top]); labL(s, d1, 'no');
    line(s, [d2.right, [xR, d2.cy], lp.top]); labR(s, d2, 'no');
    line(s, [d3.right, [xR, d3.cy]], false); labR(s, d3, 'yes');
    line(s, [d3.left, [xL, d3.cy]], false); labL(s, d3, 'no');
    line(s, [nl.bottom, [xL, e.cy], e.left]);
    line(s, [lp.bottom, [xR, e.cy], e.right]);
    D.pseudo(s, 7.0, 1.75, 5.75, 1.3, 'IF (year mod 4 = 0 AND year mod 100 ≠ 0)\n      OR year mod 400 = 0 THEN …', { fs: 13, title: 'The same rule as ONE condition' });
    D.table(s, [[hdr('year'), hdr('mod 4'), hdr('mod 100'), hdr('mod 400'), hdr('leap?')],
      ['2024', '0', '24', '24', { text: 'yes', options: { color: C.green, bold: true } }], ['2026', '2', '26', '26', { text: 'no', options: { color: C.red, bold: true } }],
      ['1900', '0', '0', '300', { text: 'no', options: { color: C.red, bold: true } }], ['2000', '0', '0', '0', { text: 'yes', options: { color: C.green, bold: true } }]],
    7.0, 3.2, 5.75, [1.15, 1.1, 1.2, 1.2, 1.1], { fs: 14, rowH: 0.36, mono: [0, 1, 2, 3], align: ['center', 'center', 'center', 'center', 'center'] });
    D.consoleOut(s, 7.0, 5.2, 5.75, 1.47, 'Year: [[1900]]\n1900 is not a leap year\nSingle-condition check: False', { fs: 13, title: 'code/02_06_LeapYear' });
  }

  // 26. SUM 1..N
  {
    const s = D.slide('Example 6 · repetition', 'Sum 1 + 2 + … + N',
      'About 6 min. Week 1 algorithm 3, now as a chart. The loop is: decision i ≤ N, body (two process boxes), back-edge into the line above the decision. Initialisation happens once, BEFORE the back-edge target; a classic mistake is to draw the back-edge above "sum ← 0", which resets the sum every pass (infinite loop, since i is reset too). The C# while loop is the same shape. Runs: N = 100 gives 5050 = 100 × 101 / 2 (Gauss); N = 0 gives 0 because the body never runs.');
    const cx = 2.35;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.6, 0.42, 'Read N');
    const c = node(s, 'proc', cx, 3.0, 1.9, 0.42, 'sum ← 0,  i ← 1');
    const d = node(s, 'dec', cx, 3.95, 1.6, 0.7, 'i ≤ N ?');
    const p1 = node(s, 'proc', cx, 4.9, 1.9, 0.42, 'sum ← sum + i');
    const p2 = node(s, 'proc', cx, 5.55, 1.9, 0.42, 'i ← i + 1');
    const o = node(s, 'io', 4.45, 4.9, 1.5, 0.42, 'Print sum');
    const e = node(s, 'term', 4.45, 5.55, 1.2, 0.38, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d); down(s, d, p1); labB(s, d, 'yes'); down(s, p1, p2);
    line(s, [p2.bottom, [cx, 6.0], [0.95, 6.0], [0.95, 3.4], [cx, 3.4]]);
    line(s, [d.right, [o.cx, d.cy], o.top]); labR(s, d, 'no'); down(s, o, e);
    D.code(s, 5.55, 1.75, 7.2, 3.6, body('02_07_SumToN'), { fs: 12, title: 'code/02_07_SumToN/Program.cs' });
    D.consoleOut(s, 5.55, 5.5, 3.5, 1.17, 'N = [[100]]\nSum 1..100 = 5050', { fs: 13 });
    D.consoleOut(s, 9.25, 5.5, 3.5, 1.17, 'N = [[0]]\nSum 1..0 = 0', { fs: 13, title: 'Console · edge case' });
  }

  // 27. FACTORIAL
  {
    const s = D.slide('Example 7 · repetition with a product', 'Factorial  N! = 1 × 2 × … × N',
      'About 5 min. Identical shape to the sum; two changes: the accumulator starts at 1 (the neutral element of multiplication; starting at 0 would always give 0) and the body multiplies. 0! = 1 by definition, and the chart gives exactly that because the body never runs. Size: int holds up to 12! = 479 001 600; 13! = 6 227 020 800 is too big for int, so the program uses long, which holds up to 20! = 2 432 902 008 176 640 000. 21! ≈ 5.1 × 10^19 overflows even long (Week 6 topic).');
    const cx = 2.35;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.6, 0.42, 'Read N');
    const c = node(s, 'proc', cx, 3.0, 2.3, 0.42, 'factorial ← 1,  i ← 1');
    const d = node(s, 'dec', cx, 3.95, 1.6, 0.7, 'i ≤ N ?');
    const p1 = node(s, 'proc', cx, 4.9, 2.3, 0.42, 'factorial ← factorial × i');
    const p2 = node(s, 'proc', cx, 5.55, 2.3, 0.42, 'i ← i + 1');
    const o = node(s, 'io', 4.65, 4.2, 1.75, 0.42, 'Print factorial');
    const e = node(s, 'term', 4.65, 4.85, 1.2, 0.38, 'End');
    down(s, a, b); down(s, b, c); down(s, c, d); down(s, d, p1); labB(s, d, 'yes'); down(s, p1, p2);
    line(s, [p2.bottom, [cx, 6.0], [0.85, 6.0], [0.85, 3.4], [cx, 3.4]]);
    line(s, [d.right, [o.cx, d.cy], o.top]); labR(s, d, 'no'); down(s, o, e);
    D.code(s, 5.85, 1.75, 6.9, 3.3, body('02_08_Factorial'), { fs: 13, title: 'code/02_08_Factorial/Program.cs' });
    D.consoleOut(s, 5.85, 5.2, 3.95, 1.47, 'N = [[5]]\n5! = 120\nN = [[20]]\n20! = 2432902008176640000', { fs: 12, title: 'Console · two runs' });
    D.card(s, 10.0, 5.2, 2.75, 1.47, C.softAmber);
    T(s, [{ text: 'Why long? ', options: { bold: true, color: C.ink } }, { text: 'int stops at 12!; long reaches 20!' }], { x: 10.15, y: 5.25, w: 2.5, h: 1.37, fontSize: 13, valign: 'middle' });
  }

  // 28. EUCLID GCD
  {
    const s = D.slide('Example 8 · a loop that is not a counter', 'Euclid’s GCD as a Flowchart',
      'About 6 min. Week 1 algorithm 5. The loop condition b ≠ 0 does not count anything; the loop ends because b strictly decreases (0 ≤ r < b). Three process boxes in the body, in this order; ask what goes wrong if a ← b and b ← r are swapped (b ← r first, then a ← b copies the new b: both become r, result wrong). Trace (48, 18): 12, 6, 0, result 6. If a < b the first pass swaps them automatically: (18, 48) also gives 6. Homework: trace (84, 36), result 12.');
    const cx = 2.3;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'io', cx, 2.45, 1.7, 0.42, 'Read a, b');
    const d = node(s, 'dec', cx, 3.4, 1.6, 0.7, 'b ≠ 0 ?');
    const p1 = node(s, 'proc', cx, 4.35, 1.8, 0.42, 'r ← a mod b');
    const p2 = node(s, 'proc', cx, 4.97, 1.8, 0.42, 'a ← b');
    const p3 = node(s, 'proc', cx, 5.59, 1.8, 0.42, 'b ← r');
    const o = node(s, 'io', 4.3, 4.35, 1.3, 0.42, 'Print a');
    const e = node(s, 'term', 4.3, 4.97, 1.2, 0.38, 'End');
    down(s, a, b); down(s, b, d); down(s, d, p1); labB(s, d, 'yes'); down(s, p1, p2); down(s, p2, p3);
    line(s, [p3.bottom, [cx, 6.05], [0.95, 6.05], [0.95, 2.85], [cx, 2.85]]);
    line(s, [d.right, [o.cx, d.cy], o.top]); labR(s, d, 'no'); down(s, o, e);
    D.code(s, 5.25, 1.75, 4.45, 3.6, body('02_09_EuclidGcd'), { fs: 12 });
    D.consoleOut(s, 5.25, 5.5, 4.45, 1.17, 'a = [[48]]\nb = [[18]]\nGCD = 6', { fs: 13 });
    h3(s, 9.95, 1.75, 2.8, 'Trace (48, 18)', C.ink, 16);
    D.table(s, [[hdr('a'), hdr('b'), hdr('b ≠ 0?'), hdr('r')], ['48', '18', 'yes', '12'], ['18', '12', 'yes', '6'], ['12', '6', 'yes', '0'],
      ['6', '0', { text: 'no', options: { color: C.red, bold: true } }, '—']], 9.95, 2.2, 2.8, [0.6, 0.6, 0.95, 0.65], { fs: 14, rowH: 0.42, mono: [0, 1, 3], align: ['center', 'center', 'center', 'center'] });
    D.callout(s, 9.95, 4.55, 2.8, 2.1, D.I.check_ink, [{ text: 'Output: 6', options: { bold: true, color: C.green, breakLine: true } }, { text: 'b gets smaller every pass, so the loop must stop.' }], { fs: 13.5 });
  }

  // 29. GUESS — flowchart
  {
    const s = D.slide('Example 9 · a decision inside a loop', 'Guess the Number: the Flowchart',
      'About 5 min. Nesting in action: a two-way decision (higher / lower) sits inside the loop controlled by "guess = secret?". Both hint boxes return to the SAME input box, so there is one back-edge target. The secret is fixed to 37 in our version so everyone gets the same run; Week 7 replaces it by a random number. Trace: 50 → Lower!, 25 → Higher!, 37 → Correct!. Homework H3 adds a counter of guesses (two more process boxes: count ← 0 before the loop and count ← count + 1 after reading).');
    const cx = 2.35, xr = 5.55;
    const a = node(s, 'term', cx, 1.9, 1.3, 0.38, 'Start');
    const b = node(s, 'proc', cx, 2.47, 1.7, 0.42, 'secret ← 37');
    const r = node(s, 'io', cx, 3.2, 1.9, 0.44, 'Read guess');
    const d1 = node(s, 'dec', cx, 4.2, 2.3, 0.74, 'guess = secret ?');
    const d2 = node(s, 'dec', xr, 4.2, 2.3, 0.74, 'guess < secret ?');
    const hi = node(s, 'io', xr, 5.35, 1.7, 0.44, 'Print "Higher!"');
    const lo = node(s, 'io', 7.55, 5.35, 1.7, 0.44, 'Print "Lower!"');
    const ok = node(s, 'io', cx, 5.35, 1.9, 0.44, 'Print "Correct!"');
    const e = node(s, 'term', cx, 6.2, 1.2, 0.38, 'End');
    down(s, a, b); down(s, b, r); down(s, r, d1);
    D.seg(s, ...d1.right, ...d2.left); labR(s, d1, 'no');
    down(s, d1, ok); labB(s, d1, 'yes'); down(s, ok, e);
    down(s, d2, hi); labB(s, d2, 'yes');
    line(s, [d2.right, [lo.cx, d2.cy], lo.top]); labR(s, d2, 'no');
    const xb = 8.7;
    line(s, [hi.bottom, [hi.cx, 5.85], [lo.cx, 5.85]], false);
    line(s, [lo.bottom, [lo.cx, 5.85], [xb, 5.85], [xb, r.cy], r.right]);
    D.consoleOut(s, 9.0, 1.75, 3.75, 2.0, 'Your guess: [[50]]\nLower!\nYour guess: [[25]]\nHigher!\nYour guess: [[37]]\nCorrect!', { fs: 13, title: 'code/02_10_GuessNumber' });
    D.card(s, 9.0, 3.95, 3.75, 2.7, C.mist);
    T(s, 'Reading the chart', { x: 9.2, y: 4.05, w: 3.4, h: 0.4, fontFace: HF, fontSize: 16, bold: true, color: C.ink });
    D.bullets(s, ['The upward arrow on the right makes the loop.', 'Both hints go back to “Read guess”.', 'Only “yes” at the first diamond leaves the loop.'], 9.2, 4.5, 3.4, 2.1, { fs: 14, space: 6 });
  }

  // 30. GUESS — C#
  {
    const s = D.slide('Example 9 · C# preview', 'Guess the Number: the Code',
      'About 4 min. The input box is reached from two places (before the loop and from the back-edge), so in this C# version the ReadLine appears twice: once before while, once at the end of the body. Week 7 shows a do-while version that reads in one place. The if-else inside the loop is the inner diamond. while (guess != secret) is the outer diamond with its yes/no exits swapped: the loop continues while the guess is NOT equal. This is a very common conversion step: "exit when X" in a chart equals "while NOT X" in code.');
    D.code(s, 0.6, 1.75, 7.2, 4.9, body('02_10_GuessNumber'), { fs: 12, title: 'code/02_10_GuessNumber/Program.cs', lineNums: true });
    const m = [['lines 3–4', 'Read guess  (first time)'], ['line 6', 'diamond guess = secret?  — loop runs while NOT equal'], ['lines 8–15', 'inner diamond: Higher! / Lower!'], ['lines 16–17', 'Read guess again = the back-edge'], ['line 20', 'the only way out: Correct!']];
    m.forEach((x, i) => {
      const y = 1.75 + i * 0.98;
      D.card(s, 8.1, y, 4.65, 0.85);
      T(s, x[0], { x: 8.3, y: y + 0.08, w: 1.4, h: 0.7, fontFace: MF, fontSize: 13, bold: true, color: C.blue, valign: 'middle' });
      T(s, x[1], { x: 9.7, y: y + 0.08, w: 2.95, h: 0.7, fontSize: 14, valign: 'middle' });
    });
  }

  // 31. ATM
  {
    const s = D.slide('Example 10 · Week 1 exercise C', 'ATM Withdrawal',
      'About 6 min. Week 1 exercise C, now as a flowchart. The first diamond validates the amount (positive and a multiple of 10); the second checks the balance. The two error messages join the main path at End. The five tests cover all three outputs plus two boundaries (withdraw the whole balance; amount 0 or negative). The C# version comes in Week 5 (decisions), so this example has no code folder project. Point out rule 6: the diamond text is precise, not "amount OK?".');
    const cx = 2.8, xr = 5.85;
    const a = node(s, 'term', cx, 1.88, 1.3, 0.36, 'Start');
    const b = node(s, 'io', cx, 2.42, 2.5, 0.42, 'Read balance, amount');
    const d1 = node(s, 'dec', cx, 3.35, 3.0, 1.0, 'amount > 0 AND\namount mod 10 = 0 ?', { fs: 12 });
    const d2 = node(s, 'dec', cx, 4.47, 2.5, 0.72, 'amount ≤ balance ?');
    const p = node(s, 'proc', cx, 5.3, 2.8, 0.42, 'balance ← balance − amount');
    const o = node(s, 'io', cx, 5.9, 1.9, 0.4, 'Print balance');
    const e = node(s, 'term', cx, 6.45, 1.2, 0.34, 'End');
    const x1 = node(s, 'io', xr, 3.35, 2.2, 0.44, 'Print "invalid"');
    const x2 = node(s, 'io', xr, 4.47, 2.2, 0.44, 'Print "no funds"');
    down(s, a, b); down(s, b, d1); down(s, d1, d2); labB(s, d1, 'yes');
    D.seg(s, ...d1.right, ...x1.left); labR(s, d1, 'no');
    D.seg(s, ...d2.right, ...x2.left); labR(s, d2, 'no');
    down(s, d2, p); labB(s, d2, 'yes'); down(s, p, o); down(s, o, e);
    const xj = 7.3;
    line(s, [x1.right, [xj, x1.cy], [xj, e.cy]], false);
    line(s, [x2.right, [xj, x2.cy]], false);
    line(s, [[xj, e.cy], e.right]);
    D.pseudo(s, 7.75, 1.75, 5.0, 3.3, 'START\n  READ balance, amount\n  IF amount > 0 AND amount mod 10 = 0 THEN\n    IF amount ≤ balance THEN\n      balance ← balance − amount\n      PRINT balance\n    ELSE\n      PRINT "no funds"\n    END IF\n  ELSE\n    PRINT "invalid"\n  END IF\nEND', { fs: 12 });
    D.table(s, [[hdr('balance, amount'), hdr('output')], ['500, 200', '300'], ['500, 500', '0'], ['500, 510', 'no funds'], ['500, 25', 'invalid'], ['500, −10', 'invalid']],
      7.75, 5.15, 5.0, [2.5, 2.5], { fs: 13, rowH: 0.25, mono: [0, 1], align: ['center', 'center'] });
  }

  // =====================================================================
  D.section(4, 'Mistakes, Quiz, Tools and Practice', 'What goes wrong, how to check yourself, and what to draw with');

  // 33. COMMON MISTAKES
  {
    const s = D.slide('Common mistakes', 'Four Flowchart Bugs (and the Fix)',
      'About 6 min. Each panel breaks one of the eight rules. 1) A diamond with one exit: what happens when x ≤ 0? The chart does not say. 2) No End: the reader (and the grader) cannot tell whether the algorithm finishes. 3) The loop never changes i, so i ≤ N stays true forever: an infinite loop; in C# the program hangs and must be stopped with Ctrl+C. 4) Vague text: "calculate it" is not definite (Week 1 property); write the exact assignment. Ask students to redraw each fixed version on paper.');
    const panels = [
      [0.6, 1.75, 'Decision with one exit', 'Every diamond needs two labelled exits: add the “no” path.'],
      [6.75, 1.75, 'Missing End', 'Every path must reach one End terminal.'],
      [0.6, 4.25, 'Loop without update', 'Nothing changes i → infinite loop. Add i ← i + 1.'],
      [6.75, 4.25, 'Ambiguous text', 'Say exactly what happens: Read a, b · sum ← a + b.'],
    ];
    panels.forEach((p) => {
      D.card(s, p[0], p[1], 6.0, 2.3, C.softRed);
      T(s, p[2], { x: p[0] + 0.25, y: p[1] + 0.12, w: 5.5, h: 0.36, fontFace: HF, fontSize: 16, bold: true, color: C.red });
      T(s, p[3], { x: p[0] + 3.3, y: p[1] + 0.65, w: 2.55, h: 1.5, fontSize: 14, valign: 'top' });
      s.addImage({ data: D.I.times_amb, x: p[0] + 5.45, y: p[1] + 0.12, w: 0.35, h: 0.35 });
    });
    // 1: one exit
    {
      const d = node(s, 'dec', 1.75, 2.85, 1.6, 0.6, 'x > 0 ?');
      const o = node(s, 'io', 1.75, 3.65, 1.6, 0.38, 'Print x');
      D.seg(s, 1.75, 2.3, ...d.top);
      down(s, d, o); labB(s, d, 'yes');
      T(s, '?', { x: d.right[0] + 0.1, y: d.cy - 0.25, w: 0.5, h: 0.5, fontFace: HF, fontSize: 24, bold: true, color: C.red });
    }
    // 2: missing end
    {
      const a = node(s, 'term', 7.9, 2.47, 1.2, 0.34, 'Start');
      const b = node(s, 'io', 7.9, 3.02, 1.6, 0.36, 'Read x');
      const c = node(s, 'io', 7.9, 3.57, 1.6, 0.36, 'Print 2 × x');
      down(s, a, b); down(s, b, c);
      D.seg(s, ...c.bottom, 7.9, 3.97, false, C.red);
      T(s, '… ?', { x: 8.75, y: 3.6, w: 0.8, h: 0.3, fontSize: 14, bold: true, color: C.red });
    }
    // 3: loop without update
    {
      const cx = 1.95;
      const d = node(s, 'dec', cx, 5.37, 1.5, 0.56, 'i ≤ N ?');
      const p = node(s, 'proc', cx, 6.05, 1.8, 0.36, 'sum ← sum + i');
      D.seg(s, cx, 4.8, ...d.top);
      down(s, d, p); labB(s, d, 'yes');
      line(s, [p.bottom, [cx, 6.4], [0.85, 6.4], [0.85, 4.95], [cx, 4.95]], true);
      D.seg(s, ...d.right, 3.1, d.cy); labR(s, d, 'no');
    }
    // 4: ambiguous
    {
      const a = node(s, 'io', 7.95, 5.15, 2.0, 0.42, 'get the numbers', { fill: C.paper });
      const b = node(s, 'proc', 7.95, 5.95, 2.0, 0.42, 'calculate it');
      down(s, a, b);
    }
  }

  // 34. PREDICT THE OUTPUT
  {
    const s = D.slide('Predict the output · 4 min', 'What Does This Flowchart Print for n = 6?',
      'Individual work, 3 to 4 minutes, then a vote A to D. Common wrong answer: 21 (students add every k and ignore the inner decision). 9 is the sum of the odd numbers 1 + 3 + 5 (swapped yes/no). Correct answer: 12 = 2 + 4 + 6. Full trace on the next slide.');
    chartEven(s);
    D.card(s, 8.1, 1.75, 4.65, 4.9, C.cream);
    T(s, 'Input: n = 6', { x: 8.35, y: 1.9, w: 4.2, h: 0.45, fontFace: MF, fontSize: 18, bold: true, color: C.ink });
    const ch = [['A', '21'], ['B', '12'], ['C', '9'], ['D', 'it never stops']];
    ch.forEach((c, i) => {
      const y = 2.6 + i * 0.85;
      s.addShape(pres.shapes.OVAL, { x: 8.35, y, w: 0.6, h: 0.6, fill: { color: C.ink }, line: { color: C.ink } });
      T(s, c[0], { x: 8.35, y, w: 0.6, h: 0.6, fontFace: MF, fontSize: 18, bold: true, color: C.amber, align: 'center', valign: 'middle' });
      T(s, c[1], { x: 9.15, y, w: 3.4, h: 0.6, fontFace: MF, fontSize: 18, color: C.ink, valign: 'middle' });
    });
    small(s, 8.35, 6.0, 4.2, 0.55, 'Hint: use a trace table with columns k, s.', { color: C.slate, fontSize: 14 });
  }
  // 35. ANSWER
  {
    const s = D.slide('Predict the output · answer', 'Answer B: 12  (2 + 4 + 6)',
      'Only even values of k reach the highlighted box. k takes the values 1 to 6 inside the loop; the test k ≤ n is evaluated 7 times (the 7th time it is false). The chart adds up the even numbers from 1 to n. Follow-up question: change one box so that it adds the odd numbers instead (answer: test k mod 2 = 1, or swap yes/no).');
    chartEven(s, C.softAmber);
    const rows = [[hdr('k'), hdr('k ≤ n ?'), hdr('k mod 2 = 0 ?'), hdr('s')]];
    const tr = [['1', 'yes', 'no', '0'], ['2', 'yes', 'yes', '2'], ['3', 'yes', 'no', '2'], ['4', 'yes', 'yes', '6'], ['5', 'yes', 'no', '6'], ['6', 'yes', 'yes', '12']];
    tr.forEach((r) => rows.push(r.map((c, j) => ({ text: c, options: { bold: j === 2 && c === 'yes', color: j === 2 && c === 'yes' ? C.green : C.ink } }))));
    rows.push([{ text: '7', options: {} }, { text: 'no', options: { bold: true, color: C.red } }, { text: '—', options: {} }, { text: 'Print 12', options: { bold: true, color: C.green } }]);
    D.table(s, rows, 8.1, 1.75, 4.65, [0.7, 1.15, 1.6, 1.2], { fs: 14, rowH: 0.42, mono: [0, 3], align: ['center', 'center', 'center', 'center'] });
    D.callout(s, 8.1, 5.35, 4.65, 1.3, D.I.lightbulb_ink, [{ text: 'It adds the even numbers ', options: { bold: true, color: C.ink } }, { text: 'from 1 to n.' }], { fs: 14.5 });
  }

  // 36. TOOLS
  {
    const s = D.slide('Tools', 'What to Draw Flowcharts With',
      'About 4 min. Exams are on paper: practise with pencil and eraser, and leave generous space between boxes. draw.io (diagrams.net) is free in the browser, has a Flowchart shape library and exports PNG/PDF. Flowgorithm is free (Windows) and can RUN a flowchart step by step with a variable-watch window, and show the same chart as source code in many languages, including C#; note that it adds its own "Declare" shape because variables must be declared (preview of Week 3). Mermaid (novel angle) turns plain text into a flowchart; GitHub and GitLab render it in Markdown files, and mermaid.live previews it in the browser. The Mermaid code on the slide is today\'s absolute-value chart.');
    const tools = [
      [D.I.pencil, 'Pen & paper', 'For exams and quick sketches. Pencil + eraser; leave space between boxes.'],
      [D.I.project, 'draw.io (diagrams.net)', 'Free, in the browser. Flowchart shape library; export PNG / PDF.'],
      [D.I.play, 'Flowgorithm', 'Free (Windows). Runs your flowchart step by step and shows it as C# code.'],
      [D.I.fileCode, 'Mermaid', 'Write text, get a chart. Rendered by GitHub, GitLab and mermaid.live.'],
    ];
    tools.forEach((t, i) => {
      const x = 0.6 + (i % 2) * 3.85, y = 1.75 + Math.floor(i / 2) * 2.5;
      D.iconCard(s, x, y, 3.7, 2.3, t[0], t[1], t[2], { fs: 14, iconFill: i === 2 ? C.amberDk : C.ink });
    });
    D.code(s, 8.4, 1.75, 4.35, 3.2, 'flowchart TD\n  A([Start]) --> B[/Read x/]\n  B --> C{"x < 0 ?"}\n  C -- yes --> D["x ← −x"]\n  C -- no --> E[/Print x/]\n  D --> E\n  E --> F([End])', { fs: 12, title: 'Mermaid · absolute value', lang: 'txt' });
    D.callout(s, 8.4, 5.15, 4.35, 1.5, D.I.lightbulb_ink, [{ text: 'Try it: ', options: { bold: true, color: C.ink } }, { text: 'paste the text into mermaid.live and you get the absolute-value chart.' }], { fs: 14 });
  }

  // 37. IN-CLASS EXERCISES
  {
    const s = D.slide('In-class · pairs · 30 min', 'Your Turn: Draw the Flowchart',
      'Assign two exercises per pair so every structure is covered (e.g. A+D, B+E, C+F). For each: flowchart first, then pseudocode, then trace with two inputs, one normal and one edge case. Swap papers and check the neighbour\'s chart against the eight rules. Hints: B needs one decision; C needs two nested decisions (children under 12: 50 TL, 65 and over: 60 TL, otherwise 100 TL); D is a counter loop i ← 1 TO 10 printing n × i; E needs a counter AND an accumulator; F is example 9 plus two boxes. Solutions are in the instructor edition of the notes.');
    const ex = [
      ['A', 'Celsius → Fahrenheit', 'Read C; print F = C × 9 / 5 + 32.', 'sequence', C.ink],
      ['B', 'Larger of two', 'Read a and b; print the larger one (or “equal”).', 'selection', C.blue],
      ['C', 'Ticket price', 'Age < 12: 50 TL; age ≥ 65: 60 TL; otherwise 100 TL.', 'selection', C.blue],
      ['D', 'Multiplication table', 'Read n; print n × 1 … n × 10, one per line.', 'repetition', C.green],
      ['E', 'Average of N numbers', 'Read N, then N numbers; print their average.', 'repetition', C.green],
      ['F', 'Guess + counter', 'Example 9, but also print how many guesses were needed.', 'loop + decision', C.green],
    ];
    ex.forEach((e, i) => {
      const x = 0.6 + (i % 3) * 4.1, y = 1.75 + Math.floor(i / 3) * 2.45;
      D.card(s, x, y, 3.9, 2.25);
      s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.22, w: 0.55, h: 0.55, fill: { color: C.ink }, line: { color: C.ink } });
      T(s, e[0], { x: x + 0.25, y: y + 0.22, w: 0.55, h: 0.55, fontFace: MF, fontSize: 18, bold: true, color: C.amber, align: 'center', valign: 'middle' });
      T(s, e[1], { x: x + 0.95, y: y + 0.22, w: 2.8, h: 0.55, fontFace: HF, fontSize: 17, bold: true, color: C.ink, valign: 'middle' });
      T(s, e[2], { x: x + 0.25, y: y + 0.9, w: 3.45, h: 0.9, fontSize: 14.5, valign: 'top' });
      T(s, e[3], { x: x + 0.25, y: y + 1.8, w: 3.45, h: 0.3, fontFace: MF, fontSize: 12, bold: true, color: e[4] });
    });
    small(s, 0.6, 6.62, 12.15, 0.3, '', {});
  }

  // 38. HOMEWORK
  {
    const s = D.slide('Homework · due before Week 3', 'Practice + a First Look at the Code',
      'H1 and H2 are on paper (photo to Telegram). H3: the counter version needs count ← 0 before the loop and count ← count + 1 right after "Read guess". H4 prepares Week 3: students only RUN the programs; understanding the syntax is next week\'s job. If dotnet run fails, the SDK is missing; see the Week 1 setup homework. Answer key for H2: GCD(84, 36) = 12 after 2 passes; GCD(17, 5): r = 2, then 1, then 0, result 1.');
    D.card(s, 0.6, 1.75, 6.0, 4.9);
    D.circIcon(s, D.I.pencil, 0.85, 1.95, 0.62, C.ink);
    T(s, 'On paper', { x: 1.65, y: 1.95, w: 4.8, h: 0.62, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle' });
    D.bullets(s, [
      'H1 · Draw flowcharts for Week 1 exercises A (even/odd), B (leap year, your own layout) and F (Celsius → Fahrenheit).',
      'H2 · Trace the GCD flowchart for (84, 36) and (17, 5) in trace tables.',
      'H3 · Extend the guess-the-number chart with a guess counter.',
      'Post photos of your pages to the Telegram group.'], 0.85, 2.75, 5.55, 3.8, { fs: 15, space: 9 });
    D.card(s, 6.85, 1.75, 5.9, 4.9);
    D.circIcon(s, D.I.laptop, 7.1, 1.95, 0.62, C.ink);
    T(s, 'On the computer', { x: 7.9, y: 1.95, w: 4.7, h: 0.62, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle' });
    D.bullets(s, ['H4 · Run two preview programs from the code folder; compare each run with its flowchart.', 'Optional: rebuild the Sum 1..N chart in Flowgorithm and run it.'], 7.1, 2.75, 5.45, 1.6, { fs: 15, space: 9 });
    D.code(s, 7.1, 4.45, 5.4, 1.95, '> cd code/02_07_SumToN\n> dotnet run\nN = 10\nSum 1..10 = 55', { fs: 13, lang: 'txt' });
  }

  // 39. CLOSING
  D.closingSlide([
    'A flowchart is a picture of an algorithm: shapes = kinds of steps, arrows = order.',
    'Six symbols: terminal, input/output, process, decision, predefined process, connector.',
    'Rules: one Start, one End; two labelled exits per decision; arrows everywhere; no crossings.',
    'Sequence, selection and repetition each have a pattern; an upward arrow means a loop.',
    'Convert both ways: one box ≈ one pseudocode line; diamond + back-edge = WHILE.',
    'Trace tables test a flowchart before any code exists.',
  ], 'Programming languages, variables, data types, constants',
  'Exit ticket (2 min): draw the flowchart of "read two numbers and print their sum" on a sticky note or post it in Telegram. Next week we start writing real C#: every box you drew today becomes one or two lines of code.');

  const n = await D.save(path.join(__dirname, 'MCMP113_Week02_Flowcharts.pptx'));
  console.log('slides:', n);
})();
