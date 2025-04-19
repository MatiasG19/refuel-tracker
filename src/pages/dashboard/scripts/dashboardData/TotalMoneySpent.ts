import { vehicleTotalMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { WritableComputedRef } from 'vue'

export class TotalMoneySpent extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: WritableComputedRef<string, string>
  ) {
    super(vehicle, locale)
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
