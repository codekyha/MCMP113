# MCMP113 · Week 3 — Programming Languages · Variables · Data Types · Constants

Each folder is a separate .NET 10 console project (course template: Nullable off, InvariantGlobalization on,
so always type a decimal **point**: `72.5`, not `72,5`).
Run with:  `cd <folder>`  then  `dotnet run`.
Every console transcript in the slides and notes was produced by running these programs with the sample input below.

| Folder | What it shows | Sample input |
|---|---|---|
| 03_01_HelloCard | `Write` vs `WriteLine`, escape sequences `\t \" \\ \n`, verbatim string `@"..."` | Ayşe Yılmaz, Computer Programming |
| 03_02_ClassicHello | the classic `namespace` / `class Program` / `static void Main()` template | (none) |
| 03_03_CircleArea | `const double Pi` vs `Math.PI`, area and circumference, `F4` | 2.5 |
| 03_04_Rectangle | input → process → output with `double` | 4.5, 3 |
| 03_05_CelsiusToFahrenheit | formula with `double`; avoiding the `9 / 5` integer-division trap | 36.6 / 100 / -40 |
| 03_06_Bmi | BMI = weight / height²; parentheses; what `72,5` does with our template | 72.5, 1.78 (and 72,5, 1.78) |
| 03_07_Receipt | `decimal` money, `const decimal VatRate = 0.20m` (KDV), aligned output `{x,10:F2}` | Notebook, 24.90, 3 |
| 03_08_SwapVariables | swapping two variables with a temporary variable | 5, 9 |
| 03_09_SecondsToHms | preview of `/` and `%`: seconds → h:m:s, `D2` padding | 3725 / 86399 |
| 03_10_TypeLimits | `sizeof`, `MinValue` / `MaxValue` of the built-in types; `var` inference | (none) |
| 03_11_CastDemo | implicit widening, explicit casts (truncation), `Convert.ToInt32`, `(byte)300`, silent overflow | (none) |
| 03_12_InputParsing | `ReadLine()` returns a string; `int.Parse`, `double.Parse`, `Convert.ToInt32`, `TryParse` preview | 19, 1.75, 30, 7 (crash demo: nineteen) |
| 03_13_OverflowChecked | `int` wrap-around vs `long` vs `checked(...)` | 100, 23 / 2000000000, 500000000 |
