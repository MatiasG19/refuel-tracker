import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'
import { i18n } from 'src/boot/i18n'

export class FuelConsumption extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    const { t } = i18n.global
    return t('pages.graphData.fuelConsumption')
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleFuelConsumption(vehicle).toFixedIfNotZero(2)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
