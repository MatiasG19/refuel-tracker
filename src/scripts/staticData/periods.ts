import { i18n } from 'src/boot/i18n'
import { Period } from '../libraries/graphData/models'

export function getPeriods(): Period[] {
  const { t } = i18n.global
  return [
    { id: 1, name: t('periods.week'), periodInDays: 7 },
    { id: 2, name: t('periods.threeMonths'), periodInDays: 90 },
    { id: 3, name: t('periods.sixMonths'), periodInDays: 180 },
    { id: 4, name: t('periods.year'), periodInDays: 365 },
    { id: 5, name: t('periods.max'), periodInDays: 0 }
  ]
}
