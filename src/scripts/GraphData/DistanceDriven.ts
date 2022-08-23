import { Vehicle } from '../models'
import { AbstractGraphData } from './AbstractGraphData'

export class DistanceDriven extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Distance driven'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return (
      vehicle.refuels
        ?.map(re => re.distanceDriven)
        .reduce((total, current) => +total + +current)
        .toString() ?? ''
    )
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.distanceUnit ?? ''
  }
}
