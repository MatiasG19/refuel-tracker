<template>
  <div>
    <transition name="fadein">
      <q-card class="space-station shadow-none" v-if="!loading">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2">
                {{ date.formatDate(props.expense.date, 'YYYY-MMM-DD HH:mm') }}
              </div>
            </div>
            <div class="col-auto space-station">
              <q-btn
                dense
                round
                flat
                icon="more_vert"
                @click="emit('onOptionsClick', expense.id)"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="text-h6 accent-space-station">
                {{ expense.description }}
              </div>
              <div class="text-subtitle3">
                {{ t[settingsStore.locale]['refuelsForm']['description'] }}
              </div>
            </div>
            <div class="col-6">
              <div class="text-h6 accent-space-station">
                {{ expense.payedAmount }}
              </div>
              <div class="text-subtitle3">{{ vehicle.currencyUnit }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <refuel-card-skeleton v-else />
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Expense, Vehicle } from 'src/scripts/libraries/refuel/models'
import { date } from 'quasar'
import RefuelCardSkeleton from './RefuelCardSkeleton.vue'
import t from '../i18n'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

const settingsStore = useSettingsStore()
const props = defineProps({
  expense: {
    type: Object as PropType<Expense>,
    required: true
  },
  vehicle: {
    type: Object as PropType<Vehicle>,
    required: true
  },
  loading: {
    type: Boolean
  }
})

const emit = defineEmits(['onOptionsClick'])
</script>
