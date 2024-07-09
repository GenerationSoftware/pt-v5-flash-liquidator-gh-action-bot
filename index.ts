import { BaseProvider } from "@ethersproject/providers";
import {
  getProvider,
  instantiateRelayerAccount,
  loadFlashLiquidatorEnvVars,
  runFlashLiquidator,
  FlashLiquidatorEnvVars,
  FlashLiquidatorConfig,
  RelayerAccount,
} from "@generationsoftware/pt-v5-autotasks-library";

const main = async () => {
  const envVars: FlashLiquidatorEnvVars = loadFlashLiquidatorEnvVars();
  const provider: BaseProvider = getProvider(envVars);

  const relayerAccount: RelayerAccount = await instantiateRelayerAccount(
    provider,
    envVars.CUSTOM_RELAYER_PRIVATE_KEY
  );

  const flashLiquidatorConfig: FlashLiquidatorConfig = {
    ...relayerAccount,
    provider,
    covalentApiKey: envVars.COVALENT_API_KEY,
    chainId: envVars.CHAIN_ID,
    swapRecipient: envVars.SWAP_RECIPIENT,
    minProfitThresholdUsd: Number(envVars.MIN_PROFIT_THRESHOLD_USD),
    contractJsonUrl: envVars.CONTRACT_JSON_URL,
  };

  await runFlashLiquidator(flashLiquidatorConfig);
};

main();

