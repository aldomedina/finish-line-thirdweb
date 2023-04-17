import { activeChainId, contractAddress } from "@/lib/constants";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function getThirdwebContractInstance() {
  const sdk = new ThirdwebSDK(activeChainId);
  const contract = await sdk.getContract(contractAddress, "nft-drop");
  return contract;
}
