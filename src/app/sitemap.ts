import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { ARTICLES } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const staticRoutes = [
    "", "/services", "/prices", "/tools", "/knowledge", "/updates",
    "/cases", "/about", "/contacts", "/switch-accountant", "/start-business",
    "/tools/calculator", "/tools/tax-calculator", "/tools/salary",
    "/tools/ip-cost", "/tools/calendar", "/tools/need-accountant",
    "/tools/ip-checklist", "/tools/ooo-checklist", "/tools/reporting-checklist", "/tools/health-check",
    "/tools/tax-helper",
  ].map((r) => ({ url: base + r, lastModified: new Date() }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`, lastModified: new Date(),
  }));
  const articleRoutes = ARTICLES.map((a) => ({
    url: `${base}/knowledge/${a.slug}`, lastModified: new Date(a.updatedAt),
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
