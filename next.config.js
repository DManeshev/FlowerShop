/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost', 'flower-storage.storage.yandexcloud.net', 'storage.yandexcloud.net'],
      deviceSizes: [320, 500, 768, 1024, 1300, 1500, 2048, 3840],
    },
    env: {
      SERVER_URL: process.env.SERVER_URL,
      APP_URL: process.env.APP_URL,
      DADATA_ACCESS_KEY: process.env.DADATA_ACCESS_KEY,
      DADATA_SECRET_KEY: process.env.DADATA_SECRET_KEY,
    },
    experimental: {
      appDir: true,
      webpackBuildWorker: true
    },
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      if (config.cache && !dev) {
        config.cache = Object.freeze({
          type: 'memory',
        })
      }
      // Important: return the modified config
      return config
    },
  }
  
  module.exports = nextConfig
  