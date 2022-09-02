import { vehicleFuelConsumption } from '../../refuel/functions/vehicle'
import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelConsumption extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Fuel consumption'
  }

  protected calculateValue(vehicle: Vehicle): string {
    return vehicleFuelConsumption(vehicle).toFixed(2).toString()
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
