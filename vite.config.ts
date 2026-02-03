import * as path from 'path'

import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
// import createSitemap from 'vite-plugin-sitemap'
import { defineConfig } from 'vite'

// Enhanced security headers for production
const getSecurityHeaders = (isProduction = false) => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',
    'usb=()',
    'serial=()',
    'bluetooth=()',
  ].join(', '),
  ...(isProduction && {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Expect-CT': 'max-age=86400, enforce',
  }),
  'Content-Security-Policy': [
    "default-src 'self'",
    isProduction
      ? "script-src 'self' https://cdnjs.cloudflare.com"
      : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "font-src 'self' fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.hyvedynamics.com",
    "media-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'none'",
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; '),
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
})

// Check if running in tunnel mode (ngrok, localtunnel, etc.)
const isTunnelMode = process.env.TUNNEL === 'true'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/_WebSite/' : '/',
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
    // Note: Sitemap created manually in public/sitemap.xml
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Enable host access for tunneling (ngrok, localtunnel, etc.)
    host: isTunnelMode ? true : 'localhost',
    port: 5173,
    // Allow all hosts when tunneling (ngrok, localtunnel, etc.)
    allowedHosts: isTunnelMode ? true : undefined,
    // Allow connections from tunnel services
    cors: isTunnelMode,
    // Relaxed headers for tunnel mode, strict for local dev
    headers: isTunnelMode ? undefined : getSecurityHeaders(false),
    // Allow HMR through tunnels
    hmr: isTunnelMode
      ? {
          // Use the tunnel URL for WebSocket connections
          clientPort: 443,
          protocol: 'wss',
        }
      : true,
  },
  preview: {
    headers: getSecurityHeaders(true), // Production-like headers for preview
  },
  build: {
    // Optimize build
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-core'
          }
          
          // React Router
          if (id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run/')) {
            return 'react-router'
          }
          
          // Framer Motion (large library)
          if (id.includes('node_modules/framer-motion/')) {
            return 'framer-motion'
          }
          
          // Radix UI components
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix-ui'
          }
          
          // Form handling
          if (id.includes('node_modules/react-hook-form/') ||
              id.includes('node_modules/@hookform/') ||
              id.includes('node_modules/zod/')) {
            return 'forms'
          }
          
          // Three.js (if used)
          if (id.includes('node_modules/three/')) {
            return 'three'
          }
          
          // Lucide icons
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons'
          }
          
          // Other utilities
          if (id.includes('node_modules/clsx/') ||
              id.includes('node_modules/tailwind-merge/') ||
              id.includes('node_modules/class-variance-authority/')) {
            return 'utils'
          }
          
          // Sonner (toast notifications)
          if (id.includes('node_modules/sonner/')) {
            return 'sonner'
          }
          
          // PDF libraries (lazy loaded with newsletter pages)
          if (id.includes('node_modules/pdfjs-dist/') ||
              id.includes('node_modules/jspdf/') ||
              id.includes('node_modules/html2canvas/')) {
            return 'pdf-libs'
          }
        },
      },
    },
  },
})
