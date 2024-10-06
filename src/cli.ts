import { outro } from "@clack/prompts";
import { Logger } from "@micro-builder/package-practice";
import { cli } from "cleye";
import { version } from "../package.json";
import { commandName } from "./helpers/consts";
import { interactiveMode } from "./helpers/intractive-mode";

export async function main(projectPath: string) {
  console.log("Installing Tailwind in -> ", projectPath);
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
