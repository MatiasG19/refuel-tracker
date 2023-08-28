import { expect, test } from 'vitest'
import { vehicleFuelBurnt } from './fuelBurnt'
import { Refuel, Vehicle } from '../../models'

test('Sum up single fuel', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 100.01,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleFuelBurnt(vehicle)).toBe(100.01)
})

test('Sum up two fuels', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 100.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 150.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleFuelBurnt(vehicle)).toBe(250.0)
})
