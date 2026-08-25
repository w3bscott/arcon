export interface ValidationOptions {
  allowUsernames?: boolean;
}

export function isValidAddress(address?: string, options?: ValidationOptions): boolean {
  if (!address) return false;
  if (address.startsWith("0x")) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
  if (options?.allowUsernames) {
    return /^[a-zA-Z0-9_.-]{3,}$/.test(address);
  }
  return false;
}

export function isValidAmount(amount?: string): boolean {
  if (!amount) return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}
