import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    // Enable minification
    minify: true,
    // Enable asset inlining for critical resources
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      // Enable CSS minification
      cssMinify: true,
      // Enable JS minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep console logs for debugging
          drop_debugger: true,
        },
      },
      // Optimize chunk handling
      rollupOptions: {
        output: {
          manualChunks: {
            'three-vendor': ['three']
          }
        }
      }
    },
    // Optimizations for development
    optimizeDeps: {
      include: ['three']
    }
  }
});