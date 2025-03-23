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
    else if (vehicle.value) v = vehicle.value
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
    await refuelAddedEvent(refuel.vehicleId)
  }

  async function updateRefuel(refuel: Refuel) {
    await refuelRepository.updateRefuel(toRaw(refuel))
    await refuelUpdatedEvent(refuel.vehicleId)
  }

  async function deleteRefuel(id: number) {
    const refuel = await refuelRepository.getRefuel(id)
    await refuelRepository.deleteRefuel(id)
    if (refuel) await refuelDeletedEvent(refuel.vehicleId)
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
