<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header>Themes</q-item-label>
      <c-select
        class="q-pb-md"
        v-model="colorTheme"
        @update:model-value="changeColorTheme"
        :options="colorThemeOptions"
        label="Color theme"
      />

      <q-separator spaced />

      <q-item-label header>Units</q-item-label>
      <div>
        <c-select
          class="q-pb-md"
          v-model="distanceUnit"
          @update:model-value="changeDistanceUnit"
          :options="distanceUnitOptions"
          label="Distance unit"
        />
      </div>

      <q-separator spaced />

      <q-item-label header>Other</q-item-label>
      <q-list class="q-pb-md">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Show plate number in car title</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-model="plateNumberInTitle"
              @update:model-value="togglePlateNumberInTitle"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'
import { useMainStore, useRefuelStore } from 'src/stores'

const mainStore = useMainStore()
const refuelStore = useRefuelStore()

const colorThemeOptions = [
  {
    label: 'Space Station',
    value: 1
  },
  {
    label: 'Dark',
    value: 2
  },
  {
    label: 'Light',
    value: 3
  },
  {
    label: 'High Contrast',
    value: 4
  },
  {
    label: 'Red Green Weakness',
    value: 5
  }
]

const distanceUnitOptions = [
  {
    label: 'km',
    value: 1
  },
  {
    label: 'miles',
    value: 2
  }
]

const colorTheme = ref(mainStore.$state.selectedColorThemeId)
const distanceUnit = ref(refuelStore.$state.selectedDistanceUnitId)
const plateNumberInTitle = ref(refuelStore.$state.plateNumberInTitleActive)

function changeColorTheme(value: number) {
  mainStore.changeColorTheme(value)
}

function changeDistanceUnit(value: number) {
  refuelStore.changeDistanceUnit(value)
}

function togglePlateNumberInTitle(value: boolean) {
  refuelStore.togglePlateNumberInTitle(value)
}

onMounted(() => {
  emitter.emit('updateTitle', 'Settings')
})
</script>
