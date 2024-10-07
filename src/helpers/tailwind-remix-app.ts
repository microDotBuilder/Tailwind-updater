import { Logger } from "@micro-builder/package-practice";
import { FrameworkConfig } from "../types/misc";

//TODO :
/**
 * step 1 : tailwind.config.ts
 * step 2 : postcss.config.js
  step 3  : install tailwind packages
  step 4 : create tailwind.css file in app/tailwind.css
  step 5 : update the root.tsx in app/root.tsx 
  import "./tailwind.css";
 
 */

export async function installTailwindForRemix({
  config,
}: {
  config: FrameworkConfig;
}) {
  Logger.info("installing tailwind for remix");
  Logger.warnJSON(config);
}
