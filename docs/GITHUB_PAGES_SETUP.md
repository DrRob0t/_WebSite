# GitHub Pages Deployment Guide

This guide explains how to deploy the Hyve Dynamics website to GitHub Pages.

> **Note:** GitHub Pages must be enabled in repository settings before the first deployment.

## 🚀 Automatic Deployment

The website is automatically deployed to GitHub Pages whenever you push to the `main` branch.

### GitHub Pages URL
Once deployed, your website will be available at:
```
https://drr0bot.github.io/_WebSite/
```

## 📋 Prerequisites

1. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` → `Pages`
   - Under "Build and deployment", select "GitHub Actions" as the source

## 🔧 Configuration

### Vite Configuration
The `vite.config.ts` file includes a base path configuration:
```typescript
base: process.env.GITHUB_PAGES ? '/_WebSite/' : '/',
```

This ensures all assets are loaded correctly when deployed to GitHub Pages.

### GitHub Actions Workflow
The deployment is handled by `.github/workflows/deploy.yml`, which:
1. Builds the project with the `GITHUB_PAGES` environment variable
2. Uploads the build artifacts
3. Deploys to GitHub Pages

## 🛠️ Manual Deployment

To build locally with GitHub Pages configuration:
```bash
npm run build:gh-pages
```

## 🔍 Troubleshooting

### Assets Not Loading
If assets don't load correctly, ensure:
1. The `base` path in `vite.config.ts` matches your repository name
2. All asset imports use relative paths

### 404 Errors
GitHub Pages doesn't support client-side routing by default. The current configuration handles this, but if you encounter issues:
1. Ensure the 404.html redirect is working
2. Check that all routes work from the base path

### Build Failures
Check the Actions tab in your GitHub repository for deployment logs.

## 📊 Monitoring

View deployment status:
1. Go to the `Actions` tab in your repository
2. Look for the "Deploy to GitHub Pages" workflow

## 🔒 Security Notes

- GitHub Pages sites are always public
- Don't commit sensitive information
- Environment variables are not available in the deployed site
