// MCMP113 · Week 3 · Example 8 — Swapping two variables
// A third (temporary) variable is needed, like swapping the drinks in two glasses.
Console.Write("a = ");
int a = int.Parse(Console.ReadLine());
Console.Write("b = ");
int b = int.Parse(Console.ReadLine());
Console.WriteLine($"Before: a = {a}, b = {b}");

int temp = a;    // 1) save a copy of a
a = b;           // 2) overwrite a with b
b = temp;        // 3) b gets the saved copy

Console.WriteLine($"After : a = {a}, b = {b}");
