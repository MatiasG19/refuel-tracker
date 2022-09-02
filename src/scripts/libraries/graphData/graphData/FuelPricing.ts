import { Vehicle } from '../../refuel/models'
import { AbstractGraphData } from '../abstract/AbstractGraphData'

export class FuelPricing extends AbstractGraphData {
  constructor(protected vehicle: Vehicle) {
    super(vehicle)
  }

  protected setTitle(): string {
    return 'Fuel pricing'
  }

  protected calculateValue(vehicle: Vehicle): string {
    let index = 1
    let price = vehicle.refuels
      ?.map(re => +re.payedAmount / +re.refueledAmount)
      .reduce((total, current, i) => {
        index += i
        return +total + +current
      })
    price = price ? +price / index : 0

    return price.toFixed(2).toString()
  }

  protected getUnit(vehicle: Vehicle): string {
    return `${vehicle.currencyUnit}/${vehicle.fuelUnit?.fuelUnit as string}`
  }
}
