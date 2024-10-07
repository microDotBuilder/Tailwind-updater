import { Logger } from "@micro-builder/package-practice";

export function handleError(e: unknown) {
  if (typeof e === "string") {
    Logger.error(e);
    process.exit(1);
  }

  if (e instanceof Error) {
    Logger.error(e.message);
    process.exit(1);
  }

  Logger.error("Something went wrong. Please try again.");
  process.exit(1);
}
