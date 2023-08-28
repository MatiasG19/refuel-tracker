import { expect, test } from 'vitest'
import { vehicleRefuelsMade } from './refuelsMade'
import { Refuel, Vehicle } from '../../models'

test('Sum up single refuel', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleRefuelsMade(vehicle)).toBe(1)
})

test('Sum up two refuels', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleRefuelsMade(vehicle)).toBe(2)
})
