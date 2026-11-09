import type { MetadataRoute } from 'next'

const BASE = 'https://www.librixacademy.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/calculadoras`, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
