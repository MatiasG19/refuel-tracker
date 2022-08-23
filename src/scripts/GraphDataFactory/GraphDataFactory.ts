import { GraphData, GraphSettings, Vehicle } from '../models'
import { AbstractGraphData } from './GraphData/AbstractGraphData'

export class GraphDataFactory {
  private graphData: GraphData[] = []
  public static graphDataClasses = new Map<string, typeof AbstractGraphData>()

  constructor(private vehicle: Vehicle) {}

  public static register(uid: string, graphDataType: typeof AbstractGraphData) {
    GraphDataFactory.graphDataClasses.set(uid, graphDataType)
  }

  public getGraphData(graphSettings: GraphSettings[]): GraphData[] {
    this.graphData.length = 0
    this.getClasses(graphSettings)
    return this.graphData
  }

  private getClasses(graphSettings: GraphSettings[]) {
    for (const entry of GraphDataFactory.graphDataClasses.entries()) {
      const uid = entry[0]
      const graphDataClass = entry[1]

      if (!uid) continue
      const settings = graphSettings.filter(gs => gs.uid === uid)
      if (!settings) continue
      this.createGraphData(graphDataClass, settings[0])
    }
  }

  private createGraphData(
    class_: typeof AbstractGraphData,
    settings: GraphSettings
  ) {
    const graphData: GraphData = new class_(this.vehicle)
    graphData.uid = settings.uid
    graphData.sequence = settings.sequence
    graphData.visible = settings.visible

    this.graphData.push(graphData)
  }
}
