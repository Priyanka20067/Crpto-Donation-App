// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CryptoDonation {
    address public owner;

    event DonationReceived(address indexed donor, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit DonationReceived(msg.sender, msg.value);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
        emit Withdrawal(owner, balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
