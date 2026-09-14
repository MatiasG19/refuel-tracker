import type { Vehicle, Refuel } from '@/scripts/libraries/refuel/models'
import { AbstractChartData, type Group, type IChartData } from '..'
import { groupBy as groupByFun } from '../groupBy'
import { vehicleDistanceDriven } from '@/scripts/libraries/refuel/functions/vehicle'

export class DistanceDriven extends AbstractChartData {
  override getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    const groupedData = groupByFun(refuels, groupBy)
    const chartData: IChartData = { labels: [], data: [] }
    for (const key in groupedData) {
      chartData.labels.push(key)
      const v = { ...vehicle }
      v.refuels = groupedData[key]! as Refuel[]
      chartData.data.push(vehicleDistanceDriven(v).toFixedIfNotZero(1))
    }

    return chartData
  }
}
