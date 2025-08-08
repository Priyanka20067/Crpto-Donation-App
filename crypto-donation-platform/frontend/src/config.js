export const CONTRACT_ADDRESS = "0xBf8167c7D6569a1C60EfAF91328D1d83B0a137aB";
export const CONTRACT_ABI = [
  "function withdrawETH() public",
  "function withdrawToken(address) public",
  "function getBalanceETH() public view returns (uint256)",
  "function donateToken(address,uint256) public",
  "receive() external payable",
  "event DonationReceivedETH(address indexed donor,uint256 amount)",
  "event DonationReceivedToken(address indexed donor,address indexed token,uint256 amount)"
];

// Example ERC20 token you support (USDT on Sepolia)
export const SUPPORTED_TOKENS = {
  USDT: {
    address: "0xYourUSDTTestnetAddress",
    decimals: 6
  }
};
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]