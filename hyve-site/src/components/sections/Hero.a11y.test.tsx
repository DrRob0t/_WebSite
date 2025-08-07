import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'
import { Hero } from './Hero'

expect.extend(toHaveNoViolations)

describe('Hero Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
    
    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Real-World Data')
  })

  it('should have accessible buttons', () => {
    const { container } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )
    
    const buttons = container.querySelectorAll('button')
    buttons.forEach(button => {
      // Check if button has accessible text
      expect(button.textContent).toBeTruthy()
    })
  })
})