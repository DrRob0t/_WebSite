# Focus Management Guide

## Overview
Proper focus management is crucial for accessibility and keyboard navigation. We use Radix UI components which provide built-in focus management features, along with custom hooks for additional control.

## Built-in Focus Management

### Radix UI Components
Our Dialog and Sheet components are built on Radix UI primitives, which automatically provide:

1. **Focus Trap**: Focus stays within the modal when open
2. **Focus Restoration**: Returns focus to trigger element when closed
3. **Escape Key**: Closes the modal on Escape press
4. **Tab Cycling**: Tab key cycles through focusable elements
5. **Auto Focus**: First focusable element receives focus when opened

### Components with Focus Management
- `Dialog` / `FocusDialog` - Modal dialogs
- `Sheet` - Slide-out panels
- `NavigationMenu` - Dropdown navigation
- `Dialog` in Header (Contact Form)

## Custom Focus Management

### useFocusTrap Hook
For custom components that need focus trapping:

```typescript
import { useFocusTrap } from '@/hooks/use-focus-trap'

const MyModal = () => {
  const containerRef = useFocusTrap({
    enabled: isOpen,
    autoFocus: true,
    restoreFocus: true,
    onEscape: () => setIsOpen(false)
  })

  return (
    <div ref={containerRef}>
      {/* Modal content */}
    </div>
  )
}
```

### Hook Options
- `enabled`: Enable/disable focus trap
- `autoFocus`: Focus first element on mount
- `restoreFocus`: Return focus when unmounted
- `onEscape`: Callback for Escape key

## Implementation Examples

### Contact Form Dialog
```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Contact Form</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Form automatically receives focus management */}
    <form>
      <Input autoFocus /> {/* First input gets focus */}
    </form>
  </DialogContent>
</Dialog>
```

### Custom Modal with Focus Trap
```tsx
const CustomModal = ({ isOpen, onClose }) => {
  const modalRef = useFocusTrap({
    enabled: isOpen,
    onEscape: onClose
  })

  if (!isOpen) return null

  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

## Accessibility Best Practices

### 1. ARIA Attributes
Always include proper ARIA attributes for custom modals:
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Title</h2>
  <p id="dialog-description">Description</p>
</div>
```

### 2. Focus Indicators
Ensure visible focus indicators:
```css
/* Already configured in our Tailwind setup */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
}
```

### 3. Skip Links
For main navigation, provide skip links:
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 4. Focus Order
Ensure logical tab order:
- Use semantic HTML
- Avoid positive tabindex values
- Use `tabindex="-1"` to remove from tab order
- Use `tabindex="0"` to add non-interactive elements to tab order

## Keyboard Navigation Patterns

### Modal/Dialog
- `Tab` / `Shift+Tab`: Navigate between focusable elements
- `Escape`: Close modal
- `Enter`: Activate buttons/links
- `Space`: Toggle checkboxes, activate buttons

### Navigation Menu
- `Tab`: Move to next item
- `Arrow Keys`: Navigate within menu
- `Escape`: Close dropdown
- `Enter` / `Space`: Activate item

## Testing Focus Management

### Manual Testing
1. Open modal/dialog using keyboard only
2. Verify focus moves to first interactive element
3. Tab through all elements - verify trap works
4. Press Escape - verify modal closes
5. Verify focus returns to trigger element

### Automated Testing
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('dialog traps focus', async () => {
  const user = userEvent.setup()
  
  render(<MyDialog />)
  
  // Open dialog
  await user.click(screen.getByText('Open Dialog'))
  
  // First input should have focus
  expect(screen.getByLabelText('Name')).toHaveFocus()
  
  // Tab cycles within dialog
  await user.tab()
  expect(screen.getByLabelText('Email')).toHaveFocus()
  
  // Escape closes dialog
  await user.keyboard('{Escape}')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
```

## Common Issues & Solutions

### Issue: Focus not returning to trigger
**Solution**: Ensure trigger element is still in DOM when dialog closes

### Issue: Focus escaping modal
**Solution**: Check for focusable elements outside modal with `tabindex="0"`

### Issue: Screen reader not announcing modal
**Solution**: Add proper ARIA attributes (`role="dialog"`, `aria-modal="true"`)

### Issue: Background scrolling when modal open
**Solution**: Add `overflow: hidden` to body when modal opens

## Utilities

### Get First Focusable Element
```typescript
import { getFirstFocusableElement } from '@/hooks/use-focus-trap'

const firstElement = getFirstFocusableElement(container)
firstElement?.focus()
```

### Check if Element is Focusable
```typescript
import { isFocusable } from '@/hooks/use-focus-trap'

if (isFocusable(element)) {
  element.focus()
}
```

## Resources
- [WAI-ARIA Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Radix UI Dialog Documentation](https://www.radix-ui.com/docs/primitives/components/dialog)
- [Focus Management in React](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
