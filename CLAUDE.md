# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server at http://localhost:3000
npm run build      # Compile TypeScript + build library (ES, UMD, CJS formats)
npm run build:types # Generate TypeScript declaration files only
npm run lint       # ESLint with zero warnings allowed
npm run preview    # Preview production build locally
```

There is no test suite — tests are listed as an unimplemented roadmap item.

## Architecture

This is a **React 18 date-time range picker component library** published to npm as `react-tailwindcss-datetimepicker`. The library uses **class components** (not functional hooks) throughout.

**Build:** Vite in library mode. Entry point is [src/lib/index.tsx](src/lib/index.tsx), which exports `ReactDateTimePicker`. Output goes to `dist/` in ES, UMD, and CJS formats. React/ReactDOM are externalized (peer dependencies). The `tsconfig-build.json` excludes the demo app from library builds.

**Styling:** TailwindCSS with class-based dark mode. The compiled CSS is distributed as `dist/style.css`. Users without TailwindCSS import this file; users with TailwindCSS add the package to their `content` array.

**Date handling:** Uses `date-fns` v2 for date manipulation. The library previously used Moment.js (removed in v3.0.0).

### Source layout

```
src/lib/                        # Published library code
├── ReactDateTimePicker.tsx     # Root wrapper component
├── DateTimeRangePicker.tsx     # Main logic/state component
├── types.ts                    # All TypeScript types
├── calendar/                   # Calendar grid components
├── date_picker/                # Date/time input fields and buttons
├── ranges/                     # Preset range button components
├── utils/                      # Date selection, time, and year utilities
└── index.css                   # TailwindCSS source styles

src/demo/                       # Local demo app (excluded from library build)
```

### Key component relationships

`ReactDateTimePicker` (root) → `DateTimeRangePicker` (state/logic) → `Calendar`, `DatePicker`, `Ranges` (UI panels)

The main props that drive behavior: `start`/`end` (selected dates), `ranges` (preset shortcuts), `applyCallback`/`rangeCallback` (callbacks), `minDate`/`maxDate` (constraints), `standalone`, `smartMode`, `autoApply`, `theme`, `classNames`, `locale`.

## Code style

- **Prettier:** 2-space indent, single quotes, trailing commas (ES5), 120 char line width, `prettier-plugin-tailwindcss` for class ordering
- **TypeScript:** strict mode, no unused locals/params, ESNext target
- **ESLint:** TypeScript recommended + alphabetical import ordering (external deps first)
- SVGs are imported as React components via `vite-plugin-svgr`
