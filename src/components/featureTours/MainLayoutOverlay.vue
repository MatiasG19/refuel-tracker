<template>
  <div v-if="featureTourStore.overlayMainLayout" class="overlay"></div>
</template>

<script setup lang="ts">
import { useFeatureTourStore } from 'src/components/featureTours/stores/featureTourStore'

const featureTourStore = useFeatureTourStore()
</script>

<style scoped>
.overlay {
  position: absolute;
  z-index: 10000;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
