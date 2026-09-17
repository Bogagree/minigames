import { defineConfig } from 'vite';

export default defineConfig({
  base: '/minigames/',
  server: {
    // Windows/Chrome often resolve localhost → 127.0.0.1; bind IPv4 explicitly
    host: '127.0.0.1',
    port: 5173,
    strictPort: false,
  },
});
