<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ data.title }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert" @click="dialogVisible = true" />
          </div>
        </div>
        <div>
          <div class="text-h4 accent-space-station">{{ data.value }}</div>
          <div class="text-subtitle1">{{ data.unit }}</div>
        </div>
      </q-card-section>

      <q-card-section class="accent-space-station" v-if="false">
        Graph-Graph-Graph-Graph-Graph-Graph-Graph
      </q-card-section>

      <q-card-actions v-if="false">
        <div v-for="(period, i) in periods" :key="i" class="col text-center">
          <q-btn :ripple="false" dense flat no-caps class="space-station">{{ periods[i] }}</q-btn>
          <q-separator vertical/>
        </div>
      </q-card-actions>
    </q-card>
    <options-dialog
      v-model:dialogVisible="dialogVisible"
      :options="optionsInDialog as OptionInDialog[]"
    />
  </div>
</template>

<script setup lang="ts">
import { GraphData, OptionInDialog } from 'src/scripts/models'
import { defineProps, ref } from 'vue'
import OptionsDialog from 'src/components/OptionsDialog.vue'

defineProps({
  data: {
    type: GraphData,
    required: true
  },
  periods: {
    type: Array,
    required: true
  },
  optionsInDialog: {
    type: Array
  }
})

let dialogVisible = ref(false)

</script>
