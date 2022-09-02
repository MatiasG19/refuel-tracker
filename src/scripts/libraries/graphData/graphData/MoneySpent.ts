import { vehicleMoneySpent } from '../../refuel/functions/vehicle'
import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class MoneySpent extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Money spent'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleMoneySpent(vehicle).toFixedIfNotZero(2)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
