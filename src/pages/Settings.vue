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

      <q-item-label header>Options</q-item-label>
      <q-list class="q-pb-md">
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Show number plate title</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-model="plateNumberInTitle"
              @update:model-value="togglePlateNumberInTitle"
              color="positive"
            />
          </q-item-section>
        </q-item>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Start feature tour</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              label="Tour"
              color="positive"
              class="btn"
              no-caps
              @click="takeTour"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-item-label header>Backup</q-item-label>
      <q-list class="q-pb-md">
        <template v-if="false">
          <q-item tag="label">
            <q-item-section>
              <q-item-label>Auto backup</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                v-model="autoBackup"
                @update:model-value="toggleAutoBackup"
                color="positive"
              />
            </q-item-section>
          </q-item>

          <q-item tag="label">
            <q-item-section>
              <q-item-label>Auto backup folder</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                label="Change"
                no-caps
                color="positive"
                class="btn"
                :disable="!autoBackup"
                @click="chooseAutoBackupFolder"
              />
            </q-item-section>
          </q-item>
        </template>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>Export</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              label="Export"
              color="positive"
              no-caps
              class="btn"
              @click="exportBackup"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label>Import</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              label="Import"
              color="positive"
              class="btn"
              no-caps
              @click="importBackup"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'
import { useSettingsStore } from 'src/stores/settingsStore'
import { exportDB, importDB } from 'src/scripts/libraries/backup/backup'
import { FilePicker } from 'src/plugins/capacitor-file-picker'
import { Notify, Platform } from 'quasar'
import { useFeatureStore } from './featureTour/stores/featureTourStore'
import { useRouter } from 'vue-router'

type GetContentResultAction = (result: { path: string }) => void
let getContentResultAction: GetContentResultAction

type OpenDocumentTreeResultAction = (result: { path: string }) => void
let openDocumentTreeResultAction: OpenDocumentTreeResultAction

const router = useRouter()
const settingsStore = useSettingsStore()
const featureTourStore = useFeatureStore()

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
const colorTheme = ref(settingsStore.selectedColorThemeId)
const plateNumberInTitle = ref(settingsStore.plateNumberInTitleActive)
const autoBackup = ref(settingsStore.autoBackupActive)

function changeColorTheme(value: number) {
  settingsStore.changeColorTheme(value)
}

function togglePlateNumberInTitle(value: boolean) {
  settingsStore.togglePlateNumberInTitle(value)
}

function takeTour() {
  featureTourStore.startTour()
  router.push('/')
}

async function toggleAutoBackup(value: boolean) {
  if (value) {
    if (Platform.is.mobile) {
      await FilePicker.openDocumentTree() // Pick directory when activating auto backup
    }
  }
  settingsStore.toggleAutoBackup(value)
}

async function chooseAutoBackupFolder() {
  if (Platform.is.mobile) {
    await FilePicker.openDocumentTree()
  }
}

async function exportBackup() {
  openDocumentTreeResultAction = result => {
    ;(async () => {
      settingsStore.setAutoBackupPath(result.path)
      await exportDB(result.path)
      Notify.create('Backup exported')
    })()
  }
  if (Platform.is.mobile) {
    await FilePicker.openDocumentTree()
  }
}

async function importBackup() {
  getContentResultAction = result => {
    ;(async () => {
      await importDB(result.path)
      Notify.create('Backup imported')
    })()
  }
  if (Platform.is.mobile) {
    await FilePicker.getContent({ mimeType: '*/*' })
  }
}

onMounted(() => {
  emitter.emit('updateTitle', 'Settings')
  if (Platform.is.mobile) {
    FilePicker.addListener('getContentResult', res => {
      getContentResultAction(res)
    })
    FilePicker.addListener('openDocumentTreeResult', res => {
      openDocumentTreeResultAction(res)
    })
  }
})

onUnmounted(() => {
  if (Platform.is.mobile) {
    FilePicker.removeAllListeners()
  }
})
</script>

<style scoped>
.btn {
  width: 20vh;
}
</style>
