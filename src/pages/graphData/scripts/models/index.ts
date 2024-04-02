export class GraphData {
  id?: number
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

export class Period {
  id?: number
  name!: string
  periodInDays!: number
}
