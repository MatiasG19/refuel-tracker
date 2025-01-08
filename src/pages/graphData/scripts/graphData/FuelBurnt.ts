import { vehicleFuelBurnt } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelBurnt extends AbstractGraphData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'graphData.fuelBurnt'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelBurnt(vehicle).toFixedIfNotZero(1)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
