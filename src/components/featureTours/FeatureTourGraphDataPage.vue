<template>
  <div
    v-if="
      featureTourStore.graphDataPage && featureTourStore.graphDataPageSteps[0]
    "
    class="fixed-center item0"
  >
    <div>
      This is the <span class="text-positive">main page</span>. <br />Here you
      can see all data for the currently selected vehicle.
    </div>
    <q-btn no-caps size="sm" color="positive" @click="nextStep(1)">Next</q-btn>
  </div>

  <div
    v-if="
      featureTourStore.graphDataPage && featureTourStore.graphDataPageSteps[1]
    "
    class="fixed-center item1"
  >
    <div>
      Use the <span class="text-positive">bottom navigation bar</span> to (from
      left) go to the main page, add refuels, show all vehicles and show all
      refuels for the currently selected vehicle.
    </div>
    <q-btn no-caps size="sm" color="positive" @click="nextStep(2)">Next</q-btn>
  </div>

  <div
    v-if="
      featureTourStore.graphDataPage && featureTourStore.graphDataPageSteps[2]
    "
    class="fixed-center item2"
  >
    <div>
      In the <span class="text-positive">navigation drawer</span> you access
      settings and support pages.
    </div>
    <q-btn no-caps size="sm" color="positive" @click="nextStep(3, true)"
      >Finish</q-btn
    >
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useFeatureTourStore } from './stores/featureTourStore'

const featureTourStore = useFeatureTourStore()

function nextStep(step: number, finish = false) {
  featureTourStore.graphDataPageSteps[step - 1] = false
  if (!finish) featureTourStore.graphDataPageSteps[step] = true
  if (finish) {
    featureTourStore.finishGraphDataPage()
    featureTourStore.overlayMainLayout = false
  }
}

onBeforeMount(() => {
  if (featureTourStore.graphDataPage) {
    featureTourStore.overlayMainLayout = true
    featureTourStore.graphDataPageSteps.forEach(s => {
      s = false
    })
    featureTourStore.graphDataPageSteps[0] = true
  }
})
</script>

<style scoped>
.item0 {
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.item1 {
  top: 80vh;
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.item2 {
  top: 10vh;
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}
</style>
