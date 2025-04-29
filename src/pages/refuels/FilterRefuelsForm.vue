<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <div class="row">
        <c-date
          class="col"
          :modelValue="filter.dateFrom"
          @update:modelValue="updateDateFromInStore($event)"
          :label="t('filterRefuelsForm.filterFrom')"
          :rules="[requiredFieldRule]"
          :disable="!refuelFilterStore.filter.active"
        />
        <c-date
          class="col q-pl-md"
          :modelValue="filter.dateUntil"
          @update:modelValue="updateDateUntilInStore($event)"
          :label="t('filterRefuelsForm.filterUntil')"
          :rules="[requiredFieldRule]"
          :disable="!refuelFilterStore.filter.active"
        />
        <c-checkbox
          class="col-auto"
          v-model="refuelFilterStore.filter.active"
        />
      </div>

      <c-multi-toggle
        v-model="filterType"
        @update:model-value="
          (e: SelectOption) => (refuelFilterStore.filter.type = e.value)
        "
        :options="refuelFilterStore.filterTypeOptions"
      />

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
import { useRefuelFilterStore } from './stores/refuelFilterStore'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'
import CDate from 'src/components/inputs/CDate.vue'
import CMultiToggle from 'src/components/inputs/CMultiToggle.vue'
import CCheckbox from 'src/components/inputs/CCheckbox.vue'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import {
  updateDateFrom,
  updateDateUntil
} from 'src/scripts/libraries/utils/date'
import { SelectOption } from 'src/components/inputs/types'

const router = useRouter()
const { requiredFieldRule } = useFormValidation()
const refuelFilterStore = useRefuelFilterStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

type LocalFilter = {
  dateFrom: string
  dateUntil: string
}

const filter = computed<LocalFilter>(() => {
  return {
    dateFrom: date.formatDate(refuelFilterStore.filter.dateFrom, 'YYYY/MM/DD'),
    dateUntil: date.formatDate(refuelFilterStore.filter.dateUntil, 'YYYY/MM/DD')
  }
})

function updateDateFromInStore(event: string) {
  if (refuelFilterStore.filter)
    refuelFilterStore.filter.dateFrom = updateDateFrom(event)
}

function updateDateUntilInStore(event: string) {
  if (refuelFilterStore.filter)
    refuelFilterStore.filter.dateUntil = updateDateUntil(event)
}

const filterType = ref<SelectOption>(refuelFilterStore.filterTypeOptions[0]!)

function onSubmit() {
  refuelFilterStore.setFilter()
  void router.go(-1)
}

onBeforeMount(async () => {
  await refuelFilterStore.readFilter()
  const type = refuelFilterStore.filterTypeOptions.find(
    o => o.value == refuelFilterStore.filter.type
  )
  if (type) filterType.value = type
})

onMounted(() => {
  mainLayoutStore.titleText = t('filterRefuelsForm.title')
})
</script>
