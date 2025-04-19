import { expect, test } from 'vitest'
import { Expense, Vehicle } from '../../models'
import { vehicleMoneySpentOnExpenses } from './moneySpentOnExpenses'

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
  expect(vehicleMoneySpentOnExpenses(vehicle)).toBe(100.0)
})

test('Sum up two expenses', () => {
  const vehicle = new Vehicle()
  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 100.0,
    description: 'Exhaust',
    date: new Date()
  })
  vehicle.expenses.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 150.0,
    description: 'Suspension',
    date: new Date()
  })
  expect(vehicleMoneySpentOnExpenses(vehicle)).toBe(250.0)
})
