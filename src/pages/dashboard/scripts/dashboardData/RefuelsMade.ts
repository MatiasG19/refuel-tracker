import { vehicleRefuelsMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'

export class RefuelsMade extends AbstractDashboardData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'dashboardData.refuelsMade'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleRefuelsMade(vehicle).toString()
  }

  protected override getUnit(): string {
    return ''
  }
}
