import { db } from 'src/boot/dexie'
import type { DashboardData } from 'src/pages/dashboard/scripts/models'

async function getDashboardSettings() {
  return await db.graphSettings.toArray()
}

async function saveCardOrder(dashboardData: DashboardData[]) {
  await db.transaction('rw', [db.graphSettings], async () => {
    for (let j = 0; j < dashboardData.length; j++) {
      await db.graphSettings.update(dashboardData[j]!.id as number, {
        sequence: dashboardData[j]!.sequence
      })
    }
  })
}

export default { getDashboardSettings, saveCardOrder }
