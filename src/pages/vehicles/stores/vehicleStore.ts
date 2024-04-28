import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/dexie'
import { getFuelUnits as returnfuelUnits } from 'src/scripts/staticData/fuelUnits'
import { getPeriods as returnPeriods } from 'src/scripts/staticData/periods'
import {
  FuelUnit,
  Vehicle,
  VehicleData
} from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { Period } from 'src/pages/graphData/scripts/models'
import { useRefuelStore } from 'src/pages/refuels/stores/refuelStore'

export const useVehicleStore = defineStore('vehicleStore', () => {
  const settingsStore = useSettingsStore()
  const refuelStore = useRefuelStore()
  const vehicles = ref<Vehicle[]>([])

  async function readVehicles() {
    vehicles.value = await getVehicles()
  }

  async function getVehicles(): Promise<Vehicle[]> {
    const vehicles = await db.vehicles.toArray()
    for (const v of vehicles) {
      const refuels = await refuelStore.getRefuels(v.id)
      if (refuels.length > 0) {
        v.refuels = []
        refuelStore.refuels.forEach(r => v.refuels?.push(r))
        v.fuelUnit = await getFuelUnit(v.fuelUnitId)
      }
    }
    return vehicles
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    const vehicles = await getVehicles()
    const v = vehicles.find(v => v.id == id) ?? null
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
    await db.vehicles.add(vehicle)

    // Update settings
    if ((await db.vehicles.count()) === 1)
      settingsStore.changeSelectedVehicle(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    await db.vehicles.put(vehicle)
  }

  async function deleteVehicle(id: number) {
    await db.transaction(
      'rw',
      [db.vehicles, db.refuels, db.settings],
      async () => {
        const refuels = await db.refuels.where('vehicleId').equals(id).toArray()
        refuels.forEach(r => {
          ;(async () => {
            await db.refuels.delete(r.id)
          })()
        })
        await db.vehicles.delete(id)

        // Update settings
        if ((await db.vehicles.count()) > 0) {
          const vehicles = await db.vehicles.toArray()
          settingsStore.changeSelectedVehicle(vehicles[0])
          return
        }
        settingsStore.changeSelectedVehicle(null)
      }
    )
  }

  async function getPeriods(): Promise<Period[]> {
    return await Promise.resolve(returnPeriods())
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
    getPeriods,
    getFuelUnits,
    getFuelUnit
  }
})
