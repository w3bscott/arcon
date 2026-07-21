import * as _arc_ui_core from '@arc-ui/core';
import { BalanceStoreOptions, AppKit, BridgeResult, BridgeStep, SpendResult, Sources, SupportedTokenInput, GetBalancesResult, SendStoreState, SwapResult, SwapStoreState, BridgeStoreState } from '@arc-ui/core';
export * from '@arc-ui/core';
import * as react from 'react';
import { CSSProperties, ReactNode } from 'react';

interface UseBalancesOptions extends BalanceStoreOptions {
    refreshInterval?: number | undefined;
}
declare function useBalances({ refreshInterval, ...storeOptions }: UseBalancesOptions): {
    status: "idle" | "loading" | "success" | "error";
    data: _arc_ui_core.GetBalancesResult | undefined;
    error: Error | undefined;
    refetch: () => Promise<_arc_ui_core.BalanceStoreState>;
};

declare function useSend(kit: AppKit): {
    getEstimate: (params: _arc_ui_core.SendParams) => Promise<void>;
    send: (params: _arc_ui_core.SendParams) => Promise<void>;
    reset: () => void;
    status: "idle" | "estimating" | "sending" | "success" | "error";
    estimate?: _arc_ui_core.SendEstimateResult | undefined;
    result?: _arc_ui_core.BridgeStep | undefined;
    error?: Error | undefined;
};

declare function useSwap(kit: AppKit): {
    getEstimate: (params: _arc_ui_core.SwapParams) => Promise<void>;
    swap: (params: _arc_ui_core.SwapParams) => Promise<void>;
    reset: () => void;
    status: "idle" | "estimating" | "swapping" | "success" | "error";
    estimate?: _arc_ui_core.SwapEstimate | undefined;
    result?: _arc_ui_core.SwapResult | undefined;
    error?: Error | undefined;
};

declare function useBridge(kit: AppKit): {
    getEstimate: (params: _arc_ui_core.BridgeParams) => Promise<void>;
    bridge: (params: _arc_ui_core.BridgeParams) => Promise<void>;
    reset: () => void;
    status: "idle" | "estimating" | "bridging" | "success" | "error";
    estimate?: _arc_ui_core.BridgeEstimate | undefined;
    result?: _arc_ui_core.BridgeResult | undefined;
    error?: Error | undefined;
};

interface WalletConnectButtonProps {
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
declare function WalletConnectButton({ onConnect, onDisconnect, isConnected, isLoading, address, connectLabel, disconnectLabel, onError, className, style, }: WalletConnectButtonProps): react.JSX.Element;

interface TransactionStatusProps {
    bridgeResult?: BridgeResult | undefined;
    sendResult?: BridgeStep | undefined;
    spendResult?: SpendResult | undefined;
    txHash?: string | undefined;
    explorerUrl?: string | undefined;
    operationType?: "send" | "bridge" | "swap" | "spend" | "deposit";
    onComplete?: () => void;
    onError?: (error: unknown) => void;
    className?: string;
    style?: CSSProperties;
}
declare function TransactionStatus({ bridgeResult, sendResult, spendResult, txHash, explorerUrl, operationType, onComplete, onError, className, style, }: TransactionStatusProps): react.JSX.Element;

interface BalanceCardProps {
    kit?: AppKit;
    sources?: Sources;
    token?: SupportedTokenInput;
    includePending?: boolean;
    networkType?: "mainnet" | "testnet";
    refreshInterval?: number;
    onBalanceFetched?: (result: GetBalancesResult) => void;
    onError?: (error: Error) => void;
    renderChainIcon?: (chain: string) => ReactNode;
    data?: GetBalancesResult;
    className?: string;
    style?: CSSProperties;
}
declare function BalanceCard({ kit, sources, token, includePending, networkType, refreshInterval, onBalanceFetched, onError, renderChainIcon, data: injectedData, className, style, }: BalanceCardProps): react.JSX.Element | null;

interface SendMoneyFormProps {
    kit?: AppKit;
    chain?: string;
    token?: string;
    defaultRecipient?: string;
    defaultAmount?: string;
    onSuccess?: (result: BridgeStep) => void;
    onError?: (error: Error) => void;
    data?: SendStoreState;
    className?: string;
    style?: CSSProperties;
}
declare function SendMoneyForm({ kit, chain, token, defaultRecipient, defaultAmount, onSuccess, onError, data: injectedData, className, style, }: SendMoneyFormProps): react.JSX.Element;

interface SwapWidgetProps {
    kit?: AppKit;
    chain?: string;
    defaultTokenIn?: string;
    defaultTokenOut?: string;
    defaultAmountIn?: string;
    onSuccess?: (result: SwapResult) => void;
    onError?: (error: Error) => void;
    data?: SwapStoreState;
    className?: string;
    style?: CSSProperties;
}
declare function SwapWidget({ kit, chain, defaultTokenIn, defaultTokenOut, defaultAmountIn, onSuccess, onError, data: injectedData, className, style, }: SwapWidgetProps): react.JSX.Element;

interface BridgeWidgetProps {
    kit?: AppKit;
    defaultChainFrom?: string;
    defaultChainTo?: string;
    defaultToken?: string;
    defaultAmount?: string;
    onSuccess?: (result: BridgeResult) => void;
    onError?: (error: Error) => void;
    data?: BridgeStoreState;
    className?: string;
    style?: CSSProperties;
}
declare function BridgeWidget({ kit, defaultChainFrom, defaultChainTo, defaultToken, defaultAmount, onSuccess, onError, data: injectedData, className, style, }: BridgeWidgetProps): react.JSX.Element;

interface RegistryItem {
    name: string;
    type: "registry:block";
    title: string;
    description: string;
    dependencies: string[];
    files: {
        path: string;
        type: "registry:component";
    }[];
}
declare const registry: Record<string, RegistryItem>;

export { BalanceCard, type BalanceCardProps, BridgeWidget, type BridgeWidgetProps, type RegistryItem, SendMoneyForm, type SendMoneyFormProps, SwapWidget, type SwapWidgetProps, TransactionStatus, type TransactionStatusProps, type UseBalancesOptions, WalletConnectButton, type WalletConnectButtonProps, registry, useBalances, useBridge, useSend, useSwap };
