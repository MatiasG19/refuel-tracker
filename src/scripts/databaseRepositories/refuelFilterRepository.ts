import { db } from 'src/boot/dexie'
import type { RefuelFilter } from 'src/scripts/libraries/refuel/models'

async function readFilter(id: number): Promise<RefuelFilter | null> {
  return (await db.refuelFilters.filter(f => f.id === id).first()) ?? null
}

async function setFilter(filter: RefuelFilter) {
  await db.refuelFilters.update(filter.id ?? 0, filter)
}

async function removeDateFilter(id: number) {
  await db.refuelFilters.update(id, { active: false })
}

async function changeTypeFilter(id: number, type: number) {
  await db.refuelFilters.update(id, { type })
}

export default {
  readFilter,
  setFilter,
  removeDateFilter,
  changeTypeFilter
}
