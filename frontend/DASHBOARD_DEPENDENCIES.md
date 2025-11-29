# Dashboard Dependencies Installation

## Required Dependencies

Run this command in the `frontend` directory to install all required dependencies for the new Dashboard:

```bash
npm install framer-motion recharts lucide-react @react-three/fiber @react-three/drei three
```

### Dependencies Breakdown:

- **framer-motion** - Smooth animations and transitions
- **recharts** - Sparkline charts for KPI cards
- **lucide-react** - Modern icon library
- **@react-three/fiber** - React renderer for Three.js (3D globe)
- **@react-three/drei** - Useful helpers for react-three-fiber
- **three** - 3D library for WebGL

## Installation Steps:

1. Open terminal in the `frontend` directory
2. Run: `npm install framer-motion recharts lucide-react @react-three/fiber @react-three/drei three`
3. Wait for installation to complete
4. The new Dashboard will automatically use these libraries

## Note:
The 3D globe component is lazy-loaded and will only load on devices that support WebGL. Mobile devices will see a 2D fallback image instead.
