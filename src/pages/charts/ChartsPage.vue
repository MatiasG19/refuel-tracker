<template>
  <q-page>
    <q-btn @click="up">Up</q-btn>
    <div v-if="updated">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useChartsStore } from './stores'
// import { useMainLayoutStore } from 'src/layouts/stores'
// import { useI18n } from 'vue-i18n'
// import { i18n } from 'src/boot/i18n'
// import messages from './i18n'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const settingsStore = useSettingsStore()
const chartsStore = useChartsStore()
// const mainLayoutStore = useMainLayoutStore()
// const { t } = useI18n({ useScope: 'local', messages })

const updated = ref(false)
const chartData = ref({
  labels: [12, 1, 3],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#f87979',
      data: [2, 1, 3]
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
  up()
  updated.value = true
  // mainLayoutStore.titleText = t('chartsPage.title')
})
</script>
