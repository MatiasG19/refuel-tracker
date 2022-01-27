import { GraphData, Vehicle } from 'src/scripts/models'

export function MoneySpent(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return  {
    title: graphCard.title,
    value: vehicle.refuelEntries?.map(re => re.payedAmount).reduce((total, current) => total + current) ?? -1,
    unit: vehicle.currencyUnit,
    periodId: graphCard.periodId
  }
}

export function DistanceDriven(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return  {
    title: graphCard.title,
    value: vehicle.refuelEntries?.map(re => re.distanceDriven).reduce((total, current) => total + current) ?? -1,
    unit: vehicle.fuelUnit?.distanceUnit ?? 'Unit not set!',
    periodId: graphCard.periodId
  }
}

export function FuelBurnt(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return  {
    title: graphCard.title,
    value: vehicle.refuelEntries?.map(re => re.refuelAmount).reduce((total, current) => total + current) ?? -1,
    unit: vehicle.fuelUnit?.fuelUnit ?? 'Unit not set!',
    periodId: graphCard.periodId
  }
}

export function RefuelsMade(vehicle: Vehicle, graphCard: GraphData): GraphData {
  return  {
    title: graphCard.title,
    value: vehicle.refuelEntries?.length ?? -1,
    unit: 'Refuels',
    periodId: graphCard.periodId
  }
}

// TODO function fuelPricing()
// TODO Fuel function fuelConsumption()
