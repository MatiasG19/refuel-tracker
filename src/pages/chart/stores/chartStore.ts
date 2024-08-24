import { defineStore } from 'pinia'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { ref } from 'vue'
import { DataSource, Group } from '../models/models'

export const useChartStore = defineStore('chartStore', () => {
  const vehicle = ref<Vehicle | null>(null)
  const refuels = ref<Refuel[]>([])
  const fromDate = ref<Date>(new Date())
  const untilDate = ref<Date>(new Date())
  const groupBy = ref(0)
  const dataSource = ref(0)

  async function readData(vehicleId: number) {
    const v = await vehicleRepository.getVehicle(vehicleId)
    if (v) vehicle.value = v
    refuels.value = await refuelRepository.getFilteredRefuels(
      vehicleId,
      fromDate.value,
      untilDate.value
    )
  }

  function getChartData(dataSource: DataSource, groupBy: Group) {
    return []
  }

  return {
    vehicle,
    refuels,
    fromDate,
    untilDate,
    groupBy,
    dataSource,
    readData,
    getChartData
  }
})
