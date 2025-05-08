export const CONTRACT_ADDRESS = "0xYourNewContractAddress";
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
