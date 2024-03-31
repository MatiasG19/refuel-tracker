import { vehicleDistanceDriven } from 'src/scripts/libraries/refuel/functions/vehicle'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'
import { i18n } from 'src/boot/i18n'

export class DistanceDriven extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    const { t } = i18n.global
    return t('pages.graphData.distanceDriven')
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleDistanceDriven(vehicle).toFixedIfNotZero(1)
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.distanceUnit ?? ''
  }
}
