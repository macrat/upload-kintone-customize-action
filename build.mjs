import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  minify: true,
  sourcemap: true,
  platform: 'node',
  target: ['node22'],
  treeShaking: true,
}).then(() => {
  console.log('Build completed successfully');
}).catch((err) => {
  console.error('Build failed', err);
  process.exit(1);
});
