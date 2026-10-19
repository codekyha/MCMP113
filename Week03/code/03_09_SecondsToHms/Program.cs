// MCMP113 · Week 3 · Example 9 — Seconds to hours:minutes:seconds
// Preview of Week 4: integer division (/) and remainder (%).
Console.Write("Total seconds: ");
int totalSeconds = int.Parse(Console.ReadLine());

int hours = totalSeconds / 3600;         // whole hours
int minutes = totalSeconds % 3600 / 60;  // leftover minutes
int seconds = totalSeconds % 60;         // leftover seconds

Console.WriteLine($"{hours} h {minutes} min {seconds} s");
Console.WriteLine($"Clock: {hours:D2}:{minutes:D2}:{seconds:D2}");
