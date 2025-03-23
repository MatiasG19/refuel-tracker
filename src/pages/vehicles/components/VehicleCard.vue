<template>
  <div>
    <q-card class="space-station shadow-none">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">
              {{ vehicle.totalFuelConsumption }}
              {{ vehicle.fuelUnit?.fuelConsumptionUnit }}
            </div>
          </div>

          <div class="col-auto space-station">
            <q-btn
              dense
              round
              flat
              icon="more_vert"
              @click.stop="emit('onOptionsClick', vehicle.id)"
            />
          </div>
        </div>

        <div class="text-h6 accent-space-station">{{ vehicle.name }}</div>
        <div class="text-subtitle1">{{ vehicle.plateNumber }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Vehicle } from 'src/scripts/libraries/refuel/models'

defineProps({
  vehicle: {
    type: Object as PropType<Vehicle>,
    required: true
  }
})

const emit = defineEmits(['onOptionsClick'])
</script>
