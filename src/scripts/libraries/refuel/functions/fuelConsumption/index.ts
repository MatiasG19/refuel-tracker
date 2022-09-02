export type fuelConsumptionFunc = typeof litresPer100km

export function litresPer100km(fuelAmount: number, distance: number) {
  return (fuelAmount * 100) / distance
}

export function milesPerGallonUs(fuelAmount: number, distance: number) {
  return distance / fuelAmount
}

export function milesPerGallonImperial(fuelAmount: number, distance: number) {
  return distance / fuelAmount
}

export function kWhPer100km(fuelAmount: number, distance: number) {
  return (fuelAmount * 100) / distance
}

export function WhPer100km(fuelAmount: number, distance: number) {
  return (fuelAmount * 100) / distance
}

export function WhPerMile(fuelAmount: number, distance: number) {
  return fuelAmount / distance
}
