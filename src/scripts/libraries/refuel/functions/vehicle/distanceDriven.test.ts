import { expect, test } from 'vitest'
import { vehicleDistanceDriven } from './distanceDriven'
import { Refuel, Vehicle } from '../../models'

test('Sum up single distance driven', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 100.01
  })
  expect(vehicleDistanceDriven(vehicle)).toBe(100.01)
})

test('Sum up two distances driven', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 100.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 150.0
  })
  expect(vehicleDistanceDriven(vehicle)).toBe(250.0)
})
