// MCMP113 · Week 3 · Example 5 — Celsius to Fahrenheit
// F = C * 9 / 5 + 32  (the Week 1 exercise F, now in C#).
Console.Write("Temperature in °C: ");
double celsius = double.Parse(Console.ReadLine());

// celsius is a double, so celsius * 9 / 5 is computed as double
double fahrenheit = celsius * 9 / 5 + 32;

Console.WriteLine($"{celsius} °C = {fahrenheit:F1} °F");
