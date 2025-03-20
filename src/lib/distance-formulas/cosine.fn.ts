import { ColorTuple } from "../../types";

/*
Cosine distance measures the dissimilarity between two vectors by calculating the cosine of the angle between them. It can be defined as one minus cosine similarity. Cosine similarity is the dot product of two vectors divided by the product of the magnitudes of the two vectors.
*/

export function cosine(a: ColorTuple, b: ColorTuple): number {
    const dotProduct = a.reduce((acc, c, i) => acc + c * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((acc, c) => acc + c ** 2, 0));
    const magnitudeB = Math.sqrt(b.reduce((acc, c) => acc + c ** 2, 0));
    return 1 - dotProduct / (magnitudeA * magnitudeB);
}