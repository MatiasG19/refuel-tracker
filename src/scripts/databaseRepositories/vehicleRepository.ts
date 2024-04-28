import { db } from 'src/boot/dexie'
import { Vehicle } from '../libraries/refuel/models'

async function getVehicle(id: number): Promise<Vehicle | null> {
  return (await db.vehicles.filter(v => v.id === id).first()) ?? null
}

async function getVehicles(): Promise<Vehicle[]> {
  return await db.vehicles.toArray()
}

async function addVehicle(vehicle: Vehicle): Promise<number> {
  return (await db.vehicles.add(vehicle)) as number
}

async function updateVehicle(vehicle: Vehicle) {
  await db.vehicles.put(vehicle)
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
  deleteVehicle
}
