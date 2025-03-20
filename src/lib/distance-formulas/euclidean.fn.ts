import { ColorTuple } from "../../types";

/*
Euclidean distance represents the shortest path between two points in Euclidean space. It's the distance you would measure with a ruler, extended to any number of dimensions. This concept is deeply rooted in the Pythagorean theorem, which states that in a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.
*/
export function euclidean(a: ColorTuple, b: ColorTuple): number {
    return Math.sqrt(a.reduce((acc, c, i) => acc + (c - b[i]) ** 2, 0));
}