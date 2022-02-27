import { GraphData, Vehicle } from 'src/scripts/models'

export function MoneySpent(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return {
    title: graphCard.title,
    value:
      vehicle.refuels
        ?.map(re => re.payedAmount)
        .reduce((total, current) => total + current) ?? -1,
    unit: vehicle.currencyUnit,
    sequence: graphCard.sequence,
    periodId: graphCard.periodId,
    visible: graphCard.visible
  }
}

export function DistanceDriven(
  vehicle: Vehicle,
  graphCard: GraphData
): GraphData {
  return {
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

export function FuelBurnt(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return {
    title: graphCard.title,
    value:
      vehicle.refuels
        ?.map(re => re.refueledAmount)
        .reduce((total, current) => total + current) ?? -1,
    unit: vehicle.fuelUnit?.fuelUnit ?? 'Unit not set!',
    sequence: graphCard.sequence,
    periodId: graphCard.periodId,
    visible: graphCard.visible
  }
}

export function RefuelsMade(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return {
    title: graphCard.title,
    value: vehicle.refuels?.length ?? -1,
    unit: 'Refuels',
    sequence: graphCard.sequence,
    periodId: graphCard.periodId,
    visible: graphCard.visible
  }
}

// TODO function fuelPricing()
// TODO Fuel function fuelConsumption()
