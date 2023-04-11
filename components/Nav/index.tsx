import { ConnectWallet } from "@thirdweb-dev/react";

import Button from "../Button";
import s from "./style.module.scss";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const Nav = () => {
  return (
    <div className={s.nav}>
      <div className={s.container}>
        <h1 className={s.title}>FINISH LINE</h1>
        <ConnectWallet theme="light" />
      </div>
    </div>
  );
};

export default Nav;
