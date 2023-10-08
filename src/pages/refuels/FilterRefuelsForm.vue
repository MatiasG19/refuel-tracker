<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        color="accent"
        :value="filterDateFrom"
        label="Filter from"
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
        label="Filter until"
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

      <div class="q-gutter-sm">
        <q-btn
          color="negative"
          label="Cancel"
          no-caps
          @click="$router.push('/refuels')"
        />
        <q-btn color="positive" label="Filter" type="submit" no-caps />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { requiredFieldRule } from 'src/scripts/libraries/validation'
import { useRefuelFilterStore } from './stores/refuelFilterStore'
import CInput from 'src/components/inputs/CInput.vue'

const router = useRouter()
const refuelFilterStore = useRefuelFilterStore()

const filterDateFrom = ref<string>(date.formatDate(Date.now(), 'YYYY/MM/DD'))
const filterDateUntil = ref<string>(date.formatDate(Date.now(), 'YYYY/MM/DD'))

function updateDateFrom(event: string) {
  refuelFilterStore.dateFrom = new Date(event)
  filterDateFrom.value = date.formatDate(
    refuelFilterStore.dateFrom,
    'YYYY/MM/DD'
  )
  console.log(date.formatDate(refuelFilterStore.dateFrom, 'YYYY/MM/DD'))
}

function updateDateUntil(event: string) {
  refuelFilterStore.dateUntil = new Date(event)
  filterDateUntil.value = date.formatDate(
    refuelFilterStore.dateUntil,
    'YYYY/MM/DD'
  )
}

function onSubmit() {
  refuelFilterStore.setFilter()
  void router.push('/refuels')
}

onMounted(() => {
  emitter.emit('updateTitle', 'Filter refuels')
})
</script>
