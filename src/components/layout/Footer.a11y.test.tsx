import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import { Footer } from './Footer'

expect.extend(toHaveNoViolations)

describe('Footer Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should use semantic footer element', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should have accessible links', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const links = container.querySelectorAll('a')
    links.forEach(link => {
      // Check if link has accessible text
      expect(link.textContent).toBeTruthy()
      expect(link.textContent?.trim().length).toBeGreaterThan(0)
    })
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    // Footer headings should be h2 or lower, not h1
    const h1Elements = container.querySelectorAll('h1')
    expect(h1Elements).toHaveLength(0)

    // Check for section headings
    const headings = container.querySelectorAll('h2, h3, h4')
    expect(headings.length).toBeGreaterThan(0)
  })

  it('should have accessible copyright text', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )

    const copyrightText = container.textContent
    expect(copyrightText).toContain('©')
    expect(copyrightText).toContain('Hyve Dynamics')
  })
})
