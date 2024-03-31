import { vehicleMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'
import { i18n } from 'src/boot/i18n'

export class MoneySpent extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    const { t } = i18n.global
    return t('pages.graphData.moneySpent')
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleMoneySpent(vehicle).toFixedIfNotZero(2)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
