import { vehicleFuelPricing } from '../../refuel/functions/vehicle'
import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelPricing extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Fuel pricing'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleFuelPricing(vehicle).toFixed(2).toString()
  }

  protected getUnit(vehicle: Vehicle): string {
    return `${vehicle.currencyUnit}/${vehicle.fuelUnit?.fuelUnit as string}`
  }
}
