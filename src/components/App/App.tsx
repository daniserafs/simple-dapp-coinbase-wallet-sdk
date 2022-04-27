import "./App.css";
import logo from "../../../src/logo.svg";
import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../../hooks/useWeb3/useWeb3";
import { Disconnected } from "../Disconnected/Disconnected";
import { Connected } from "../Connected/Connected";


function App() {
  const { connectProvider, changeProvider, providerString, account, web3 } =
    useWeb3();
  const [loading, setLoading] = useState(!!providerString);
  const connected = !!account && !!web3;

  useEffect(() => {
    if (connected && loading) setLoading(false);
  }, [connected, loading]);
  const handleConnectProvider = useCallback(
    async (provider) => {
      setLoading(true);
      await connectProvider(provider).finally(() => {
        setLoading(false);
      });
    },
    [connectProvider]
  );

  const handleChangeProvider = useCallback(() => {
    setLoading(true);
    changeProvider();
    setLoading(false);
  }, [changeProvider]);

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            {!connected && (
              <Disconnected handleConnect={handleConnectProvider} />
            )}
            {connected && (
              <Connected
                web3={web3} 
                account={account}
                providerString={providerString}
                handleChangeProvider={handleChangeProvider}
              />
            )}
          </div>
        )}
    </div>
  );
}

export default App;
