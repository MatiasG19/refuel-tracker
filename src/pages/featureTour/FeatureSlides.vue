<template>
  <q-carousel arrows animated v-model="slide" height="100vh">
    <q-carousel-slide
      name="first"
      img-src="https://cdn.quasar.dev/img/mountains.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <q-btn
          dense
          flat
          size="sm"
          class="btn q-ma-xs"
          color="negative"
          @click="skipTour"
          >Skip tour</q-btn
        >
        <q-btn
          class="btn q-ma-xs"
          color="positive"
          @click="() => (slide = 'second')"
          >Take tour</q-btn
        >
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      name="second"
      img-src="https://cdn.quasar.dev/img/parallax1.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <q-btn
          class="btn q-ma-xs"
          color="positive"
          @click="() => (slide = 'third')"
          >Next</q-btn
        >
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      name="third"
      img-src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <q-btn class="btn q-ma-xs" color="positive" @click="leaveSlides"
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
