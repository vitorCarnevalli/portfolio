# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:5173
npm run build     # Type-check + production build (dist/)
npm run lint      # ESLint
npm run preview   # Serve production build locally
```

## Project overview

Personal portfolio for **Vitor Carnevalli de Almeida** — Information Systems student at PUC Campinas, IT Support at UNICAMP (FEF). Single-page React app.

Stack: React 19 + Vite 8 + Tailwind CSS 4 + TypeScript + Framer Motion + Three.js.

## Architecture

**Data flow**: `App.tsx` owns the two global hooks (`useTheme`, `useLanguage`) and passes `theme`, `toggleTheme`, `lang`, `toggleLang`, and `t` down as props to every component. There is no context or global store.

**i18n**: `useLanguage` loads `src/i18n/pt.json` and `src/i18n/en.json` at import time and exposes a `t(key)` function that resolves dot-separated keys (e.g. `t('skills.levels.intermediate')`). Adding new text requires editing both JSON files.

**Dark mode**: `useTheme` toggles a `dark` class on `<html>`. Tailwind's `@custom-variant dark` in `index.css` scopes all `dark:` utilities to `.dark *`. Persists to `localStorage`.

**Smooth scroll**: `useSmoothScroll` initialises Lenis in `App.tsx`. Navbar uses native `element.scrollIntoView` — if Lenis is ever configured to intercept anchor scrolls, the Navbar's `scrollTo` helper must be updated to call `lenis.scrollTo()` instead.

**3D Hero**: `HeroBackground.tsx` is a Three.js canvas (`@react-three/fiber` + `@react-three/drei`). It is **lazy-loaded** via `React.lazy` in `Hero.tsx` and only rendered on desktop (hidden on mobile via `hidden lg:block`). Keep it lazy to avoid blocking initial paint.

**Animations**: Framer Motion `whileInView` variants use `once: true`. When defining `ease` as a cubic-bezier array inside a `Variants` object, always cast it `as const` to satisfy TypeScript (`ease: [0.22, 1, 0.36, 1] as const`).

**Glassmorphism**: The `.glass` utility class is defined in `index.css` (not Tailwind). Use it directly on elements instead of repeating the backdrop-blur/border combination.

**Fonts**: Space Grotesk (`--font-heading`) for headings, DM Sans (`--font-sans`) for body. Apply heading font inline: `style={{ fontFamily: 'var(--font-heading)' }}`.

**Content to update**: Skills levels/percentages live in `src/data/skills.ts`. Projects live in `src/data/projects.ts` (currently manual; GitHub API integration is planned for future).

## File map

```
src/
├── App.tsx                   Entry — owns theme/lang hooks, renders layout
├── main.tsx                  React root
├── index.css                 Tailwind base + global utilities (.glass, animations)
├── assets/
│   └── hero.png              Currently unused — candidate for removal
├── components/
│   ├── Navbar.tsx            Fixed nav with scroll progress bar + mobile menu
│   ├── Hero.tsx              Split layout (text left, 3D right) with parallax blobs
│   ├── HeroBackground.tsx    Three.js canvas — lazy-loaded, desktop only
│   ├── Skills.tsx            Grid of SkillCards + Marquee of tools
│   ├── SkillCard.tsx         Radial SVG progress circle per skill
│   ├── Experience.tsx        Animated timeline (data inline, NOT in src/data/)
│   ├── Projects.tsx          Tilt cards grid from src/data/projects.ts
│   ├── TiltCard.tsx          3D tilt-on-hover wrapper
│   ├── MagneticButton.tsx    Magnetic cursor effect for CTA buttons
│   ├── Marquee.tsx           Infinite horizontal scroll strip
│   ├── BackgroundGrid.tsx    Subtle dot-grid background
│   ├── SectionDivider.tsx    Visual separator between sections
│   ├── CustomCursor.tsx      Custom cursor (hidden on mobile/touch)
│   └── Footer.tsx            Simple footer
├── hooks/
│   ├── useTheme.ts           Persists dark/light to localStorage
│   ├── useLanguage.ts        Loads both JSON files, exposes t(key)
│   └── useSmoothScroll.ts    Lenis smooth scroll initialiser
├── data/
│   ├── skills.ts             Skill[] with name, level, percentage, color
│   └── projects.ts           Project[] with nameKey, descriptionKey, tags, url, repo
└── i18n/
    ├── pt.json               Portuguese strings
    └── en.json               English strings
```

## Known issues / tech debt

- **No `.gitignore`**: `dist/` and potentially sensitive files can be committed accidentally. Add one before the next push.
- **`src/assets/react.svg` and `vite.svg`**: Vite template leftovers, unused, can be deleted.
- **`src/assets/hero.png`**: Not imported anywhere, candidate for removal.
- **Experience data inline**: `Experience.tsx` builds its items array from `t()` calls inside the component instead of using a data file like `skills.ts`/`projects.ts`. If a third item is ever added, consider moving to `src/data/experience.ts`.
- **`key={i}` in Projects.tsx**: Index used as React key — fine for now since the list is static, but should use `project.nameKey` for stability.

## Planned features

- GitHub API integration for Projects section (auto-fetch repos)
- Possibly add a Contact/About section
