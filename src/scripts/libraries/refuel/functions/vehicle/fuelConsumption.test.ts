import { expect, test } from 'vitest'
import { vehicleFuelConsumption } from './fuelConsumption'
import { Refuel, Vehicle } from '../../models'
import { FuelConsumptionFactory } from '../fuelConsumption/FuelConsumptionFactory'
import { litresPer100km } from '../fuelConsumption'

FuelConsumptionFactory.register('1', litresPer100km)

test('Calculate fuel consumption from single refuel', () => {
  const vehicle = new Vehicle()
  vehicle.fuelUnitId = 1
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 5.0,
    date: new Date(),
    distanceDriven: 100.0
  })
  expect(vehicleFuelConsumption(vehicle)).toBe(5.0)
})

test('Calculate fuel consumption from two refuels', () => {
  const vehicle = new Vehicle()
  vehicle.fuelUnitId = 1
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 5.0,
    date: new Date(),
    distanceDriven: 100.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 30.0,
    date: new Date(),
    distanceDriven: 400.0
  })

  expect(vehicleFuelConsumption(vehicle)).toBe(7)
})

test('Calculate specific fuel consumption', () => {
  const vehicle = new Vehicle()
  vehicle.fuelUnitId = 1
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 5.0,
    date: new Date(),
    distanceDriven: 100.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 30.0,
    date: new Date(),
    distanceDriven: 400.0
  })

  expect(vehicleFuelConsumption(vehicle, 2)).toBe(7.5)
})
