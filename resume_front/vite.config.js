import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.TARO_ENV': '"weapp"'
  },
  build: {
    target: ['es2015'],
    minify: false,
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015'
    }
  }
})
