import { existsSync, readFileSync, writeFileSync } from "fs";
import { GLOBAL_CSS_CONTENT } from "./tailwind-template";

export async function updateGlobalCss(cwd: string, globalCssPath: string) {
  if (existsSync(globalCssPath)) {
    const existingContent = readFileSync(globalCssPath, { encoding: "utf-8" });
    if (
      !existingContent
        .replace(/\s+/g, "")
        .includes(GLOBAL_CSS_CONTENT.replace(/\s+/g, ""))
    ) {
      const updatedContent = `${GLOBAL_CSS_CONTENT}\n\n${existingContent}`;
      writeFileSync(globalCssPath, updatedContent, { encoding: "utf-8" });
    }
  }
}

export async function createGlobalCss(cwd: string, globalCssPath: string) {
  if (!existsSync(globalCssPath)) {
    writeFileSync(globalCssPath, GLOBAL_CSS_CONTENT, {
      encoding: "utf-8",
    });
  }
}
