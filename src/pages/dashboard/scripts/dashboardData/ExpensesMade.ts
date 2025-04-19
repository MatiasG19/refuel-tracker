import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { vehicleExpensesMade } from 'src/scripts/libraries/refuel/functions/vehicle'

export class ExpensesMade extends AbstractDashboardData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'dashboardData.expensesMade'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleExpensesMade(vehicle).toString()
  }

  protected override getUnit(): string {
    return ''
  }
}
