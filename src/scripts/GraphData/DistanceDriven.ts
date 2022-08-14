import { GraphData, Vehicle } from '../models'
import { GraphDataDecorator } from './Decorators'

@GraphDataDecorator('2')
export class DistanceDriven extends GraphData {
  constructor() {
    super()
  }

  private calculateValue(vehicle: Vehicle, graphCard: GraphData): GraphData {
    return {
      uid: '0',
      title: graphCard.title,
      value:
        vehicle.refuels
          ?.map(re => re.distanceDriven)
          .reduce((total, current) => total + current) ?? -1,
      unit: vehicle.fuelUnit?.distanceUnit ?? 'Unit not set!',
      sequence: graphCard.sequence,
      periodId: graphCard.periodId,
      visible: graphCard.visible
    }
  }
}
