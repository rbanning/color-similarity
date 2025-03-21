import { ColorTuple } from "../../types";

export function rgbToHex(rgb: ColorTuple): string {
    return '#' + rgb.map(channel => channel.toString(16).padStart(2, '0')).join('');
}
