<template>
  <q-page class="items-center">
    <q-btn @click="() => (showChart = !showChart)">Show Chart</q-btn>
    <q-dialog
      v-model="showChart"
      maximized
      class="space-station"
      transition-duration="150"
    >
      <div>
        <div class="column items-end">
          <div class="col">
            <q-btn @click="() => (showChart = false)" icon="close" flat></q-btn>
          </div>
        </div>
        <chart-page></chart-page>
      </div>
    </q-dialog>
    <div
      v-if="vehiclesExits && graphData.length === 0"
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        :label="i18n.global.t('placeholders.addRefuel')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/refuels/add')"
      />
    </div>
    <div v-else-if="!vehiclesExits" class="absolute-center">
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
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
          <Draggable v-for="data in graphData" :key="data.uid">
            <div :class="{ draggable: editOrder }">
              <graph-card
                class="q-pt-md q-pl-md q-pr-md"
                :graphData="data"
                :periods="periods"
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
import GraphCard from 'src/pages/graphData/components/GraphCard.vue'
import ChartPage from 'src/pages/graphData/components/chart/ChartPage.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import packageJson from '../../../package.json'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useGraphDataStore } from './stores/graphDataStore'
import { useMainLayoutStore } from 'src/layouts/stores'
import { Period } from 'src/pages/graphData/scripts/models'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { Container, Draggable, DropResult } from 'vue3-smooth-dnd'
import { App } from '@capacitor/app'
import { initSettings } from 'src/scripts/initSettings'
import { SplashScreen } from '@capacitor/splash-screen'

const $q = useQuasar()
$q.dark.set('auto')

const router = useRouter()
const graphDataStore = useGraphDataStore()
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const showChart = ref(false)
const loading = ref(false)
const editOrder = ref(false)
const periods = ref<Period[]>([])
const graphData = computed(() => graphDataStore.graphData)
const vehiclesExits = computed(() => settingsStore.selectedVehicleId)
const areaHeight = computed(() => `height: ${settingsStore.areaHeight}px`)
const optionsInDialog = ref([
  {
    text: computed(() => `${t('graphData.optionsInDialog.move')}`),
    icon: 'swap_vert',
    action: () => editOrderFun()
  },
  {
    text: computed(() => `${t('graphData.optionsInDialog.chart')}`),
    icon: 'bar_chart',
    action: () => (showChart.value = true)
  }
])

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
  else graphDataStore.readGraphData()
}

function saveOrder() {
  editOrder.value = false
  graphDataStore.saveCardOrder()
  mainLayoutStore.headerButton.visible = false
}

function updateTitle() {
  mainLayoutStore.titleText = (() => {
    if (!settingsStore.selectedVehicleId) return packageJson.productName
    else if (settingsStore.plateNumberInTitleActive)
      return settingsStore.selectedVehiclePlateNumber
    return settingsStore.selectedVehicleName
  })()
}

function onDrop(dropResult: DropResult) {
  graphDataStore.moveCard(dropResult)
}

onMounted(async () => {
  const timeOut = setTimeout(() => (loading.value = true), 200)
  await initSettings()
  periods.value = await graphDataStore.getPeriods()
  updateTitle()
  await graphDataStore.readGraphData()
  App.removeAllListeners()
  await App.addListener('backButton', () => {
    if (!editOrder.value) App.exitApp()
    editOrderFun(false)
  })
  clearTimeout(timeOut)
  loading.value = false
  SplashScreen.hide()
})

onUnmounted(() => {
  mainLayoutStore.hideButton(mainLayoutStore.headerButton)
  App.removeAllListeners()
})
</script>
