import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { refuelRepository } from 'src/scripts/databaseRepositories'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()
  const refuels = ref<Refuel[]>([])
  const vehicle = ref<Vehicle>(new Vehicle())

  async function readData() {
    if (!settingsStore.selectedVehicleId) return
    vehicle.value =
      (await vehicleStore.getVehicle(settingsStore.selectedVehicleId)) ??
      vehicle.value
    refuels.value = await refuelRepository.getRefuels(vehicle.value.id)
    await Promise.resolve()
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = refuels.value.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel): Promise<number> {
    return await refuelRepository.addRefuel(refuel)
  }

  async function updateRefuel(refuel: Refuel) {
    await refuelRepository.updateRefuel(refuel)
  }

  async function deleteRefuel(id: number) {
    await refuelRepository.deleteRefuel(id)
  }

  return {
    refuels,
    vehicle,
    readData,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel
  }
})
