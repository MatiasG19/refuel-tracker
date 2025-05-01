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

export type LanguageCode = 'en' | 'de'

export class Language {
  id?: number
  text!: string
  code!: LanguageCode
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
