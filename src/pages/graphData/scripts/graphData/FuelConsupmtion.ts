import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelConsumption extends AbstractGraphData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'graphData.fuelConsumption'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleFuelConsumption(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
