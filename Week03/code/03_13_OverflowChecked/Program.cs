// MCMP113 · Week 3 · Example 13 — Overflow: silent wrap-around vs. checked
// Without checked the result silently wraps around; with checked the program stops with an error.
Console.Write("Start value: ");
int start = int.Parse(Console.ReadLine());
Console.Write("Add        : ");
int step = int.Parse(Console.ReadLine());

int silent = start + step;             // may wrap around
Console.WriteLine($"int     : {silent}");

long exact = (long)start + step;       // long has room
Console.WriteLine($"long    : {exact}");

int safe = checked(start + step);      // throws on overflow
Console.WriteLine($"checked : {safe}");
