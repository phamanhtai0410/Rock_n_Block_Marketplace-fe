export function accurateToFixed(num: number, fixed = 18) {
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
  return num.toString()?.match(re)?.[0] || '0';
}

export function smartRound(num: number, toFixedValue = 20) {
  if (!num) {
    return '0';
  }

  if (!(num % 1)) {
    return num.toString();
  }

  return num.toFixed(toFixedValue).match(/^-?\d*\.?0*\d{0,2}/)?.[0] || '0';
}
