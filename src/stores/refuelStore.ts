import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GraphData, Refuel, Vehicle } from 'src/scripts/models'
import { db } from '../boot/dexie'
import { useMainStore } from 'src/stores'

const mainStore = useMainStore()

export const useRefuelStore = defineStore('refuelStore', () => {
  const graphData = ref<GraphData[]>([])
  const refuels = ref<Refuel[]>([])
  const vehicles = ref<Vehicle[]>([])

  function readGraphSettings() {
    graphData.value = [
      {
        uid: '1',
        title: 'Fuel consumption',
        value: 5.1,
        unit: 'L/100km',
        sequence: 1,
        periodId: 0,
        visible: true
      },
      {
        uid: '2',
        title: 'Dinstance driven',
        value: 1900,
        unit: 'km',
        sequence: 2,
        periodId: 0,
        visible: true
      },
      {
        uid: '3',
        title: 'Money spent',
        value: 450,
        unit: '€',
        sequence: 3,
        periodId: 0,
        visible: true
      },
      {
        uid: '4',
        title: 'Fuel pricing',
        value: 7,
        unit: '€/100km',
        sequence: 4,
        periodId: 0,
        visible: true
      },
      {
        uid: '5',
        title: 'Fuel burnt',
        value: 350,
        unit: 'Litre',
        sequence: 5,
        periodId: 0,
        visible: true
      },
      {
        uid: '6',
        title: 'Refuels made',
        value: 20,
        unit: 'Refuels',
        sequence: 6,
        periodId: 0,
        visible: true
      }
    ]
  }
  async function getGraphSettings() {
    return await db.graphSettings.toArray()
  }

  // async function moveGraphTop() {}

  // async function moveGraphUp() {}

  // async function moveGraphDown() {}

  // async function moveGraphBottom() {}

  // async function changeGraphVisibility(state: boolean) {}

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
    if (!mainStore.selectedVehicleId) return
    await readRefuels(mainStore.selectedVehicleId)
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
    await db.vehicles
      .toArray()
      .then(v =>
        v.length > 0 ? (vehicles.value = v) : (vehicles.value.length = 0)
      )
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    await readVehicles()
    return vehicles.value.find(v => v.id == id) ?? null
  }

  async function getAllVehicleData(id: number): Promise<Vehicle | null> {
    const v = await getVehicle(id)
    if (!v) return null
    await readRefuels(v.id)
    v.refuels = []
    refuels.value.forEach(r => v.refuels?.push(r))
    v.fuelUnit = await getFuelUnit(v.fuelUnitId)
    return v
  }

  async function addVehicle(vehicle: Vehicle) {
    await db.vehicles.add(vehicle)

    // Update settings
    if ((await db.vehicles.count()) === 1)
      mainStore.changeSelectedVehicle(vehicle)
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
          mainStore.changeSelectedVehicle(vehicles[0])
          return
        }
        mainStore.changeSelectedVehicle(null)
      }
    )
  }

  async function getPeriods() {
    return await db.periods.toArray()
  }

  async function getFuelUnits() {
    return await db.fuelUnits.toArray()
  }

  async function getFuelUnit(id: number) {
    return (await db.fuelUnits.where('id').equals(id).toArray())[0]
  }

  return {
    graphData,
    refuels,
    vehicles,
    readGraphSettings,
    getGraphSettings,
    // moveGraphTop,
    // moveGraphUp,
    // moveGraphDown,
    // moveGraphBottom,
    // changeGraphVisibility,
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
