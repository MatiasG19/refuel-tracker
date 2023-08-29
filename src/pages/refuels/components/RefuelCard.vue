<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ refuelDate }}</div>
          </div>
          <div class="col-auto space-station">
            <q-btn
              dense
              round
              flat
              icon="more_vert"
              @click="emitter.emit('showRefuelOptionsDialog', refuel.id)"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-3">
            <div class="text-h5 accent-space-station">
              {{ fuelConsumption }}
            </div>
            <div class="text-subtitle1">
              {{ vehicle.fuelUnit?.fuelConsumptionUnit }}
            </div>
          </div>

          <div class="col-3">
            <div class="text-h5 accent-space-station">
              {{ refuel.distanceDriven }}
            </div>
            <div class="text-subtitle1">
              {{ vehicle.fuelUnit?.distanceUnit }}
            </div>
          </div>
          <div class="col-3">
            <div class="text-h5 accent-space-station">
              {{ refuel.payedAmount }}
            </div>
            <div class="text-subtitle1">{{ vehicle.currencyUnit }}</div>
          </div>
          <div class="col-3">
            <div class="text-h5 accent-space-station">
              {{ refuel.refueledAmount }}
            </div>
            <div class="text-subtitle1">{{ vehicle.fuelUnit?.fuelUnit }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { date } from 'quasar'
import { emitter } from 'src/boot/mitt'

const props = defineProps({
  refuel: {
    type: Refuel,
    required: true
  },
  vehicle: {
    type: Vehicle,
    required: true
  },
  fuelConsumption: {
    type: String,
    required: true
  }
})

const refuelDate = date.formatDate(props.refuel.date, 'YYYY-MMM-DD HH:mm')
</script>
