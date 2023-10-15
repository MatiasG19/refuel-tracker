import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'

export const useFeatureTourStore = defineStore('featureTourStore', () => {
  const featureSlides = ref<boolean>(false)
  const graphDataPage = ref<boolean>(false)
  const graphDataPageSteps = ref<boolean[]>([false, false, false, false])
  const vehiclePage = ref<boolean>(false)
  const vehiclePageSteps = ref<boolean[]>([false, false, false])
  const refuelPage = ref<boolean>(false)
  const refuelPageSteps = ref<boolean[]>([false, false, false])

  const overlayMainLayout = ref<boolean>(false)

  function skipEntireTour() {
    ;(async () => {
      const featureTours = await db.featureTours.toArray()
      featureTours.forEach(f => (f.active = false))
      await db.featureTours.bulkPut(featureTours)
      featureSlides.value = false
      graphDataPage.value = false
      vehiclePage.value = false
      refuelPage.value = false
    })()
  }

  function startTour() {
    ;(async () => {
      const featureTours = await db.featureTours.toArray()
      featureTours.forEach(f => (f.active = true))
      await db.featureTours.bulkPut(featureTours)
      featureSlides.value = true
      graphDataPage.value = true
      vehiclePage.value = true
      refuelPage.value = true
    })()
  }

  function finishFeatureSlides() {
    finishFeatureTour(1)
    featureSlides.value = false
  }

  function finishGraphDataPage() {
    finishFeatureTour(2)
    graphDataPage.value = false
  }

  function finishVehiclePage() {
    finishFeatureTour(3)
    vehiclePage.value = false
  }

  function finishRefuelPage() {
    finishFeatureTour(4)
    refuelPage.value = false
  }

  function finishFeatureTour(id: number) {
    ;(async () => {
      const featureTours = await db.featureTours
        .where('id')
        .equals(id)
        .toArray()
      featureTours[0].active = false
      await db.featureTours.put(featureTours[0])
    })()
  }

  return {
    skipEntireTour,
    startTour,
    finishFeatureSlides,
    finishGraphDataPage,
    finishVehiclePage,
    finishRefuelPage,
    featureSlides,
    graphDataPage,
    graphDataPageSteps,
    vehiclePage,
    vehiclePageSteps,
    refuelPage,
    refuelPageSteps,
    overlayMainLayout
  }
})
