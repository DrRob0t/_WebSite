import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './Header'

expect.extend(toHaveNoViolations)

describe('Header Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have accessible navigation', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
  })

  it('should have accessible logo', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const logo = container.querySelector('img[alt*="Hyve"]')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('alt')
  })

  it('should have proper link text', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const links = container.querySelectorAll('a')
    links.forEach(link => {
      // Check if link has accessible text or aria-label
      const hasText = link.textContent && link.textContent.trim().length > 0
      const hasAriaLabel = link.getAttribute('aria-label')
      expect(hasText || hasAriaLabel).toBeTruthy()
    })
  })

  it('should have keyboard accessible menu', () => {
    const { container } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    
    const menuButtons = container.querySelectorAll('button[role="combobox"]')
    menuButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded')
      expect(button).toHaveAttribute('aria-haspopup')
    })
  })
})
