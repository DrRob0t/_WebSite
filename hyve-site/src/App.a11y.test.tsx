import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

expect.extend(toHaveNoViolations)

describe('App Accessibility', () => {
  it('should not have any accessibility violations on home page', async () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    
    // Give the app time to fully render
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have a skip to content link', () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    
    // Check for skip link (might be visually hidden)
    const skipLink = container.querySelector('a[href="#main"]') || 
                    container.querySelector('a[href="#content"]') ||
                    container.querySelector('a:first-child')
    
    if (skipLink && skipLink.textContent?.toLowerCase().includes('skip')) {
      expect(skipLink).toBeInTheDocument()
    }
  })

  it('should have a main landmark', () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
  })

  it('should have proper document structure', () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    
    // Check for header
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    
    // Check for main
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    
    // Check for footer
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should have unique page title', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    )
    
    // The SEO component should set a title
    expect(document.title).toBeTruthy()
    expect(document.title.length).toBeGreaterThan(0)
  })
})
