export function CalculateStatPercentage(int) {
  let percent = 100 / (255 / int);

  return Math.round(percent);
}
// Pokemon uses Deci units 
export function ConvertUnits(int) {
  return int / 10;
}

export default CalculateStatPercentage;
