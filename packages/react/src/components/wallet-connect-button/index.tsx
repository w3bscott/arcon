"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { formatAddress } from "@arcforge/core";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface WalletConnectButtonProps {
  /** Called when the user clicks the connect button. */
  onConnect: () => Promise<void>;
  /** If provided, renders a disconnect affordance when connected. */
  onDisconnect?: () => Promise<void>;
  /** Controlled connected state. */
  isConnected?: boolean;
  /** Controlled loading state. */
  isLoading?: boolean;
  /** The connected wallet address. Displayed truncated. */
  address?: string;
  /** Label for the connect button. @default "Connect Wallet" */
  connectLabel?: string;
  /** Label for the disconnect button. @default "Disconnect" */
  disconnectLabel?: string;
  /** Called when onConnect throws. */
  onError?: (error: Error) => void;
  /** Forwarded to root element. */
  className?: string;
  /** Forwarded to root element. */
  style?: CSSProperties;
  /** Optional children to render inside the connected state. */
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type ComponentState = "disconnected" | "connecting" | "connected" | "error";

function deriveState(
  isConnected?: boolean,
  isLoading?: boolean,
  internalError?: Error | null,
): ComponentState {
  if (isLoading) return "connecting";
  if (isConnected) return "connected";
  if (internalError) return "error";
  return "disconnected";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WalletConnectButton({
  onConnect,
  onDisconnect,
  isConnected,
  isLoading,
  address,
  connectLabel = "Connect Wallet",
  disconnectLabel = "Disconnect",
  onError,
  className,
  style,
}: WalletConnectButtonProps) {
  const [internalError, setInternalError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const state = deriveState(isConnected, isLoading, internalError);

  /* ── Connect handler ──────────────────────────────────────────────── */
  const handleConnect = useCallback(async () => {
    setInternalError(null);
    try {
      await onConnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onConnect, onError]);

  /* ── Disconnect handler ───────────────────────────────────────────── */
  const handleDisconnect = useCallback(async () => {
    if (!onDisconnect) return;
    try {
      await onDisconnect();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setInternalError(error);
      onError?.(error);
    }
  }, [onDisconnect, onError]);

  /* ── Copy-to-clipboard (ref-based timer) ──────────────────────────── */
  const handleCopy = useCallback(() => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
    });
  }, [address]);

  /* ── Render: disconnected ─────────────────────────────────────────── */
  if (state === "disconnected") {
    return (
      <div data-state="disconnected" className={className} style={style}>
        <button
          type="button"
          onClick={handleConnect}
          aria-label="Connect wallet"
        >
          {connectLabel}
        </button>
      </div>
    );
  }

  /* ── Render: connecting ───────────────────────────────────────────── */
  if (state === "connecting") {
    return (
      <div data-state="connecting" className={className} style={style}>
        <button
          type="button"
          disabled
          aria-busy="true"
          aria-label="Connect wallet"
        >
          <span aria-hidden="true">⏳</span> Connecting…
        </button>
      </div>
    );
  }

  /* ── Render: error ────────────────────────────────────────────────── */
  if (state === "error" && internalError) {
    return (
      <div data-state="error" className={className} style={style}>
        <p role="alert">{internalError.message}</p>
        <button
          type="button"
          onClick={handleConnect}
          aria-label="Connect wallet"
        >
          {connectLabel}
        </button>
      </div>
    );
  }

  /* ── Render: connected ────────────────────────────────────────────── */
  return (
    <div data-state="connected" className={className} style={style}>
      {address && (
        <span aria-label={`Connected: ${address}`}>
          {formatAddress(address)}
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Address copied" : "Copy address"}
          >
            {copied ? "Copied" : "📋"}
          </button>
        </span>
      )}

      {onDisconnect && (
        <button
          type="button"
          onClick={handleDisconnect}
          aria-label="Disconnect wallet"
        >
          {disconnectLabel}
        </button>
      )}
    </div>
  );
}

export default WalletConnectButton;
