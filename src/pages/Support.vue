<template>
  <q-page class="q-pa-md">
    <h5 class="q-mt-md text-center">
      <span style="color: #ef60cb">Thank you</span> for choosing
      <span style="color: #60efb3">{{ productName }}</span
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
      <q-carousel-slide name="rate" class="column no-wrap flex-center">
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
        <div class="q-mt-md">
          <div class="q-mb-md text-center">Having some trouble?</div>
          <q-btn
            color="accent"
            icon-right="mail"
            class="column"
            label="Send Feedback"
            no-caps
            outline
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <div class="q-mt-md">
          <div class="q-pb-md text-center">
            Tell your friends about this app!
          </div>
          <div class="row justify-evenly q-pt-md q-gutter-md">
            <q-btn
              round
              color="accent"
              icon="flutter_dash"
              class="column"
              outline
              @click="openURL(twitterLink)"
            />
            <q-btn
              round
              color="accent"
              icon="face"
              class="column"
              outline
              @click="openURL(facebookLink)"
            />
            <q-btn
              round
              color="accent"
              icon="share"
              class="column"
              outline
              @click="share"
            />
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="coffee" class="column no-wrap flex-center">
        <div class="q-mt-md">
          <div class="q-mb-md text-center">Show your appreciation!</div>
          <q-btn
            color="accent"
            icon-right="local_cafe"
            class="row"
            label="Buy me a coffee!"
            @click="openURL(coffeLink)"
            no-caps
            outline
          />
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="code" class="column no-wrap flex-center">
        <div class="q-mt-md">
          <div class="q-mb-md text-center">
            {{ productName }}'s code is open source! Check it out!
          </div>
          <q-btn
            color="accent"
            icon-right="code"
            class="row"
            label="GitHub"
            @click="openURL(repositoryLink)"
            no-caps
            outline
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-mt-md full-width text-center">
      {{ productName }} version {{ version }}
    </div>
    <div class="q-mt-md full-width text-center">
      View license on <a :href="licenseLink">Github</a>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productName, version } from '../../package.json'
import { openURL } from 'quasar'
import { emitter } from 'src/boot/mitt'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)
const ratingModel = ref(3)
const slide = ref('rate')
const repositoryLink = 'https://github.com/MatiasG19/refuel-tracker'
// TODO Add missing links
const licenseLink = ''
const coffeLink = ''
const twitterLink = ''
const facebookLink = ''

const emits = defineEmits(['update:title'])

function share() {
  console.log('share')
}

onMounted(() => {
  emits('update:title', routePath.value)
  emitter.emit('updateTitle', 'Support')
})
</script>
