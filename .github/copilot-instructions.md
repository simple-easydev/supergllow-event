# Superglow Party Planning App - AI Coding Instructions

## Project Overview
React 18 + TypeScript 5 + Vite party planning app with Supabase backend. Uses shadcn/ui (Radix UI primitives) with Tailwind CSS for design system. Focus on pixel-perfect Figma implementations with custom gradients and design tokens.

## Architecture

### State Management (React Context Pattern)
```
App.tsx
├── UserProvider (authentication)
├── PartyProvider (party CRUD + localStorage draft auto-save)
└── ModalProvider (modal open/close states)
    └── BrowserRouter (all routes have context access)
```

**Critical Pattern**: Use context hooks, never prop drilling
- Import: `import { useParty, useModal } from '@/contexts'`
- PartyContext auto-saves drafts every 2 seconds to localStorage
- Always use `updateParty(partialData)` for updates, not `setParty`

### File Structure
```
src/
├── components/
│   ├── icons/          # All SVG icons as React components (see icon pattern below)
│   ├── modals/         # Dialog-based modals (use shadcn Dialog)
│   └── ui/             # shadcn/ui components (DO NOT modify unless adding new ones)
├── contexts/           # React Context providers + custom hooks
├── hooks/              # Custom React hooks (e.g., usePartyForm with validation)
├── screens/            # Route-level components (Home, PartyForm, GuestList, PublicInvite)
├── lib/
│   ├── supabase.ts    # Client + TypeScript interfaces (Party, User, Guest)
│   └── utils.ts       # cn() for Tailwind class merging
```

## Critical Conventions

### 1. SVG Icon Pattern (STRICT REQUIREMENT)
**Never use inline SVG**. Always create reusable icon components:

```tsx
// src/components/icons/CalendarIcon.tsx
export const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path stroke="url(#paint0_linear_calendar)" />
      <defs>
        <linearGradient id="paint0_linear_calendar" x1="8" y1="1.3335" x2="8" y2="14.6668">
          <stop stopColor="#F0FDF4"/>
          <stop offset="1" stopColor="#EFF6FF"/>
        </linearGradient>
      </defs>
    </svg>
  );
};
```

**Export from barrel**: Add to `src/components/icons/index.ts`
```tsx
export { CalendarIcon } from './CalendarIcon';
```

**Usage**: Import from barrel `import { CalendarIcon } from '@/components/icons'`

### 2. Figma Design Implementation
- Use exact Tailwind utility classes from Figma CSS exports
- **Typography System**:
  - **Body text/paragraphs/content**: Use `font-sans` (Inter) - this is the default
  - **Headings/titles**: Use `font-heading` (Outfit) or `font-['Outfit']`
  - For inline Figma exports, replace `font-['Inter']` with default and `font-['Outfit']` for headings
- Brand colors (add to imports if needed):
  - Superglow Blue: `#26275A` (blue-950)
  - Superglow Green: `#66FFB8` (emerald-300)
- Preserve exact spacing, shadows: `shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)]`
- Use `backdrop-blur-md` for glassmorphism effects over images

### 3. Image Backgrounds with Blur Effects
**Pattern**: Use `<img>` tag with absolute positioning, NOT CSS background-image
```tsx
<div className="relative">
  <img src={url} className="absolute inset-0 w-full h-full object-cover -z-10" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-blue-950/75 -z-[5]" />
  <div className="relative z-10 backdrop-blur-md">Content</div>
</div>
```
**Why**: backdrop-blur only works with actual DOM elements behind, not CSS backgrounds

### 4. shadcn/ui Component Integration
When adding new shadcn components (e.g., Tabs):
1. Install Radix dependency: `npm install @radix-ui/react-tabs`
2. Create component in `src/components/ui/tabs.tsx` (follow shadcn docs)
3. Import and use with custom Tailwind classes for brand styling

**Tabs pattern**: Override default styles with `data-[state=active]` and `data-[state=inactive]`
```tsx
<TabsTrigger 
  value="going"
  className="data-[state=active]:bg-emerald-300 data-[state=inactive]:text-blue-950/20"
>
```

**ScrollArea pattern**: ALWAYS use shadcn's ScrollArea for scrollable content, never use `overflow-y-auto`
```tsx
import { ScrollArea } from '@/components/ui/scroll-area';

<ScrollArea className="flex-1 pr-4">
  <div className="flex flex-col gap-3">
    {/* scrollable content */}
  </div>
</ScrollArea>
```

### 5. TypeScript Type Exports
Import types from centralized locations:
```tsx
import { Party } from '@/contexts/PartyContext';  // Re-exported from supabase.ts
import { useParty } from '@/contexts';
```

### 6. Environment Variables
Supabase credentials required in `.env`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Development Workflow

### Running the App
```bash
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build
npm run typecheck    # TypeScript validation
```

### Vite Config (Windows-specific)
Server configured for Windows with `host: true` and `open: true` for automatic browser opening.

### Common Tasks

**Add new modal**:
1. Create in `src/components/modals/NewModal.tsx`
2. Add state to `ModalContext.tsx`: `isNewModalOpen`, `openNewModal()`, `closeNewModal()`
3. Use `useModal()` hook in components

**Add form with validation**:
- Use `usePartyForm` hook pattern (see `src/hooks/usePartyForm.ts`)
- Validation rules for required fields: party_name, child_name, event_date, start_time, location

## Design System Tokens
- **Typography**:
  - Body/Content: Inter (use `font-sans` or default - set globally)
  - Headings/Titles: Outfit (use `font-heading` or `font-['Outfit']`)
- Border radius: `rounded-3xl` (24px), `rounded-[100px]` (pills)
- Shadows: Custom Figma values, e.g., `shadow-[0px_0px_37.85px_-4.71px_rgba(38,39,90,1)]`
- Gradients: Use `bg-gradient-to-b from-red-300 to-blue-950` for dialog backgrounds

## Anti-Patterns to Avoid
❌ Inline SVG code → ✅ Icon components in `src/components/icons/`
❌ CSS background-image with backdrop-blur → ✅ `<img>` with absolute positioning
❌ Prop drilling for party data → ✅ `useParty()` context hook
❌ Direct localStorage access → ✅ PartyContext auto-save (happens automatically)
❌ Generic shadcn styles → ✅ Custom Tailwind classes matching Figma
❌ `overflow-y-auto` for scrolling → ✅ shadcn's `<ScrollArea>` component

## Quick Reference
- Path alias: `@/` maps to `src/`
- Route structure: `/` (home), `/create` (form), `/guests` (list), `/i/:inviteCode` (public)
- Supabase tables: `parties`, `users`, `guests` (see migration in `supabase/migrations/`)
