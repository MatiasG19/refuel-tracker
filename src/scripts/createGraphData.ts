import { GraphSettings, GraphData } from './models'

export function getGraphData(graphSettings: GraphSettings[]) {
  return getData(getSettings(graphSettings))
}

function getSettings(graphSettings: GraphSettings[]) {
  const graphData = new Array<GraphData>()
  graphSettings.forEach(s => {
    const graph = new GraphData()
    graph.uid = s.uid
    graph.sequence = s.sequence
    graph.periodId = s.periodId
    graph.visible = s.visible
  })
  return graphData
}

function getData(graphData: GraphData[]) {
  for (var graph of graphData) {
  }
}
