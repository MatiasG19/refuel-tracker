<template>
  <q-page class="q-pa-md">
    <h5 class="q-mt-md text-center">
      <span style="color: #ef60cb">Thank you</span> for using
      <span style="color: #60efb3">{{ packageJson.productName }}</span
      >! I hope you have been enjoying the app so far
      <q-icon name="rocket_launch" color="accent"></q-icon>
    </h5>

    <q-carousel
      v-model="slide"
      transition-prev="jump-right"
      transition-next="jump-left"
      swipeable
      animated
      control-color="white"
      prev-icon="arrow_left"
      next-icon="arrow_right"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      height="300px"
      class="space-station text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide
        v-if="false"
        name="rate"
        class="column no-wrap flex-center"
      >
        <div class="q-mt-md text-center">
          <div class="column items-center">
            <div class="q-mb-md text-center">
              Rate this app if you like it or leave feedback to improve your
              experience!
            </div>
            <q-rating
              v-model="ratingModel"
              size="3.5em"
              icon="star_border"
              icon-selected="star"
              class="accent-space-station"
            />
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="feedback" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="q-mb-md text-center">Having some trouble?</div>
          <q-btn
            color="accent"
            icon-right="mail"
            label="Send Feedback"
            no-caps
            outline
            @click="openURL(emailLink)"
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="code" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="q-mb-md text-center">
            {{ packageJson.productName }}'s code is open source! Check it out!
          </div>
          <q-btn
            color="accent"
            icon-right="code"
            label="GitHub"
            @click="openURL(repositoryLink)"
            no-caps
            outline
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-mt-md full-width text-center">
      {{ packageJson.productName }} version {{ packageJson.version }}
    </div>
    <div class="q-mt-md full-width text-center">
      View license on <a :href="licenseLink">Github</a>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import packageJson from '../../package.json'
import { openURL } from 'quasar'
import { emitter } from 'src/boot/mitt'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)
const ratingModel = ref(3)
const slide = ref('feedback')
const repositoryLink = 'https://github.com/MatiasG19/refuel-tracker'
const licenseLink =
  'https://github.com/MatiasG19/refuel-tracker/blob/main/LICENSE'
const emailLink = 'mailto:matiasg19@tutanota.com'

const emits = defineEmits(['update:title'])

onMounted(() => {
  emits('update:title', routePath.value)
  emitter.emit('updateTitle', 'Support')
})
</script>
