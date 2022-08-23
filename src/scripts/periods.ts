import { Period } from './models'
import { i18n } from 'src/boot/i18n'

const { t } = i18n.global

export function periodsTT(): Period[] {
  return [
    { name: t('periods.week'), periodInDays: 7 },
    { name: t('periods.threeMonths'), periodInDays: 90 },
    { name: t('periods.sixMonths'), periodInDays: 180 },
    { name: t('periods.year'), periodInDays: 365 },
    { name: t('periods.max'), periodInDays: 0 }
  ]
}
