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
    // TODO Calculate for all fuel units
    if (vehicle.fuelUnit?.id === 1) {
      let fuel = vehicle.refuels
        ?.map(re => re.refueledAmount)
        .reduce((total, current) => +total + +current)
      fuel = fuel ? +fuel : 0

      let distance = vehicle.refuels
        ?.map(re => re.distanceDriven)
        .reduce((total, current) => +total + +current)
      distance = distance ? +distance : 0

      return ((fuel * 100) / distance).toFixed(2).toString()
    }
    return '0'
  }

  protected getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
