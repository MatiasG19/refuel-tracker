import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'
import { IGraphData } from './IGraphData'

@GraphDataDecorator('4')
export class FuelPricing extends GraphData implements IGraphData {
  constructor(private vehicle: Vehicle) {
    super()
    this.title = 'Fuel pricing'
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  calculateValue(vehicle: Vehicle): string {
    // TODO Calculate fuel pricing
    return '0'
  }
  getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
