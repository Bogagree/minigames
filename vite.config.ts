import { defineConfig } from 'vite';

export default defineConfig({
  base: '/minigames/',
  server: {
    // Listen on all IPv4 interfaces so Chrome can use 127.0.0.1
    // Prefer http://127.0.0.1:5173/minigames/ — Chrome often resolves
    // localhost → ::1 (IPv6), which this bind does not serve.
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      // Native FS watch on Windows throws EBUSY when JPGs are locked
      // (OneDrive / antivirus / another Vite). Images rarely need HMR.
      ignored: ['**/src/assets/images/**'],
    },
  },
});
