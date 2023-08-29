export type fuelConsumptionFunc = (
  fuelAmount: number,
  distance: number
) => number

export function litresPer100km(fuelAmount: number, distance: number) {
  return litresPer100DistanceUnit(fuelAmount, distance)
}

export function milesPerGallonUs(fuelAmount: number, distance: number) {
  return distancePerFuelAmount(fuelAmount, distance)
}

export function milesPerGallonImperial(fuelAmount: number, distance: number) {
  return distancePerFuelAmount(fuelAmount, distance)
}

export function kWhPer100km(fuelAmount: number, distance: number) {
  return litresPer100DistanceUnit(fuelAmount, distance)
}

export function whPer100km(fuelAmount: number, distance: number) {
  return litresPer100DistanceUnit(fuelAmount, distance)
}

export function whPerMile(fuelAmount: number, distance: number) {
  return fuelAmount / distance
}

function litresPer100DistanceUnit(fuelAmount: number, distance: number) {
  return (fuelAmount * 100) / distance
}

function distancePerFuelAmount(fuelAmount: number, distance: number) {
  return distance / fuelAmount
}
