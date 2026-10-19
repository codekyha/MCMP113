// MCMP113 · Week 2 · Example 7 — Sum 1 + 2 + ... + N
// Repetition: the arrow from "i <- i + 1" back to the decision becomes a while loop.

Console.Write("N = ");
int n = int.Parse(Console.ReadLine());

int sum = 0;
int i = 1;
while (i <= n)       // decision box: "yes" enters the loop body
{
    sum = sum + i;
    i = i + 1;       // update: without it the loop never ends
}

Console.WriteLine($"Sum 1..{n} = {sum}");
