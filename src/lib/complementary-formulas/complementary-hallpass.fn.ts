import { ColorTuple } from "../../types";
import { contrastRatio, w3cContrastRatio } from "../transformations/contrast-ratio.fn";
import { hslToRgb } from "../transformations/hsl-to-rgb.fn";
import { rgbToHsl } from "../transformations/rgb-to-hsl.fn";

export function complementaryHallpass(rgb: ColorTuple): ColorTuple {
    const hsl = rgbToHsl(rgb);
    const [hue, saturation] = hsl;
    let luminance = hsl[2];
    const complement = (hue + 180) % 360;
    const delta = luminance > 0.5 ? -0.05 : +0.05;
    const tries = 0;
    let contrast = contrastRatio(rgb, hslToRgb([complement, saturation, luminance]));
    while (contrast < w3cContrastRatio.minimum.default && luminance > 0 && luminance < 1 && tries < 100) {
        luminance += delta;
        contrast = contrastRatio(rgb, hslToRgb([complement, saturation, luminance]));
    };
 
    return hslToRgb([complement, saturation, luminance]);
}