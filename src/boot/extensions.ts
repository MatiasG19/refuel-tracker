export function _() {
  return
}

declare global {
  interface Number {
    toFixedIfNotZero(fractionGigits: number): string
  }
}

Number.prototype.toFixedIfNotZero = function (fractionGigits: number) {
  const n = Number(this)
  const trunc = Math.trunc(n)
  if (n - trunc > 0 && (n - trunc) * 10 * fractionGigits > 0)
    return n.toFixed(fractionGigits)
  return trunc.toString()
}
