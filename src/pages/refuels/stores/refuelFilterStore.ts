import { defineStore } from 'pinia'
import { computed, ref, toRaw } from 'vue'
import { refuelFilterRepository } from 'src/scripts/databaseRepositories'
import {
  FilterType,
  type RefuelFilter
} from 'src/scripts/libraries/refuel/models'
import { date } from 'quasar'
import {
  updateDateFrom,
  updateDateUntil
} from 'src/scripts/libraries/utils/date'
import { SelectOption } from 'src/components/inputs/types'
import messages from '../i18n'
import { ct } from 'src/scripts/libraries/translate'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

export const useRefuelFilterStore = defineStore('refuelFilterStore', () => {
  const settingsStore = useSettingsStore()

  const filter = ref<RefuelFilter>({
    id: 0,
    name: '',
    title: '',
    active: false,
    dateFrom: new Date(),
    dateUntil: new Date(),
    type: FilterType.All
  })
  const filterId = 1

  async function setFilter() {
    await refuelFilterRepository.setFilter(toRaw(filter.value))
  }

  async function removeDateFilter() {
    filter.value.active = false
    await refuelFilterRepository.removeDateFilter(filterId)
  }

  async function removeTypeFilter() {
    filter.value.type = FilterType.All
    await refuelFilterRepository.changeTypeFilter(filterId, filter.value.type)
  }

  async function readFilter() {
    if (filter.value.id && filter.value.id > 0) return

    const filterFromDb = await refuelFilterRepository.readFilter(filterId)

    if (!filterFromDb) return
    filter.value = filterFromDb

    let d = new Date()
    d.setDate(d.getDate() - 90) // Start 90 days in the past
    updateDateFrom(d)
    filter.value.dateFrom = d
    d = new Date()
    updateDateUntil(d)
    filter.value.dateUntil = d
    filter.value.type = FilterType.All
  }

  const dateFilterName = computed<string | null>(() => {
    if (!filter.value.active) return null
    return (
      date.formatDate(filter.value.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(filter.value.dateUntil, 'YYYY/MM/DD')
    )
  })

  const filterTypeOptions = computed<SelectOption[]>(() => [
    {
      label: ct('filterRefuelsForm.all', settingsStore.locale, messages),
      value: FilterType.All
    },
    {
      label: ct('filterRefuelsForm.refuels', settingsStore.locale, messages),
      value: FilterType.Refuels
    },
    {
      label: ct('filterRefuelsForm.expenses', settingsStore.locale, messages),
      value: FilterType.Expenses
    }
  ])

  return {
    filter,
    setFilter,
    removeDateFilter,
    removeTypeFilter,
    readFilter,
    dateFilterName,
    filterTypeOptions
  }
})
