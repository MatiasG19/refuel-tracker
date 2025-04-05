export class Vehicle {
  id!: number
  name!: string
  plateNumber!: string
  currencyUnit!: string
  fuelUnitId!: number
  fuelUnit?: FuelUnit
  refuels?: Refuel[]
  totalFuelConsumption?: string
  odometer!: number
}

export class Refuel {
  id!: number
  date!: Date
  refueledAmount!: number
  payedAmount!: number
  distanceDriven!: number
  vehicleId!: number
  vehicle?: Vehicle
}

export class FuelUnit {
  id!: number
  distanceUnit!: string
  fuelUnit!: string
  fuelConsumptionUnit!: string
  distanceConversion!: number
  fuelUnitConversion!: number
}
