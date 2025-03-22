export function radianToDegree(rad: number) {
  return ((rad + Math.PI) / (2 * Math.PI)) * 360;
}