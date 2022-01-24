export class GraphData {
  title!: string
  value!: number
  unit!: string
  period!: number
}

export class RefuelEntry {
  id!: number
  vehicleId!: number
  date!: Date
  refuelAmount!: number
  payedAmount!: number
}

export class Vehicle {
  id!: number
  name!: string
  plateNumber!: string
  fuelUnit!: FuelUnit
}

export class FuelUnit {
  id!: number
  Unit!: string
}

export class OptionInDialog {
  text!: string
  icon!: string
  action!: () => void
}


