<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ graphData.title }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn
              dense
              round
              flat
              icon="more_vert"
              @click="emitter.emit('showGraphOptionsDialog', graphData)"
            />
          </div>
        </div>
        <div class="row items-center no-wrap">
          <div class="col-4">
            <div class="text-h4 accent-space-station">
              {{ graphData.value }}
            </div>
            <div class="text-subtitle1">{{ graphData.unit }}</div>
          </div>
          <div class="col" style="height:70px">
            <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="accent-space-station" v-if="false">
      </q-card-section>

      <q-card-actions v-if="false">
        <div v-for="(period, i) in periods" :key="i" class="col text-center">
          <q-btn :ripple="false" dense flat no-caps class="space-station">{{
            periods[i].name
          }}</q-btn>
          <q-separator vertical />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { GraphData } from '../scripts/models'
import { emitter } from 'src/boot/mitt'
import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'

defineProps({
  graphData: {
    type: GraphData,
    required: true
  },
  periods: {
    type: Array,
    required: true
  }
})

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'Mai', 'June', 'July'],
  datasets: [{ data: [40, 39, 10, 40, 39, 80, 40], backgroundColor: '#60EFB3' }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
}
</script>
