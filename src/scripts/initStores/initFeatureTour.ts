import { useFeatureStore } from 'src/components/featureTours/stores/featureTourStore'
import { db } from '../../boot/dexie'

export function initFeatureTour() {
  const featureStore = useFeatureStore()
  ;(async () => {
    const tours = await db.featureTours.toArray()
    featureStore.featureSlides = tours.filter(t => t.id == 1)[0].active
    featureStore.graphDataPage = tours.filter(t => t.id == 2)[0].active
    featureStore.vehiclePage = tours.filter(t => t.id == 3)[0].active
    featureStore.refuelPage = tours.filter(t => t.id == 4)[0].active
  })()
}
