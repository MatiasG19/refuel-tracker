<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">
              {{ vehicle.fuelConsumption }}
              {{ vehicle.fuelUnit?.fuelConsumptionUnit }}
            </div>
          </div>

          <div class="col-auto space-station">
            <q-btn
              dense
              round
              flat
              icon="more_vert"
              @click.stop="emitter.emit('showVehicleOptionsDialog', vehicle.id)"
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
import { VehicleData } from 'src/scripts/libraries/refuel/models'
import { emitter } from 'src/boot/mitt'

defineProps({
  vehicle: {
    type: VehicleData,
    required: true
  }
})
</script>
