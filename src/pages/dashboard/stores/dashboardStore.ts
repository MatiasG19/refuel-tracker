import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DashboardDataFactory } from 'src/pages/dashboard/scripts/DashboardDataFactory'
import type {
  DashboardData,
  DashboardValueSettings
} from 'src/pages/dashboard/scripts/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import type { DropResult } from 'vue3-smooth-dnd'
import type { Period } from 'src/pages/dashboard/scripts/models'
import {
  dashboardSettingsRepository,
  periodRepository,
  refuelRepository
} from 'src/scripts/databaseRepositories'
import dashboardRepository from 'src/scripts/databaseRepositories/dashboardRepository'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const dashboardData = ref<DashboardData[]>([])
  const dashboardValueSettings = ref<DashboardValueSettings[]>([])

  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()

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

    if (!settingsStore.selectedVehicleId) return Promise.resolve()
    const vehicle = await vehicleStore.getVehicle(
      settingsStore.selectedVehicleId
    )

    if (vehicle) {
      vehicle.refuels = await refuelRepository.getRefuels(vehicle.id)
      if (vehicle.refuels.length) {
        const dashboard = dashboardData.value.find(
          d => d.vehicleId === vehicle.id
        )

        dashboard!.title = vehicle.name
        dashboard!.subtitle = vehicle.plateNumber
        dashboard!.dashboardValues = new DashboardDataFactory(vehicle).getAll(
          dashboardValueSettings.value
        )

        dashboardData.value = dashboardData.value.sort(
          (a, b) => a.sequence - b.sequence
        )
        return Promise.resolve()
      }
    }
  }

  async function getPeriods(): Promise<Period[]> {
    return await Promise.resolve(periodRepository.getPeriods())
  }

  function moveCard(dropResult: DropResult) {
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
    moveCard,
    saveDashboardOrder
  }
})
