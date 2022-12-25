# Web3 Transaction Simulator [![Open in Gitpod][gitpod-badge]][gitpod]

[gitpod]: https://gitpod.io/#https://github.com/MarioPoneder/web3-transaction-simulator
[gitpod-badge]: https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-FFB45B?logo=gitpod

Simulate a transaction on the current state of the Ethereum mainnet or any other EVM based network and view the outcomes.  
Compatible and tested with [MetaMask](https://metamask.io/), but should work with any Web3 wallet that lets you add a custom network (RPC URL).

## Motivation behind this project
Have you ever sent funds or interacted with a DApp / smart contract using a Web3 wallet?  
Then you know the uneasy feeling when you are about to sign a transaction and worry if the data you provided is correct or
the target smart contract behaves as expected.  
Even if there is no risk of losing funds involved, failed transactions still cost gas!  

As a result of the above reasons, I wanted to create a possibility simulate and review transactions before sending them to the mainnet.

## How does it work?
Simulating a transaction can be broken down into the following steps:
1. Start a [Accelerated Hardhat](https://github.com/MarioPoneder/accelerated-hardhat) network instance which forks the current state of the mainnet.
2. Redirect your Web3 wallet to your simulator node at `http://localhost:8545` (RPC URL).
3. Execute the transaction and review the outcomes.

## Usage with [GitPod](https://gitpod.io)

Why bother with installing Node.js and further dependencies when you can just run this project online with one click?  

1. [![Open in Gitpod][gitpod-badge]][gitpod]
2. Set up the `.env` file, see [Web3 API, which network do you want to fork?](#web3-api-which-network-do-you-want-to-fork)
3. In in the Terminal tab: run with `npm start`
4. Switch to the Ports tab: click on "Copy URL" (should be something like https://8545-marioponede-web3transac-g10ktz7lo5e.ws-eu80.gitpod.io) and "Make public"
5. Proceed with the [Web3 wallet setup](#web3-wallet-setup) but use the above RPC URL instead of `http://localhost:8545`
6. Enjoy!

## Prerequisites

### Install dependencies
Assuming you have [Node.js](https://nodejs.org) installed, run the following command to install the required packages including [Accelerated Hardhat](https://github.com/MarioPoneder/accelerated-hardhat):
```sh
$ npm install
```

### Web3 API, which network do you want to fork?
In oder for your simulator node to fork the mainnet or any other EVM based network, rename `.env.example` to `.env` and set the *Chain ID*
as well as the *JSON RPC URL* for your target network in the `.env` file.  

In case of the Ethereum mainnet the *Chain ID* is 1 and an API key for the *JSON RPC URL* can be acquired for free at [Infura](https://www.infura.io/).

### Web3 wallet setup
Manually add your simulator network instance to your Web3 wallet using the properties below:

| Property        | Value                      |
|-----------------|----------------------------|
| Network name    | Transaction Simulator      |
| RPC URL         | `http://localhost:8545`    |
| Chain ID        | see `.env` file, e.g. 1    |
| Currency symbol | depends on chain, e.g. ETH |

_Note that MetaMask already comes with a **Localhost 8548** network preset which can be used, but make sure the **Chain ID** is set accordingly._

### Optional: Test account

In case you do not want to test transactions with you own account(s), the simulator node comes with a test account which is pre-funded with **100 ETH**.  
To use it, import the following account into your Web3 wallet:

| Property        | Value                                                                |
|-----------------|----------------------------------------------------------------------|
| Account address |                         `0xdD11751cdD3f6EFf01B1f6151B640685bfa5dB4a` |
| Private key     | `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff81` |

_Note that this is a publicly known private key and therefore should only be used in private testing environments._

## Usage 

1. Start your simulator node by running the following command to get the most recent state of your target network:
```sh
$ npm start
```
2. Switch to your simulator network instance in your Web3 wallet and proceed with the transactions you want to test.

## Limitations

Although some user experience limitations have been overcome using an [accelerated version of Hardhat](https://github.com/MarioPoneder/accelerated-hardhat)
which comes with changes to the Hardhat network including RPC reduction, block independent on-disk contract caching, flexible transaction nonces and blocking of costly on-chain read operations, the issues below need to be considered when working with a simulator node.

### Performance

The simulator instance is as lightweight as it gets. This means that there is no need to download gigabytes of blockchain data since only the required data (balances, contracts, storage) is requested on-the-fly using the *JSON RPC URL* you specified. However, this also affects contract execution because each call and storage read operation needs to be resolved via RPCs too.  
All in all, performance is sacrificed for the convenience of not having to run a full node.

### Complex DApps

Keep in mind, that the state of your simulator is pinned at a recent block of the target network. This means that e.g. oracle data is frozen and does not change over time.
Usually this is not a problem when interacting with contracts directly or when using simple DApps like [Uniswap](https://app.uniswap.org).  
However, there are more complex DApps which do not solely rely on on-chain data from your simulator node, but also interact with the target network directly via their backend. This can lead to problems and unexpected behavior due to the state discrepancy between the simulation and the real network state.
