<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header>{{
        t('pages.settings.sections.settings.title')
      }}</q-item-label>
      <q-list class="q-pb-md">
        <c-select
          v-model="currentLanguage"
          @update:model-value="changeLanguage"
          :options="languageOptions"
          class="q-pb-md"
          :label="t('pages.settings.sections.settings.language')"
        />

        <c-select
          v-if="false"
          class="q-pb-md"
          v-model="colorTheme"
          @update:model-value="changeColorTheme"
          :options="colorThemeOptions"
          :label="t('pages.settings.sections.settings.colorTheme')"
        />

        <q-item tag="label">
          <q-item-section>
            <q-item-label>{{
              t('pages.settings.sections.settings.licensePlateInTitle')
            }}</q-item-label>
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

      <q-item-label header>{{
        t('pages.settings.sections.backup.title')
      }}</q-item-label>
      <q-list class="q-pb-md">
        <template v-if="false">
          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                t('pages.settings.sections.backup.autoBackup')
              }}</q-item-label>
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
              <q-item-label>{{
                t('pages.settings.sections.backup.autoBackupFolder')
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                :label="t('pages.settings.sections.backup.change')"
                color="positive"
                :disable="!autoBackup"
                @click="chooseAutoBackupFolder"
              />
            </q-item-section>
          </q-item>
        </template>
        <q-item tag="label">
          <q-item-section>
            <q-item-label>{{
              t('pages.settings.sections.backup.export')
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t('pages.settings.sections.backup.export')"
              color="positive"
              @click="exportBackup"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label>{{
              t('pages.settings.sections.backup.import')
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t('pages.settings.sections.backup.import')"
              color="positive"
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
import { SelectOption } from 'src/scripts/models'
import { useI18n } from 'vue-i18n'
import {
  getLanguageOptions,
  getLanguages
} from 'src/scripts/staticData/languages'
import { Device } from '@capacitor/device'

const { t, locale } = useI18n()
const settingsStore = useSettingsStore()

type GetContentResultAction = (result: { path: string }) => void
let getContentResultAction: GetContentResultAction

type OpenDocumentTreeResultAction = (result: { path: string }) => void
let openDocumentTreeResultAction: OpenDocumentTreeResultAction

const currentLanguage = ref(1)
const languageOptions = ref<SelectOption[]>(getLanguageOptions())
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
const autoBackup = ref(settingsStore.autoBackupActive)

function changeColorTheme(value: number) {
  settingsStore.changeColorTheme(value)
}

async function changeLanguage(value: number) {
  settingsStore.changeLanguage(value)
  const lang = getLanguages().find(l => l.id === value)
  if (lang) {
    if (lang.id === 1) locale.value = (await Device.getLanguageCode()).value
    else locale.value = lang.code
    emitter.emit('updateTitle', t('pages.settings.title'))
  }
}

// function changeDistanceUnit(value: number) {
//   settingsStore.changeDistanceUnit(value)
// }

function togglePlateNumberInTitle(value: boolean) {
  settingsStore.togglePlateNumberInTitle(value)
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
  emitter.emit('updateTitle', t('pages.settings.title'))
  currentLanguage.value = settingsStore.selectedLanguageId
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
