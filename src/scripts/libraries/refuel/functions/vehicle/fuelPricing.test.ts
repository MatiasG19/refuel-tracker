import { expect, test } from 'vitest'
import { vehicleFuelPricing } from './fuelPricing'
import { Refuel, Vehicle } from '../../models'

test('Calculate one price', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 150.0,
    refueledAmount: 100.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleFuelPricing(vehicle)).toBe(1.5)
})

test('Calculate two prices', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 150.0,
    refueledAmount: 100.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 100.0,
    refueledAmount: 25.0,
    date: new Date(),
    distanceDriven: 0.0
  })

  expect(vehicleFuelPricing(vehicle)).toBe(2)
})
