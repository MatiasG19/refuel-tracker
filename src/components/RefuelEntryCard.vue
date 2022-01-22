<template>
  <div>
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ refuelDate }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn dense round flat icon="more_vert" @click="dialogVisible = true" />
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
    <options-dialog
      v-model:dialogVisible="dialogVisible"
      :options="optionsInDialog as OptionInDialog[]"
    />
  </div>
</template>

<script setup lang="ts">
import { RefuelEntry, OptionInDialog } from 'src/components/models'
import { defineProps, ref } from 'vue'
import { date } from 'quasar'
import OptionsDialog from 'src/components/OptionsDialog.vue'

const props = defineProps({
  data: {
    type: RefuelEntry,
    required: true
  },
    optionsInDialog: {
    type: Array
  }
})

let dialogVisible = ref(false)

const refuelDate = date.formatDate(props.data.date, 'YYYY-MMM-DD HH:mm')

const fuelUnit = 'Liter'
const currencyUnit = '€'

</script>
