import { Vehicle } from '../models'
import { AbstractGraphData } from './AbstractGraphData'

export class RefuelsMade extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Refuels made'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicle.refuels?.length.toString() ?? ''
  }

  protected getUnit(): string {
    return ''
  }
}
