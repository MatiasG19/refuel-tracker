<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <div class="row">
        <c-date
          class="col"
          :modelValue="filterDateFrom"
          @update:modelValue="updateDateFromInStore($event)"
          :label="t('filterRefuelsForm.filterFrom')"
          :rules="[requiredFieldRule]"
        />
        <c-date
          class="col q-pl-md"
          :modelValue="filterDateUntil"
          @update:modelValue="updateDateUntilInStore($event)"
          :label="t('filterRefuelsForm.filterUntil')"
          :rules="[requiredFieldRule]"
        />
      </div>

      <c-multi-toggle v-model="filterType" :options="filterTypeOptions" />

      <div class="row">
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="i18n.global.t('form.cancel')"
          no-caps
          @click="router.go(-1)"
        />
        <q-space />
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="i18n.global.t('form.filter')"
          type="submit"
          no-caps
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, onBeforeMount, ref } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import { useFormValidation } from 'src/scripts/libraries/validation'
import { useRefuelFilterStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import CDate from 'src/components/inputs/CDate.vue'
import CMultiToggle from 'src/components/inputs/CMultiToggle.vue'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import {
  updateDateFrom,
  updateDateUntil
} from 'src/scripts/libraries/utils/date'
import { SelectOption } from 'src/components/inputs/types'
import { FilterType } from 'src/scripts/libraries/refuel/models'

const router = useRouter()
const { requiredFieldRule } = useFormValidation()
const refuelFilterStore = useRefuelFilterStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const filterDateFrom = computed(() => {
  return date.formatDate(refuelFilterStore.filter?.dateFrom, 'YYYY/MM/DD')
})
const filterDateUntil = computed(() => {
  return date.formatDate(refuelFilterStore.filter?.dateUntil, 'YYYY/MM/DD')
})

const filterTypeOptions: SelectOption[] = [
  {
    label: t('filterRefuelsForm.all'),
    value: FilterType.All
  },
  {
    label: t('filterRefuelsForm.refuels'),
    value: FilterType.Refuels
  },
  {
    label: t('filterRefuelsForm.expenses'),
    value: FilterType.Expenses
  }
]

const filterType = ref<SelectOption>(filterTypeOptions[0]!)

function updateDateFromInStore(event: string) {
  if (refuelFilterStore.filter)
    refuelFilterStore.filter.dateFrom = updateDateFrom(event)
}

function updateDateUntilInStore(event: string) {
  if (refuelFilterStore.filter)
    refuelFilterStore.filter.dateUntil = updateDateUntil(event)
}

function onSubmit() {
  if (refuelFilterStore.filter)
    refuelFilterStore.filter.type = filterType.value.value
  refuelFilterStore.setFilter()
  void router.go(-1)
}

onBeforeMount(async () => {
  await refuelFilterStore.readFilter()
  const type = filterTypeOptions.find(
    o => o.value == refuelFilterStore.filter?.type
  )
  if (type) filterType.value = type
})

onMounted(() => {
  mainLayoutStore.titleText = t('filterRefuelsForm.title')
})
</script>
