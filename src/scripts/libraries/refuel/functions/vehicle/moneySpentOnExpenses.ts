import { Vehicle } from '../../models'

export function vehicleMoneySpentOnExpenses(vehicle: Vehicle): number {
  if (!vehicle.expenses || vehicle.expenses.length === 0) return 0

  return vehicle.expenses
    .map(re => re.payedAmount)
    .reduce((total, current) => total + current)
}
