import { describe, expect, it } from "vitest";
import { isValidAddress, isValidAmount } from "../src/validators";

describe("isValidAddress", () => {
  it("accepts valid EVM addresses", () => {
    expect(isValidAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")).toBe(true);
    expect(isValidAddress("0x0000000000000000000000000000000000000000")).toBe(true);
  });

  it("rejects invalid EVM addresses", () => {
    expect(isValidAddress("0x123")).toBe(false);
    expect(isValidAddress("0xG1C7656EC7ab88b098defB751B7401B5f6d8976F")).toBe(false); // G is invalid hex
    expect(isValidAddress("")).toBe(false);
  });

  it("rejects usernames by default", () => {
    expect(isValidAddress("vitalik.eth")).toBe(false);
    expect(isValidAddress("alice")).toBe(false);
  });

  it("accepts usernames when allowUsernames is true", () => {
    expect(isValidAddress("vitalik.eth", { allowUsernames: true })).toBe(true);
    expect(isValidAddress("alice", { allowUsernames: true })).toBe(true);
  });
});

describe("isValidAmount", () => {
  it("accepts valid positive numbers", () => {
    expect(isValidAmount("10.5")).toBe(true);
    expect(isValidAmount("0.0001")).toBe(true);
    expect(isValidAmount("100")).toBe(true);
  });

  it("rejects zero or negative numbers", () => {
    expect(isValidAmount("0")).toBe(false);
    expect(isValidAmount("-5")).toBe(false);
  });

  it("rejects invalid numeric strings", () => {
    expect(isValidAmount("abc")).toBe(false);
    expect(isValidAmount("")).toBe(false);
  });
});
