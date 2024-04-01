import { vehicleFuelBurnt } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelBurnt extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'graphData.fuelBurnt'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleFuelBurnt(vehicle).toFixedIfNotZero(1)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
