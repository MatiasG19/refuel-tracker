<template>
  <div :class="{ shake: shakeAnimation }" ref="htmlRefHook">
    <q-card class="space-station shadow-none">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col q-pb-xs">
            <div class="row text-subtitle2">
              <div>
                {{ fuelConsumption?.value }}
                {{ fuelConsumption?.unit }}
              </div>
              <div class="q-ml-md">
                {{ odometer?.value }}
                {{ odometer?.unit }}
              </div>
            </div>
            <div class="text-h6 text-accent">
              {{ dashboardData.title }}
            </div>
            <q-badge
              color="secondary"
              class="text-primary"
              :label="dashboardData.subtitle"
            />
          </div>

          <div class="col-auto space-station">
            <q-btn
              :disable="shakeAnimation"
              dense
              round
              flat
              :icon="shakeAnimation ? '' : 'more_vert'"
              @click="emit('onOptionsClick', dashboardData)"
            />
          </div>
        </div>

        <template v-if="dashboardValuesInternal.length">
          <div class="row q-mt-xs">
            <dashboard-value
              v-for="data in [...dashboardValuesInternal].splice(0, 3)"
              :key="data.uid"
              :title="t(data.title)"
              :value="data.value"
              :subtitle="data.unit"
              class="col q-pr-xl"
            />
            <div class="col-auto cursor-pointer">
              <q-icon v-if="shakeAnimation" name="drag_indicator" size="md" />
            </div>
          </div>
          <div class="row q-mt-md">
            <dashboard-value
              v-for="data in [...dashboardValuesInternal].splice(3, 3)"
              :key="data.uid"
              :title="t(data.title)"
              :value="data.value"
              :subtitle="data.unit"
              class="col q-pr-xl"
            />
          </div>
          <div class="row q-mt-md">
            <dashboard-value
              v-for="data in [
                ...dashboardValuesInternal,
                dummyDashBoardValue
              ].splice(6, 3)"
              :key="data.uid"
              :title="t(data.title)"
              :value="data.value"
              :subtitle="data.unit"
              class="col q-pr-xl"
            />
          </div>
        </template>
        <div v-else>{{ t('placeholders.noData') }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import DashboardValue from './DashboardValue.vue'
import {
  type DashboardData,
  type DashboardValue as DashboardValueType
} from '../scripts/models'
import { useI18n } from 'vue-i18n'
import messages from '../i18n'
import { onLongPress } from '@vueuse/core'
import { computed, PropType, useTemplateRef } from 'vue'

const props = defineProps({
  dashboardData: {
    type: Object as PropType<DashboardData>,
    required: true
  },
  shakeAnimation: {
    type: Boolean
  }
})

const { t } = useI18n({ useScope: 'local', messages })
const emit = defineEmits(['onLongPress', 'onOptionsClick'])
const fuelConsumption = computed<DashboardValueType | undefined>(() =>
  props.dashboardData.dashboardValues.find(v => v.uid == '1')
)
const odometer = computed<DashboardValueType | undefined>(() =>
  props.dashboardData.dashboardValues.find(v => v.uid == '10')
)
const dashboardValuesInternal = computed<DashboardValueType[]>(() =>
  props.dashboardData.dashboardValues.filter(v => v.uid != '1' && v.uid != '10')
)

const randomFactor = Math.random() * 0.4 + 0.5
const randomOffset = (Math.ceil(Math.random()) + 2) * randomFactor * -1 + 'px'
const randomAnimationDuration =
  (Math.ceil(Math.random()) * 0.3 + 0.3) * randomFactor + 's'
const htmlRefHook = useTemplateRef<HTMLElement>('htmlRefHook')
const dummyDashBoardValue = {
  uid: 'dummy',
  title: '',
  value: '',
  unit: ''
}

onLongPress(htmlRefHook, () => {
  emit('onLongPress')
})
</script>

<style scoped>
.shake {
  animation: shake v-bind(randomAnimationDuration) alternate infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  50% {
    transform: translate3d(v-bind(randomOffset), 0, 0);
  }
}
</style>
