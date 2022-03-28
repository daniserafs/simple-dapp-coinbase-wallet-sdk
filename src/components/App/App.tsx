import './App.css';
import logo from '../../../src/logo.svg';
import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../../hooks/useWeb3/useWeb3';
import { Disconnected } from '../Disconnected/Disconnected';
import { Connected } from '../Connected/Connected';
import type { ProviderStringType } from '../../utils/types'


function App() {
  const [count, setCount] = useState(0)
  const { connectProvider, changeProvider, providerString, account, web3 } = useWeb3();
  const [loading, setLoading] = useState(!!providerString);
  const connected = !!account && !!web3;

  useEffect(() => {
    if(connected && loading) setLoading(false);
  },[connected, loading]);
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
  }, [changeProvider])

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" /> 
        {loading ? (
          <p>loading...</p>
        ) : (
          <div>
            {!connected && <Disconnected handleConnect={handleConnectProvider} />}
            {connected && (
              <Connected
              web3={web3}
              account={account}
              providerString={providerString}
              handleChangeProvider={handleChangeProvider} />
            )}
          </div>
        )}
        
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
