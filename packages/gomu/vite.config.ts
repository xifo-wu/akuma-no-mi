import { resolve } from 'path';
import { defineConfig } from 'vite';
import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import dts from "vite-plugin-dts";
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    target: 'ESNext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'styled-components', 'clsx', 'react-is', 'react/jsx-runtime'],
      output: {
        format: "es",
        entryFileNames: '[name].js',
        esModule: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        dir: 'lib',
      },
    },
  },
  plugins: [
    react(),
    swc(defineRollupSwcOption({
      sourceMaps: true,
    })),
    dts({
      outputDir: "lib"
    }),
  ],
});
