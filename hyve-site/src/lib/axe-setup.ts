import React from 'react'
import ReactDOM from 'react-dom'

// Only run accessibility checks in development
export const setupAxe = async () => {
  if (import.meta.env.DEV) {
    const axe = await import('@axe-core/react')
    axe.default(React, ReactDOM, 1000)
    console.log('🔍 Accessibility checks enabled in development')
  }
}