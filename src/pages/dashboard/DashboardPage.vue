<template>
  <q-page class="items-center">
    <q-dialog v-model="showChart" maximized transition-duration="150">
      <div class="bg-space-station">
        <div class="column items-end">
          <div class="col">
            <q-btn @click="() => (showChart = false)" icon="close" flat></q-btn>
          </div>
        </div>
        <chart-page :vehicle-id="chartVehicleId" />
      </div>
    </q-dialog>

    <div
      v-if="dashboardData.length === 0"
      class="column items-center absolute-center"
    >
      <q-icon name="bar_chart" size="100px" color="accent" />
      <q-btn
        class="row"
        color="accent"
        :label="i18n.global.t('placeholders.addVehicle')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <template v-if="loading">
        <q-spinner
          class="absolute-center"
          color="primary"
          size="3em"
          :thickness="10"
        />
      </template>
      <template v-else>
        <Container
          @drop="onDrop"
          lock-axis="y"
          :auto-scroll-enabled="true"
          drag-handle-selector=".draggable"
          class="scroll"
          :style="areaHeight"
        >
          <Draggable
            v-for="data in dashboardData"
            :key="data.id ?? data.title + data.subtitle"
          >
            <div :class="{ draggable: editOrder }">
              <dashboard-card
                class="q-pt-md q-pl-md q-pr-md"
                :dashboard-data="data"
                :shake-animation="editOrder"
                @on-long-press="editOrderFun()"
                @on-options-click="
                  payload => optionsDialog(optionsInDialog, payload)
                "
              />
            </div>
          </Draggable>
        </Container>
      </template>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import DashboardCard from 'src/pages/dashboard/components/DashboardCard.vue'
import ChartPage from 'src/pages/dashboard/components/chart/ChartPage.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useDashboardStore } from './stores/dashboardStore'
import { useMainLayoutStore } from 'src/layouts/stores'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { Platform, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { Container, Draggable, type DropResult } from 'vue3-smooth-dnd'
import { App } from '@capacitor/app'
import { initSettings } from 'src/scripts/initSettings'
import { SplashScreen } from '@capacitor/splash-screen'
import { DashboardData } from './scripts/models'
import { ThemeSetter } from 'src/plugins/capacitor-theme-setter'
import { getAddExpenseDialogOptions } from '../refuels/models'

const $q = useQuasar()
$q.dark.set('auto')

const router = useRouter()
const dashboardStore = useDashboardStore()
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const { addExpenseDialogOptions } = getAddExpenseDialogOptions()
const { t } = useI18n({ useScope: 'local', messages })

const showChart = ref(false)
const loading = ref(false)
const editOrder = ref(false)
const dashboardData = computed<DashboardData[]>(
  () => dashboardStore.dashboardData
)
const areaHeight = computed(() => `height: ${settingsStore.areaHeight}px`)
const chartVehicleId = ref(0)
const optionsInDialog: OptionInDialog[] = [
  {
    text: t('dashboardData.optionsInDialog.move'),
    icon: 'swap_vert',
    action: () => editOrderFun()
  },
  {
    text: t('dashboardData.optionsInDialog.chart'),
    icon: 'bar_chart',
    action: (data: unknown) => {
      chartVehicleId.value = (data as DashboardData).vehicleId
      showChart.value = true
    }
  }
]

function editOrderFun(value = true) {
  editOrder.value = value
  mainLayoutStore.headerButton.visible = value
  if (value)
    mainLayoutStore.showButton(
      mainLayoutStore.headerButton,
      () => saveOrder(),
      'save',
      false,
      'accent'
    )
  else dashboardStore.readDashboardData()
}

function saveOrder() {
  editOrder.value = false
  dashboardStore.saveDashboardOrder()
  mainLayoutStore.headerButton.visible = false
}

function onDrop(dropResult: DropResult) {
  dashboardStore.moveDashboard(dropResult)
}

async function init() {
  await initSettings()
  mainLayoutStore.addButton.action = () =>
    optionsDialog(addExpenseDialogOptions)
  router.beforeEach(() => {
    mainLayoutStore.addButton.action = () =>
      optionsDialog(addExpenseDialogOptions)
  })
}

onMounted(async () => {
  const timeOut = setTimeout(() => (loading.value = true), 200)
  await init()

  mainLayoutStore.titleText = t('title')
  await dashboardStore.readDashboardData()
  App.removeAllListeners()
  await App.addListener('backButton', () => {
    if (showChart.value) showChart.value = false
    else if (!editOrder.value) App.exitApp()
    else editOrderFun(false)
  })
  clearTimeout(timeOut)
  loading.value = false
  SplashScreen.hide()
  // Workaround for native theme not working on first load
  setTimeout(async () => {
    if (Platform.is.android || Platform.is.mobile)
      await ThemeSetter.setTheme({
        themeId: settingsStore.selectedColorThemeId
      })
  }, 300)
})

onUnmounted(() => {
  mainLayoutStore.hideButton(mainLayoutStore.headerButton)
  App.removeAllListeners()
})
</script>
