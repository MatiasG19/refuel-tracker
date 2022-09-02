import { fuelConsumptionFunc } from '.'

export class FuelConsumptionFactory {
  public static fuelConsumptionFunctions = new Map<
    string,
    fuelConsumptionFunc
  >()

  public static register(uid: string, func: fuelConsumptionFunc) {
    FuelConsumptionFactory.fuelConsumptionFunctions.set(uid, func)
  }

  public static get(uid: string): fuelConsumptionFunc | null {
    const func = FuelConsumptionFactory.fuelConsumptionFunctions.get(uid)
    if (func) return func
    return null
  }
}
