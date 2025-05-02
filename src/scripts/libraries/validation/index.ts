import t from 'src/i18n'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

export function useFormValidation() {
  const settingsStore = useSettingsStore()

  const requiredFieldRule = (v: string) => !!v || t('validation.requiredField')

  const numbersOnlyRule = (v: string) =>
    0 === +v || +v || t[settingsStore.locale]['validation']['numbersOnly']

  const positiveNumbersRule = (v: string) =>
    +v > 0 ? +v : t[settingsStore.locale]['validation']['positiveNumbers']

  const positiveNumbersAndZeroRule = (v: string) =>
    +v >= 0
      ? +v
      : t[settingsStore.locale]['validation']['positiveNumbersAndZero']

  const max50Characters = (v: string) =>
    v.length <= 50
      ? 1
      : t[settingsStore.locale]['validation']['max50Characters']

  const nothingSelected = (v: string) =>
    parseInt(v) > 0
      ? 1
      : t[settingsStore.locale]['validation']['nothingSelected']

  return {
    requiredFieldRule,
    numbersOnlyRule,
    positiveNumbersRule,
    positiveNumbersAndZeroRule,
    max50Characters,
    nothingSelected
  }
}
