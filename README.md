# MCMP113 · Introduction to Basic Algorithms and Programming

![Language](https://img.shields.io/badge/language-C%23-512BD4)
![.NET](https://img.shields.io/badge/.NET-10%20LTS-512BD4)
![Editor](https://img.shields.io/badge/editor-VS%20Code%20%2B%20C%23%20Dev%20Kit-007ACC)
![Weeks](https://img.shields.io/badge/weeks-15-14213D)
![License](https://img.shields.io/badge/license-MIT-green)

Course materials for **MCMP113 Introduction to Basic Algorithms and Programming**, Istanbul Okan University, Vocational School, 2026–2027 Fall semester.

The course teaches you to think like a programmer. You turn a problem written in everyday language into a precise algorithm, draw it as a flowchart, and then write it as a working **C# console application**. Every week has:

| | What it is | Format |
|---|---|---|
| **Slides** | The lecture presentation, with speaker notes | `.pptx` and `.pdf` |
| **Notes** | Lecture notes: explanations, worked examples, trace tables, an English–Turkish glossary and exercises | `.pdf` |
| **Code** | Every example program from the lecture, ready to run | `.zip` (one .NET 10 project per example) |

---

## Contents

- [Weekly materials](#weekly-materials)
- [Getting started (students)](#getting-started-students)
- [Running the example code](#running-the-example-code)
- [Repository layout](#repository-layout)
- [Course information](#course-information)
- [Conventions used in the materials](#conventions-used-in-the-materials)
- [Contact](#contact)
- [License](#license)

---

## Weekly materials

| Week | Topic | Slides | Notes | Code |
|:---:|---|---|---|---|
| 1 | Course introduction · The concept of an algorithm · Problem-solving steps | [pptx](Week01/MCMP113_Week01_Algorithms_ProblemSolving.pptx) · [pdf](Week01/MCMP113_Week01_Algorithms_ProblemSolving.pdf) | [pdf](Week01/MCMP113_Week01_Notes.pdf) | — (no code yet) |
| 2 | Flowcharts and their symbols · Basic flowchart examples | [pptx](Week02/MCMP113_Week02_Flowcharts.pptx) · [pdf](Week02/MCMP113_Week02_Flowcharts.pdf) | [pdf](Week02/MCMP113_Week02_Notes.pdf) | [zip](Week02/MCMP113_Week02_Code.zip) · 10 programs |
| 3 | Programming languages · Variables · Data types · Constants | [pptx](Week03/MCMP113_Week03_Variables_DataTypes.pptx) · [pdf](Week03/MCMP113_Week03_Variables_DataTypes.pdf) | [pdf](Week03/MCMP113_Week03_Notes.pdf) | [zip](Week03/MCMP113_Week03_Code.zip) · 13 programs |
| 4 | Arithmetic, logical and relational operators | [pptx](Week04/MCMP113_Week04_Operators.pptx) · [pdf](Week04/MCMP113_Week04_Operators.pdf) | [pdf](Week04/MCMP113_Week04_Notes.pdf) | [zip](Week04/MCMP113_Week04_Code.zip) · 14 programs |
| 5 | Decision structures: `if-else`, `if-else if`, `switch-case` | [pptx](Week05/MCMP113_Week05_Decisions.pptx) · [pdf](Week05/MCMP113_Week05_Decisions.pdf) | [pdf](Week05/MCMP113_Week05_Notes.pdf) | [zip](Week05/MCMP113_Week05_Code.zip) · 13 programs |
| 6 | Loops: the `for` loop | [pptx](Week06/MCMP113_Week06_ForLoop.pptx) · [pdf](Week06/MCMP113_Week06_ForLoop.pdf) | [pdf](Week06/MCMP113_Week06_Notes.pdf) | [zip](Week06/MCMP113_Week06_Code.zip) · 13 programs |
| 7 | Loops: `while` and `do-while` | [pptx](Week07/MCMP113_Week07_WhileLoops.pptx) · [pdf](Week07/MCMP113_Week07_WhileLoops.pdf) | [pdf](Week07/MCMP113_Week07_Notes.pdf) | [zip](Week07/MCMP113_Week07_Code.zip) · 12 programs |
| 8 | **Midterm**: review, cheat sheet and practice midterm | [pptx](Week08/MCMP113_Week08_Midterm_Review.pptx) · [pdf](Week08/MCMP113_Week08_Midterm_Review.pdf) | [pdf](Week08/MCMP113_Week08_Notes.pdf) | [zip](Week08/MCMP113_Week08_Code.zip) · 14 programs |
| 9 | One-dimensional arrays: declaration, assignment, element access | [pptx](Week09/MCMP113_Week09_Arrays.pptx) · [pdf](Week09/MCMP113_Week09_Arrays.pdf) | [pdf](Week09/MCMP113_Week09_Notes.pdf) | [zip](Week09/MCMP113_Week09_Code.zip) · 13 programs |
| 10 | Array operations: searching, sorting, finding the maximum/minimum | [pptx](Week10/MCMP113_Week10_ArrayOperations.pptx) · [pdf](Week10/MCMP113_Week10_ArrayOperations.pdf) | [pdf](Week10/MCMP113_Week10_Notes.pdf) | [zip](Week10/MCMP113_Week10_Code.zip) · 13 programs |
| 11 | Multi-dimensional arrays (matrices) | [pptx](Week11/MCMP113_Week11_Matrices.pptx) · [pdf](Week11/MCMP113_Week11_Matrices.pdf) | [pdf](Week11/MCMP113_Week11_Notes.pdf) | [zip](Week11/MCMP113_Week11_Code.zip) · 12 programs |
| 12 | Functions: definition, calling, parameter passing | [pptx](Week12/MCMP113_Week12_Functions.pptx) · [pdf](Week12/MCMP113_Week12_Functions.pdf) | [pdf](Week12/MCMP113_Week12_Notes.pdf) | [zip](Week12/MCMP113_Week12_Code.zip) · 13 programs |
| 13 | Value-returning and `void` functions · Scope · Recursion | [pptx](Week13/MCMP113_Week13_Return_Scope.pptx) · [pdf](Week13/MCMP113_Week13_Return_Scope.pdf) | [pdf](Week13/MCMP113_Week13_Notes.pdf) | [zip](Week13/MCMP113_Week13_Code.zip) · 12 programs |
| 14 | Basic file operations · Semester review · *Student Grade Manager* mini-project | [pptx](Week14/MCMP113_Week14_Files_Review.pptx) · [pdf](Week14/MCMP113_Week14_Files_Review.pdf) | [pdf](Week14/MCMP113_Week14_Notes.pdf) | [zip](Week14/MCMP113_Week14_Code.zip) · 12 programs |
| 15 | **Final**: cumulative review, cheat sheet and practice final | [pptx](Week15/MCMP113_Week15_Final_Review.pptx) · [pdf](Week15/MCMP113_Week15_Final_Review.pdf) | [pdf](Week15/MCMP113_Week15_Notes.pdf) | [zip](Week15/MCMP113_Week15_Code.zip) · 15 programs |

> **Tip:** On GitHub, a `.pdf` opens in the browser. To download a `.pptx` or `.zip`, open the file and press the **Download raw file** button (↓).

---

## Getting started (students)

1. **Before every lecture**, read the slides PDF. **After the lecture**, work through the notes and solve the exercises at the end; they have three difficulty levels (★, ★★, ★★★).
2. **Install the tools once** (all free, before Week 3):
   - [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) extension for VS Code
3. **Check the installation** in a terminal:
   ```
   dotnet --version        # should print 10.0.xxx
   ```
4. Download each week's code zip and **run every example yourself**. Change the inputs, break the code, read the error messages and fix them. That is how programming is learned.

---

## Running the example code

Each `MCMP113_WeekNN_Code.zip` unpacks to one folder:

```
MCMP113_Week09_Code/
├── README.md                    ← what each program shows + sample inputs
├── MCMP113_Week09_Code.sln      ← solution listing all projects (for VS Code)
├── 09_01_ArrayBasics/
│   ├── ArrayBasics.csproj
│   └── Program.cs
├── 09_02_GradeStats/
│   └── ...
└── ...
```

**Run one example from a terminal:**

```
cd MCMP113_Week09_Code/09_02_GradeStats
dotnet run
```

**Or in VS Code:** *File → Open Folder…*, pick the unpacked folder, then in the **Solution Explorer** right-click a project and choose *Debug → Start New Instance*. Use **F9** to set breakpoints and **F10/F11** to step through the code.

Good to know:

- Programs use **top-level statements** (no `class Program` / `static void Main` boilerplate). From Week 12 on, methods are written as local functions at the bottom of `Program.cs`.
- The course project template turns **nullable warnings off** and uses **invariant culture**, so decimal numbers are typed with a **point** (`72.5`), even on Turkish-language Windows.
- Programs that read files (Week 14 onwards) **create their own data files first**. When started with `dotnet run`, the files appear in the project folder.
- Stop a running program with **Ctrl + C**. `bin/` and `obj/` folders are build output and can be deleted at any time.
- Every program was built with **0 errors and 0 warnings** on .NET 10. The console outputs shown in the slides and notes are real runs of this code.

---

## Repository layout

```
.
├── README.md
├── Week01/
│   ├── MCMP113_Week01_Algorithms_ProblemSolving.pptx   ← slides (editable)
│   ├── MCMP113_Week01_Algorithms_ProblemSolving.pdf    ← slides (handout)
│   └── MCMP113_Week01_Notes.pdf                        ← lecture notes
├── Week02/
│   ├── MCMP113_Week02_Flowcharts.pptx
│   ├── MCMP113_Week02_Flowcharts.pdf
│   ├── MCMP113_Week02_Notes.pdf
│   └── MCMP113_Week02_Code.zip                         ← example programs
├── ...
└── Week15/
    ├── MCMP113_Week15_Final_Review.pptx
    ├── MCMP113_Week15_Final_Review.pdf
    ├── MCMP113_Week15_Notes.pdf
    └── MCMP113_Week15_Code.zip
```

---

## Course information

| | |
|---|---|
| **Course** | MCMP113 Introduction to Basic Algorithms and Programming |
| **Institution** | Istanbul Okan University, Vocational School |
| **Semester** | 2026–2027 Fall |
| **Language of instruction** | English |
| **Programming language** | C# (.NET 10, console applications) |
| **Instructor** | Asst. Prof. Hasan Oğuz, PhD |
| **Assessment** | Midterm exam (Week 8) **40 %** · Final exam (Week 15) **60 %** |
| **Announcements** | Course Telegram group (QR code on the first and last slide of every deck) |

### Learning outcomes

By the end of the semester you will be able to:

1. **Think algorithmically:** break a real problem into precise, finite, ordered steps.
2. **Draw and read flowcharts:** express an algorithm visually before writing code.
3. **Write C# console applications** using variables, operators, decisions and loops correctly.
4. **Work with arrays and matrices:** store, search, sort and process collections of data.
5. **Structure programs with functions** that take parameters and return values.
6. **Read and write text files** so that data outlives the program.
7. **Test and debug:** trace code by hand with trace tables and find errors systematically.

### How the weeks build on each other

```
algorithm → flowchart → variables & types → operators → if / switch → for → while / do-while
   → [MIDTERM] → arrays → searching & sorting → matrices → functions → return & scope
   → files + mini-project → [FINAL]
```

The same small examples come back in later weeks: the grade average, the sum $1+2+\dots+N$, Euclid's GCD, guess-the-number and the T.C. Kimlik check digits. Each time they are written with the new tool of that week, so you see the same algorithm in words, as a flowchart, in pseudocode and finally in C#.

---

## Conventions used in the materials

**Pseudocode** (used in slides, notes, homework and exams):

| Keyword | Meaning |
|---|---|
| `START … END` | beginning and end of the algorithm |
| `READ x` / `PRINT …` | input / output |
| `x ← expression` | assignment (in C#: `x = expression;`) |
| `IF … THEN … ELSE … END IF` | selection |
| `WHILE cond … END WHILE` | repetition while the condition is true |
| `FOR i ← a TO b … END FOR` | counted repetition |
| `mod`, `= ≠ < ≤ > ≥`, `AND OR NOT` | remainder, comparison, logic |

> **← assigns, = compares.** In C#, `=` assigns and `==` compares.

**Notes:** every week's notes contain learning outcomes, worked examples with real program output, trace tables, common mistakes, a summary, an **English–Turkish glossary** and graded exercises. In the PDFs, input typed by the user in a console run is printed in **amber**.

---



This repository (slides, notes and example code) is released under the [MIT License](LICENSE).
You may use, copy, modify and redistribute the materials, including for commercial purposes, provided that the copyright notice and the license text are kept.

© 2026 Hasan Oğuz · Istanbul Okan University
