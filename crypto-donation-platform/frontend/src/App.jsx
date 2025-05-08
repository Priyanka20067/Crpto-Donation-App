import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI, SUPPORTED_TOKENS } from './config';
import { logDonation } from './firebase';
import './App.css';

export default function App() {
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('ETH');
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    setConnected(true);
  };

  const handleDonate = async () => {
    if (!connected) return alert("Connect your wallet first");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    let tx;
    try {
      if (token === 'ETH') {
        tx = await signer.sendTransaction({
          to: CONTRACT_ADDRESS,
          value: ethers.parseEther(amount),
        });
        await tx.wait();
      } else {
        const { address, decimals } = SUPPORTED_TOKENS[token];
        const erc20 = new ethers.Contract(address, ["function approve(address,uint256) public returns(bool)"], signer);
        const amt = ethers.parseUnits(amount, decimals);
        // Approve token transfer
        let approval = await erc20.approve(CONTRACT_ADDRESS, amt);
        await approval.wait();
        // Donate token
        tx = await contract.donateToken(address, amt);
        await tx.wait();
      }
      setMessage(`✅ Donation successful! TX: ${tx.hash}`);
      await logDonation({
        donor: await signer.getAddress(),
        amount: amount,
        token,
        txHash: tx.hash
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Donation failed");
    }
  };

  return (
    <div className="app">
      <h1>🌍 Crypto Donation</h1>
      <button onClick={connectWallet}>
        {connected ? '✅ Wallet Connected' : '🔌 Connect Wallet'}
      </button>

      <div className="form-group">
        <label>Token:</label>
        <select value={token} onChange={e => setToken(e.target.value)}>
          <option value="ETH">ETH</option>
          {Object.keys(SUPPORTED_TOKENS).map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Amount:</label>
        <input
          type="text"
          placeholder="e.g. 0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleDonate}>Donate</button>
      <p>{message}</p>
    </div>
  );
}
