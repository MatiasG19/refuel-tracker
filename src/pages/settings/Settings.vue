<template>
  <div class="q-pa-md q-gutter-md">
    <q-list>
      <q-item-label header
        ><span class="bg-space-station">{{
          t('sections.settings.title')
        }}</span></q-item-label
      >
      <q-list class="q-pb-md">
        <c-select
          v-model="currentLanguage"
          @update:model-value="changeLanguage"
          :options="[
            { label: t('systemLanguage'), value: LanugageId.System },
            ...languageOptions
          ]"
          class="q-pb-md"
          :label="t('sections.settings.language')"
        />

        <c-select
          class="q-pb-md"
          v-model="colorTheme"
          @update:model-value="changeColorTheme"
          :options="colorThemeOptions"
          :label="t('sections.settings.colorTheme.label')"
        />

        <q-item tag="label">
          <q-item-section>
            <q-item-label
              ><span class="bg-space-station">{{
                t('sections.settings.licensePlateInTitle')
              }}</span></q-item-label
            >
          </q-item-section>
          <q-item-section avatar>
            <q-toggle
              v-model="plateNumberInTitle"
              @update:model-value="togglePlateNumberInTitle"
              color="accent"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <q-item-label header
        ><span class="bg-space-station">{{
          t('sections.backup.title')
        }}</span></q-item-label
      >
      <q-list class="q-pb-md">
        <template v-if="false">
          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{ t('sections.backup.autoBackup') }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle
                v-model="autoBackup"
                @update:model-value="toggleAutoBackup"
                color="accent"
              />
            </q-item-section>
          </q-item>

          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                t('sections.backup.autoBackupFolder')
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-btn
                :label="t('sections.backup.change')"
                color="accent"
                :disable="!autoBackup"
                @click="chooseAutoBackupFolder"
              />
            </q-item-section>
          </q-item>
        </template>
        <q-item tag="label">
          <q-item-section>
            <q-item-label class="bg-space-station">{{
              t('sections.backup.export')
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t('sections.backup.export')"
              color="accent"
              @click="exportBackup"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label">
          <q-item-section>
            <q-item-label class="bg-space-station">{{
              t('sections.backup.import')
            }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn
              :label="t('sections.backup.import')"
              color="accent"
              @click="importBackup"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { exportDB, importDB } from 'src/scripts/libraries/backup/backup'
import { FilePicker } from 'src/plugins/capacitor-file-picker'
import { Notify, Platform } from 'quasar'
import { SelectOption } from 'src/scripts/models'
import { useI18n } from 'vue-i18n'
import messages from './i18n'
import {
  getLanguageOptions,
  setI18nLanguage
} from 'src/scripts/libraries/utils/language'
import { LanugageId } from '../../scripts/models'
import { useMainLayoutStore } from 'src/layouts/stores'
import { getColorThemes } from 'src/scripts/staticData/colorThemes'

const { t } = useI18n({ useScope: 'global', messages })
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()

type GetContentResultAction = (result: { path: string }) => void
let getContentResultAction: GetContentResultAction

type OpenDocumentTreeResultAction = (result: { path: string }) => void
let openDocumentTreeResultAction: OpenDocumentTreeResultAction

const currentLanguage = ref(1)
const languageOptions = ref<SelectOption[]>(getLanguageOptions())
const colorThemeOptions = computed(() => getColorThemes())
const colorTheme = ref(settingsStore.selectedColorThemeId)
const plateNumberInTitle = ref(settingsStore.plateNumberInTitleActive)
const autoBackup = ref(settingsStore.autoBackupActive)

function changeColorTheme(value: number) {
  document.documentElement.className = colorThemeOptions.value[value].className
  settingsStore.changeColorTheme(value)
}

async function changeLanguage(languageId: number) {
  settingsStore.changeLanguage(languageId)
  await setI18nLanguage(languageId)
  mainLayoutStore.titleText = t('title')
}

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

onMounted(async () => {
  mainLayoutStore.titleText = t('title')
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
