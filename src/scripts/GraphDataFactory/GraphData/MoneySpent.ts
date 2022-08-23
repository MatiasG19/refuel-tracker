import { Vehicle } from '../../models'
import { AbstractGraphData } from './AbstractGraphData'

export class MoneySpent extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Money spent'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return (
      vehicle.refuels
        ?.map(re => re.payedAmount)
        .reduce((total, current) => +total + +current)
        .toString() ?? ''
    )
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
