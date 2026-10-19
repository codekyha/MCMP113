// MCMP113 · Week 3 · Example 12 — Reading and converting input
// Console.ReadLine() always returns a string; Parse/Convert turn the text into a number.
Console.Write("Your age: ");
string ageText = Console.ReadLine();   // text, e.g. "19"
int age = int.Parse(ageText);          // number 19

Console.WriteLine($"Text   + 1 = {ageText + 1}");  // joins text
Console.WriteLine($"Number + 1 = {age + 1}");      // adds

Console.Write("Height in m (e.g. 1.75): ");
double height = double.Parse(Console.ReadLine());
Console.WriteLine($"Height in cm: {height * 100}");

Console.Write("Credits this term: ");
int credits = Convert.ToInt32(Console.ReadLine());
Console.WriteLine($"Credits: {credits}");

// Preview (Week 5): TryParse never crashes; it returns a bool.
Console.Write("Lucky number: ");
bool ok = int.TryParse(Console.ReadLine(), out int lucky);
Console.WriteLine($"Success: {ok}, value: {lucky}");
