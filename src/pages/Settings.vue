<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <template v-if="false">
        <q-item-label header>Themes</q-item-label>
        <c-select
          class="q-pb-md"
          v-model="colorTheme"
          @update:model-value="changeColorTheme"
          :options="colorThemeOptions"
          label="Color theme"
        />

        <q-separator spaced />
      </template>

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
import { useSettingsStore } from 'src/stores'

const settingsStore = useSettingsStore()

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

// const distanceUnitOptions = [
//   {
//     label: 'km',
//     value: 1
//   },
//   {
//     label: 'miles',
//     value: 2
//   }
// ]

const colorTheme = ref(settingsStore.selectedColorThemeId)
// const distanceUnit = ref(settingsStore.selectedDistanceUnitId)
const plateNumberInTitle = ref(settingsStore.plateNumberInTitleActive)

function changeColorTheme(value: number) {
  settingsStore.changeColorTheme(value)
}

// function changeDistanceUnit(value: number) {
//   settingsStore.changeDistanceUnit(value)
// }

function togglePlateNumberInTitle(value: boolean) {
  settingsStore.togglePlateNumberInTitle(value)
}

onMounted(() => {
  emitter.emit('updateTitle', 'Settings')
})
</script>
