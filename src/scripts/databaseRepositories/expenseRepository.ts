import { db } from 'src/boot/dexie'
import type { Expense } from '../libraries/refuel/models'

async function getExpense(id: number): Promise<Expense | null> {
  return (await db.expenses.filter(r => r.id === id).first()) ?? null
}

async function getExpenses(vehicleId: number): Promise<Expense[]> {
  return await db.expenses.where('vehicleId').equals(vehicleId).toArray()
}

async function getFilteredExpenses(
  vehicleId: number,
  from: Date,
  to: Date
): Promise<Expense[]> {
  return await db.expenses
    .where('vehicleId')
    .equals(vehicleId)
    .filter(
      r =>
        r.date.getTime() >= from.getTime() && r.date.getTime() <= to.getTime()
    )
    .toArray()
}

async function addExpense(expense: Expense): Promise<number> {
  return (await db.expenses.add({
    date: expense.date,
    description: expense.description,
    payedAmount: expense.payedAmount,
    vehicleId: expense.vehicleId
  } as Expense)) as number
}

async function updateExpense(expense: Expense) {
  await db.expenses.update(expense.id, expense)
}

async function deleteExpense(id: number) {
  await db.expenses.delete(id)
}

export default {
  getExpense,
  getExpenses,
  getFilteredExpenses,
  addExpense,
  updateExpense,
  deleteExpense
}
