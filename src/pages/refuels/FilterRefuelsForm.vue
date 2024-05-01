<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <c-input
        color="accent"
        :value="filterDateFrom"
        :label="t('filterRefuelsForm.filterFrom')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="filterDateFrom"
            @update:modelValue="evt => updateDateFrom(evt)"
          />
          <div class="row items-center">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <c-input
        color="accent"
        :value="filterDateUntil"
        :label="t('filterRefuelsForm.filterUntil')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="filterDateUntil"
            @update:modelValue="evt => updateDateUntil(evt)"
          />
          <div class="row items-center">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <div class="row">
        <q-btn
          color="negative"
          :label="i18n.global.t('form.cancel')"
          no-caps
          class="form-btn"
          @click="$router.push('/refuels')"
        />
        <q-space />
        <q-btn
          color="positive"
          :label="i18n.global.t('form.filter')"
          type="submit"
          no-caps
          class="form-btn"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, onBeforeMount } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import { requiredFieldRule } from 'src/scripts/libraries/validation'
import { useRefuelFilterStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import CInput from 'src/components/inputs/CInput.vue'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
const refuelFilterStore = useRefuelFilterStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const filterDateFrom = computed(() => {
  return date.formatDate(refuelFilterStore.dateFrom, 'YYYY/MM/DD')
})
const filterDateUntil = computed(() => {
  return date.formatDate(refuelFilterStore.dateUntil, 'YYYY/MM/DD')
})

function updateDateFrom(event: string) {
  let d = new Date(event)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  refuelFilterStore.dateFrom = d
}

function updateDateUntil(event: string) {
  let d = new Date(event)
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)
  refuelFilterStore.dateUntil = d
}

function onSubmit() {
  refuelFilterStore.setFilter()
  void router.push('/refuels')
}

onBeforeMount(() => {
  if (refuelFilterStore.filterActive == false) {
    refuelFilterStore.filterName =
      date.formatDate(refuelFilterStore.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(refuelFilterStore.dateUntil, 'YYYY/MM/DD')
    let d = new Date()
    d.setDate(d.getDate() - 30) // Start 30 days in the past
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    refuelFilterStore.dateFrom = d
    d = new Date()
    d.setHours(23)
    d.setMinutes(59)
    d.setSeconds(59)
    d.setMilliseconds(999)
    refuelFilterStore.dateUntil = d
  }
})

onMounted(() => {
  mainLayoutStore.titleText = t('filterRefuelsForm.title')
})
</script>
