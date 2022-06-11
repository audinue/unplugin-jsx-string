import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'

const resolve = (...paths: string[]) => path.resolve(__dirname, 'src', ...paths)

export default defineConfig({
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dirs: [resolve('composables')],
      vueTemplate: true,
      dts: resolve('typings/auto-import.d.ts'),
    }),
    Components({
      dts: resolve('typings/components.d.ts'),
    }),
    Unocss(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        'process.env.BABEL_TYPES_8_BREAKING': 'false',
        'process.platform': '"Darwin"',
        'Buffer.isBuffer': 'undefined',
      },
    },
  },
})
