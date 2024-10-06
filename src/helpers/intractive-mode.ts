import { intro, log, text } from "@clack/prompts";
import { exitOnCancel } from "./exit-on-cancel";
import path from "path";

export async function interactiveMode() {
  console.log("");
  intro("🦾 Micro Builder CLI");

  const cwd = process.cwd();

  log.info(`Current directory: ${cwd}`);
  const isUserInDir = exitOnCancel(
    await text({
      message: "Are you in the right directory?",
      placeholder: "Y or N",
      validate: (input) => {
        input = input.toLocaleLowerCase();
        if (input !== "y" && input !== "n") {
          return "Please provide a valid response";
        }
      },
    })
  );

  const result = isUserInDir === "Y" || isUserInDir === "y" ? true : false;
  if (!result) {
    const projPath = exitOnCancel(
      await text({
        message:
          "enter the path to the project directory where you want to install tailwindcss",
        placeholder: "/path/to/project",
      })
    );
    return path.join(cwd, projPath);
  }
  return cwd;
}
