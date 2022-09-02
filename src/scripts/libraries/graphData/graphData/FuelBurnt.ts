import { vehicleFuelBurnt } from '../../refuel/functions/vehicle'
import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelBurnt extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Fuel burnt'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleFuelBurnt(vehicle).toFixed(1).toString()
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
