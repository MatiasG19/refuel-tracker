export class Vehicle {
  id!: number
  name!: string
  plateNumber!: string
  currencyUnit!: string
  fuelUnitId!: number
  fuelUnit?: FuelUnit
  refuels?: Refuel[]
  expenses?: Expense[]
  totalFuelConsumption?: string
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

export class Expense {
  id!: number
  description!: string
  payedAmount!: number
  date!: Date
  vehicleId!: number
  vehicle?: Vehicle
}

export class RefuelFilter {
  id?: number
  name!: string
  title!: string
  active!: boolean
  dateFrom!: Date
  dateUntil!: Date
}
