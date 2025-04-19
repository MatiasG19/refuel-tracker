import { Vehicle, Expense, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, type Group, type IChartData } from '../index.js'
import { groupBy as groupByFun } from '../groupBy.js'
import { vehicleMoneySpentOnExpenses } from 'src/scripts/libraries/refuel/functions/vehicle'

export class MoneySpentOnExpenses extends AbstractChartData {
  override getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[],
    expenses: Expense[]
  ): IChartData {
    const groupedData = groupByFun(expenses, groupBy)
    const chartData: IChartData = { labels: [], data: [] }
    for (const key in groupedData) {
      chartData.labels.push(key)
      const v = { ...vehicle }
      v.expenses = groupedData[key]! as Expense[]
      chartData.data.push(vehicleMoneySpentOnExpenses(v).toFixedIfNotZero(2))
    }

    return chartData
  }
}
