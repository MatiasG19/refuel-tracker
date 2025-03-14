export class Settings {
  id?: number
  colorThemeId!: number
  distanceUnitId!: number
  vehicleId: number | null = null
  plateNumberInTitleActive!: boolean
  autoBackupActive!: boolean
  autoBackupPath!: string
  lastUpdateCheck!: Date
  languageId = 1
}

export class SelectOption {
  label!: string
  value!: number
}

export class Language {
  id?: number
  text!: string
  code!: 'en' | 'de'
  codeString!: string
}

export const LanguageId = {
  System: 1
}

export type ColorTheme = {
  value: number
  label: string
  dark: boolean
  className: string
}
