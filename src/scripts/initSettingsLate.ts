import { db } from '../boot/dexie'
import { Device } from '@capacitor/device'
import { useI18n } from 'vue-i18n'

export function initSettingsLate() {
  const { locale } = useI18n()

  ;(async () => {
    const settings = await db.settings.toArray()
    if (!settings[0]) return Promise.resolve()

    if (settings[0].languageId && settings[0].languageId === 1)
      locale.value = (await Device.getLanguageCode()).value
  })()
}
