import { vehicleRefuelsMade } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class RefuelsMade extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'graphData.refuelsMade'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleRefuelsMade(vehicle).toString()
  }

  protected getUnit(): string {
    return ''
  }
}
