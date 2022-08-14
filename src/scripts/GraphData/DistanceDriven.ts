import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('2')
export class DistanceDriven extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Distance driven'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): number {
    return (
      vehicle.refuels
        ?.map(re => re.distanceDriven)
        .reduce((total, current) => +total + +current) ?? -1
    )
  }

  getUnit(vehicle: Vehicle): string {
    return vehicle.fuelUnit?.distanceUnit ?? ''
  }
}
