import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import type { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
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
  const vehicle = ref<Vehicle | null>(null)

  async function readData(vehicleId?: number) {
    let v: Vehicle | null = null
    if (vehicleId) v = await vehicleRepository.getVehicle(vehicleId)
    else {
      const vehicles = await vehicleRepository.getVehicles()
      if (vehicles.length > 0) v = vehicles[0] ?? null
    }
    if (!v) return
    vehicle.value = v
    vehicle.value.refuels = await refuelRepository.getRefuels(v.id)
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = vehicle.value!.refuels?.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel) {
    refuel.id = await refuelRepository.addRefuel(toRaw(refuel))
    vehicle.value!.refuels?.push(refuel)
    await refuelAddedEvent(vehicle.value!)
  }

  async function updateRefuel(refuel: Refuel) {
    const i = vehicle.value!.refuels!.findIndex(r => r.id === refuel.id)
    vehicle.value!.refuels![i] = toRaw(refuel)
    await refuelRepository.updateRefuel(toRaw(refuel))
    await refuelUpdatedEvent(vehicle.value!)
  }

  async function deleteRefuel(id: number) {
    if (vehicle.value!.refuels)
      vehicle.value!.refuels = vehicle.value!.refuels.filter(r => r.id !== id)
    await refuelRepository.deleteRefuel(id)
    await refuelDeletedEvent(vehicle.value!)
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
