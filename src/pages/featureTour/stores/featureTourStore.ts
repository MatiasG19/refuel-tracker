import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'

export const useFeatureStore = defineStore('featureTourStore', () => {
  const featureSlides = ref<boolean>(false)

  function skipEntireTour() {
    ;(async () => {
      const featureTours = await db.featureTours.toArray()
      featureTours.forEach(f => (f.active = false))
      await db.featureTours.bulkPut(featureTours)
      featureSlides.value = false
    })()
  }

  function finishFeatureSlides() {
    finishFeatureTour(1)
  }

  function finishMoveGraphCards() {
    finishFeatureTour(2)
  }

  function finishNavigationFooter() {
    finishFeatureTour(3)
  }

  function finishSideBar() {
    finishFeatureTour(4)
  }

  function finishRefuelFilter() {
    finishFeatureTour(5)
  }

  function finishFeatureTour(id: number) {
    ;(async () => {
      const featureTours = await db.featureTours
        .where('id')
        .equals(id)
        .toArray()
      featureTours[0].active = false
      await db.featureTours.put(featureTours[0])
      featureSlides.value = false
    })()
  }

  return {
    skipEntireTour,
    finishFeatureSlides,
    finishMoveGraphCards,
    finishNavigationFooter,
    finishSideBar,
    finishRefuelFilter,
    featureSlides
  }
})
