# Spacey Science Mission - Copilot Instructions

## Project Overview

This is an interactive educational web application teaching kids about gravity on Mars through gamification, animations, and personalized experiences.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, dnd-kit

## Quick Reference

### Development
- **Start Dev Server**: `npm run dev` (runs on localhost:5173)
- **Build**: `npm run build`
- **Preview Build**: `npm run preview`

### Project Structure
- `src/components/` - React components (Intro, Role Selection, Simulator, Game, Complete)
- `src/context/` - UserContext for global state management
- `src/hooks/` - useGravity hook for physics calculations
- `src/data/` - Static backpack items database
- `src/index.css` - Global styles and animations
- `README.md` - Full project documentation
- `DEVELOPMENT.md` - Development guide with patterns
- `DEPLOYMENT.md` - Vercel deployment instructions

### State Management

Uses React Context API (`UserContext.tsx`):
```typescript
- name: string (user's astronaut name)
- weight: number (30-150 kg slider)
- role: 'engineer' | 'scientist' | 'explorer' | null
- progressStep: current screen in journey
- score: game performance score
- completedItems: tracked achievements
```

Available setters: `setName()`, `setWeight()`, `setRole()`, `setProgressStep()`, `setScore()`, `addCompletedItem()`, `resetState()`

### Component Descriptions

1. **IntroScreen** - Welcome with name input, animated rocket, floating stars
2. **RoleSelection** - Choose role (3 options) and adjust weight
3. **GravitySimulator** - Interactive planet slider, gravity comparison, animated astronaut jumping
4. **BackpackGame** - Drag/click items to pack (correct vs wrong items with feedback)
5. **MissionComplete** - Personalized achievement, confetti, play-again option

### Key Features

- Accurate physics: Mars gravity = 3.7 m/s², Earth = 9.8 m/s², jump multiplier ≈ 2.6×
- Smooth animations using Framer Motion
- Drag-and-drop with click fallback for accessibility
- Responsive design (mobile, tablet, desktop)
- Dark space theme with gradient backgrounds
- Real-time feedback and validation

### Customization Points

1. **Colors**: Tailwind classes in components, extended config in `tailwind.config.ts`
2. **Animations**: CSS keyframes in `src/index.css` or Framer Motion props
3. **Items**: Backpack items in `src/data/items.ts`
4. **Text/Copy**: Hardcoded in components (consider adding to data file)
5. **Roles**: Role definitions in `RoleSelection.tsx`

### Dependencies

Key packages:
- `react@^18.2.0` - UI framework
- `framer-motion@^10.16.4` - Animations
- `@dnd-kit/core@^6.0.0` - Drag-and-drop
- `tailwindcss@^3.3.6` - Styling
- `typescript@^5.2.2` - Type safety
- `vite@^5.0.0` - Build tool

### Build & Deployment

- **Build Command**: `npm run build` → outputs to `dist/`
- **Deployment**: Vercel (auto-detects and builds)
- See `DEPLOYMENT.md` for detailed instructions

### Testing Locally

```bash
npm run build        # Build production version
npm run preview      # Preview production build locally
```

## Common Tasks

### Add New Component
1. Create `src/components/NewComponent.tsx`
2. Export from `src/components/index.ts`
3. Add case to switch statement in `App.tsx`
4. Add progress step to `ProgressStep` type if needed

### Update Global State
1. Modify `UserState` interface in `UserContext.tsx`
2. Add setter function and initialize in `defaultState`
3. Export from provider
4. Use in components with `const { newField } = useUser()`

### Add Animation
1. Define CSS keyframe in `src/index.css` OR use Framer Motion
2. Apply with Tailwind class or motion properties
3. Test on desktop and mobile

### Change Colors/Theme
1. Update Tailwind classes in components
2. Modify `tailwind.config.ts` for custom colors
3. Update role colors in `RoleSelection.tsx` and `MissionComplete.tsx`

### Add New Screen
1. Create component in `src/components/`
2. Add to progress step type: `type ProgressStep = '...' | 'newstep'`
3. Add case in `App.tsx` switch statement
4. Use `setProgressStep('newstep')` to navigate

## Code Patterns

### Using Context in Components
```typescript
const { state, setName, setProgressStep } = useUser();
```

### Animated Containers
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

### Tailwind + Framer Motion
```typescript
<motion.button
  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 
             text-white rounded-lg hover:from-purple-500 hover:to-pink-500"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

## Performance & Optimization

- Vite handles code splitting automatically
- Tailwind CSS purges unused styles in production
- CSS animations use GPU-accelerated properties
- Context re-renders only when state changes
- Consider memoization for expensive computations

## Browser Support

Works on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari 12+, Chrome Android)

## Known Limitations

- Uses CSS Grid/Flexbox for layout (no absolute positioning for main layout)
- Emoji support depends on browser/OS
- Drag-and-drop fallback to click on some devices

## Next Steps / Ideas

- Add 3D Mars surface (React Three Fiber)
- Extend to other planets
- Add sound effects
- Multiplayer mode
- PWA support
- Unit tests with Jest

---

**Questions?** Check README.md, DEVELOPMENT.md, or DEPLOYMENT.md for detailed information.
