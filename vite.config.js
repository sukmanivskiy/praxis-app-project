import { defineConfig } from 'vite'
import path from 'path'
import {resolve} from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        todo: resolve(__dirname, 'src/todo/index.html'),
        notes: resolve(__dirname, 'src/notes/index.html'),
        philosophy: resolve(__dirname, 'src/philosophy/index.html'),
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: path.resolve('src') + '/',
      },
    ],
  },

  css: {
    modules: {
      scopeBehaviour: 'local',
      globalModulePaths: [],
      generateScopedName: undefined,
      hashPrefix: '',
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/helpers' as *;
        `,
        silenceDeprecations: ['legacy-js-api'],
      },
      less: {},
      stylus: {},
    },
  },
})
