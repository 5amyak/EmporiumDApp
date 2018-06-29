pragma solidity ^0.4.18; // We have to specify what version of the compiler this code will use

contract Products {
  function getDetails(uint) view public returns (address,uint,string,string,string,string) {}
  function decInfluences(uint) public {}
}

contract Influencers {

  // We use the struct datatype to store the influencer information.
  struct influencer {
    address influencerAddress; // The address of the influencer
    uint influenceCounter;    // The total no. of links visited due to this influencer
    uint moneyEarned;
  }

  /* mapping is equivalent to an associate array or hash
   The key of the mapping is candidate name stored as type bytes32 and value is
   an unsigned integer which used to store the vote count
   */

   mapping (address => influencer) public influencerInfo;
   address productAddress;

  // Constructor
   constructor(address addr) public {
    productAddress=addr;
  }
  
  function getCounter(address inf) view public returns (uint) {
    return (influencerInfo[inf].influenceCounter);
  }
  
  function updateCounter(address inf, uint pid) public {
    influencerInfo[inf].influencerAddress = inf;
    influencerInfo[inf].influenceCounter += 1;
    Products(productAddress).decInfluences(pid);
    uint pricePerInfluence;
    (,pricePerInfluence,,,,) = Products(productAddress).getDetails(pid);
    influencerInfo[inf].moneyEarned += pricePerInfluence;
  }

  function getMoneyEarned(address inf)view public returns(uint){
    return (influencerInfo[inf].moneyEarned);
  }

  function addInfluencer() public{
    address inf = msg.sender;
    influencerInfo[inf].influenceCounter=0;
    influencerInfo[inf].moneyEarned=0;
  }
}