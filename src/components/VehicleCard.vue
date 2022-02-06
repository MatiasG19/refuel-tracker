<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ mileage }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn
              dense
              round
              flat
              icon="more_vert"
              @click.stop="emitter.emit('showVehicleOptionsDialog', true)"
            />
          </div>
        </div>

        <div class="text-h4 accent-space-station">{{ vehicle.name }}</div>
        <div class="text-subtitle1">{{ vehicle.plateNumber }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Vehicle } from 'src/scripts/models'
import { defineProps } from 'vue'
import { emitter } from 'src/boot/mitt'

const mileage = '5.6 L/100km'
defineProps({
  vehicle: {
    type: Vehicle,
    required: true
  }
})
</script>
