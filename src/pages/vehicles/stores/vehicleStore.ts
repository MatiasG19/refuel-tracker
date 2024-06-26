import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { FuelUnit, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import {
  vehicleRepository,
  fuelUnitRepository,
  refuelRepository
} from 'src/scripts/databaseRepositories'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'

export const useVehicleStore = defineStore('vehicleStore', () => {
  const settingsStore = useSettingsStore()
  const vehicles = ref<Vehicle[]>([])

  async function readVehicles() {
    vehicles.value = await getVehicles()
  }

  async function getVehicles(): Promise<Vehicle[]> {
    if (vehicles.value.length > 0) return vehicles.value
    return await vehicleRepository.getVehicles()
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    const vehicle = vehicles.value.find(v => v.id === id)
    if (vehicle) return vehicle
    return vehicleRepository.getVehicle(id)
  }

  async function addVehicle(vehicle: Vehicle) {
    vehicles.value.push(vehicle)
    await vehicleRepository.addVehicle(vehicle)
    settingsStore.changeSelectedVehicle(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    const v = { ...toRaw(vehicle) }
    if (!v.totalFuelConsumption) {
      v.refuels = await refuelRepository.getRefuels(v.id)
      v.totalFuelConsumption = vehicleFuelConsumption({
        ...toRaw(v)
      }).toFixed(2)
      v.refuels.length = 0
    }
    const i = vehicles.value.findIndex(v => v.id === v.id)
    vehicles.value[i] = v
    await vehicleRepository.updateVehicle(v)
  }

  async function deleteVehicle(id: number) {
    vehicles.value = vehicles.value.filter(v => v.id !== id)
    await vehicleRepository.deleteVehicle(id)
    // Update settings
    settingsStore.changeSelectedVehicle(
      vehicles.value.length ? vehicles.value[0] : null
    )
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
    updateVehicle,
    deleteVehicle,
    getFuelUnits,
    getFuelUnit
  }
})
