import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, Group, IChartData } from '..'
import { groupBy as groupByFun } from '../groupBy'
import { vehicleDistanceDriven } from 'src/scripts/libraries/refuel/functions/vehicle'

export class DistanceDriven extends AbstractChartData {
  getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    const groupedData = groupByFun(refuels, groupBy)
    const chartData: IChartData = { labels: [], data: [] }
    for (const key in groupedData) {
      chartData.labels.push(key)
      if (groupedData.hasOwnProperty(key)) {
        const v = { ...vehicle }
        v.refuels = groupedData[key]
        chartData.data.push(vehicleDistanceDriven(v).toFixedIfNotZero(1))
      }
    }

    return chartData
  }
}