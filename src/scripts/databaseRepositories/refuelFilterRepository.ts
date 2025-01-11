import { db } from 'src/boot/dexie'
import type { RefuelFilter } from 'src/pages/refuels/models'

async function readFilter(id: number): Promise<RefuelFilter | null> {
  return (await db.refuelFilters.filter(f => f.id === id).first()) ?? null
}

async function setFilter(filter: RefuelFilter) {
  await db.refuelFilters.update(filter.id ?? 0, filter)
}

async function removeFilter(id: number) {
  await db.refuelFilters.update(id, { active: false })
}

export default { readFilter, setFilter, removeFilter }
