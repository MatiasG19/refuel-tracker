import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../boot/dexie'
import { getFuelUnits as returnfuelUnits } from 'src/scripts/staticData/fuelUnits'
import { getPeriods as returnPeriods } from 'src/scripts/staticData/periods'
import {
  Refuel,
  Vehicle,
  VehicleData
} from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { useSettingsStore } from './settingsStore'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settings = useSettingsStore()

  const refuels = ref<Refuel[]>([])
  const vehicles = ref<Vehicle[]>([])

  async function readRefuels(vehicleId: number) {
    refuels.value = await getRefuels(vehicleId)
  }
  async function getRefuels(vehicleId: number) {
    return await db.refuels.where('vehicleId').equals(vehicleId).toArray()
  }

  async function getRefuel(id: number) {
    if (!settings.selectedVehicleId) return
    const refuels = await getRefuels(settings.selectedVehicleId)
    return refuels.find(v => v.id == id) ?? null
  }

  async function addRefuel(refuel: Refuel): Promise<number> {
    return (await db.refuels.add(refuel)) as number
  }

  async function updateRefuel(refuel: Refuel) {
    await db.refuels.put(refuel)
  }

  async function deleteRefuel(id: number) {
    await db.refuels.delete(id)
  }

  async function readVehicles() {
    vehicles.value = await getVehicles()
  }

  async function getVehicles() {
    const vehicles = await db.vehicles.toArray()
    for (const v of vehicles) {
      const refuels = await getRefuels(v.id)
      if (refuels.length > 0) {
        v.refuels = []
        refuels.forEach(r => v.refuels?.push(r))
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

  function getAllVehicleData() {
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
      settings.changeSelectedVehicle(vehicle)
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
          settings.changeSelectedVehicle(vehicles[0])
          return
        }
        settings.changeSelectedVehicle(null)
      }
    )
  }

  async function getPeriods() {
    return await Promise.resolve(returnPeriods())
  }

  async function getFuelUnits() {
    return await Promise.resolve(returnfuelUnits())
  }

  async function getFuelUnit(id: number) {
    return await Promise.resolve(returnfuelUnits().filter(u => u.id === id)[0])
  }

  return {
    refuels,
    vehicles,
    readRefuels,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel,
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
