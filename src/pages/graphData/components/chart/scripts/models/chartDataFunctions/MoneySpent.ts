import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, Group, IChartData } from '..'
import { groupBy as groupByFun } from '../groupBy'
import { vehicleMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'

export class MoneySpent extends AbstractChartData {
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
        chartData.data.push(vehicleMoneySpent(v).toFixedIfNotZero(2))
      }
    }

    return chartData
  }
}
