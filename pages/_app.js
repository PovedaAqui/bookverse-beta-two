import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import NavBar from '../components/NavBar'
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { 
    configureChains, 
    createClient, 
    WagmiConfig, 
    useWebSocketProvider,
    useSigner } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { rainbowMagicConnector } from '../components/MagicConnector';
import {  
    rainbowWallet,
    walletConnectWallet,
    metaMaskWallet,
    coinbaseWallet,
  } from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {  

const { chains, provider } = configureChains(
    [polygon],
    [alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`, priority: 0 })],
    [publicProvider({ priority: 1 })],
  )

// const { connectors } = getDefaultWallets({
//   appName: "My RainbowKit App",
//   chains
// });

const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        rainbowMagicConnector({ chains }),
        metaMaskWallet({ chains }),
      ],
    },
    {
      groupName: "Other",
      wallets: [
        rainbowWallet({ chains }),
        coinbaseWallet({ chains }),
        walletConnectWallet({ chains }),
      ],
    }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  useWebSocketProvider,
});

function ThirdwebProvider({ wagmiClient, children }) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      desiredChainId={ChainId.Polygon}
      signer={signer}
      provider={wagmiClient.provider}
      queryClient={wagmiClient.queryClient}
      // sdkOptions={{
      //   gasless: {
      //     openzeppelin: {
      //       relayerUrl: process.env.REACT_APP_WEBHOOK_URL,
      //     },
      //   },
      // }}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}


  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ThirdwebProvider wagmiClient={wagmiClient}>
            <QueryClientProvider client={queryClient}>
              <NavBar />
              <Component {...pageProps} />
              <Analytics />
            </QueryClientProvider>
          </ThirdwebProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
    )
}

export default MyApp;
