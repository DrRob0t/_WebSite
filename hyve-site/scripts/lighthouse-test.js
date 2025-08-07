const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port
  };
  
  const runnerResult = await lighthouse(url, options);
  
  // Generate HTML report
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lighthouse-report.html', reportHtml);
  
  // Log scores
  const scores = {
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
  };
  
  console.log('\n📊 Lighthouse Scores:');
  console.log('===================');
  console.log(`Performance: ${scores.performance}`);
  console.log(`Accessibility: ${scores.accessibility}`);
  console.log(`Best Practices: ${scores.bestPractices}`);
  console.log(`SEO: ${scores.seo}`);
  
  // Log Core Web Vitals
  const metrics = runnerResult.lhr.audits;
  console.log('\n🚀 Core Web Vitals:');
  console.log('==================');
  console.log(`LCP: ${metrics['largest-contentful-paint'].displayValue}`);
  console.log(`FID: ${metrics['max-potential-fid'].displayValue}`);
  console.log(`CLS: ${metrics['cumulative-layout-shift'].displayValue}`);
  console.log(`FCP: ${metrics['first-contentful-paint'].displayValue}`);
  console.log(`TTFB: ${metrics['server-response-time'].displayValue}`);
  
  await chrome.kill();
  
  // Return scores for CI/CD integration
  return scores;
}

// Run the test
const url = process.argv[2] || 'http://localhost:5173';
console.log(`🔍 Running Lighthouse audit on ${url}...`);

runLighthouse(url)
  .then(scores => {
    console.log('\n✅ Lighthouse audit complete!');
    console.log('📄 Full report saved to: lighthouse-report.html');
    
    // Exit with error if any score is below threshold
    const threshold = 80;
    const failed = Object.entries(scores).filter(([name, score]) => score < threshold);
    
    if (failed.length > 0) {
      console.error(`\n❌ Failed metrics (below ${threshold}):`);
      failed.forEach(([name, score]) => {
        console.error(`   ${name}: ${score}`);
      });
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Error running Lighthouse:', err);
    process.exit(1);
  });