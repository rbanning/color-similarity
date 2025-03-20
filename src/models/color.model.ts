import { ColorTuple } from "../types";

export interface IColor {
  id: string; //hex
  name: string;
  rgb: ColorTuple;
  families: string[];
}


export function parseRgb(rgb: unknown): ColorTuple | false {
  if (Array.isArray(rgb) && rgb.length === 3 && rgb.every(c => typeof c === 'number')) {
    return rgb as ColorTuple;
  }
  if (typeof rgb === 'string') {
    const regex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/gmi
    const match = regex.exec(rgb);
    if (match) {
      const result = [
        parseInt(match[1]),
        parseInt(match[2]),
        parseInt(match[3])
      ];
      if (result.every(c => c >= 0 && c <= 255)) {
        return result as ColorTuple; 
      }
      else {
        console.warn(`Problem with RGB value: ${rgb}`, {result, match});
      }
    }
  }
  
  return false;
}