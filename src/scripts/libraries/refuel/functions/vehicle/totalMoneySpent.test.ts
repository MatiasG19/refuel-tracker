import { expect, test } from 'vitest'
import { vehicleTotalMoneySpent } from './totalMoneySpent'
import { Expense, Refuel, Vehicle } from '../../models'

test('Sum up single refuel', () => {
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
  expect(vehicleTotalMoneySpent(vehicle)).toBe(100.0)
})

test('Sum up single expense', () => {
  const vehicle = new Vehicle()
  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 100.0,
    description: 'Exhaust',
    date: new Date()
  })
  expect(vehicleTotalMoneySpent(vehicle)).toBe(100.0)
})

test('Sum up two refuel and expense', () => {
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
  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 150.0,
    description: 'Suspension',
    date: new Date()
  })
  expect(vehicleTotalMoneySpent(vehicle)).toBe(250.0)
})

test('Sum up two expenses and two refuels', () => {
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

  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 102.0,
    description: 'Exhaust',
    date: new Date()
  })
  vehicle.expenses.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 151.0,
    description: 'Suspension',
    date: new Date()
  })
  expect(vehicleTotalMoneySpent(vehicle)).toBe(503.0)
})
