import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { refuelFilterRepository } from 'src/scripts/databaseRepositories'
import { RefuelFilter } from '../models'
import { date } from 'quasar'

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

  async function removeFilter() {
    if (!filter.value) return
    filter.value.active = false
    await refuelFilterRepository.removeFilter(filterId)
  }

  async function readFilter() {
    filter.value = await refuelFilterRepository.readFilter(filterId)
  }

  return {
    filter,
    setFilter,
    removeFilter,
    readFilter
  }
})
