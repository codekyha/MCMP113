// MCMP113 · Week 3 · Example 3 — Circle area and circumference
// Uses a named constant (const) and compares it with the built-in Math.PI.
const double Pi = 3.14159;      // our constant: can never change

Console.Write("Radius (cm): ");
double radius = double.Parse(Console.ReadLine());

double area = Pi * radius * radius;          // A = πr²
double circumference = 2 * Pi * radius;      // C = 2πr
double areaExact = Math.PI * radius * radius;

Console.WriteLine($"Area          : {area:F4} cm²");
Console.WriteLine($"Circumference : {circumference:F4} cm");
Console.WriteLine($"Area (Math.PI): {areaExact:F4} cm²");
