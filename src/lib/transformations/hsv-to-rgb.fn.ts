import { ColorTuple } from "../../types";

/*
  - ref: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
        https://medium.com/@bantic/hand-coding-a-color-wheel-with-canvas-78256c9d7d43
*/
export function hsvToRgb(hue: number, saturation: number, value: number): ColorTuple {
  const chroma = value * saturation;
  const hue1 = hue / 60;
  const x = chroma * (1- Math.abs((hue1 % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (hue1 >= 0 && hue1 <= 1) {
    ([r1, g1, b1] = [chroma, x, 0]);
  } else if (hue1 >= 1 && hue1 <= 2) {
    ([r1, g1, b1] = [x, chroma, 0]);
  } else if (hue1 >= 2 && hue1 <= 3) {
    ([r1, g1, b1] = [0, chroma, x]);
  } else if (hue1 >= 3 && hue1 <= 4) {
    ([r1, g1, b1] = [0, x, chroma]);
  } else if (hue1 >= 4 && hue1 <= 5) {
    ([r1, g1, b1] = [x, 0, chroma]);
  } else if (hue1 >= 5 && hue1 <= 6) {
    ([r1, g1, b1] = [chroma, 0, x]);
  }
  
  const m = value - chroma;
  const result: ColorTuple = [r1+m, g1+m, b1+m];
  
  // Change r,g,b values from [0,1] to [0,255]
  return result.map((color) => Math.round(color * 255)) as ColorTuple;
}