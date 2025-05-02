import { vehicleRefuelsMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import t from '../../i18n'
import { LanguageCode } from 'src/scripts/models'

export class RefuelsMade extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: LanguageCode
  ) {
    super(vehicle, locale)
  }

  protected override setTitle(): string {
    return 'dashboardData.refuelsMade'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleRefuelsMade(vehicle).toString()
  }

  protected override getUnit(): string {
    return t[this.locale]['dashboardData']['count']
  }
}
