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
  odometer!: number
}

export class BaseExpense {
  id!: number
  date!: Date
  payedAmount!: number
  vehicleId!: number
  vehicle?: Vehicle
}

export class Refuel extends BaseExpense {
  refueledAmount!: number
  distanceDriven!: number
}

export class FuelUnit {
  id!: number
  distanceUnit!: string
  fuelUnit!: string
  fuelConsumptionUnit!: string
  distanceConversion!: number
  fuelUnitConversion!: number
}

export class Expense extends BaseExpense {
  description!: string
}

export enum FilterType {
  All = 1,
  Refuels = 2,
  Expenses = 3
}

export class RefuelFilter {
  id?: number
  name!: string
  title!: string
  active!: boolean
  dateFrom!: Date
  dateUntil!: Date
  type = 1
}
