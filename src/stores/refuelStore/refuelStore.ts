import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '../../boot/dexie'
import { GraphDataFactory } from 'src/pages/graphData/scripts/GraphDataFactory'
import { getFuelUnits as returnfuelUnits } from 'src/scripts/staticData/fuelUnits'
import { getPeriods as returnPeriods } from 'src/scripts/staticData/periods'
import { GraphData } from 'src/pages/graphData/scripts/models'
import {
  Refuel,
  Vehicle,
  VehicleData
} from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { useMoveGraphCardStore } from '../../pages/graphData/stores/moveGraphCardStore'
import { useSettingsStore } from './settingsStore'

export const useRefuelStore = defineStore('refuelStore', () => {
  const graphData = ref<GraphData[]>([])
  const refuels = ref<Refuel[]>([])
  const vehicles = ref<Vehicle[]>([])

  const moveGraphCard = useMoveGraphCardStore()
  const settings = useSettingsStore()

  const selectedDistanceUnitId = ref<number>(0)
  const selectedVehicleId = ref<number | null>(null)
  const selectedVehicleName = ref<string>('My car')
  const selectedVehiclePlateNumber = ref<string>('')
  const plateNumberInTitleActive = ref<boolean>(false)
  const refuelFilterActive = ref<boolean>(false)

  async function getGraphSettings() {
    return await db.graphSettings.toArray()
  }

  // async function changeGraphVisibility(state: boolean) {}

  async function readGraphData() {
    graphData.value.length = 0
    if (!selectedVehicleId.value) return

    const vehicle = await getVehicle(selectedVehicleId.value)
    if (vehicle && vehicle.refuels?.length) {
      graphData.value = new GraphDataFactory(vehicle)
        .getAll(await getGraphSettings())
        .sort((a, b) => a.sequence - b.sequence)
    }
  }

  async function readRefuels(vehicleId: number) {
    await db.refuels
      .where('vehicleId')
      .equals(vehicleId)
      .toArray()
      .then(r =>
        r.length > 0 ? (refuels.value = r) : (refuels.value.length = 0)
      )
  }

  async function getRefuel(id: number) {
    if (!selectedVehicleId.value) return
    await readRefuels(selectedVehicleId.value)
    return refuels.value.find(v => v.id == id) ?? null
  }

  async function addRefuel(refuel: Refuel) {
    await db.refuels.add(refuel)
  }

  async function updateRefuel(refuel: Refuel) {
    await db.refuels.put(refuel)
  }

  async function deleteRefuel(id: number) {
    await db.refuels.delete(id)
  }

  async function readVehicles() {
    vehicles.value = await db.vehicles.toArray()
    for (const v of vehicles.value) {
      await readRefuels(v.id)
      if (refuels.value.length > 0) {
        v.refuels = []
        refuels.value.forEach(r => v.refuels?.push(r))
        v.fuelUnit = await getFuelUnit(v.fuelUnitId)
      }
    }
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    await readVehicles()
    const v = vehicles.value.find(v => v.id == id) ?? null
    if (!v) return null
    return v
  }

  function getAllVehicleData() {
    const vehicleData = new Array<VehicleData>()
    vehicles.value.forEach(v =>
      vehicleData.push({
        ...v,
        fuelConsumption: (vehicleFuelConsumption(v) || '').toString()
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
    graphData,
    refuels,
    vehicles,
    moveGraphCard,
    settings,
    selectedDistanceUnitId,
    selectedVehicleId,
    selectedVehicleName,
    selectedVehiclePlateNumber,
    plateNumberInTitleActive,
    refuelFilterActive,
    getGraphSettings,
    // changeGraphVisibility,
    readGraphData,
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
