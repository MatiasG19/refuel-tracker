<template>
  <div>
    <q-card class="space-station shadow-none">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">
              {{
                parseFloat(
                  vehicle.totalFuelConsumption ?? '0'
                ).toFixedIfNotZero(2)
              }}
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
        <q-badge
          color="secondary"
          class="text-primary"
          :label="vehicle.plateNumber"
        />
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
