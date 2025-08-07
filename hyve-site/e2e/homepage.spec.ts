import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Hyve Dynamics/)
  })

  test('displays hero section with main heading', async ({ page }) => {
    const heading = page.locator('h1')
    await expect(heading).toContainText('Real-World Data')
    await expect(heading).toBeVisible()
  })

  test('navigation works correctly', async ({ page }) => {
    // Test navigation to Aerospace industry page
    await page.click('text=Industries')
    await page.click('text=Aerospace')
    await expect(page).toHaveURL('/industries/aerospace')
    
    // Test back to home navigation
    await page.click('text=Back to Home')
    await expect(page).toHaveURL('/')
  })

  test('contact form opens when clicking contact button', async ({ page }) => {
    await page.click('text=Contact Us')
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText('Get in Touch')
  })

  test('explore technology button navigates correctly', async ({ page }) => {
    await page.click('text=Explore Technology')
    await expect(page).toHaveURL('/haptic-matrix')
  })

  test('footer links work correctly', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Test About Us link
    await page.click('footer >> text=About Us')
    await expect(page).toHaveURL('/about')
  })

  test('vision section is visible', async ({ page }) => {
    const visionSection = page.locator('#vision')
    await visionSection.scrollIntoViewIfNeeded()
    await expect(visionSection).toBeVisible()
    await expect(visionSection).toContainText('Our Vision')
  })

  test('industries section displays all industries', async ({ page }) => {
    const industriesSection = page.locator('#industries')
    await industriesSection.scrollIntoViewIfNeeded()
    
    const industries = ['Aerospace', 'Automotive', 'Energy', 'Structural Health', 'Robotics']
    for (const industry of industries) {
      await expect(industriesSection).toContainText(industry)
    }
  })
})

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('mobile menu works correctly', async ({ page }) => {
    await page.goto('/')
    
    // Open mobile menu
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await menuButton.click()
    
    // Check if menu is visible
    const mobileMenu = page.locator('[role="dialog"]')
    await expect(mobileMenu).toBeVisible()
    
    // Navigate to an industry page
    await page.click('text=Industries')
    await page.click('text=Automotive')
    await expect(page).toHaveURL('/industries/automotive')
  })
})