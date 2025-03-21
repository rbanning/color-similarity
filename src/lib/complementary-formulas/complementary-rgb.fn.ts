import { ColorTuple } from "../../types";

/*
From Adobe Illustrator guide:
  Complement Changes each component of a color to a new value based on the sum 
  of the highest and lowest RGB values in the selected color. 
  Illustrator adds the lowest and highest RGB values of the current color, 
  and then subtracts the value of each component from that number to create new RGB values. 
  For example, suppose you select a color with an 
  RGB value of 102 for red, 153 for green, and 51 for blue. 
  Illustrator adds the high (153) and low (51) values, to end up with a new value (204). 
  Each of the RGB values in the existing color is subtracted from the new value 
  to create new complementary RGB values: 204 – 102 (the current red value) = 102 for the new red value, 
  204 – 153 (the current green value) = 51 for the new green value, 
  and 204 – 51 (the current blue value) = 153 for the new blue value.
  - ref: https://stackoverflow.com/a/7261283/2113712
*/
export function complementaryRgb(color: ColorTuple): ColorTuple {
    const max = Math.max(...color);
    const min = Math.min(...color);
    let sum = max + min;
    //if black, then white
    if (sum === 0) { sum = 255; }
    //cap the sum to 255
    if (sum > 255) { sum = 255; }
    
    return color.map(c => sum - c) as ColorTuple;
}