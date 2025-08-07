#!/bin/bash

# Hyve Dynamics - Testing & QA Setup Script
# This script sets up testing tools for comprehensive QA

echo "🚀 Setting up testing environment for Hyve Dynamics..."

# Install testing dependencies
echo "📦 Installing testing dependencies..."
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom

# Install accessibility testing
echo "♿ Installing accessibility testing tools..."
npm install --save-dev jest-axe

# Install performance testing
echo "⚡ Installing performance testing tools..."
npm install --save-dev lighthouse puppeteer

# Install E2E testing framework
echo "🎭 Installing E2E testing framework..."
npm install --save-dev playwright @playwright/test

# Create test config files
echo "📝 Creating test configuration files..."

# Create vitest config
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
EOF

# Create test setup file
mkdir -p src/test
cat > src/test/setup.ts << 'EOF'
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
EOF

# Update package.json scripts
echo "📋 Updating package.json scripts..."
node -e "
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts = {
  ...packageJson.scripts,
  'test': 'vitest',
  'test:ui': 'vitest --ui',
  'test:coverage': 'vitest --coverage',
  'test:e2e': 'playwright test',
  'test:e2e:ui': 'playwright test --ui',
  'test:lighthouse': 'node scripts/lighthouse-test.js',
  'test:a11y': 'vitest src/**/*.a11y.test.{ts,tsx}'
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
"

echo "✅ Testing setup complete!"
echo ""
echo "Available test commands:"
echo "  npm test              - Run unit tests"
echo "  npm run test:ui       - Run tests with UI"
echo "  npm run test:coverage - Run tests with coverage"
echo "  npm run test:e2e      - Run E2E tests"
echo "  npm run test:a11y     - Run accessibility tests"
echo ""