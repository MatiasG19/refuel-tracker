import { db } from 'src/boot/dexie'
import { RefuelFilter } from 'src/pages/refuels/models'

async function readFilterById(id: number): Promise<RefuelFilter | undefined> {
  return await db.refuelFilters.filter(f => f.id === id).first()
}

async function setFilter(filter: RefuelFilter) {
  await db.refuelFilters.put(filter)
}

export default { readFilterById, setFilter }
