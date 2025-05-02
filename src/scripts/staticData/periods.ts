import t from 'src/i18n'
import { Period } from 'src/pages/dashboard/scripts/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

export function getPeriods(): Period[] {
  const settingsStore = useSettingsStore()
  return [
    {
      id: 1,
      name: t[settingsStore.locale]['periods']['week'],
      periodInDays: 7
    },
    {
      id: 2,
      name: t[settingsStore.locale]['periods']['threeMonths'],
      periodInDays: 90
    },
    {
      id: 3,
      name: t[settingsStore.locale]['periods']['sixMonths'],
      periodInDays: 180
    },
    {
      id: 4,
      name: t[settingsStore.locale]['periods']['year'],
      periodInDays: 365
    },
    { id: 5, name: t[settingsStore.locale]['periods']['max'], periodInDays: 0 }
  ]
}
