pragma solidity ^0.4.18; // We have to specify what version of the compiler this code will use

contract Users {

  struct holder {
    address holderAddress; // The address of the holder
    uint tokensBought; // The total no. of tokens Bought due to this holder
  }

  /* mapping is equivalent to an associate array or hash
   The key of the mapping is candidate name stored as type bytes32 and value is
   an unsigned integer which used to store the vote count
   */

  mapping (address => holder) public holderInfo;
  uint public tokenPrice; // Price per token

  // Constructor
  constructor(uint pricePerToken) public {
      tokenPrice = pricePerToken;
  }
  
  function getHolderTokens() view public returns (uint) {
    return (holderInfo[msg.sender].tokensBought);
  }

  function useHolderTokens(uint numTokens) public {
    holderInfo[msg.sender].holderAddress = msg.sender;
    require(holderInfo[msg.sender].tokensBought - numTokens > 0);
    holderInfo[msg.sender].tokensBought -= numTokens;
  }
  
  /* This function is used to purchase the tokens. Note the keyword 'payable'
   below. By just adding that one keyword to a function, your contract can
   now accept Ether from anyone who calls this function. Accepting money can
   not get any easier than this!
   */
  function buy() payable public returns (uint) {
    uint tokensToBuy = msg.value / tokenPrice;
    holderInfo[msg.sender].holderAddress = msg.sender;
    holderInfo[msg.sender].tokensBought += tokensToBuy;
    return tokensToBuy;
  }
}