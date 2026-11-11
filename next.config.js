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
    qualities: [25, 50, 75, 100]
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    APP_URL: process.env.APP_URL,
    YANDEX_WEBMASTER: process.env.YANDEX_WEBMASTER,
    GOOGLE_GSC: process.env.GOOGLE_GSC,
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
