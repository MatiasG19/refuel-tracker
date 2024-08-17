<template>
  <q-page class="q-pa-md">
    <q-btn @click="up">Up</q-btn>
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
          :value="dateFrom"
          @value="
            evt => {
              dateFrom = evt
            }
          "
          :label="t('chart.from')"
        />
      </div>
    </div>

    <div v-if="updated">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
import { date } from 'quasar'
import { updateDateFrom } from 'src/scripts/libraries/utils/date'

ChartJS.register(Title, BarElement, CategoryScale, LinearScale)

function test(evt: string) {
  console.log(evt)
}

const dateFrom = ref('2020/12/19')

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
  labels: [12, 1, 3],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#f87979',
      data: [2, 1, 3]
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#ffff88',
      data: [1, 2, 5]
    },
    {
      label: 'My Second dataset',
      backgroundColor: '#11ff88',
      data: [10, 12, 15]
    }
  ]
})

const chartOptions = {
  responsive: true
}

function up() {
  updated.value = false
  chartData.value.labels = [2, 2, 2]
  chartData.value.datasets[0].data = chartData.value.datasets[0].data.map(() =>
    Math.floor(Math.random() * 100)
  )

  setTimeout(() => {
    updated.value = true
  }, 1)
}

onMounted(async () => {
  // up()
  updated.value = true
  mainLayoutStore.titleText = t('chart.title')
})
</script>
