// MCMP113 · Week 2 · Example 3 — Even or odd
// Selection with two branches (IF ... THEN ... ELSE): exactly one of the two outputs is printed.

Console.Write("Enter an integer: ");
int n = int.Parse(Console.ReadLine());

if (n % 2 == 0)      // % is the remainder operator (mod)
{
    Console.WriteLine($"{n} is even");
}
else
{
    Console.WriteLine($"{n} is odd");
}
