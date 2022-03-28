import Web3 from "web3";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import {
  DEFAULT_CHAIN_ID,
  APP_NAME,
  APP_LOGO_URL,
  INFURA_RPC_URL,
} from "../dappInfo";
import { ConnectedReturnType } from "../../../utils/types";

export const initCoinbaseWalletProvider = () => {
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
    overrideIsMetaMask: false,
  });
  return coinbaseWallet.makeWeb3Provider(INFURA_RPC_URL, DEFAULT_CHAIN_ID);
};

export const connectCoinbaseWallet = async (): Promise<ConnectedReturnType> => {
  const provider = initCoinbaseWalletProvider();
  const web3 = new Web3(provider);
  const accounts: string[] = await provider.request({
    method: "eth_requestAccounts",
  });

  return { provider, web3, accounts };
};
