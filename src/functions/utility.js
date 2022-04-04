export function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CalculateStatPercentage(int) {
  let percent = 100 / (255 / int);

  return Math.round(percent);
}

export default Capitalize;