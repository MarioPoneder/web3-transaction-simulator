import { HardhatUserConfig } from "accelerated-hardhat/config";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";


dotenvConfig({ path: resolve(__dirname, "./.env") });

// Ensure that we have all the environment variables we need.
const networkChainId: string | undefined = process.env.NETWORK_CHAIN_ID;
if (!networkChainId) {
  throw new Error("Please set your NETWORK_CHAIN_ID in a .env file");
}

const networkJsonRpcUrl: string | undefined = process.env.NETWORK_JSON_RPC_URL;
if (!networkJsonRpcUrl) {
  throw new Error("Please set your NETWORK_JSON_RPC_URL in a .env file");
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: [
        // this is a publicly known private key, do not use for anything else than testing
        { privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff81", balance: "100000000000000000000" }
      ],
      mining: {
        auto: true,
      },
      chainId: +networkChainId,
      forking: {
        url: networkJsonRpcUrl,
      },
    },
  },
};


export default config;
