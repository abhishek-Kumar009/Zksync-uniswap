import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import { Emerald, Sapphire } from "../constants/tokenAddresses";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x5d5162972035109F077Ed2Ac4056db779d5e5732"; //Router
const FACTORY = "0x5bE571BdFFB6F23a50a7A14302A5a9fC8003471b";
                          
if (!CONTRACT_ADDRESS)
  throw "⛔️ Provide address of the contract to interact with!";

// An example of a script to interact with the contract
export default async function () {
  console.log(`Running script to interact with contract ${CONTRACT_ADDRESS}`);

  // approval
  const tokenContract1 = Sapphire;
  const tokenContract2 = Emerald;

  const contractArtifactTK1 = await hre.artifacts.readArtifact(
    "Sapphire"
  );

  const contractArtifactTK2 = await hre.artifacts.readArtifact(
    "Emerald"
  );

  const token1Contract = new ethers.Contract(
    tokenContract1,
    contractArtifactTK1.abi,
    getWallet()
  );

  const token2Contract = new ethers.Contract(
    tokenContract2,
    contractArtifactTK2.abi,
    getWallet()
  );

  // const mint1 = await token1Contract.mint("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", ethers.parseEther("10000000"));
  // await mint1.wait();

  // console.log(mint1, "Mint1");
  
  // const mint2 = await token2Contract.mint("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", ethers.parseEther("10000000"));
  // await mint2.wait();
  // // console.log(mint2, "Mint2");


  const approve1 = await token1Contract.approve(CONTRACT_ADDRESS, ethers.parseEther("1000000000"));
  // // // const approve1 = await token1Contract.allowance("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", CONTRACT_ADDRESS);
  await approve1.wait();

  console.log("apprve1  =======>", approve1);

  // const bal1 = await token1Contract.balanceOf("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0");

  // console.log(parseFloat(bal1)/1e18, "balance1");
  
  // const bal2 = await token2Contract.balanceOf("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0");
  // console.log(parseFloat(bal2)/1e18, "balance2");
  

  const approve2 = await token2Contract.approve(CONTRACT_ADDRESS, ethers.parseEther("1000000000"));
  // // // const approve2 = await token2Contract.allowance("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", CONTRACT_ADDRESS);
  await approve2.wait();

  console.log("apprive2 done =========>", approve2);

  // // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact(
    "UniswapV2Router02"
  );

  // const fatoryContractArtifact = await hre.artifacts.readArtifact(
  //   "UniswapV2Factory"
  // );

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  // const factoryContract = new ethers.Contract(
  //   FACTORY,
  //   fatoryContractArtifact.abi,
  //   getWallet()
  // );

  // const createPairTx = await factoryContract.createPair(
  //   Sapphire,
  //   Emerald
  // );

  // await createPairTx.wait();

  // console.log(createPairTx, "createPairTx");

  // const pair = await factoryContract.getPair(
  //   Sapphire,
  //   Emerald
  // );

  // console.log(pair, "Pair addresss =====>");
  
  

  // const resp = await factoryContract.INIT_CODE_HASH();

  // console.log(resp, "INIT_CODE_HASH factory =====>");

  // const constructorHash = await factoryContract.calculateConstructorInputHash();

  // console.log(constructorHash, "Constructor hash ====>");
  
  

  const deadline = "1810946476";

  const currentNonce = await getWallet().getNonce();

  console.log(currentNonce, "Current nonce ====>");
  

  // // // Run contract read function
  const response = await contract.addLiquidity(
    Sapphire,
    Emerald,
    ethers.parseUnits("100", 18),
    ethers.parseUnits("20", 18),
    0,
    0,
    getWallet().address,
    deadline,
    {
      gasLimit: 1000_000,
      nonce: currentNonce
    }
  );

  await response.wait();
  console.log(response, "response hash add liquidity");
}
