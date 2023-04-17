import { ibm } from "@/styles/fonts";
import s from "./style.module.scss";
import { BigNumber } from "ethers";
import { useContext } from "react";
import { AppContext } from "@/containers/AppProvider";

const Content: React.FC<{}> = () => {
  const { claimedSupply, totalSupply, price } = useContext(AppContext);
  return (
    <div className={s.content}>
      <div className={s.text}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          voluptatum tempora quae laboriosam totam facere beatae vero illum
          omnis! Corporis ex odio inventore id labore animi ipsa vel
          reprehenderit! Atque.
        </p>
        <p>
          Corporis ex odio inventore id labore animi ipsa vel reprehenderit!
          Atque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
          voluptatum tempora quae laboriosam totam facere beatae vero illum
          omnis!
        </p>
        <ul className={s.details}>
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
        </ul>
      </div>
    </div>
  );
};

export default Content;
