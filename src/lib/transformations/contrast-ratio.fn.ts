import { ColorTuple } from "../../types";

/*
 - ref: https://www.101computing.net/colour-luminance-and-contrast-ratio/
*/

export const w3cContrastRatio = {
  minimum: { default: 4.5, large: 3},
  enhanced: { default: 7, large: 4.5}
} as const;

export function contrastRatio(color1: ColorTuple, color2: ColorTuple): number {
    const l1 = luminance(color1);
    const l2 = luminance(color2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}


/*
 "The reason such complex formulas are necessary to calculate the luminance 
 (“perceived brightness”) of a colour is partly because our eyes' perception 
 of the brightness of a colour is not linear (it is not directly proportionate 
 to the number of photons being emitted by a computer screen). 
 Effectively our eyes perceive more levels of light in dim conditions, 
 and less in brighter conditions."
*/

function luminance([r, g, b]: ColorTuple): number {
    const [rLinear, gLinear, bLinear] = [r, g, b].map(channel => {
        const srgb = channel / 255;
        return srgb <= 0.03928 
          ? srgb / 12.92 
          : ((srgb + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}