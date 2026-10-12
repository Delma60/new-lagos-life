// lib/constants.ts
export const PLAYER = {
  walkSpeed: 4,
  runSpeed: 8,
  jumpForce: 6,
  capsuleHalfHeight: 0.5,
  capsuleRadius: 0.35,
};

export const CAMERA = {
  offset: [0, 3.5, 7] as const,
  lerp: 0.1,
};

export const QUALITY = {
  low: { dpr: 1, shadows: false },
  medium: { dpr: 1.25, shadows: true },
  high: { dpr: 1.5, shadows: true },
} as const;

export const PERFORMANCE_BUDGET = {
  initialDownloadMb: 5,
  playableSecondsOn4G: 5,
  targetFpsOnMidRangeAndroid: 30,
} as const;