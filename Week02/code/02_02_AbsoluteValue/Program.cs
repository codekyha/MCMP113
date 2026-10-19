// MCMP113 · Week 2 · Example 2 — Absolute value
// Selection with one branch (IF ... THEN): the "no" exit simply skips the process box.

Console.Write("Enter a number: ");
double x = double.Parse(Console.ReadLine());

if (x < 0)
{
    x = -x;          // "yes" branch: remove the minus sign
}

Console.WriteLine($"Absolute value: {x}");
