import { defineStore } from 'pinia'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { ref } from 'vue'

export const useChartsStore = defineStore('chartsStore', () => {
  const vehicle = ref<Vehicle | null>(null)
  const refuels = ref<Refuel[]>([])

  async function readData(vehicleId: number, from: Date, to: Date) {
    const v = await vehicleRepository.getVehicle(vehicleId)
    if (v) vehicle.value = v
    refuels.value = await refuelRepository.getFilteredRefuels(
      vehicleId,
      from,
      to
    )
  }
  return {
    readData
  }
})
