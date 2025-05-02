import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { LanguageCode } from 'src/scripts/models'

export class FuelConsumption extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: LanguageCode
  ) {
    super(vehicle, locale)
  }

  protected override setTitle(): string {
    return 'dashboardData.fuelConsumption'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelConsumption(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
