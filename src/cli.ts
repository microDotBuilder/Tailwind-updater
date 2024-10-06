import { outro } from "@clack/prompts";
import { Logger } from "@micro-builder/package-practice";
import { cli } from "cleye";
import { version } from "../package.json";
import { commandName } from "./helpers/consts";
import { interactiveMode } from "./helpers/intractive-mode";
import { getProjectInfo } from "./helpers/get-project-info";
import {
  getPackageManager,
  getPackageRunner,
} from "./helpers/get-package-manager";
import { getFrameworkInfo } from "./helpers/utils";

export async function main(projectPath: string) {
  Logger.info(`Installing Tailwind in -> ${projectPath}`);
  const projectInfo = await getProjectInfo(projectPath);
  if (!projectInfo) {
    Logger.errorReturn("we appologize but this project is not supported yet");
    return;
  }
  const packageRunner = await getPackageRunner(projectPath);
  if (!packageRunner) {
    Logger.error("Package runner not supported yet....");
    return;
  }
  const packageManager = await getPackageManager(projectPath);
  if (!packageManager) {
    Logger.error("No package manager found");
    return;
  }
  const frameworkInfo = getFrameworkInfo({
    projectInfo,
    packageManager,
    packageRunner,
    cwd: projectPath,
  });
  Logger.info(`Framework info -> `);
  Logger.infoJSON(frameworkInfo);
  Logger.success("will run tailwind installer in future here .....");
}
cli(
  {
    name: commandName,
    version: version,
  },
  async () => {
    const result = await interactiveMode();
    outro(`Installing Tailwind in -> ${result}`);
    await main(result);
  }
);

process.on("SIGINT", () => {
  console.log("\n");
  outro(Logger.errorReturn("Stopping...."));
  console.log("\n");
  process.exit();
});
