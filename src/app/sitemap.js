import { SITE } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/dashboard`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
