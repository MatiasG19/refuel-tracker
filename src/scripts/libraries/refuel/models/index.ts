export class Vehicle {
  id!: number
  name!: string
  plateNumber!: string
  currencyUnit!: string
  fuelUnitId!: number
  fuelUnit?: FuelUnit
  refuels?: Refuel[]
}

export class Refuel {
  id!: number
  date!: Date
  refueledAmount!: number | string
  payedAmount!: number | string
  distanceDriven!: number | string
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

export class VehicleData extends Vehicle {
  fuelConsumption!: string
}
