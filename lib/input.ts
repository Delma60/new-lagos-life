// lib/input.ts
// Mutable object read inside useFrame. Writing to it never triggers a React re-render.
export const input = {
  x: 0, // -1 (left) to 1 (right)
  y: 0, // -1 (back) to 1 (forward)
  run: false,
  jump: false,
};

export const inputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  run: false,
  jump: false,
};

export function resetInputState() {
  inputState.forward = false;
  inputState.backward = false;
  inputState.left = false;
  inputState.right = false;
  inputState.run = false;
  inputState.jump = false;
}


