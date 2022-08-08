import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GraphData, Refuel, Vehicle } from 'src/scripts/models'
import { db } from '../boot/dexie'

export const useRefuelStore = defineStore('refuelStore', () => {
  const graphData = ref<GraphData[]>([])
  const refuels = ref<Refuel[]>([])
  const vehicles = ref<Vehicle[]>([])

  function readGraphData() {
    graphData.value = [
      {
        title: 'Fuel consumption',
        value: 5.1,
        unit: 'L/100km',
        sequence: 1,
        periodId: 0,
        visible: true
      },
      {
        title: 'Dinstance driven',
        value: 1900,
        unit: 'km',
        sequence: 2,
        periodId: 0,
        visible: true
      },
      {
        title: 'Money spent',
        value: 450,
        unit: '€',
        sequence: 3,
        periodId: 0,
        visible: true
      },
      {
        title: 'Fuel pricing',
        value: 7,
        unit: '€/100km',
        sequence: 4,
        periodId: 0,
        visible: true
      },
      {
        title: 'Fuel burnt',
        value: 350,
        unit: 'Litre',
        sequence: 5,
        periodId: 0,
        visible: true
      },
      {
        title: 'Refuels made',
        value: 20,
        unit: 'Refuels',
        sequence: 6,
        periodId: 0,
        visible: true
      }
    ]
  }

  async function readRefuels() {
    await db.refuels
      .toArray()
      .then(r =>
        r.length > 0 ? (refuels.value = r) : (refuels.value.length = 0)
      )
    //   refuels.value = [
    //     {
    //       id: 1,
    //       vehicleId: 1,
    //       date: new Date(Date.now()),
    //       refueledAmount: 46.3,
    //       payedAmount: 75.34,
    //       distanceDriven: 720.0
    //     },
    //     {
    //       id: 2,
    //       vehicleId: 1,
    //       date: new Date(Date.now()),
    //       refueledAmount: 46.3,
    //       payedAmount: 75.34,
    //       distanceDriven: 720.0
    //     },
    //     {
    //       id: 3,
    //       vehicleId: 1,
    //       date: new Date(Date.now()),
    //       refueledAmount: 46.3,
    //       payedAmount: 75.34,
    //       distanceDriven: 720.0
    //     }
    //   ]
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    await readRefuels()
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

  async function addVehicle(vehicle: Vehicle) {
    await db.vehicles.add(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    await db.vehicles.put(vehicle)
  }

  async function deleteVehicle(id: number) {
    await db.vehicles.delete(id)
  }

  return {
    graphData,
    refuels,
    vehicles,
    readGraphData,
    readRefuels,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel,
    readVehicles,
    getVehicle,
    addVehicle,
    updateVehicle,
    deleteVehicle
  }
})
