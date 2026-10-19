const pptxgen = require('pptxgenjs');
const fs = require('fs');
const React = require('react');
const RDS = require('react-dom/server');
const sharp = require('sharp');
const fa = require('react-icons/fa');

// ---------- palette & fonts ----------
const C = {
  ink: '14213D',      // deep navy (dominant on dark slides / text)
  amber: 'FCA311',    // accent (the ">_" prompt)
  paper: 'FFFFFF',
  mist: 'EEF1F6',     // card tint
  slate: '5B6478',    // muted text
  line: 'D5DAE3',
  code: '0F1729',     // code block bg
  codeTx: 'E6EDF7',
  green: '2E9E6A',
  red: 'C8453B',
  blue: '2F6FB3',
};
const HF = 'Cambria', BF = 'Calibri', MF = 'Courier New';
const W = 13.333, H = 7.5;

async function icon(Comp, color, size = 256) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: '#' + color, size }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}
const b64 = (p, mime) => mime + ';base64,' + fs.readFileSync(p).toString('base64');

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Asst. Prof. Hasan Oğuz, PhD';
  pres.company = 'Istanbul Okan University';
  pres.title = 'MCMP113 Week 1 – Algorithms and Problem Solving';

  const I = {};
  const need = {
    user: fa.FaUserTie, door: fa.FaDoorOpen, mail: fa.FaEnvelope, tg: fa.FaTelegramPlane,
    keyboard: fa.FaKeyboard, cpu: fa.FaMicrochip, monitor: fa.FaDesktop, memory: fa.FaMemory,
    search: fa.FaSearch, pencil: fa.FaPencilAlt, code: fa.FaCode, bug: fa.FaBug, book: fa.FaBook,
    arrow: fa.FaArrowRight, list: fa.FaListOl, branch: fa.FaCodeBranch, sync: fa.FaSyncAlt,
    check: fa.FaCheck, times: fa.FaTimes, flag: fa.FaFlagCheckered, lightbulb: fa.FaLightbulb,
    laptop: fa.FaLaptopCode, terminal: fa.FaTerminal, clock: fa.FaClock, users: fa.FaUsers,
    warn: fa.FaExclamationTriangle, mug: fa.FaMugHot, tasks: fa.FaTasks, hash: fa.FaHashtag,
    brain: fa.FaBrain, balance: fa.FaBalanceScale, map: fa.FaMapMarkedAlt, bank: fa.FaUniversity, zip: fa.FaFileArchive, thumbs: fa.FaThumbsUp, traffic: fa.FaTrafficLight, idcard: fa.FaIdCard, question: fa.FaQuestion, cogs: fa.FaCogs, vial: fa.FaVial, wifi: fa.FaWifi, robot: fa.FaRobot,
  };
  for (const [k, v] of Object.entries(need)) {
    I[k] = await icon(v, C.paper);
    I[k + '_ink'] = await icon(v, C.ink);
    I[k + '_amb'] = await icon(v, C.amber);
  }

  let n = 0;
  const footer = (s, dark = false) => {
    n++;
    s.addText(`MCMP113  ·  Week 1`, { x: 0.6, y: H - 0.45, w: 4, h: 0.3, fontFace: BF, fontSize: 10, color: dark ? '8A94AB' : C.slate, margin: 0, isTextBox: true });
    s.addText(String(n), { x: W - 1.1, y: H - 0.45, w: 0.5, h: 0.3, fontFace: BF, fontSize: 10, color: dark ? '8A94AB' : C.slate, align: 'right', margin: 0, isTextBox: true });
  };
  // content slide header: ">_ KICKER" + title
  const head = (s, kicker, title) => {
    s.background = { color: C.paper };
    s.addText([
      { text: '>_ ', options: { color: C.amber, bold: true } },
      { text: kicker.toUpperCase(), options: { color: C.slate } },
    ], { x: 0.6, y: 0.35, w: 9, h: 0.35, fontFace: MF, fontSize: 13, margin: 0, isTextBox: true });
    s.addText(title, { x: 0.6, y: 0.72, w: W - 1.2, h: 0.8, fontFace: HF, fontSize: 34, bold: true, color: C.ink, margin: 0, isTextBox: true, valign: 'top' });
  };
  const circIcon = (s, img, x, y, d, fill) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
    const p = d * 0.26;
    s.addImage({ data: img, x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p });
  };
  const card = (s, x, y, w, h, fill = C.mist) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: fill }, rectRadius: 0.12 });
  const codeBlock = (s, x, y, w, h, lines, fs = 14) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.code }, line: { color: C.code }, rectRadius: 0.1 });
    s.addText(lines.map((l, i) => ({ text: l, options: { breakLine: i < lines.length - 1 } })),
      { x: x + 0.25, y: y + 0.2, w: w - 0.5, h: h - 0.4, fontFace: MF, fontSize: fs, color: C.codeTx, valign: 'top', margin: 0, isTextBox: true, paraSpaceAfter: 2 });
  };
  const section = (num, title, sub) => {
    const s = pres.addSlide();
    s.background = { color: C.ink };
    s.addText('>_', { x: 0.6, y: 1.6, w: 3, h: 1.4, fontFace: MF, fontSize: 88, bold: true, color: C.amber, margin: 0, isTextBox: true });
    s.addText(`PART ${num}`, { x: 0.6, y: 3.2, w: 6, h: 0.4, fontFace: MF, fontSize: 16, color: '8A94AB', margin: 0, isTextBox: true, charSpacing: 4 });
    s.addText(title, { x: 0.6, y: 3.65, w: 11, h: 1.0, fontFace: HF, fontSize: 44, bold: true, color: C.paper, margin: 0, isTextBox: true });
    s.addText(sub, { x: 0.6, y: 4.75, w: 11, h: 0.6, fontFace: BF, fontSize: 18, color: 'C7CEDC', margin: 0, isTextBox: true });
    footer(s, true);
    return s;
  };

  // =============== 1. TITLE ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.ink };
    s.addText('>_ MCMP113', { x: 0.6, y: 0.6, w: 8, h: 0.5, fontFace: MF, fontSize: 20, bold: true, color: C.amber, margin: 0, isTextBox: true });
    s.addText('Introduction to Basic Algorithms and Programming', { x: 0.6, y: 1.25, w: 8.2, h: 1.7, fontFace: HF, fontSize: 40, bold: true, color: C.paper, margin: 0, isTextBox: true, valign: 'top' });
    s.addText('Week 1  —  Course Introduction · What Is an Algorithm? · Problem-Solving Steps', { x: 0.6, y: 3.15, w: 8.2, h: 0.8, fontFace: BF, fontSize: 18, color: 'C7CEDC', margin: 0, isTextBox: true, valign: 'top' });
    s.addText([
      { text: 'Asst. Prof. Hasan Oğuz, PhD', options: { bold: true, color: C.paper, breakLine: true } },
      { text: 'Istanbul Okan University  ·  Vocational School', options: { color: 'C7CEDC', breakLine: true } },
      { text: '2026–2027 Fall Semester', options: { color: 'C7CEDC' } },
    ], { x: 0.6, y: 5.2, w: 8, h: 1.1, fontFace: BF, fontSize: 16, margin: 0, isTextBox: true, paraSpaceAfter: 4 });
    // terminal window motif on the right
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 1.3, w: 3.55, h: 4.3, fill: { color: C.code }, line: { color: '2A3654', width: 1 }, rectRadius: 0.12 });
    ['FF5F57', 'FEBC2E', '28C840'].forEach((c, i) => s.addShape(pres.shapes.OVAL, { x: 9.45 + i * 0.3, y: 1.5, w: 0.16, h: 0.16, fill: { color: c }, line: { color: c } }));
    s.addText([
      { text: '> ', options: { color: C.amber } }, { text: 'problem', options: { color: C.codeTx, breakLine: true } },
      { text: '> ', options: { color: C.amber } }, { text: 'algorithm', options: { color: C.codeTx, breakLine: true } },
      { text: '> ', options: { color: C.amber } }, { text: 'program', options: { color: C.codeTx, breakLine: true } },
      { text: '> ', options: { color: C.amber } }, { text: 'dotnet run', options: { color: C.codeTx, breakLine: true } },
      { text: ' ', options: { breakLine: true } },
      { text: 'Hello, World!', options: { color: '7EE2A8', breakLine: true } },
      { text: '> _', options: { color: C.amber } },
    ], { x: 9.5, y: 1.9, w: 3.1, h: 3.5, fontFace: MF, fontSize: 16, margin: 0, isTextBox: true, valign: 'top', paraSpaceAfter: 6 });
    s.addNotes('Welcome. Introduce yourself briefly, then the course code MCMP113. Week 1 is entirely conceptual: no coding yet. The terminal on the right previews the whole semester in five lines: problem -> algorithm -> program -> run.');
    n++;
  }

  // =============== 2. INSTRUCTOR ===============
  {
    const s = pres.addSlide();
    head(s, 'Getting in touch', 'Your Instructor');
    const rows = [
      [I.user, 'Instructor', 'Asst. Prof. Hasan Oğuz, PhD'],
      [I.door, 'Office', ''],
      [I.mail, 'E-mail', ''],
      [I.clock, 'Office hours', 'Announced on Telegram · or by appointment via e-mail'],
      [I.tg, 'Course group', 'Scan the QR code → join the MCMP113 Telegram group'],
    ];
    rows.forEach((r, i) => {
      const y = 1.85 + i * 0.95;
      circIcon(s, r[0], 0.6, y, 0.7, C.ink);
      s.addText(r[1].toUpperCase(), { x: 1.55, y: y + 0.02, w: 6, h: 0.3, fontFace: BF, fontSize: 12, bold: true, color: C.slate, margin: 0, isTextBox: true, charSpacing: 2 });
      s.addText(r[2], { x: 1.55, y: y + 0.3, w: 6.8, h: 0.4, fontFace: BF, fontSize: 19, color: C.ink, margin: 0, isTextBox: true });
    });
    card(s, 8.85, 1.75, 3.9, 4.75, C.mist);
    s.addImage({ path: 'qr.png', x: 9.25, y: 2.0, w: 3.1, h: 3.1 });
    s.addText('Join the Telegram group today', { x: 9.0, y: 5.3, w: 3.6, h: 0.4, fontFace: BF, fontSize: 16, bold: true, color: C.ink, align: 'center', margin: 0, isTextBox: true });
    s.addText('Announcements · slides · sample codes · homework', { x: 9.0, y: 5.72, w: 3.6, h: 0.6, fontFace: BF, fontSize: 12, color: C.slate, align: 'center', margin: 0, isTextBox: true });
    s.addNotes('Ask everyone to scan the QR now, while you are still on this slide. All slides, sample codes and homework announcements will go through the Telegram group. E-mail subject line convention suggestion: "MCMP113 - <Name Surname> - <topic>".');
    footer(s);
  }

  // =============== 3. COURSE AIMS / OUTCOMES ===============
  {
    const s = pres.addSlide();
    head(s, 'Course at a glance', 'What You Will Be Able to Do');
    s.addText('By the end of the semester you will be able to …', { x: 0.6, y: 1.6, w: 12, h: 0.4, fontFace: BF, fontSize: 16, italic: true, color: C.slate, margin: 0, isTextBox: true });
    const outs = [
      [I.brain, 'Think algorithmically', 'Break a real problem into precise, finite, ordered steps.'],
      [I.branch, 'Draw & read flowcharts', 'Express an algorithm visually before writing any code.'],
      [I.code, 'Write C# console apps', 'Use variables, operators, decisions and loops correctly.'],
      [I.list, 'Work with arrays', 'Store, search, sort and process collections of data.'],
      [I.tasks, 'Structure with functions', 'Split programs into reusable methods with parameters.'],
      [I.bug, 'Test and debug', 'Trace code by hand and find errors systematically.'],
    ];
    outs.forEach((o, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.6 + col * 4.1, y = 2.2 + row * 2.3;
      card(s, x, y, 3.85, 2.05);
      circIcon(s, o[0], x + 0.3, y + 0.3, 0.62, C.ink);
      s.addText(o[1], { x: x + 1.1, y: y + 0.3, w: 2.6, h: 0.62, fontFace: HF, fontSize: 17, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
      s.addText(o[2], { x: x + 0.3, y: y + 1.1, w: 3.3, h: 0.8, fontFace: BF, fontSize: 14, color: '333B4F', valign: 'top', margin: 0, isTextBox: true });
    });
    s.addNotes('Main language: C#. Main application type: console applications. Emphasise that the first two outcomes are language-independent and are what actually makes someone a programmer; C# is the vehicle.');
    footer(s);
  }

  // =============== 4. 15-WEEK PLAN ===============
  {
    const s = pres.addSlide();
    head(s, 'Syllabus', '15-Week Plan');
    const weeks = [
      ['1', 'Course introduction · Algorithm concept · Problem-solving steps'],
      ['2', 'Flowcharts and their symbols · Basic flowchart examples'],
      ['3', 'Programming languages · Variables · Data types · Constants'],
      ['4', 'Arithmetic, logical and relational operators'],
      ['5', 'Decision structures: if-else, if-else if, switch-case'],
      ['6', 'Loops: the for loop'],
      ['7', 'Loops: while and do-while'],
      ['8', 'MIDTERM EXAM'],
      ['9', 'One-dimensional arrays: declaration, assignment, element access'],
      ['10', 'Array operations: searching, sorting, finding max/min'],
      ['11', 'Multi-dimensional arrays (matrices)'],
      ['12', 'Functions: definition, calling, parameter passing'],
      ['13', 'Value-returning vs. void functions · Scope'],
      ['14', 'Basic file operations · Semester review'],
      ['15', 'FINAL EXAM'],
    ];
    const mk = (arr) => arr.map(([w, t]) => {
      const exam = t.includes('EXAM'), now = w === '1';
      const fill = exam ? C.ink : (now ? 'FFF1D6' : (Number(w) % 2 ? C.paper : 'F6F8FB'));
      const col = exam ? C.paper : C.ink;
      return [
        { text: w, options: { bold: true, color: exam ? C.amber : C.ink, fill: { color: fill }, align: 'center' } },
        { text: t, options: { color: col, bold: exam || now, fill: { color: fill } } },
      ];
    });
    const opt = { fontFace: BF, fontSize: 14, rowH: 0.52, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle', margin: [0, 0.08, 0, 0.08] };
    s.addTable(mk(weeks.slice(0, 8)), { ...opt, x: 0.6, y: 1.75, w: 5.95, colW: [0.55, 5.4] });
    s.addTable(mk(weeks.slice(8)), { ...opt, x: 6.8, y: 1.75, w: 5.95, colW: [0.55, 5.4] });
    s.addText([{ text: 'Today', options: { bold: true, color: 'B7791F' } }, { text: '  is highlighted. Weeks 3 onward: every lecture comes with sample console-app code.', options: { color: C.slate } }],
      { x: 6.8, y: 5.6, w: 5.95, h: 0.6, fontFace: BF, fontSize: 13, margin: 0, isTextBox: true });
    s.addNotes('Weeks 1-2 are pen-and-paper: algorithms and flowcharts. From week 3 onward we write C# console applications every week. Week 14 includes basic file I/O (File.ReadAllLines / WriteAllText) as a bridge to real applications.');
    footer(s);
  }

  // =============== 5. ASSESSMENT & TOOLS ===============
  {
    const s = pres.addSlide();
    head(s, 'Assessment & tools', 'How You Are Graded · What You Need');
    card(s, 0.6, 1.8, 2.8, 2.6, C.ink);
    s.addText('40%', { x: 0.6, y: 2.0, w: 2.8, h: 1.2, fontFace: HF, fontSize: 60, bold: true, color: C.amber, align: 'center', margin: 0, isTextBox: true });
    s.addText('Midterm · Week 8', { x: 0.6, y: 3.3, w: 2.8, h: 0.5, fontFace: BF, fontSize: 16, color: C.paper, align: 'center', margin: 0, isTextBox: true });
    card(s, 3.65, 1.8, 2.8, 2.6, C.ink);
    s.addText('60%', { x: 3.65, y: 2.0, w: 2.8, h: 1.2, fontFace: HF, fontSize: 60, bold: true, color: C.amber, align: 'center', margin: 0, isTextBox: true });
    s.addText('Final · Week 15', { x: 3.65, y: 3.3, w: 2.8, h: 0.5, fontFace: BF, fontSize: 16, color: C.paper, align: 'center', margin: 0, isTextBox: true });
    s.addText([
      { text: 'Attendance follows university regulations.', options: { bullet: true, breakLine: true } },
      { text: 'Exams test reasoning: tracing, flowcharts and writing code by hand.', options: { bullet: true, breakLine: true } },
      { text: 'Weekly exercises are ungraded — but they are the exam preparation.', options: { bullet: true } },
    ], { x: 0.6, y: 4.7, w: 5.85, h: 1.8, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 8, valign: 'top' });
    // tools
    card(s, 6.9, 1.8, 5.85, 4.75);
    s.addText('Software (free) — install before Week 3', { x: 7.2, y: 2.0, w: 5.3, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const tools = [
      [I.laptop_ink, '.NET 10 SDK (LTS)', 'dotnet.microsoft.com/download'],
      [I.code_ink, 'Visual Studio Code', 'code.visualstudio.com'],
      [I.terminal_ink, 'C# Dev Kit extension', 'VS Code → Extensions → “C# Dev Kit”'],
    ];
    tools.forEach((t, i) => {
      const y = 2.6 + i * 0.95;
      s.addImage({ data: t[0], x: 7.25, y: y + 0.05, w: 0.5, h: 0.5 });
      s.addText(t[1], { x: 8.0, y, w: 4.5, h: 0.35, fontFace: BF, fontSize: 16, bold: true, color: C.ink, margin: 0, isTextBox: true });
      s.addText(t[2], { x: 8.0, y: y + 0.36, w: 4.5, h: 0.3, fontFace: MF, fontSize: 12, color: C.slate, margin: 0, isTextBox: true });
    });
    codeBlock(s, 7.2, 5.45, 5.3, 0.85, ['> dotnet --version', '10.0.xxx'], 13);
    s.addNotes('Grading: Midterm 40%, Final 60%. Tooling: .NET 10 is the current LTS (supported to Nov 2028); .NET 8 LTS support ends Nov 2026, so do not install 8. The C# Dev Kit extension replaces the older OmniSharp-only "C#" setup. Verification: `dotnet --version` should print 10.0.x. Lab PCs: check with IT that the SDK is installed before week 3.');
    footer(s);
  }

  // =============== PART 1 ===============
  section(1, 'How a Computer Solves Problems', 'Input → Process → Output, and why the computer needs exact instructions');

  // =============== 7. IPO MODEL ===============
  {
    const s = pres.addSlide();
    head(s, 'The big picture', 'Every Program: Input → Process → Output');
    const boxes = [
      [I.keyboard, 'INPUT', 'Data enters', 'keyboard, file, sensor, network'],
      [I.cpu, 'PROCESS', 'CPU follows the instructions', 'calculate, compare, decide, repeat'],
      [I.monitor, 'OUTPUT', 'Results leave', 'screen, file, printer, network'],
    ];
    boxes.forEach((b, i) => {
      const x = 0.6 + i * 4.25;
      card(s, x, 1.9, 3.6, 2.9, i === 1 ? C.ink : C.mist);
      circIcon(s, i === 1 ? I.cpu_ink : b[0], x + 1.35, 2.15, 0.9, i === 1 ? C.amber : C.ink);
      s.addText(b[1], { x, y: 3.2, w: 3.6, h: 0.45, fontFace: MF, fontSize: 20, bold: true, color: i === 1 ? C.amber : C.ink, align: 'center', margin: 0, isTextBox: true });
      s.addText(b[2], { x: x + 0.2, y: 3.7, w: 3.2, h: 0.4, fontFace: BF, fontSize: 16, bold: true, color: i === 1 ? C.paper : C.ink, align: 'center', margin: 0, isTextBox: true });
      s.addText(b[3], { x: x + 0.2, y: 4.1, w: 3.2, h: 0.5, fontFace: BF, fontSize: 13, color: i === 1 ? 'C7CEDC' : C.slate, align: 'center', margin: 0, isTextBox: true });
      if (i < 2) s.addImage({ data: I.arrow_amb, x: x + 3.73, y: 3.1, w: 0.45, h: 0.45 });
    });
    // memory strip
    card(s, 0.6, 5.1, 12.1, 1.3, 'FFF6E3');
    s.addImage({ data: I.memory_ink, x: 0.9, y: 5.4, w: 0.7, h: 0.7 });
    s.addText([
      { text: 'Memory (RAM) ', options: { bold: true, color: C.ink } },
      { text: 'holds both the data and the instructions while the program runs (von Neumann, 1945). Turn the power off and RAM is empty; files on disk remain.', options: { color: '333B4F' } },
    ], { x: 1.85, y: 5.2, w: 10.6, h: 1.1, fontFace: BF, fontSize: 15, valign: 'middle', margin: 0, isTextBox: true });
    s.addNotes('Keep hardware brief: this course is about the PROCESS box. Ask: what are input, process and output for a calculator? For an ATM? For Google Maps? The CPU can only do four families of operations: arithmetic, logic/comparison, data movement, and jumps (control). Everything else - including an entire video game - is built from those.');
    footer(s);
  }

  // =============== 8. CPU IS FAST BUT LITERAL ===============
  {
    const s = pres.addSlide();
    head(s, 'The key insight', 'A Computer Is Extremely Fast — and Completely Literal');
    const facts = [
      ['~10⁹', 'simple operations per second on a single core'],
      ['0', 'guesses about what you “meant”'],
      ['4', 'kinds of instruction: arithmetic, comparison, data movement, jump'],
    ];
    facts.forEach((f, i) => {
      const y = 1.9 + i * 1.5;
      s.addText(f[0], { x: 0.6, y, w: 2.6, h: 1.2, fontFace: HF, fontSize: 54, bold: true, color: C.amber, margin: 0, isTextBox: true, valign: 'middle' });
      s.addText(f[1], { x: 3.3, y, w: 3.6, h: 1.2, fontFace: BF, fontSize: 17, color: C.ink, margin: 0, isTextBox: true, valign: 'middle' });
    });
    card(s, 7.3, 1.9, 5.45, 4.4, C.ink);
    s.addImage({ data: I.lightbulb_amb, x: 7.65, y: 2.2, w: 0.6, h: 0.6 });
    s.addText('Therefore …', { x: 8.4, y: 2.2, w: 4, h: 0.6, fontFace: HF, fontSize: 22, bold: true, color: C.paper, valign: 'middle', margin: 0, isTextBox: true });
    s.addText([
      { text: 'The hard part of programming is not typing code.', options: { breakLine: true, bold: true, color: C.amber } },
      { text: ' ', options: { breakLine: true, fontSize: 8 } },
      { text: 'It is deciding the exact, unambiguous sequence of steps that solves the problem — the algorithm.', options: { color: C.paper, breakLine: true } },
      { text: ' ', options: { breakLine: true, fontSize: 8 } },
      { text: 'The language (C#) only writes those steps down in a form the machine can execute.', options: { color: 'C7CEDC' } },
    ], { x: 7.65, y: 3.0, w: 4.85, h: 3.1, fontFace: BF, fontSize: 17, valign: 'top', margin: 0, isTextBox: true });
    s.addNotes('~1e9 is an order-of-magnitude figure for a modern core (clock in GHz, often several instructions per cycle). The point: speed is never our problem in this course; precision is. Transition: let us see what happens when a human executes instructions literally.');
    footer(s);
  }

  // =============== NEW A. IDEA -> RUNNING PROGRAM ===============
  {
    const s = pres.addSlide();
    head(s, 'Languages & translation', 'From Idea to Running Program');
    const pipe = [
      ['Algorithm', 'steps in your head / on paper', true],
      ['C# source', 'Program.cs — text you type', true],
      ['Compiler', 'dotnet build checks & translates', false],
      ['IL (.dll)', 'portable intermediate code', false],
      ['Runtime (JIT)', '.NET turns IL into CPU code', false],
      ['Machine code', '0s and 1s the CPU executes', false],
    ];
    pipe.forEach((p, i) => {
      const x = 0.6 + i * 2.1;
      card(s, x, 1.85, 1.8, 1.55, p[2] ? C.ink : C.mist);
      s.addText(p[0], { x: x + 0.1, y: 1.95, w: 1.6, h: 0.55, fontFace: HF, fontSize: 15, bold: true, color: p[2] ? C.amber : C.ink, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
      s.addText(p[1], { x: x + 0.1, y: 2.5, w: 1.6, h: 0.8, fontFace: BF, fontSize: 11.5, color: p[2] ? 'C7CEDC' : C.slate, align: 'center', valign: 'top', margin: 0, isTextBox: true });
      if (i < 5) s.addImage({ data: I.arrow_amb, x: x + 1.84, y: 2.47, w: 0.22, h: 0.22 });
    });
    s.addText([{ text: 'YOU', options: { bold: true, color: 'B7791F' } }, { text: '  write the first two boxes  ·  ', options: { color: C.slate } }, { text: 'TOOLS', options: { bold: true, color: C.ink } }, { text: '  do the rest automatically when you type  dotnet run', options: { color: C.slate } }],
      { x: 0.6, y: 3.55, w: 12.1, h: 0.35, fontFace: BF, fontSize: 13, margin: 0, isTextBox: true });
    s.addText('Same task — “put 5 in a register, add 3” — at three levels', { x: 0.6, y: 4.15, w: 12, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const lv = [
      ['Machine code (x86, hex)', ['B8 05 00 00 00', '83 C0 03'], 'What the CPU really reads. Unreadable for humans.'],
      ['Assembly', ['mov eax, 5', 'add eax, 3'], 'One mnemonic per machine instruction. CPU-specific.'],
      ['High-level: C#', ['int sum = 5 + 3;'], 'Close to human thinking. Runs on any OS with .NET.'],
    ];
    lv.forEach((l, i) => {
      const x = 0.6 + i * 4.1;
      s.addText(l[0], { x, y: 4.6, w: 3.85, h: 0.3, fontFace: MF, fontSize: 12, bold: true, color: 'B7791F', margin: 0, isTextBox: true });
      codeBlock(s, x, 4.95, 3.85, 0.95, l[1], 14);
      s.addText(l[2], { x, y: 6.0, w: 3.85, h: 0.5, fontFace: BF, fontSize: 12.5, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
    });
    s.addNotes('B8 05 00 00 00 = mov eax, 5 ; 83 C0 03 = add eax, 3 (32-bit x86 encoding). C# is compiled by the Roslyn compiler into Intermediate Language (IL) stored in a .dll; at run time the CLR JIT-compiles IL to native code for the actual CPU (x64, ARM64 ...). This is why the same .dll runs on Windows, Linux and macOS. Languages are covered properly in week 3; today the only message is: the algorithm is the part the tools cannot do for you.');
    footer(s);
  }

  // =============== PART 2 ===============
  section(2, 'What Is an Algorithm?', 'A precise, finite recipe that turns input into the desired output');

  // =============== 10. VIDEO ===============
  {
    const s = pres.addSlide();
    head(s, 'Activity · 5 min', 'The Exact Instructions Challenge');
    s.addMedia({ type: 'video', path: 'exact_small.mp4', cover: b64('cover.png', 'image/png'), x: 0.6, y: 1.75, w: 7.6, h: 4.275 });
    card(s, 8.55, 1.75, 4.2, 4.275);
    s.addText('While you watch, note down:', { x: 8.85, y: 1.95, w: 3.7, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText([
      { text: 'Which instruction was ambiguous?', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Which step was missing?', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Which step was in the wrong order?', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Did the “algorithm” ever end?', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'How did the kids fix it?', options: { bullet: { type: 'number' } } },
    ], { x: 8.85, y: 2.5, w: 3.7, h: 3.3, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 10, valign: 'top' });
    s.addNotes('Click the video to play (embedded, ~5.5 min). Before playing, hand out the questions on the right. The father executes every instruction literally, exactly like a CPU. After the video, collect answers on the board and map them to the properties on the next slide: ambiguity -> definiteness; missing step -> correctness/completeness; never-ending -> finiteness; "get the bread" without saying which bag -> input specification. The kids\' rewrite loop (write - test - fail - fix) is exactly the debug cycle.');
    footer(s);
  }

  // =============== 11. DEFINITION ===============
  {
    const s = pres.addSlide();
    head(s, 'Definition', 'Algorithm');
    card(s, 0.6, 1.8, 7.3, 2.2, C.ink);
    s.addText([
      { text: 'An algorithm is a ', options: { color: C.paper } },
      { text: 'finite', options: { color: C.amber, bold: true } },
      { text: ' sequence of ', options: { color: C.paper } },
      { text: 'well-defined', options: { color: C.amber, bold: true } },
      { text: ' steps that transforms a given ', options: { color: C.paper } },
      { text: 'input', options: { color: C.amber, bold: true } },
      { text: ' into the desired ', options: { color: C.paper } },
      { text: 'output', options: { color: C.amber, bold: true } },
      { text: ' and then stops.', options: { color: C.paper } },
    ], { x: 0.95, y: 1.95, w: 6.7, h: 1.9, fontFace: HF, fontSize: 23, valign: 'middle', margin: 0, isTextBox: true });
    s.addText('Where does the word come from?', { x: 0.6, y: 4.35, w: 7.3, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText('Muhammad ibn Mūsā al-Khwārizmī (c. 780–850), a mathematician of the House of Wisdom in Baghdad, wrote the book that taught Europe the Hindu–Arabic decimal system. His name, Latinised as “Algoritmi”, became algorithm; the title of his other book (al-jabr) gave us algebra.',
      { x: 0.6, y: 4.8, w: 7.3, h: 1.6, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
    card(s, 8.3, 1.8, 4.45, 4.6);
    s.addText('Algorithm vs. Program', { x: 8.6, y: 2.0, w: 3.9, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const cmp = [
      ['Algorithm', 'the idea — language-independent; written in words, pseudocode or a flowchart'],
      ['Program', 'one implementation of the idea in a specific language (C#, Python …)'],
      ['1 → many', 'one algorithm can be coded in any language'],
    ];
    cmp.forEach((c, i) => {
      const y = 2.6 + i * 1.2;
      s.addText(c[0], { x: 8.6, y, w: 3.9, h: 0.35, fontFace: MF, fontSize: 15, bold: true, color: 'B7791F', margin: 0, isTextBox: true });
      s.addText(c[1], { x: 8.6, y: y + 0.36, w: 3.9, h: 0.75, fontFace: BF, fontSize: 14, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
    });
    s.addNotes('Stress the four highlighted words; the next slide formalises them. Etymology note is also a good cultural hook for our students. Algorithm vs program: a recipe vs. the actual cooked dish in a particular kitchen.');
    footer(s);
  }

  // =============== NEW B. ALGORITHMS EVERYWHERE ===============
  {
    const s = pres.addSlide();
    head(s, 'Motivation', 'Algorithms Are Already Running Your Day');
    const ex = [
      [I.map, 'Navigation', 'Shortest-path algorithms (Dijkstra, 1959) pick your route on Google Maps / Yandex.'],
      [I.search, 'Web search', 'Ranking algorithms order billions of pages in a fraction of a second.'],
      [I.bank, 'Banking & ATM', 'PIN check, balance rules, fraud detection — all precise decision steps.'],
      [I.zip, 'Compression', 'MP3, JPEG, ZIP: algorithms that shrink data you send and store.'],
      [I.wifi, 'Communication', 'Every Wi-Fi / 4G packet carries a checksum so errors are detected.'],
      [I.traffic, 'Control', 'Traffic lights, elevators, washing machines follow fixed algorithms.'],
    ];
    ex.forEach((e, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.6 + col * 4.1, y = 1.8 + row * 2.3;
      card(s, x, y, 3.85, 2.05, row === 0 && col === 0 ? C.mist : C.mist);
      circIcon(s, e[0], x + 0.3, y + 0.3, 0.7, C.ink);
      s.addText(e[1], { x: x + 1.2, y: y + 0.3, w: 2.5, h: 0.7, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
      s.addText(e[2], { x: x + 0.3, y: y + 1.12, w: 3.3, h: 0.8, fontFace: BF, fontSize: 13.5, color: '333B4F', valign: 'top', margin: 0, isTextBox: true });
    });
    s.addText('Question for you: name one algorithm you personally executed this morning.', { x: 0.6, y: 6.5, w: 12.1, h: 0.4, fontFace: BF, fontSize: 14, italic: true, color: C.slate, margin: 0, isTextBox: true });
    s.addNotes('Connect to the students\' programme where possible: ECT / electronics students meet checksums, CRC and modulation daily; the "Communication" card is their field. Typical student answers to the question: route to school, making breakfast, unlocking the phone (pattern/PIN check), choosing clothes from the weather forecast (selection!).');
    footer(s);
  }

  // =============== 12. PROPERTIES ===============
  {
    const s = pres.addSlide();
    head(s, 'Five properties (Knuth)', 'What Makes a Set of Steps an Algorithm?');
    const props = [
      [I.flag, 'Finiteness', 'It must stop after a finite number of steps.', '“Keep stirring” → stir until when?'],
      [I.check, 'Definiteness', 'Every step is precise and unambiguous.', '“Add some sugar” → how much?'],
      [I.keyboard, 'Input', 'Zero or more clearly specified inputs.', 'Which bread? Which knife?'],
      [I.monitor, 'Output', 'At least one result that relates to the input.', 'A sandwich, not an empty plate.'],
      [I.cpu, 'Effectiveness', 'Every step is basic enough to actually be carried out.', '“Make it tasty” is not a step.'],
    ];
    props.forEach((p, i) => {
      const y = 1.75 + i * 0.97;
      card(s, 0.6, y, 12.15, 0.82, i % 2 ? C.paper : C.mist);
      circIcon(s, p[0], 0.8, y + 0.1, 0.62, C.ink);
      s.addText(p[1], { x: 1.65, y, w: 2.4, h: 0.82, fontFace: HF, fontSize: 19, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
      s.addText(p[2], { x: 4.1, y, w: 4.9, h: 0.82, fontFace: BF, fontSize: 15, color: '333B4F', valign: 'middle', margin: 0, isTextBox: true });
      s.addText(p[3], { x: 9.1, y, w: 3.5, h: 0.82, fontFace: BF, fontSize: 14, italic: true, color: C.red, valign: 'middle', margin: 0, isTextBox: true });
    });
    s.addNotes('Source: D. E. Knuth, The Art of Computer Programming, Vol. 1, Sec. 1.1. The red column shows counter-examples in kitchen language, linking back to the video. Add a sixth, practical property for our purposes: CORRECTNESS - it must produce the right output for EVERY valid input, including edge cases.');
    footer(s);
  }

  // =============== NEW E1. QUIZ: ALGORITHM OR NOT? ===============
  {
    const s = pres.addSlide();
    head(s, 'Quick quiz · 3 min', 'Algorithm or Not?');
    const q = [
      ['1', 'Shampoo bottle: “Lather. Rinse. Repeat.”'],
      ['2', 'The long-division method you learned in primary school.'],
      ['3', 'Print the largest prime number.'],
      ['4', 'Recipe: “Add salt to taste.”'],
      ['5', 'Find a word in a paper dictionary: open near its first letter, then move forward or back.'],
      ['6', 'Choose the best football team in the world.'],
    ];
    q.forEach((e, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.6 + col * 6.15, y = 1.8 + row * 1.45;
      card(s, x, y, 5.9, 1.25);
      circIcon(s, I.question, x + 0.25, y + 0.3, 0.65, C.amber);
      s.addText(e[0] + '.  ' + e[1], { x: x + 1.1, y, w: 4.6, h: 1.25, fontFace: BF, fontSize: 15.5, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    });
    s.addText('For each: yes or no? If no — which of the five properties fails?', { x: 0.6, y: 6.25, w: 12.1, h: 0.4, fontFace: BF, fontSize: 14, italic: true, color: C.slate, margin: 0, isTextBox: true });
    s.addNotes('Let students vote by raising hands for each item; ask one "no" voter to name the failing property. Answers on the next slide.');
    footer(s);
  }
  // =============== NEW E2. QUIZ ANSWERS ===============
  {
    const s = pres.addSlide();
    head(s, 'Quick quiz · answers', 'Algorithm or Not? — Answers');
    const a = [
      ['1', 'Lather. Rinse. Repeat.', false, 'Never stops — fails finiteness.'],
      ['2', 'Long division', true, 'Finite, precise, effective. A classic algorithm.'],
      ['3', 'Largest prime', false, 'There is no largest prime (Euclid): it never finishes, no output.'],
      ['4', 'Salt to taste', false, '“To taste” is not precise — fails definiteness.'],
      ['5', 'Dictionary look-up', true, 'Ends in finitely many steps: the book is finite and ordered.'],
      ['6', 'Best football team', false, 'No agreed criterion — not definite, not effective.'],
    ];
    a.forEach((e, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.6 + col * 6.15, y = 1.8 + row * 1.45;
      card(s, x, y, 5.9, 1.25, e[2] ? 'E6F4EC' : 'FBE9E7');
      circIcon(s, e[2] ? I.check : I.times, x + 0.25, y + 0.3, 0.65, e[2] ? C.green : C.red);
      s.addText(e[0] + '.  ' + e[1], { x: x + 1.1, y: y + 0.15, w: 4.6, h: 0.45, fontFace: HF, fontSize: 16, bold: true, color: e[2] ? '1F7A50' : C.red, valign: 'middle', margin: 0, isTextBox: true });
      s.addText(e[3], { x: x + 1.1, y: y + 0.6, w: 4.6, h: 0.55, fontFace: BF, fontSize: 13.5, color: '333B4F', valign: 'top', margin: 0, isTextBox: true });
    });
    s.addText('Bonus: item 5 is the idea behind binary search — you will program it in Week 10.', { x: 0.6, y: 6.25, w: 12.1, h: 0.4, fontFace: BF, fontSize: 14, italic: true, color: C.slate, margin: 0, isTextBox: true });
    s.addNotes('Item 3: Euclid proved there are infinitely many primes, so "find the largest" has no finite answer. Item 1 is the most famous non-terminating loop joke among programmers; in C# it is exactly `while (true) { ... }` without a break. Item 5 can be discussed further: the dictionary method is a human version of binary / interpolation search.');
    footer(s);
  }

  // =============== 13. TEA EXAMPLE ===============
  {
    const s = pres.addSlide();
    head(s, 'Everyday algorithm', 'Brewing Turkish Tea — Precisely');
    const steps = [
      ['1', 'Fill the kettle (bottom pot) with 1 L of water.', 'seq'],
      ['2', 'Put 4 teaspoons of black tea in the teapot (top pot).', 'seq'],
      ['3', 'Place the teapot on the kettle and turn the stove on.', 'seq'],
      ['4', 'WHILE the water is not boiling: wait 1 minute.', 'rep'],
      ['5', 'Pour boiling water into the teapot until it is ¾ full.', 'seq'],
      ['6', 'Lower the heat and wait 15 minutes.', 'seq'],
      ['7', 'IF the guest wants it strong: fill the glass ⅔ with tea,', 'sel'],
      ['', '     ELSE: fill the glass ⅓ with tea.', 'sel'],
      ['8', 'Top up the glass with hot water. STOP.', 'seq'],
    ];
    const colr = { seq: C.ink, rep: C.green, sel: C.blue };
    s.addText(steps.map((st, i) => ({ text: (st[0] ? st[0] + '. ' : '    ') + st[1], options: { color: colr[st[2]], bold: st[2] !== 'seq', breakLine: i < steps.length - 1 } })),
      { x: 0.6, y: 1.8, w: 8.1, h: 4.6, fontFace: BF, fontSize: 17, valign: 'top', margin: 0, isTextBox: true, paraSpaceAfter: 7 });
    card(s, 9.1, 1.8, 3.65, 4.6);
    s.addImage({ data: I.mug_ink, x: 9.4, y: 2.05, w: 0.55, h: 0.55 });
    s.addText('Colour key', { x: 10.1, y: 2.05, w: 2.5, h: 0.55, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    [['Sequence', C.ink, 'do steps in order'], ['Selection', C.blue, 'choose a path (IF)'], ['Repetition', C.green, 'repeat (WHILE)']].forEach((k, i) => {
      const y = 2.9 + i * 1.1;
      s.addShape(pres.shapes.OVAL, { x: 9.4, y: y + 0.08, w: 0.3, h: 0.3, fill: { color: k[1] }, line: { color: k[1] } });
      s.addText(k[0], { x: 9.9, y, w: 2.7, h: 0.45, fontFace: BF, fontSize: 16, bold: true, color: k[1], margin: 0, isTextBox: true, valign: 'middle' });
      s.addText(k[2], { x: 9.9, y: y + 0.42, w: 2.7, h: 0.4, fontFace: BF, fontSize: 13, color: C.slate, margin: 0, isTextBox: true });
    });
    s.addNotes('Compare with a vague version: "boil water, add tea, serve". Ask students to find what the vague version leaves undefined (amounts, end condition, strength choice). Then point out the three colours: every algorithm ever written is built from these three structures - next slide.');
    footer(s);
  }

  // =============== 14. THREE STRUCTURES ===============
  {
    const s = pres.addSlide();
    head(s, 'Building blocks', 'Three Structures Are Enough');
    const cols = [
      [I.list, 'Sequence', 'Steps executed one after another, top to bottom.', ['read a', 'read b', 'sum ← a + b', 'print sum'], 'Weeks 3–4', C.ink],
      [I.branch, 'Selection', 'Choose between paths depending on a condition.', ['if age ≥ 18', '   print "adult"', 'else', '   print "minor"'], 'Week 5', C.blue],
      [I.sync, 'Repetition', 'Repeat a block while a condition holds.', ['i ← 1', 'while i ≤ 10', '   print i', '   i ← i + 1'], 'Weeks 6–7', C.green],
    ];
    cols.forEach((c, i) => {
      const x = 0.6 + i * 4.1;
      card(s, x, 1.75, 3.85, 4.75);
      circIcon(s, c[0], x + 0.3, 2.0, 0.7, c[5]);
      s.addText(c[1], { x: x + 1.15, y: 2.0, w: 2.5, h: 0.7, fontFace: HF, fontSize: 21, bold: true, color: c[5], valign: 'middle', margin: 0, isTextBox: true });
      s.addText(c[2], { x: x + 0.3, y: 2.9, w: 3.3, h: 0.75, fontFace: BF, fontSize: 14, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
      codeBlock(s, x + 0.3, 3.75, 3.25, 1.75, c[3], 13);
      s.addText('C# in ' + c[4], { x: x + 0.3, y: 5.7, w: 3.3, h: 0.35, fontFace: MF, fontSize: 12, color: C.slate, margin: 0, isTextBox: true });
    });
    s.addNotes('Structured program theorem (Böhm & Jacopini, 1966): any computable procedure can be expressed with sequence, selection and iteration only. This is why the syllabus is ordered the way it is. The arrow "←" means assignment in pseudocode ("store the value on the right into the name on the left").');
    footer(s);
  }

  // =============== NEW C. FOUR REPRESENTATIONS ===============
  {
    const s = pres.addSlide();
    head(s, 'Representation', 'Four Ways to Write the Same Algorithm');
    s.addText('Task: read a number and print its absolute value.', { x: 0.6, y: 1.5, w: 12, h: 0.35, fontFace: BF, fontSize: 15, italic: true, color: C.slate, margin: 0, isTextBox: true });
    const X = [0.6, 3.68, 6.76, 9.84], Wc = 2.9, y0 = 1.95, hC = 4.6;
    const titles = ['Natural language', 'Pseudocode', 'Flowchart', 'C# code'];
    const pros = ['Easy for anyone — but often ambiguous.', 'Precise and tool-free. Our main tool on paper.', 'Visual; shows branches clearly. Week 2.', 'Executable — but strict syntax. Week 3+.'];
    titles.forEach((t, i) => {
      card(s, X[i], y0, Wc, hC);
      s.addText(t, { x: X[i] + 0.2, y: y0 + 0.15, w: Wc - 0.4, h: 0.4, fontFace: HF, fontSize: 16, bold: true, color: C.ink, margin: 0, isTextBox: true });
      s.addText(pros[i], { x: X[i] + 0.2, y: y0 + hC - 0.85, w: Wc - 0.4, h: 0.7, fontFace: BF, fontSize: 12.5, italic: true, color: C.slate, margin: 0, isTextBox: true, valign: 'top' });
    });
    s.addText('Read the number. If it is negative, remove its minus sign. Show the number.', { x: X[0] + 0.2, y: y0 + 0.7, w: Wc - 0.4, h: 2.6, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
    codeBlock(s, X[1] + 0.15, y0 + 0.7, Wc - 0.3, 2.6, ['START', 'READ x', 'IF x < 0 THEN', '   x ← −x', 'END IF', 'PRINT x', 'END'], 13);
    codeBlock(s, X[3] + 0.15, y0 + 0.7, Wc - 0.3, 2.6, ['string s =', '  Console.ReadLine();', 'int x = int.Parse(s);', 'if (x < 0)', '    x = -x;', 'Console.WriteLine(x);'], 12);
    // mini flowchart
    const cx = X[2] + 1.0, fs = 10, ln = { color: C.ink, width: 1 };
    const tx = (t, x, y, w, h) => s.addText(t, { x, y, w, h, fontFace: BF, fontSize: fs, color: C.ink, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
    const shp = (type, x, y, w, h, fill) => s.addShape(type, { x, y, w, h, fill: { color: fill || C.paper }, line: ln });
    shp(pres.shapes.OVAL, cx - 0.5, 2.65, 1.0, 0.32, 'FFF1D6'); tx('Start', cx - 0.5, 2.65, 1.0, 0.32);
    shp(pres.shapes.PARALLELOGRAM, cx - 0.6, 3.15, 1.2, 0.34); tx('Read x', cx - 0.6, 3.15, 1.2, 0.34);
    shp(pres.shapes.DIAMOND, cx - 0.6, 3.67, 1.2, 0.62, 'E3ECF8'); tx('x < 0 ?', cx - 0.6, 3.67, 1.2, 0.62);
    shp(pres.shapes.RECTANGLE, cx + 0.8, 3.81, 0.85, 0.34); tx('x ← −x', cx + 0.8, 3.81, 0.85, 0.34);
    shp(pres.shapes.PARALLELOGRAM, cx - 0.6, 4.5, 1.2, 0.34); tx('Print x', cx - 0.6, 4.5, 1.2, 0.34);
    shp(pres.shapes.OVAL, cx - 0.5, 5.02, 1.0, 0.32, 'FFF1D6'); tx('End', cx - 0.5, 5.02, 1.0, 0.32);
    const L = (x, y, w, h, arrow = true, flipH = false) => s.addShape(pres.shapes.LINE, { x, y, w, h, flipH, line: { color: C.ink, width: 1, endArrowType: arrow ? 'triangle' : undefined } });
    L(cx, 2.97, 0, 0.18); L(cx, 3.49, 0, 0.18); L(cx, 4.29, 0, 0.21); L(cx, 4.84, 0, 0.18);
    L(cx + 0.6, 3.98, 0.2, 0);                         // diamond -> rect (yes)
    L(cx + 1.225, 4.15, 0, 0.52, false);              // rect down
    L(cx + 0.6, 4.67, 0.625, 0, true, true);          // back left into Print
    s.addText('yes', { x: cx + 0.55, y: 3.66, w: 0.35, h: 0.2, fontFace: BF, fontSize: 9, color: C.green, margin: 0, isTextBox: true });
    s.addText('no', { x: cx + 0.06, y: 4.28, w: 0.3, h: 0.2, fontFace: BF, fontSize: 9, color: C.red, margin: 0, isTextBox: true });
    s.addNotes('All four describe exactly one algorithm. Pseudocode and flowcharts are the two formal "paper" notations of this course; exams may ask you to convert between any two of them. The flowchart symbols (oval = start/end, parallelogram = input/output, rectangle = process, diamond = decision) are the topic of week 2.');
    footer(s);
  }
  // =============== NEW D. PSEUDOCODE CONVENTIONS ===============
  {
    const s = pres.addSlide();
    head(s, 'Reference card · keep this', 'Pseudocode Conventions for MCMP113');
    const h = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: C.ink } } });
    const rows = [
      ['START … END', 'beginning and end of the algorithm', 'START … END'],
      ['READ x', 'input: get a value from the user', 'READ age'],
      ['PRINT …', 'output: show a value or a message', 'PRINT "Total:", sum'],
      ['x ← expression', 'assignment: evaluate right side, store in x', 'total ← total + price'],
      ['IF … ELSE … END IF', 'selection (THEN after the condition)', 'IF age ≥ 18 THEN …'],
      ['WHILE cond … END WHILE', 'repeat while the condition is true', 'WHILE i ≤ N'],
      ['FOR i ← a TO b … END FOR', 'repeat a counted number of times', 'FOR i ← 1 TO 10'],
      ['+  −  ×  /  mod', 'arithmetic; mod = remainder', '17 mod 5 = 2'],
      ['=  ≠  <  ≤  >  ≥', 'comparison (true / false)', 'IF x ≠ 0 THEN …'],
      ['AND  OR  NOT', 'combine conditions', 'IF a > 0 AND b > 0'],
    ];
    const t = [[h('Keyword'), h('Meaning'), h('Example')]];
    rows.forEach((r, k) => t.push([
      { text: r[0], options: { fontFace: MF, bold: true, color: C.ink, fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: r[1], options: { color: '333B4F', fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: r[2], options: { fontFace: MF, color: C.blue, fill: { color: k % 2 ? C.paper : C.mist } } },
    ]));
    s.addTable(t, { x: 0.6, y: 1.7, w: 8.6, colW: [2.75, 3.25, 2.6], rowH: 0.4, fontFace: BF, fontSize: 12.5, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle', margin: [0, 0.08, 0, 0.08] });
    card(s, 9.5, 1.7, 3.25, 4.4, C.ink);
    s.addImage({ data: I.warn_amb, x: 9.8, y: 1.95, w: 0.5, h: 0.5 });
    s.addText('The #1 beginner trap', { x: 10.4, y: 1.95, w: 2.25, h: 0.5, fontFace: HF, fontSize: 15, bold: true, color: C.paper, valign: 'middle', margin: 0, isTextBox: true });
    s.addText([
      { text: 'In pseudocode:', options: { color: 'C7CEDC', breakLine: true } },
      { text: '←  assigns', options: { fontFace: MF, color: C.amber, bold: true, breakLine: true } },
      { text: '=  compares', options: { fontFace: MF, color: C.amber, bold: true, breakLine: true } },
      { text: ' ', options: { breakLine: true, fontSize: 6 } },
      { text: 'In C#:', options: { color: 'C7CEDC', breakLine: true } },
      { text: '=   assigns', options: { fontFace: MF, color: '7EE2A8', bold: true, breakLine: true } },
      { text: '==  compares', options: { fontFace: MF, color: '7EE2A8', bold: true, breakLine: true } },
      { text: ' ', options: { breakLine: true, fontSize: 6 } },
      { text: 'x ← x + 1 is not an equation: it means “new x = old x + 1”.', options: { color: C.paper } },
    ], { x: 9.8, y: 2.6, w: 2.75, h: 3.4, fontFace: BF, fontSize: 14, margin: 0, isTextBox: true, valign: 'top', paraSpaceAfter: 3 });
    s.addNotes('These are the conventions used in all slides, homework and exams. Many textbooks use "=" or ":=" for assignment; we use the arrow to avoid confusion with mathematical equality. In mathematics x = x + 1 has no solution; in programming x ← x + 1 is the most common statement there is.');
    footer(s);
  }

  // =============== PART 3 ===============
  section(3, 'Problem-Solving Steps', 'From a vague request to a tested solution');

  // =============== 16. FIVE STEPS ===============
  {
    const s = pres.addSlide();
    head(s, 'The method', 'Five Steps of Problem Solving');
    const st = [
      [I.search, 'Understand', 'What is given? What is asked? Constraints?'],
      [I.pencil, 'Design', 'Write the algorithm: steps, pseudocode, flowchart.'],
      [I.code, 'Implement', 'Translate the algorithm into C#.'],
      [I.bug, 'Test & Debug', 'Run with normal, edge and wrong inputs.'],
      [I.book, 'Document', 'Comments, clear names, notes for others.'],
    ];
    st.forEach((p, i) => {
      const x = 0.6 + i * 2.5;
      s.addShape(pres.shapes.OVAL, { x: x + 0.55, y: 1.9, w: 1.2, h: 1.2, fill: { color: i === 1 ? C.amber : C.ink }, line: { color: i === 1 ? C.amber : C.ink } });
      s.addImage({ data: i === 1 ? I.pencil_ink : p[0], x: x + 0.87, y: 2.22, w: 0.56, h: 0.56 });
      if (i < 4) s.addImage({ data: I.arrow_ink, x: x + 2.0, y: 2.33, w: 0.35, h: 0.35 });
      s.addText(`${i + 1}. ${p[1]}`, { x, y: 3.3, w: 2.3, h: 0.45, fontFace: HF, fontSize: 17, bold: true, color: C.ink, align: 'center', margin: 0, isTextBox: true });
      s.addText(p[2], { x: x + 0.05, y: 3.8, w: 2.2, h: 1.0, fontFace: BF, fontSize: 13.5, color: '333B4F', align: 'center', margin: 0, isTextBox: true, valign: 'top' });
    });
    card(s, 0.6, 5.1, 12.15, 1.3, 'FFF6E3');
    s.addImage({ data: I.sync_ink, x: 0.9, y: 5.45, w: 0.6, h: 0.6 });
    s.addText([
      { text: 'It is a cycle, not a line. ', options: { bold: true, color: C.ink } },
      { text: 'A failed test sends you back to Design — or even to Understand. Beginners spend most of their time in Step 3; professionals spend most of it in Steps 1–2, which is why their Step 4 is short.', options: { color: '333B4F' } },
    ], { x: 1.8, y: 5.2, w: 10.7, h: 1.1, fontFace: BF, fontSize: 15, valign: 'middle', margin: 0, isTextBox: true });
    s.addNotes('Inspired by Pólya, How to Solve It (1945): understand, plan, carry out, look back. The highlighted step (Design) is what weeks 1-2 train. Rule of thumb for students: no coding before you can explain the algorithm in your own words.');
    footer(s);
  }

  // =============== 17. STEP 1: ANALYSIS (IPO) ===============
  {
    const s = pres.addSlide();
    head(s, 'Worked example 1 · Step 1: Understand', 'Average of Three Exam Grades');
    card(s, 0.6, 1.75, 12.15, 0.85, C.ink);
    s.addText([{ text: 'Problem: ', options: { bold: true, color: C.amber } }, { text: 'A student enters three exam grades (0–100). Show the average and whether the student passed (average ≥ 50).', options: { color: C.paper } }],
      { x: 0.9, y: 1.75, w: 11.6, h: 0.85, fontFace: BF, fontSize: 17, valign: 'middle', margin: 0, isTextBox: true });
    const hdr = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: '3A4A6B' }, align: 'center' } });
    const rows = [
      [hdr('INPUT'), hdr('PROCESS'), hdr('OUTPUT')],
      [{ text: 'g1, g2, g3\n(numbers, 0–100)' }, { text: 'avg ← (g1 + g2 + g3) / 3\ncompare avg with 50' }, { text: 'avg\n“PASSED” or “FAILED”' }],
    ];
    s.addTable(rows, { x: 0.6, y: 2.85, w: 12.15, colW: [4.05, 4.05, 4.05], rowH: [0.5, 1.2], fontFace: BF, fontSize: 16, color: C.ink, valign: 'middle', align: 'center', border: { type: 'solid', pt: 0.75, color: C.line }, fill: { color: C.mist } });
    s.addText('Questions to ask before designing (the “edge cases”):', { x: 0.6, y: 4.8, w: 12, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const qs = ['Can a grade be 72.5, or only whole numbers?', 'What if the user types 120 or −5?', 'Is exactly 50 a pass?', 'Should all exams have equal weight?'];
    qs.forEach((q, i) => {
      const x = 0.6 + (i % 2) * 6.1, y = 5.3 + Math.floor(i / 2) * 0.55;
      s.addImage({ data: I.warn_amb, x, y: y + 0.05, w: 0.3, h: 0.3 });
      s.addText(q, { x: x + 0.45, y, w: 5.5, h: 0.4, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, valign: 'middle' });
    });
    s.addNotes('The IPO table is the first deliverable of the analysis step. The edge-case questions are the part students skip; each one changes the algorithm (e.g. 72.5 means we need a decimal type - week 3 - and range checks need selection - week 5). Real-world note: the actual Okan grading uses weighted averages (midterm 40 / final 60), which is a nice follow-up variant.');
    footer(s);
  }

  // =============== 18. STEP 2: DESIGN (pseudocode) ===============
  {
    const s = pres.addSlide();
    head(s, 'Worked example 1 · Step 2: Design', 'From Plain Steps to Pseudocode');
    s.addText('Plain-language steps', { x: 0.6, y: 1.75, w: 5.8, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText([
      { text: 'Start.', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Read the first, second and third grades.', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Add the three grades and divide by 3.', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Show the average.', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'If the average is at least 50, show “PASSED”; otherwise show “FAILED”.', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'Stop.', options: { bullet: { type: 'number' } } },
    ], { x: 0.6, y: 2.25, w: 5.8, h: 4.0, fontFace: BF, fontSize: 16, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 9, valign: 'top' });
    s.addText('Pseudocode', { x: 6.9, y: 1.75, w: 5.8, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    codeBlock(s, 6.9, 2.25, 5.85, 3.55, [
      'START',
      '  READ g1, g2, g3',
      '  avg ← (g1 + g2 + g3) / 3',
      '  PRINT avg',
      '  IF avg ≥ 50 THEN',
      '     PRINT "PASSED"',
      '  ELSE',
      '     PRINT "FAILED"',
      '  END IF',
      'END',
    ], 15);
    s.addText('Pseudocode = structured English. No semicolons, no compiler — but precise enough to translate line-by-line into C#.', { x: 6.9, y: 5.95, w: 5.85, h: 0.6, fontFace: BF, fontSize: 13, italic: true, color: C.slate, margin: 0, isTextBox: true });
    s.addNotes('Common bug to anticipate: writing g1 + g2 + g3 / 3 without parentheses. Operator precedence (week 4) makes that g1 + g2 + (g3/3). Ask the class to compute it for 60, 70, 80: correct average 70, buggy version 156.67. Next week we draw the same algorithm as a flowchart.');
    footer(s);
  }

  // =============== NEW G. CHOOSING TEST CASES ===============
  {
    const s = pres.addSlide();
    head(s, 'Worked example 1 · Step 4: Test', 'Choosing Good Test Cases');
    const h = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: C.ink } } });
    const rows = [
      ['Normal', '60, 70, 80', '70.00 · PASSED', C.green],
      ['Boundary', '50, 50, 50', '50.00 · PASSED', C.green],
      ['Just below', '49, 50, 50', '49.67 · FAILED', C.green],
      ['Maximum', '100, 100, 100', '100.00 · PASSED', C.green],
      ['Minimum', '0, 0, 0', '0.00 · FAILED', C.green],
      ['Out of range', '120, 70, 80', 'should be rejected — our algorithm prints 90.00!', C.red],
      ['Wrong type', 'abc, 70, 80', 'C# program crashes (FormatException)', C.red],
    ];
    const t = [[h('Kind of test'), h('g1, g2, g3'), h('Expected result')]];
    rows.forEach((r, k) => t.push([
      { text: r[0], options: { bold: true, color: C.ink, fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: r[1], options: { fontFace: MF, color: C.ink, fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: r[2], options: { color: r[3], bold: r[3] === C.red, fill: { color: k % 2 ? C.paper : C.mist } } },
    ]));
    s.addTable(t, { x: 0.6, y: 1.75, w: 8.3, colW: [1.9, 2.1, 4.3], rowH: 0.52, fontFace: BF, fontSize: 14, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle', margin: [0, 0.1, 0, 0.1] });
    card(s, 9.2, 1.75, 3.55, 4.2, C.ink);
    s.addImage({ data: I.vial_amb, x: 9.5, y: 2.0, w: 0.55, h: 0.55 });
    s.addText('“Program testing can be used to show the presence of bugs, but never to show their absence.”', { x: 9.5, y: 2.75, w: 3.0, h: 1.9, fontFace: HF, fontSize: 16, italic: true, color: C.paper, margin: 0, isTextBox: true, valign: 'top' });
    s.addText('— Edsger W. Dijkstra', { x: 9.5, y: 4.75, w: 3.0, h: 0.35, fontFace: BF, fontSize: 13, color: C.amber, margin: 0, isTextBox: true });
    s.addText('So choose tests that are most likely to break the algorithm.', { x: 9.5, y: 5.15, w: 3.0, h: 0.7, fontFace: BF, fontSize: 12.5, color: 'C7CEDC', margin: 0, isTextBox: true, valign: 'top' });
    s.addNotes('Boundary tests (exactly 50, 0, 100) catch the most bugs, e.g. writing avg > 50 instead of avg >= 50. The two red rows expose missing requirements: our algorithm has no range check. Fixing it needs selection (week 5) and input validation with int.TryParse / double.TryParse (week 5 as well). 149/3 = 49.666... displays as 49.67 with two decimals.');
    footer(s);
  }

  // =============== 19. STEP 4: TRACE TABLE ===============
  {
    const s = pres.addSlide();
    head(s, 'Worked example 2 · Desk-checking', 'Sum of 1 … N — with a Trace Table');
    codeBlock(s, 0.6, 1.8, 5.2, 3.2, [
      'START',
      '  READ N',
      '  sum ← 0',
      '  i ← 1',
      '  WHILE i ≤ N',
      '     sum ← sum + i',
      '     i ← i + 1',
      '  END WHILE',
      '  PRINT sum',
      'END',
    ], 15);
    const h = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: C.ink }, align: 'center' } });
    const tr = [[h('step'), h('i'), h('i ≤ N ?'), h('sum')]];
    const data = [['start', '1', '—', '0'], ['1', '1', 'yes', '1'], ['2', '2', 'yes', '3'], ['3', '3', 'yes', '6'], ['4', '4', 'yes', '10'], ['5', '5', 'yes', '15'], ['exit', '6', 'no', '15']];
    data.forEach((r, k) => tr.push(r.map((c, j) => ({ text: c, options: { align: 'center', color: (k === 6 && j === 2) ? C.red : C.ink, bold: k === 6, fill: { color: k % 2 ? C.mist : C.paper } } }))));
    s.addText('Trace for N = 5', { x: 6.3, y: 1.8, w: 6, h: 0.35, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addTable(tr, { x: 6.3, y: 2.2, w: 6.45, colW: [1.5, 1.5, 1.95, 1.5], rowH: 0.38, fontFace: MF, fontSize: 14, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle' });
    card(s, 0.6, 5.55, 12.15, 1.1, 'FFF6E3');
    s.addImage({ data: I.balance_ink, x: 0.85, y: 5.8, w: 0.6, h: 0.6 });
    s.addText([
      { text: 'Same problem, different algorithm: ', options: { bold: true, color: C.ink } },
      { text: 'Gauss’s formula  sum = N × (N + 1) / 2  gives 15 in one step. The loop needs N steps; for N = 1 000 000 000 that is a real difference. Choosing the better algorithm is a design decision, not a coding one.', options: { color: '333B4F' } },
    ], { x: 1.7, y: 5.58, w: 10.9, h: 1.05, fontFace: BF, fontSize: 14.5, valign: 'middle', margin: 0, isTextBox: true });
    s.addNotes('Trace (desk-check) table: one column per variable, one row per loop pass. Students will use this in the exams. Checks: termination (i eventually exceeds N), edge cases: N = 0 -> loop body never runs, sum = 0 (correct); N negative -> also 0 (is that what we want?). The Gauss formula is a first taste of algorithm efficiency: O(N) vs O(1). Formally: sum_{i=1}^{N} i = N(N+1)/2.');
    footer(s);
  }

  // =============== NEW H. EFFICIENCY: GUESS THE NUMBER ===============
  {
    const s = pres.addSlide();
    head(s, 'Efficiency', 'Guess My Number (1 … 1000): Two Algorithms');
    card(s, 0.6, 1.75, 5.95, 2.35);
    s.addText('A · Try every number', { x: 0.9, y: 1.9, w: 5.4, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText('1, 2, 3, 4, …', { x: 0.9, y: 2.3, w: 3, h: 0.35, fontFace: MF, fontSize: 14, color: C.slate, margin: 0, isTextBox: true });
    s.addText('1000', { x: 0.9, y: 2.75, w: 2.6, h: 1.0, fontFace: HF, fontSize: 54, bold: true, color: C.red, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText('guesses in the worst case', { x: 3.5, y: 2.75, w: 2.9, h: 1.0, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, valign: 'middle' });
    card(s, 6.8, 1.75, 5.95, 2.35, C.ink);
    s.addText('B · Always guess the middle', { x: 7.1, y: 1.9, w: 5.4, h: 0.4, fontFace: HF, fontSize: 17, bold: true, color: C.paper, margin: 0, isTextBox: true });
    s.addText('“higher” / “lower” halves the range', { x: 7.1, y: 2.3, w: 5.4, h: 0.35, fontFace: MF, fontSize: 14, color: 'C7CEDC', margin: 0, isTextBox: true });
    s.addText('10', { x: 7.1, y: 2.75, w: 2.6, h: 1.0, fontFace: HF, fontSize: 54, bold: true, color: C.amber, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText('guesses at most, because 2¹⁰ = 1024 ≥ 1000', { x: 9.7, y: 2.75, w: 2.9, h: 1.0, fontFace: BF, fontSize: 15, color: C.paper, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText('Strategy B, secret number = 737', { x: 0.6, y: 4.35, w: 8, h: 0.35, fontFace: HF, fontSize: 16, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const g = [[500, '↑'], [750, '↓'], [625, '↑'], [687, '↑'], [718, '↑'], [734, '↑'], [742, '↓'], [738, '↓'], [736, '↑'], [737, '✓']];
    g.forEach((v, i) => {
      const x = 0.6 + i * 1.22, last = i === 9;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.8, w: 1.08, h: 0.75, fill: { color: last ? C.green : C.mist }, line: { color: last ? C.green : C.line }, rectRadius: 0.08 });
      s.addText([{ text: String(v[0]), options: { bold: true, breakLine: true, fontSize: 15 } }, { text: v[1], options: { fontSize: 12 } }], { x, y: 4.8, w: 1.08, h: 0.75, fontFace: MF, color: last ? C.paper : C.ink, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
    });
    const h = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: C.ink }, align: 'center' } });
    const c = (t, col) => ({ text: t, options: { align: 'center', color: col || C.ink } });
    s.addTable([[h('range size'), h('100'), h('1 000'), h('1 000 000'), h('1 000 000 000')],
      [c('A (worst)'), c('100', C.red), c('1 000', C.red), c('1 000 000', C.red), c('1 000 000 000', C.red)],
      [c('B (worst)'), c('7', C.green), c('10', C.green), c('20', C.green), c('30', C.green)]],
      { x: 0.6, y: 5.8, w: 12.15, colW: [2.15, 2.5, 2.5, 2.5, 2.5], rowH: 0.3, fontFace: BF, fontSize: 12.5, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle', margin: 0 });
    s.addNotes('Play it live first: think of a number 1..1000 and let the class guess with strategy of their choice, then demonstrate strategy B. Worst-case guesses for B are ceil(log2(N + 1)): 7, 10, 20, 30. Algorithm A is linear, O(N); B is logarithmic, O(log N). This is binary search, implemented on arrays in week 10. The in-class exercise E is exactly this game.');
    footer(s);
  }

  // =============== 20. EUCLID ===============
  {
    const s = pres.addSlide();
    head(s, 'A 2300-year-old algorithm', 'Euclid’s Greatest Common Divisor');
    s.addText('Written down around 300 BC in Euclid’s Elements — still used today inside every secure (HTTPS/RSA) connection.', { x: 0.6, y: 1.6, w: 12.1, h: 0.5, fontFace: BF, fontSize: 15, italic: true, color: C.slate, margin: 0, isTextBox: true });
    codeBlock(s, 0.6, 2.3, 5.6, 3.0, [
      'START',
      '  READ a, b',
      '  WHILE b ≠ 0',
      '     r ← a mod b',
      '     a ← b',
      '     b ← r',
      '  END WHILE',
      '  PRINT a',
      'END',
    ], 15);
    s.addText('mod = remainder of division  (17 mod 5 = 2)', { x: 0.6, y: 5.45, w: 5.6, h: 0.35, fontFace: MF, fontSize: 12, color: C.slate, margin: 0, isTextBox: true });
    const h = (t) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: C.ink }, align: 'center' } });
    const rows = [[h('a'), h('b'), h('r = a mod b')], ['48', '18', '12'], ['18', '12', '6'], ['12', '6', '0'], ['6', '0', 'stop → GCD = 6']]
      .map((r, k) => k === 0 ? r : r.map((c) => ({ text: c, options: { align: 'center', color: k === 4 ? C.green : C.ink, bold: k === 4, fill: { color: k % 2 ? C.mist : C.paper } } })));
    s.addText('Trace: GCD(48, 18)', { x: 6.7, y: 2.3, w: 6, h: 0.35, fontFace: HF, fontSize: 17, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addTable(rows, { x: 6.7, y: 2.75, w: 6.05, colW: [1.5, 1.5, 3.05], rowH: 0.45, fontFace: MF, fontSize: 15, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle' });
    s.addText('Check all five properties: Is it finite? (b strictly decreases.) Definite? Input? Output? Effective?', { x: 6.7, y: 5.2, w: 6.05, h: 0.8, fontFace: BF, fontSize: 14, color: '333B4F', margin: 0, isTextBox: true, valign: 'top' });
    s.addNotes('Finiteness argument: 0 <= r < b, so b strictly decreases and must reach 0. Ask: what if the user enters b > a, e.g. (18, 48)? First pass: r = 18, a = 48, b = 18 - it swaps itself. What about a = 0 or negative numbers? Good discussion of input specification. Speculative aside for curious students: this exact loop will be about 8 lines of C# in week 7.');
    footer(s);
  }

  // =============== NEW T. TC KIMLIK CHECK DIGITS ===============
  {
    const s = pres.addSlide();
    head(s, 'A real algorithm in your wallet', 'T.C. Kimlik No: the Check-Digit Algorithm');
    card(s, 0.6, 1.75, 6.2, 3.1);
    s.addImage({ data: I.idcard_ink, x: 0.9, y: 1.95, w: 0.55, h: 0.55 });
    s.addText('The rules', { x: 1.6, y: 1.95, w: 4, h: 0.55, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    s.addText([
      { text: '11 digits  d1 d2 … d11,  and  d1 ≠ 0', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'd10 = ( 7 × (d1+d3+d5+d7+d9) − (d2+d4+d6+d8) ) mod 10', options: { bullet: { type: 'number' }, breakLine: true } },
      { text: 'd11 = ( d1 + d2 + … + d10 ) mod 10', options: { bullet: { type: 'number' } } },
    ], { x: 0.9, y: 2.7, w: 5.75, h: 2.0, fontFace: MF, fontSize: 13.5, color: C.ink, margin: 0, isTextBox: true, paraSpaceAfter: 12, valign: 'top' });
    card(s, 7.1, 1.75, 5.65, 3.1, C.ink);
    s.addText('Why does it exist?', { x: 7.4, y: 1.95, w: 5, h: 0.45, fontFace: HF, fontSize: 18, bold: true, color: C.paper, margin: 0, isTextBox: true });
    s.addText([
      { text: 'Any single mistyped digit is detected instantly — without asking a database.', options: { bullet: true, breakLine: true } },
      { text: 'Same idea: IBAN (mod 97), EAN-13 barcodes, credit cards (Luhn).', options: { bullet: true } },
    ], { x: 7.4, y: 2.5, w: 5.1, h: 2.2, fontFace: BF, fontSize: 15, color: C.paper, margin: 0, isTextBox: true, paraSpaceAfter: 10, valign: 'top' });
    s.addText('Trace with the made-up first nine digits 1 2 3 4 5 6 7 8 9', { x: 0.6, y: 5.05, w: 12, h: 0.35, fontFace: HF, fontSize: 16, bold: true, color: C.ink, margin: 0, isTextBox: true });
    const dg = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '5', '0'];
    dg.forEach((d, i) => {
      const x = 0.6 + i * 0.52, chk = i >= 9;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 5.5, w: 0.44, h: 0.6, fill: { color: chk ? C.amber : C.mist }, line: { color: chk ? C.amber : C.line }, rectRadius: 0.06 });
      s.addText(d, { x, y: 5.5, w: 0.44, h: 0.6, fontFace: MF, fontSize: 18, bold: true, color: C.ink, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
    });
    s.addText([
      { text: 'odd  positions: 1+3+5+7+9 = 25', options: { breakLine: true } },
      { text: 'even positions: 2+4+6+8   = 20', options: { breakLine: true } },
      { text: 'd10 = (7×25 − 20) mod 10 = 155 mod 10 = 5', options: { breakLine: true } },
      { text: 'd11 = (45 + 5) mod 10 = 0', options: {} },
    ], { x: 6.6, y: 5.3, w: 6.15, h: 1.15, fontFace: MF, fontSize: 13, color: '333B4F', margin: 0, isTextBox: true, valign: 'middle' });
    s.addNotes('12345678950 is a synthetic number that merely passes the check; it is not a real person\'s ID. Why a single wrong digit is always caught: changing one digit among d1..d10 changes their sum by a non-zero amount between -9 and +9, so the sum mod 10 no longer equals d11. Week 4 teaser: 7*odd - even can be negative (e.g. odd = 1, even = 36), and in C# the % operator then returns a negative remainder, so the C# version needs ((x % 10) + 10) % 10. Good bonus homework: trace the algorithm on your own ID number privately (do not share it).');
    footer(s);
  }

  // =============== 21. PITFALLS ===============
  {
    const s = pres.addSlide();
    head(s, 'Common mistakes', 'Bad Algorithm → Good Algorithm');
    const pf = [
      ['Ambiguous step', 'Divide the numbers.', 'avg ← (g1 + g2 + g3) / 3'],
      ['No termination', 'Keep asking for a password.', 'Ask at most 3 times, then lock.'],
      ['Missing edge case', 'result ← a / b', 'IF b = 0 THEN print "error" ELSE result ← a / b'],
      ['Wrong order', 'PRINT sum, then sum ← a + b', 'sum ← a + b, then PRINT sum'],
      ['Undefined input', 'Read the grade.', 'Read a grade between 0 and 100; reject others.'],
    ];
    const h = (t, c) => ({ text: t, options: { bold: true, color: C.paper, fill: { color: c } } });
    const rows = [[h('Problem', C.ink), h('Bad', C.red), h('Good', C.green)]];
    pf.forEach((p, k) => rows.push([
      { text: p[0], options: { bold: true, color: C.ink, fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: p[1], options: { fontFace: MF, color: C.red, fill: { color: k % 2 ? C.paper : C.mist } } },
      { text: p[2], options: { fontFace: MF, color: '1F7A50', fill: { color: k % 2 ? C.paper : C.mist } } },
    ]));
    s.addTable(rows, { x: 0.6, y: 1.8, w: 12.15, colW: [2.6, 4.0, 5.55], rowH: [0.5, 0.78, 0.78, 0.78, 0.78, 0.78], fontFace: BF, fontSize: 14.5, border: { type: 'solid', pt: 0.5, color: C.line }, valign: 'middle', margin: [0, 0.12, 0, 0.12] });
    s.addNotes('Each row corresponds to a violated property: definiteness, finiteness, correctness (edge case), sequence, input specification. Division by zero is the classic crash - in C#, integer division by zero throws DivideByZeroException, while double division gives Infinity or NaN (week 4 teaser).');
    footer(s);
  }

  // =============== 22. PREVIEW C# ===============
  {
    const s = pres.addSlide();
    head(s, 'Sneak peek · Week 3', 'The Same Algorithm, Written in C#');
    codeBlock(s, 0.6, 1.8, 7.6, 4.65, [
      'Console.Write("Grade 1: ");',
      'double g1 = double.Parse(Console.ReadLine());',
      'Console.Write("Grade 2: ");',
      'double g2 = double.Parse(Console.ReadLine());',
      'Console.Write("Grade 3: ");',
      'double g3 = double.Parse(Console.ReadLine());',
      '',
      'double avg = (g1 + g2 + g3) / 3;',
      'Console.WriteLine($"Average: {avg:F2}");',
      '',
      'if (avg >= 50)',
      '    Console.WriteLine("PASSED");',
      'else',
      '    Console.WriteLine("FAILED");',
    ], 13.5);
    card(s, 8.55, 1.8, 4.2, 4.65);
    s.addText('Notice', { x: 8.85, y: 2.0, w: 3.6, h: 0.4, fontFace: HF, fontSize: 18, bold: true, color: C.ink, margin: 0, isTextBox: true });
    s.addText([
      { text: 'Every pseudocode line maps to one or two C# lines.', options: { bullet: true, breakLine: true } },
      { text: 'READ → Console.ReadLine()', options: { bullet: true, breakLine: true } },
      { text: 'PRINT → Console.WriteLine()', options: { bullet: true, breakLine: true } },
      { text: 'IF … ELSE → if (…) … else …', options: { bullet: true, breakLine: true } },
      { text: 'You do not need to understand the syntax yet — only that the algorithm came first.', options: { bullet: true } },
    ], { x: 8.85, y: 2.5, w: 3.7, h: 3.8, fontFace: BF, fontSize: 14, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 8, valign: 'top' });
    s.addNotes('Uses C# top-level statements (no class Program / static void Main boilerplate) which is the default `dotnet new console` template since .NET 6. With .NET 10 a single file can even be run directly: `dotnet run average.cs` (file-based apps), handy for quick lab exercises. Culture note for later: on Turkish-locale PCs double.Parse expects a comma decimal separator (72,5); address this in week 3.');
    footer(s);
  }

  // =============== 23. IN-CLASS EXERCISES ===============
  {
    const s = pres.addSlide();
    head(s, 'In-class · groups of 2–3 · 25 min', 'Your Turn: Write the Algorithm');
    const ex = [
      ['A', 'Even or odd', 'Read an integer; print whether it is even or odd.', 'selection'],
      ['B', 'Leap year', 'Read a year; leap if divisible by 4 and not by 100 — or divisible by 400.', 'selection'],
      ['C', 'ATM withdrawal', 'Balance and amount given; allow only if enough money and a multiple of 10.', 'selection'],
      ['D', 'Countdown', 'Read N; print N, N−1, …, 1, then “Go!”.', 'repetition'],
      ['E', 'Guess the number', 'The user guesses a secret number; say “higher/lower” until correct.', 'repetition'],
      ['F', 'Temperature', 'Convert Celsius to Fahrenheit:  F = C × 9 / 5 + 32.', 'sequence'],
    ];
    ex.forEach((e, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.6 + col * 4.1, y = 1.8 + row * 2.35;
      card(s, x, y, 3.85, 2.1);
      s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fill: { color: C.ink }, line: { color: C.ink } });
      s.addText(e[0], { x: x + 0.25, y: y + 0.25, w: 0.55, h: 0.55, fontFace: MF, fontSize: 18, bold: true, color: C.amber, align: 'center', valign: 'middle', margin: 0, isTextBox: true });
      s.addText(e[1], { x: x + 0.95, y: y + 0.25, w: 2.75, h: 0.55, fontFace: HF, fontSize: 17, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
      s.addText(e[2], { x: x + 0.25, y: y + 0.95, w: 3.4, h: 0.8, fontFace: BF, fontSize: 13.5, color: '333B4F', valign: 'top', margin: 0, isTextBox: true });
      s.addText(e[3], { x: x + 0.25, y: y + 1.7, w: 3.4, h: 0.3, fontFace: MF, fontSize: 11, color: { sequence: C.ink, selection: C.blue, repetition: C.green }[e[3]], margin: 0, isTextBox: true });
    });
    s.addText('For each: IPO table → numbered steps → pseudocode → trace with two test inputs (one normal, one edge case).', { x: 0.6, y: 6.55, w: 12.1, h: 0.35, fontFace: BF, fontSize: 13, italic: true, color: C.slate, margin: 0, isTextBox: true });
    s.addNotes('Assign two exercises per group (e.g. A+D, B+E, C+F) so every structure is covered. Swap papers between groups and have the other group "execute literally" like the father in the video - they must find one ambiguity. Hint for A: "even" means n mod 2 = 0. B test cases: 2024 (leap), 1900 (not), 2000 (leap). Hint for E: needs both repetition and selection.');
    footer(s);
  }

  // =============== 24. HOMEWORK ===============
  {
    const s = pres.addSlide();
    head(s, 'Homework · due before Week 2', 'Practice + Setup');
    card(s, 0.6, 1.8, 6.0, 4.65);
    circIcon(s, I.pencil, 0.9, 2.05, 0.65, C.ink);
    s.addText('1 · Algorithms (on paper)', { x: 1.75, y: 2.05, w: 4.7, h: 0.65, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    s.addText([
      { text: 'Finish the two in-class exercises your group did not do.', options: { bullet: true, breakLine: true } },
      { text: 'Write an algorithm for a daily task of your choice with at least one IF and one WHILE.', options: { bullet: true, breakLine: true } },
      { text: 'Trace Euclid’s GCD for (84, 36) in a table.', options: { bullet: true, breakLine: true } },
      { text: 'Post a photo of your pages to the Telegram group.', options: { bullet: true } },
    ], { x: 0.9, y: 2.95, w: 5.5, h: 3.3, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 9, valign: 'top' });
    card(s, 6.85, 1.8, 5.9, 4.65);
    circIcon(s, I.laptop, 7.15, 2.05, 0.65, C.ink);
    s.addText('2 · Install the tools', { x: 8.0, y: 2.05, w: 4.6, h: 0.65, fontFace: HF, fontSize: 18, bold: true, color: C.ink, valign: 'middle', margin: 0, isTextBox: true });
    s.addText([
      { text: 'Install .NET 10 SDK and VS Code + C# Dev Kit.', options: { bullet: true, breakLine: true } },
      { text: 'Open a terminal and run the three commands below.', options: { bullet: true, breakLine: true } },
      { text: 'Screenshot the output → Telegram.', options: { bullet: true } },
    ], { x: 7.15, y: 2.95, w: 5.4, h: 1.5, fontFace: BF, fontSize: 15, color: '333B4F', margin: 0, isTextBox: true, paraSpaceAfter: 9, valign: 'top' });
    codeBlock(s, 7.15, 4.45, 5.3, 1.75, ['> dotnet --version', '> dotnet new console -n Hello', '> cd Hello', '> dotnet run'], 13.5);
    s.addNotes('Answer key for GCD(84, 36): 84 mod 36 = 12; 36 mod 12 = 0 -> GCD = 12. Setup problems are best solved in week 2 office hours rather than in week 3 lab time.');
    footer(s);
  }

  // =============== 25. SUMMARY + NEXT ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.ink };
    s.addText('>_ SUMMARY', { x: 0.6, y: 0.5, w: 6, h: 0.4, fontFace: MF, fontSize: 14, bold: true, color: C.amber, margin: 0, isTextBox: true });
    s.addText('Key Takeaways', { x: 0.6, y: 0.95, w: 8, h: 0.8, fontFace: HF, fontSize: 36, bold: true, color: C.paper, margin: 0, isTextBox: true });
    const kt = [
      'An algorithm is a finite, precise recipe from input to output.',
      'Five properties: finiteness, definiteness, input, output, effectiveness.',
      'Everything is built from sequence, selection and repetition.',
      'Solve in five steps: understand → design → implement → test → document.',
      'Design first, code second. Trace tables catch errors before the computer does.',
    ];
    kt.forEach((t, i) => {
      const y = 2.0 + i * 0.78;
      s.addText(String(i + 1).padStart(2, '0'), { x: 0.6, y, w: 0.8, h: 0.6, fontFace: MF, fontSize: 20, bold: true, color: C.amber, margin: 0, isTextBox: true, valign: 'middle' });
      s.addText(t, { x: 1.45, y, w: 7.2, h: 0.6, fontFace: BF, fontSize: 16, color: C.paper, margin: 0, isTextBox: true, valign: 'middle' });
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.2, y: 0.9, w: 3.55, h: 5.6, fill: { color: '1E2E52' }, line: { color: '1E2E52' }, rectRadius: 0.12 });
    s.addText('NEXT WEEK', { x: 9.45, y: 1.1, w: 3.1, h: 0.35, fontFace: MF, fontSize: 13, bold: true, color: C.amber, margin: 0, isTextBox: true });
    s.addText('Flowcharts & their symbols', { x: 9.45, y: 1.5, w: 3.1, h: 0.9, fontFace: HF, fontSize: 19, bold: true, color: C.paper, margin: 0, isTextBox: true, valign: 'top' });
    s.addImage({ path: 'qr.png', x: 9.75, y: 2.6, w: 2.5, h: 2.5 });
    s.addText([
      { text: '', options: { breakLine: true } },
      { text: '' },
    ], { x: 9.45, y: 5.3, w: 3.1, h: 0.8, fontFace: BF, fontSize: 13, color: 'C7CEDC', align: 'center', margin: 0, isTextBox: true });
    s.addNotes('Close by asking each student to write one sentence: "An algorithm is ..." on a sticky note or in the Telegram group (quick exit ticket). Next week the same examples (average, sum 1..N, GCD) become flowcharts, so keep today\'s pages.');
    footer(s, true);
  }

  await pres.writeFile({ fileName: 'MCMP113_Week01_Algorithms_ProblemSolving.pptx' });
  console.log('done', n);
})();
