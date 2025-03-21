export const complementaryFormulaList = ['complementary-hue', 'complementary-rgb', 
  'complementary-subtraction', 'complementary-hallpass'] as const;
export type ComplementaryFormula = typeof complementaryFormulaList[number];