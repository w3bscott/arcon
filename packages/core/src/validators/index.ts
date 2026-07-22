export function isValidAddress(address?: string): boolean {
  if (!address) return false;
  // Simple check for hex-like address or length for mock purposes
  return address.length >= 32;
}

export function isValidAmount(amount?: string): boolean {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}
