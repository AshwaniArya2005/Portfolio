import { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.siteUrl || "https://localhost:3000",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
