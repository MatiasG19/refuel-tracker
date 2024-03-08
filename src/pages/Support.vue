<template>
  <q-page class="q-pa-md">
    <h5 class="q-mt-md text-center">
      <span style="color: #ef60cb">{{ t('pages.support.greetingPart1') }}</span>
      {{ t('pages.support.greetingPart2') }}
      <span style="color: #60efb3">{{ packageJson.productName }}</span
      >{{ t('pages.support.greetingPart3') }}
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
              {{ t('pages.support.slide4') }}
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
      <q-carousel-slide name="code" class="column no-wrap flex-center">
        <div class="q-mt-md text-center">
          <div class="q-mb-md text-center">
            {{ packageJson.productName }}{{ t('pages.support.slide1') }}
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
              {{ t('pages.support.slide2') }}
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
              {{ t('pages.support.slide3') }}
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
      {{ packageJson.productName }} {{ t('pages.support.version') }}
      {{ packageJson.version }}
    </div>
    <div class="q-mt-md full-width text-center">
      <q-btn
        size="sm"
        color="accent"
        :label="t('pages.support.btnLicense')"
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
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const routePath = computed(() => router.currentRoute.value.path)
const ratingModel = ref(3)
const slide = ref('code')
const repositoryLink = 'https://github.com/MatiasG19/refuel-tracker'
const licenseLink =
  'https://github.com/MatiasG19/refuel-tracker/blob/main/LICENSE'
const issueLink = 'https://github.com/MatiasG19/refuel-tracker/issues/new'

const emits = defineEmits(['update:title'])

onMounted(() => {
  emits('update:title', routePath.value)
  emitter.emit('updateTitle', t('pages.support.title'))
})
</script>
