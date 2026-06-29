import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: 'humanizer-panel.ts',
      name: 'HumanizerEngine',
      fileName: 'humanizer-engine'
    },
    rollupOptions: {
      external: ['lit', 'lit/decorators.js'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    }
  }
});
