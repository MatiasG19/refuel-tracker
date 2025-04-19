import type {
  Vehicle,
  Refuel,
  Expense
} from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, type Group, type IChartData } from '../index.js'
import { groupBy as groupByFun } from '../groupBy.js'
import { vehicleTotalMoneySpent } from 'src/scripts/libraries/refuel/functions/vehicle'

export class TotalMoneySpent extends AbstractChartData {
  override getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[],
    expenses: Expense[]
  ): IChartData {
    const groupedData = groupByFun(
      [
        // Convert refuels to expenses
        ...refuels.map(r => {
          return {
            id: r.id,
            date: r.date,
            payedAmount: r.payedAmount,
            description: '',
            vehicleId: r.vehicleId
          } as Expense
        }),
        ...expenses
      ],
      groupBy
    )
    const chartData: IChartData = { labels: [], data: [] }
    for (const key in groupedData) {
      chartData.labels.push(key)
      const v = { ...vehicle }
      v.refuels = []
      v.expenses = groupedData[key]! as Expense[]
      chartData.data.push(vehicleTotalMoneySpent(v).toFixedIfNotZero(2))
    }

    return chartData
  }
}
