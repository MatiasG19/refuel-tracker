<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <q-input standout="bg-teal text-white" v-model="filterDate" label="Filter until date">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="filterDate" />
          <div class="row items-center">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </q-input>
      <q-select standout="bg-teal text-white" v-model="timeInterval" :options="options"
        label="Filter last" map-options emit-value/>

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps @click="$router.push('/refuels')" />
      <q-btn color="positive" label="Filter" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

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

let filterDate = ref<string>(date.formatDate(Date.now(), 'YYYY/MM/DD'))
let timeInterval = ref<number>(2)

function onSubmit(evt?: SubmitEvent) {

  void router.push('/refuels')
}

</script>
