import { detect } from "@antfu/ni";
import { PackageManagerType, PackageRunnerType } from "../types/misc";
import { Logger } from "@micro-builder/package-practice";

export async function getPackageManager(
  targetDir: string,
  { withFallback }: { withFallback?: boolean } = {
    withFallback: false,
  }
): Promise<PackageManagerType | null> {
  // Logger.warn(`targetDir -> ${targetDir}`);
  const packageManager = await detect({ programmatic: true, cwd: targetDir });
  // Logger.info(`packageManager  inside the function -> ${packageManager}`);
  if (packageManager === "yarn@berry") return "yarn";
  if (packageManager === "pnpm@6") return "pnpm";
  if (packageManager === "bun") return "bun";

  if (!withFallback) {
    return packageManager ?? "npm";
  }

  // Fallback to user agent if not detected.
  const userAgent = process.env.npm_config_user_agent || "";
  if (userAgent.startsWith("yarn")) {
    return "yarn";
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm";
  }

  if (userAgent.startsWith("bun")) {
    return "bun";
  }

  return "npm";
}

export async function getPackageRunner(
  cwd: string
): Promise<PackageRunnerType | null> {
  const packageManager = await getPackageManager(cwd);
  if (packageManager === "pnpm") return "pnpm dlx";

  if (packageManager === "bun") return "bunx";

  return "npx";
}
