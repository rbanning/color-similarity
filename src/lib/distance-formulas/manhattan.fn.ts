import { ColorTuple } from "../../types";

/*
Manhattan distance is a metric used to determine the distance between two points in a grid-like path. Unlike Euclidean distance, which measures the shortest possible line between two points, Manhattan distance measures the sum of the absolute differences between the coordinates of the points. This method is called "Manhattan distance" because, like a taxi driving through the grid-like streets of Manhattan, it must travel along the grid lines. 
*/

export function manhattan(a: ColorTuple, b: ColorTuple): number {
    return a.reduce((acc, c, i) => acc + Math.abs(c - b[i]), 0);
}