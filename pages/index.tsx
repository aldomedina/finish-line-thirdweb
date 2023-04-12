import { useEffect, useMemo, useState } from "react";
import Head from "next/head";

import s from "@/styles/Home.module.scss";
import Nav from "@/components/Nav";
import classNames from "classnames";
import { apfel, ibm } from "@/styles/fonts";
import Button from "@/components/Button";
import { NFT, useAddress, useContract } from "@thirdweb-dev/react";
import { contractAddress } from "@/lib/constants";
import { BigNumber } from "ethers";
import Icon from "@/components/Icon";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [quantity, setQuantity] = useState<number>(1);
  const [claimedSupply, setClaimedSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [price, setPrice] = useState<string>();
  const [collection, setCollection] = useState<NFT[]>();
  const [isLoading, setLoading] = useState(false);
  const address = useAddress();
  const {
    contract,
    isLoading: isContractLoading,
    error,
  } = useContract(contractAddress, "nft-drop");

  const formattedQuantity = useMemo(() => {
    if (quantity < 10) {
      return `0${quantity}`;
    } else {
      return quantity;
    }
  }, [quantity]);

  const fetchNFTDropData = async () => {
    if (!contract) return;
    setLoading(true);
    const claimed = await contract.getAllClaimed();
    const total = await contract.totalSupply();
    const claimConditions = await contract.claimConditions.getAll();
    claimConditions[0]?.currencyMetadata.displayValue &&
      setPrice(claimConditions[0]?.currencyMetadata.displayValue);
    setCollection(claimed);
    console.log("collection:", claimed);
    setClaimedSupply(claimed.length);
    setTotalSupply(total);
    setLoading(false);
  };

  useEffect(() => {
    if (!contract) return;
    fetchNFTDropData();
  }, [contract]);

  const mintNFT = () => {
    if (!contract || !address) return;
    console.log(Number(quantity));

    setLoading(true);
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
        const claimedNFT = await tx[0].data(); // claimed NFT metadata
        toast(
          (t) => (
            <div className={classNames(apfel.className, s.claimedNFT)}>
              <div className={s.left}>
                <div
                  className={s.imageWrapper}
                  style={{
                    backgroundImage: `url(${claimedNFT.metadata.image})`,
                  }}
                />
              </div>
              <div className={s.right}>
                <ul className={s.content}>
                  <li>
                    <strong>{claimedNFT.metadata.name}</strong>
                  </li>
                  <li>
                    <span>{claimedNFT.metadata.description}</span>
                  </li>
                  <li>
                    <Button
                      variant="outlined"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      Dismiss
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          ),
          { duration: 60000 }
        );
        fetchNFTDropData();
      })
      .catch((err) => toast.error("Something went wrong."))
      .finally(() => {
        toast.dismiss(notification);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Finish Line</title>
        <meta
          name="description"
          content="Finish Line. Generative art project by FAR"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={classNames(apfel.className, s.main)}>
        <Toaster position="bottom-right" />
        <section className={s.hero}>
          <div className={s.left}>
            {isLoading ? (
              "..."
            ) : !!claimedSupply && collection?.length ? (
              <div
                className={s.imageWrapper}
                style={{
                  backgroundImage: `url(${
                    collection[collection.length - 1].metadata.image
                  })`,
                }}
              />
            ) : (
              "no tokens has been claimed"
            )}
          </div>
          <div className={s.right}>
            <Nav />
            <div className={s.content}>
              <div className={s.text}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                  voluptatum tempora quae laboriosam totam facere beatae vero
                  illum omnis! Corporis ex odio inventore id labore animi ipsa
                  vel reprehenderit! Atque.
                </p>
                <p>
                  Corporis ex odio inventore id labore animi ipsa vel
                  reprehenderit! Atque. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Harum voluptatum tempora quae laboriosam
                  totam facere beatae vero illum omnis!
                </p>
                <ul className={s.details}>
                  {isLoading ? (
                    "loading drop details..."
                  ) : (
                    <>
                      <li className={s.detail}>
                        <span className={s.subtitle}>claimed </span>
                        <span className={ibm.className}>
                          {claimedSupply} / {totalSupply?.toString()} NFTs
                        </span>
                      </li>
                      <li className={s.detail}>
                        <span className={s.subtitle}>price </span>
                        <span className={ibm.className}> {price} ETH</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className={s.mintControls}>
              <Button
                variant="contained"
                fullWidth
                size="lg"
                onClick={mintNFT}
                disabled={
                  isLoading ||
                  claimedSupply === totalSupply?.toNumber() ||
                  !address
                }
              >
                {isLoading
                  ? "Loading..."
                  : claimedSupply === totalSupply?.toNumber()
                  ? "SOLD OUT"
                  : !address
                  ? "CONNECT WALLET TO MINT"
                  : `MINT`}
              </Button>
              <div
                className={classNames(s.counterWrapper, {
                  [s.disabled]: isLoading,
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
          </div>
        </section>
        <section className={s.gallery}></section>
      </main>
    </>
  );
}
