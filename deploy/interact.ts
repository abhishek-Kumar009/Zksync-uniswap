import * as hre from "hardhat";
import { getWallet } from "./utils";
import { ethers } from "ethers";
import { Emerald, Sapphire } from "../constants/tokenAddresses";

// Address of the contract to interact with
const CONTRACT_ADDRESS = "0x343944e27688296D83532379398E401359a13693";
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
  )

  // const approve1 = await token1Contract.approve(CONTRACT_ADDRESS, ethers.parseEther("1000000000"));
  const approve1 = await token1Contract.allowance("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", "0x343944e27688296D83532379398E401359a13693");
  // await approve1.wait();

  console.log("allowance  =======>", approve1);
  

  // const approve2 = await token2Contract.approve(CONTRACT_ADDRESS, ethers.parseEther("1000000000"));
  const approve2 = await token2Contract.allowance("0x1aBeA91c444E43cBf645dB61F4DC09200F0E25b0", "0x343944e27688296D83532379398E401359a13693");
  // await approve2.wait();

  console.log("allowance done =========>", approve2);

  // Load compiled contract info
  const contractArtifact = await hre.artifacts.readArtifact(
    "UniswapV2Router02"
  );

  // Initialize contract instance for interaction
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractArtifact.abi,
    getWallet() // Interact with the contract on behalf of this wallet
  );

  // console.log(contract.addLiquidity, "Router contract =====>");
  

  const deadline = "1710669530";

  // Run contract read function
  const response = await contract.addLiquidityETH(
    Sapphire,
    ethers.parseEther("500"),
    0,
    0,
    "0xD4B0999f465C7b4F15eB6f709b4793553ab6b99C",
    deadline,
    {
      value: ethers.parseEther("0.002"),
      gasLimit: 500000
    }
  );

  await response.wait();
  console.log(response, "response hash add liquidity");
}
