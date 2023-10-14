<template>
  <q-carousel animated v-model="slide">
    <q-carousel-slide
      name="first"
      img-src="https://cdn.quasar.dev/img/mountains.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h2">First stop</div>
        <div class="text-subtitle1">Mountains</div>
        <q-btn @click="() => (slide = 'second')">Take tour</q-btn>
        <q-btn @click="skipTour">Skip tour</q-btn>
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      name="second"
      img-src="https://cdn.quasar.dev/img/parallax1.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h2">Second stop</div>
        <div class="text-subtitle1">Famous City</div>
        <q-btn @click="() => (slide = 'third')">Next</q-btn>
      </div>
    </q-carousel-slide>
    <q-carousel-slide
      name="third"
      img-src="https://cdn.quasar.dev/img/parallax2.jpg"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h2">Third stop</div>
        <div class="text-subtitle1">Famous Bridge</div>
        <q-btn @click="leaveSlides">Start tracking!</q-btn>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useSettingsStore } from 'src/stores/settingsStore'

const settingsStore = useSettingsStore()

const slide = ref('first')

function leaveSlides() {
  settingsStore.toggleIntroTour(false)
}

function skipTour() {
  settingsStore.toggleIntroTour(false)
}
</script>
