export function CalculateStatPercentage(int) {
  let percent = 100 / (255 / int);

  return Math.round(percent);
}

export default CalculateStatPercentage;
