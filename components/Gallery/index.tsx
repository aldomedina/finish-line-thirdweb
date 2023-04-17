import Image from "next/image";
import s from "./style.module.scss";

import Link from "next/link";
import { NFT } from "@thirdweb-dev/sdk";
import Loader from "../Loader";

const GalleryCard: React.FC<{ item: NFT }> = ({ item }) => {
  return (
    <Link href={`/nft/${item.metadata.id}`}>
      <div className={s.card}>
        <div className={s.imageWrapper}>
          <div
            className={s.image}
            style={{
              backgroundImage: `url(${item.metadata.image})`,
            }}
          />
        </div>
        <div className={s.details}>
          <span className={s.name}>{item.metadata.name}</span>
        </div>
      </div>
    </Link>
  );
};

const Gallery: React.FC<{ collection?: NFT[] }> = ({ collection }) => {
  if (!collection) {
    return (
      <div className={s.loaderWrapper}>
        <Loader />
      </div>
    );
  }
  if (collection.length === 0) {
    return (
      <div className={s.emptyCard}>
        <div className={s.message}>
          The Collection is empty. No token has been claimed.
        </div>
      </div>
    );
  }
  return (
    <div className={s.gallery}>
      {collection.map(
        (el) =>
          el.metadata.image && (
            <GalleryCard key={JSON.stringify(el)} item={el} />
          )
      )}
    </div>
  );
};

export default Gallery;
