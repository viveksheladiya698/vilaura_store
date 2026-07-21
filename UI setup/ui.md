# E-Commerce Store UI Design System

## 1. Purpose

This document defines the visual design system for the e-commerce store. It should be used as the main reference for:

- Storefront pages
- Authentication pages
- Customer account pages
- Cart and checkout
- Admin dashboard
- Future mobile layouts
- UI image generation for client approval
- Frontend implementation in Next.js

The goal is to maintain a modern, clean, premium, and consistent fashion-store interface.

---

## 2. Design Direction

### Brand personality

The interface should feel:

- Modern
- Minimal
- Premium
- Fashion-focused
- Trustworthy
- Spacious
- Easy to navigate

### Visual principles

1. Product photography should receive the highest visual priority.
2. Layouts should use generous whitespace.
3. Buttons and navigation should remain simple and clear.
4. Decorative elements should be limited.
5. Text should always remain highly readable.
6. The design must work equally well for men's and women's products.
7. Mobile usability must be considered from the beginning.
8. Reusable components should look consistent across all pages.

---

## 3. Typography

## Primary font families

### Heading font

**Manrope**

Use Manrope for:

- Hero headings
- Page titles
- Section headings
- Card headings
- Promotional banners
- Important numbers in dashboards

Recommended weights:

- 500 — Medium
- 600 — Semibold
- 700 — Bold
- 800 — Extra Bold, only for major hero text

### Body and interface font

**Inter**

Use Inter for:

- Body text
- Navigation
- Buttons
- Forms
- Labels
- Product details
- Prices
- Filters
- Tables
- Admin dashboard text
- Helper text
- Error messages

Recommended weights:

- 400 — Regular
- 500 — Medium
- 600 — Semibold
- 700 — Bold

### Font fallbacks

```css
--font-heading: "Manrope", "Segoe UI", Arial, sans-serif;
--font-body: "Inter", "Segoe UI", Arial, sans-serif;
```

---

## 4. Typography Scale

## Desktop typography

| Token | Use | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---:|---:|---:|---:|
| Display XL | Main hero headline | Manrope | 64px | 700 | 1.05 | -0.03em |
| Display LG | Secondary hero headline | Manrope | 56px | 700 | 1.08 | -0.025em |
| H1 | Main page title | Manrope | 48px | 700 | 1.15 | -0.02em |
| H2 | Main section heading | Manrope | 36px | 700 | 1.20 | -0.015em |
| H3 | Subsection heading | Manrope | 28px | 600 | 1.25 | -0.01em |
| H4 | Card or content heading | Manrope | 22px | 600 | 1.30 | -0.005em |
| H5 | Small section heading | Manrope | 18px | 600 | 1.35 | 0 |
| Body XL | Introductory text | Inter | 20px | 400 | 1.60 | 0 |
| Body LG | Large body text | Inter | 18px | 400 | 1.60 | 0 |
| Body MD | Default body text | Inter | 16px | 400 | 1.60 | 0 |
| Body SM | Secondary text | Inter | 14px | 400 | 1.50 | 0 |
| Caption | Metadata and hints | Inter | 12px | 400 | 1.40 | 0.01em |
| Button LG | Large buttons | Inter | 16px | 600 | 1.20 | 0.01em |
| Button MD | Standard buttons | Inter | 14px | 600 | 1.20 | 0.01em |
| Label | Form and filter labels | Inter | 13px | 600 | 1.40 | 0.01em |
| Overline | Small uppercase category text | Inter | 12px | 600 | 1.30 | 0.10em |

## Tablet typography

| Token | Size |
|---|---:|
| Display XL | 52px |
| Display LG | 46px |
| H1 | 40px |
| H2 | 32px |
| H3 | 26px |
| H4 | 21px |
| Body XL | 19px |
| Body LG | 17px |
| Body MD | 16px |

## Mobile typography

| Token | Size |
|---|---:|
| Display XL | 40px |
| Display LG | 36px |
| H1 | 34px |
| H2 | 28px |
| H3 | 24px |
| H4 | 20px |
| H5 | 17px |
| Body XL | 18px |
| Body LG | 16px |
| Body MD | 15px |
| Body SM | 14px |
| Caption | 12px |
| Button LG | 15px |
| Button MD | 14px |

---

## 5. Typography Usage Rules

### Hero headings

- Use Manrope Bold.
- Keep hero headings between one and three lines.
- Avoid long paragraphs inside the hero.
- Maximum width should normally stay between 600px and 760px.
- Use strong contrast against the background image or color.

Example:

```css
font-family: var(--font-heading);
font-size: 64px;
font-weight: 700;
line-height: 1.05;
letter-spacing: -0.03em;
```

### Section headings

- Use Manrope Semibold or Bold.
- Keep section headings short.
- Add a supporting sentence only when it improves understanding.
- Section headings should not compete visually with hero headings.

### Product titles

- Use Inter Medium or Semibold.
- Default size: 16px to 18px.
- Maximum two lines on product cards.
- Do not use decorative heading fonts for product names.

### Product prices

- Use Inter Semibold.
- Current price should receive stronger contrast.
- Original price should use a muted color and strikethrough.
- Discount percentage may use an accent or success color.

### Navigation text

- Use Inter Medium.
- Standard size: 14px.
- Desktop main navigation may use 14px to 15px.
- Avoid bold navigation unless the item is active.

### Body text

- Use Inter Regular.
- Default desktop size: 16px.
- Default mobile size: 15px.
- Recommended text width: 55 to 75 characters per line.

---

## 6. Color System

## Core colors

| Token | Hex | Use |
|---|---|---|
| Background | `#F8F7F3` | Main page background |
| Surface | `#FFFFFF` | Cards, panels, forms |
| Surface Muted | `#F1F0EC` | Secondary sections |
| Primary Text | `#171717` | Main text and headings |
| Secondary Text | `#6B6B6B` | Supporting text |
| Muted Text | `#8A8A8A` | Metadata and hints |
| Border | `#E5E3DE` | Standard borders |
| Border Strong | `#D2D0CA` | Stronger separators |
| Primary | `#1F1F1F` | Main buttons and active states |
| Primary Hover | `#383838` | Hover state |
| Accent | `#6B5B45` | Brand accent |
| Accent Soft | `#E9E2D9` | Accent backgrounds |
| Success | `#2E7D32` | Success messages |
| Warning | `#B7791F` | Warning messages |
| Error | `#C62828` | Errors and destructive actions |
| Info | `#2563EB` | Informational messages |

## Dark footer colors

| Token | Hex |
|---|---|
| Footer Background | `#161616` |
| Footer Text | `#F5F5F5` |
| Footer Muted Text | `#B5B5B5` |
| Footer Border | `#323232` |

## Color usage rules

- Use the primary dark color for major calls to action.
- Use accent brown sparingly.
- Avoid using more than one strong accent in the same section.
- Use red only for errors, destructive actions, or important discount indicators.
- Use muted gray for secondary information.
- Maintain strong text contrast on all backgrounds.

---

## 7. Spacing System

Use an 8px-based spacing system.

| Token | Value | Common Use |
|---|---:|---|
| 0 | 0px | No spacing |
| 1 | 4px | Tiny gaps |
| 2 | 8px | Icon and text gaps |
| 3 | 12px | Small component gaps |
| 4 | 16px | Standard inner spacing |
| 5 | 20px | Medium spacing |
| 6 | 24px | Card padding |
| 8 | 32px | Section internal spacing |
| 10 | 40px | Large component spacing |
| 12 | 48px | Major content separation |
| 16 | 64px | Section spacing |
| 20 | 80px | Large desktop section spacing |
| 24 | 96px | Hero or major page spacing |

### Section spacing

Desktop:

```text
Top and bottom: 80px to 96px
```

Tablet:

```text
Top and bottom: 64px to 80px
```

Mobile:

```text
Top and bottom: 48px to 64px
```

---

## 8. Layout and Container Widths

### Main container

```css
max-width: 1440px;
margin-inline: auto;
padding-inline: 24px;
```

### Content container

Use for text-heavy and standard content:

```css
max-width: 1280px;
margin-inline: auto;
```

### Narrow content container

Use for forms, policies, and article-style content:

```css
max-width: 760px;
margin-inline: auto;
```

### Responsive horizontal padding

| Screen | Padding |
|---|---:|
| Large desktop | 48px |
| Standard desktop | 32px |
| Tablet | 24px |
| Mobile | 16px |

---

## 9. Breakpoints

| Name | Width |
|---|---:|
| Small Mobile | 360px |
| Mobile | 480px |
| Large Mobile | 640px |
| Tablet | 768px |
| Small Desktop | 1024px |
| Desktop | 1280px |
| Large Desktop | 1440px |
| Extra Large | 1600px |

Recommended Tailwind-style breakpoints:

```text
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 10. Border Radius

| Token | Value | Use |
|---|---:|---|
| Radius XS | 4px | Small labels |
| Radius SM | 6px | Inputs and badges |
| Radius MD | 10px | Buttons and small cards |
| Radius LG | 16px | Product cards and panels |
| Radius XL | 24px | Large banners and modals |
| Radius Full | 9999px | Pills and circular elements |

Recommended default values:

- Buttons: 8px to 10px
- Inputs: 8px
- Product cards: 12px to 16px
- Promotional banners: 20px to 24px
- Modal: 16px to 20px

---

## 11. Shadows

Use shadows sparingly.

### Small shadow

```css
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

### Card hover shadow

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
```

### Modal shadow

```css
box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
```

### Rules

- Product cards should not use heavy permanent shadows.
- Prefer borders and background separation.
- Apply hover shadows only on interactive cards.
- Avoid multiple shadow layers.

---

## 12. Buttons

## Primary button

Use for:

- Add to cart
- Buy now
- Continue to checkout
- Save changes
- Login
- Register

Style:

```text
Background: #1F1F1F
Text: #FFFFFF
Hover: #383838
Height: 48px
Horizontal padding: 24px
Radius: 8px
Font: Inter 600, 14px
```

## Secondary button

Style:

```text
Background: transparent
Text: #1F1F1F
Border: 1px solid #D2D0CA
Hover background: #F1F0EC
```

## Ghost button

Use for low-priority actions.

```text
Background: transparent
Text: #171717
Border: none
```

## Destructive button

```text
Background: #C62828
Text: #FFFFFF
Hover: darker red
```

## Button sizes

| Size | Height | Padding | Text |
|---|---:|---:|---:|
| Small | 36px | 14px | 13px |
| Medium | 44px | 20px | 14px |
| Large | 50px | 24px | 15px |

## Button rules

- Use one primary action per section.
- Do not place two equally strong primary buttons next to each other.
- Buttons must have visible hover, focus, disabled, and loading states.
- Minimum touch target on mobile: 44px.

---

## 13. Form Controls

## Input fields

Default:

```text
Height: 46px
Background: #FFFFFF
Border: 1px solid #D2D0CA
Radius: 8px
Horizontal padding: 14px
Font: Inter 400, 15px
```

Focus state:

```text
Border: #1F1F1F
Focus ring: 0 0 0 3px rgba(31, 31, 31, 0.10)
```

Error state:

```text
Border: #C62828
Helper text: #C62828
```

## Labels

```text
Font: Inter
Size: 13px
Weight: 600
Color: #171717
Bottom spacing: 8px
```

## Helper text

```text
Font: Inter
Size: 12px
Weight: 400
Color: #6B6B6B
```

## Form rules

- Always show labels above inputs.
- Placeholder text should not replace labels.
- Error text should explain how to fix the issue.
- Group related fields together.
- Use clear required and optional indicators.
- Keep checkout forms visually simple.

---

## 14. Product Cards

Each product card should include:

- Product image
- Optional badge
- Wishlist control
- Product name
- Category or fit
- Current price
- Original price when discounted
- Discount label when applicable
- Available color swatches when useful

### Product image ratio

Recommended:

```text
Portrait ratio: 4:5
Alternative: 3:4
```

### Card styling

```text
Background: transparent or white
Radius: 12px
Image radius: 12px
Gap below image: 14px
```

### Product card typography

| Element | Style |
|---|---|
| Product name | Inter 500, 16px |
| Category | Inter 400, 13px |
| Current price | Inter 600, 16px |
| Original price | Inter 400, 14px |
| Discount | Inter 600, 13px |

### Hover behavior

- Slight image zoom
- Optional second image reveal
- Wishlist icon remains accessible
- Shadow should remain subtle
- Product information must not shift vertically

---

## 15. Image Style

### Product photography

- Neutral or soft warm backgrounds
- Consistent lighting
- High-resolution images
- Front, back, side, and detail views
- Models should be shown naturally
- Product-only images should also be available

### Homepage imagery

- Fashion editorial style
- Strong but uncluttered composition
- Enough empty space for text overlay
- Consistent tone across men's and women's categories
- Avoid visually noisy backgrounds

### Image generation references

When generating UI mockup images:

- Use realistic e-commerce product photography
- Keep the interface clean and premium
- Use warm neutral backgrounds
- Use large fashion photography
- Avoid excessive gradients
- Avoid neon colors
- Avoid glassmorphism unless specifically requested
- Avoid overly rounded layouts

---

## 16. Icons

Recommended icon style:

- Outline icons
- 1.5px to 2px stroke
- Rounded line caps
- Consistent visual weight

Recommended icon library:

```text
Lucide Icons
```

Common icons:

- Search
- User
- Shopping bag
- Heart
- Menu
- Close
- Chevron
- Filter
- Sort
- Location
- Trash
- Edit
- Plus
- Minus

Icon sizes:

| Use | Size |
|---|---:|
| Small inline icon | 16px |
| Standard UI icon | 20px |
| Header icon | 22px |
| Large action icon | 24px |

---

## 17. Header and Navigation

### Announcement bar

```text
Height: 32px to 36px
Font: Inter 500, 12px to 13px
Background: #171717
Text: #FFFFFF
```

### Main header

Desktop height:

```text
72px to 80px
```

Mobile height:

```text
60px to 64px
```

Header elements:

- Logo
- Main navigation
- Search
- Account
- Wishlist
- Cart

### Navigation behavior

- Keep the main navigation concise.
- Use dropdown or mega menu only when required.
- On mobile, use a drawer menu.
- Sticky header may be used after scrolling.
- Cart count should appear as a small badge.

---

## 18. Footer

Footer should include:

- Brand introduction
- Shop links
- Customer service
- Policies
- Contact details
- Social links
- Newsletter
- Payment method indicators
- Copyright text

Style:

```text
Background: #161616
Primary text: #F5F5F5
Secondary text: #B5B5B5
Border: #323232
```

The footer should feel structured, not crowded.

---

## 19. Homepage Section Order

Recommended homepage structure:

1. Announcement bar
2. Main header
3. Hero section
4. Men's and women's category cards
5. Featured products
6. New arrivals
7. Shop by fit
8. Promotional banner
9. Best sellers
10. Customer benefits
11. Newsletter
12. Footer

---

## 20. Storefront Page Guidelines

## Product listing page

Include:

- Breadcrumb
- Page title
- Result count
- Category filters
- Size filters
- Color filters
- Price filter
- Fit filter
- Sort control
- Product grid
- Pagination or load more
- Mobile filter drawer

## Product detail page

Include:

- Image gallery
- Product name
- Rating
- Price
- Discount
- Color selection
- Size selection
- Size guide
- Quantity
- Add to cart
- Buy now
- Delivery information
- Product details
- Material and care
- Reviews
- Related products

## Cart page

Include:

- Product summary
- Size and color
- Quantity control
- Remove action
- Coupon input
- Price breakdown
- Checkout button
- Empty cart state

## Checkout page

Include:

- Contact details
- Shipping address
- Delivery option
- Payment method
- Order summary
- Terms acknowledgment
- Place order button

---

## 21. Admin Dashboard Guidelines

Admin UI should use the same typography and color system, but with denser layouts.

Recommended structure:

- Sidebar navigation
- Top header
- Summary cards
- Data tables
- Filters
- Search
- Create and edit forms
- Confirmation dialogs
- Status badges

Admin typography:

| Element | Size |
|---|---:|
| Page title | 30px |
| Section title | 22px |
| Table header | 13px |
| Table body | 14px |
| Form label | 13px |
| Dashboard number | 28px to 36px |

Admin pages should prioritize clarity and operational efficiency over decorative visuals.

---

## 22. Accessibility Rules

- Minimum standard body text: 14px.
- Mobile body text should normally remain 15px or larger.
- Use visible focus states.
- Do not rely only on color to communicate status.
- Provide text labels or accessible names for icons.
- Maintain adequate color contrast.
- All interactive elements must support keyboard navigation.
- Form errors must be associated with their fields.
- Product images must use meaningful alt text.
- Respect reduced-motion preferences.

---

## 23. Motion and Interaction

Use subtle motion only.

Recommended durations:

| Interaction | Duration |
|---|---:|
| Hover | 150ms |
| Button state | 150ms |
| Dropdown | 180ms |
| Drawer | 250ms |
| Modal | 220ms |
| Image transition | 300ms |

Recommended easing:

```css
cubic-bezier(0.2, 0.8, 0.2, 1)
```

Avoid:

- Large bouncing effects
- Slow page transitions
- Excessive parallax
- Continuous decorative animations
- Motion that delays shopping actions

---

## 24. Loading, Empty, and Error States

### Loading states

Use:

- Skeleton product cards
- Skeleton text
- Button spinners
- Inline loading indicators

Avoid using a full-screen loader for small actions.

### Empty states

Each empty state should include:

- Clear title
- Short explanation
- Relevant action

Examples:

- Empty cart
- Empty wishlist
- No search results
- No orders
- No products in a category

### Error states

Each error message should include:

- What happened
- Whether the user's data is safe
- What they can do next
- Retry action when appropriate

---

## 25. UI Image Generation Rules

Before implementation, client-facing UI images should be created page by page.

For every UI image:

1. Follow this design system.
2. Use Manrope for headings and Inter for interface text.
3. Use the defined warm-neutral color palette.
4. Maintain realistic spacing.
5. Use real e-commerce layout proportions.
6. Show desktop first, then mobile.
7. Avoid placeholder-style low-quality layouts.
8. Use consistent product photography.
9. Keep the same header, footer, colors, and component styles.
10. Do not change the design language between pages without approval.

Recommended image creation order:

1. Home page desktop
2. Home page mobile
3. Product listing desktop
4. Product listing mobile
5. Product detail desktop
6. Product detail mobile
7. Cart
8. Checkout
9. Login
10. Register
11. Customer account
12. Admin dashboard

---

## 26. CSS Design Tokens

```css
:root {
  --font-heading: "Manrope", "Segoe UI", Arial, sans-serif;
  --font-body: "Inter", "Segoe UI", Arial, sans-serif;

  --color-background: #f8f7f3;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f0ec;

  --color-text-primary: #171717;
  --color-text-secondary: #6b6b6b;
  --color-text-muted: #8a8a8a;

  --color-border: #e5e3de;
  --color-border-strong: #d2d0ca;

  --color-primary: #1f1f1f;
  --color-primary-hover: #383838;

  --color-accent: #6b5b45;
  --color-accent-soft: #e9e2d9;

  --color-success: #2e7d32;
  --color-warning: #b7791f;
  --color-error: #c62828;
  --color-info: #2563eb;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-modal: 0 24px 60px rgba(0, 0, 0, 0.16);

  --container-main: 1440px;
  --container-content: 1280px;
  --container-narrow: 760px;
}
```

---

## 27. Final Approved Direction

### Typography

```text
Headings: Manrope
Body and interface: Inter
```

### Visual style

```text
Modern, minimal, premium, fashion-focused
```

### Main colors

```text
Warm off-white background
White surfaces
Near-black primary text and buttons
Neutral gray secondary text
Deep brown accent
```

### Default component style

```text
Clean borders
Moderate border radius
Subtle shadows
Large product imagery
Generous whitespace
```

This document should remain the primary reference while designing UI images and implementing the frontend.
