import { expect, test } from 'vitest'
import { Refuel, Vehicle } from '../../models'
import { vehicleMoneySpentOnRefuels } from './moneySpentOnRefuels'

test('Sum up single expense', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 100.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleMoneySpentOnRefuels(vehicle)).toBe(100.0)
})

test('Sum up two expenses', () => {
  const vehicle = new Vehicle()
  vehicle.refuels = new Array<Refuel>()
  vehicle.refuels.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 100.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  vehicle.refuels.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 150.0,
    refueledAmount: 0.0,
    date: new Date(),
    distanceDriven: 0.0
  })
  expect(vehicleMoneySpentOnRefuels(vehicle)).toBe(250.0)
})
