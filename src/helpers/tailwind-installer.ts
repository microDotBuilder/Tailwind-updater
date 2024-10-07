import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import { installTailwindForNextApp } from "./tailwind-next-app";

export async function runTailwindInstaller({
  config,
}: {
  config: FrameworkConfig;
}) {
  if (config.framework.name === "next-app") {
    await installTailwindForNextApp({ config });
  } else if (config.framework.name === "next-pages") {
    await installTailwindForNextPages({ config });
  } else if (config.framework.name === "remix") {
    await installTailwindForRemix({ config });
  } else if (config.framework.name === "vite") {
    await installTailwindForVite({ config });
  } else if (config.framework.name === "manual") {
    await installTailwindForManual({ config });
  } else {
    console.log("we apologize, but this framework is not supported yet");
  }
}

//TODO: implement these functions
async function installTailwindForNextPages({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.logg("installing tailwind for next-pages");
}

async function installTailwindForRemix({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for remix");
}

async function installTailwindForVite({ config }: { config: FrameworkConfig }) {
  Logger.info("installing tailwind for vite");
}

async function installTailwindForManual({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for manual");
}
