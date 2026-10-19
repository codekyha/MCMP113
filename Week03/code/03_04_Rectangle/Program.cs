// MCMP113 · Week 3 · Example 4 — Rectangle area and perimeter
// Input -> Process -> Output with double variables.
Console.Write("Width  (m): ");
double width = double.Parse(Console.ReadLine());
Console.Write("Height (m): ");
double height = double.Parse(Console.ReadLine());

double area = width * height;
double perimeter = 2 * (width + height);

Console.WriteLine($"Area      = {area} m²");
Console.WriteLine($"Perimeter = {perimeter} m");
