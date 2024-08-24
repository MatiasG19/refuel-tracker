import { i18n } from 'src/boot/i18n'
import { SelectOption } from 'src/scripts/models'

export function getGrouByOptions(): SelectOption[] {
  const { t } = i18n.global
  return [
    {
      value: 0,
      label: t('chart.groupByOptions.noGrouping')
    },
    {
      value: 1,
      label: t('chart.groupByOptions.year')
    },
    {
      value: 2,
      label: t('chart.groupByOptions.month')
    }
  ]
}

export function getDataSourceOptions(): SelectOption[] {
  const { t } = i18n.global
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
