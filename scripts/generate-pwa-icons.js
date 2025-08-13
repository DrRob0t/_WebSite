#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_SIZES = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 192, name: 'icon-maskable-192.png', maskable: true },
  { size: 512, name: 'icon-maskable-512.png', maskable: true },
];

const SOURCE_SVG = path.join(process.cwd(), 'public', 'favicon.svg');
const OUTPUT_DIR = path.join(process.cwd(), 'public');

console.log('🎨 Generating PWA Icons...\n');

// Check if source SVG exists
if (!fs.existsSync(SOURCE_SVG)) {
  console.error('❌ Source SVG not found:', SOURCE_SVG);
  console.log('\n💡 Using fallback method: Creating placeholder icons with brand colors');
  
  // Create placeholder icons with brand colors
  ICON_SIZES.forEach(async ({ size, name, maskable }) => {
    const padding = maskable ? Math.round(size * 0.1) : 0;
    const iconSize = size - (padding * 2);
    
    try {
      // Create a gradient background similar to the brand
      const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${size}" height="${size}" fill="#0B0E1B" />
          <rect x="${padding}" y="${padding}" width="${iconSize}" height="${iconSize}" rx="${iconSize * 0.1}" fill="url(#grad)" />
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${iconSize * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">HD</text>
        </svg>
      `;
      
      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(OUTPUT_DIR, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  });
  
  process.exit(0);
}

// Generate icons from SVG
async function generateIcons() {
  for (const { size, name, maskable } of ICON_SIZES) {
    try {
      const padding = maskable ? Math.round(size * 0.1) : 0;
      
      await sharp(SOURCE_SVG)
        .resize(size - (padding * 2), size - (padding * 2))
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: maskable ? '#4F46E5' : { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(OUTPUT_DIR, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${name}:`, error.message);
    }
  }
}

generateIcons().then(() => {
  console.log('\n✨ PWA icons generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Test PWA installation on mobile device');
  console.log('2. Add service worker for offline support');
  console.log('3. Consider adding splash screens for iOS');
}).catch(error => {
  console.error('\n❌ Error generating icons:', error);
});
