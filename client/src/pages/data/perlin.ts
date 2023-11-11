// @ts-expect-error some random js module
import * as perlin from 'perlin';
import _ from 'lodash';
console.log(perlin);

console.log(perlin.noise.perlin2(2, 3));

export const generatePerlin = (length: number) => {
  perlin.noise.seed(Date.now());
  const start = Math.random() * 100;
  console.log(start);
  const step = 0.05;
  return _.range(0, length * step, step).map(
    (p) => 10 + Math.abs(perlin.noise.perlin2(start + p, start + p) * 200),
  ) as unknown as number[];
};
