import { db } from 'src/boot/dexie'
import type { DashboardValueSettings } from 'src/pages/dashboard/scripts/models'

async function getDashboardSettings() {
  return await db.graphSettings.toArray()
}

async function saveDashboardValueOrder(
  dashboardSettings: DashboardValueSettings[]
) {
  await db.transaction('rw', [db.graphSettings], async () => {
    for (let j = 0; j < dashboardSettings.length; j++) {
      await db.graphSettings.update(dashboardSettings[j]!.id as number, {
        sequence: dashboardSettings[j]!.sequence
      })
    }
  })
}

export default { getDashboardSettings, saveDashboardValueOrder }
