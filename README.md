# Emporium

While buying a product online, the reviews about the product influences our buying decision. But, a recommendation by a close friend or family member holds a sentimental value. Emporium is an advertisement platform where anyone can post advertisements about their products. Anyone can choose the products that they like and share it on social platform, recommend it to their friends and family and in this process - they also earn  money!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Download](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) Metamask Chrome extension - The application uses the account selected in metamask to operate
    * Create or select an account on ropsten test net 
    * You can buy fake ether from [ropsten faucet](https://faucet.metamask.io/)
    * You can get account and transaction info on [etherscan](https://ropsten.etherscan.io/)
* To deploy any contract on blockchain using truffle you need to specify the **mnemonic** of your HDWallet and your **infura api-key** at their respective placeholders in the file _truffle.js_
* The application uses truffle library to create blockchain development environment.
    * To compile and migrate the contracts on the ropsten blockchain
    ```
    truffle migrate
    ```
    * Since truffle uses webpack, to run the application 
    ```
    npm run dev
    ```

## Built With

* [Node JS with web3.js library](https://web3js.readthedocs.io/en/1.0/getting-started.html) - For integration of web app with blockchain.
* [Remix ide](https://remix.ethereum.org)- For testing, compiling and deploying contracts.
* [Truffle framework](https://truffleframework.com/)-For ethereum blockchain development environment .
* [Solidity](http://solidity.readthedocs.io/en/v0.4.24/)- Creating smart contracts
* [Ropsten testnet](https://ropsten.etherscan.io/)- A testnet  blockchain of Ethereum
* [Metamask ](https://metamask.io/) -For HD wallet

## Authors

* [Samyak Jain](https://github.com/samyak-sopho)
* [Suraj Kumar Mall](https://github.com/surajmall)
* [Arun D Prabhu](https://github.com/adp01)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Detailed [Working of Ethereum](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* Medium [Hello World Voting DApp](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) Tutorial series
* [Tutorial to create and deploy DApp in ethereum](https://medium.com/@merunasgrincalaitis/the-ultimate-end-to-end-tutorial-to-create-and-deploy-a-fully-descentralized-dapp-in-ethereum-18f0cf6d7e0e)