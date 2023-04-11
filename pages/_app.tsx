import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  ChainId,
  metamaskWallet,
  coinbaseWallet,
  walletConnectV1,
  walletConnect,
  safeWallet,
  paperWallet,
} from "@thirdweb-dev/react";

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      dAppMeta={{
        name: "FINISH LINE",
        description: "Generative Art Drop by Far",
        url: "https://example.com",
        isDarkMode: true,
      }}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect({
          projectId, // optional
        }),
        walletConnectV1(),
        safeWallet(),
      ]}
      activeChain={ChainId.Goerli}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
