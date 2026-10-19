// MCMP113 · Week 3 · Example 7 — A simple receipt with KDV (VAT)
// Money is stored as decimal (exact in base 10); the VAT rate is a named constant.
const decimal VatRate = 0.20m;      // KDV 20 %  (m = decimal)

Console.Write("Product name        : ");
string product = Console.ReadLine();
Console.Write("Unit price (TL, net): ");
decimal unitPrice = decimal.Parse(Console.ReadLine());
Console.Write("Quantity            : ");
int quantity = int.Parse(Console.ReadLine());

decimal subtotal = unitPrice * quantity;  // int -> decimal
decimal vat = subtotal * VatRate;
decimal total = subtotal + vat;

Console.WriteLine("--------------------------------");
Console.WriteLine($"{product,-12} {quantity,3} x {unitPrice,8:F2}");
Console.WriteLine($"{"Subtotal",-18} {subtotal,10:F2} TL");
Console.WriteLine($"{"KDV 20%",-18} {vat,10:F2} TL");
Console.WriteLine($"{"TOTAL",-18} {total,10:F2} TL");
