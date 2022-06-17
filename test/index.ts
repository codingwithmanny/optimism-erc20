// Imports
// ========================================================
import { expect } from "chai";
import { ethers } from "hardhat";
import ContractABI from "../artifacts/contracts/Buidl.sol/BuidlToken.json";

// Config
// ========================================================
/**
 * Name of contract
 */
const CONTRACT_NAME = "BuidlToken";

/**
 * @dev Account #0: First wallet address given when we run the hardhat node
 */
const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 * @dev Account #1: Second wallet address given when we run the hardhat node
 */
const RANDOM_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

/**
 * @dev Account #2: Third wallet address given when we run the hardhat node
 */
const ANOTHER_ADDRESS = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

// Tests
// ========================================================
describe(`${CONTRACT_NAME} - Contract Tests`, async () => {
  /**
   * mint
   */
  it("mint - should FAIL when minting -1", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToMint = -1;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(OWNER_ADDRESS);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.mint(amountToMint);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq("value out-of-bounds");
    }
  });

  /**
   * mint
   */
  it("mint - should PASS when minting 10", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToMint = 10;
    const walletOwner = OWNER_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    // Init
    await contract.mint(amountToMint);
    const result = await contract.totalSupply();

    // Expectations
    expect(result).to.be.eq(initialSupply + amountToMint);
  });

  /**
   * burn
   */
  it("burn - should FAIL when burning -1", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToBurn = -1;
    const walletOwner = OWNER_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.burn(amountToBurn);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq("value out-of-bounds");
    }
  });

  /**
   * burn
   */
  it("burn - should FAIL when burning tokens that aren't owned", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToBurn = 100;
    const walletOwner = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.burn(amountToBurn);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq(
        "Error: VM Exception while processing transaction: reverted with reason string 'ERC20: burn amount exceeds balance'"
      );
    }
  });

  /**
   * burn
   */
  it("burn - should PASS when burning tokens that exist/owned", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToBurn = 100;
    const walletOwner = OWNER_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    // Init
    await contract.burn(amountToBurn);
    const result = await contract.totalSupply();

    // Expectations
    expect(result).to.be.eq(initialSupply - amountToBurn);
  });

  /**
   * approve
   */
  it("approve - should FAIL when approving -1", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToApprove = -1;
    const walletOwner = OWNER_ADDRESS;
    const walletApproved = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.approve(walletApproved, amountToApprove);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq("value out-of-bounds");
    }
  });

  /**
   * approve
   */
  it("approve - should PASS when approving 10", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToApprove = 10;
    const walletOwner = OWNER_ADDRESS;
    const walletApproved = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    // Init
    await contract.approve(walletApproved, amountToApprove);
    const result = await contract.allowance(walletOwner, walletApproved);

    // Expectations
    expect(result.toNumber()).to.be.eq(amountToApprove);
  });

  /**
   * transfer
   */
  it("transfer - should FAIL when transferring -1", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToTransfer = -1;
    const walletOwner = OWNER_ADDRESS;
    const walletReceiving = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.transfer(walletReceiving, amountToTransfer);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq("value out-of-bounds");
    }
  });

  /**
   * transfer
   */
  it("transfer - should FAIL when transferring more than owned", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToTransfer = 1001;
    const walletOwner = OWNER_ADDRESS;
    const walletReceiving = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    try {
      // Init
      await contract.transfer(walletReceiving, amountToTransfer);
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq(
        "Error: VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'"
      );
    }
  });

  /**
   * transfer
   */
  it("transfer - should PASS when transferring 10", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToTransfer = 10;
    const walletOwner = OWNER_ADDRESS;
    const walletReceiving = RANDOM_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner(walletOwner);
    // - Get the contract linked with the signer
    const contract = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signer
    );

    // Init
    await contract.transfer(walletReceiving, amountToTransfer);
    const result = await contract.balanceOf(walletReceiving);

    // Expectations
    expect(result.toNumber()).to.be.eq(amountToTransfer);
  });

  /**
   * scenario transferFrom
   */
  it("scenario transferFrom - should FAIL when approved spender spends more than the owner has", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToApprove = 10;
    const walletOwner = OWNER_ADDRESS;
    const walletApproved = RANDOM_ADDRESS;
    const walletReceiving = ANOTHER_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signerOwner = provider.getSigner(walletOwner);
    const signerSpender = provider.getSigner(walletApproved);
    // - Get the contract linked with the signer
    const contractOwner = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signerOwner
    );
    // - Get the contract linked with other signer
    const contractSpender = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signerSpender
    );

    // Init
    await contractOwner.approve(walletApproved, amountToApprove);
    const resultAllowance = await contractOwner.allowance(
      walletOwner,
      walletApproved
    );
    await contractOwner.burn(initialSupply);
    try {
      await contractSpender.transferFrom(
        walletOwner,
        walletReceiving,
        amountToApprove
      );
    } catch (error: any) {
      // Expectations
      expect(error?.reason).to.be.eq(
        "Error: VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'"
      );
      expect(resultAllowance.toNumber()).to.be.eq(amountToApprove);
    }
  });

  /**
   * scenario transferFrom
   */
  it("scenario transferFrom - should PASS when approved spender spends what the owner has", async () => {
    // Setup
    const initialSupply = 1000;
    const amountToApprove = 10;
    const walletOwner = OWNER_ADDRESS;
    const walletApproved = RANDOM_ADDRESS;
    const walletReceiving = ANOTHER_ADDRESS;
    // - Deploy contract
    const Contract = await ethers.getContractFactory(`${CONTRACT_NAME}`);
    const deployedContract = await Contract.deploy(initialSupply);
    await deployedContract.deployed();
    // - Setup wallet that will interact with the contract as a signer
    const provider = new ethers.providers.JsonRpcProvider();
    const signerOwner = provider.getSigner(walletOwner);
    const signerSpender = provider.getSigner(walletApproved);
    // - Get the contract linked with the signer
    const contractOwner = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signerOwner
    );
    // - Get the contract linked with other signer
    const contractSpender = new ethers.Contract(
      (await deployedContract.deployed()).address,
      ContractABI.abi,
      signerSpender
    );

    // Init
    await contractOwner.approve(walletApproved, amountToApprove);
    const resultAllowanceBefore = await contractOwner.allowance(
      walletOwner,
      walletApproved
    );
    await contractSpender.transferFrom(
      walletOwner,
      walletReceiving,
      amountToApprove
    );
    const resultAllowanceAfter = await contractOwner.allowance(
      walletOwner,
      walletApproved
    );
    const resultBalanceReceiver = await contractOwner.balanceOf(
      walletReceiving
    );
    const resusltBalanceOwner = await contractOwner.balanceOf(walletOwner);

    // Expectations
    expect(resultAllowanceBefore).to.be.eq(amountToApprove);
    expect(resultAllowanceAfter).to.be.eq(0);
    expect(resultBalanceReceiver.toNumber()).to.be.eq(amountToApprove);
    expect(resusltBalanceOwner.toNumber()).to.be.eq(
      initialSupply - amountToApprove
    );
  });
});
