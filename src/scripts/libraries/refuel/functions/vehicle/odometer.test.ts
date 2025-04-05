import { expect, test } from 'vitest'
import { Refuel, Vehicle } from '../../models'
import { vehicleOdometer } from './odometer'

test('Sum up odometer', () => {
  const vehicle = new Vehicle()
  vehicle.odometer = 40000.0
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 100.01
  })
  expect(vehicleOdometer(vehicle)).toBe(40100.01)
})

test('Sum up odometer with on refuels', () => {
  const vehicle = new Vehicle()
  vehicle.odometer = 4000.1
  vehicle.refuels = new Array<Refuel>()
  expect(vehicleOdometer(vehicle)).toBe(4000.1)
})
