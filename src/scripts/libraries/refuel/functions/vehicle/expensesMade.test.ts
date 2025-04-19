import { expect, test } from 'vitest'
import { vehicleExpensesMade } from './expensesMade'
import { Expense, Vehicle } from '../../models'

test('Sum up single expense', () => {
  const vehicle = new Vehicle()
  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    description: 'Exhaust',
    date: new Date()
  })
  expect(vehicleExpensesMade(vehicle)).toBe(1)
})

test('Sum up two expenses', () => {
  const vehicle = new Vehicle()
  vehicle.expenses = new Array<Expense>()
  vehicle.expenses.push({
    id: 1,
    vehicleId: 1,
    payedAmount: 0.0,
    description: 'Exhaust',
    date: new Date()
  })
  vehicle.expenses.push({
    id: 2,
    vehicleId: 1,
    payedAmount: 0.0,
    description: 'Suspension',
    date: new Date()
  })
  expect(vehicleExpensesMade(vehicle)).toBe(2)
})
