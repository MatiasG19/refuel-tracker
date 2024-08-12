<template>
  <q-page>
    <q-btn @click="test"> </q-btn>
    <div class="absolute-center items-center">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const settingsStore = useSettingsStore()
const chartsStore = useChartsStore()
// const mainLayoutStore = useMainLayoutStore()
// const { t } = useI18n({ useScope: 'local', messages })

async function test() {
  console.log(chartsStore.refuels)

  await chartsStore.readData(
    settingsStore.selectedVehicleId.value ?? 0,
    new Date(),
    new Date()
  )
}

const chartData = {
  labels: [],
  datasets: [{ data: [40, 20, 12] }]
}

const chartOptions = {
  responsive: true
}

onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // chartData.labels = chartsStore.refuels.value.map(r => r.date.toString())
  // chartData.datasets = [
  //   { data: chartsStore.refuels.value.map(r => r.payedAmount.toString()) }
  // ]
  // mainLayoutStore.titleText = t('chartsPage.title')
})
</script>
