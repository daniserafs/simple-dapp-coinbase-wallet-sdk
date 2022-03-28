import Web3 from "web3";
import { useCallback, useEffect, useState } from "react";
import { connectWithProvider } from "./connectWithProvider";
import type { EthereumProvider, ProviderStringType } from "../../utils/types";

const LS_KEY = "web3-provider";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [provider, setProvider] = useState<EthereumProvider>();
  const [account, setAccount] = useState<string>();
  const [providerString, setProviderString] = useState<
    ProviderStringType | undefined
  >(window.localStorage.getItem(LS_KEY) as ProviderStringType);

  const changeProvider = useCallback(() => {
    localStorage.removeItem(LS_KEY);
    setProviderString(undefined);
    setProvider(undefined);
    setWeb3(undefined);
    setAccount(undefined);
  }, [provider]);

  const connectProvider = useCallback(
    async (selectedProvider: ProviderStringType) => {
      try {
        const {
          provider: connectedProvider,
          web3: web3Instance,
          accounts,
        } = await connectWithProvider(selectedProvider);
        localStorage.setItem(LS_KEY, selectedProvider);
        setProviderString(selectedProvider);
        setProvider(connectedProvider);
        setWeb3(web3Instance);
        setAccount(accounts[0]);
      } catch {
        console.warn("FAILED TO SIGN IN!");
        changeProvider();
      }
    },
    [changeProvider]
  );

  useEffect(function autoReconnectEffect() {
    const providerString = window.localStorage.getItem(
      LS_KEY
    ) as ProviderStringType;
    setProviderString(providerString);
    if (providerString) {
      connectProvider(providerString).catch(changeProvider);
    }
  }, []);

  useEffect(
    function coinbaseWalletDisconectEffect() {
      const beforeunloadListener = () => {
        if (
          !localStorage.getItem(
            "-walletlink:https://www.walletlink.org:version"
          )
        ) {
          localStorage.removeItem(LS_KEY);
        }
      };

      if (providerString !== "coinbase") {
        removeEventListener("beforeunload", beforeunloadListener);
        return;
      }
      addEventListener("beforeunload", beforeunloadListener);

      return () => {
        removeEventListener("beforeunload", beforeunloadListener);
      };
    },
    [providerString]
  );

  return {
    providerString,
    connectProvider,
    changeProvider,
    account,
    web3,
  };
};
