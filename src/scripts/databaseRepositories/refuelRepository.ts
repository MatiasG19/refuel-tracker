import { db } from 'src/boot/dexie'
import { Refuel } from '../libraries/refuel/models'

async function getRefuel(id: number): Promise<Refuel | null> {
  return (await db.refuels.filter(r => r.id === id).first()) ?? null
}

async function getRefuels(vehicleId: number): Promise<Refuel[]> {
  return await db.refuels.where('vehicleId').equals(vehicleId).toArray()
}

async function getFilteredRefuels(
  vehicleId: number,
  from: Date,
  to: Date
): Promise<Refuel[]> {
  return await db.refuels
    .where('vehicleId')
    .equals(vehicleId)
    .filter(
      r =>
        r.date.getTime() >= from.getTime() && r.date.getTime() <= to.getTime()
    )
    .toArray()
}

async function addRefuel(refuel: Refuel): Promise<number> {
  return (await db.refuels.add(refuel)) as number
}

async function updateRefuel(refuel: Refuel) {
  await db.refuels.update(refuel.id, refuel)
}

async function deleteRefuel(id: number) {
  await db.refuels.delete(id)
}

export default {
  getRefuel,
  getRefuels,
  getFilteredRefuels,
  addRefuel,
  updateRefuel,
  deleteRefuel
}
