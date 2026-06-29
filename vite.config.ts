import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    outDir: 'docs',
    lib: {
      entry: 'human-panel.ts',
      name: 'HumanEngine',
      fileName: 'human-engine'
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js'],
      output: {
        globals: {
          lit: 'lit',
          'lit/decorators.js': 'lit.decorators'
        }
      }
    }
  }
});
