// MCMP113 · Week 2 · Example 6 — Leap year
// Three nested decisions (the flowchart), checked against the equivalent single condition.

Console.Write("Year: ");
int year = int.Parse(Console.ReadLine());

if (year % 4 == 0)
{
    if (year % 100 == 0)
    {
        if (year % 400 == 0)
        {
            Console.WriteLine($"{year} is a leap year");
        }
        else
        {
            Console.WriteLine($"{year} is not a leap year");
        }
    }
    else
    {
        Console.WriteLine($"{year} is a leap year");
    }
}
else
{
    Console.WriteLine($"{year} is not a leap year");
}

// The same rule as ONE condition (&& = AND, || = OR, != = "not equal")
bool leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
Console.WriteLine($"Single-condition check: {leap}");
