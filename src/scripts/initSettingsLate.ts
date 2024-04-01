import { db } from '../boot/dexie'
import { Device } from '@capacitor/device'
import { useI18n } from 'vue-i18n'
import { getLanguages } from './staticData/languages'

export function initSettingsLate() {
  const { locale } = useI18n()

  ;(async () => {
    const settings = await db.settings.toArray()
    if (!settings[0]) return Promise.resolve()

    // Select language
    if (settings[0].languageId) {
      if (settings[0].languageId === 1) {
        locale.value = (await Device.getLanguageCode()).value
      } else {
        locale.value = getLanguages().filter(
          l => l.id === settings[0].languageId
        )[0].code
      }
    }
  })()
}
