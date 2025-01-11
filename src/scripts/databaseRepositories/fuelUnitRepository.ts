import { getFuelUnits as returnfuelUnits } from 'src/scripts/staticData/fuelUnits'
import type { FuelUnit } from '../libraries/refuel/models'

async function getFuelUnits(): Promise<FuelUnit[]> {
  return await Promise.resolve(returnfuelUnits())
}

async function getFuelUnit(id: number): Promise<FuelUnit | null> {
  return await Promise.resolve(returnfuelUnits().find(u => u.id === id) ?? null)
}
export default { getFuelUnits, getFuelUnit }
