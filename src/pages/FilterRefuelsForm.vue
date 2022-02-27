<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <q-input
        outlined
        color="accent"
        v-model="filterDate"
        label="Filter until date"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="filterDate" />
          <div class="row items-center">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </q-input>
      <q-select
        outlined
        color="accent"
        v-model="timeInterval"
        :options="options"
        label="Filter last"
        map-options
        emit-value
      />

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
import { useMainStore } from 'src/stores'
import { requiredFieldRule } from 'src/scripts/validationRules'

const router = useRouter()
const mainStore = useMainStore()

const options = [
  {
    label: '1 Day',
    value: 0
  },
  {
    label: '1 Week',
    value: 1
  },
  {
    label: '1 Month',
    value: 2
  },
  {
    label: '3 Months',
    value: 3
  },
  {
    label: '6 Months',
    value: 4
  },
  {
    label: '1 Year',
    value: 5
  }
]

const filterDate = ref<string>(date.formatDate(Date.now(), 'YYYY/MM/DD'))
const timeInterval = ref<number>(2)

function onSubmit() {
  mainStore.toggleRefuelFilter(true)
  void router.push('/refuels')
}

onMounted(() => {
  emitter.emit('updateTitle', 'Filter refuels')
})
</script>
