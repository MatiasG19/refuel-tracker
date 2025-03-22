import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DashboardDataFactory } from 'src/pages/dashboard/scripts/DashboardDataFactory'
import type { DashboardData } from 'src/pages/dashboard/scripts/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import type { DropResult } from 'vue3-smooth-dnd'
import type { Period } from 'src/pages/dashboard/scripts/models'
import {
  dashboardSettingsRepository,
  periodRepository,
  refuelRepository
} from 'src/scripts/databaseRepositories'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const dashboardData = ref<DashboardData[]>([])

  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()

  async function getDashboardSettings() {
    return await dashboardSettingsRepository.getDashboardSettings()
  }

  async function readDashboardData() {
    if (!settingsStore.selectedVehicleId || dashboardData.value.length > 0)
      return Promise.resolve()

    const vehicle = await vehicleStore.getVehicle(
      settingsStore.selectedVehicleId
    )
    if (vehicle) {
      vehicle.refuels = await refuelRepository.getRefuels(vehicle.id)
      if (vehicle.refuels.length) {
        dashboardData.value = new DashboardDataFactory(vehicle).getAll(
          await getDashboardSettings()
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

  function saveCardOrder() {
    ;(async () => {
      await dashboardSettingsRepository.saveCardOrder(dashboardData.value)
    })()
  }

  return {
    dashboardData,
    getDashboardSettings,
    readDashboardData,
    getPeriods,
    moveCard,
    saveCardOrder
  }
})
