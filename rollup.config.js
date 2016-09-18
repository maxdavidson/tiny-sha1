/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  moduleName: 'sha1',
  moduleId: 'tiny-sha1',
  sourceMap: true,
  plugins: [
    babel(),
  ],
  targets: [
    { dest: 'dist/tiny-sha1.js', format: 'umd' },
    { dest: 'dist/tiny-sha1.es.js', format: 'es' },
  ],
};
