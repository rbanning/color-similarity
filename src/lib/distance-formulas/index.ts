import { cosine } from './cosine.fn';
import { euclidean } from './euclidean.fn';
import { hamming } from './hamming.fn';
import { manhattan } from './manhattan.fn';
import { DistanceFormula } from '../../types/distance-formula.type';
import { DistanceFunction } from '../../types/distance-function.type';

export const distanceFormula: Record<DistanceFormula, DistanceFunction> = {
    euclidean,
    manhattan,
    cosine,
    hamming
} as const;