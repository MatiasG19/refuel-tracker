export class GraphData {
  uid!: string
  title!: string
  value!: string
  unit!: string
  sequence!: number
  periodId!: number
  perdiod?: Period
  visible!: boolean
}

export class GraphSettings {
  id?: number
  uid!: string
  sequence!: number
  periodId?: number
  perdiod?: Period
  visible!: boolean
}

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

export class OptionInDialog {
  text!: string
  icon!: string
  action!: (data?: unknown) => void
}

export class Period {
  id?: number
  name!: string
  periodInDays!: number
}

export class Settings {
  id?: number
  colorThemeId!: number
  distanceUnitId!: number
  vehicleId: number | null = null
  plateNumberInTitleActive!: boolean
  refuelFilterActive!: boolean
}

export class SelectOption {
  label!: string
  value!: number
}
