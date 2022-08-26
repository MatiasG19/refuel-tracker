import { GraphData, GraphSettings, Vehicle } from '../models'
import { AbstractGraphData } from './GraphData/AbstractGraphData'

export class GraphDataFactory {
  public static graphDataClasses = new Map<string, typeof AbstractGraphData>()

  constructor(private vehicle: Vehicle) {}

  public static register(uid: string, graphDataType: typeof AbstractGraphData) {
    GraphDataFactory.graphDataClasses.set(uid, graphDataType)
  }

  public getAll(graphSettings: GraphSettings[]): GraphData[] {
    const graphData: GraphData[] = []
    for (const entry of GraphDataFactory.graphDataClasses.entries()) {
      const uid = entry[0]
      const graphDataClass = entry[1]

      if (!uid) continue
      const settings = graphSettings.filter(gs => gs.uid === uid)
      if (!settings) continue
      graphData.push(this.createGraphData(graphDataClass, settings[0]))
    }
    return graphData
  }

  public get(uid: string, graphSettings: GraphSettings): GraphData | null {
    const graphDataClass = GraphDataFactory.graphDataClasses.get(uid)
    if (graphDataClass)
      return this.createGraphData(graphDataClass, graphSettings)
    return null
  }

  private createGraphData(
    class_: typeof AbstractGraphData,
    settings: GraphSettings
  ): GraphData {
    const graphData: GraphData = new class_(this.vehicle)
    graphData.uid = settings.uid
    graphData.sequence = settings.sequence
    graphData.visible = settings.visible

    return graphData
  }
}
