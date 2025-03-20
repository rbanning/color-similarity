import { ColorTuple } from "../../types";

/*
Hamming distance is a metric used to determine the distance between two points in a grid-like path. It measures the number of positions at which the corresponding symbols are different. This method is called "Hamming distance" after Richard Hamming, an American mathematician who developed the concept.
*/
export function hamming(a: ColorTuple, b: ColorTuple): number {
    return a.reduce((acc, c, i) => acc + (c !== b[i] ? 1 : 0), 0);
}