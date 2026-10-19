// MCMP113 · Week 2 · Example 10 — Guess the number
// A loop with a decision inside it: repeat "read, compare, give a hint" until the guess is right.

int secret = 37;   // fixed for now (random number in Week 7)

Console.Write("Your guess: ");
int guess = int.Parse(Console.ReadLine());

while (guess != secret)
{
    if (guess < secret)
    {
        Console.WriteLine("Higher!");
    }
    else
    {
        Console.WriteLine("Lower!");
    }
    Console.Write("Your guess: ");
    guess = int.Parse(Console.ReadLine());   // read again
}

Console.WriteLine("Correct!");
