<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col q-px-xs">
        <c-select
          v-model="groupBy"
          :label="t('chart.groupBy')"
          :options="grouByOptions"
          class="q-pb-md"
        />
      </div>
      <div class="col q-px-xs">
        <c-select
          v-model="dataSource"
          :label="t('chart.dataSource')"
          :options="dataSourceOptions"
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

ChartJS.register(Title, BarElement, CategoryScale, LinearScale)

const dateFrom = ref(new Date())
const dateFromString = computed(() =>
  date.formatDate(dateFrom.value, 'YYYY/MM/DD')
)
const dateUntil = ref(new Date())
const dateUntilString = computed(() =>
  date.formatDate(dateUntil.value, 'YYYY/MM/DD')
)

const settingsStore = useSettingsStore()
const chartStore = useChartStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })
const groupBy = ref(0)
const grouByOptions = [
  {
    value: 0,
    label: t('chart.groupByOptions.noGrouping')
  },
  {
    value: 1,
    label: t('chart.groupByOptions.year')
  },
  {
    value: 2,
    label: t('chart.groupByOptions.month')
  }
]

const dataSource = ref(0)
const dataSourceOptions = [
  {
    value: 0,
    label: t('chart.dataSourceOptions.fuelConsumption')
  },
  {
    value: 1,
    label: t('chart.dataSourceOptions.distanceDriven')
  },
  {
    value: 2,
    label: t('chart.dataSourceOptions.fuelBurnt')
  },
  {
    value: 3,
    label: t('chart.dataSourceOptions.refuelsMade')
  },
  {
    value: 4,
    label: t('chart.dataSourceOptions.fuelPricing')
  },
  {
    value: 5,
    label: t('chart.dataSourceOptions.moneySpent')
  }
]

const updated = ref(true)
const chartData = ref({
  labels: chartStore.refuels.map(r => r.date.toString()),
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#f87979',
      data: chartStore.refuels.map(r => r.refueledAmount)
    }
  ]
})

const chartOptions = {
  responsive: true
}

async function _updateDateFrom(date: string) {
  dateFrom.value = updateDateFrom(date)
  await updateChart()
}

async function _updateDateUntil(date: string) {
  dateUntil.value = updateDateUntil(date)
  await updateChart()
}

async function updateChart() {
  if (settingsStore.selectedVehicleId)
    await chartStore.readData(
      settingsStore.selectedVehicleId,
      dateFrom.value,
      dateUntil.value
    )

  chartData.value.labels = chartStore.refuels.map(r =>
    date.formatDate(r.date, 'YYYY/MM/DD')
  )
  chartData.value.datasets[0].data = chartStore.refuels.map(
    r => r.refueledAmount
  )
  updated.value = false
  setTimeout(() => {
    updated.value = true
  }, 100)
}

onMounted(async () => {
  if (Platform.is.mobile)
    await ScreenOrientation.lock({ orientation: 'landscape' })
  updated.value = true
  mainLayoutStore.titleText = t('chart.title')

  updateChart()
})
</script>
