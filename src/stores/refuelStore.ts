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

  function readVehicles() {
    vehicles.value = [
      {
        id: 1,
        name: 'Seat1',
        plateNumber: 'HL:MG1908',
        currencyUnit: '',
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
        currencyUnit: '',
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
        currencyUnit: '',
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

  return {
    graphData,
    refuels,
    vehicles,
    readGraphData,
    readRefuels,
    readVehicles
  }
})
