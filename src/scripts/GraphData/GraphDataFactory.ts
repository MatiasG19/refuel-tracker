import * as GraphDataClasses from '.'
import { GraphData, GraphSettings } from '../models'
import { GraphDataDecorator } from './Decorators'

export class GraphDataFactory {
  private graphData: GraphData[] = []

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

  private createGraphData(class_: keyof GraphData, settings: GraphSettings) {
    const graphData = new class_()
    graphData.uid = settings.uid
    graphData.sequence = settings.sequence
    graphData.visible = settings.visible

    // TODO calculate graph data value and get units
    graphData.title = 'Title'
    graphData.value = settings.uid
    graphData.unit = 'unit'

    this.graphData.push(graphData)
  }
}
