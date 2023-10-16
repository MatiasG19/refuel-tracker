<template>
  <div class="bg-secondary">
    <div
      v-if="
        featureTourStore.vehiclePage && featureTourStore.vehiclePageSteps[0]
      "
      class="fixed-center item0"
    >
      <div>
        Here are all created vehicles.
        <span class="text-primary cursive">Select</span> a vehicle by clicking
        on it to view its data.
      </div>
      <q-btn no-caps size="sm" color="positive" @click="nextStep(1)"
        >Next</q-btn
      >
    </div>

    <div
      v-if="
        featureTourStore.vehiclePage && featureTourStore.vehiclePageSteps[1]
      "
      class="fixed-center item1"
    >
      <div>
        Use the the "plus" button in the bottom navigation bar to
        <span class="text-primary cursive">add</span> more vehicles.
      </div>
      <q-btn no-caps size="sm" color="positive" @click="nextStep(2)"
        >Next</q-btn
      >
    </div>

    <div
      v-if="
        featureTourStore.vehiclePage && featureTourStore.vehiclePageSteps[2]
      "
      class="fixed-center item2"
    >
      <div>
        To <span class="text-primary cursive">edit</span> a vehicle, use the
        "three dot" button.
      </div>
      <q-btn no-caps size="sm" color="positive" @click="nextStep(3, true)"
        >Finish</q-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useFeatureTourStore } from './stores/featureTourStore'

const featureTourStore = useFeatureTourStore()

function nextStep(step: number, finish = false) {
  featureTourStore.vehiclePageSteps[step - 1] = false
  if (!finish) featureTourStore.vehiclePageSteps[step] = true
  if (finish) {
    featureTourStore.finishVehiclePage()
    featureTourStore.overlayMainLayout = false
  }
}

onBeforeMount(() => {
  if (featureTourStore.vehiclePage) {
    featureTourStore.overlayMainLayout = true
    featureTourStore.vehiclePageSteps.forEach(s => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      s = false
    })
    featureTourStore.vehiclePageSteps[0] = true
  }
})
</script>

<style lang="scss" scoped>
.item0 {
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: $secondary;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.item1 {
  top: 80vh;
  left: 60vw;
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: $secondary;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.item2 {
  top: 15vh;
  left: 70vw;
  position: fixed;
  z-index: 10000;
  padding: 10px;
  color: black;
  background-color: $secondary;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.2);
}
</style>
