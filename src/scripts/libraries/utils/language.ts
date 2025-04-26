import { LanguageId } from '../../models'
import { Device } from '@capacitor/device'
import { i18n } from 'src/boot/i18n'
import { SelectOption } from 'src/components/inputs/types'
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
    if (languageId === LanguageId.System) {
      const code = await Device.getLanguageCode()
      locale.value = getLanguages().filter(
        l => code.value === l.codeString
      )[0]!.code
    } else {
      locale.value = getLanguages().filter(l => l.id === languageId)[0]!.code
    }
  }
}
