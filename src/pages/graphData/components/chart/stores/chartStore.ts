import { defineStore } from 'pinia'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { ref } from 'vue'
import { IChartData } from '../scripts/models'
import { ChartDataFactory } from '../scripts/models/ChartDataFactory'
import {
  updateDateFrom,
  updateDateUntil
} from 'src/scripts/libraries/utils/date'

export const useChartStore = defineStore('chartStore', () => {
  const vehicle = ref<Vehicle | null>(null)
  const refuels = ref<Refuel[]>([])
  const fromDate = ref<Date>(
    updateDateFrom(new Date(new Date().setDate(new Date().getDate() - 30)))
  )
  const untilDate = ref<Date>(updateDateUntil(new Date()))
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

  function getChartData(): IChartData {
    if (!vehicle.value) return { labels: [], data: [] }

    const chartData = ChartDataFactory.get(
      dataSource.value,
      groupBy.value,
      vehicle.value,
      refuels.value
    )
    if (chartData) return chartData
    return { labels: [], data: [] }
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
