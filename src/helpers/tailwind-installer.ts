import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import { installTailwindForNextApp } from "./tailwind-next-app";
import { installTailwindForNextPages } from "./tailwind-pages-app";
import { installTailwindForRemix } from "./tailwind-remix-app";

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
