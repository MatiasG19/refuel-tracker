import { vehicleMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class MoneySpent extends AbstractGraphData {
  constructor(protected override vehicle: Vehicle) {
    super(vehicle)
  }

  protected override setTitle(): string {
    return 'graphData.moneySpent'
  }

  protected override calculateValue(vehicle: Vehicle): string {
    return vehicleMoneySpent(vehicle).toFixedIfNotZero(2)
  }

  protected override getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
