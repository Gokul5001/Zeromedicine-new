// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   build: {
//     target: 'es2018',
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           react: ['react', 'react-dom'],
//           vendor: ['react-router-dom'], // separate router from app code
//         },
//       },
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ── Plugin: convert blocking <link rel="stylesheet"> into async-loaded CSS ──
function deferCss() {
  return {
    name: 'defer-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"([^>]*?) href="([^"]+\.css)">/g,
        (match, attrs, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'"${attrs}>
<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), deferCss()],
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom'], // separate router from app code
        },
      },
    },
  },
})