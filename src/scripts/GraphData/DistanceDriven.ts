import { GraphData } from '../models'

@GraphDataDecorator
export class DistanceDriven extends GraphData {
  constructor() {
    super()
    this.uid = '2'
  }

  private calculateValue() {}
}

function GraphDataDecorator(constructor: Function) {
  // return '2'
}
