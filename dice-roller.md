# D&D Dice Roller — Next.js + MUI — Claude Code One-Shot Prompt

## Overview

Build a complete Next.js application: a **D&D Dice Roller** with animated 3D-style dice, a dark dungeon aesthetic, and full support for all standard D&D dice (d4, d6, d8, d10, d12, d20, d100). Users can queue up multiple dice of different types and roll them all at once with satisfying animations. The app will be deployed to Vercel.

---

## Tech Stack

- **Next.js 14+** (App Router)
- **MUI (Material UI) v5+** with custom theme
- **TypeScript**
- **Framer Motion** for dice roll animations
- **Deployed to Vercel** (ensure `next.config.js` is Vercel-compatible)

---

## Project Setup

Initialize with:

```bash
npx create-next-app@latest dnd-dice-roller --typescript --app --eslint --src-dir --tailwind=no --import-alias="@/*"
cd dnd-dice-roller
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material framer-motion
```

---

## Design Direction: "Dungeon Vault"

### Aesthetic

Dark, atmospheric dungeon theme — think torchlit stone corridors, ancient runes, and weathered parchment. NOT generic dark mode — this should feel like opening a chest in a dungeon.

### Color Palette (CSS variables + MUI theme)

```
--bg-deep:        #0a0a0f          (near-black with blue tint)
--bg-surface:     #14141f          (dark surface)
--bg-card:        #1a1a2e          (card backgrounds)
--stone-dark:     #2a2a3e          (stone texture dark)
--stone-light:    #3a3a52          (stone texture light)
--gold-primary:   #d4a843          (primary gold — torchlight)
--gold-bright:    #f0c95c          (bright gold — highlights)
--gold-dim:       #8a6d2b          (dim gold — shadows)
--blood-red:      #8b1a1a          (nat 1 / critical fail)
--crit-green:     #1a8b3a          (nat 20 / critical success)
--parchment:      #d4c5a0          (text on dark)
--parchment-dim:  #9a8d70          (secondary text)
--rune-purple:    #6a3d9a          (magical accents)
--rune-glow:      #9a6dda          (glowing rune effect)
```

### Typography

- **Display/Headers**: `"Cinzel Decorative"` from Google Fonts (medieval, ornate)
- **Body/Numbers**: `"Cinzel"` from Google Fonts (readable medieval)
- **Dice values**: `"Pirata One"` or `"MedievalSharp"` from Google Fonts (for the rolled number display)
- Load via `next/font/google` or `<link>` in layout

### Visual Effects

- Subtle CSS noise/grain overlay on the background for stone texture
- Torch-flicker glow effect on the title (CSS animation with `text-shadow`)
- Dice cards should have a subtle stone border/bevel effect
- Gold accent lines and runic decorative elements
- Rolling animation: dice shake/tumble then land with a bounce
- Critical hits (nat 20) and fumbles (nat 1) get special glow effects

---

## Application Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with MUI ThemeProvider, fonts
│   ├── page.tsx            # Main dice roller page
│   └── globals.css         # Global styles, CSS vars, noise texture
├── components/
│   ├── DiceRoller.tsx      # Main container component
│   ├── DiceSelector.tsx    # Dice type selection panel
│   ├── DiceQueue.tsx       # Shows queued dice before rolling
│   ├── DiceAnimation.tsx   # Individual animated die component
│   ├── RollResults.tsx     # Results display after rolling
│   ├── RollHistory.tsx     # History of past rolls
│   └── DungeonBackground.tsx  # Atmospheric background effects
├── theme/
│   └── theme.ts            # MUI custom theme
├── types/
│   └── dice.ts             # TypeScript types
└── utils/
    └── diceUtils.ts        # Roll logic, critical detection
```

---

## Core Types (`types/dice.ts`)

```typescript
export type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100";

export interface DiceConfig {
  type: DiceType;
  sides: number;
  color: string; // unique color per die type
  icon: string; // SVG shape hint
  label: string;
}

export interface QueuedDie {
  id: string; // unique ID for animation keys
  type: DiceType;
}

export interface DieResult {
  id: string;
  type: DiceType;
  value: number;
  isCritSuccess: boolean; // max value
  isCritFail: boolean; // 1 (only for d20)
  timestamp: number;
}

export interface RollRecord {
  id: string;
  dice: DieResult[];
  total: number;
  timestamp: number;
}
```

---

## Dice Configuration

Each die type should have a unique visual identity:

| Die  | Sides | Color Accent       | Shape Reference  |
| ---- | ----- | ------------------ | ---------------- |
| d4   | 4     | Emerald `#2ecc71`  | Triangle/Pyramid |
| d6   | 6     | Sapphire `#3498db` | Cube             |
| d8   | 8     | Amethyst `#9b59b6` | Diamond          |
| d10  | 10    | Ruby `#e74c3c`     | Kite/Pentagon    |
| d12  | 12    | Topaz `#f39c12`    | Pentagon         |
| d20  | 20    | Gold `#d4a843`     | Icosahedron      |
| d100 | 100   | Silver `#bdc3c7`   | Double digits    |

---

## Component Specifications

### 1. `DungeonBackground.tsx`

- Full-screen fixed background with layered effects:
  - Dark gradient base
  - CSS noise/grain texture overlay (use pseudo-element with SVG noise filter or base64 noise image)
  - Subtle vignette darkening at edges
  - Optional: floating particle dots (like dust in torchlight) using CSS animation

### 2. `DiceSelector.tsx`

- Grid of 7 dice type buttons (one per die type)
- Each button shows:
  - An **SVG icon** representing the die shape (custom inline SVGs — triangle for d4, cube for d6, diamond for d8, etc.)
  - The die name (e.g., "D20")
  - A click counter badge showing how many are queued
- Clicking a button **adds one die of that type to the queue**
- Right-click or long-press removes one from the queue
- Each button has the die's unique color accent as a glow/border on hover
- MUI `ButtonBase` or `Card` with custom styling
- Include a "Clear All" button

### 3. `DiceQueue.tsx`

- Horizontal scrollable row showing all queued dice as small chips/tokens
- Each chip shows the die type icon + can be removed by clicking an X
- Animated entry/exit with Framer Motion (`AnimatePresence`)
- Shows total count: "4 dice queued"
- Prominent **"ROLL"** button:
  - Large, gold, stone-textured
  - Disabled when queue is empty
  - Pulsing glow animation when dice are queued
  - On click: triggers the roll

### 4. `DiceAnimation.tsx`

- Each die animates individually using Framer Motion
- **Roll animation sequence**:
  1. Die appears with scale(0) and opacity 0
  2. Bounces in with spring physics
  3. Rapid number cycling (showing random values for ~1 second)
  4. Settles on final value with a satisfying bounce
  5. If crit success: golden glow pulse + particle burst
  6. If crit fail (d20 only, rolled 1): red glow + shake
- Die visual: Styled card/container with the die's accent color, showing:
  - Die shape SVG as background
  - Large rolled number in center
  - Die type label (e.g., "d20") in corner
- Use Framer Motion `variants` for the animation states

### 5. `RollResults.tsx`

- Grid layout showing all rolled dice results
- Each result card shows the animated `DiceAnimation` component
- Below the dice grid: **Total sum** displayed prominently
  - Animated counter that counts up to the total
  - Gold, large, with a glow effect
- Individual die results should be easily readable
- Shows modifier section (future enhancement placeholder)

### 6. `RollHistory.tsx`

- Collapsible panel (MUI `Accordion` or drawer) showing last 10 rolls
- Each entry shows: timestamp, dice rolled (icons), individual results, total
- Subtle styling, doesn't compete with main content
- Clear history button
- Store in React state (no persistence needed)

### 7. `DiceRoller.tsx` (Main Container)

- Orchestrates all child components
- Manages state: queue, results, history, rolling status
- Layout:
  ```
  ┌─────────────────────────────────┐
  │          TITLE / HEADER         │  ← "Dungeon Dice" with torch glow
  ├─────────────────────────────────┤
  │       DICE SELECTOR GRID        │  ← 7 dice buttons
  ├─────────────────────────────────┤
  │         DICE QUEUE BAR          │  ← Queued dice + ROLL button
  ├─────────────────────────────────┤
  │                                 │
  │        ROLL RESULTS AREA        │  ← Animated dice + total
  │                                 │
  ├─────────────────────────────────┤
  │         ROLL HISTORY            │  ← Past rolls accordion
  └─────────────────────────────────┘
  ```

---

## MUI Theme (`theme/theme.ts`)

Create a comprehensive custom MUI theme:

```typescript
const dungeonTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#d4a843" }, // gold
    secondary: { main: "#6a3d9a" }, // rune purple
    background: {
      default: "#0a0a0f",
      paper: "#1a1a2e",
    },
    text: {
      primary: "#d4c5a0", // parchment
      secondary: "#9a8d70", // dim parchment
    },
    error: { main: "#8b1a1a" }, // blood red
    success: { main: "#1a8b3a" }, // crit green
  },
  typography: {
    fontFamily: '"Cinzel", serif',
    h1: { fontFamily: '"Cinzel Decorative", cursive' },
    h2: { fontFamily: '"Cinzel Decorative", cursive' },
    // ... etc
  },
  components: {
    MuiButton: {
      /* stone-textured overrides */
    },
    MuiCard: {
      /* dark card with subtle border */
    },
    MuiChip: {
      /* custom chip styling */
    },
    // ... etc
  },
});
```

---

## Dice Roll Logic (`utils/diceUtils.ts`)

```typescript
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollD100(): number {
  // Roll two d10s: tens and ones
  const tens = Math.floor(Math.random() * 10) * 10;
  const ones = Math.floor(Math.random() * 10);
  return tens + ones === 0 ? 100 : tens + ones;
}

export function isCriticalSuccess(
  type: DiceType,
  value: number,
  sides: number,
): boolean {
  return value === sides; // Max value on any die
}

export function isCriticalFail(type: DiceType, value: number): boolean {
  return type === "d20" && value === 1; // Only d20 has critical fails
}
```

---

## Custom Dice SVG Icons

Create inline SVG components for each die shape. These should be clean, geometric, and stylized:

- **d4**: Equilateral triangle (pyramid face)
- **d6**: Square with subtle 3D cube perspective lines
- **d8**: Diamond/rhombus shape
- **d10**: Kite or elongated diamond
- **d12**: Regular pentagon
- **d20**: Icosahedron-inspired triangle with internal lines
- **d100**: Two overlapping circles or "00" stylized

Each SVG should:

- Accept a `color` prop for the accent color
- Have a `size` prop
- Include subtle inner line details suggesting 3D facets
- Use `currentColor` or props for theming

---

## Animation Details (Framer Motion)

### Dice Roll Animation

```typescript
const diceVariants = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  rolling: {
    scale: [0, 1.2, 0.9, 1.1, 1],
    rotate: [0, 360, 720, 1080],
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
  landed: {
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  critSuccess: {
    scale: [1, 1.15, 1],
    boxShadow: ["0 0 0px gold", "0 0 30px gold", "0 0 10px gold"],
    transition: { repeat: 2, duration: 0.4 },
  },
  critFail: {
    x: [-5, 5, -5, 5, 0],
    boxShadow: ["0 0 0px red", "0 0 20px red", "0 0 5px red"],
    transition: { duration: 0.5 },
  },
};
```

### Number Cycling Effect

While rolling, rapidly cycle through random numbers before settling:

```typescript
// During "rolling" state, update displayed number every 50ms
// Slow down over ~1 second, then show final value
```

### Queue Chip Animations

```typescript
// AnimatePresence with:
// enter: scale from 0, spring bounce
// exit: scale to 0, fade out
```

---

## Global CSS (`globals.css`)

```css
:root {
  --bg-deep: #0a0a0f;
  --bg-surface: #14141f;
  --gold-primary: #d4a843;
  --gold-bright: #f0c95c;
  --parchment: #d4c5a0;
}

/* Stone noise texture overlay */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* inline SVG noise */
  pointer-events: none;
  z-index: 0;
}

/* Vignette effect */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
  z-index: 0;
}

/* Torch flicker animation for title */
@keyframes torchFlicker {
  0%,
  100% {
    text-shadow:
      0 0 10px #d4a843,
      0 0 20px #d4a843,
      0 0 40px #8a6d2b;
  }
  25% {
    text-shadow:
      0 0 15px #f0c95c,
      0 0 30px #d4a843,
      0 0 50px #8a6d2b;
  }
  50% {
    text-shadow:
      0 0 8px #d4a843,
      0 0 18px #8a6d2b,
      0 0 35px #8a6d2b;
  }
  75% {
    text-shadow:
      0 0 12px #f0c95c,
      0 0 25px #d4a843,
      0 0 45px #8a6d2b;
  }
}

/* Pulse glow for roll button */
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(212, 168, 67, 0.3);
  }
  50% {
    box-shadow:
      0 0 25px rgba(212, 168, 67, 0.6),
      0 0 50px rgba(212, 168, 67, 0.2);
  }
}
```

---

## Responsive Design

- Mobile-first approach
- Dice selector: 4 columns on mobile, 7 columns on desktop (single row)
- Results grid: 2 columns on mobile, 4+ on desktop
- Queue bar scrolls horizontally on mobile
- MUI `useMediaQuery` for breakpoint logic
- Min touch targets of 44px for mobile

---

## Key Interactions

1. **Select dice**: Click any die button → adds to queue (with bounce animation on the badge counter)
2. **Remove from queue**: Click X on queue chip or right-click the selector button
3. **Roll**: Click "ROLL" button → all queued dice animate simultaneously with staggered delays → results appear → total animates counting up → roll is added to history
4. **Quick roll**: Double-click a die selector button to instantly roll just 1 of that die
5. **Clear**: "Clear All" removes all queued dice
6. **History**: Click to expand history panel, see past rolls

---

## Sound Effects (Optional Enhancement)

If you want to add sound, use the Web Audio API to generate:

- A short "clatter" sound on roll (synthesized, no external files needed)
- A "ding" on critical success
- A "thud" on critical fail

This is optional — skip if it adds too much complexity.

---

## Vercel Deployment Notes

- Ensure `next.config.js` has no Vercel-incompatible settings
- No `output: 'export'` — use default SSR/static
- All fonts via Google Fonts (next/font/google or CDN link)
- No Node.js-specific APIs in client components
- All dice components should be client components (`'use client'`)
- The page itself can be a server component that renders the client DiceRoller

---

## Final Checklist

- [ ] All 7 dice types work correctly (d4, d6, d8, d10, d12, d20, d100)
- [ ] Multiple dice can be queued and rolled together
- [ ] Each die has unique color and SVG icon
- [ ] Roll animation with number cycling effect
- [ ] Critical success/fail visual effects
- [ ] Running total with animated counter
- [ ] Roll history (last 10 rolls)
- [ ] Dark dungeon theme with stone textures and gold accents
- [ ] Torch-flicker title animation
- [ ] Responsive on mobile and desktop
- [ ] TypeScript — no `any` types
- [ ] Clean MUI theming — no inline style overrides where theme can handle it
- [ ] Deploys to Vercel with zero config

---

```

```
