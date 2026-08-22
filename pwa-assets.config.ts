import {
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
  headLinkOptions: {
    preset: '2023'
  },
  preset: {
    ...minimal2023Preset,
    appleSplashScreens: createAppleSplashScreens({
      padding: 0.3,
      resizeOptions: { fit: 'contain', background: '#ffffff' },
      darkResizeOptions: { fit: 'contain', background: '#1c1b1e' },
      linkMediaOptions: {
        log: true,
        addMediaScreen: true,
        xhtml: false
      },
      png: {
        compressionLevel: 6,
        quality: 85
      }
    }, ['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro Max'])
  },
  images: ['public/icon-pwa.svg']
})
