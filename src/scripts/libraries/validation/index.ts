import { useI18n } from 'vue-i18n'
export function useFormValidation() {
  const { t } = useI18n()

  const requiredFieldRule = (v: string) => !!v || t('validation.requiredField')

  const numbersOnlyRule = (v: string) =>
    0 === +v || +v || t('validation.numbersOnly')

  const positiveNumbersRule = (v: string) =>
    +v > 0 ? +v : t('validation.positiveNumbers')

  const positiveNumbersAndZeroRule = (v: string) =>
    +v >= 0 ? +v : t('validation.positiveNumbers')

  const max50Characters = (v: string) =>
    v.length <= 50 ? 1 : t('validation.max50Characters')

  const nothingSelected = (v: string) =>
    parseInt(v) > 0 ? 1 : t('validation.nothingSelected')

  return {
    requiredFieldRule,
    numbersOnlyRule,
    positiveNumbersRule,
    positiveNumbersAndZeroRule,
    max50Characters,
    nothingSelected
  }
}
