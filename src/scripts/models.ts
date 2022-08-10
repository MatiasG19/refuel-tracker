export class GraphData {
  id?: number
  // uid: string
  title!: string
  value!: number
  unit!: string
  sequence!: number
  periodId!: number
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
  refueledAmount!: number
  payedAmount!: number
  distanceDriven!: number
  vehicleId!: number
  vehicle?: Vehicle
}

export class FuelUnit {
  id?: number
  uid!: string
  distanceUnit!: string
  fuelUnit!: string
  fuelConsumptionUnit!: string
  conversion!: number
}

export class OptionInDialog {
  text!: string
  icon!: string
  action!: () => void
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
