export const SITE_URL = "http://localhost:3000";

export const SITE_INFO = {
  title: "Subtio",
  description: "Ai powered A simple subtitle generator app.",
  url: SITE_URL,
  openGraphImage: "/open-graph/default.jpg",
  twitterImage: "/open-graph/default.jpg",
  favicon: "/favicon.ico",
};

export const EXTERNAL_TOOLS = [
  {
    name: "Vercel",
    description: "Platform where we deploy and host OpenCut",
    url: "https://vercel.com?utm_source=opencut",
    icon: "VercelIcon" as const,
  },
];
