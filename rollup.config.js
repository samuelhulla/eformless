import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel'
import { rollup } from "rollup";
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { 
      file: pkg.main,
      format: cjs,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
};