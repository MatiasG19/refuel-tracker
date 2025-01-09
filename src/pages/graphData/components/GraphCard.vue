<template>
  <div :class="{ shake: shakeAnimation }" ref="htmlRefHook">
    <q-card class="space-station">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-subtitle2">{{ t(`${graphData.title}`) }}</div>
          </div>

          <div class="col-auto space-station">
            <q-btn
              :disable="shakeAnimation"
              dense
              round
              flat
              :icon="shakeAnimation ? '' : 'more_vert'"
              @click="emit('onOptionsClick', graphData)"
            />
          </div>
        </div>
        <div>
          <div class="row">
            <div class="col text-h4 accent-space-station">
              {{ graphData.value }}
            </div>
            <div class="col-auto cursor-pointer">
              <q-icon v-if="shakeAnimation" name="drag_indicator" size="md" />
            </div>
          </div>
          <div class="text-subtitle1">{{ graphData.unit }}</div>
        </div>
      </q-card-section>

      <q-card-section class="accent-space-station" v-if="false">
        Graph-Graph-Graph-Graph-Graph-Graph-Graph
      </q-card-section>

      <q-card-actions v-if="false">
        <div v-for="(period, i) in periods" :key="i" class="col text-center">
          <q-btn :ripple="false" dense flat no-caps class="space-station">{{
            period.name
          }}</q-btn>
          <q-separator vertical />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { type Period, GraphData } from '../scripts/models'
import { useI18n } from 'vue-i18n'
import messages from '../i18n'
import { onLongPress } from '@vueuse/core'
import { ref } from 'vue'

defineProps({
  graphData: {
    type: GraphData,
    required: true
  },
  periods: {
    type: Array<Period>,
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
