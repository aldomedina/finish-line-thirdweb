import Image from "next/image";
import s from "./style.module.scss";

import Link from "next/link";
import { NFT } from "@thirdweb-dev/sdk";

const Gallery: React.FC<{ collection: NFT[] }> = ({ collection }) => {
  return (
    <div className={s.gallery}>
      {collection?.map(
        (el) =>
          el.metadata.image && (
            <div
              className={s.imageWrapper}
              key={JSON.stringify(el)}
              style={{
                backgroundImage: `url(${el.metadata.image})`,
              }}
            />
          )
      )}
    </div>
  );
};

export default Gallery;
