import { vehicleDistanceDriven } from '../../refuel/functions/vehicle'
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
    return vehicleDistanceDriven(vehicle).toFixedIfNotZero(1)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.distanceUnit ?? ''
  }
}
