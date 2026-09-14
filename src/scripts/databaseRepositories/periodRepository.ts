import type { Period } from '@/pages/dashboard/scripts/models'
import { getPeriods as returnPeriods } from '@/scripts/staticData/periods'

async function getPeriods(): Promise<Period[]> {
  return await Promise.resolve(returnPeriods())
}

async function getPeriod(id: number): Promise<Period | null> {
  return await Promise.resolve(returnPeriods().find(u => u.id === id) ?? null)
}
export default { getPeriods, getPeriod }
