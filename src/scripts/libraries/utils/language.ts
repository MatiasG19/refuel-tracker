import { LanugageId, SelectOption } from '../../models'
import { Device } from '@capacitor/device'
import { i18n } from 'src/boot/i18n'
import { getLanguages } from 'src/scripts/staticData/languages'

export function getLanguageOptions(): SelectOption[] {
  return getLanguages().map(
    l =>
      ({
        label: l.text,
        value: l.id
      }) as SelectOption
  )
}

export async function setI18nLanguage(languageId: number) {
  const locale = i18n.global.locale
  if (languageId) {
    if (languageId === LanugageId.System) {
      locale.value = (await Device.getLanguageCode()).value
    } else {
      locale.value = getLanguages().filter(l => l.id === languageId)[0].code
    }
  }
}
