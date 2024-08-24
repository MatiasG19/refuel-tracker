import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { AbstractChartData, Group, IChartData } from '..'

export class DistanceDriven extends AbstractChartData {
  getChartData(
    groupBy: Group,
    vehicle: Vehicle,
    refuels: Refuel[]
  ): IChartData {
    return {
      labels: refuels.map(r => r.distanceDriven.toString()),
      data: refuels.map(r => r.distanceDriven.toString())
    }
  }
}
