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
        <div>
          <div class="text-h4 accent-space-station">{{ graphData.value }}</div>
          <div class="text-subtitle1">{{ graphData.unit }}</div>
        </div>
      </q-card-section>

      <q-card-section class="accent-space-station" v-if="false">
        Graph-Graph-Graph-Graph-Graph-Graph-Graph
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
import { GraphData } from 'src/scripts/libraries/graphData/models'
import { defineProps } from 'vue'
import { emitter } from 'src/boot/mitt'

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
</script>
