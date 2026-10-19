// MCMP113 · Week 3 · Example 1 — Hello and a personal card
// Shows Console.Write vs WriteLine, escape sequences (\t \" \\ \n) and a verbatim string @"...".
Console.WriteLine("Hello, Okan!");

Console.Write("Enter your name: ");     // cursor stays on this line
string name = Console.ReadLine();
Console.Write("Enter your programme: ");
string programme = Console.ReadLine();

Console.WriteLine();                    // an empty line
Console.WriteLine("===== STUDENT CARD =====");
Console.WriteLine($"Name:\t{name}");    // \t = tab
Console.WriteLine($"Prog.:\t{programme}");
Console.WriteLine("Motto:\t\"Code, test, repeat.\"");  // \" = "
Console.WriteLine("Folder:\tC:\\MCMP113\\Week03");     // \\ = \
Console.WriteLine(@"Same:   C:\MCMP113\Week03");  // verbatim
Console.Write("Line 1\nLine 2\n");                // \n = new line
