import { createNoise2D } from "simplex-noise";

export const fbm2d = (
  noise2D: ReturnType<typeof createNoise2D>,
  octaves: number = 4,
  persistence: number = 0.8,
  lacunarity: number = 2.0
) => {
  return (x: number, y: number): number => {
    let value = 0;
    let amplitude = 0.5;

    for (let i = 0; i < octaves; i++) {
      value += noise2D(x, y) * amplitude;
      x *= lacunarity;   // en tu código era 0.5, ahora configurable
      y *= lacunarity;
      amplitude *= persistence; // en tu código era 0.8, ahora configurable
    }

    return value;
  };
};

// ejemplo de uso
const noise2D = createNoise2D();
const fbm = fbm2d(noise2D, 5);
