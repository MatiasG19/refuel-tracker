<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ refuelDate }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list class="el-space-station">
                  <q-item clickable>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-h4 accent-space-station">{{ data.refuelAmount }}</div>
          <div class="text-subtitle1">{{ fuelUnit }}</div>
          </div>
          <div class="col">
            <div class="text-h4 accent-space-station">{{ data.payedAmount }}</div>
            <div class="text-subtitle1">{{ currencyUnit }}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { RefuelEntry } from 'src/components/models'
import { defineProps } from 'vue'
import { date } from 'quasar'

const props = defineProps({
  data: {
    type: RefuelEntry,
    required: true
  }
})

const refuelDate = date.formatDate(props.data.date, 'YYYY-MMM-DD HH:mm')

const fuelUnit = 'Liter'
const currencyUnit = '€'

</script>
