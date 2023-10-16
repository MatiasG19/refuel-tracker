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
      <q-carousel-slide name="tour" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="column items-center">
            <div class="q-mb-md text-center">
              Go on a tour and explore all features!
            </div>
            <q-btn
              color="accent"
              icon-right="explore"
              label="Tour"
              @click="takeTour"
              no-caps
              outline
            />
          </div>
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
      <q-carousel-slide name="issue" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="column items-center">
            <div class="q-mb-md text-center">
              Having issues or improvement ideas?
            </div>
            <q-btn
              color="accent"
              icon-right="bug_report"
              label="GitHub"
              @click="openURL(issueLink)"
              no-caps
              outline
            />
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="star" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="column items-center">
            <div class="q-mb-md text-center">
              Like the project? Leave a star!
            </div>
            <q-btn
              color="accent"
              icon-right="star"
              label="GitHub"
              @click="openURL(repositoryLink)"
              no-caps
              outline
            />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="q-mt-md full-width text-center">
      {{ packageJson.productName }} version {{ packageJson.version }}
    </div>
    <div class="q-mt-md full-width text-center">
      <q-btn
        size="sm"
        color="accent"
        label="View license on GitHub"
        @click="openURL(licenseLink)"
        no-caps
        outline
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import packageJson from '../../package.json'
import { openURL } from 'quasar'
import { emitter } from 'src/boot/mitt'
import { useFeatureTourStore } from 'src/components/featureTours/stores/featureTourStore'

const router = useRouter()
const featureTourStore = useFeatureTourStore()

const routePath = computed(() => router.currentRoute.value.path)
const ratingModel = ref(3)
const slide = ref('tour')
const repositoryLink = 'https://github.com/MatiasG19/refuel-tracker'
const licenseLink =
  'https://github.com/MatiasG19/refuel-tracker/blob/main/LICENSE'
const issueLink = 'https://github.com/MatiasG19/refuel-tracker/issues/new'

const emits = defineEmits(['update:title'])

function takeTour() {
  featureTourStore.startTour()
  router.push('/')
}

onMounted(() => {
  emits('update:title', routePath.value)
  emitter.emit('updateTitle', 'Support')
})
</script>
