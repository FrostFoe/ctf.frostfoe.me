# Quick Reference: Responsive Classes Used

## Tailwind Responsive Prefixes

```
Mobile-first approach:
└── Default: 0px-640px
    ├── sm: 640px-768px
    ├── md: 768px-1024px
    ├── lg: 1024px-1280px
    └── xl: 1280px+
```

## Common Responsive Patterns Used

### 1. Padding
```tsx
// Full responsive padding
className="px-4 sm:px-6 md:px-8 lg:px-0"

// Or separately
className="p-4 sm:p-6 md:p-8 lg:p-12"
className="py-6 sm:py-8 md:py-10 lg:py-12"
```

### 2. Margins
```tsx
// Responsive margins
className="mb-6 sm:mb-8"
className="mx-auto"
```

### 3. Font Sizes
```tsx
// Text scaling
className="text-sm sm:text-base md:text-lg"
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"

// Headings
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
```

### 4. Dimensions
```tsx
// Width/Height responsive
className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40"

// Max-width
className="max-w-xs sm:max-w-md md:max-w-2xl"

// Min-height
className="min-h-[250px] sm:min-h-[400px] lg:min-h-0"
```

### 5. Border Radius
```tsx
// Responsive rounded corners
className="rounded-lg sm:rounded-2xl"
```

### 6. Gaps
```tsx
// Responsive spacing between items
className="gap-3 sm:gap-4 md:gap-5 lg:gap-6"
className="gap-4 sm:gap-6 md:gap-8"
```

### 7. Grid & Columns
```tsx
// Responsive grid columns
className="grid grid-cols-1 md:grid-cols-3"
className="grid grid-cols-2 sm:grid-cols-4"
```

### 8. Layout & Display
```tsx
// Responsive display
className="hidden lg:flex"
className="flex flex-col sm:flex-row"

// Full width responsive
className="w-full sm:w-auto"
```

### 9. Button Sizing
```tsx
// Responsive button
className="px-4 sm:px-5 py-2 text-sm sm:text-base w-full sm:w-auto"
```

### 10. Box Sizing
```tsx
// Responsive container
className="w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-0"
```

## Responsive Component Template

```tsx
<section className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
  <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
    {/* Mobile: Full width with padding */}
    {/* Tablet: Increased padding */}
    {/* Desktop: Center aligned with max-width */}
    
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
      Title
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

## Breakpoint Reference

| Class | Min-width | Use Case |
|-------|-----------|----------|
| (none) | 0px | Mobile phones (320px+) |
| `sm:` | 640px | Landscape phones, small tablets |
| `md:` | 768px | Portrait tablets, small laptops |
| `lg:` | 1024px | Desktops, large tablets |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large screens |

## Mobile-First Best Practices

✅ **DO:**
```tsx
// Start mobile, enhance for larger screens
className="text-sm sm:text-base md:text-lg lg:text-xl"
className="w-full sm:w-auto"
className="flex-col sm:flex-row"
```

❌ **DON'T:**
```tsx
// Don't hide content on mobile without reason
className="hidden sm:block" // Consider mobile first

// Don't make mobile worse for desktop
className="px-12" // Too much padding on mobile
```

## Responsive Grid Examples

### 1 to 3 columns
```tsx
className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
```

### 2 to 4 columns
```tsx
className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8"
```

### Flexible row
```tsx
className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
```

## Responsive Typography Utilities

Available in `globals.css`:

```css
h1 → text-3xl sm:text-4xl md:text-5xl lg:text-6xl
h2 → text-2xl sm:text-3xl md:text-4xl lg:text-5xl
h3 → text-xl sm:text-2xl md:text-3xl lg:text-4xl
```

## Custom Utility Classes

Available in `globals.css`:

```tsx
// Centered container
className="container-centered"
// = mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-0

// Section padding
className="section-padding"
// = py-6 sm:py-8 md:py-10 lg:py-12

// Responsive button
className="btn-responsive"
// = py-2 px-4 sm:py-2.5 sm:px-5 text-sm sm:text-base

// Responsive gap
className="gap-responsive"
// = gap-3 sm:gap-4 md:gap-5 lg:gap-6
```

## Common Patterns

### Full-width section with centered content
```tsx
<section className="w-full py-6 sm:py-12">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
    {/* Content */}
  </div>
</section>
```

### Responsive card layout
```tsx
<Card className="p-4 sm:p-6 md:p-8">
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
    {/* Content */}
  </div>
</Card>
```

### Responsive button group
```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
  <Button className="px-4 sm:px-5 w-full sm:w-auto">Action</Button>
  <Button className="px-4 sm:px-5 w-full sm:w-auto">Action</Button>
</div>
```

### Responsive image with text
```tsx
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
  <Image className="w-20 sm:w-28 md:w-36" src={...} />
  <div className="flex-1">
    <h3 className="text-lg sm:text-xl md:text-2xl">Title</h3>
    <p className="text-sm sm:text-base">Description</p>
  </div>
</div>
```

---

**Quick Tips:**
1. Always start with mobile (no prefix)
2. Add larger breakpoints as needed (sm, md, lg)
3. Test with DevTools responsive design mode
4. Verify on actual devices when possible
5. Keep classes consistent across components

---

Last Updated: November 10, 2025
