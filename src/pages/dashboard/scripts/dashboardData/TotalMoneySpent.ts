import { vehicleTotalMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'

export class TotalMoneySpent extends AbstractDashboardData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'dashboardData.totalMoneySpent'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleTotalMoneySpent(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
