// MCMP113 · Week 2 · Example 1 — Rectangle area and perimeter
// Sequence: every box of the flowchart runs exactly once, top to bottom. (Preview: syntax from Week 3.)

Console.Write("Width: ");
double width = double.Parse(Console.ReadLine());    // input
Console.Write("Height: ");
double height = double.Parse(Console.ReadLine());   // input

double area = width * height;                       // process
double perimeter = 2 * (width + height);            // process

Console.WriteLine($"Area: {area}");                 // output
Console.WriteLine($"Perimeter: {perimeter}");       // output
