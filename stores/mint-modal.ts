import nfts_placeholder from "@/lib/nfts_placeholder";
import { NFT } from "@thirdweb-dev/sdk";
import { create } from "zustand";

interface MintModalState {
  isOpen: boolean;
  isFetching: boolean;
  setIsFetching: (state: boolean) => void;
  nfts: NFT[];
  close: () => void;
  open: () => void;
  addNft: (nft: NFT) => void;
  resetNfts: () => void;
}

const useMintModalStore = create<MintModalState>()((set) => ({
  isFetching: false,
  setIsFetching: (isFetching) => set((state) => ({ ...state, isFetching })),
  isOpen: false,
  nfts: [],
  close: () => set((state) => ({ ...state, isOpen: false })),
  open: () => set((state) => ({ ...state, isOpen: true })),
  addNft: (nft) => set((state) => ({ ...state, nfts: [...state.nfts, nft] })),
  resetNfts: () => set((state) => ({ ...state, nfts: [] })),
}));

export default useMintModalStore;
