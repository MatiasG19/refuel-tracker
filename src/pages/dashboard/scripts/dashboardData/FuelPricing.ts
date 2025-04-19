import { vehicleFuelPricing } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractDashboardData } from '../abstract/AbstractDashboardData'
import { WritableComputedRef } from 'vue'

export class FuelPricing extends AbstractDashboardData {
  constructor(
    protected override vehicle: Vehicle,
    protected override locale: WritableComputedRef<string, string>
  ) {
    super(vehicle, locale)
  }

  protected override setTitle(): string {
    return 'dashboardData.fuelPricing'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelPricing(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return `${vehicle.currencyUnit}/${vehicle.fuelUnit?.fuelUnit as string}`
  }
}
