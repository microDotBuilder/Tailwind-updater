import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";
import ora from "ora";
import {
  installTailwindDependencies,
  runConfigFilesInstaller,
  writePostcssConfigToFile,
} from "./next-app-helpers";
import { createGlobalCss, updateGlobalCss } from "./global-css-installer";
import path from "path";
import { updateTsConfig } from "./ts-config-updater";
import { handleError } from "./handle-error";

//TODO: implement these functions
export async function installTailwindForNextPages({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.logg("installing tailwind for next-pages");
  Logger.infoJSON(config);

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
    if (config.globalCssPath) {
      cssPromise = updateGlobalCss(cwd, config.globalCssPath);
    } else {
      let cssPath = "";
      if (config.isSrcDir) {
        cssPath = path.resolve(cwd, "src/styles/globals.css");
      } else {
        cssPath = path.resolve(cwd, "styles/globals.css");
      }
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
  } catch (error) {
    dependenciesSpinner?.fail();
    handleError(error);
  }
}
