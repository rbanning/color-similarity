import { ColorTuple } from "../../types";
import { hslToRgb } from "../transformations/hsl-to-rgb.fn";
import { rgbToHsl } from "../transformations/rgb-to-hsl.fn";

export function complementaryHue(rgb: ColorTuple): ColorTuple {
    const hsl = rgbToHsl(rgb);
    const hue = hsl[0];
    const complement = (hue + 180) % 360;
 
    return hslToRgb([complement, hsl[1], hsl[2]]);
}