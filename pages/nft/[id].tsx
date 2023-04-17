import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { NFT } from "@thirdweb-dev/react";
import { ParsedUrlQuery } from "querystring";

import Nav from "@/components/Nav";
import Layout from "@/containers/Layout";
import { getThirdwebContractInstance } from "@/utils";
import { TAttribute } from "@/types";

import s from "@/styles/NFT.module.scss";
import AttributesTable from "@/components/AttributesTable";

interface Params extends ParsedUrlQuery {
  id: string;
}
interface NFTPageProps {
  nft: NFT;
}

const NFTPage: NextPage<NFTPageProps> = ({ nft }) => {
  const { image, name, attributes } = nft.metadata;
  return (
    <Layout>
      <section className={s.hero}>
        <div className={s.left}>
          <div
            className={s.imageWrapper}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        </div>
        <div className={s.right}>
          <Nav />
          <div className={s.heroContent}>
            <h1 className={s.name}>{name}</h1>
            <div className={s.tableWrapper}>
              <AttributesTable attributes={attributes as TAttribute[]} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;
  const contract = await getThirdwebContractInstance();
  const collection = await contract.getAllClaimed();
  const nft = collection.find(
    (el) => el.metadata.id.toString() === id.toString()
  );
  return {
    props: {
      nft,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contract = await getThirdwebContractInstance();
  const collection = await contract.getAllClaimed();
  const paths = collection.map((nft) => ({
    params: {
      id: nft.metadata.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default NFTPage;
