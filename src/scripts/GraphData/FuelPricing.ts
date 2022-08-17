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
    if (vehicle.fuelUnit?.uid === '1') {
      let index = 1
      let price = vehicle.refuels
        ?.map(re => +re.payedAmount / +re.refueledAmount)
        .reduce((total, current, i) => {
          index += i
          return +total + +current
        })
      price = price ? +price / index : 0

      return price.toFixed(2).toString()
    }
    return '0'
  }

  getUnit(vehicle: Vehicle): string {
    return vehicle.currencyUnit
  }
}
