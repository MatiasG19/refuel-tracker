import { vehicleMoneySpentOnExpenses } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'

export class MoneySpentOnExpenses extends AbstractDashboardData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'dashboardData.moneySpentOnExpenses'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleMoneySpentOnExpenses(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
