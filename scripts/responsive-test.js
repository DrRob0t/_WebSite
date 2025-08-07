#!/usr/bin/env node

/**
 * Responsive Design Testing Script
 * Tests the website across different viewport sizes
 */

import puppeteer from 'puppeteer'

const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'iPad', width: 768, height: 1024 },
  { name: 'iPad Pro', width: 1024, height: 1366 },
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: '4K', width: 2560, height: 1440 },
]

const pages = [
  { path: '/', name: 'Home' },
  { path: '/haptic-matrix', name: 'Haptic Matrix' },
  { path: '/industries/aerospace', name: 'Aerospace' },
  { path: '/about', name: 'About' },
]

async function testResponsiveness() {
  console.log('🔍 Starting Responsive Design Tests...\n')
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results = []

  for (const viewport of viewports) {
    console.log(`📱 Testing ${viewport.name} (${viewport.width}x${viewport.height})`)
    
    const page = await browser.newPage()
    await page.setViewport(viewport)

    for (const pageInfo of pages) {
      const url = `http://localhost:5173${pageInfo.path}`
      
      try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        
        // Check for horizontal scroll
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth
        })

        // Check for touch target sizes
        const smallTouchTargets = await page.evaluate(() => {
          const elements = document.querySelectorAll('button, a, input, [role="button"]')
          const small = []
          
          elements.forEach(el => {
            const rect = el.getBoundingClientRect()
            if (rect.width < 44 || rect.height < 44) {
              small.push({
                tag: el.tagName.toLowerCase(),
                class: el.className,
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              })
            }
          })
          
          return small
        })

        // Check text readability
        const smallText = await page.evaluate(() => {
          const elements = document.querySelectorAll('p, span, div')
          const small = []
          
          elements.forEach(el => {
            const style = window.getComputedStyle(el)
            const fontSize = parseInt(style.fontSize)
            
            if (fontSize < 14 && el.textContent.trim()) {
              small.push({
                tag: el.tagName.toLowerCase(),
                fontSize: style.fontSize,
                text: el.textContent.substring(0, 50),
              })
            }
          })
          
          return small.slice(0, 5) // Limit to first 5
        })

        results.push({
          viewport: viewport.name,
          page: pageInfo.name,
          issues: {
            horizontalScroll: hasHorizontalScroll,
            smallTouchTargets: smallTouchTargets.length,
            smallText: smallText.length,
          },
          details: {
            touchTargets: smallTouchTargets.slice(0, 3),
            textIssues: smallText,
          },
        })

        // Take screenshot
        await page.screenshot({
          path: `test-results/responsive-${viewport.name.replace(/\s/g, '-')}-${pageInfo.name.replace(/\s/g, '-')}.png`,
          fullPage: false,
        })

      } catch (error) {
        console.error(`  ❌ Error testing ${pageInfo.name}: ${error.message}`)
        results.push({
          viewport: viewport.name,
          page: pageInfo.name,
          error: error.message,
        })
      }
    }

    await page.close()
  }

  await browser.close()

  // Generate report
  console.log('\n📊 Responsive Design Test Results:\n')
  
  let totalIssues = 0
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.viewport} - ${result.page}: ERROR - ${result.error}`)
      return
    }

    const issues = result.issues
    const hasIssues = issues.horizontalScroll || issues.smallTouchTargets > 0 || issues.smallText > 0
    
    if (hasIssues) {
      totalIssues++
      console.log(`⚠️  ${result.viewport} - ${result.page}:`)
      
      if (issues.horizontalScroll) {
        console.log('   - Horizontal scroll detected')
      }
      
      if (issues.smallTouchTargets > 0) {
        console.log(`   - ${issues.smallTouchTargets} small touch targets found`)
        result.details.touchTargets.forEach(target => {
          console.log(`     • ${target.tag}: ${target.width}x${target.height}px`)
        })
      }
      
      if (issues.smallText > 0) {
        console.log(`   - ${issues.smallText} small text elements found`)
      }
    } else {
      console.log(`✅ ${result.viewport} - ${result.page}: All checks passed`)
    }
  })

  console.log(`\n${totalIssues === 0 ? '🎉' : '⚠️'} Total issues found: ${totalIssues}`)
  
  // Save detailed report
  const fs = await import('fs')
  fs.writeFileSync(
    'test-results/responsive-report.json',
    JSON.stringify(results, null, 2)
  )
  
  console.log('\n📄 Detailed report saved to: test-results/responsive-report.json')
  
  process.exit(totalIssues > 0 ? 1 : 0)
}

// Run the tests
testResponsiveness().catch(error => {
  console.error('Failed to run responsive tests:', error)
  process.exit(1)
})
