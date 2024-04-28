import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { FuelUnit, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores'
import {
  vehicleRepository,
  fuelUnitRepository
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
    const vs = await vehicleRepository.getVehicles()
    for (const v of vs) {
      v.fuelUnit =
        (await fuelUnitRepository.getFuelUnit(v.fuelUnitId)) ?? undefined
    }
    return vs
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    const lv = vehicles.value.find(v => v.id === id)
    if (lv) return lv
    const vs = await getVehicles()
    const v = vs.find(v => v.id === id) ?? null
    if (!v) return null
    return v
  }

  async function addVehicle(vehicle: Vehicle) {
    vehicles.value.push(vehicle)
    await vehicleRepository.addVehicle(vehicle)

    // Update settings
    if (vehicles.value.length === 1)
      settingsStore.changeSelectedVehicle(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    if (!vehicle.fuelConsumption)
      vehicle.fuelConsumption = vehicleFuelConsumption({
        ...toRaw(vehicle)
      }).toFixed(2)
    const i = vehicles.value.findIndex(v => v.id === vehicle.id)
    vehicles.value[i] = toRaw(vehicle)
    await vehicleRepository.updateVehicle(toRaw(vehicle))
  }

  async function deleteVehicle(id: number) {
    vehicles.value = [...vehicles.value.filter(v => v.id !== id)]
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
