# Lagos-Style 3D Open World Game: TODO List

**Stack:** Next.js (App Router) + TypeScript, React Three Fiber, drei, Rapier, Zustand, Firebase/Firestore

**Performance budget:** initial download under ~5 MB, playable in under ~5 seconds on 4G, 30+ FPS on a mid-range Android phone.

---

## Phase 0: Setup and Performance Budget

- [ ] Create a Next.js (App Router) + TypeScript project
- [ ] Install `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `zustand`
- [ ] Set a performance budget (see above)
- [ ] Add a stats overlay (`r3f-perf` or `stats.js`) and test on a real low-end phone from day one
- [ ] Load the game canvas with `next/dynamic` (`ssr: false`) so the landing page stays light

## Phase 1: Core Engine

- [ ] Render a basic scene (ground, sky, lights) in a `<Canvas>`
- [ ] Build a third-person character controller (walk, run, jump) with Rapier
- [ ] Add a follow camera with collision so it doesn't clip through walls
- [ ] Add keyboard controls, plus a virtual joystick for touch
- [ ] Set up the Zustand store (player stats, cash, inventory, time, missions)
- [ ] Add an in-game pause menu and settings (graphics quality: low/medium/high)

## Phase 2: One City Block (Vertical Slice)

- [ ] Block out one district with simple boxes first, then replace with real models
- [ ] Add colliders for buildings, walls, and props
- [ ] Add day/night cycle (sun position, sky color, street lights at night)
- [ ] Add ambient traffic along fixed paths (danfo, keke) instead of full physics
- [ ] Add pedestrians that walk simple waypoint loops
- [ ] Add NPC dialogue (simple dialogue tree system)

## Phase 3: Gameplay Loop

- [ ] Money and basic economy (earn, spend, balance saved in state)
- [ ] 2 starter hustles (e.g., deliver an order, run a stall)
- [ ] Needs system (energy, hunger) with simple consequences
- [ ] Mission/objective tracker with on-screen markers
- [ ] Minimap
- [ ] Sound: ambient street audio, footsteps, UI clicks

## Phase 4: Load-Time Optimization

- [ ] Export all models as **GLB**, then compress with `gltf-transform` (Draco/Meshopt + simplify)
- [ ] Convert textures to **KTX2 (Basis)** or WebP; cap texture size at 1024px (512px for small props)
- [ ] Use a texture atlas or shared materials across props to cut draw calls
- [ ] Use **instanced meshes** (`<Instances>`) for repeated objects like buildings, poles, and cars
- [ ] Bake lighting and shadows into textures instead of using real-time shadows everywhere
- [ ] Keep real-time shadows to the sun only, with a small shadow map
- [ ] Split the map into **chunks** and stream them in as the player moves
- [ ] Load the player and nearest chunk first, then load the rest in the background
- [ ] Add LOD (level of detail) for far buildings and props, and fog to hide pop-in
- [ ] Use `useGLTF.preload` only for critical assets; lazy-load everything else
- [ ] Show a real loading screen with a progress bar (`useProgress` from drei)
- [ ] Compress audio (OGG/MP3, low bitrate) and load it after the first render
- [ ] Serve assets from a CDN with long cache headers (Vercel/Cloudflare) and enable Brotli
- [ ] Add a service worker so repeat visits load assets from cache
- [ ] Add an automatic quality fallback: detect low FPS and drop pixel ratio, shadows, and draw distance

## Phase 5: Persistence and Accounts

- [ ] Firebase Auth (email/Google, plus guest mode)
- [ ] Save/load game state to Firestore (throttle writes, e.g. every 30-60 seconds and on key events)
- [ ] Firestore security rules so players can only read and write their own data
- [ ] Do cash and economy validation server-side if you ever add leaderboards or purchases

## Phase 6: Polish and Testing

- [ ] Test on low-end Android, iPhone Safari, and desktop Chrome
- [ ] Handle WebGL context loss and unsupported devices gracefully
- [ ] Add error tracking (Sentry) and basic analytics (load time, FPS, drop-off)
- [ ] Run Lighthouse and WebPageTest on a throttled 4G profile
- [ ] Fix memory leaks (dispose geometries, materials, and textures when chunks unload)

## Phase 7: Later

- [ ] More districts and landmarks
- [ ] Drivable vehicles
- [ ] Multiplayer (Colyseus or a Node WebSocket server)
- [ ] Wallet/Flutterwave integration for in-game purchases, if relevant

---

## Biggest Load-Time Wins (in order)

1. Compressed models and textures (Draco/Meshopt, KTX2)
2. Chunk streaming
3. Instancing
4. Baked lighting
