// Normalizes a Jordanian phone number to international E.164-ish form
// (+9627XXXXXXXX). Returns null if the input doesn't look like a Jordanian
// mobile number — callers should treat that as a validation failure.
export function normalizeJordanPhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");

  let national: string | null = null;

  if (digits.startsWith("+962")) {
    national = digits.slice(4);
  } else if (digits.startsWith("00962")) {
    national = digits.slice(5);
  } else if (digits.startsWith("962")) {
    national = digits.slice(3);
  } else if (digits.startsWith("0")) {
    national = digits.slice(1);
  } else {
    national = digits;
  }

  // Jordanian mobile numbers: 7X XXX XXXX (9 digits, starts with 7)
  if (!/^7\d{8}$/.test(national)) return null;

  return `+962${national}`;
}
