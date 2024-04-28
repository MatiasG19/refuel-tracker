import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/dexie'
import { getFuelUnits as returnfuelUnits } from 'src/scripts/staticData/fuelUnits'

import {
  FuelUnit,
  Vehicle,
  VehicleData
} from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { useSettingsStore } from 'src/pages/settings/stores'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'

export const useVehicleStore = defineStore('vehicleStore', () => {
  const settingsStore = useSettingsStore()
  const vehicles = ref<Vehicle[]>([])

  async function readVehicles() {
    vehicles.value = await getVehicles()
  }

  async function getVehicles(): Promise<Vehicle[]> {
    const vehicles = await db.vehicles.toArray()
    for (const v of vehicles) {
      const refuels = await refuelRepository.getRefuelsForVehicle(v.id)
      v.refuels = [...refuels]
      v.fuelUnit = await getFuelUnit(v.fuelUnitId)
    }
    return vehicles
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    const vehicles = await getVehicles()
    const v = vehicles.find(v => v.id === id) ?? null
    if (!v) return null
    return v
  }

  function getAllVehicleData(): VehicleData[] {
    const vehicleData = new Array<VehicleData>()
    vehicles.value.forEach(v =>
      vehicleData.push({
        ...v,
        fuelConsumption: (vehicleFuelConsumption(v).toFixed(2) || '').toString()
      })
    )
    return vehicleData
  }

  async function addVehicle(vehicle: Vehicle) {
    await vehicleRepository.addVehicle(vehicle)

    // Update settings
    if ((await db.vehicles.count()) === 1)
      settingsStore.changeSelectedVehicle(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    await vehicleRepository.updateVehicle(vehicle)
  }

  async function deleteVehicle(id: number) {
    await vehicleRepository.deleteVehicle(id)
    // Update settings
    const vehicles = await vehicleRepository.getVehicles()
    if (vehicles.length) {
      settingsStore.changeSelectedVehicle(null)
      return
    }
    settingsStore.changeSelectedVehicle(vehicles[0])
  }

  async function getFuelUnits(): Promise<FuelUnit[]> {
    return await Promise.resolve(returnfuelUnits())
  }

  async function getFuelUnit(id: number): Promise<FuelUnit> {
    return await Promise.resolve(returnfuelUnits().filter(u => u.id === id)[0])
  }

  return {
    vehicles,
    readVehicles,
    getVehicle,
    getAllVehicleData,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getFuelUnits,
    getFuelUnit
  }
})
