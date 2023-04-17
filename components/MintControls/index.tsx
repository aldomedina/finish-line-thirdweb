import Icon from "../Icon";
import Button from "../Button";
import s from "./style.module.scss";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "@/containers/AppProvider";
import { useAddress, useContract } from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import { contractAddress } from "@/lib/constants";
import classNames from "classnames";
import useMintModalStore from "@/stores/mint-modal";

const MintControls: React.FC<{
  isMinting: boolean;
  setIsMinting: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMinting, setIsMinting }) => {
  const address = useAddress();
  const { contract } = useContract(contractAddress, "nft-drop");
  const open = useMintModalStore((s) => s.open);
  const addNft = useMintModalStore((s) => s.addNft);
  const setIsFetching = useMintModalStore((s) => s.setIsFetching);
  const { updateCollection, claimedSupply, totalSupply } =
    useContext(AppContext);

  const [quantity, setQuantity] = useState<number>(1);
  const formattedQuantity = useMemo(() => {
    if (quantity < 10) {
      return `0${quantity}`;
    } else {
      return quantity;
    }
  }, [quantity]);

  const mintNFT = () => {
    if (!contract || !address) return;
    setIsMinting(true);
    const notification = toast.success(
      `Transaction submitted, please check your metamask wallet for status progress`
    );
    contract
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt; // transaction receipt
        const claimTokenId = tx[0].id; // id of the claimed NFT
        toast.success(
          `Transaction hash ${receipt.transactionHash} has been verified.`,
          { duration: 8000 }
        );
        setIsFetching(true);
        open();
        for (let i = 0; i < tx.length; i++) {
          const claimedNFT = await tx[i].data(); // claimed NFT metadata
          addNft(claimedNFT);
        }
        setIsFetching(false);
        updateCollection();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong.");
      })
      .finally(() => {
        toast.dismiss(notification);
        setIsMinting(false);
      });
  };
  const isSoldOut = claimedSupply === totalSupply?.toNumber();
  return (
    <div className={s.mintControls}>
      <Button
        variant="contained"
        fullWidth
        size="lg"
        onClick={mintNFT}
        disabled={isSoldOut || !address}
      >
        {isMinting
          ? "Minting..."
          : isSoldOut
          ? "SOLD OUT"
          : !address
          ? "CONNECT WALLET TO MINT"
          : `MINT`}
      </Button>
      <div
        className={classNames(s.counterWrapper, {
          [s.disabled]: isMinting,
        })}
      >
        <div className={s.counter}>{formattedQuantity}</div>
        <div className={s.arrows}>
          <button
            className={s.arrowBtn}
            onClick={() => {
              if (
                totalSupply?.toNumber() &&
                quantity > totalSupply?.toNumber() - claimedSupply - 1
              ) {
                return;
              } else {
                setQuantity((s) => s + 1);
              }
            }}
          >
            <Icon icon="chevron-up" />
          </button>
          <button
            className={s.arrowBtn}
            onClick={() => {
              if (quantity < 2) {
                return;
              } else {
                setQuantity((s) => s - 1);
              }
            }}
          >
            <Icon icon="chevron-down" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintControls;
