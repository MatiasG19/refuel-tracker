import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DashboardDataFactory } from '@/pages/dashboard/scripts/DashboardDataFactory'
import type {
  DashboardData,
  DashboardValue,
  DashboardValueSettings
} from '@/pages/dashboard/scripts/models'
import type { DropResult } from 'vue3-smooth-dnd'
import type { Period } from '@/pages/dashboard/scripts/models'
import {
  dashboardSettingsRepository,
  periodRepository,
  vehicleRepository
} from '@/scripts/databaseRepositories'
import dashboardRepository from '@/scripts/databaseRepositories/dashboardRepository'
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
    const vehicles = await vehicleRepository.getVehicles()
    dashboards.forEach(dashboard => {
      const vehicle = vehicles.find(v => v.id === dashboard.vehicleId)
      if (!vehicle) return

      let dataValues: DashboardValue[] = []
      if (vehicle.refuels && vehicle.refuels.length) {
        dataValues = new DashboardDataFactory(vehicle, locale).getAll(
          dashboardValueSettings.value
        )
      }

      dashboardData.value.push({
        id: dashboard.id!,
        vehicleId: dashboard.vehicleId,
        sequence: dashboard.sequence,
        visible: dashboard.visible,
        title: vehicle.name,
        subtitle: vehicle.plateNumber,
        dashboardValues: dataValues
      })
    })

    dashboardData.value = dashboardData.value.sort(
      (a, b) => a.sequence - b.sequence
    )
  }

  async function getPeriods(): Promise<Period[]> {
    return await Promise.resolve(periodRepository.getPeriods())
  }

  async function createDashboard(vehicleId: number) {
    await dashboardRepository.createDashboard(vehicleId)
  }

  async function deleteDashboardByVehicleId(vehicleId: number) {
    await dashboardRepository.deleteDashboardByVehicleId(vehicleId)
  }

  async function toggleDashboardVisibility(id: number) {
    await dashboardRepository.toggleDashboardVisibility(id)
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
    void (async () => {
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
