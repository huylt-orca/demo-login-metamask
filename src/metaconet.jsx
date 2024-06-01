import React, { useState } from 'react';
import Web3 from 'web3';

const ConnectAndSign = () => {
  const [web3, setWeb3] = useState(null);
  const [signature, setSignature] = useState('');
  const [data, setData] = useState('');
  const [connectedAccount, setConnectedAccount] = useState('');

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setConnectedAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    } else {
      console.error('Please install Metamask to use this application.');
    }
  };

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSign = async () => {
    if (web3) {
      try {
        // Generate a random nonce
        const nonce = Math.floor(Math.random() * 1000000);

        // Convert nonce to hex string
        const nonceHex = web3.utils.toHex(nonce);

        // Sign the data with nonce
        const sig = await web3.eth.personal.sign(data, connectedAccount, nonceHex);
        setSignature(sig);
      } catch (error) {
        console.error('Error signing message:', error);
      }
    } else {
      console.error('Please connect to Metamask first.');
    }
  };

  return (
    <div>
      <h2>Connect to Metamask and Sign Message</h2>
      {!web3 ? (
        <button onClick={connectMetamask}>Connect to Metamask</button>
      ) : (
        <div>
          <p>Connected Account: {connectedAccount}</p>
          <div>
            <label>Message:</label>
            <input type="text" value={data} onChange={handleChange} />
          </div>
          <div>
            <button onClick={handleSign}>Sign Message</button>
          </div>
          {signature && (
            <div>
              <p>Signed Message:</p>
              <p>{signature}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectAndSign;
