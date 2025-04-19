import type {
  Vehicle,
  Refuel,
  Expense
} from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, type Group, type IChartData } from '../'
import { groupBy as groupByFun } from '../groupBy'
import { vehicleExpensesMade } from 'src/scripts/libraries/refuel/functions/vehicle'

export class ExpensesMade extends AbstractChartData {
  override getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    _: Refuel[],
    expenses: Expense[]
  ): IChartData {
    const groupedData = groupByFun(expenses, groupBy)
    const chartData: IChartData = { labels: [], data: [] }
    for (const key in groupedData) {
      chartData.labels.push(key)
      const v = { ...vehicle }
      v.expenses = groupedData[key]! as Expense[]
      chartData.data.push(vehicleExpensesMade(v).toString())
    }

    return chartData
  }
}
