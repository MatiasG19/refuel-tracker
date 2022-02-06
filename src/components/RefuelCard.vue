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
              @click="emitter.emit('showRefuelOptionsDialog', true)"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="text-h4 accent-space-station">
              {{ refuel.distanceDriven }}
            </div>
            <div class="text-subtitle1">{{ distanceUnit }}</div>
          </div>
          <div class="col">
            <div class="text-h4 accent-space-station">
              {{ refuel.payedAmount }}
            </div>
            <div class="text-subtitle1">{{ currencyUnit }}</div>
          </div>
          <div class="col">
            <div class="text-h4 accent-space-station">
              {{ refuel.refuelAmount }}
            </div>
            <div class="text-subtitle1">{{ fuelUnit }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Refuel } from 'src/scripts/models'
import { defineProps } from 'vue'
import { date } from 'quasar'
import { emitter } from 'src/boot/mitt'

const props = defineProps({
  refuel: {
    type: Refuel,
    required: true
  }
})

const refuelDate = date.formatDate(props.refuel.date, 'YYYY-MMM-DD HH:mm')

const fuelUnit = 'Liter'
const currencyUnit = '€'
const distanceUnit = 'km'
</script>
