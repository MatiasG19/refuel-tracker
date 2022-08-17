import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('1')
export class FuelConsumption extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Fuel consumption'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): string {
    // TODO Calculate fuel consumption
    if (vehicle.fuelUnit?.uid === '1') {
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

  getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelConsumptionUnit ?? ''
  }
}
