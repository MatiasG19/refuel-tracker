<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ data.title }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list class="el-space-station">
                  <q-item>
                    <q-item-section>Move up</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Move down</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div>
          <div class="text-h4 accent-space-station">{{ data.value }}</div>
          <div class="text-subtitle1">{{ data.unit }}</div>
        </div>
      </q-card-section>

      <q-card-section class="accent-space-station">
        Graph-Graph-Graph-Graph-Graph-Graph-Graph
      </q-card-section>

      <q-card-actions>
        <div v-for="(period, i) in periods" :key="i" class="col text-center">
          <q-btn :ripple="false" dense flat class="space-station">{{ periods[i] }}</q-btn>
          <q-separator vertical/>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { GraphData } from 'src/components/models'
import { defineProps } from 'vue'


defineProps({
  data: {
    type: GraphData,
    required: true
  },
  periods: {
    type: Array,
    required: true
  }
})

</script>
