export class GraphData {
  title!: string
  value!: number
  unit!: string
  sequence!: number
  periodId!: number
  perdiod?: Period
}

export class Vehicle {
  id!: number
  name!: string
  plateNumber!: string
  currencyUnit!: string
  fuelUnitId!: number
  fuelUnit?: FuelUnit
  refuelEntries?: RefuelEntry[]
}

export class RefuelEntry {
  id!: number
  date!: Date
  refuelAmount!: number
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
}

export class OptionInDialog {
  text!: string
  icon!: string
  action!: () => void
}

export class Period {
  id!: number
  name!: string
  periodInDays!: number
}


