import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";

export async function installTailwindForRemix({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for remix");
  Logger.warnJSON(config);
}
