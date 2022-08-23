import { Vehicle } from '../models'
import { AbstractGraphData } from './AbstractGraphData'

export class FuelBurnt extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Fuel burnt'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return (
      vehicle.refuels
        ?.map(re => re.refueledAmount)
        .reduce((total, current) => +total + +current)
        .toString() ?? ''
    )
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
