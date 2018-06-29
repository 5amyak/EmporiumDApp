pragma solidity ^0.4.18; // We have to specify what version of the compiler this code will use

contract Products {
  // We use the struct datatype to store the influencer information.
  struct product {
    address adAddress; // The address of the advertiser
    string productText;
    string img_link;
    string title;
    string productLink;
    uint pricePerInfluence;
    uint noOfInfluences;
  }

  /* mapping is equivalent to an associate array or hash
   The key of the mapping is candidate name stored as type bytes32 and value is
   an unsigned integer which used to store the vote count
   */

   mapping (uint => product) public productInfo;
   uint public totProducts;

  // Constructor
  constructor() public {
    totProducts = 0;
  }
  
  function getDetails(uint pro) view public returns (address, uint, string, string, string, string, uint) { // returns pricePerInfluence
    return (productInfo[pro].adAddress,productInfo[pro].pricePerInfluence,productInfo[pro].img_link,productInfo[pro].productText,productInfo[pro].productLink,productInfo[pro].title,productInfo[pro].noOfInfluences);    
  }


  function decInfluences(uint pro) public {
    productInfo[pro].noOfInfluences -= 1;
  }

  function addProduct(string productText, string img_link, string title, string productLink, uint pricePerInfluence,uint noOfInfluences) public {
    totProducts += 1;
    productInfo[totProducts].adAddress = msg.sender;
    productInfo[totProducts].productText = productText;
    productInfo[totProducts].img_link = img_link;
    productInfo[totProducts].title = title;
    productInfo[totProducts].productLink = productLink;
    productInfo[totProducts].pricePerInfluence = pricePerInfluence;
    productInfo[totProducts].noOfInfluences = noOfInfluences;
  }

}