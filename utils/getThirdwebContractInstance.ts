import { contractAddress } from "@/lib/constants";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia, Goerli } from "@thirdweb-dev/chains";

export default async function getThirdwebContractInstance() {
  const sdk = new ThirdwebSDK(Sepolia);
  const contract = await sdk.getContract(contractAddress, "nft-drop");
  return contract;
}
