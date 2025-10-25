import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
  name: 'D6VS - Your Vision, Brought to life',
    short_name: 'D6VS',
  description: 'Turn your ideas into action and make them matter. Your vision, alive, impactful, and seen by the world.',
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