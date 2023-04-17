import { contractAddress } from "@/lib/constants";
import { useContract } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { createContext, useEffect, useMemo, useState } from "react";

export const AppContext = createContext<{
  collection: NFT[] | undefined;
  claimedSupply: number;
  totalSupply: BigNumber | undefined;
  price: string | undefined;
  updateCollection: () => void;
}>({
  collection: undefined,
  claimedSupply: 0,
  totalSupply: undefined,
  price: undefined,
  updateCollection: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [price, setPrice] = useState<string>();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [collection, setCollection] = useState<NFT[]>();
  const {
    contract,
    isLoading: isContractLoading,
    error,
  } = useContract(contractAddress, "nft-drop");

  const fetchNFTDropData = async () => {
    if (!contract) return;
    setLoading(true);
    updateCollection();
    const claimConditions = await contract.claimConditions.getAll();
    claimConditions[0]?.currencyMetadata.displayValue &&
      setPrice(claimConditions[0]?.currencyMetadata.displayValue);

    setLoading(false);
  };

  const updateCollection = async () => {
    if (!contract) return;
    const claimed = await contract.getAllClaimed();
    const total = await contract.totalSupply();
    setCollection(claimed);
    setClaimedSupply(claimed.length);
    setTotalSupply(total);
  };

  useEffect(() => {
    fetchNFTDropData();
  }, [contract]);

  if (isLoading) return <div>loading...</div>;

  return (
    <AppContext.Provider
      value={{
        price,
        totalSupply,
        claimedSupply,
        collection,
        updateCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
