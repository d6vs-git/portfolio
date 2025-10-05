import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'D6VS - Professional Digital Solutions',
    short_name: 'D6VS',
    description: 'Professional digital solutions from design to deployment. We create websites, mobile apps, AI solutions, and provide comprehensive digital services.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#f94706',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: [
      'business',
      'productivity',
      'developer'
    ],
    lang: 'en',
    dir: 'ltr'
  }
}