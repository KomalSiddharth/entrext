# Glassmorphism Quick Reference

## Available Classes

### Standard Glass Effects

```css
.glass          /* Standard white glass - general purpose */
.glass-light    /* Cloud Cream glass - navigation, dialogs, forms */
.glass-accent   /* Peachy Blush glass - accent elements */
.glass-primary  /* Slate Lavender glass - branded elements */
.glass-dark     /* Midnight Violet glass - dark mode */
.glass-hover    /* Interactive glass - cards with hover effects */
```

## Usage Examples

### Navigation Bar
```tsx
<nav className={isScrolled ? "glass-light shadow-soft" : "bg-transparent"}>
  {/* Navigation content */}
</nav>
```

### Interactive Cards
```tsx
<Card className="glass-hover border-border">
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

### Modal Dialogs
```tsx
<DialogContent className="max-w-md glass-light">
  {/* Dialog content */}
</DialogContent>
```

### Forms
```tsx
<Card className="glass-light border-border">
  <CardContent>
    <Form>
      {/* Form fields */}
    </Form>
  </CardContent>
</Card>
```

### Accent Elements
```tsx
<div className="glass-accent p-6 rounded-lg">
  {/* Highlighted content */}
</div>
```

## When to Use Each Class

| Class | Best For | Avoid For |
|-------|----------|-----------|
| `.glass` | General cards, containers | Body text areas |
| `.glass-light` | Navigation, dialogs, forms | Dark backgrounds |
| `.glass-accent` | Highlights, callouts | Large sections |
| `.glass-primary` | Branded elements, CTAs | Subtle elements |
| `.glass-dark` | Dark mode, footers | Light backgrounds |
| `.glass-hover` | Interactive cards | Static content |

## Properties Reference

### .glass-light (Most Common)
```css
background: rgba(255, 248, 243, 0.8);  /* Cloud Cream 80% */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.4);
box-shadow: 0 8px 32px 0 rgba(120, 121, 199, 0.1);
```

### .glass-hover (Interactive)
```css
/* Base state */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Hover state */
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(15px);
transform: translateY(-2px);
box-shadow: 0 12px 40px 0 rgba(120, 121, 199, 0.2);
```

## Combining with Other Classes

### Glass + Shadow
```tsx
<div className="glass-light shadow-soft hover:shadow-glow">
```

### Glass + Border
```tsx
<div className="glass-hover border-border">
```

### Glass + Gradient (Advanced)
```tsx
<div className="glass-primary bg-gradient-primary">
```

## Common Patterns

### Sticky Navigation
```tsx
<nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${
  isScrolled ? "glass-light shadow-soft" : "bg-transparent"
}`}>
```

### Pricing Card
```tsx
<Card className={`glass-hover border-border ${
  isPopular ? "ring-2 ring-primary shadow-glow" : ""
}`}>
```

### Feature Card with Icon
```tsx
<Card className="glass-hover border-border group">
  <CardContent className="p-8">
    <div className="flex items-start gap-6">
      <div className="w-16 h-16 rounded-3xl bg-gradient-primary 
                      shadow-soft group-hover:shadow-glow 
                      transition-all group-hover:scale-110">
        {/* Icon */}
      </div>
      {/* Content */}
    </div>
  </CardContent>
</Card>
```

### Modal with Glass
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-md glass-light">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

## Performance Tips

### ✅ Do
- Use glass effects on 1-8 elements per viewport
- Apply to fixed/sticky elements for best performance
- Combine with GPU-accelerated properties (transform, opacity)
- Use consistent blur values (10px, 12px, 15px)

### ❌ Don't
- Nest multiple glass elements deeply
- Apply to every element on the page
- Use extremely high blur values (>20px)
- Animate backdrop-filter directly

## Accessibility Checklist

- [ ] Text contrast ratio ≥ 4.5:1 on glass backgrounds
- [ ] Focus indicators clearly visible
- [ ] Hover states provide clear feedback
- [ ] Glass doesn't interfere with screen readers
- [ ] Works with prefers-reduced-motion

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 76+ | ✅ Full |
| Firefox | 103+ | ✅ Full |
| Safari | 9+ | ✅ With -webkit- |
| Edge | 79+ | ✅ Full |

## Troubleshooting

### Glass effect not visible
**Solution**: Ensure there's content behind the glass element

### Blur not working in Safari
**Solution**: Already included `-webkit-backdrop-filter` prefix

### Performance issues
**Solution**: Reduce number of glass elements or blur intensity

### Text hard to read
**Solution**: Increase background opacity or use darker text

## Quick Copy-Paste

### Standard Card
```tsx
<Card className="glass-hover border-border">
  <CardContent className="p-6">
    {/* Your content */}
  </CardContent>
</Card>
```

### Navigation
```tsx
<nav className="glass-light shadow-soft">
  {/* Navigation items */}
</nav>
```

### Dialog
```tsx
<DialogContent className="glass-light">
  {/* Dialog content */}
</DialogContent>
```

### Form Container
```tsx
<Card className="glass-light border-border">
  <CardContent>
    <Form {...form}>
      {/* Form fields */}
    </Form>
  </CardContent>
</Card>
```

## Related Files

- **CSS Definitions**: `/src/index.css` (lines 285-336)
- **Navigation**: `/src/components/common/Navigation.tsx`
- **Landing Page**: `/src/pages/LandingPage.tsx`
- **Billing Page**: `/src/pages/BillingPage.tsx`
- **Full Guide**: `/GLASSMORPHISM_GUIDE.md`
- **Update Summary**: `/GLASSMORPHISM_UPDATE.md`

## Need Help?

1. Check `/GLASSMORPHISM_GUIDE.md` for comprehensive documentation
2. Review `/GLASSMORPHISM_UPDATE.md` for implementation examples
3. Inspect existing components for usage patterns
4. Test in multiple browsers for compatibility

---

**Last Updated**: 2025-01-19  
**Version**: 1.0.0  
**Status**: Production Ready
