import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourflowers21.ru',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://yourflowers21.ru/category',
      lastModified: new Date(),
    },
    {
        url: 'https://yourflowers21.ru/product',
        lastModified: new Date(),
      },
    {
      url: 'https://yourflowers21.ru/delivery',
      lastModified: new Date(),
    },
  ]
}