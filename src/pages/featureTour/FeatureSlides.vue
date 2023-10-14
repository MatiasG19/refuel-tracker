<template>
  <q-carousel
    arrows
    animated
    v-model="slide"
    height="100vh"
    class="bg-space-station"
  >
    <q-carousel-slide name="first" img-src="img:direction_car.svg">
      <div class="absolute-center items-center">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
      <div class="absolute-bottom custom-caption">
        <q-btn
          dense
          flat
          no-caps
          size="sm"
          class="btn q-ma-xs"
          color="negative"
          @click="skipTour"
          >Skip tour</q-btn
        >

        <q-btn
          class="btn q-ma-xs"
          color="positive"
          no-caps
          @click="() => (slide = 'second')"
          >Take tour</q-btn
        >
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="second">
      <div class="absolute-center items-center">
        <q-icon class="col" name="img:directions_car.svg" size="100px" />
      </div>
      <div class="absolute-bottom custom-caption">
        <q-btn
          class="btn q-ma-xs"
          color="positive"
          no-caps
          @click="() => (slide = 'third')"
          >Next</q-btn
        >
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="third">
      <div class="absolute-center items-center">
        <q-icon class="col" name="img:local_gas_station.svg" size="100px" />
      </div>
      <div class="absolute-bottom custom-caption">
        <q-btn no-caps class="btn q-ma-xs" color="positive" @click="leaveSlides"
          >Start tracking!</q-btn
        >
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFeatureStore } from './stores/featureTourStore'

const featureTourStore = useFeatureStore()

const slide = ref('first')

function leaveSlides() {
  featureTourStore.finishFeatureSlides()
}

function skipTour() {
  featureTourStore.skipEntireTour()
}
</script>

<style scoped>
.btn {
  width: 99%;
}
</style>
