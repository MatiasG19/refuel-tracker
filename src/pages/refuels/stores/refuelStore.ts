import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import {
  refuelRepository
  // vehicleRepository
} from 'src/scripts/databaseRepositories'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()
  const refuels = ref<Refuel[]>([])
  const vehicle = ref<Vehicle>(new Vehicle())

  async function readData() {
    if (!settingsStore.selectedVehicleId) return
    if (
      vehicle.value.id !== settingsStore.selectedVehicleId ||
      !refuels.value.length
    )
      refuels.value = await refuelRepository.getRefuels(
        settingsStore.selectedVehicleId
      )
    vehicle.value =
      (await vehicleStore.getVehicle(settingsStore.selectedVehicleId)) ??
      vehicle.value
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = refuels.value.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel): Promise<number> {
    updateVehicleFuelConsumption()
    return await refuelRepository.addRefuel(refuel)
  }

  async function updateRefuel(refuel: Refuel) {
    updateVehicleFuelConsumption()
    await refuelRepository.updateRefuel(refuel)
  }

  async function deleteRefuel(id: number) {
    updateVehicleFuelConsumption()
    await refuelRepository.deleteRefuel(id)
  }

  async function updateVehicleFuelConsumption() {
    const v = vehicleStore.vehicles.find(v => v.id === vehicle.value.id)
    if (!v) return
    v.refuels = refuels.value
    v.fuelConsumption = vehicleFuelConsumption(v).toFixed(2)
    v.refuels.length = 0
    vehicleStore.updateVehicle(toRaw(v))
    await Promise.resolve()
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
