import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
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

export const useRefuelFilterStore = defineStore('refuelFilterStore', () => {
  const filter = ref<RefuelFilter | null>(null)
  const filterId = 1

  async function setFilter() {
    if (!filter.value) return
    filter.value.active = true
    filter.value.title =
      date.formatDate(filter.value.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(filter.value.dateUntil, 'YYYY/MM/DD')
    await refuelFilterRepository.setFilter(toRaw(filter.value))
  }

  async function removeDateFilter() {
    if (!filter.value) return
    filter.value.active = false
    await refuelFilterRepository.removeDateFilter(filterId)
  }

  async function removeTypeFilter() {
    if (!filter.value) return
    filter.value.type = FilterType.All
    await refuelFilterRepository.changeTypeFilter(filterId, filter.value.type)
  }

  async function readFilter() {
    filter.value = await refuelFilterRepository.readFilter(filterId)

    if (!filter.value || filter.value.active) return
    filter.value.title =
      date.formatDate(filter.value.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(filter.value.dateUntil, 'YYYY/MM/DD')
    let d = new Date()
    d.setDate(d.getDate() - 30) // Start 30 days in the past
    updateDateFrom(d)
    filter.value.dateFrom = d
    d = new Date()
    updateDateUntil(d)
    filter.value.dateUntil = d
  }

  return {
    filter,
    setFilter,
    removeDateFilter,
    removeTypeFilter,
    readFilter
  }
})
