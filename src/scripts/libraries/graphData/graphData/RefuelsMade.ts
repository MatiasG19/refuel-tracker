import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

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
