import { ColorTuple } from "../../types";

/* 
  References:
  - https://stackoverflow.com/a/9493060/2113712
*/
export function hslToRgb([h,s,l]: ColorTuple): ColorTuple {
  let r = 0, g = 0, b = 0;

  if (s === 0) {
    r = g = b = l; // achromatic
  }
  else {
    //else, we have some color
    
    if (h > 1) { h /= 360; } //convert to 0-1 scale if needed
    
    const q = l < 0.5
      ? l * (1 + s)
      : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }


  return [round(r * 255), round(g * 255), round(b * 255)];
}

function hue2rgb(p: number, q: number, t: number): number {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1/6) return p + (q - p) * 6 * t;
  if (t < 1/2) return q;
  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
  return p;
}

function round(num: number): number {
  return Math.round(num);
}