export const FRAMEWORKS = {
  "next-app": {
    name: "next-app",
    label: "Next.js",
    links: {
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  "next-pages": {
    name: "next-pages",
    label: "Next.js",
    links: {
      tailwind: "https://tailwindcss.com/docs/guides/nextjs",
    },
  },
  remix: {
    name: "remix",
    label: "Remix",
    links: {
      tailwind: "https://tailwindcss.com/docs/guides/remix",
    },
  },
  vite: {
    name: "vite",
    label: "Vite",
    links: {
      installation: "https://ui.shadcn.com/docs/installation/vite",
      tailwind: "https://tailwindcss.com/docs/guides/vite",
    },
  },
  manual: {
    name: "manual",
    label: "Manual",
    links: {
      installation: "https://ui.shadcn.com/docs/installation/manual",
      tailwind: "https://tailwindcss.com/docs/installation",
    },
  },
} as const;

export type Framework = (typeof FRAMEWORKS)[keyof typeof FRAMEWORKS];
