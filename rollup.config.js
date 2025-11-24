import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'

export default [
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'VueActionAuthButton',
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      vue({
        css: false,
        style: false
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  },
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      vue({
        css: false,
        style: false
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      nodeResolve(),
      commonjs(),
      vue({
        css: false,
        style: false
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  }
]