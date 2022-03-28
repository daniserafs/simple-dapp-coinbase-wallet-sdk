import type Web3 from "web3";
import type { CoinbaseWalletProvider } from "@coinbase/wallet-sdk"

export type EthereumProvider =
| CoinbaseWalletProvider;

export type ProviderStringType = "coinbase";

export type ConnectedReturnType = {
    provider: EthereumProvider;
    web3: Web3;
    accounts: string[];
};