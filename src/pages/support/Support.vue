<template>
  <q-page class="q-pa-md">
    <h5 class="q-mt-md text-center">
      <span class="text-negative">{{ t('greetingPart1') }}</span>
      {{ t('greetingPart2') }}
      <span class="text-positive">{{ packageJson.productName }}</span
      >{{ t('greetingPart3') }}
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
            <div class="q-mb-md text-center space-station">
              {{ t('slide4') }}
            </div>
            <q-rating
              v-model="ratingModel"
              size="3em"
              icon="star_border"
              icon-selected="star"
              class="accent-space-station"
              @click="openURL(playStoreLink)"
            />
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="code" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="q-mb-md text-center space-station">
            {{ packageJson.productName }}{{ t('slide1') }}
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
            <div class="q-mb-md text-center space-station">
              {{ t('slide2') }}
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
            <div class="q-mb-md text-center space-station">
              {{ t('slide3') }}
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
      {{ packageJson.productName }} {{ t('version') }}
      {{ packageJson.version }}
    </div>
    <div class="q-mt-md full-width text-center">
      <q-btn
        size="sm"
        color="accent"
        :label="t('btnLicense')"
        @click="openURL(licenseLink)"
        no-caps
        outline
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import packageJson from '../../../package.json'
import { openURL } from 'quasar'
import { useI18n } from 'vue-i18n'
import messages from './i18n'
import { useMainLayoutStore } from 'src/layouts/stores'

const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'global', messages })
const ratingModel = ref(3)
const slide = ref('rate')
const repositoryLink = 'https://github.com/MatiasG19/refuel-tracker'
const licenseLink =
  'https://github.com/MatiasG19/refuel-tracker/blob/main/LICENSE'
const issueLink = 'https://github.com/MatiasG19/refuel-tracker/issues/new'
const playStoreLink =
  'https://play.google.com/store/apps/details?id=capacitor.quasar.refueltracker'

onMounted(() => {
  mainLayoutStore.titleText = t('title')
})
</script>
