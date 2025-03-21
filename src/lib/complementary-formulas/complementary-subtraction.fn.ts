import { ColorTuple } from "../../types";

export function complementarySubtraction(color: ColorTuple): ColorTuple {
    return color.map(c => 255 - c) as ColorTuple;
}