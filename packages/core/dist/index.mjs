// src/formatters/index.ts
function formatAddress(address, startChars = 6, endChars = 4) {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}\u2026${address.slice(-endChars)}`;
}
export {
  formatAddress
};
//# sourceMappingURL=index.mjs.map