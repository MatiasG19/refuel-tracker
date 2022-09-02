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
  if (((n - trunc) * 10 * fractionGigits) % 2 === 0) return trunc.toString()
  return n.toFixed(fractionGigits)
}
