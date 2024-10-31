import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import { installTailwindForNextApp } from "./tailwind-next-app";
import { installTailwindForNextPages } from "./tailwind-pages-app";
import { installTailwindForRemix } from "./tailwind-remix-app";
import { installTailwindForVite } from "./tailwind-vite-react-app";

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
    //this will actually be tailwind vite react app
    // write now we just support vite react app
    await installTailwindForVite({ config });
  } else if (config.framework.name === "manual") {
    await installTailwindForManual({ config });
  } else {
    console.log("we apologize, but this framework is not supported yet");
  }
}

async function installTailwindForManual({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for manual");
}
