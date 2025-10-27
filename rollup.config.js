import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/cronostar-card.js',
    format: 'es',
    sourcemap: !production,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions', 'not dead', 'not ie 11']
          }
        }]
      ]
    }),
    production && terser({
      format: {
        comments: false,
      },
      compress: {
        drop_console: false, // Keep console.log for debugging
      }
    }),
  ],
};