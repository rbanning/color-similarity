import { ComplementaryFormula } from "../../types/complementary-formula.type";
import { ComplementaryFunction } from "../../types/complementary-function.type";
import { complementaryHallpass } from "./complementary-hallpass.fn";
import { complementaryHue } from "./complementary-hue.fn";
import { complementaryRgb } from "./complementary-rgb.fn";
import { complementarySubtraction } from "./complementary-subtraction.fn";

export const complementaryFunction: Record<ComplementaryFormula, ComplementaryFunction> = {
    'complementary-rgb': complementaryRgb,
    'complementary-hue': complementaryHue,
    'complementary-subtraction': complementarySubtraction,
    'complementary-hallpass': complementaryHallpass,
} as const;