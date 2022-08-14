import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('5')
export class FuelBurnt extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Fuel burnt'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): string {
    return (
      vehicle.refuels
        ?.map(re => re.refueledAmount)
        .reduce((total, current) => +total + +current)
        .toString() ?? ''
    )
  }
  getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.fuelUnit ?? ''
  }
}
