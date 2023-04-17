import { apfel } from "@/styles/fonts";
import classNames from "classnames";
import s from "./style.module.scss";
import Head from "next/head";
import { motion } from "framer-motion";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      className={classNames(s.layout, apfel.className)}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Head>
        <title>Finish Line</title>
        <meta
          name="description"
          content="Finish Line. Generative art project by FAR"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </motion.div>
  );
};

export default Layout;
