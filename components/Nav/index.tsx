import { ConnectWallet } from "@thirdweb-dev/react";

import s from "./style.module.scss";
import Link from "next/link";

const Nav = () => {
  return (
    <div className={s.nav}>
      <div className={s.container}>
        <Link href="/">
          <h1 className={s.title}>FINISH LINE</h1>
        </Link>
        <ConnectWallet theme="light" />
      </div>
    </div>
  );
};

export default Nav;
