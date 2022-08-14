import { GraphData } from '../models'
import { GraphDataDecorator } from './Decorators'

@GraphDataDecorator('1')
export class FuelConsumption extends GraphData {
  constructor() {
    super()
  }

  // private calculateValue() {}
}
