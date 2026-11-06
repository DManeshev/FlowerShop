/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'flower-storage.storage.yandexcloud.net',
      },
      {
        hostname: 'storage.yandexcloud.net',
      }
    ],
    deviceSizes: [320, 500, 768, 1024, 1300, 1500, 2048, 3840],
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
  },
  async headers() {
    return [
      {
        source: '/dashboard/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' }
        ]
      }
    ]
  },
}

module.exports = nextConfig
