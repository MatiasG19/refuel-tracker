import { GraphData, Vehicle } from '../models'

export class AbstractGraphData extends GraphData {
  constructor(protected vehicle: Vehicle) {
    super()
    this.title = this.setTitle()
    this.value = this.calculateValue(this.vehicle)
    this.unit = this.getUnit(this.vehicle)
  }

  protected setTitle() {
    return ''
  }

  // eslint-disable-next-line
  protected calculateValue(vehicle: Vehicle): string {
    return ''
  }

  // eslint-disable-next-line
  protected getUnit(vehicle: Vehicle): string {
    return ''
  }
}
