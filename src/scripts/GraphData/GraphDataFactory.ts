import * as GraphDataClasses from '.'
import { GraphData, GraphSettings, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'

export class GraphDataFactory {
  private graphData: GraphData[] = []

  constructor(private vehicle: Vehicle) {}

  public getGraphData(graphSettings: GraphSettings[]): GraphData[] {
    this.getClasses(graphSettings)
    return this.graphData
  }

  private getClasses(graphSettings: GraphSettings[]) {
    for (let key in GraphDataClasses) {
      // @ts-ignore
      const graphDataClass = GraphDataClasses[key]
      const uid = Reflect.getMetadata(GraphDataDecorator.name, graphDataClass)
      if (!uid) continue
      const settings = graphSettings.filter(gs => gs.uid === uid)
      if (!settings) continue
      this.createGraphData(graphDataClass, settings[0])
    }
  }

  private createGraphData(class_: any, settings: GraphSettings) {
    const graphData = new class_(this.vehicle)
    graphData.uid = settings.uid
    graphData.sequence = settings.sequence
    graphData.visible = settings.visible

    this.graphData.push(graphData)
  }
}
