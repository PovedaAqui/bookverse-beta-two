// Import the MagicAuthConnector from the wagmi-magic-connector package
import { MagicAuthConnector, MagicConnectConnector } from "@everipedia/wagmi-magic-connector";

// Define the rainbowMagicConnector function that will be used to create the Magic connector
export const rainbowMagicConnector = ({ chains }) => ({

  id: "magic",
  name: "Sign in with Email",
  iconUrl: "https://svgshare.com/i/pXA.svg",
  iconBackground: "white",
  createConnector: () => ({
    connector: new MagicAuthConnector({
      chains,
      options: {
        // Get the API key from the .env file
        apiKey: `${process.env.NEXT_PUBLIC_MAGIC_KEY_AUTH}`,
        oauthOptions: {
          providers: ["google"],
        },
        isDarkMode: true,
        magicSdkConfiguration: {
          network: {
            rpcUrl: "https://polygon-rpc.com",
            chainId: 137,
          },
        },
      },
    }),
  }),
});