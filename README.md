# New Lagos Life

A mobile-conscious, Lagos-inspired open-world game built with Next.js App Router,
React Three Fiber, Rapier, and Zustand.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page or
[http://localhost:3000/play](http://localhost:3000/play) to enter the prototype.

Use **WASD** or the **arrow keys** to move, **Shift** to run, and **Space** to
jump. Touch devices have on-screen movement controls. The game canvas and its
rendering dependencies are loaded only on `/play`.

## Structure

- `app/` contains the landing page and game route.
- `components/landing/` contains lightweight landing UI.
- `components/game/` contains the client-only canvas, scene, world, player, and
  in-game UI.
- `data/`, `hooks/`, `lib/`, `store/`, and `types/` hold shared game data,
  browser hooks, runtime helpers, Zustand state, and TypeScript types.
- `public/models/`, `public/textures/`, `public/audio/`, and `public/draco/`
  are reserved for optimized game assets.

## Performance budget

```text
Initial download: under 5 MB
Playable on 4G: under 5 seconds
Target frame rate: 30+ FPS on a mid-range Android phone
```

Keep the initial route free of Three.js imports; load rendering code through the
client-only `GameLoader`. Use the in-game FPS panel while profiling and verify
the budget on representative low-end devices before release.
