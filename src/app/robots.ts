import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard', '/auth', '/thanks', '/api/']
        },
        sitemap: 'https://yourflowers21.ru/sitemap.xml'
    }
}