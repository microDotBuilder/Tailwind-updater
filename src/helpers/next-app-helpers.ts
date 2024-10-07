import path from "path";
import ora from "ora";
import { Logger } from "@micro-builder/package-practice";
import { TAILWIND_CONFIG, TAILWIND_CONFIG_TS } from "./tailwind-template";
import template from "lodash.template";
import { handleError } from "./handle-error";
import fs from "fs-extra";
import { POSTCSS_CONFIG } from "./postcss-template";
import { PROJECT_DEPENDENCIES } from "./consts";
import { exec } from "child_process";
import { getPackageManager } from "./get-package-manager";

export async function runConfigFilesInstaller(cwd: string, isTsx: boolean) {
  const extension = isTsx ? "ts" : "js";
  const configFileName = isTsx ? "tailwind.config.ts" : "tailwind.config.js";
  const destination = path.join(cwd, configFileName);
  const srcContent = isTsx ? TAILWIND_CONFIG_TS : TAILWIND_CONFIG;

  try {
    await writeConfigToFile(destination, srcContent, extension);
  } catch (e) {
    handleError(e as string);
  }
}
export async function writeConfigToFile(
  des: string,
  src: string,
  extension: string
) {
  await fs.writeFile(
    des,
    template(src)({
      extension,
    }),
    "utf8",
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        handleError(err.message);
      }
    }
  );
}

export async function writePostcssConfigToFile(cwd: string) {
  const destination = path.join(cwd, "postcss.config.cjs");
  await fs.writeFile(
    destination,
    POSTCSS_CONFIG,
    "utf8",
    (err: NodeJS.ErrnoException | null) => {
      if (err) {
        handleError(err.message);
      }
    }
  );
}

export async function installTailwindDependencies(cwd: string) {
  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start();
  const packageManager = await getPackageManager(cwd);
  if (!packageManager) {
    handleError("Package manager not found");
  }

  const command = `${packageManager} ${
    packageManager === "npm" ? "install --save-dev" : "add --dev"
  } ${PROJECT_DEPENDENCIES.join(" ")}`;
  console.log(" ");
  Logger.logg(`running ${command}`);
  await exec(command, {
    cwd,
  });
  dependenciesSpinner?.succeed();
}
