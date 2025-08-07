# Vercel Deployment Guide

This guide covers deploying the Hyve Dynamics website to Vercel.

## Quick Start

### Option 1: Import from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build:vercel` (or leave as default `npm run build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Option 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Link to existing project or create new
   - Confirm settings
   - Deploy

## Configuration

### vercel.json
The project includes a `vercel.json` file that:
- Configures SPA routing (all routes → index.html)
- Sets cache headers for assets
- Optimizes performance

### Environment Variables
No special environment variables are needed for basic deployment.

## Features

### Automatic Features
- ✅ HTTPS by default
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Web Analytics (optional)

### Performance Optimizations
- Assets are cached for 1 year (immutable)
- Videos are cached for 24 hours
- Brotli compression enabled automatically

## Custom Domain

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### 404 Errors on Routes
- Ensure `vercel.json` exists with rewrite rules
- Check that `dist/index.html` exists

### Assets Not Loading
- Verify all assets are in the `dist` folder after build
- Check browser console for specific errors
- Assets should use relative paths (handled by Vite)

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Monitoring

1. **Analytics**: Enable Web Analytics in project settings
2. **Logs**: View function logs in the dashboard
3. **Performance**: Monitor Core Web Vitals

## Rollback

If issues occur after deployment:
1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." menu → "Promote to Production"

## Advanced Configuration

### Headers
Custom headers are configured in `vercel.json` for:
- Cache control
- Security headers (also set in vite.config.ts)

### Edge Functions
Can be added for:
- Server-side rendering
- API routes
- Dynamic content

## Comparison with GitHub Pages

| Feature | Vercel | GitHub Pages |
|---------|---------|--------------|
| Custom domains | ✅ | ✅ |
| HTTPS | ✅ | ✅ |
| Global CDN | ✅ | ✅ |
| Preview deploys | ✅ | ❌ |
| Serverless functions | ✅ | ❌ |
| Analytics | ✅ | ❌ |
| Instant rollbacks | ✅ | ❌ |
| Build time | ~1-2 min | ~3-5 min |

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/guides/deploying-vite-with-vercel)
- [Support](https://vercel.com/support)
