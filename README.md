# PWA Sample

This project utilizes:
- Vite and [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) for building and PWA support
- React and TypeScript for component development
- ESLint + ESLint stylistic for code quality
- Zustand for state management
- Tanstack router for routing (file-based, hash history for GitHub Pages)
- dexie.js for IndexedDB interaction
- compressorjs for image compression
- mantine for UI components
- tabler icons for iconography
- fcm for push notifications

The project uses `injectManifest` for the service worker strategy due to the use of a custom service worker. Workbox-* are required as devDependencies. 

PWA manifest is configured in `vite.config.ts`. 

`firebase-messaging-sw.ts` is a facade for firebase messaging, used in `sw.ts`.

## Table of Contents

- [Setup](#setup)

## Setup
1. Clone the repository:
```
git clone https://github.com/bskevin/pwa-sample.git
```

2. Navigate to the project directory:
```
cd pwa-sample
```

3. Install dependencies:
```
pnpm install
```

4. Start the development server:
```
pnpm run dev
```
