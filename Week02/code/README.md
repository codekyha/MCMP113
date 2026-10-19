# MCMP113 · Week 2 — C# preview programs for the flowchart examples

Each folder is a separate .NET 10 console project (course template: Nullable off, InvariantGlobalization on).
Run with:  `cd <folder>`  then  `dotnet run`.
These are **look-ahead** programs: the C# syntax is taught from Week 3 on. Compare every run with its flowchart in the slides/notes.

| Folder | Flowchart pattern | Sample input |
|---|---|---|
| 02_01_RectangleArea | sequence: area and perimeter | 4.5, 3 |
| 02_02_AbsoluteValue | selection, one branch (IF–THEN) | -7.25 |
| 02_03_EvenOdd | selection, two branches (IF–THEN–ELSE) | 14 / -7 |
| 02_04_PassFail | two-way decision with a boundary (grade >= 50) | 49.5 / 50 |
| 02_05_MaxOfThree | nested decisions vs. running maximum | 4, 9, 7 |
| 02_06_LeapYear | three nested decisions + single condition | 2024, 2026, 1900, 2000 |
| 02_07_SumToN | repetition: sum 1..N (back-edge = while) | 100 / 0 |
| 02_08_Factorial | repetition with a product accumulator (long) | 5 / 20 |
| 02_09_EuclidGcd | loop not controlled by a counter | 48, 18 |
| 02_10_GuessNumber | decision inside a loop (secret fixed at 37) | 50, 25, 37 |
