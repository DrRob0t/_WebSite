#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = process.argv[2] || 'http://localhost:5173';
const OUTPUT_DIR = path.join(process.cwd(), 'web-review-results');

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

console.log('\n🔍 Hyve Dynamics Web Review Tool\n');
console.log(`Analyzing: ${URL}\n`);

// Run Lighthouse
console.log('⚡ Running Lighthouse audit...');
try {
  execSync(`lighthouse ${URL} --output=html --output=json --output-path="${path.join(OUTPUT_DIR, 'lighthouse')}" --chrome-flags="--headless" --quiet`, { stdio: 'inherit' });
  console.log('✅ Lighthouse audit complete\n');
} catch (error) {
  console.error('❌ Lighthouse audit failed:', error.message);
}

// Read and analyze Lighthouse JSON
const lighthouseJsonPath = path.join(OUTPUT_DIR, 'lighthouse.report.json');
if (fs.existsSync(lighthouseJsonPath)) {
  const lhr = JSON.parse(fs.readFileSync(lighthouseJsonPath, 'utf8'));
  
  console.log('📊 Lighthouse Scores:');
  console.log('─────────────────────');
  console.log(`Performance:    ${Math.round(lhr.categories.performance.score * 100)}/100`);
  console.log(`Accessibility:  ${Math.round(lhr.categories.accessibility.score * 100)}/100`);
  console.log(`Best Practices: ${Math.round(lhr.categories['best-practices'].score * 100)}/100`);
  console.log(`SEO:           ${Math.round(lhr.categories.seo.score * 100)}/100`);
  console.log(`PWA:           ${Math.round(lhr.categories.pwa.score * 100)}/100`);
  
  console.log('\n📱 Core Web Vitals:');
  console.log('─────────────────────');
  const metrics = {
    'first-contentful-paint': 'First Contentful Paint',
    'largest-contentful-paint': 'Largest Contentful Paint',
    'total-blocking-time': 'Total Blocking Time',
    'cumulative-layout-shift': 'Cumulative Layout Shift',
    'speed-index': 'Speed Index',
  };
  
  Object.entries(metrics).forEach(([id, name]) => {
    const audit = lhr.audits[id];
    if (audit) {
      const status = audit.score >= 0.9 ? '✅' : audit.score >= 0.5 ? '⚠️' : '❌';
      console.log(`${status} ${name}: ${audit.displayValue}`);
    }
  });
  
  // PWA Analysis
  console.log('\n📱 PWA Readiness:');
  console.log('─────────────────────');
  const pwaChecks = [
    { id: 'installable-manifest', name: 'Web App Manifest' },
    { id: 'service-worker', name: 'Service Worker' },
    { id: 'offline-start-url', name: 'Offline Support' },
    { id: 'https-redirects', name: 'HTTPS' },
    { id: 'viewport', name: 'Viewport Meta' },
    { id: 'apple-touch-icon', name: 'Apple Touch Icon' },
  ];
  
  pwaChecks.forEach(check => {
    const audit = lhr.audits[check.id];
    if (audit) {
      const status = audit.score === 1 ? '✅' : '❌';
      console.log(`${status} ${check.name}`);
    }
  });
  
  // Accessibility Issues
  const a11yIssues = Object.values(lhr.audits)
    .filter(audit => audit.score !== null && audit.score < 1)
    .filter(audit => lhr.categories.accessibility.auditRefs.some(ref => ref.id === audit.id));
  
  if (a11yIssues.length > 0) {
    console.log('\n♿ Accessibility Issues:');
    console.log('─────────────────────');
    a11yIssues.slice(0, 5).forEach(audit => {
      console.log(`❌ ${audit.title}`);
    });
  }
  
  // SEO Issues
  const seoIssues = Object.values(lhr.audits)
    .filter(audit => audit.score !== null && audit.score < 1)
    .filter(audit => lhr.categories.seo.auditRefs.some(ref => ref.id === audit.id));
  
  if (seoIssues.length > 0) {
    console.log('\n🔍 SEO Issues:');
    console.log('─────────────────────');
    seoIssues.slice(0, 5).forEach(audit => {
      console.log(`❌ ${audit.title}`);
    });
  }
  
  // Recommendations
  console.log('\n🎯 Top Recommendations:');
  console.log('─────────────────────');
  
  if (lhr.categories.performance.score < 0.9) {
    console.log('1. Improve Performance Score (currently ' + Math.round(lhr.categories.performance.score * 100) + '/100)');
    const opportunities = Object.values(lhr.audits)
      .filter(audit => audit.details && audit.details.type === 'opportunity' && audit.numericValue > 0)
      .sort((a, b) => b.numericValue - a.numericValue)
      .slice(0, 3);
    
    opportunities.forEach((opp, i) => {
      console.log(`   ${String.fromCharCode(97 + i)}) ${opp.title} (save ~${(opp.numericValue / 1000).toFixed(1)}s)`);
    });
  }
  
  if (lhr.categories.accessibility.score < 1) {
    console.log(`2. Fix Accessibility Issues (${a11yIssues.length} issues found)`);
  }
  
  if (lhr.categories.pwa.score < 0.8) {
    console.log('3. Implement PWA Features for offline support and installability');
  }
  
  if (lhr.categories.seo.score < 1) {
    console.log(`4. Address SEO Issues (${seoIssues.length} issues found)`);
  }
  
  // Generate summary report
  const summary = {
    timestamp: new Date().toISOString(),
    url: URL,
    scores: {
      performance: Math.round(lhr.categories.performance.score * 100),
      accessibility: Math.round(lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
      seo: Math.round(lhr.categories.seo.score * 100),
      pwa: Math.round(lhr.categories.pwa.score * 100),
    },
    coreWebVitals: {
      fcp: lhr.audits['first-contentful-paint'].displayValue,
      lcp: lhr.audits['largest-contentful-paint'].displayValue,
      cls: lhr.audits['cumulative-layout-shift'].displayValue,
      tbt: lhr.audits['total-blocking-time'].displayValue,
    },
    issues: {
      accessibility: a11yIssues.length,
      seo: seoIssues.length,
    },
  };
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'web-review-summary.json'), JSON.stringify(summary, null, 2));
  
  console.log('\n📁 Reports saved to:', OUTPUT_DIR);
  console.log('   • lighthouse.report.html - Full interactive report');
  console.log('   • lighthouse.report.json - Raw data');
  console.log('   • web-review-summary.json - Summary data');
  
  console.log('\n✅ Web review complete!');
  console.log('\nNext steps:');
  console.log('1. Open lighthouse.report.html in your browser for detailed analysis');
  console.log('2. Review the recommendations above');
  console.log('3. Run specific tests: npm run test:a11y, npm run test:responsive');
} else {
  console.error('❌ Could not find Lighthouse results');
}
