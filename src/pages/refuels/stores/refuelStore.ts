import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import {
  refuelAddedEvent,
  refuelDeletedEvent,
  refuelUpdatedEvent
} from 'src/scripts/events'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settingsStore = useSettingsStore()
  const vehicle = ref<Vehicle>(new Vehicle())

  async function readData() {
    if (!settingsStore.selectedVehicleId) return
    const v = await vehicleRepository.getVehicle(
      settingsStore.selectedVehicleId
    )
    const refuels = vehicle.value.refuels
    if (v) vehicle.value = { ...toRaw(v) }
    if (
      vehicle.value.id !== settingsStore.selectedVehicleId ||
      !refuels ||
      !refuels.length
    )
      vehicle.value.refuels = await refuelRepository.getRefuels(
        settingsStore.selectedVehicleId
      )
    else vehicle.value.refuels = refuels
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = vehicle.value.refuels?.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel) {
    refuel.id = await refuelRepository.addRefuel(toRaw(refuel))
    vehicle.value.refuels?.push(refuel)
    await refuelAddedEvent()
  }

  async function updateRefuel(refuel: Refuel) {
    const i = vehicle.value.refuels!.findIndex(r => r.id === refuel.id)
    vehicle.value.refuels![i] = toRaw(refuel)
    await refuelRepository.updateRefuel(toRaw(refuel))
    await refuelUpdatedEvent()
  }

  async function deleteRefuel(id: number) {
    vehicle.value.refuels = vehicle.value.refuels?.filter(r => r.id !== id)
    await refuelRepository.deleteRefuel(id)
    await refuelDeletedEvent()
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
