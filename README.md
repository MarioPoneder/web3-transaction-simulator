# Web3 Transaction Simulator
Simulate a transaction on the current state of the Ethereum mainnet or any other EVM based network and view the outcomes.  
Compatible and tested with [MetaMask](https://metamask.io/), but should work with any Web3 wallet that lets you add a custom network (RPC URL).

## Motivation behind this project
Have you ever sent funds or interacted with a DApp / smart contract using a Web3 wallet?  
Then you know then uneasy feeling when you are about to sign a transaction and worry if the data you provided is correct or
the target smart contract behaves as expected.  
Even if there is no risk of losing funds involved, failed transactions still cost gas!  

As a result of the above reasons, I wanted to create a possibility simulate and review transactions before sending them to the mainnet.

## How does it work?
Simulating a transaction can be broken down into the following steps:
1. Start a local [Hardhat](https://github.com/NomicFoundation/hardhat) network instance which forks the current state of the mainnet.
2. Redirect your Web3 wallet to your local simulator node at `http://localhost:8545` (RPC URL).
3. Execute the transaction and review the outcomes.

## Prerequisites

### Install dependencies
Assuming you have [Node.js](https://nodejs.org) installed, run the following command to install to require packages including Hardhat:
```sh
$ npm install
```

### Web3 API, which network do you want to fork?
In oder for your simulator node to fork the mainnet or any other EVM based network, rename `.env.example` to `.env` and set the *Chain ID*
as well as the *JSON RPC URL* for your target network in the `.env` file.  

In case of the Ethereum mainnet the *Chain ID* is 1 and an API key for the *JSON RPC URL* can be acquired for free at [Infura](https://www.infura.io/).

### Web3 wallet setup
Manually add your local simulator network instance to your Web3 wallet using the properties below:

| Property        | Value                      |
|-----------------|----------------------------|
| Network name    | Transaction Simulator      |
| RPC URL         | `http://localhost:8545`    |
| Chain ID        | see `.env` file, e.g. 1    |
| Currency symbol | depends on chain, e.g. ETH |

_Note that MetaMask already comes with a **Localhost 8548** network preset which can be used, but make sure the **Chain ID** is set accordingly._

## Usage

1. Start your local simulator node by running the following command to get the most recent state of your target network:
```sh
$ npm start
```
2. Switch to your simulator network instance in your Web3 wallet and proceed with the transactions you want to test.
