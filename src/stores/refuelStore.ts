import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GraphData, Refuel, Vehicle } from 'src/scripts/models'

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

  function readRefuels() {
    refuels.value = [
      {
        id: 0,
        vehicleId: 0,
        date: new Date(),
        refuelAmount: 46.3,
        payedAmount: 75.34,
        distanceDriven: 720.0
      },
      {
        id: 1,
        vehicleId: 0,
        date: new Date(),
        refuelAmount: 46.3,
        payedAmount: 75.34,
        distanceDriven: 720.0
      },
      {
        id: 2,
        vehicleId: 0,
        date: new Date(),
        refuelAmount: 46.3,
        payedAmount: 75.34,
        distanceDriven: 720.0
      }
    ]
  }

  function getRefuel(id: number): Refuel | null {
    return refuels.value.find(v => v.id == id) ?? null
  }

  function addRefuel(refuel: Refuel) {
    refuels.value.push(refuel)
  }

  function updateRefuel(refuel: Refuel) {
    deleteRefuel(refuel.id)
    addRefuel(refuel)
  }

  function deleteRefuel(id: number) {
    refuels.value = refuels.value.filter(refuel => refuel.id != id)
  }

  function readVehicles() {
    vehicles.value = [
      {
        id: 1,
        name: 'Seat',
        plateNumber: 'HL:MG1908',
        currencyUnit: '€',
        fuelUnitId: 0,
        fuelUnit: {
          id: 1,
          fuelConsumptionUnit: 'L/100km',
          distanceUnit: '',
          fuelUnit: ''
        }
      },
      {
        id: 2,
        name: 'Seat',
        plateNumber: 'HL:MG1908',
        currencyUnit: '$',
        fuelUnitId: 0,
        fuelUnit: {
          id: 1,
          fuelConsumptionUnit: 'L/100km',
          distanceUnit: '',
          fuelUnit: ''
        }
      },
      {
        id: 3,
        name: 'Seat',
        plateNumber: 'HL:MG1908',
        currencyUnit: '€',
        fuelUnitId: 0,
        fuelUnit: {
          id: 1,
          fuelConsumptionUnit: 'L/100km',
          distanceUnit: '',
          fuelUnit: ''
        }
      }
    ]
  }

  function getVehicle(id: number): Vehicle | null {
    return vehicles.value.find(v => v.id == id) ?? null
  }

  function addVehicle(vehicle: Vehicle) {
    vehicles.value.push(vehicle)
  }

  function updateVehicle(vehicle: Vehicle) {
    deleteVehicle(vehicle.id)
    addVehicle(vehicle)
  }

  function deleteVehicle(id: number) {
    vehicles.value = vehicles.value.filter(vehicle => vehicle.id != id)
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
