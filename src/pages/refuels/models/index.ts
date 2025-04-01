import { Expense, Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
//
export type VehicleViewModel = Omit<Vehicle, 'refuels | expenses'> & {
  allExpenses: ExpenseViewModel[]
}

export type ExpenseViewModel = {
  type: 'refuel' | 'expense'
  value: Refuel | Expense
}
