// MCMP113 · Week 3 — Programming Languages · Variables · Data Types · Constants
// Generator for MCMP113_Week03_Variables_DataTypes.pptx (uses the shared slide library).
// Code shown on slides is read from ../code/<project>/Program.cs so that slides and tested code never diverge.
const fs = require('fs');
const path = require('path');
const { createDeck } = require('/home/claude/mcmp/lib/deck.js');

const CODE = path.join(__dirname, 'code');
// Full body of a Program.cs without its two header-comment lines
const body = (proj) => fs.readFileSync(path.join(CODE, proj, 'Program.cs'), 'utf8').replace(/\r/g, '')
  .split('\n').slice(2).join('\n').replace(/^\n+/, '').replace(/\n+$/, '');
// Lines a..b (1-based, inclusive) of a Program.cs
const lines = (proj, a, b) => fs.readFileSync(path.join(CODE, proj, 'Program.cs'), 'utf8').replace(/\r/g, '')
  .split('\n').slice(a - 1, b).join('\n');

(async () => {
  const D = await createDeck({
    week: 3,
    title: 'Programming Languages, Variables, Data Types and Constants',
    subtitle: 'From algorithm to a running C# program: storing, typing, reading and printing data',
  });
  const { C, T, I } = D;
  const X0 = 0.6, CW = 12.15;

  // ------------------------------------------------------------------ 1 Title
  D.titleSlide(['> dotnet --version', '10.0.112', '> cd Hello', '> dotnet run', 'Hello, World!', '', '> int age = 19;', '> _'],
    'WELCOME (2 min). Week 3 is the first week in which students write real C#. Ask who managed to install the .NET 10 SDK and VS Code (homework from Week 1). '
    + 'If some did not, pair them with a neighbour for today and fix installations in office hours. '
    + 'Plan for the session: Part 1 (languages & tools, ~25 min), Part 2 (output, names, variables, ~30 min), Part 3 (data types & constants, ~35 min), Part 4 (input & conversion, ~35 min), quizzes and exercises (~25 min).');

  // ------------------------------------------------------------------ 2 Objectives
  let s = D.slide('learning objectives', 'By the End of This Week You Can …',
    'OBJECTIVES (2 min). Read them aloud; tell students that every objective maps to one of the example programs in the code folder (03_01 … 03_13). '
    + 'Emphasise objective 4: choosing the right data type is a design decision, not a detail. Objective 6 (Parse) is the source of most beginner crashes.');
  const objs = [
    [I.layer, 'Explain', 'machine, assembly and high-level languages; how C# is compiled to IL and JIT-compiled by .NET.'],
    [I.terminal, 'Create & run', 'a console project with dotnet new / dotnet run and understand Program.cs and the .csproj file.'],
    [I.monitor, 'Print', 'text with Write / WriteLine, escape sequences, interpolation $"…" and format specifiers.'],
    [I.box, 'Declare', 'variables with legal, meaningful names; initialise and assign them; trace their values.'],
    [I.boxes, 'Choose', 'the right type: int, long, double, decimal, char, string, bool …; use const for fixed values.'],
    [I.exchange, 'Convert', 'input text with int.Parse / double.Parse, use casts, and recognise overflow and truncation.'],
  ];
  objs.forEach(([ic, t, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = X0 + col * 4.1, y = 1.75 + row * 2.45;
    D.iconCard(s, x, y, 3.95, 2.3, ic, t, b, { fs: 14 });
  });

  // ------------------------------------------------------------------ 3 Recap
  s = D.slide('recap · week 2 → week 3', 'From Flowchart to Code: Every Box Becomes a Statement',
    'BRIDGE (3 min). This is the Celsius-to-Fahrenheit flowchart from Week 2 (and exercise F of Week 1). Walk through the mapping: '
    + 'terminal → start/end of the program, parallelogram (input) → Console.ReadLine + Parse, rectangle (process) → assignment, parallelogram (output) → Console.WriteLine. '
    + 'Ask: "Where does the variable celsius come from?" (it is created on line 2). Today we learn every piece of this program in detail; example 03_05 is the tested version.');
  const f1 = D.fcNode(s, 'term', 2.4, 2.05, 1.7, 0.5, 'Start');
  const f2 = D.fcNode(s, 'io', 2.4, 2.95, 2.6, 0.6, 'Read C');
  const f3 = D.fcNode(s, 'proc', 2.4, 3.95, 2.9, 0.65, 'F ← C × 9 / 5 + 32');
  const f4 = D.fcNode(s, 'io', 2.4, 4.95, 2.6, 0.6, 'Print F');
  const f5 = D.fcNode(s, 'term', 2.4, 5.85, 1.7, 0.5, 'End');
  D.seg(s, ...f1.bottom, ...f2.top); D.seg(s, ...f2.bottom, ...f3.top); D.seg(s, ...f3.bottom, ...f4.top); D.seg(s, ...f4.bottom, ...f5.top);
  // mapping arrows
  [[f2.cy, 3.02], [f3.cy, 3.74], [f4.cy, 4.46]].forEach(([y1, y2]) => D.seg(s, 4.15, y1, 5.0, y2, true, C.amber));
  D.code(s, 5.1, 1.8, 7.65, 3.4,
    '// Program.cs\nConsole.Write("Temperature in °C: ");\ndouble celsius = double.Parse(Console.ReadLine());\n\n'
    + 'double fahrenheit = celsius * 9 / 5 + 32;\n\nConsole.WriteLine($"{celsius} °C = {fahrenheit:F1} °F");', { fs: 14, title: 'C# (example 03_05, shortened)' });
  D.callout(s, 5.1, 5.4, 7.65, 1.1, I.lightbulb_ink,
    [{ text: 'Today\'s questions: ', options: { bold: true } }, { text: 'What is double? Why Parse? What does = do? What does :F1 mean? By the end of the lesson you can answer all four.' }], { fs: 14 });

  // ================================================================== PART 1
  s = D.section(1, 'Programming Languages and .NET', 'From machine code to C#: how your program is translated and run');
  s.addNotes('PART 1 (about 25 min). Goal: students understand what happens between typing Program.cs and seeing output, so compiler errors and "dotnet run" make sense.');

  // ------------------------------------------------------------------ 5 Language levels
  s = D.slide('three levels of language', 'Machine Code, Assembly and High-Level Languages',
    'LEVELS (4 min). All three boxes do the same job: put the number 7 into a storage place. '
    + 'Machine code: the x86 instruction B8 07 00 00 00 (hex) = 10111000 00000111 00000000 00000000 00000000 (binary) loads 7 into register EAX. '
    + 'Assembly writes the same instruction with a mnemonic (mov) and is translated by an ASSEMBLER. '
    + 'High-level languages (C#, Python, Java, C) are portable and readable; a COMPILER or INTERPRETER translates them. '
    + 'Likely question: "Does anyone still write assembly?" Yes: device drivers, embedded systems, performance-critical parts, reverse engineering; relevant for our ECT students working with microcontrollers.');
  const lv = [
    ['MACHINE CODE', '1st generation', '10111000 00000111\n00000000 00000000\n00000000', 'Binary instructions the CPU executes directly. Depends on the CPU type (x86, ARM …).', C.slate],
    ['ASSEMBLY', '2nd generation', 'mov eax, 7', 'Short names (mnemonics) for machine instructions; an assembler translates them.', C.blue],
    ['HIGH-LEVEL (C#)', '3rd generation +', 'int x = 7;', 'Close to human language and maths; runs on many CPUs; a compiler translates it.', C.green],
  ];
  lv.forEach(([h, g, codeTxt, desc, col], i) => {
    const x = X0 + i * 4.1;
    D.card(s, x, 1.75, 3.95, 3.6);
    T(s, h, { x: x + 0.25, y: 1.9, w: 3.5, h: 0.4, fontFace: D.MF, fontSize: 16, bold: true, color: col });
    T(s, g, { x: x + 0.25, y: 2.3, w: 3.5, h: 0.3, fontSize: 13, color: C.slate, italic: true });
    D.code(s, x + 0.25, 2.75, 3.45, 1.35, codeTxt, { fs: 14, lang: i === 2 ? 'cs' : 'plain' });
    T(s, desc, { x: x + 0.25, y: 4.3, w: 3.45, h: 1.4, fontSize: 14, valign: 'top' });
  });
  D.seg(s, 1.0, 5.8, 12.3, 5.8, true, C.amber);
  T(s, 'closer to the hardware', { x: X0, y: 5.9, w: 4, h: 0.3, fontSize: 13, color: C.slate });
  T(s, 'closer to people', { x: 8.75, y: 5.9, w: 4, h: 0.3, fontSize: 13, color: C.slate, align: 'right' });

  // ------------------------------------------------------------------ 6 Translation approaches
  s = D.slide('translation', 'Compiled, Interpreted or Just-in-Time?',
    'TRANSLATION (4 min). A COMPILER translates the whole program before it runs; an INTERPRETER translates and executes while running. '
    + 'Real systems mix both: CPython first compiles to bytecode and then interprets it; modern JavaScript engines use JIT compilers. '
    + 'C# and Java use the middle road: compile once to an intermediate language (C#: IL / CIL; Java: bytecode), then a JIT compiler in the runtime turns it into machine code while the program runs. '
    + 'Question to ask: "Why not always compile to machine code?" Answer: one .dll can run on Windows, Linux and macOS, x64 or ARM, because the JIT on each machine does the last step.');
  D.table(s, [
    ['Approach', 'When is the code translated?', 'Examples', 'Good', 'Less good'],
    [{ text: 'Compiled (ahead of time)', options: { bold: true } }, 'Before running: the whole program → machine code (.exe)', 'C, C++, Go, Rust', 'Very fast start and run', 'Rebuild for every OS / CPU'],
    [{ text: 'Interpreted', options: { bold: true } }, 'While running: statement by statement', 'Python, shell scripts, classic BASIC', 'Try code instantly', 'Usually slower'],
    [{ text: 'IL + JIT', options: { bold: true, color: C.green } }, 'Build: C# → IL (.dll). Run: JIT turns IL → machine code', 'C#, VB.NET (.NET); Java (JVM)', 'Portable and fast after start-up', 'Needs the runtime installed'],
  ], X0, 1.8, CW, [2.5, 3.6, 2.35, 1.85, 1.85], { fs: 14, rowH: 0.75 });
  D.callout(s, X0, 5.35, CW, 1.1, I.cpu_ink,
    [{ text: 'C# belongs to the third row. ', options: { bold: true } }, { text: 'You compile once (dotnet build); the .NET runtime on each computer finishes the translation at run time (JIT = Just-In-Time).' }], { fs: 15 });

  // ------------------------------------------------------------------ 7 C# pipeline + SDK vs runtime
  s = D.slide('how c# runs', 'From Program.cs to the CPU — and SDK vs Runtime',
    'PIPELINE (4 min). Trace the arrows: the C# compiler (called Roslyn) checks your code — all the CSxxxx errors you will meet come from this step — and writes IL into Hello.dll. '
    + 'When you run, the CLR (Common Language Runtime) loads the dll and its JIT compiler turns IL into native code for your CPU (x64 or ARM64). '
    + 'SDK vs runtime: the SDK (Software Development Kit) contains the runtime PLUS the compiler, the dotnet command and templates. Developers install the SDK; someone who only runs your app needs only the runtime. '
    + 'We use .NET 10 (LTS, released November 2025), C# 14.');
  const pip = [
    ['Program.cs', 'C# source code', C.paper, 'proc'],
    ['C# compiler', 'dotnet build', C.softBlue, 'pre'],
    ['Hello.dll', 'IL (intermediate language)', C.paper, 'proc'],
    ['CLR + JIT', 'dotnet run', C.softGreen, 'pre'],
    ['Machine code', 'runs on the CPU', C.softAmber, 'proc'],
  ];
  pip.forEach(([t1, t2, fill, type], i) => {
    const cx = 1.75 + i * 2.5;
    D.fcNode(s, type, cx, 2.45, 2.1, 0.95, '', { fill });
    T(s, [{ text: t1, options: { bold: true, fontFace: D.MF, breakLine: true } }, { text: t2, options: { fontSize: 12, color: C.slate } }],
      { x: cx - 1.0, y: 2.0, w: 2.0, h: 0.9, fontSize: 14, color: C.ink, align: 'center', valign: 'middle' });
    if (i < pip.length - 1) D.seg(s, cx + 1.05, 2.45, cx + 1.45, 2.45, true, C.ink);
  });
  T(s, 'compile time: errors like CS0165 appear here', { x: 1.9, y: 3.05, w: 4.5, h: 0.3, fontSize: 13, color: C.red, italic: true });
  T(s, 'run time: crashes like FormatException appear here', { x: 7.2, y: 3.05, w: 5.5, h: 0.3, fontSize: 13, color: C.red, italic: true });
  D.iconCard(s, X0, 3.65, 5.95, 2.85, I.wrench, '.NET SDK — for developers',
    'Compiler + dotnet command-line tool + project templates + the runtime.\nInstall this one on your computer (.NET 10 SDK).', { fs: 15 });
  D.iconCard(s, 6.8, 3.65, 5.95, 2.85, I.play, '.NET Runtime — for users',
    'Only what is needed to RUN a finished app: the CLR (with the JIT) and the base class library (Console, Math …).', { fs: 15, iconFill: C.green });

  // ------------------------------------------------------------------ 8 First project
  s = D.slide('your first project', 'Create and Run a Console Project',
    'DEMO (5 min). Do this live in VS Code\'s terminal (Terminal ▸ New Terminal). Real output of these commands with the .NET 10 SDK is shown; the version number on students\' machines may be a different 10.0.x — that is fine. '
    + 'dotnet new console creates the folder, Program.cs and Hello.csproj and restores the project. dotnet run = build + run. '
    + 'In VS Code with the C# Dev Kit: open the FOLDER (not just the file), then Run ▸ Run Without Debugging (Ctrl+F5). '
    + 'Common problem: running dotnet run in the wrong folder → "Couldn\'t find a project to run". Solution: cd into the project folder first.');
  D.consoleOut(s, X0, 1.75, 7.1, 4.75,
    '> [[dotnet --version]]\n10.0.112\n> [[dotnet new console -n Hello]]\nThe template "Console App" was created successfully.\n\nProcessing post-creation actions...\nRestoring ...\\Hello\\Hello.csproj:\nRestore succeeded.\n\n> [[cd Hello]]\n> [[dotnet run]]\nHello, World!',
    { fs: 13, title: 'Terminal (VS Code)' });
  const steps = [
    [I.laptop, 'Open the folder', 'File ▸ Open Folder… ▸ Hello'],
    [I.fileCode, 'Edit Program.cs', 'Your statements go here'],
    [I.play, 'Run', 'Ctrl+F5, or type dotnet run'],
  ];
  steps.forEach(([ic, h, b], i) => {
    const y = 1.75 + i * 1.62;
    D.card(s, 7.95, y, 4.8, 1.45);
    D.circIcon(s, ic, 8.15, y + 0.3, 0.8, i === 2 ? C.green : C.ink);
    T(s, h, { x: 9.15, y: y + 0.2, w: 3.5, h: 0.45, fontFace: D.HF, fontSize: 17, bold: true, color: C.ink });
    T(s, b, { x: 9.15, y: y + 0.68, w: 3.5, h: 0.55, fontSize: 14 });
  });

  // ------------------------------------------------------------------ 9 Project files
  s = D.slide('project files', 'Inside the Project: Program.cs and the .csproj File',
    'PROJECT FILES (4 min). Program.cs holds our code. The .csproj file (XML) tells the SDK how to build. bin/ and obj/ are generated by the build; never edit them, and you can delete them safely. '
    + 'Our course template changes two things compared with dotnet new console: (1) Nullable = disable, because with nullable checks ON the line int.Parse(Console.ReadLine()) gives warning CS8604 and string name = Console.ReadLine(); gives CS8600 — correct but confusing in week 3; '
    + '(2) InvariantGlobalization = true, so that the decimal POINT works (72.5) also on Turkish Windows. How to get it: run dotnet new console -n Name, then edit these two lines (or copy our template file from the course Telegram group).');
  D.code(s, X0, 1.75, 7.2, 3.35,
    '<Project Sdk="Microsoft.NET.Sdk">\n  <PropertyGroup>\n    <OutputType>Exe</OutputType>\n    <TargetFramework>net10.0</TargetFramework>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>disable</Nullable>\n    <InvariantGlobalization>true</InvariantGlobalization>\n  </PropertyGroup>\n</Project>',
    { fs: 13, lang: 'xml', title: 'Hello.csproj (our course template)' });
  D.table(s, [
    ['Setting', 'Meaning'],
    ['Exe', 'build a runnable program'],
    ['net10.0', 'target .NET 10'],
    ['ImplicitUsings', 'System etc. imported for us'],
    [{ text: 'Nullable disable', options: { bold: true, color: C.amberDk } }, 'no null-warnings on ReadLine()'],
    [{ text: 'InvariantGlobalization', options: { bold: true, color: C.amberDk } }, '72.5 works on Turkish PCs'],
  ], 8.0, 1.75, 4.75, [2.25, 2.5], { fs: 13, rowH: 0.52 });
  const tree = [['Hello/', 0], ['Hello.csproj  — build settings', 1], ['Program.cs    — your code', 1], ['bin/  obj/    — build output (generated)', 1]];
  D.card(s, X0, 5.3, 7.2, 1.25);
  T(s, tree.map(([t, lvl], i) => ({ text: (lvl ? '   ├─ ' : '') + t, options: { breakLine: i < tree.length - 1, color: lvl ? C.body : C.ink, bold: !lvl } })),
    { x: X0 + 0.25, y: 5.38, w: 6.8, h: 1.1, fontFace: D.MF, fontSize: 13, valign: 'middle' });
  D.callout(s, 8.0, 5.1, 4.75, 1.45, I.warn_ink, 'Without our template, int.Parse(Console.ReadLine()) shows warning CS8604.', { fs: 13 });

  // ------------------------------------------------------------------ 10 Top-level vs classic
  s = D.slide('program structure', 'Top-Level Statements vs the Classic Main Method',
    'STRUCTURE (4 min). Since C# 9 (.NET 5; default template since .NET 6) a program may consist of top-level statements: the compiler generates the class and the Main method for you. '
    + 'Older books, exam papers from other universities and many online answers still show the classic form, so students must recognise it. Example 03_02 is the classic version and it runs exactly like the top-level version. '
    + 'Rule for MCMP113: we write top-level statements. Important: in the classic form, Main is the ENTRY POINT — execution starts at its first statement. '
    + 'Question: "Can we have both?" No: a project may have only one entry point.');
  D.code(s, X0, 1.75, 4.9, 2.6,
    '// Program.cs  (what we write)\nConsole.WriteLine("Hello from Main!");\nConsole.WriteLine("Top-level ...");',
    { fs: 13, title: 'TOP-LEVEL STATEMENTS  (C# 9+)' });
  D.code(s, 5.7, 1.75, 7.05, 4.75, body('03_02_ClassicHello'), { fs: 12, title: 'CLASSIC TEMPLATE  (example 03_02)' });
  D.consoleOut(s, X0, 4.55, 4.9, 1.95, 'Hello from Main!\nThe classic form.', { fs: 12 });

  // ------------------------------------------------------------------ 11 Anatomy
  s = D.slide('syntax basics', 'Statements, Semicolons, Case and Comments',
    'SYNTAX (4 min). Four rules students break most often in the first lab. (1) Each simple statement ends with a semicolon — missing one gives CS1002 "; expected". '
    + '(2) C# is case-sensitive: console is not Console (CS0103 "The name \'console\' does not exist in the current context"), age and Age are two different names. '
    + '(3) Comments are for humans; the compiler ignores them. Use // for one line, /* */ for several lines. VS Code: Ctrl+K Ctrl+C comments out a selection. '
    + '(4) Spaces, tabs and line breaks between tokens are ignored, but consistent 4-space indentation makes code readable (Shift+Alt+F formats the document).');
  D.code(s, X0, 1.75, 6.9, 4.75,
    '// single-line comment\n/* a comment that spans\n   several lines */\n\nint age = 19;              // ; ends a statement\nConsole.WriteLine(age);    // prints 19\n\n// console.WriteLine(age); // CS0103: c ≠ C\n// int Age = 20;           // Age ≠ age\n\nint   total   =   5 ;      // spaces ignored ...\nint count = 5;             // ... but keep it tidy',
    { fs: 13, title: 'Program.cs' });
  const rules = [
    [I.flag, 'Semicolon ;', 'Every statement ends with ;  Missing → CS1002'],
    [I.equals, 'Case-sensitive', 'Console ≠ console,  age ≠ Age'],
    [I.pencil, 'Comments', '// line   and   /* block */  are ignored by the compiler'],
    [I.stream, 'Whitespace', 'Free between tokens; indent 4 spaces for people'],
  ];
  rules.forEach(([ic, h, b], i) => {
    const y = 1.75 + i * 1.2;
    D.card(s, 7.75, y, 5.0, 1.08);
    D.circIcon(s, ic, 7.92, y + 0.2, 0.68, i === 1 ? C.red : C.ink);
    T(s, h, { x: 8.8, y: y + 0.1, w: 3.85, h: 0.4, fontFace: D.HF, fontSize: 16, bold: true, color: C.ink });
    T(s, b, { x: 8.8, y: y + 0.5, w: 3.85, h: 0.5, fontSize: 13 });
  });

  // ================================================================== PART 2
  s = D.section(2, 'Output, Names and Variables', 'Printing text, naming things and storing values in memory');
  s.addNotes('PART 2 (about 30 min). Output first, because students need Console.WriteLine to see what their variables contain.');

  // ------------------------------------------------------------------ 13 Write / WriteLine / escapes
  s = D.slide('output', 'Write vs WriteLine and Escape Sequences',
    'OUTPUT (5 min). Write leaves the cursor at the end of the text; WriteLine adds a line break AFTER the text. That is why prompts use Write: the user types on the same line. '
    + 'Escape sequences start with a backslash inside a normal string. A verbatim string @"..." treats the backslash as a normal character — handy for Windows paths. '
    + 'Pitfall: "C:\\Temp\\new" written with single backslashes gives error CS1009 "Unrecognized escape sequence" (\\T is not an escape) — and \\n would silently become a new line. '
    + 'Answer to the question in the box: ABC on line 1, D on line 2.');
  D.code(s, X0, 1.75, 5.2, 2.2, 'Console.Write("A");\nConsole.Write("B");\nConsole.WriteLine("C");\nConsole.WriteLine("D");', { fs: 14, title: 'What is printed?' });
  D.consoleOut(s, X0, 4.15, 5.2, 1.3, 'ABC\nD', { fs: 14 });
  T(s, [{ text: 'Write ', options: { bold: true, fontFace: D.MF } }, { text: 'keeps the cursor on the line.  ' }, { text: 'WriteLine ', options: { bold: true, fontFace: D.MF } }, { text: 'ends the line.' }],
    { x: X0, y: 5.6, w: 5.2, h: 0.9, fontSize: 14, valign: 'top' });
  D.table(s, [
    ['Escape', 'Meaning', 'Example in code', 'Printed'],
    ['\\n', 'new line', '"Line 1\\nLine 2"', 'Line 1 ⏎ Line 2'],
    ['\\t', 'tab', '"Name:\\tAyşe"', 'Name:   Ayşe'],
    ['\\"', 'double quote', '"Say \\"hi\\""', 'Say "hi"'],
    ['\\\\', 'backslash', '"C:\\\\MCMP113"', 'C:\\MCMP113'],
    ['\\\'', 'single quote', '\'\\\'\'  (a char)', '\''],
    [{ text: '@"…"', options: { bold: true } }, 'verbatim string', '@"C:\\MCMP113"', 'C:\\MCMP113'],
  ], 6.1, 1.75, 6.65, [1.0, 1.55, 2.3, 1.8], { fs: 13, rowH: 0.52, mono: [0, 2, 3] });
  D.callout(s, 6.1, 5.6, 6.65, 0.9, I.bug_ink, '"C:\\Temp\\new"  →  error CS1009: Unrecognized escape sequence', { fs: 13, fill: C.softRed });

  // ------------------------------------------------------------------ 14 Example 1 HelloCard
  s = D.slide('example 03_01 · hellocard', 'Worked Example: A Personal Student Card',
    'EXAMPLE 1 (4 min). Run it live. Point out: (a) the program pauses at ReadLine until Enter is pressed; the typed text (amber) is not part of the program output; '
    + '(b) \\t moves to the next tab stop (every 8 columns in a console), so the values line up; (c) lines 14 and 16 print the same path, once with escapes and once verbatim. '
    + 'Turkish letters (ş, ı) work in the Windows Terminal; if a student sees ? marks, add Console.OutputEncoding = System.Text.Encoding.UTF8; as the first line.');
  D.code(s, X0, 1.75, 7.35, 4.75, body('03_01_HelloCard'), { fs: 12, title: 'code/03_01_HelloCard/Program.cs' });
  D.consoleOut(s, 8.1, 1.75, 4.65, 4.75,
    'Hello, Okan!\nEnter your name: [[Ayşe Yılmaz]]\nEnter your programme:\n[[Computer Programming]]\n\n===== STUDENT CARD =====\nName:   Ayşe Yılmaz\nProg.:  Computer Programming\nMotto:  "Code, test, repeat."\nFolder: C:\\MCMP113\\Week03\nSame:   C:\\MCMP113\\Week03\nLine 1\nLine 2',
    { fs: 12 });

  // ------------------------------------------------------------------ 15 Identifiers
  s = D.slide('identifiers', 'Naming Rules and Naming Conventions',
    'IDENTIFIERS (5 min). RULES are enforced by the compiler: letters, digits and _; must not start with a digit; no spaces or symbols such as - or %; must not be a reserved keyword (int, class, if, for, while, string, const, new …). '
    + 'Turkish letters are legal (öğrenciAdı compiles) but we use English names so that code is readable internationally and to avoid keyboard problems. '
    + 'CONVENTIONS are agreements between programmers (Microsoft C# coding conventions): camelCase for local variables, PascalCase for constants, methods and types. '
    + 'Quiz the class on the table before revealing the column "Why" (cover it).');
  D.table(s, [
    ['Name', 'OK?', 'Why'],
    ['studentName', { text: '✓', options: { color: C.green, bold: true } }, 'letters only, camelCase'],
    ['total2', { text: '✓', options: { color: C.green, bold: true } }, 'digits allowed after the first character'],
    ['_count', { text: '✓', options: { color: C.green, bold: true } }, '_ is allowed (even at the start)'],
    ['2ndPlace', { text: '✗', options: { color: C.red, bold: true } }, 'starts with a digit'],
    ['first name', { text: '✗', options: { color: C.red, bold: true } }, 'contains a space'],
    ['price-tl', { text: '✗', options: { color: C.red, bold: true } }, '- is the minus operator'],
    ['class', { text: '✗', options: { color: C.red, bold: true } }, 'reserved keyword'],
    ['öğrenciAdı', { text: '✓', options: { color: C.amberDk, bold: true } }, 'legal, but use English names'],
  ], X0, 1.75, 6.9, [2.0, 0.7, 4.2], { fs: 14, rowH: 0.52, mono: [0], align: ['left', 'center', 'left'] });
  D.card(s, 7.75, 1.75, 5.0, 4.7);
  T(s, 'Conventions (style)', { x: 7.95, y: 1.9, w: 4.6, h: 0.4, fontFace: D.HF, fontSize: 18, bold: true, color: C.ink });
  const conv = [['camelCase', 'local variables', 'examGrade, unitPrice'], ['PascalCase', 'constants, types, methods', 'VatRate, Console, WriteLine'], ['Meaningful', 'say what it stores', 'x  →  examGrade\nn  →  studentCount']];
  conv.forEach(([h, w, e], i) => {
    const y = 2.45 + i * 1.3;
    T(s, h, { x: 7.95, y, w: 4.6, h: 0.35, fontSize: 15, bold: true, color: C.blue });
    T(s, w, { x: 7.95, y: y + 0.33, w: 4.6, h: 0.3, fontSize: 13, color: C.slate });
    T(s, e, { x: 7.95, y: y + 0.63, w: 4.6, h: 0.6, fontSize: 13, fontFace: D.MF, color: C.ink, valign: 'top' });
  });

  // ------------------------------------------------------------------ 16 Variables: box model + trace
  s = D.slide('variables', 'A Variable Is a Named Box in Memory',
    'VARIABLES (6 min). A variable has a NAME, a TYPE (what kind of value fits in the box, and how big the box is) and a VALUE. '
    + 'Declaration creates the box; initialisation gives the first value; assignment replaces the value — the old value is gone. '
    + 'Read line 4 as "take the value of age, add 1, store the result back into age" (pseudocode: age ← age + 1). It is not an equation — mathematically age = age + 1 has no solution. '
    + 'Trace table answer: age: – / 19 / 19 / 20; year: – / – / 2026 / 2026. Point out the dash: after "int age;" the box exists but has no usable value (see next slide, CS0165).');
  D.code(s, X0, 1.75, 6.2, 2.3,
    'int age;            // 1 declaration\nage = 19;           // 2 assignment\nint year = 2026;    // 3 declare + initialise\nage = age + 1;      // 4 read, add, store back',
    { fs: 14, title: 'Four statements' });
  D.table(s, [
    ['After line', 'age', 'year'],
    ['1', '–', '–'], ['2', '19', '–'], ['3', '19', '2026'], ['4', { text: '20', options: { bold: true, color: C.green } }, '2026'],
  ], X0, 4.25, 6.2, [2.2, 2.0, 2.0], { fs: 14, rowH: 0.42, mono: [1, 2], align: ['center', 'center', 'center'] });
  // boxes
  const boxes = [['age', 'int', '20'], ['year', 'int', '2026'], ['height', 'double', '1.75'], ['name', 'string', '"Ayşe"']];
  T(s, 'Memory (RAM) after line 4 — plus two more variables', { x: 7.2, y: 1.75, w: 5.5, h: 0.35, fontSize: 14, color: C.slate, italic: true });
  boxes.forEach(([nm, ty, val], i) => {
    const x = 7.2 + (i % 2) * 2.8, y = 2.25 + Math.floor(i / 2) * 2.0;
    T(s, nm, { x, y, w: 2.5, h: 0.35, fontFace: D.MF, fontSize: 15, bold: true, color: C.ink });
    s.addShape(D.pres.shapes.RECTANGLE, { x, y: y + 0.4, w: 2.5, h: 0.95, fill: { color: C.softAmber }, line: { color: C.amberDk, width: 1.5 } });
    T(s, val, { x, y: y + 0.4, w: 2.5, h: 0.95, fontFace: D.MF, fontSize: 20, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    T(s, ty, { x: x + 1.5, y: y + 1.37, w: 1.0, h: 0.28, fontFace: D.MF, fontSize: 12, color: C.blue, align: 'right' });
  });
  D.callout(s, 7.2, 6.0, 5.55, 0.62, I.equals_ink, [{ text: '=  means  "store into"  (←)', options: { bold: true } }], { fs: 15 });

  // ------------------------------------------------------------------ 17 Unassigned + trace
  s = D.slide('trace & errors', 'Trace It Yourself — and the Unassigned Variable Error',
    'TRACE + CS0165 (5 min). Let students trace the left program alone for 2 minutes. Answer: x = 5, y = 10, x = 8, y = 2; output "x = 8, y = 2". '
    + 'The important idea: statements run top to bottom, one after the other, and each assignment uses the CURRENT values. '
    + 'CS0165: C# refuses to compile a program that reads a local variable before it has definitely been given a value. Other languages (C) would silently use garbage; C# protects you. '
    + 'CS0128: declaring the same name twice in the same scope is also an error — to change a value, assign it (x = 6;), do not write int again.');
  D.code(s, X0, 1.75, 5.4, 2.55, 'int x = 5;\nint y = x * 2;\nx = x + 3;\ny = y - x;\nConsole.WriteLine($"x = {x}, y = {y}");', { fs: 14, title: 'Trace me' });
  D.table(s, [
    ['Line', 'x', 'y', 'Output'],
    ['1', '5', '–', ''], ['2', '5', '10', ''], ['3', '8', '10', ''], ['4', '8', '2', ''], ['5', '8', '2', { text: 'x = 8, y = 2', options: { fontFace: D.MF, bold: true, color: C.green } }],
  ], X0, 4.45, 5.4, [0.8, 0.9, 0.9, 2.8], { fs: 14, rowH: 0.36, mono: [1, 2], align: ['center', 'center', 'center', 'left'] });
  D.code(s, 6.4, 1.75, 6.35, 1.35, 'int total;\nConsole.WriteLine(total);', { fs: 14, title: 'Does not compile' });
  D.consoleOut(s, 6.4, 3.2, 6.35, 1.05, "error CS0165: Use of unassigned local\nvariable 'total'", { fs: 13, title: 'Build output' });
  D.code(s, 6.4, 4.45, 6.35, 1.0, 'int x = 5;\nint x = 6;      // CS0128', { fs: 14 });
  D.callout(s, 6.4, 5.6, 6.35, 0.9, I.check_ink, [{ text: 'Fix: ', options: { bold: true } }, { text: 'int total = 0;    x = 6;', options: { fontFace: D.MF } }], { fs: 13, fill: C.softGreen });

  // ------------------------------------------------------------------ 18 Swap
  s = D.slide('example 03_08 · swap', 'Worked Example: Swapping Two Variables',
    'SWAP (5 min). First ask the class to swap the values with only two statements: most will write a = b; b = a; — trace it: after a = b both are 9, the original 5 is lost, so the result is a = 9, b = 9. '
    + 'The fix is a temporary variable, exactly like swapping the drinks in two glasses using a third, empty glass. '
    + 'Advanced note (not required): modern C# can also write (a, b) = (b, a); using tuples — we use the temp version because it shows what really happens in memory.');
  D.code(s, X0, 1.75, 6.3, 3.05, body('03_08_SwapVariables'), { fs: 13, title: 'code/03_08_SwapVariables/Program.cs' });
  D.consoleOut(s, X0, 4.95, 6.3, 1.55, 'a = [[5]]\nb = [[9]]\nBefore: a = 5, b = 9\nAfter : a = 9, b = 5', { fs: 12 });
  D.table(s, [
    ['Statement', 'a', 'b', 'temp'],
    ['(input)', '5', '9', '–'],
    ['int temp = a;', '5', '9', '5'],
    ['a = b;', '9', '9', '5'],
    ['b = temp;', '9', { text: '5', options: { bold: true, color: C.green } }, '5'],
  ], 7.15, 1.75, 5.6, [2.6, 1.0, 1.0, 1.0], { fs: 14, rowH: 0.45, mono: [0, 1, 2, 3], align: ['left', 'center', 'center', 'center'] });
  D.card(s, 7.15, 4.2, 5.6, 2.3, C.softRed);
  T(s, 'Wrong: without temp', { x: 7.35, y: 4.3, w: 5.2, h: 0.4, fontFace: D.HF, fontSize: 16, bold: true, color: C.red });
  D.code(s, 7.35, 4.75, 5.2, 1.0, 'a = b;   // a = 9, the 5 is lost\nb = a;   // b = 9', { fs: 13 });
  T(s, 'Result: a = 9, b = 9', { x: 7.35, y: 5.85, w: 5.2, h: 0.4, fontFace: D.MF, fontSize: 14, bold: true, color: C.red });

  // ================================================================== PART 3
  s = D.section(3, 'Data Types and Constants', 'Choosing the right box: integers, real numbers, money, text and truth values');
  s.addNotes('PART 3 (about 35 min). Key message: the type decides which values fit, how much memory is used and which operations are allowed.');

  // ------------------------------------------------------------------ 20 Types table
  s = D.slide('built-in types', 'The Most Important C# Data Types',
    'TYPES TABLE (7 min). All sizes and ranges were printed by our example 03_10 (TypeLimits) — they are exact, not from memory. '
    + 'Defaults to remember: a whole-number literal like 42 is an int; a literal with a point like 4.2 is a double. Other types need a suffix: L (long), f (float), m (decimal). '
    + 'short and byte have no suffix; the constant is checked: byte b = 200; compiles, byte b = 256; gives CS0031. Digit separators: 1_000_000 is the same as 1000000. '
    + 'string is different from the others: it is a reference type whose size depends on the text (2 bytes per character plus some overhead). char holds one UTF-16 code unit, e.g. \'A\' (single quotes!).');
  D.table(s, [
    ['Type', 'Bytes', 'Range / precision', 'Literal', 'Typical use'],
    ['byte', '1', '0 … 255', '200', 'small counts, raw data'],
    ['short', '2', '−32 768 … 32 767', '30000', 'rarely needed'],
    [{ text: 'int', options: { bold: true, fontFace: D.MF, color: C.blue } }, '4', '−2 147 483 648 … 2 147 483 647', '42   1_000_000', 'default whole number'],
    ['long', '8', '≈ ±9.2 × 10¹⁸', '42L', 'very large whole numbers'],
    ['float', '4', '≈ ±3.4 × 10³⁸,  ~6–9 digits', '3.14f', 'graphics, sensors'],
    [{ text: 'double', options: { bold: true, fontFace: D.MF, color: C.blue } }, '8', '≈ ±1.7 × 10³⁰⁸,  ~15–17 digits', '3.14   2.5e3', 'default real number'],
    [{ text: 'decimal', options: { bold: true, fontFace: D.MF, color: C.blue } }, '16', '≈ ±7.9 × 10²⁸,  28–29 digits', '19.99m', 'money'],
    ['char', '2', 'one character (U+0000 … U+FFFF)', "'A'", 'a letter, a grade'],
    ['bool', '1', 'true  or  false', 'true', 'yes / no'],
    [{ text: 'string', options: { bold: true, fontFace: D.MF, color: C.blue } }, 'varies', 'any text (sequence of chars)', '"Ayşe"', 'names, IDs, phones'],
  ], X0, 1.75, CW, [1.5, 1.0, 4.35, 2.1, 3.2], { fs: 14, rowH: 0.43, mono: [0, 3], align: ['left', 'center', 'left', 'left', 'left'] });

  // ------------------------------------------------------------------ 21 Precision
  s = D.slide('real numbers', 'float, double or decimal? Precision Matters',
    'PRECISION (5 min). double and float store numbers in BINARY; most decimal fractions such as 0.1 cannot be stored exactly in binary (like 1/3 in decimal), so tiny errors appear: 0.1 + 0.2 = 0.30000000000000004. '
    + 'float prints 0.3 only because it shows fewer digits — it is still inexact. decimal stores numbers in base 10, so 0.1 + 0.2 is exactly 0.3; that is why money uses decimal. '
    + 'The 1/3 lines show the number of digits each type keeps: float ~7, double ~16, decimal 28. '
    + 'decimal is slower and has a smaller range than double; for physics and engineering we use double. All outputs verified with .NET 10.');
  D.code(s, X0, 1.75, 6.4, 3.05,
    'Console.WriteLine(0.1 + 0.2);    // double\nConsole.WriteLine(0.1f + 0.2f);  // float\nConsole.WriteLine(0.1m + 0.2m);  // decimal\n\nConsole.WriteLine(1.0 / 3);\nConsole.WriteLine(1.0f / 3);\nConsole.WriteLine(1.0m / 3);',
    { fs: 14, title: 'Same sums, three types' });
  D.consoleOut(s, 7.2, 1.75, 5.55, 3.05, '0.30000000000000004\n0.3\n0.3\n\n0.3333333333333333\n0.33333334\n0.3333333333333333333333333333', { fs: 13 });
  const pc = [
    [I.ruler, 'double', 'Measurements, science, maths. Our default for real numbers.', C.blue],
    [I.money, 'decimal', 'Money: prices, salaries, VAT. Exact in base 10.', C.green],
    [I.bolt, 'float', 'Only when memory matters (graphics, sensors). Needs f.', C.slate],
  ];
  pc.forEach(([ic, h, b, col], i) => {
    const x = X0 + i * 4.1;
    D.card(s, x, 5.0, 3.95, 1.5);
    D.circIcon(s, ic, x + 0.2, 5.2, 0.7, col);
    T(s, h, { x: x + 1.05, y: 5.1, w: 2.8, h: 0.4, fontFace: D.MF, fontSize: 16, bold: true, color: col });
    T(s, b, { x: x + 1.05, y: 5.5, w: 2.8, h: 0.9, fontSize: 13, valign: 'top' });
  });

  // ------------------------------------------------------------------ 22 Which type
  s = D.slide('design decision', 'Which Type Would You Choose?',
    'CHOOSING TYPES (5 min). Cover the answers and ask the class first. Discussion points: '
    + 'T.C. Kimlik No and phone numbers are string: we never do arithmetic with them, a phone number can start with 0 (0212 …) and may contain + or spaces. An 11-digit T.C. number would not even fit in int (max 2 147 483 647); long would work but is the wrong idea. '
    + 'Age: int is the normal choice even though byte would be enough — int is the default integer type and avoids conversions. '
    + 'Temperature: double (36.6). Student count: int. World population (≈ 8.2 billion): too big for int → long.');
  const pick = [
    ['Number of students', 'int', I.users], ['World population', 'long', I.users], ['Body temperature', 'double', I.thermo], ['Product price', 'decimal', I.money],
    ['Passed the course?', 'bool', I.toggle], ['Letter grade B', 'char', I.graduation], ['Student name', 'string', I.user], ['T.C. Kimlik No, phone', 'string', I.key],
  ];
  pick.forEach(([q, a, ic], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = X0 + col * 3.07, y = 1.75 + row * 2.1;
    D.card(s, x, y, 2.92, 1.95);
    D.circIcon(s, ic, x + 0.2, y + 0.2, 0.65, C.ink);
    T(s, q, { x: x + 0.2, y: y + 0.92, w: 2.55, h: 0.45, fontSize: 15, bold: true, color: C.ink });
    T(s, a, { x: x + 0.2, y: y + 1.37, w: 2.55, h: 0.45, fontFace: D.MF, fontSize: 18, bold: true, color: C.green });
  });
  D.callout(s, X0, 6.05, CW, 0.62, I.lightbulb_ink, 'Rule of thumb: if you never calculate with it, it is not a number — store it as a string.', { fs: 14 });

  // ------------------------------------------------------------------ 23 TypeLimits + var
  s = D.slide('example 03_10 · typelimits', 'Asking C# for the Limits — and the var Keyword',
    'TYPE LIMITS + VAR (5 min). Run example 03_10: sizeof gives the size in bytes, MinValue and MaxValue the range. The output is the source of the table two slides ago. '
    + 'var: the compiler infers the type from the value on the right; the variable is still strongly typed (var a = 42; a = "hi"; is an error). var x; without a value → CS0818 "Implicitly-typed variables must be initialized". '
    + 'GetType().Name shows .NET names: Int32 = int, Int64 = long, Double = double, Single = float, Decimal = decimal. '
    + 'Course rule: write the type explicitly while learning; var is fine when the type is obvious from the right-hand side.');
  D.consoleOut(s, X0, 1.75, CW, 3.45,
    'type     bytes  MinValue                        MaxValue\nbyte         1  0                               255\nshort        2  -32768                          32767\nint          4  -2147483648                     2147483647\nlong         8  -9223372036854775808            9223372036854775807\nfloat        4  -3.4028235E+38                  3.4028235E+38\ndouble       8  -1.7976931348623157E+308        1.7976931348623157E+308\ndecimal     16  -79228162514264337593543950335  79228162514264337593543950335\nchar         2  0                               65535\nbool         1  False                           True',
    { fs: 13, title: 'dotnet run  (03_10_TypeLimits)' });
  D.code(s, X0, 5.4, 5.0, 1.1, 'var a = 42;     // int\nvar e = 4.2m;   // decimal', { fs: 13 });
  D.consoleOut(s, 5.75, 5.4, 7.0, 1.15, '42 -> Int32, 42L -> Int64, 4.2 -> Double\n4.2f -> Single, 4.2m -> Decimal, \'x\' -> Char, "x" -> String', { fs: 12, title: 'var: inferred types' });

  // ------------------------------------------------------------------ 24 Constants
  s = D.slide('example 03_03 · constants', 'Constants: Values That Must Never Change',
    'CONSTANTS (5 min). const makes the compiler protect the value: Pi = 3.0; later in the program gives CS0131. A constant must be given its value in the declaration. '
    + 'Why constants: (1) no "magic numbers" — 0.20m means nothing, VatRate explains itself; (2) change it in one place; (3) no accidental changes. Naming: PascalCase (Microsoft convention). '
    + 'Math.PI is a constant provided by .NET: 3.141592653589793. Note the difference in the 4th decimal: our 3.14159 gives 19.6349, Math.PI gives 19.6350 — use Math.PI in real programs. '
    + 'Check: A = π·2.5² = 19.63495…; C = 2π·2.5 = 15.70796… → 15.7080 (3.14159 gives 15.70795 → 15.7080 too).');
  D.code(s, X0, 1.75, 7.35, 3.15, body('03_03_CircleArea'), { fs: 12, title: 'code/03_03_CircleArea/Program.cs' });
  D.consoleOut(s, X0, 5.0, 7.35, 1.55, 'Radius (cm): [[2.5]]\nArea          : 19.6349 cm²\nCircumference : 15.7080 cm\nArea (Math.PI): 19.6350 cm²', { fs: 12, title: 'Console' });
  D.iconCard(s, 8.15, 1.75, 4.6, 2.35, I.lock, 'const = locked', 'const double Pi = 3.14159;\nPi = 3.0;   →  error CS0131', { fs: 14 });
  D.iconCard(s, 8.15, 4.2, 4.6, 2.35, I.lightbulb, 'Why use them?', 'No magic numbers (VatRate, not 0.20m). Change in one place. PascalCase names.', { fs: 14, iconFill: C.amberDk });

  // ------------------------------------------------------------------ 25 Receipt
  s = D.slide('example 03_07 · receipt', 'Worked Example: A Receipt with decimal and KDV',
    'RECEIPT (6 min). IPO: input = product name, net unit price, quantity; process = subtotal, VAT 20 %, total; output = aligned receipt. '
    + 'Check the numbers by hand: 24.90 × 3 = 74.70; 74.70 × 0.20 = 14.94; 74.70 + 14.94 = 89.64. '
    + 'Alignment: {subtotal,10:F2} = right-aligned in 10 characters with 2 decimals; {"TOTAL",-18} = left-aligned in 18 characters. '
    + 'Mention: in Turkish shops prices usually INCLUDE KDV; here the price is net, so we add KDV. Why not {total:C}? With invariant culture the currency sign is the generic ¤ (¤89.64), so we print F2 + " TL".');
  D.code(s, X0, 1.75, 7.35, 4.8, body('03_07_Receipt'), { fs: 12, title: 'code/03_07_Receipt/Program.cs' });
  D.consoleOut(s, 8.15, 1.75, 4.6, 2.75,
    'Product name        : [[Notebook]]\nUnit price (TL, net): [[24.90]]\nQuantity            : [[3]]\n--------------------------------\nNotebook       3 x    24.90\nSubtotal                74.70 TL\nKDV 20%                 14.94 TL\nTOTAL                   89.64 TL',
    { fs: 11 });
  D.pseudo(s, 8.15, 4.65, 4.6, 1.9, 'READ product, unitPrice, quantity\nsubtotal ← unitPrice × quantity\nvat ← subtotal × 0.20\ntotal ← subtotal + vat\nPRINT subtotal, vat, total', { fs: 12, title: 'Pseudocode' });

  // ================================================================== PART 4
  s = D.section(4, 'Input and Type Conversion', 'Reading text from the keyboard, converting it, and the traps on the way');
  s.addNotes('PART 4 (about 35 min). Most runtime crashes of beginners happen here: forgetting Parse, typing a comma, typing letters.');

  // ------------------------------------------------------------------ 27 ReadLine is a string
  s = D.slide('input', 'Console.ReadLine() Always Returns a string',
    'READLINE (5 min). Whatever the user types — even 19 — arrives as TEXT (string). To calculate, we must convert: int.Parse("19") → 19. '
    + 'Writing int age = Console.ReadLine(); does not compile: CS0029 "Cannot implicitly convert type \'string\' to \'int\'". '
    + 'Line 5 of the console shows the classic surprise: "19" + 1 is "191" because + with a string JOINS text (concatenation); age + 1 with an int is 20. '
    + 'The other lines are verified with input 19, 1.75, 30, 7.');
  const flow = [['⌨  19 ⏎', 'user types', C.softAmber], ['"19"', 'string', C.paper], ['int.Parse(…)', 'conversion', C.softBlue], ['19', 'int', C.softGreen]];
  flow.forEach(([a, b, fill], i) => {
    const x = X0 + i * 3.1;
    s.addShape(D.pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.8, w: 2.6, h: 1.05, fill: { color: fill }, line: { color: C.ink, width: 1 }, rectRadius: 0.1 });
    T(s, [{ text: a, options: { bold: true, fontFace: D.MF, fontSize: 16, breakLine: true } }, { text: b, options: { fontSize: 12, color: C.slate } }],
      { x, y: 1.8, w: 2.6, h: 1.05, align: 'center', valign: 'middle', color: C.ink });
    if (i < 3) D.seg(s, x + 2.65, 2.33, x + 3.05, 2.33, true, C.amberDk);
  });
  D.code(s, X0, 3.1, 7.0, 3.4, lines('03_12_InputParsing', 3, 12), { fs: 12, title: 'code/03_12_InputParsing/Program.cs (lines 3–12)' });
  D.consoleOut(s, 7.8, 3.1, 4.95, 3.4, 'Your age: [[19]]\nText   + 1 = 191\nNumber + 1 = 20\nHeight in m (e.g. 1.75):\n[[1.75]]\nHeight in cm: 175', { fs: 13 });

  // ------------------------------------------------------------------ 28 Parse / Convert / TryParse
  s = D.slide('conversion methods', 'Parse, Convert and TryParse',
    'CONVERSION METHODS (6 min). int.Parse and Convert.ToInt32(string) do the same job for normal input. Differences: Convert.ToInt32(null) returns 0 while int.Parse(null) throws ArgumentNullException. '
    + 'Both crash with FormatException for text that is not a number ("abc", "" or "3.5" for an int) and with OverflowException for numbers too large for int (e.g. 99999999999). Leading/trailing spaces are accepted (" 42 " → 42). '
    + 'TryParse never crashes: it returns true/false and puts the number into an out variable (0 on failure). Full use with if in Week 5; example 03_12 already shows it (input "seven" → Success: False, value: 0). '
    + 'The crash output is abridged: the real stack trace also lists internal .NET lines.');
  D.table(s, [
    ['Input text', 'int.Parse(text)', 'Convert.ToInt32(text)', 'int.TryParse(text, out int n)'],
    ['"42"', '42', '42', 'true, n = 42'],
    ['" 42 "', '42', '42', 'true, n = 42'],
    ['"3.5"', { text: 'FormatException', options: { color: C.red } }, { text: 'FormatException', options: { color: C.red } }, 'false, n = 0'],
    ['"abc"  or  ""', { text: 'FormatException', options: { color: C.red } }, { text: 'FormatException', options: { color: C.red } }, 'false, n = 0'],
    ['"99999999999"', { text: 'OverflowException', options: { color: C.red } }, { text: 'OverflowException', options: { color: C.red } }, 'false, n = 0'],
  ], X0, 1.75, CW, [2.55, 2.9, 3.15, 3.55], { fs: 14, rowH: 0.46, mono: [0, 1, 2, 3] });
  D.consoleOut(s, X0, 4.7, CW, 1.85,
    "Your age: [[nineteen]]\nUnhandled exception. System.FormatException: The input string 'nineteen' was not in a correct format.\n   at System.Int32.Parse(String s)\n   at Program.<Main>$(String[] args) in ...\\03_12_InputParsing\\Program.cs:line 5",
    { fs: 12, title: 'Crash: letters typed instead of digits (abridged)' });

  // ------------------------------------------------------------------ 29 Culture
  s = D.slide('culture · decimal point', '72.5 or 72,5? The Turkish Decimal Comma Trap',
    'CULTURE (6 min). In Turkey the decimal separator is a comma (72,5) and the thousands separator is a point (1.234.567). Parse uses the computer\'s CULTURE by default. '
    + 'Verified with .NET 10: under tr-TR, double.Parse("72.5") returns 725 — the point is taken as a thousands separator — WITHOUT any error. That is worse than a crash. '
    + 'Our template sets InvariantGlobalization=true, so every PC behaves like the "invariant" culture: point = decimal separator, comma = thousands separator. Then "72,5" becomes 725 (BMI 228.8, real run). '
    + 'Tell students clearly: in this course, ALWAYS type a decimal POINT. Alternative without the template: double.Parse(text, CultureInfo.InvariantCulture) with using System.Globalization;.');
  D.table(s, [
    ['Typed', 'Turkish PC, default project', 'Our template (invariant)'],
    ['72.5', { text: '725   ✗ wrong', options: { color: C.red, bold: true } }, { text: '72.5  ✓', options: { color: C.green, bold: true } }],
    ['72,5', { text: '72.5  ✓', options: { color: C.green, bold: true } }, { text: '725   ✗ wrong', options: { color: C.red, bold: true } }],
    ['output of 72.5', '72,5', '72.5'],
  ], X0, 1.75, 7.2, [1.9, 2.75, 2.55], { fs: 14, rowH: 0.5, mono: [0, 1, 2] });
  D.consoleOut(s, X0, 4.0, 7.2, 1.35, 'Weight (kg): [[72,5]]\nHeight (m) : [[1.78]]\nBMI = 228.8 kg/m²', { fs: 13, title: 'Real run of 03_06_Bmi with a comma' });
  D.code(s, X0, 5.5, 7.2, 1.05, 'using System.Globalization;   // alternative fix\ndouble w = double.Parse(text, CultureInfo.InvariantCulture);', { fs: 12 });
  D.iconCard(s, 8.05, 1.75, 4.7, 2.3, I.check, 'Course rule', 'Always type a decimal POINT: 72.5, 1.78, 24.90.', { fs: 15, iconFill: C.green });
  D.iconCard(s, 8.05, 4.2, 4.7, 2.35, I.warn, 'Why so dangerous?', 'No error message! The program runs and prints a wrong number. Always sanity-check results.', { fs: 14, iconFill: C.red });

  // ------------------------------------------------------------------ 30 BMI
  s = D.slide('example 03_06 · bmi', 'Worked Example: Body Mass Index',
    'BMI (5 min). Formula: BMI = weight / height², weight in kg and height in m. Check by hand: 1.78² = 3.1684; 72.5 / 3.1684 = 22.88… → printed with F1 as 22.9. '
    + 'The parentheses are essential: weight / height * height would divide and then multiply again, giving back 72.5. '
    + 'Categories (underweight / normal / overweight) need decisions — that is Week 5. Ask: "Which data type for weight and height and why?" (double: measurements with decimals).');
  const b1 = D.fcNode(s, 'term', 2.35, 2.0, 1.7, 0.5, 'Start');
  const b2 = D.fcNode(s, 'io', 2.35, 2.95, 3.1, 0.65, 'Read weight, height');
  const b3 = D.fcNode(s, 'proc', 2.35, 4.05, 3.3, 0.75, 'bmi ← weight /\n(height × height)');
  const b4 = D.fcNode(s, 'io', 2.35, 5.15, 3.1, 0.65, 'Print bmi');
  const b5 = D.fcNode(s, 'term', 2.35, 6.1, 1.7, 0.5, 'End');
  D.seg(s, ...b1.bottom, ...b2.top); D.seg(s, ...b2.bottom, ...b3.top); D.seg(s, ...b3.bottom, ...b4.top); D.seg(s, ...b4.bottom, ...b5.top);
  D.code(s, 4.35, 1.75, 8.4, 3.0, body('03_06_Bmi'), { fs: 13, title: 'code/03_06_Bmi/Program.cs' });
  D.consoleOut(s, 4.35, 4.9, 4.1, 1.6, 'Weight (kg): [[72.5]]\nHeight (m) : [[1.78]]\nBMI = 22.9 kg/m²', { fs: 13 });
  D.card(s, 8.65, 4.9, 4.1, 1.6, C.softBlue);
  T(s, [{ text: 'Check by hand', options: { bold: true, breakLine: true, color: C.blue } }, { text: '1.78 × 1.78 = 3.1684', options: { breakLine: true, fontFace: D.MF } }, { text: '72.5 / 3.1684 ≈ 22.88', options: { fontFace: D.MF } }],
    { x: 8.85, y: 5.0, w: 3.8, h: 1.4, fontSize: 14, valign: 'middle' });

  // ------------------------------------------------------------------ 31 C to F
  s = D.slide('example 03_05 · temperature', 'Worked Example: Celsius to Fahrenheit',
    'C → F (5 min). F = C × 9/5 + 32. Test values chosen like in Week 1: normal (36.6 → 97.88 → 97.9), boundary / known (100 → 212, 0 → 32) and the special point −40 where both scales agree. '
    + 'THE TRAP: 9 / 5 with two int literals is INTEGER division = 1 (the fraction is discarded; details in Week 4). So 9 / 5 * celsius + 32 gives celsius + 32: for 20 °C it prints 52 instead of 68 (verified). '
    + 'Our code avoids it because the evaluation goes left to right: celsius * 9 is already a double. Safest style: write 9.0 / 5.');
  D.code(s, X0, 1.75, 7.35, 2.6, body('03_05_CelsiusToFahrenheit'), { fs: 12, title: 'code/03_05_CelsiusToFahrenheit/Program.cs' });
  const runs = [['36.6', '36.6 °C = 97.9 °F'], ['100', '100 °C = 212.0 °F'], ['-40', '-40 °C = -40.0 °F']];
  D.consoleOut(s, 8.15, 1.75, 4.6, 2.6, runs.map(([i, o]) => `Temperature in °C: [[${i}]]\n${o}`).join('\n'), { fs: 12, title: 'three runs' });
  D.card(s, X0, 4.55, CW, 1.95, C.softRed);
  T(s, 'Trap: integer division', { x: 0.85, y: 4.65, w: 5, h: 0.4, fontFace: D.HF, fontSize: 17, bold: true, color: C.red });
  D.code(s, 0.85, 5.1, 6.6, 1.25, 'double c = 20;\nConsole.WriteLine(9 / 5 * c + 32);  // 52  ✗\nConsole.WriteLine(c * 9 / 5 + 32);  // 68  ✓', { fs: 13 });
  T(s, '9 / 5 is computed with two ints → 1, not 1.8. Write 9.0 / 5 or start with the double variable.', { x: 7.7, y: 5.1, w: 4.85, h: 1.25, fontSize: 15, valign: 'middle' });

  // ------------------------------------------------------------------ 32 Conversions
  s = D.slide('example 03_11 · casts', 'Implicit and Explicit Conversions',
    'CONVERSIONS (6 min). Implicit (automatic) conversions go to a type that can hold every value of the old type — "widening", along the arrows. '
    + 'Caution: int → float and long → float/double are implicit but can lose precision for very large numbers (int 123456789 → float 123456792, verified). '
    + 'Explicit conversions need a cast (type) because information may be lost: (int)3.99 = 3 — the cast TRUNCATES toward zero, so (int)-3.99 = -3. '
    + 'Convert.ToInt32(3.99) ROUNDS to 4; at exactly .5 it rounds to the even neighbour (Convert.ToInt32(2.5) = 2, 3.5 = 4) — banker\'s rounding, more in Week 4. '
    + '(byte)300 = 44 because only the lowest 8 bits are kept: 300 − 256 = 44. All console lines are real output of 03_11.');
  const chain = ['byte', 'short', 'int', 'long', 'float', 'double'];
  chain.forEach((t, i) => {
    const x = X0 + i * 2.05;
    s.addShape(D.pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.8, w: 1.6, h: 0.65, fill: { color: i === 2 || i === 5 ? C.softBlue : C.mist }, line: { color: C.ink, width: 1 }, rectRadius: 0.08 });
    T(s, t, { x, y: 1.8, w: 1.6, h: 0.65, fontFace: D.MF, fontSize: 16, bold: true, color: C.ink, align: 'center', valign: 'middle' });
    if (i < chain.length - 1) D.seg(s, x + 1.63, 2.12, x + 2.02, 2.12, true, C.green);
  });
  T(s, 'implicit (automatic, widening)  →', { x: X0, y: 2.5, w: 6, h: 0.35, fontSize: 14, color: C.green, bold: true });
  T(s, '←  explicit cast needed: (int)x', { x: 6.75, y: 2.5, w: 6, h: 0.35, fontSize: 14, color: C.red, bold: true, align: 'right' });
  D.code(s, X0, 3.0, 6.9, 3.5, lines('03_11_CastDemo', 8, 23).split('\n').filter(l => l.trim()).join('\n'), { fs: 12, title: 'code/03_11_CastDemo/Program.cs (lines 8–23, blank lines removed)' });
  D.consoleOut(s, 7.7, 3.0, 5.05, 3.5, 'int 7 -> long 7 -> double 7\n(int)3.99 = 3\nConvert.ToInt32(3.99) = 4\n(int)-3.99 = -3\ndouble 0.3333333333333333\n  -> float 0.33333334\n(byte)300 = 44\n2147483647 + 1 = -2147483648', { fs: 12, title: 'dotnet run  (03_11_CastDemo)' });

  // ------------------------------------------------------------------ 33 Overflow
  s = D.slide('example 03_13 · overflow', 'Overflow: When the Box Is Too Small',
    'OVERFLOW (5 min). An int has 32 bits. Adding past 2 147 483 647 wraps around to the negative side like a car odometer going from 999999 to 000000. By default C# does NOT report this at run time. '
    + 'Check: 2 000 000 000 + 500 000 000 = 2 500 000 000; minus 2³² (4 294 967 296) = −1 794 967 296 — exactly the printed value. '
    + 'Three options: (1) use a bigger type (long), (2) wrap the expression in checked(...) so an OverflowException stops the program instead of printing garbage, (3) validate input. '
    + 'With constants the compiler catches it already: int big = int.MaxValue + 1; → CS0220 "The operation overflows at compile time in checked mode".');
  D.code(s, X0, 1.75, 6.5, 3.55, body('03_13_OverflowChecked'), { fs: 12, title: 'code/03_13_OverflowChecked/Program.cs' });
  D.consoleOut(s, 7.3, 1.75, 5.45, 1.9, 'Start value: [[100]]\nAdd        : [[23]]\nint     : 123\nlong    : 123\nchecked : 123', { fs: 12, title: 'run 1: fits' });
  D.consoleOut(s, 7.3, 3.8, 5.45, 2.7, 'Start value: [[2000000000]]\nAdd        : [[500000000]]\nint     : -1794967296\nlong    : 2500000000\nUnhandled exception.\nSystem.OverflowException: Arithmetic\noperation resulted in an overflow.', { fs: 12, title: 'run 2: too big for int' });
  D.callout(s, X0, 5.45, 6.5, 1.05, I.bug_ink, [{ text: 'int big = int.MaxValue + 1;', options: { fontFace: D.MF, bold: true } }, { text: '  →  compile error CS0220 (constants are checked)' }], { fs: 13, fill: C.softRed });

  // ------------------------------------------------------------------ 34 Format specifiers
  s = D.slide('formatted output', 'String Interpolation and Format Specifiers',
    'FORMATTING (5 min). $"..." with {expression} inserts values; after a colon comes a format specifier, after a comma the width. Every result in the table was printed by .NET 10 with our invariant template. '
    + 'F2 = fixed-point with 2 decimals (rounded for display only — the variable keeps all its digits). N = with thousands separators. D2 (integers only) pads with zeros: clocks, dates. '
    + 'Positive width right-aligns, negative width left-aligns — used for tables such as the receipt. '
    + 'C (currency) uses the culture: invariant prints the generic sign ¤, a Turkish PC would print ₺1.234,50. That is why we write {price:F2} TL. '
    + 'Avoid showing midpoint rounding (2.5:F0) now — Week 4 covers rounding rules.');
  D.table(s, [
    ['In code', 'Value', 'Printed', 'Meaning'],
    ['{x}', '1.0 / 3', '0.3333333333333333', 'default: all significant digits'],
    ['{x:F2}', '3.14159', '3.14', 'fixed, 2 decimals'],
    ['{n:N0}', '1234567', '1,234,567', 'thousands separator, 0 decimals'],
    ['{x:N2}', '1234.5', '1,234.50', 'separator + 2 decimals'],
    ['{h:D2}', '7', '07', 'integer, at least 2 digits'],
    ['[{n,5}]', '42', '[   42]', 'width 5, right-aligned'],
    ['[{n,-5}]', '42', '[42   ]', 'width 5, left-aligned'],
    ['{p:P0}', '0.2', '20 %', 'percent'],
    ['{d:C}', '1234.5m', '¤1,234.50', 'currency (invariant ¤) — avoid'],
  ], X0, 1.75, CW, [2.3, 2.2, 3.35, 4.3], { fs: 14, rowH: 0.44, mono: [0, 1, 2] });
  D.callout(s, X0, 6.2, CW, 0.5, I.lightbulb_ink, 'Money in this course:  $"{total:F2} TL"', { fs: 14 });

  // ------------------------------------------------------------------ 35 Seconds -> hms
  s = D.slide('example 03_09 · time', 'Worked Example: Seconds → Hours, Minutes, Seconds',
    'H:M:S (5 min). A preview of Week 4: with two ints, / gives the whole quotient and % gives the remainder. '
    + 'Trace for 3725: hours = 3725 / 3600 = 1; 3725 % 3600 = 125; 125 / 60 = 2 minutes; 3725 % 60 = 5 seconds → 01:02:05. For 86399 (one second before midnight): 23:59:59. '
    + 'Why does minutes use % 3600 first? To remove the whole hours before counting minutes. Precedence: % and / have the same level and are evaluated left to right. '
    + 'D2 pads with zeros so that 1 prints as 01.');
  D.pseudo(s, 8.2, 1.75, 4.55, 2.1, 'READ total\nh ← total div 3600\nm ← (total mod 3600) div 60\ns ← total mod 60\nPRINT h, m, s', { fs: 13, title: 'Pseudocode' });
  D.table(s, [
    ['Expression', 'total = 3725'],
    ['total / 3600', '1'], ['total % 3600', '125'], ['125 / 60', '2'], ['total % 60', '5'],
  ], 8.2, 4.05, 4.55, [2.55, 2.0], { fs: 14, rowH: 0.42, mono: [0, 1], align: ['left', 'center'] });
  D.code(s, X0, 1.75, 7.4, 2.75, body('03_09_SecondsToHms'), { fs: 12, title: 'code/03_09_SecondsToHms/Program.cs' });
  D.consoleOut(s, X0, 4.65, 7.4, 1.85, 'Total seconds: [[3725]]\n1 h 2 min 5 s\nClock: 01:02:05\nTotal seconds: [[86399]]\n23 h 59 min 59 s\nClock: 23:59:59', { fs: 12, title: 'two runs' });

  // ------------------------------------------------------------------ 36 Compiler errors
  s = D.slide('common mistakes · 1', 'Compiler Errors You Will Meet This Week',
    'COMPILER ERRORS (5 min). These are the real messages of the .NET 10 compiler. Teach students to READ the message: it gives the file, line and column, e.g. Program.cs(3,17). '
    + 'The first error is the important one; later ones are often consequences. A missing semicolon can produce several confusing errors in the following lines. '
    + 'Remind: VS Code underlines these errors in red before you even build — hover over the red line to see the message.');
  D.table(s, [
    ['You wrote', 'Error', 'Fix'],
    ['int age = Console.ReadLine();', "CS0029: Cannot implicitly convert type 'string' to 'int'", 'int.Parse(Console.ReadLine())'],
    ['decimal price = 19.99;', 'CS0664: Literal of type double … use an \'M\' suffix', '19.99m'],
    ['float f = 3.14;', 'CS0664: … use an \'F\' suffix', '3.14f'],
    ['int n = 3.9;', "CS0266: Cannot implicitly convert type 'double' to 'int'", '(int)3.9  — if you want 3'],
    ['int total;  …(total)', "CS0165: Use of unassigned local variable 'total'", 'int total = 0;'],
    ['console.WriteLine(x);', "CS0103: The name 'console' does not exist …", 'Console (capital C)'],
    ['Console.WriteLine(x)', 'CS1002: ; expected', 'add ;'],
    ['Pi = 3.0;  (Pi is const)', 'CS0131: The left-hand side of an assignment must be a variable …', 'do not change constants'],
  ], X0, 1.75, CW, [3.3, 5.3, 3.55], { fs: 13, rowH: 0.52, mono: [0, 2] });

  // ------------------------------------------------------------------ 37 Silent bugs
  s = D.slide('common mistakes · 2', 'Silent Bugs: It Compiles, but the Answer Is Wrong',
    'SILENT BUGS (4 min). These are worse than compiler errors because nothing warns you. Only testing with known answers (Week 1: test cases!) reveals them. '
    + 'All four were verified with real runs: "Total: " + 2 + 3 prints Total: 23 (left to right: string + 2 = "Total: 2", then + 3). 9/5 = 1. "72,5" → 725 with our template. int.MaxValue + 1 at run time → −2147483648. '
    + 'Also mention = vs ==: = assigns, == compares (Week 4/5). if (n = 5) does not compile in C# (CS0029: int to bool) — C# protects us here, unlike C.');
  const sb = [
    ['Text + number = joining', '"Total: " + 2 + 3', 'Total: 23', 'Use parentheses: "Total: " + (2 + 3) → Total: 5'],
    ['Integer division', '9 / 5 * 20 + 32', '52', 'Use 9.0 / 5 → 68'],
    ['Comma instead of point', 'double.Parse("72,5")', '725', 'Type 72.5 (course rule)'],
    ['Overflow wraps around', 'int.MaxValue + 1  (variable)', '-2147483648', 'Use long or checked(…)'],
  ];
  sb.forEach(([h, c, o, fix], i) => {
    const x = X0 + (i % 2) * 6.15, y = 1.75 + Math.floor(i / 2) * 2.45;
    D.card(s, x, y, 6.0, 2.3);
    D.circIcon(s, I.bug, x + 0.2, y + 0.2, 0.6, C.red);
    T(s, h, { x: x + 0.95, y: y + 0.2, w: 4.9, h: 0.6, fontFace: D.HF, fontSize: 17, bold: true, color: C.ink, valign: 'middle' });
    T(s, [{ text: c, options: { fontFace: D.MF, bold: true, color: C.ink } }, { text: '  →  ', options: { color: C.slate } }, { text: o, options: { fontFace: D.MF, bold: true, color: C.red } }],
      { x: x + 0.25, y: y + 0.95, w: 5.6, h: 0.5, fontSize: 14 });
    T(s, fix, { x: x + 0.25, y: y + 1.5, w: 5.6, h: 0.65, fontSize: 14, color: C.greenDk, valign: 'top' });
  });

  // ------------------------------------------------------------------ 38 Quiz 1
  s = D.slide('quiz · predict the output', 'Quiz 1: What Does This Program Print?',
    'QUIZ 1 (4 min). Students write their six answers on paper before you reveal the next slide. Walk around; typical wrong answers: "10 10" for line 4, "2.5" for 5 / 2, "7" for "5" + 2 and "6" or "33" confusion for 1 + 2 + "3". '
    + 'Answers are on the next slide; all verified by running the code.');
  D.code(s, X0, 1.75, 7.3, 4.75,
    'int a = 7;\nint b = a;\na = 10;\nConsole.WriteLine($"{a} {b}");   // (1)\nConsole.WriteLine(5 / 2);          // (2)\nConsole.WriteLine(5 / 2.0);        // (3)\nConsole.WriteLine("5" + 2);        // (4)\nConsole.WriteLine(1 + 2 + "3");    // (5)\nConsole.WriteLine((int)9.99);      // (6)',
    { fs: 15, title: 'Predict all six lines' });
  D.iconCard(s, 8.1, 1.75, 4.65, 2.3, I.pencil, 'Rules', 'Work alone, on paper, 3 minutes. No computer!', { fs: 15 });
  D.iconCard(s, 8.1, 4.2, 4.65, 2.3, I.question, 'Hint', 'Ask for every line: which TYPES are involved — int, double or string?', { fs: 15, iconFill: C.amberDk });

  // ------------------------------------------------------------------ 39 Quiz 1 answers
  s = D.slide('quiz · answers', 'Quiz 1: Answers',
    'ANSWERS (4 min). (1) b got a COPY of 7; changing a later does not change b. (2) int / int = int, the fraction is dropped. (3) one double operand → double division. '
    + '(4) string + int → the int is converted to text and joined. (5) evaluated left to right: 1 + 2 = 3 (numbers), then 3 + "3" = "33". (6) cast truncates → 9.');
  D.consoleOut(s, X0, 1.75, 4.2, 4.75, '10 7\n2\n2.5\n52\n33\n9', { fs: 20, title: 'Real output' });
  D.table(s, [
    ['#', 'Why'],
    ['1', 'b = a copies the VALUE 7; later a = 10 does not affect b'],
    ['2', 'int / int → int: 2 (fraction dropped)'],
    ['3', 'one operand is double → 2.5'],
    ['4', 'string + number → text is joined: "52"'],
    ['5', 'left to right: 1 + 2 = 3, then 3 + "3" = "33"'],
    ['6', 'cast truncates: (int)9.99 = 9'],
  ], 5.0, 1.75, 7.75, [0.6, 7.15], { fs: 15, rowH: 0.66, align: ['center', 'left'] });

  // ------------------------------------------------------------------ 40 Quiz 2
  s = D.slide('quiz · find the bugs', 'Quiz 2: Find All the Bugs',
    'QUIZ 2 (5 min). The program should read a price and print the total for 2.5 kg including 20 % VAT. There are seven compiler errors on six lines. '
    + 'Interesting fact (verified): the compiler FIRST reports only CS1002 for line 1 — a syntax error stops the checking of types and names. After adding the ; and rebuilding, six more errors appear. '
    + 'Let pairs discuss, then reveal. Answers: line 1 missing ;  line 2 ReadLine returns string; line 3 needs 0.20m; line 4 2.5 does not fit int; line 5 vat vs Vat; line 6 console and total (two errors).');
  D.code(s, X0, 1.75, 7.6, 3.0,
    'Console.Write("Price per kg: ")\ndecimal price = Console.ReadLine();\nconst decimal Vat = 0.20;\nint quantity = 2.5;\ndecimal Total = price * quantity * (1 + vat);\nconsole.WriteLine(total);',
    { fs: 15, title: 'buggy.cs', lineNums: true });
  D.callout(s, X0, 4.95, 7.6, 1.55, I.search_ink, [{ text: 'Goal: ', options: { bold: true } }, { text: 'read the price per kg, buy 2.5 kg, add 20 % KDV, print the total. Find all seven errors on the six lines.' }], { fs: 15 });
  D.iconCard(s, 8.45, 1.75, 4.3, 4.75, I.users, 'Work in pairs', 'For each line: which rule is broken?\n\n• statement syntax\n• string vs number\n• literal suffixes\n• int vs double\n• case sensitivity', { fs: 15 });

  // ------------------------------------------------------------------ 41 Quiz 2 answers
  s = D.slide('quiz · answers', 'Quiz 2: Answers and the Corrected Program',
    'ANSWERS (4 min). Show that the corrected program also needs decimal for quantity (2.5 kg is not whole). The first build reports only CS1002 (syntax errors hide the rest). Errors reported after line 1 is fixed: CS0029, CS0664, CS0266, CS0103 (vat), CS0103 (console), CS0103 (total). '
    + 'Fixed program verified: for input 100 it prints 300.00 (100 × 2.5 × 1.20 = 300). Naming: local variables in camelCase (total), constants PascalCase (Vat).');
  D.table(s, [
    ['Line', 'Error', 'Fix'],
    ['1', 'CS1002  ; expected', 'add ;'],
    ['2', 'CS0029  string → decimal', 'decimal.Parse(Console.ReadLine())'],
    ['3', 'CS0664  double literal', '0.20m'],
    ['4', 'CS0266  double → int', 'decimal quantity = 2.5m;'],
    ['5', 'CS0103  vat ≠ Vat', '(1 + Vat), decimal total'],
    ['6', 'CS0103  console, total', 'Console.WriteLine(total)'],
  ], X0, 1.75, 7.2, [0.6, 2.6, 4.0], { fs: 13, rowH: 0.52, mono: [2], align: ['center', 'left', 'left'] });
  D.code(s, 8.0, 1.75, 4.75, 3.65,
    'Console.Write("Price per kg: ");\ndecimal price =\n    decimal.Parse(Console.ReadLine());\nconst decimal Vat = 0.20m;\ndecimal quantity = 2.5m;\ndecimal total =\n    price * quantity * (1 + Vat);\nConsole.WriteLine($"{total:F2}");',
    { fs: 12, title: 'fixed.cs' });
  D.callout(s, X0, 5.55, 7.2, 0.95, I.lightbulb_ink, 'The first build shows only CS1002: a syntax error hides the other errors. Fix, rebuild, repeat.', { fs: 14 });
  D.consoleOut(s, 8.0, 5.55, 4.75, 0.95, 'Price per kg: [[100]]\n300.00', { fs: 13 });

  // ------------------------------------------------------------------ 42 In-class exercises
  s = D.slide('in-class exercises · 25 min', 'Your Turn: In-Class Exercises',
    'EXERCISES (25 min). Groups of 2. Everyone must create a separate project for each exercise (dotnet new console -n AgeCalc, then apply our two template lines). '
    + 'Expected results for checking: E2 born 2007 → 19 in 2026 (roughly: no birthday check); E3 42.195 km → 26.219 mi (42.195 / 1.609344 = 26.2188…); E4 grades 60, 70, 85 → 71.67; E5 1 h 23 min 20 s → 5000 s. '
    + 'Solutions are in the instructor edition of the notes.');
  const ex = [
    ['E1', 'Choose types', 'Pick a type for: number of pages, fuel price, is a member?, room code "B207", distance in km, initial of your name.', I.boxes],
    ['E2', 'Age calculator', 'Read name and birth year; print "Ayşe, in 2026 you turn 19." Use const int CurrentYear = 2026;', I.user],
    ['E3', 'km → miles', 'Read a distance in km; print miles with 3 decimals. 1 mile = 1.609344 km (const).', I.route],
    ['E4', 'Average of three', 'Read three grades (double); print the average with F2. Remember the Week 1 parentheses bug!', I.graduation],
    ['E5', 'Back to seconds', 'The reverse of 03_09: read hours, minutes and seconds; print the total in seconds (1, 23, 20 → 5000).', I.clock],
    ['E6', 'Swap trace', 'Trace x = 3, y = 8: t = x; x = y; y = t; — then try to swap without t using + and −.', I.exchange],
  ];
  ex.forEach(([k, h, b, ic], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = X0 + col * 4.1, y = 1.75 + row * 2.45;
    D.card(s, x, y, 3.95, 2.3);
    D.circIcon(s, ic, x + 0.2, y + 0.2, 0.62, i % 2 ? C.blue : C.ink);
    T(s, `${k} · ${h}`, { x: x + 0.95, y: y + 0.2, w: 2.9, h: 0.62, fontFace: D.HF, fontSize: 16, bold: true, color: C.ink, valign: 'middle' });
    T(s, b, { x: x + 0.2, y: y + 0.95, w: 3.6, h: 1.3, fontSize: 13, valign: 'top' });
  });

  // ------------------------------------------------------------------ 43 Homework
  s = D.slide('homework · before week 4', 'Homework',
    'HOMEWORK (2 min). Submission: each program as a zipped project folder WITHOUT bin/ and obj/, plus a screenshot of one run, through the channel announced on Telegram. '
    + 'Expected results: H1 r = 3, h = 10 → V = 282.74 cm³ (π·9·10 = 282.743…); H2 1000 TL at a rate of 37.50 TL per euro → 26.67 EUR (1000 / 37.50 = 26.666…); '
    + 'H3 100000 min → 69 days 10 h 40 min; H4: s + 1 is computed as int (32768), the cast back to short wraps it to -32768 (verified). Rates are examples, not live data.');
  D.table(s, [
    ['#', 'Task', 'Practises'],
    ['H1', 'Cylinder volume V = πr²h (read r and h, use Math.PI, print F2)', 'double, Math.PI, F2'],
    ['H2', 'Currency converter: TL → EUR with the rate typed by the user', 'decimal, Parse'],
    ['H3', 'Minutes → days, hours, minutes (e.g. 100000 min)', 'int, / and %'],
    ['H4', 'short s = short.MaxValue;  s = (short)(s + 1);  — predict, run, explain the output', 'overflow, casts'],
    ['H5', 'Read the notes §1–§7 and do 3 exercises from "Extra practice"', 'everything'],
  ], X0, 1.75, CW, [0.8, 8.1, 3.25], { fs: 14, rowH: 0.62, align: ['center', 'left', 'left'] });
  D.callout(s, X0, 5.7, CW, 0.8, I.clipboard_ink, 'Every program: header comment, meaningful names, prompts with Write, output with F2 where needed, tested with 2–3 inputs.', { fs: 14 });

  // ------------------------------------------------------------------ 44 Closing
  D.closingSlide([
    'C# is compiled to IL (dotnet build); the .NET runtime JIT-compiles IL to machine code.',
    'A variable = name + type + value. = stores a value (←); read before assign → CS0165.',
    'Default types: int for whole numbers, double for measurements, decimal for money, string for text/IDs.',
    'const protects fixed values; Math.PI is built in.',
    'ReadLine() returns a string → convert with int.Parse / double.Parse; type a decimal POINT.',
    'Casts truncate, int overflows silently, 9 / 5 == 1 — test with known answers.',
  ], 'Week 4: Arithmetic, Relational and Logical Operators',
    'CLOSING (2 min). Recap the six takeaways. Preview Week 4: we will study / and % properly, operator precedence, Math functions, comparisons and logical operators. '
    + 'Remind students to finish the homework and to post installation problems in the Telegram group before the next lab.');

  const n = await D.save(path.join(__dirname, 'MCMP113_Week03_Variables_DataTypes.pptx'));
  console.log('slides:', n);
})();
