import { NFT } from "@thirdweb-dev/sdk";

export type TAttribute = {
  trait_type: string;
  value: string | number;
};

export type TModalNft = {
  nft: NFT;
  tx: string;
};
