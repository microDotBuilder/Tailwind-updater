import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import ora from "ora";
import path from "path";
import { handleError } from "./handle-error";
import {
  installTailwindDependencies,
  runConfigFilesInstaller,
  writePostcssConfigToFile,
} from "./next-app-helpers";
import { createGlobalCss, updateGlobalCss } from "./global-css-installer";
import { updateTsConfig } from "./ts-config-updater";

export async function installTailwindForNextApp({
  config,
}: {
  config: FrameworkConfig;
}) {
  console.log(" ");
  Logger.logg("installing tailwind for next-app router...");
  const dependenciesSpinner = ora(
    Logger.successReturn("Installing TailwindCss...")
  )?.start();

  const { cwd, TypescriptConfig, tsconfigPath } = config;
  try {
    await runConfigFilesInstaller(cwd, config.isTsx);

    const postcssPromise = writePostcssConfigToFile(cwd);
    const tailwindPromise = installTailwindDependencies(cwd);

    let cssPromise;
    if (config.globalCssPath) {
      cssPromise = updateGlobalCss(cwd, config.globalCssPath);
    } else {
      const cssPath = path.resolve(cwd, "src/app/globals.css");
      config.globalCssPath = cssPath;
      cssPromise = createGlobalCss(cwd, cssPath);
    }

    const tsconfigPromise =
      tsconfigPath && TypescriptConfig
        ? updateTsConfig(tsconfigPath)
        : Promise.resolve();

    await Promise.all([
      postcssPromise,
      tailwindPromise,
      cssPromise,
      tsconfigPromise,
    ]);

    dependenciesSpinner?.succeed();
  } catch (e) {
    dependenciesSpinner?.fail();
    handleError(e);
  }
}
