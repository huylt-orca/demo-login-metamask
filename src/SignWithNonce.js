import React, { useState } from 'react';
import Web3 from 'web3';

const SignWithNonce = () => {
  const [data, setData] = useState('');
  const [signature, setSignature] = useState('');

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleSign = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        // Generate a random nonce
        const nonce = Math.floor(Math.random() * 1000000);

        // Convert nonce to hex string
        const nonceHex = web3.utils.toHex(nonce);

        // Sign the data with nonce
        const sig = await web3.eth.personal.sign(data, account, nonceHex);

        setSignature(sig);
      } catch (error) {
        console.error('Error signing message:', error);
      }
    } else {
      console.error('Please install Metamask to sign messages.');
    }
  };

  return (
    <div>
      <h2>Sign Message with Nonce</h2>
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
  );
};

export default SignWithNonce;
