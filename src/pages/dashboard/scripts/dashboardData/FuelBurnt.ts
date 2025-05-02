import { vehicleFuelBurnt } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { LanguageCode } from 'src/scripts/models'

export class FuelBurnt extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: LanguageCode
  ) {
    super(vehicle, locale)
  }

  protected override setTitle(): string {
    return 'dashboardData.fuelBurnt'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelBurnt(vehicle).toFixedIfNotZero(1)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
