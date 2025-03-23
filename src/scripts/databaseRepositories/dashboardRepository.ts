import { db } from 'src/boot/dexie'
import type { Dashboard } from 'src/pages/dashboard/scripts/models'

async function getDashboards() {
  return await db.dashboards.toArray()
}

async function createDashboard(vehicleId: number) {
  const vehicles = await db.dashboards.reverse().sortBy('sequence')
  if (vehicles.length == 0) return

  return await db.dashboards.add({
    vehicleId: vehicleId,
    sequence: vehicles[0]!.sequence + 1,
    visible: true
  })
}

async function deleteDashboardByVehicleId(vehicleId: number) {
  db.dashboards.where('vehicleId').equals(vehicleId).delete()
}

async function toggleDashboardVisibility(id: number) {
  return await db.dashboards.update(id, {
    visible: !(await db.dashboards.get(id))?.visible
  })
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

export default {
  getDashboards,
  createDashboard,
  deleteDashboardByVehicleId,
  toggleDashboardVisibility,
  saveDashboardOrder
}
