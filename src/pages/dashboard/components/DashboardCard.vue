<template>
  <div :class="{ shake: shakeAnimation }" ref="htmlRefHook">
    <q-card class="space-station shadow-none">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ t(`${dashboardData.title}`) }}</div>
            <div class="text-subtitle1">
              <q-badge
                color="secondary"
                class="text-primary"
                :label="t(`${dashboardData.subtitle}`)"
              />
            </div>
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

        <div class="row q-mt-xs">
          <dashboard-value
            v-for="data in [...dashboardData.dashboardValues].splice(0, 3)"
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
          <template v-if="dashboardData.dashboardValues.length">
            <dashboard-value
              v-for="data in [...dashboardData.dashboardValues].splice(3, 6)"
              :key="data.uid"
              :title="t(data.title)"
              :value="data.value"
              :subtitle="data.unit"
              class="col q-pr-xl"
            />
          </template>
          <div v-else>{{ t('placeholders.noData') }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import DashboardValue from './DashboardValue.vue'
import { type DashboardData } from '../scripts/models'
import { useI18n } from 'vue-i18n'
import messages from '../i18n'
import { onLongPress } from '@vueuse/core'
import { PropType, ref } from 'vue'

defineProps({
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

const randomFactor = Math.random() * 0.4 + 0.5
const randomOffset = (Math.ceil(Math.random()) + 2) * randomFactor * -1 + 'px'
const randomAnimationDuration =
  (Math.ceil(Math.random()) * 0.3 + 0.3) * randomFactor + 's'
const htmlRefHook = ref<HTMLElement>()

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
