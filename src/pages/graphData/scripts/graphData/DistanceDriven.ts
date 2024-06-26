import { vehicleDistanceDriven } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class DistanceDriven extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'graphData.distanceDriven'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleDistanceDriven(vehicle).toFixedIfNotZero(1)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.distanceUnit ?? ''
  }
}
