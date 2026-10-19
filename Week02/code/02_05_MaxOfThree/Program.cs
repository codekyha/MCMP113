// MCMP113 · Week 2 · Example 5 — Maximum of three numbers
// Two designs for the same problem: nested decisions vs. a running "largest so far".

Console.Write("a = ");
int a = int.Parse(Console.ReadLine());
Console.Write("b = ");
int b = int.Parse(Console.ReadLine());
Console.Write("c = ");
int c = int.Parse(Console.ReadLine());

// Method 1: nested decisions (the flowchart on the slide)
if (a > b)
{
    if (a > c)
    {
        Console.WriteLine($"Method 1 (nested): {a}");
    }
    else
    {
        Console.WriteLine($"Method 1 (nested): {c}");
    }
}
else
{
    if (b > c)
    {
        Console.WriteLine($"Method 1 (nested): {b}");
    }
    else
    {
        Console.WriteLine($"Method 1 (nested): {c}");
    }
}

// Method 2: keep the largest value seen so far
int max = a;
if (b > max)
{
    max = b;
}
if (c > max)
{
    max = c;
}
Console.WriteLine($"Method 2 (running max): {max}");
