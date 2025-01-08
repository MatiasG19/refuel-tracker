import { vehicleFuelPricing } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelPricing extends AbstractGraphData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override  setTitle(): string {
    return 'graphData.fuelPricing'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelPricing(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return `${vehicle.currencyUnit}/${vehicle.fuelUnit?.fuelUnit as string}`
  }
}
