export const distanceFormulaList = ['euclidean', 'manhattan', 'cosine', 'hamming'] as const;
export type DistanceFormula = typeof distanceFormulaList[number];
