import Head from "next/head";
import { Inter } from "next/font/google";

import s from "@/styles/Home.module.scss";
import Nav from "@/components/Nav";
import classNames from "classnames";
import { apfel } from "@/styles/fonts";
import Button from "@/components/Button";

export default function Home() {
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
        <section className={s.hero}>
          <div className={s.left}>
            <div
              className={s.imageWrapper}
              style={{ backgroundImage: `url(/test-image.png)` }}
            />
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
                <p className={s.claimedCounter}>13 / 21 NFTs Claimed</p>
              </div>
            </div>
            <Button variant="outlined" fullWidth size="lg">
              MINT (0.1 ETH)
            </Button>
          </div>
        </section>
        <section className={s.gallery}></section>
      </main>
    </>
  );
}
