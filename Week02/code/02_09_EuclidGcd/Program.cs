// MCMP113 · Week 2 · Example 9 — Euclid's greatest common divisor (Week 1 algorithm)
// Loop whose condition (b != 0) is not a counter: it ends because b gets smaller in every pass.

Console.Write("a = ");
int a = int.Parse(Console.ReadLine());
Console.Write("b = ");
int b = int.Parse(Console.ReadLine());

while (b != 0)
{
    int r = a % b;   // r <- a mod b
    a = b;
    b = r;
}

Console.WriteLine($"GCD = {a}");
