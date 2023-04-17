import { apfel } from "@/styles/fonts";
import classNames from "classnames";
import s from "./style.module.scss";
import Head from "next/head";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={classNames(s.layout, apfel.className)}>
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
    </div>
  );
};

export default Layout;
