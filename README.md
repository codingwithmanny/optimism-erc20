# Build & Deploy Your Own ERC20 Token On Optimism

This repository for the tutorial on how to [Build & Deploy Your Own ERC20 Token On Optimism]().
If you got value from it, please retweet it out on twitter and follow me at [@codingwithmanny](https://twitter.com/codingwithmanny).

---

## Requirements

- NVM or NodeJS `16.14.0`
- Yarn
- Optimistic Etherscan API Key - [https://optimistic.etherscan.io/](https://optimistic.etherscan.io/)
- Metamask Wallet

---

## Local Setup

### 1 - Install Dependencies

```bash
yarn install;
```

### 2 - Set Environment Variables

```bash
cp env.example .env;
```

```bash
ETHERSCAN_API_KEY=<YOUR-OPTIMISTIC-ETHERSCAN-API-KEY>
OPTIMISM_KOVAN_URL=https://kovan.optimism.io
PRIVATE_KEY=<YOUR-WALLET-SECRET-PRIVATE-KEY>
```

### 3 - Compile

```bash
yarn compile;
```

---

## Run Locally

**Terminal 1 - Run Development EVM:**

```bash
./node_modules/.bin/hardhat node;

# Expected Output
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
#
# Accounts
# ========
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
#
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
#
# Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
# Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
#
# ...
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

**Terminal 2 - Deploy Contract:**

```bash
./node_modules/.bin/hardhat run scripts/deploy.ts --network localhost;

# Expected Output
# Generating typings for: 5 artifacts in dir: typechain for target: ethers-v5
# Successfully generated 11 typings!
# Compiled 5 Solidity files successfully
# Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

---

## Run Tests Locally

**Terminal 1 - Run Development EVM:**

```bash
./node_modules/.bin/hardhat node;

# Expected Output
# Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
#
# Accounts
# ========
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
#
# Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
# Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
#
# Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
# Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
#
# ...
#
# WARNING: These accounts, and their private keys, are publicly known.
# Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

**Terminal 2 - Run Tests:**

```bash
./node_modules/.bin/hardhat --network localhost test;

# Expected Output
# No need to generate any newer typings.
#
#   BuidlToken - Contract Tests
#     ✔ mint - should FAIL when minting -1 (276ms)
#     ✔ mint - should PASS when minting 10 (192ms)
#     ✔ burn - should FAIL when burning -1 (75ms)
#     ✔ burn - should FAIL when burning tokens that aren't owned (122ms)
#     ✔ burn - should PASS when burning tokens that exist/owned (143ms)
#     ✔ approve - should FAIL when approving -1 (67ms)
#     ✔ approve - should PASS when approving 10 (144ms)
#     ✔ transfer - should FAIL when transferring -1 (65ms)
#     ✔ transfer - should FAIL when transferring more than owned (102ms)
#     ✔ transfer - should PASS when transferring 10 (147ms)
#     ✔ scenario transferFrom - should FAIL when approved spender spends more than the owner has (259ms)
#     ✔ scenario transferFrom - should PASS when approved spender spends what the owner has (339ms)
#
#   12 passing (2s)
```

---

## Deploy To Testnet

Remember to have **Local Setup** complete before hand.

```bash
./node_modules/.bin/hardhat run scripts/deploy.ts --network optimismKovan;

# Expected Ouput
# No need to generate any newer typings.
# Contract deployed to: 0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73
```

---

## Verify Contract On Testnet

Remember to have **Local Setup** complete before hand.

```bash
# NOTE:
# 1 - 0x375... refers to the deployed contract address
# 2 - 1000 refers to the original 1000 supply parameter deployed in our deploy.ts file
./node_modules/.bin/hardhat verify --network optimismKovan 0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73 1000

# Expected Output
# Nothing to compile
# No need to generate any newer typings.
# Successfully submitted source code for contract
# contracts/Buidl.sol:BuidlToken at 0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73
# for verification on the block explorer. Waiting for verification result...

# Successfully verified contract BuidlToken on Etherscan.
# https://kovan-optimistic.etherscan.io/address/0x375F01b156D9BdDDd41fd38c5CC74C514CB71f73#code
```
