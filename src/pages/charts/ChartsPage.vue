<template>
  <q-page>
    <div class="absolute-center items-center">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
// import { useChartsStore } from './stores'
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
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// const settingsStore = useSettingsStore()
// const chartsStore = useChartsStore()
// const mainLayoutStore = useMainLayoutStore()
// const { t } = useI18n({ useScope: 'local', messages })

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
}

const chartOptions = {
  responsive: true
}

onMounted(() => {
  // mainLayoutStore.titleText = t('chartsPage.title')
})
</script>
