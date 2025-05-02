import type { SelectOption } from 'src/components/inputs/types'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import t from '../../i18n'

export function getGroupByOptions(): SelectOption[] {
  const settingsStore = useSettingsStore()
  return [
    {
      value: 0,
      label: t[settingsStore.locale]['chart']['groupByOptions']['noGrouping']
    },
    {
      value: 1,
      label: t[settingsStore.locale]['chart']['groupByOptions']['month']
    },
    {
      value: 2,
      label: t[settingsStore.locale]['chart']['groupByOptions']['year']
    }
  ]
}

export function getDataSourceOptions(): SelectOption[] {
  const settingsStore = useSettingsStore()
  return [
    {
      value: 0,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['fuelConsumption']
    },
    {
      value: 1,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['distanceDriven']
    },
    {
      value: 2,
      label: t[settingsStore.locale]['chart']['dataSourceOptions']['fuelBurnt']
    },
    {
      value: 3,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['refuelsMade']
    },
    {
      value: 4,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['fuelPricing']
    },
    {
      value: 5,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['totalMoneySpent']
    },
    {
      value: 6,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions'][
          'moneySpentOnRefuels'
        ]
    },
    {
      value: 7,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions'][
          'moneySpentOnExpenses'
        ]
    },
    {
      value: 8,
      label:
        t[settingsStore.locale]['chart']['dataSourceOptions']['expensesMade']
    }
  ]
}
