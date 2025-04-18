import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { FuelUnit, Vehicle } from 'src/scripts/libraries/refuel/models'
import {
  vehicleRepository,
  fuelUnitRepository,
  refuelRepository
} from 'src/scripts/databaseRepositories'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import {
  vehicleAddedEvent,
  vehicleDeletedEvent,
  vehicleUpdatedEvent
} from 'src/scripts/events'

export const useVehicleStore = defineStore('vehicleStore', () => {
  const vehicles = ref<Vehicle[]>([])

  async function readVehicles() {
    vehicles.value = await getVehicles()
  }

  async function getVehicles(): Promise<Vehicle[]> {
    return await vehicleRepository.getVehicles()
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    return await vehicleRepository.getVehicle(id)
  }

  async function addVehicle(vehicle: Vehicle) {
    vehicle.id = await vehicleRepository.addVehicle(vehicle)
    await vehicleAddedEvent(vehicle)
  }

  async function updateTotalFuelConsumption(id: number) {
    const vehicle = await getVehicle(id)
    if (!vehicle) return
    vehicle.refuels = await refuelRepository.getRefuels(id)
    vehicle.totalFuelConsumption = vehicleFuelConsumption({
      ...toRaw(vehicle)
    }).toFixed(2)
    await vehicleRepository.updateTotalFuelConsumption(
      id,
      vehicle.totalFuelConsumption
    )
  }

  async function updateVehicle(vehicle: Vehicle) {
    await vehicleRepository.updateVehicle({ ...toRaw(vehicle) })
    await vehicleUpdatedEvent()
  }

  async function deleteVehicle(id: number) {
    vehicles.value = vehicles.value.filter(v => v.id !== id)
    await vehicleRepository.deleteVehicle(id)
    await vehicleDeletedEvent(id)
  }

  async function getFuelUnits(): Promise<FuelUnit[]> {
    return await fuelUnitRepository.getFuelUnits()
  }

  async function getFuelUnit(id: number): Promise<FuelUnit | null> {
    return await fuelUnitRepository.getFuelUnit(id)
  }

  return {
    vehicles,
    readVehicles,
    getVehicle,
    addVehicle,
    updateTotalFuelConsumption,
    updateVehicle,
    deleteVehicle,
    getFuelUnits,
    getFuelUnit
  }
})
