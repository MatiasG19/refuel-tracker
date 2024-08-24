<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col q-px-xs">
        <c-select
          v-model="chartStore.groupBy"
          :label="t('chart.groupBy')"
          :options="getGrouByOptions()"
          class="q-pb-md"
        />
      </div>
      <div class="col q-px-xs">
        <c-select
          v-model="chartStore.dataSource"
          :label="t('chart.dataSource')"
          :options="getDataSourceOptions()"
          class="q-pb-md"
        />
      </div>
      <div class="col q-px-xs">
        <c-date
          :modelValue="dateFromString"
          @update:modelValue="_updateDateFrom($event)"
          :label="t('chart.from')"
        />
      </div>
      <div class="col q-px-xs">
        <c-date
          :modelValue="dateUntilString"
          @update:modelValue="_updateDateUntil($event)"
          :label="t('chart.until')"
        />
      </div>
    </div>

    <div v-if="updated">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useChartStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { useI18n } from 'vue-i18n'
import messages from './i18n'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import CSelect from 'src/components/inputs/CSelect.vue'
import CDate from 'src/components/inputs/CDate.vue'
import { date, Platform } from 'quasar'
import {
  updateDateFrom,
  updateDateUntil
} from 'src/scripts/libraries/utils/date'
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { getGrouByOptions, getDataSourceOptions } from './scripts/staticData'
import { initSettings } from 'src/scripts/initSettings'

ChartJS.register(Title, BarElement, CategoryScale, LinearScale)

const dateFromString = computed(() =>
  date.formatDate(chartStore.fromDate, 'YYYY/MM/DD')
)

const dateUntilString = computed(() =>
  date.formatDate(chartStore.untilDate, 'YYYY/MM/DD')
)

const settingsStore = useSettingsStore()
const chartStore = useChartStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })
const updated = ref(true)
const chartData = ref({
  labels: chartStore.getChartData().labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#f87979',
      data: chartStore.getChartData().data
    }
  ]
})

const chartOptions = {
  responsive: true
}

async function _updateDateFrom(date: string) {
  chartStore.fromDate = updateDateFrom(date)
  await updateChart()
}

async function _updateDateUntil(date: string) {
  chartStore.untilDate = updateDateUntil(date)
  await updateChart()
}

async function updateChart() {
  if (settingsStore.selectedVehicleId)
    await chartStore.readData(settingsStore.selectedVehicleId)

  chartData.value.labels = chartStore.getChartData().labels
  chartData.value.datasets[0].data = chartStore.getChartData().data
  updated.value = false
  setTimeout(() => {
    updated.value = true
  }, 100)
}

onMounted(async () => {
  await initSettings() // TODO remove
  if (Platform.is.mobile)
    await ScreenOrientation.lock({ orientation: 'landscape' })
  updated.value = true
  mainLayoutStore.titleText = t('chart.title')

  updateChart()
})
</script>
