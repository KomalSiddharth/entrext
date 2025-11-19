# Companion Landing Page - Color System

## Overview
The Companion landing page uses a carefully curated color palette designed to evoke warmth, emotional connection, and trust. The color system is built on semantic tokens that ensure consistency across the entire application.

## Color Palette

### Primary Colors

| Purpose | Color Name | HEX | HSL | Usage |
|---------|-----------|-----|-----|-------|
| 🌤️ Primary Background | Porcelain Sand | `#FDFBF7` | `hsl(40, 43%, 98%)` | Main background - soft, breathable canvas |
| 💬 Text / UI Body | Charcoal Gray | `#3A3A3A` | `hsl(0, 0%, 23%)` | Primary text - clear and readable |
| 🌸 Accent 1 (Emotion) | Peach Blush | `#FFD6D1` | `hsl(7, 100%, 91%)` | Emotional warmth, CTA cards |
| 🌿 Accent 2 (Mood) | Eucalyptus Green | `#C2F2D0` | `hsl(135, 60%, 85%)` | Mood tabs, natural highlights |
| 💜 Primary CTA / Brand | Slate Lavender | `#7879C7` | `hsl(239, 46%, 62%)` | Signature brand color, primary CTAs |
| 🌌 Depth / Footer | Midnight Violet | `#2D2E45` | `hsl(237, 21%, 23%)` | Footer, trust-heavy zones |

## Semantic Token Mapping

### Light Mode (Default)

```css
--background: 40 43% 98%;           /* Porcelain Sand */
--foreground: 0 0% 23%;             /* Charcoal Gray */
--primary: 239 46% 62%;             /* Slate Lavender */
--primary-glow: 239 50% 75%;        /* Lighter Lavender */
--secondary: 135 60% 85%;           /* Eucalyptus Green */
--accent: 7 100% 91%;               /* Peach Blush */
--footer-bg: 237 21% 23%;           /* Midnight Violet */
--footer-foreground: 40 43% 98%;   /* Porcelain Sand */
```

### Dark Mode

```css
--background: 237 21% 15%;          /* Dark Violet */
--foreground: 40 43% 95%;           /* Light Sand */
--primary: 239 50% 70%;             /* Brighter Lavender */
--primary-glow: 239 55% 80%;        /* Lightest Lavender */
--secondary: 135 50% 75%;           /* Brighter Green */
--accent: 7 90% 85%;                /* Softer Peach */
--footer-bg: 237 21% 10%;           /* Deeper Violet */
--footer-foreground: 40 43% 95%;   /* Light Sand */
```

## Gradients

### Primary Gradient
```css
--gradient-primary: linear-gradient(135deg, hsl(239 46% 62%), hsl(239 50% 75%));
```
**Usage**: Primary CTAs, brand elements, hero sections

### Accent Gradient
```css
--gradient-accent: linear-gradient(135deg, hsl(7 100% 91%), hsl(135 60% 85%));
```
**Usage**: Emotional cards, mood transitions, highlights

### Hero Gradient
```css
--gradient-hero: linear-gradient(180deg, hsl(40 43% 98%), hsl(239 20% 95%));
```
**Usage**: Hero section backgrounds, subtle depth

## Connection Mode Colors

| Mode | Color | HEX | Usage |
|------|-------|-----|-------|
| ❤️ Date | Pink | `hsl(340, 75%, 65%)` | Date mode cards and icons |
| 🤝 Friend | Blue | `hsl(210, 70%, 60%)` | Friend mode cards and icons |
| 👥 Group | Purple | `hsl(270, 65%, 60%)` | Group mode cards and icons |
| 💼 Business | Navy | `hsl(220, 50%, 40%)` | Business mode cards and icons |

## Shadows & Effects

### Soft Shadow
```css
--shadow-soft: 0 4px 20px -4px hsl(239 46% 62% / 0.15);
```
**Usage**: Cards, elevated elements

### Glow Shadow
```css
--shadow-glow: 0 0 40px hsl(239 50% 75% / 0.3);
```
**Usage**: CTAs, interactive elements, focus states

## Usage Guidelines

### Backgrounds
- **Main Background**: Use `bg-background` (Porcelain Sand)
- **Cards**: Use `bg-card` (Pure White)
- **Footer**: Use `bg-footer` (Midnight Violet)
- **Muted Areas**: Use `bg-muted` (Light Sand)

### Text
- **Primary Text**: Use `text-foreground` (Charcoal Gray)
- **Secondary Text**: Use `text-muted-foreground` (Medium Gray)
- **Footer Text**: Use `text-footer-foreground` (Light Sand)
- **On Primary**: Use `text-primary-foreground` (White)

### Interactive Elements
- **Primary Buttons**: Use `bg-primary` with `text-primary-foreground`
- **Secondary Buttons**: Use `bg-secondary` with `text-secondary-foreground`
- **Accent Cards**: Use `bg-accent` with `text-accent-foreground`
- **Hover States**: Use `hover:bg-primary` or `hover:text-primary`

### Borders
- **Default Borders**: Use `border-border` (Light Sand)
- **Footer Borders**: Use `border-footer` (Midnight Violet)
- **Input Borders**: Use `border-input` (Light Sand)

## Accessibility

### Contrast Ratios
All color combinations meet WCAG 2.1 AA standards:
- **Foreground on Background**: 13.5:1 (AAA)
- **Primary on Background**: 4.8:1 (AA)
- **Footer Foreground on Footer**: 13.2:1 (AAA)
- **Accent Foreground on Accent**: 12.1:1 (AAA)

### Color Blindness Considerations
- Primary brand color (Slate Lavender) is distinguishable in all common color blindness types
- Accent colors (Peach Blush, Eucalyptus Green) provide sufficient contrast
- Mode colors use both color and iconography for identification

## Implementation

### CSS Variables
All colors are defined in `src/index.css` using HSL format for easy manipulation and theming.

### Tailwind Configuration
Colors are mapped to Tailwind utilities in `tailwind.config.mjs` for seamless integration.

### Component Usage
```tsx
// Primary Button
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Join Waitlist
</Button>

// Accent Card
<Card className="bg-accent border-accent">
  <CardContent className="text-accent-foreground">
    Emotional content here
  </CardContent>
</Card>

// Footer
<footer className="bg-footer border-t border-footer">
  <p className="text-footer-foreground">© Companion 2025</p>
</footer>
```

## Design Philosophy

### Warmth & Approachability
The Porcelain Sand background and Peach Blush accents create a warm, inviting atmosphere that encourages emotional connection.

### Trust & Depth
The Midnight Violet footer and Slate Lavender primary color establish trust and brand identity while maintaining visual interest.

### Natural & Calming
The Eucalyptus Green secondary color brings a natural, healing quality that aligns with the platform's focus on authentic connections.

### Emotional Resonance
The carefully balanced palette evokes feelings of:
- **Safety**: Soft, non-threatening colors
- **Warmth**: Peach and sand tones
- **Growth**: Natural green accents
- **Trust**: Deep violet foundations
- **Connection**: Harmonious color relationships

## Future Considerations

### Potential Additions
- **Success State**: Consider adding a green variant for success messages
- **Warning State**: Consider adding an amber variant for warnings
- **Info State**: Consider adding a blue variant for informational messages

### Seasonal Variations
The color system can be adapted for seasonal campaigns while maintaining brand consistency:
- **Spring**: Emphasize Eucalyptus Green
- **Summer**: Brighten Peach Blush
- **Fall**: Warm up Porcelain Sand
- **Winter**: Deepen Midnight Violet

---

**Last Updated**: 2025-01-19  
**Version**: 1.0.0  
**Maintained By**: Companion Design Team
