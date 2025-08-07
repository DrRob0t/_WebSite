import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

import { Hero } from './Hero'

expect.extend(toHaveNoViolations)

describe('Hero Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )

    // Give more time for the Hero component to fully render
    await new Promise(resolve => setTimeout(resolve, 200))

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 15000)

  it('should have proper heading hierarchy', () => {
    const { container } = render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    )

    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Adaptation Through Insight. Evolution Through Data.')
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
