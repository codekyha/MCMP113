// MCMP113 · Week 3 · Example 6 — Body Mass Index
// BMI = weight / height² (kg, m). The BMI categories come in Week 5 (if-else).
Console.Write("Weight (kg): ");
double weight = double.Parse(Console.ReadLine());
Console.Write("Height (m) : ");
double height = double.Parse(Console.ReadLine());

// parentheses: divide by the SQUARE of the height
double bmi = weight / (height * height);

Console.WriteLine($"BMI = {bmi:F1} kg/m²");
