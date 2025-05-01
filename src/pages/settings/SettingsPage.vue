<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header
        ><span class="bg-space-station">{{
          t[settingsStore.locale]['sections']['settings']['title']
        }}</span></q-item-label
      >
      <q-list class="q-pb-md">
        <c-select
          v-model="currentLanguage"
          @update:model-value="changeLanguage"
          :options="[
            {
              label: gt[settingsStore.locale]['systemLanguage'],
              value: LanguageId.System
            },
            ...languageOptions
          ]"
          class="q-pb-md"
          :label="t[settingsStore.locale]['sections']['settings']['language']"
        />

        <c-select
          class="q-pb-md"
          v-model="colorTheme"
          @update:model-value="changeColorTheme"
          :options="settingsStore.getColorThemes"
          :label="
            t[settingsStore.locale]['sections']['settings']['colorTheme'][
              'label'
            ]
          "
        />
      </q-list>

      <q-item-label header
        ><span class="bg-space-station">{{
          t[settingsStore.locale]['sections']['backup']['title']
        }}</span></q-item-label
      >
      <q-list class="q-pb-md">
        <template v-if="false">
          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                t[settingsStore.locale]['sections']['backup']['autoBackup']
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                v-model="autoBackup"
                @update:model-value="toggleAutoBackup"
                color="primary"
                class="text-default"
              />
            </q-item-section>
          </q-item>

          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                t[settingsStore.locale]['sections']['backup'][
                  'autoBackupFolder'
                ]
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                :label="t[settingsStore.locale]['sections']['backup']['change']"
                color="primary"
                class="text-default"
                :disable="!autoBackup"
                @click="chooseAutoBackupFolder"
              />
            </q-item-section>
          </q-item>
        </template>
        <q-item tag="label">
          <q-item-section>
            <q-item-label class="bg-space-station">{{
              t[settingsStore.locale]['sections']['backup']['export']
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t[settingsStore.locale]['sections']['backup']['export']"
              color="primary"
              class="text-default"
              @click="exportBackup"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label class="bg-space-station">{{
              t[settingsStore.locale]['sections']['backup']['import']
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t[settingsStore.locale]['sections']['backup']['import']"
              color="primary"
              class="text-default"
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
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { exportDB, importDB } from 'src/scripts/libraries/backup/backup'
import { FilePicker } from 'src/plugins/capacitor-file-picker'
import { Notify, Platform } from 'quasar'
import gt from '../../i18n'
import t from './i18n'
import { getLanguageOptions } from 'src/scripts/libraries/utils/language'
import { LanguageId } from '../../scripts/models'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'
import { SelectOption } from 'src/components/inputs/types'

const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()

type GetContentResultAction = (result: { path: string }) => void
let getContentResultAction: GetContentResultAction

type OpenDocumentTreeResultAction = (result: { path: string }) => void
let openDocumentTreeResultAction: OpenDocumentTreeResultAction

const currentLanguage = ref(1)
const languageOptions = ref<SelectOption[]>(getLanguageOptions())
const colorTheme = ref(settingsStore.selectedColorThemeId)
const autoBackup = ref(settingsStore.autoBackupActive)

async function changeColorTheme(value: number) {
  await settingsStore.changeColorTheme(value)
}

async function changeLanguage(languageId: number) {
  settingsStore.changeLanguage(languageId)
  mainLayoutStore.titleText = t[settingsStore.locale]['title']
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

onMounted(async () => {
  mainLayoutStore.titleText = t[settingsStore.locale]['title']
  currentLanguage.value = settingsStore.selectedLanguageId
  if (Platform.is.mobile) {
    await FilePicker.addListener('getContentResult', res => {
      getContentResultAction(res)
    })
    await FilePicker.addListener('openDocumentTreeResult', res => {
      openDocumentTreeResultAction(res)
    })
  }
})

onUnmounted(async () => {
  if (Platform.is.mobile) {
    await FilePicker.removeAllListeners()
  }
})
</script>
