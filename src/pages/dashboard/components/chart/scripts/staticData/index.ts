import type { SelectOption } from 'src/components/inputs/types'
import { useI18n } from 'vue-i18n'
import messages from '../../i18n'

export function getGrouByOptions(): SelectOption[] {
  const { t } = useI18n({ useScope: 'local', messages })
  return [
    {
      value: 0,
      label: t('chart.groupByOptions.noGrouping')
    },
    {
      value: 1,
      label: t('chart.groupByOptions.month')
    },
    {
      value: 2,
      label: t('chart.groupByOptions.year')
    }
  ]
}

export function getDataSourceOptions(): SelectOption[] {
  const { t } = useI18n({ useScope: 'local', messages })
  return [
    {
      value: 0,
      label: t('chart.dataSourceOptions.fuelConsumption')
    },
    {
      value: 1,
      label: t('chart.dataSourceOptions.distanceDriven')
    },
    {
      value: 2,
      label: t('chart.dataSourceOptions.fuelBurnt')
    },
    {
      value: 3,
      label: t('chart.dataSourceOptions.refuelsMade')
    },
    {
      value: 4,
      label: t('chart.dataSourceOptions.fuelPricing')
    },
    {
      value: 5,
      label: t('chart.dataSourceOptions.moneySpent')
    }
  ]
}
