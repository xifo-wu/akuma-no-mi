import { resolve } from 'path';
import { defineConfig } from 'vite';
import { swc } from 'rollup-plugin-swc3';
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    target: 'ESNext',
    rollupOptions: {
      input: resolve(__dirname, 'src/index.ts'),
      output: [
        {
          format: 'es',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: 'lib',
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          //配置打包根目录
          dir: 'lib',
        },
      ],
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    swc(),
    dts({
      outputDir: "lib"
    }),
  ],
});
