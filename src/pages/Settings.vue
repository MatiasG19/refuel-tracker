<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header>Themes</q-item-label>
      <c-select class="q-pb-md" v-model="colorTheme" :options="colorThemeOptions" label="Color theme"/>

      <q-separator spaced />

      <q-item-label header>Units</q-item-label>
      <div>
        <c-input class="q-pb-md" v-model="currencyUnit" label="Currency unit"/>
        <c-select class="q-pb-md" v-model="distanceUnit" :options="distanceUnitOptions" label="Distance unit"/>
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
import { ref, onMounted } from 'vue'
import CInput from 'components/inputs/CInput.vue'
import CSelect from 'components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'

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

const distanceUnitOptions = [
  {
    label: 'km',
    value: 0
  },
  {
    label: 'miles',
    value: 1
  }
]

let currencyUnit = ref('€')
let distanceUnit = ref(1)
let colorTheme = ref(0)
let showPlateNumber = ref(false)

onMounted(() => {
  emitter.emit('updateTitle', 'Settings')
})

</script>
