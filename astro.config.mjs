// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    // Enable minification
    minify: true,
    // Enable asset inlining for critical resources
    inlineStylesheets: 'auto',
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
        }
      }
    }
  },
  vite: {
    build: {
      // Enable CSS minification
      cssMinify: true,
      // Enable JS minification with terser for better compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Optimize chunk size
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor chunk for Three.js
            if (id.includes('node_modules/three')) {
              return 'three-vendor';
            }
            // Separate chunk for large dependencies
            if (id.includes('node_modules') && id.length > 1000) {
              return 'vendor-large';
            }
          }
        }
      }
    },
    // Enable compression during dev
    server: {
      compression: true
    }
  },
});