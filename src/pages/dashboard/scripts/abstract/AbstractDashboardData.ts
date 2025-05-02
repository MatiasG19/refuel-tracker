import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { DashboardValue } from '../models'
import { LanguageCode } from 'src/scripts/models'

export class AbstractDashboardData extends DashboardValue {
  constructor(
    protected vehicle: Vehicle,
    protected locale: LanguageCode
  ) {
    super()
    this.title = this.setTitle()
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  protected setTitle() {
    return ''
  }

  // eslint-disable-next-line
  protected calculateValue(vehicle: Vehicle): string {
    return ''
  }

  // eslint-disable-next-line
  protected getUnit(vehicle: Vehicle): string {
    return ''
  }
}
