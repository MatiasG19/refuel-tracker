import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { refuelRepository } from 'src/scripts/databaseRepositories'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()
  const vehicle = ref<Vehicle>(new Vehicle())

  async function readData() {
    if (!settingsStore.selectedVehicleId) return
    const v = await vehicleStore.getVehicle(settingsStore.selectedVehicleId)
    if (v) vehicle.value = { ...toRaw(v) }
    if (
      vehicle.value.id !== settingsStore.selectedVehicleId ||
      !vehicle.value.refuels ||
      !vehicle.value.refuels.length
    )
      vehicle.value.refuels = await refuelRepository.getRefuels(
        settingsStore.selectedVehicleId
      )
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = vehicle.value.refuels?.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel) {
    refuel.id = await refuelRepository.addRefuel(toRaw(refuel))
    vehicle.value.refuels?.push(refuel)
    vehicle.value.totalFuelConsumption = ''
    vehicleStore.updateVehicle({ ...toRaw(vehicle.value) })
  }

  async function updateRefuel(refuel: Refuel) {
    const i = vehicle.value.refuels!.findIndex(r => r.id === refuel.id)
    vehicle.value.refuels![i] = toRaw(refuel)
    vehicle.value.totalFuelConsumption = ''
    vehicleStore.updateVehicle({ ...toRaw(vehicle.value) })
    await refuelRepository.updateRefuel(toRaw(refuel))
  }

  async function deleteRefuel(id: number) {
    vehicle.value.refuels = vehicle.value.refuels?.filter(r => r.id !== id)
    vehicle.value.totalFuelConsumption = ''
    vehicleStore.updateVehicle({ ...toRaw(vehicle.value) })
    await refuelRepository.deleteRefuel(id)
  }

  return {
    vehicle,
    readData,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel
  }
})
