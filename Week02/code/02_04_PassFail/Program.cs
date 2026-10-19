// MCMP113 · Week 2 · Example 4 — Grade: PASS or FAIL
// Two-way decision with a boundary: exactly 50 must be a pass, so the condition is grade >= 50.

Console.Write("Grade (0-100): ");
double grade = double.Parse(Console.ReadLine());

if (grade >= 50)
{
    Console.WriteLine("PASS");
}
else
{
    Console.WriteLine("FAIL");
}
