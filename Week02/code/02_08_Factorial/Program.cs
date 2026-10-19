// MCMP113 · Week 2 · Example 8 — Factorial N! = 1 x 2 x ... x N
// Same loop shape as the sum, but the accumulator starts at 1 and multiplies (long holds up to 20!).

Console.Write("N = ");
int n = int.Parse(Console.ReadLine());

long factorial = 1;
int i = 1;
while (i <= n)
{
    factorial = factorial * i;
    i = i + 1;
}

Console.WriteLine($"{n}! = {factorial}");
