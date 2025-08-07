# Lighthouse Audit Issues Documentation

## Date: January 2025

### Issue Summary
We encountered several issues when attempting to run Lighthouse performance audits. This document tracks these issues for future resolution.

## Issues Encountered

### 1. ES Module Compatibility Issue
**Error**: `require is not defined in ES module scope`
- **File**: `scripts/lighthouse-test.js`
- **Cause**: The project has `"type": "module"` in package.json, but the lighthouse script was using CommonJS syntax
- **Attempted Fix**: Converted to ES module syntax with `import` statements
- **Status**: Partially fixed, but encountered import issues with chrome-launcher

### 2. Chrome Launcher Import Issue
**Error**: `The requested module 'chrome-launcher' does not provide an export named 'default'`
- **Attempted Fix**: Changed to `import * as chromeLauncher from 'chrome-launcher'`
- **Status**: Fixed

### 3. Preview Server Connection Issue
**Error**: `Chrome prevented page load with an interstitial. Make sure you are testing the correct URL`
- **URL**: `http://localhost:5173`
- **Cause**: Preview server was not running or not accessible
- **Notes**: 
  - The Lighthouse script ran but couldn't connect to the development server
  - All metrics returned 0 due to connection failure
  - Need to ensure server is running before executing Lighthouse tests

## Required Fixes

1. **Update package.json scripts** to ensure server is running:
   ```json
   "test:lighthouse": "npm run build && npm run preview & sleep 5 && node scripts/lighthouse-test.js"
   ```

2. **Alternative: Use concurrently package**:
   ```json
   "test:lighthouse": "concurrently \"npm run preview\" \"wait-on http://localhost:5173 && node scripts/lighthouse-test.js\""
   ```

3. **Update lighthouse-test.js** to handle server startup:
   - Add retry logic for connection
   - Better error handling for server not ready
   - Option to start server programmatically

## Next Steps

1. Install required dependencies:
   - `wait-on` - for waiting for server to be ready
   - `concurrently` - for running multiple commands

2. Update the Lighthouse script with better error handling

3. Create a more robust testing setup that ensures the server is running

## Workaround for Now

Manual steps to run Lighthouse:
1. Build the project: `npm run build`
2. Start preview server in one terminal: `npm run preview`
3. In another terminal, run: `node scripts/lighthouse-test.js`

## Related Files
- `/scripts/lighthouse-test.js`
- `/package.json`
- `/playwright.config.ts` (has similar server setup that works)
