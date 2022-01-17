<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header>Themes</q-item-label>
      <q-select class="q-pb-md" standout="bg-teal text-white" v-model="colorTheme" 
      :options="colorThemeOptions" label="Color theme" map-options emit-value/>

      <q-separator spaced />

      <q-item-label header>Units</q-item-label>
      <div >
        <q-input class="q-pb-md" standout="bg-teal text-white" v-model="fuelUnit" 
          label="Fuel unit" />
        <q-input class="q-pb-md" standout="bg-teal text-white" v-model="currencyUnit" 
          label="Currency unit" />
      </div>

      <q-separator spaced />

      <q-item-label header>Other</q-item-label>
      <q-list class="q-pb-md">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Show plate number in car title</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle v-model="showPlateNumber" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-list>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colorThemeOptions = [
  {
    label: 'Space Station',
    value: 0
  },
  {
    label: 'Dark',
    value: 1
  },
  {
    label: 'Light',
    value: 2
  },
  {
    label: 'High Contrast',
    value: 3
  },
  {
    label: 'Red Green Weakness',
    value: 4
  }
]

let fuelUnit = ref('L/100km')
let currencyUnit = ref('€')
let colorTheme = ref(0)
let showPlateNumber = ref(false)

</script>
