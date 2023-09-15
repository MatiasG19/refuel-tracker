export class Settings {
  id?: number
  colorThemeId!: number
  distanceUnitId!: number
  vehicleId: number | null = null
  plateNumberInTitleActive!: boolean
  autoBackupActive!: boolean
  autoBackupPath!: string
  refuelFilterActive!: boolean
  lastUpdateCheck!: Date
}

export class SelectOption {
  label!: string
  value!: number
}
