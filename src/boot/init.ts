import { useRefuelFilterStore } from 'src/pages/refuels/stores/refuelFilterStore'

const refuelFilterStore = useRefuelFilterStore()
refuelFilterStore.readFilter()

import { registerGraphData } from 'src/pages/graphData/scripts/registerGraphData'
import { registerFuelConsumption } from 'src/scripts/libraries/refuel/functions/fuelConsumption/registerFuelConsumption'

registerGraphData()
registerFuelConsumption()
