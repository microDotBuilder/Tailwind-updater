import { PROJECT_TYPES } from "../helpers/consts";
import { Framework } from "../helpers/template";

export type PackageManagerType = "yarn" | "pnpm" | "bun" | "npm";
export type PackageRunnerType = "pnpm dlx" | "bunx" | "npx";

export type FrameworkConfig = ProjectInfo & {
  packageManager: PackageManagerType;
  packageRunner: PackageRunnerType;
  cwd: string;
};

export type ProjectInfo = {
  framework: Framework;
  isSrcDir: boolean;
  isRSC: boolean;
  isTsx: boolean;
  globalCssPath: string | null;
  aliasPrefix: string | null;
  TypescriptConfig?: unknown;
  tsconfigPath?: string;
};

export type ProjectType = (typeof PROJECT_TYPES)[number];
