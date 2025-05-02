import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { vehicleExpensesMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import messages from '../../i18n'
import { LanguageCode } from 'src/scripts/models'

export class ExpensesMade extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: LanguageCode
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
    return messages[this.locale]['dashboardData']['count']
  }
}
