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

export class VehicleEntry {
  id!: number
  name!: string
  plateNumber!: string
}

export class OptionInDialog {
  text!: string
  icon!: string
}

