export const commandName = "tailwindcss-installer";
export const projectName = "TailwindCSS Installer";
export const rootDir = process.cwd();

export const PROJECT_DEPENDENCIES = [
  "tailwindcss-animate",
  "tailwindcss",
  "@tailwindcss/typography",
  "tailwind-merge",
  "postcss",
  "autoprefixer",
];

// TODO: Add support for more frameworks.
// We'll start with Next.js for now.
export const PROJECT_TYPES = [
  "next-app",
  "next-app-src",
  "next-pages",
  "next-pages-src",
  "remix-app",
  "vite-app",
  "manual",
] as const;
