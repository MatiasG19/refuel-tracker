import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

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
