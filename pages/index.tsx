import { useContext, useState } from "react";

import s from "@/styles/Home.module.scss";
import Nav from "@/components/Nav";

import { Toaster } from "react-hot-toast";
import Gallery from "@/components/Gallery";
import Content from "@/components/Content";
import { AppContext } from "@/containers/AppProvider";
import Layout from "@/containers/Layout";
import MintControls from "@/components/MintControls";
import MintModal from "@/components/MintModal";

export default function Home() {
  const [isMinting, setIsMinting] = useState(false);
  const { claimedSupply, collection } = useContext(AppContext);

  return (
    <Layout>
      <main className={s.main}>
        <Toaster position="bottom-right" />
        <section className={s.hero}>
          <div className={s.left}>
            {isMinting ? (
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
            <div className={s.heroContent}>
              <Content />
            </div>
            <MintControls isMinting={isMinting} setIsMinting={setIsMinting} />
          </div>
        </section>
        <section className={s.gallery}>
          <h2 className={s.subtitle}>COLLECTION</h2>
          <div className={s.galleryContent}>
            <Content />
          </div>
          <Gallery collection={collection} />
        </section>
      </main>
      <MintModal />
    </Layout>
  );
}
