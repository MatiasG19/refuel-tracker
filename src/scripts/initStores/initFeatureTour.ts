import { useFeatureStore } from 'src/pages/featureTour/stores/featureTourStore'
import { db } from '../../boot/dexie'

export function initFeatureTour() {
  const featureStore = useFeatureStore()
  ;(async () => {
    const tours = await db.featureTours.toArray()
    featureStore.featureSlides = tours.filter(t => t.id == 1)[0].active
  })()
}
