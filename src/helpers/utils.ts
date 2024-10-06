import fg from "fast-glob";
import {
  FrameworkConfig,
  PackageManagerType,
  PackageRunnerType,
  ProjectInfo,
} from "../types/misc";

export function getFrameworkInfo({
  projectInfo,
  packageManager,
  packageRunner,
  cwd,
}: {
  projectInfo: ProjectInfo;
  packageManager: PackageManagerType;
  packageRunner: PackageRunnerType;
  cwd: string;
}): FrameworkConfig {
  return {
    ...projectInfo,
    packageManager,
    packageRunner,
    cwd,
  };
}

export async function findGlobalCssPath(cwd: string) {
  const cssPath = fg.glob.sync("**/{globals,global}.css", {
    cwd,
    absolute: true,
  });
  return cssPath[0];
}
