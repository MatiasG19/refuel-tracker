import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('6')
export class RefuelsMade extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Refuels made'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): string {
    return vehicle.refuels?.length.toString() ?? ''
  }
  getUnit(vehicle: Vehicle): string {
    return ''
  }
}
