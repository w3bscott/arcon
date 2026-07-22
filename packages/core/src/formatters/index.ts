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

export function formatBalance(amount?: string): string {
  if (!amount) return "0.00";
  const num = parseFloat(amount);
  return isNaN(num) ? "0.00" : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 });
}

export function formatChainName(chain?: string): string {
  if (!chain) return "";
  return chain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatFee(fee?: string, token?: string): string {
  if (!fee || parseFloat(fee) === 0) return "Free";
  return `${fee} ${token || ""}`.trim();
}
