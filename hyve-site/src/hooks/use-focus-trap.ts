import { useEffect, useRef } from 'react'

interface UseFocusTrapOptions {
  enabled?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
  onEscape?: () => void
}

/**
 * Custom hook for trapping focus within a container element
 * Useful for modals, dialogs, and dropdown menus
 */
export const useFocusTrap = (options: UseFocusTrapOptions = {}) => {
  const { enabled = true, autoFocus = true, restoreFocus = true, onEscape } = options

  const containerRef = useRef<HTMLElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current

    // Store the previously focused element
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement as HTMLElement
    }

    // Get all focusable elements within the container
    const getFocusableElements = () => {
      const selector = [
        'a[href]:not([disabled])',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',')

      return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
    }

    // Focus the first focusable element if autoFocus is enabled
    if (autoFocus) {
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }

    // Handle keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      // Trap focus within the container
      if (event.shiftKey) {
        // Shift + Tab
        if (activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [enabled, autoFocus, restoreFocus, onEscape])

  return containerRef
}

/**
 * Utility function to get the first focusable element within a container
 */
export const getFirstFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const selector = [
    'a[href]:not([disabled])',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',')

  return container.querySelector(selector)
}

/**
 * Utility function to check if an element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (element.hasAttribute('disabled')) return false
  if (element.getAttribute('tabindex') === '-1') return false

  const focusableTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']
  const tagName = element.tagName

  if (focusableTags.includes(tagName)) {
    if (tagName === 'A' && !element.hasAttribute('href')) return false
    return true
  }

  return element.hasAttribute('tabindex')
}
