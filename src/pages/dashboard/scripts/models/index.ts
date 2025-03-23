export class Dashboard {
  id?: number
  vehicleId!: number
  sequence!: number
  visible!: boolean
}

export class DashboardValue {
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

export class DashboardView extends Dashboard {
  title!: string
  subtitle!: string
}

export class DashboardData extends DashboardView {
  dashboardValues: DashboardValue[] = []
}
export class DashboardValueSettings {
  id?: number
  uid!: string
  sequence!: number
  periodId?: number
  perdiod?: Period
  visible!: boolean
  title?: string
}

export class Period {
  id?: number
  name!: string
  periodInDays!: number
}
