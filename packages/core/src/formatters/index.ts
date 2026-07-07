/**
 * Truncates a blockchain address to a human-readable format.
 * Example: "0x1234567890abcdef1234567890abcdef12345678" → "0x1234…5678"
 *
 * @param address - The full address string
 * @param startChars - Number of characters to show at the start (default: 6)
 * @param endChars - Number of characters to show at the end (default: 4)
 * @returns The truncated address string, or the original if it's too short to truncate
 */
export function formatAddress(
  address: string,
  startChars = 6,
  endChars = 4,
): string {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}…${address.slice(-endChars)}`;
}
