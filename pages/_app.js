import '../styles/globals.css'
import NavBar from '../components/NavBar'
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useWebSocketProvider } from "wagmi";
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
        rainbowWallet({ chains }),
        coinbaseWallet({ chains }),
        walletConnectWallet({ chains }),
      ],
    },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  useWebSocketProvider,
});


  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <NavBar />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
    )
}

export default MyApp
