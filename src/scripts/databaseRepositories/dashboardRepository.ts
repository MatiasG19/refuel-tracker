import { db } from 'src/boot/dexie'
import type { Dashboard } from 'src/pages/dashboard/scripts/models'

async function getDashboards() {
  return await db.dashboards.toArray()
}

async function saveDashboardOrder(dashboards: Dashboard[]) {
  await db.transaction('rw', [db.dashboards], async () => {
    for (let j = 0; j < dashboards.length; j++) {
      await db.dashboards.update(dashboards[j]!.id as number, {
        sequence: dashboards[j]!.sequence
      })
    }
  })
}

export default { getDashboards, saveDashboardOrder }
