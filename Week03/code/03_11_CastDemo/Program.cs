// MCMP113 · Week 3 · Example 11 — Type conversions
// Implicit widening, explicit casts (truncation), rounding with Convert, and silent overflow.
int count = 7;
long bigCount = count;     // implicit: int -> long always fits
double ratio = count;      // implicit: int -> double
Console.WriteLine($"int {count} -> long {bigCount} -> double {ratio}");

double price = 3.99;
int truncated = (int)price;            // cast: fraction CUT OFF
int rounded = Convert.ToInt32(price);  // Convert: rounds
Console.WriteLine($"(int){price} = {truncated}");
Console.WriteLine($"Convert.ToInt32({price}) = {rounded}");

double negative = -3.99;
Console.WriteLine($"(int){negative} = {(int)negative}");

double precise = 1.0 / 3;
float lessPrecise = (float)precise;    // fewer digits kept
Console.WriteLine($"double {precise} -> float {lessPrecise}");

int big = 300;
byte small = (byte)big;    // 300 does not fit in 0..255
Console.WriteLine($"(byte){big} = {small}");

int max = int.MaxValue;
int wrapped = max + 1;     // no error: wraps to the minimum!
Console.WriteLine($"{max} + 1 = {wrapped}");
