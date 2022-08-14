import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('3')
export class MoneySpent extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Money spent'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): string {
    return (
      vehicle.refuels
        ?.map(re => re.payedAmount)
        .reduce((total, current) => +total + +current)
        .toString() ?? ''
    )
  }
  getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
