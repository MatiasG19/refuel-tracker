<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ mileage }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert" @click="dialogVisible = true" />
          </div>
        </div>

        <div class="text-h4 accent-space-station">{{ data.name }}</div>
        <div class="text-subtitle1">{{ data.plateNumber }}</div>
      </q-card-section>
    </q-card>
    <options-dialog
      v-model:dialogVisible="dialogVisible"
      :options="optionsInDialog as OptionInDialog[]"
    />
  </div>
</template>

<script setup lang="ts">
import { VehicleEntry, OptionInDialog } from 'src/components/models'
import { defineProps, ref } from 'vue'
import OptionsDialog from 'src/components/OptionsDialog.vue'

const mileage = '5.6 L/100km'
defineProps({
  data: {
    type: VehicleEntry,
    required: true
  },
  optionsInDialog: {
    type: Array
  }
})

let dialogVisible = ref(false)

</script>
