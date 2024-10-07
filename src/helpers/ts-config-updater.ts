import fs from "fs-extra";
import { Logger } from "@micro-builder/package-practice";

export async function updateTsConfig(tsConfigPath: string) {
  //read tsconfig.json
  const data = JSON.parse(await fs.readFile(tsConfigPath, "utf8"));
  Logger.loggJSON(data);
  if (!data.include.includes("postcss.config.cjs")) {
    data.include.push("postcss.config.cjs");
  }
  await fs.writeFile(tsConfigPath, JSON.stringify(data, null, 2));
}
