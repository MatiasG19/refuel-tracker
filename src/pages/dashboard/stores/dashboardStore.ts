import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DashboardDataFactory } from 'src/pages/dashboard/scripts/DashboardDataFactory'
import type {
  DashboardData,
  DashboardValueSettings
} from 'src/pages/dashboard/scripts/models'
import type { DropResult } from 'vue3-smooth-dnd'
import type { Period } from 'src/pages/dashboard/scripts/models'
import {
  dashboardSettingsRepository,
  periodRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import dashboardRepository from 'src/scripts/databaseRepositories/dashboardRepository'
import { useI18n } from 'vue-i18n'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const dashboardData = ref<DashboardData[]>([])
  const dashboardValueSettings = ref<DashboardValueSettings[]>([])
  const { locale } = useI18n()

  async function getDashboards() {
    return await dashboardRepository.getDashboards()
  }

  async function readDashboardSettings() {
    dashboardValueSettings.value =
      await dashboardSettingsRepository.getDashboardSettings()
  }

  async function readDashboardData() {
    await readDashboardSettings()

    dashboardData.value = []
    const dashboards = await getDashboards()
    dashboards.forEach(dashboard => {
      dashboardData.value.push({
        id: dashboard.id ?? 0,
        vehicleId: dashboard.vehicleId,
        sequence: dashboard.sequence,
        visible: dashboard.visible,
        title: '',
        subtitle: '',
        dashboardValues: []
      })
    })

    const vehicles = await vehicleRepository.getVehicles()
    if (vehicles.length > 0) {
      vehicles.forEach(async vehicle => {
        const dashboard = dashboardData.value.find(
          d => d.vehicleId === vehicle.id
        )
        if (!dashboard) return
        dashboard.title = vehicle.name
        dashboard.subtitle = vehicle.plateNumber
        if (vehicle.refuels && vehicle.refuels.length) {
          dashboard.dashboardValues = new DashboardDataFactory(
            vehicle,
            locale
          ).getAll(dashboardValueSettings.value)

          dashboardData.value = dashboardData.value.sort(
            (a, b) => a.sequence - b.sequence
          )
          return Promise.resolve()
        }
      })
    }
  }

  async function getPeriods(): Promise<Period[]> {
    return await Promise.resolve(periodRepository.getPeriods())
  }

  function createDashboard(vehicleId: number) {
    dashboardRepository.createDashboard(vehicleId)
  }

  function deleteDashboardByVehicleId(vehicleId: number) {
    dashboardRepository.deleteDashboardByVehicleId(vehicleId)
  }

  function toggleDashboardVisibility(id: number) {
    dashboardRepository.toggleDashboardVisibility(id)
  }

  function moveDashboard(dropResult: DropResult) {
    const { removedIndex, addedIndex } = dropResult
    if (
      removedIndex === null ||
      addedIndex === null ||
      removedIndex === addedIndex
    )
      return

    const movedDashboard = dashboardData.value.filter(
      g => g.sequence === removedIndex + 1
    )[0]

    // Move down
    let startIndex = removedIndex + 2,
      endIndex = addedIndex + 1,
      sign = -1
    // Move up
    if (addedIndex < removedIndex) {
      startIndex = addedIndex + 1
      endIndex = removedIndex
      sign = 1
    }

    const dashboardValues = dashboardData.value.filter(
      g => g.sequence >= startIndex && g.sequence <= endIndex
    )

    // Move up
    if (sign > 0) {
      for (let i = endIndex; i >= startIndex; i--) {
        const dashboard = dashboardValues.filter(g => g.sequence === i)[0]
        dashboard!.sequence += sign
      }
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        const dashboard = dashboardValues.filter(g => g.sequence === i)[0]
        dashboard!.sequence += sign
      }
    }
    movedDashboard!.sequence = addedIndex + 1
    dashboardData.value = dashboardData.value.sort(
      (a, b) => a.sequence - b.sequence
    )
  }

  function saveDashboardOrder() {
    ;(async () => {
      await dashboardRepository.saveDashboardOrder(dashboardData.value)
    })()
  }

  return {
    dashboardData,
    readDashboardData,
    getPeriods,
    createDashboard,
    deleteDashboardByVehicleId,
    toggleDashboardVisibility,
    moveDashboard,
    saveDashboardOrder
  }
})
