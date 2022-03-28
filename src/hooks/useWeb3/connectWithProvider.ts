import { connectCoinbaseWallet } from "./connectors/coinbaseWallet";
import type {
  ConnectedReturnType,
  ProviderStringType,
} from "../../utils/types";

export const connectWithProvider = async (
  providerString: ProviderStringType
): Promise<ConnectedReturnType> => connectors[providerString]();

const connectors: Record<
  ProviderStringType,
  () => Promise<ConnectedReturnType>
> = {
  coinbase: connectCoinbaseWallet,
};
