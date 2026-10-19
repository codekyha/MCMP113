// MCMP113 · Week 3 · Example 10 — Type limits explorer
// Prints the size (sizeof) and the range (MinValue/MaxValue) of the built-in types, then shows var.
Console.WriteLine($"{"type",-8}{"bytes",6}  {"MinValue",-32}{"MaxValue"}");
Console.WriteLine($"{"byte",-8}{sizeof(byte),6}  {byte.MinValue,-32}{byte.MaxValue}");
Console.WriteLine($"{"short",-8}{sizeof(short),6}  {short.MinValue,-32}{short.MaxValue}");
Console.WriteLine($"{"int",-8}{sizeof(int),6}  {int.MinValue,-32}{int.MaxValue}");
Console.WriteLine($"{"long",-8}{sizeof(long),6}  {long.MinValue,-32}{long.MaxValue}");
Console.WriteLine($"{"float",-8}{sizeof(float),6}  {float.MinValue,-32}{float.MaxValue}");
Console.WriteLine($"{"double",-8}{sizeof(double),6}  {double.MinValue,-32}{double.MaxValue}");
Console.WriteLine($"{"decimal",-8}{sizeof(decimal),6}  {decimal.MinValue,-32}{decimal.MaxValue}");
Console.WriteLine($"{"char",-8}{sizeof(char),6}  {(int)char.MinValue,-32}{(int)char.MaxValue}");
Console.WriteLine($"{"bool",-8}{sizeof(bool),6}  {false,-32}{true}");

// var: the compiler infers the type from the literal on the right-hand side
var a = 42;
var b = 42L;
var c = 4.2;
var d = 4.2f;
var e = 4.2m;
var f = 'x';
var g = "x";
Console.WriteLine();
Console.WriteLine($"42 -> {a.GetType().Name}, 42L -> {b.GetType().Name}, 4.2 -> {c.GetType().Name}");
Console.WriteLine($"4.2f -> {d.GetType().Name}, 4.2m -> {e.GetType().Name}, 'x' -> {f.GetType().Name}, \"x\" -> {g.GetType().Name}");
