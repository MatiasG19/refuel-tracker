import { Vehicle } from '../../models'

export function vehicleTotalMoneySpent(vehicle: Vehicle): number {
  let refuelTotal = 0,
    expenseTotal = 0

  if (vehicle.refuels && vehicle.refuels.length > 0)
    refuelTotal = vehicle.refuels
      .map(re => re.payedAmount)
      .reduce((total, current) => total + current)

  if (vehicle.expenses && vehicle.expenses.length > 0)
    expenseTotal = vehicle.expenses
      .map(re => re.payedAmount)
      .reduce((total, current) => total + current)

  return refuelTotal + expenseTotal
}
