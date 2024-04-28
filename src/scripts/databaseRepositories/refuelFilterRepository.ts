import { db } from 'src/boot/dexie'
import { RefuelFilter } from 'src/pages/refuels/models'

async function readFilter(id: number): Promise<RefuelFilter | null> {
  return (await db.refuelFilters.filter(f => f.id === id).first()) ?? null
}

async function setFilter(filter: RefuelFilter) {
  await db.refuelFilters.put(filter)
}

export default { readFilter, setFilter }
