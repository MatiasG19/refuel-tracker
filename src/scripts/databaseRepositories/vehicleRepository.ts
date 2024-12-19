import { db } from 'src/boot/dexie'
import { Vehicle } from '../libraries/refuel/models'
import fuelUnitRepository from './fuelUnitRepository'

async function getVehicle(id: number): Promise<Vehicle | null> {
  const vehicle = await db.vehicles.filter(v => v.id === id).first()
  if (!vehicle) return null
  vehicle.fuelUnit =
    (await fuelUnitRepository.getFuelUnit(vehicle.fuelUnitId)) ?? undefined
  return vehicle
}

async function getVehicles(): Promise<Vehicle[]> {
  const vehicles = await db.vehicles.toArray()
  for (const v of vehicles) {
    v.fuelUnit =
      (await fuelUnitRepository.getFuelUnit(v.fuelUnitId)) ?? undefined
  }
  return vehicles
}

async function addVehicle(vehicle: Vehicle): Promise<number> {
  return (await db.vehicles.add({
    name: vehicle.name,
    plateNumber: vehicle.plateNumber,
    currencyUnit: vehicle.currencyUnit,
    fuelUnitId: vehicle.fuelUnitId
  } as Vehicle)) as number
}

async function updateVehicle(vehicle: Vehicle) {
  await db.vehicles.update(vehicle.id, vehicle)
}

async function updateTotalFuelConsumption(
  id: number,
  totalFuelConsumption: string
) {
  await db.vehicles.update(id, { totalFuelConsumption })
}

async function deleteVehicle(id: number) {
  await db.transaction(
    'rw',
    [db.vehicles, db.refuels, db.settings],
    async () => {
      const refuels = await db.refuels.where('vehicleId').equals(id).toArray()
      refuels.forEach(r => {
        ;(async () => {
          await db.refuels.delete(r.id)
        })()
      })
      await db.vehicles.delete(id)
    }
  )
}

export default {
  getVehicle,
  getVehicles,
  addVehicle,
  updateVehicle,
  updateTotalFuelConsumption,
  deleteVehicle
}
