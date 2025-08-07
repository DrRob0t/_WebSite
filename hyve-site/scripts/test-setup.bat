@echo off
REM Hyve Dynamics - Testing & QA Setup Script for Windows
REM This script sets up testing tools for comprehensive QA

echo Setting up testing environment for Hyve Dynamics...

REM Install testing dependencies
echo Installing testing dependencies...
call npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom

REM Install accessibility testing
echo Installing accessibility testing tools...
call npm install --save-dev jest-axe

REM Install performance testing
echo Installing performance testing tools...
call npm install --save-dev lighthouse puppeteer

REM Install E2E testing framework
echo Installing E2E testing framework...
call npm install --save-dev playwright @playwright/test

echo Testing dependencies installed successfully!
echo.
echo Note: Configuration files need to be created manually on Windows.
echo Please refer to the documentation for setup instructions.
echo.
echo Available test commands after setup:
echo   npm test              - Run unit tests
echo   npm run test:ui       - Run tests with UI
echo   npm run test:coverage - Run tests with coverage
echo   npm run test:e2e      - Run E2E tests
echo   npm run test:a11y     - Run accessibility tests
echo.