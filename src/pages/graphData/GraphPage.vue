<template>
  <div>
    TODO
    <div>- Filter Selector</div>
    <div>- data selector (distance driven, fuel burnt, etc.)</div>
    <div>- compare data (e.g. compare this month with last)</div>
    <div>- Vertical view</div>
  </div>
  <q-page>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
})
const chartOptions = ref({
  responsive: true
})
</script>
