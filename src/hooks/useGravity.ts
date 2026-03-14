import { useMemo } from 'react';

const EARTH_GRAVITY = 9.8;
const MARS_GRAVITY = 3.7;

export const useGravity = (weight: number, planet: 'earth' | 'mars') => {
  return useMemo(() => {
    const gravity = planet === 'earth' ? EARTH_GRAVITY : MARS_GRAVITY;
    const jumpHeight = (gravity === EARTH_GRAVITY ? 0.5 : 0.5 * (EARTH_GRAVITY / MARS_GRAVITY));
    const multiplier = planet === 'mars' ? EARTH_GRAVITY / MARS_GRAVITY : 1;

    return {
      gravity: gravity.toFixed(1),
      jumpHeight: jumpHeight.toFixed(2),
      multiplier: multiplier.toFixed(1),
      earthGravity: EARTH_GRAVITY,
      marsGravity: MARS_GRAVITY,
    };
  }, [weight, planet]);
};
