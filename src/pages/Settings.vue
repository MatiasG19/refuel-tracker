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

      <q-item-label header>Settings</q-item-label>
      <q-list class="q-pb-md">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Show plate number in car title</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-model="plateNumberInTitle"
              @update:model-value="togglePlateNumberInTitle"
              color="positive"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-item-label header>Backup</q-item-label>
      <q-list class="q-pb-md">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Export</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn label="Export" color="positive" @click="exportBackup" />
          </q-item-section>
        </q-item>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Import</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn label="Import" color="positive" @click="importBackup" />
            <q-btn label="File" color="positive" @click="testFile" />
            <q-btn label="Files" color="positive" @click="testFiles" />
            <q-btn label="Dir" color="positive" @click="testDir" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-list>
    <div>T: {{ testiFile }}</div>
    <div>T: {{ testiFiles }}</div>
    <div>T: {{ testiDirs }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'
import { useSettingsStore } from 'src/stores'
import { exportDB, importDB } from 'src/scripts/libraries/backup/backup'
import { FilePicker } from 'src/plugins/capacitor-file-picker'

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

async function exportBackup() {
  await FilePicker.pickDir()
}

async function importBackup() {
  await FilePicker.pickFile({ mimeType: '*/*' })
}

const testiFile = ref<string>('Nöscht')
const testiFiles = ref<string[]>(['Nöscht'])
const testiDirs = ref<string>('Nöscht')

async function testFile() {
  await FilePicker.pickFile({ mimeType: '*/*' })
}

async function testFiles() {
  await FilePicker.pickFiles({ mimeType: '*/*' })
}

async function testDir() {
  await FilePicker.pickDir()
}

onMounted(() => {
  emitter.emit('updateTitle', 'Settings')
  FilePicker.addListener('filePathResult', result => {
    ;(async () => {
      await importDB(result.path)
      testiFile.value = result.path
      console.log('filePathResult: ' + result.path)
    })()
  })
  FilePicker.addListener(
    'filePathResults',
    res => (testiFiles.value = res.paths.split(','))
  )
  FilePicker.addListener('dirPathResult', result => {
    ;(async () => {
      await exportDB(result.path)
      testiDirs.value = result.path
      console.log('dirPathResult: ' + result.path)
    })()
  })
})

onUnmounted(() => {
  FilePicker.removeAllListeners()
})
</script>
