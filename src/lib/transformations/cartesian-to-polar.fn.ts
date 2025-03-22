/*
  Polar Coordinates
  ================
  distance (r) from the origin and an angle (θ) 
  measured counterclockwise from the positive x-axis to define a point's location
*/
export function cartesianToPolar(x: number, y: number) {
  const r = Math.sqrt(x*x + y*y); // distance from the origin
  const phi = Math.atan2(y, x);   // angle from the positive x-axis
  return [r, phi];
}