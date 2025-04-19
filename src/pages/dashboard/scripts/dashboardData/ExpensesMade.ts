import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { vehicleExpensesMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import { WritableComputedRef } from 'vue'
import messages from '../../i18n'

export class ExpensesMade extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: WritableComputedRef<string, string>
  ) {
    super(vehicle, locale)
  }

  protected override setTitle(): string {
    return 'dashboardData.expensesMade'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleExpensesMade(vehicle).toString()
  }

  protected override getUnit(): string {
    // @ts-expect-error i18n not usable here
    return messages[this.locale.value]['dashboardData']['count']
  }
}
