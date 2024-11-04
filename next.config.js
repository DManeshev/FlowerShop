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
    DADATA_ACCESS_KEY: process.env.DADATA_ACCESS_KEY,
    DADATA_SECRET_KEY: process.env.DADATA_SECRET_KEY,
  },
}

module.exports = nextConfig
  