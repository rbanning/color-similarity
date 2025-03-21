import { ColorTuple } from "../../types";

/* 
  References:
  - https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
  - https://stackoverflow.com/a/39147465/2113712
  - https://stackoverflow.com/a/9493060/2113712
*/
export function rgbToHsl([r, g, b]: ColorTuple): ColorTuple {
    const rPrime = r / 255;
    const gPrime = g / 255;
    const bPrime = b / 255;

    const max = Math.max(rPrime, gPrime, bPrime);
    const min = Math.min(rPrime, gPrime, bPrime);
    const delta = max - min; //some places, this is called chroma
    const luminance = (max + min) / 2;

    //node: when delta is 0, hue and saturation are zero (this is a grayscale color)
    if (delta === 0) {
        return [0, 0, luminance];  // achromatic
    } 

    //ok, has some color, let's calculate hue and saturation

    //calculate hue based on max color
    let hue = 0;
    if (max === rPrime) {
        hue = 60 * (((gPrime - bPrime) / delta) + (gPrime < bPrime ? 6 : 0));
    } else if (max === gPrime) {
        hue = 60 * (((bPrime - rPrime) / delta) + 2);
    } else if (max === bPrime) {
        hue = 60 * (((rPrime - gPrime) / delta) + 4);
    }


    //calculate saturation based on delta 
    // (if min === max, then there is no saturation)
    const saturation = luminance <= 0.5
        ? delta / (max + min)
        : delta / (2 - max - min);

    return [round(hue), round(saturation), round(luminance)];
}

function round(num: number): number {
    return Math.round(num * 100) / 100;
}