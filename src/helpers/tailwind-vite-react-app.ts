import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import ora from "ora";
import {
  installTailwindDependencies,
  runConfigFilesInstaller,
  writePostcssConfigToFile,
} from "./next-app-helpers";
import { updateGlobalCss } from "./global-css-installer";
import path from "path";

import { handleError } from "./handle-error";

export async function installTailwindForVite({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for vite....");
  const dependenciesSpinner = ora(
    Logger.successReturn("Installing TailwindCss...")
  )?.start();
  const { cwd, TypescriptConfig, tsconfigPath } = config;
  try {
    await runConfigFilesInstaller(cwd, config.isTsx);
    const postcssPromise = writePostcssConfigToFile(cwd);
    const tailwindPromise = installTailwindDependencies(cwd);
    // in pages the css is going to be in different folder now
    let cssPromise;

    const cssPath = path.resolve(cwd, "src/index.css");
    cssPromise = updateGlobalCss(cwd, cssPath);

    await Promise.all([postcssPromise, tailwindPromise, cssPromise]);
    dependenciesSpinner?.succeed();
  } catch (error) {
    dependenciesSpinner?.fail();
    handleError(error);
  }
}
