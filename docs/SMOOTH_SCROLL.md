# Smooth Scroll Implementation

## Overview
We've implemented smooth scrolling behavior and scroll-related UI components to enhance the user experience on the Hyve Dynamics website.

## Features Implemented

### 1. CSS Smooth Scroll
Added smooth scroll behavior globally in `src/index.css`:
```css
html {
  scroll-behavior: smooth;
}
```
This enables smooth scrolling for:
- Anchor links (`#section`)
- JavaScript `scrollTo()` calls
- Browser navigation (back/forward)

### 2. Scroll to Top Button
Component: `src/components/ui/scroll-to-top.tsx`

**Features:**
- Appears after scrolling 400px down
- Smooth fade in/out animation
- Positioned bottom-right
- Accessible with ARIA label
- Responsive to different screen sizes

**Usage:**
```tsx
import { ScrollToTop } from '@/components/ui/scroll-to-top'

// In your layout or app component
<ScrollToTop showAfter={400} />
```

**Props:**
- `showAfter`: Number of pixels to scroll before showing (default: 300)
- `className`: Additional CSS classes

### 3. Scroll Progress Indicator (Optional)
Component: `src/components/ui/scroll-progress.tsx`

**Features:**
- Shows reading progress on long pages
- Smooth spring animation
- Can be configured to show only on specific pages
- Customizable color and height

**Usage:**
```tsx
import { ScrollProgress } from '@/components/ui/scroll-progress'

// Add to your layout
<ScrollProgress 
  height={3}
  color="bg-hyve-accent"
  showOnPages={['/blog', '/about']}
/>
```

### 4. useScrollPercentage Hook
Custom hook to get current scroll percentage:
```tsx
import { useScrollPercentage } from '@/components/ui/scroll-progress'

const MyComponent = () => {
  const scrollPercentage = useScrollPercentage()
  
  return <div>Scrolled: {scrollPercentage.toFixed(0)}%</div>
}
```

## Navigation with Smooth Scroll

### Anchor Links
For in-page navigation:
```tsx
<a href="#vision">Go to Vision Section</a>
<Link to="/#vision">Vision</Link> // From other pages
```

### Programmatic Scrolling
```javascript
// Scroll to top
window.scrollTo({ top: 0, behavior: 'smooth' })

// Scroll to element
const element = document.getElementById('section')
element?.scrollIntoView({ behavior: 'smooth' })

// Scroll to specific position
window.scrollTo({ 
  top: 500, 
  left: 0, 
  behavior: 'smooth' 
})
```

## Accessibility Considerations

1. **Motion Preference**: Consider users who prefer reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

2. **Keyboard Navigation**: Ensure all scrollable areas are keyboard accessible

3. **Screen Reader Announcements**: Add appropriate ARIA labels and live regions

## Performance Tips

1. **Throttle Scroll Events**: Use throttling for scroll event listeners
2. **Use Intersection Observer**: For visibility detection instead of scroll events
3. **Hardware Acceleration**: Use `transform` instead of `top/left` for animations

## Browser Support

- Smooth scroll CSS: All modern browsers
- ScrollToTop component: All browsers (uses JavaScript fallback)
- Progress indicator: Requires browsers that support Framer Motion

## Future Enhancements

1. **Scroll-triggered Animations**: Use Intersection Observer for reveal animations
2. **Parallax Effects**: Add depth to hero sections
3. **Sticky Navigation Progress**: Show section progress in navigation
4. **Custom Scrollbar**: Style the browser scrollbar to match brand
