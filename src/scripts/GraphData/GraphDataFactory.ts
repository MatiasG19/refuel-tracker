import { FuelConsumption, DistanceDriven } from '.'
import { GraphData, GraphSettings } from '../models'

export class GraphDataFactory {
  private map = new Map<string, object>()

  constructor() {
    this.register()
  }

  public getGraphData(graphSettings: GraphSettings[]): GraphData[] {
    // graphSettings.forEach(s => {
    //     const type = this.map.get(s.uid)
    //     if(type) {
    //         const t = type as FuelConsumption
    //         const graph = new t() Reflect.
    //     }
    // })

    return []
  }

  private register() {
    this.map.set('1', FuelConsumption)
    this.map.set('2', DistanceDriven)
  }
}
