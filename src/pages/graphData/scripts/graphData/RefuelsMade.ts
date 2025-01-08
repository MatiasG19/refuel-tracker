import { vehicleRefuelsMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class RefuelsMade extends AbstractGraphData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'graphData.refuelsMade'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleRefuelsMade(vehicle).toString()
  }

  protected override getUnit(): string {
    return ''
  }
}
