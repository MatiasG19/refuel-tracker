import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GraphData, Refuel, Vehicle } from 'src/scripts/models'
import { db } from '../boot/dexie'
import { GraphDataFactory } from 'src/scripts/GraphDataFactory/GraphDataFactory'

export const useRefuelStore = defineStore('refuelStore', () => {
  const graphData = ref<GraphData[]>([])
  const refuels = ref<Refuel[]>([])
  const vehicles = ref<Vehicle[]>([])

  const selectedDistanceUnitId = ref<number>(0)
  const selectedVehicleId = ref<number | null>(null)
  const selectedVehicleName = ref<string>('My car')
  const selectedVehiclePlateNumber = ref<string>('')
  const plateNumberInTitleActive = ref<boolean>(false)
  const refuelFilterActive = ref<boolean>(false)

  async function getGraphSettings() {
    return await db.graphSettings.toArray()
  }

  function moveGraphTop(uid: string) {
    ;(async () => {
      let data = await db.graphSettings.toArray()
      const selected = data.filter(s => s.uid === uid)[0]
      const storeSelected = graphData.value.filter(d => d.uid === uid)[0]
      storeSelected.sequence = 1
      selected.sequence = 1
      data = data
        .filter(s => s.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)
      const storeData = graphData.value
        .filter(d => d.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)

      await db.transaction('rw', [db.graphSettings], async () => {
        const index = selected.sequence
        const length = graphData.value.length

        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        graphData.value.length = 0
        graphData.value.push(storeSelected)

        for (let i = 0; i < length - 1; i++) {
          await db.graphSettings.update(data[i].id as number, {
            sequence: i + index + 1
          })
          storeData[i].sequence = i + index + 1
          graphData.value.push(storeData[i])
        }
      })
    })()
  }

  function moveGraphUp(uid: string) {
    ;(async () => {
      const data = await db.graphSettings.orderBy('sequence').toArray()
      const selected = data.filter(d => d.uid === uid)[0]
      const currentUp = data.filter(
        d => d.sequence === selected.sequence - 1
      )[0]

      if (!currentUp) return Promise.resolve()

      const storeSelected = graphData.value.filter(d => d.uid === uid)[0]
      const storeCurrentUp = graphData.value.filter(
        d => d.sequence === selected.sequence - 1
      )[0]
      const upSequence = currentUp.sequence

      currentUp.sequence = selected.sequence
      selected.sequence = upSequence

      await db.transaction('rw', [db.graphSettings], async () => {
        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        await db.graphSettings.update(currentUp.id as number, {
          sequence: currentUp.sequence
        })

        storeCurrentUp.sequence = currentUp.sequence
        storeSelected.sequence = upSequence

        const length = graphData.value.length
        const storeData = graphData.value.filter(
          d => d.uid !== selected.uid && d.uid !== currentUp.uid
        )
        // Refill array for reactivity
        graphData.value.length = 0
        for (let i = 1; i <= length; i++) {
          if (storeCurrentUp.sequence === i)
            graphData.value.push(storeCurrentUp)
          else if (storeSelected.sequence === i)
            graphData.value.push(storeSelected)
          else graphData.value.push(storeData.filter(d => d.sequence === i)[0])
        }
      })
    })()
  }

  function moveGraphDown(uid: string) {
    ;(async () => {
      const data = await db.graphSettings.orderBy('sequence').toArray()
      const selected = data.filter(d => d.uid === uid)[0]
      const currentDown = data.filter(
        d => d.sequence === selected.sequence + 1
      )[0]

      if (!currentDown) return Promise.resolve()

      const storeSelected = graphData.value.filter(d => d.uid === uid)[0]
      const storeCurrentDown = graphData.value.filter(
        d => d.sequence === selected.sequence + 1
      )[0]
      const downSequence = currentDown.sequence

      currentDown.sequence = selected.sequence
      selected.sequence = downSequence

      await db.transaction('rw', [db.graphSettings], async () => {
        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        await db.graphSettings.update(currentDown.id as number, {
          sequence: currentDown.sequence
        })

        storeCurrentDown.sequence = currentDown.sequence
        storeSelected.sequence = downSequence

        const length = graphData.value.length
        const storeData = graphData.value.filter(
          d => d.uid !== selected.uid && d.uid !== currentDown.uid
        )
        // Refill array for reactivity
        graphData.value.length = 0
        for (let i = 1; i <= length; i++) {
          if (storeCurrentDown.sequence === i)
            graphData.value.push(storeCurrentDown)
          else if (storeSelected.sequence === i)
            graphData.value.push(storeSelected)
          else graphData.value.push(storeData.filter(d => d.sequence === i)[0])
        }
      })
    })()
  }

  function moveGraphBottom(uid: string) {
    ;(async () => {
      let data = await db.graphSettings.toArray()
      const selected = data.filter(s => s.uid === uid)[0]
      const storeSelected = graphData.value.filter(d => d.uid === uid)[0]
      storeSelected.sequence = graphData.value.length
      selected.sequence = storeSelected.sequence
      data = data
        .filter(s => s.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)
      const storeData = graphData.value
        .filter(d => d.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)

      await db.transaction('rw', [db.graphSettings], async () => {
        const length = selected.sequence

        graphData.value.length = 0
        for (let i = 0; i < length - 1; i++) {
          await db.graphSettings.update(data[i].id as number, {
            sequence: i + 1
          })
          storeData[i].sequence = i + 1
          graphData.value.push(storeData[i])
        }

        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        graphData.value.push(storeSelected)
      })
    })()
  }

  // async function changeGraphVisibility(state: boolean) {}

  async function readRefuels(vehicleId: number) {
    await db.refuels
      .where('vehicleId')
      .equals(vehicleId)
      .toArray()
      .then(r =>
        r.length > 0 ? (refuels.value = r) : (refuels.value.length = 0)
      )
  }

  async function getRefuel(id: number) {
    if (!selectedVehicleId.value) return
    await readRefuels(selectedVehicleId.value)
    return refuels.value.find(v => v.id == id) ?? null
  }

  async function addRefuel(refuel: Refuel) {
    await db.refuels.add(refuel)
  }

  async function updateRefuel(refuel: Refuel) {
    await db.refuels.put(refuel)
  }

  async function deleteRefuel(id: number) {
    await db.refuels.delete(id)
  }

  async function readVehicles() {
    await db.vehicles
      .toArray()
      .then(v =>
        v.length > 0 ? (vehicles.value = v) : (vehicles.value.length = 0)
      )
  }

  async function getVehicle(id: number): Promise<Vehicle | null> {
    await readVehicles()
    return vehicles.value.find(v => v.id == id) ?? null
  }

  async function getAllVehicleData(id: number): Promise<Vehicle | null> {
    const v = await getVehicle(id)
    if (!v) return null

    await readRefuels(v.id)
    if (refuels.value.length > 0) {
      v.refuels = []
      refuels.value.forEach(r => v.refuels?.push(r))
      v.fuelUnit = await getFuelUnit(v.fuelUnitId)

      // Create graph data
      graphData.value = new GraphDataFactory(v)
        .getGraphData(await getGraphSettings())
        .sort((a, b) => a.sequence - b.sequence)
    } else graphData.value.length = 0

    return v
  }

  async function addVehicle(vehicle: Vehicle) {
    await db.vehicles.add(vehicle)

    // Update settings
    if ((await db.vehicles.count()) === 1) changeSelectedVehicle(vehicle)
  }

  async function updateVehicle(vehicle: Vehicle) {
    await db.vehicles.put(vehicle)
  }

  async function deleteVehicle(id: number) {
    await db.transaction(
      'rw',
      [db.vehicles, db.refuels, db.settings],
      async () => {
        const refuels = await db.refuels.where('vehicleId').equals(id).toArray()
        refuels.forEach(r => {
          ;(async () => {
            await db.refuels.delete(r.id)
          })()
        })
        await db.vehicles.delete(id)

        // Update settings
        if ((await db.vehicles.count()) > 0) {
          const vehicles = await db.vehicles.toArray()
          changeSelectedVehicle(vehicles[0])
          return
        }
        changeSelectedVehicle(null)
      }
    )
  }

  async function getPeriods() {
    return await db.periods.toArray()
  }

  async function getFuelUnits() {
    return await db.fuelUnits.toArray()
  }

  async function getFuelUnit(id: number) {
    return (await db.fuelUnits.where('id').equals(id).toArray())[0]
  }

  function changeDistanceUnit(distanceUnitId: number) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].distanceUnitId = distanceUnitId
      await db.settings.put(settings[0])
      selectedDistanceUnitId.value = distanceUnitId
    })()
  }

  async function changeSelectedVehicle(vehicle: Vehicle | null) {
    const settings = await db.settings.toArray()
    if (vehicle) {
      settings[0].vehicleId = vehicle.id
      await db.settings.put(settings[0])
      selectedVehicleId.value = vehicle.id
      selectedVehicleName.value = vehicle.name
      selectedVehiclePlateNumber.value = vehicle.plateNumber
      // Read graph data
      await getAllVehicleData(vehicle.id)

      return Promise.resolve()
    }
    settings[0].vehicleId = null
    db.settings.put(settings[0])
    selectedVehicleId.value = null
    selectedVehicleName.value = 'My Car'
    selectedVehiclePlateNumber.value = ''
  }

  function togglePlateNumberInTitle(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].plateNumberInTitleActive = state
      await db.settings.put(settings[0])
      plateNumberInTitleActive.value = state
    })()
  }

  function toggleRefuelFilter(state: boolean) {
    ;(async () => {
      const settings = await db.settings.toArray()
      settings[0].refuelFilterActive = state
      await db.settings.put(settings[0])
      refuelFilterActive.value = state
    })()
  }

  return {
    graphData,
    refuels,
    vehicles,
    selectedDistanceUnitId,
    selectedVehicleId,
    selectedVehicleName,
    selectedVehiclePlateNumber,
    plateNumberInTitleActive,
    refuelFilterActive,
    getGraphSettings,
    moveGraphTop,
    moveGraphUp,
    moveGraphDown,
    moveGraphBottom,
    // changeGraphVisibility,
    readRefuels,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel,
    readVehicles,
    getVehicle,
    getAllVehicleData,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getPeriods,
    getFuelUnits,
    getFuelUnit,
    changeDistanceUnit,
    changeSelectedVehicle,
    togglePlateNumberInTitle,
    toggleRefuelFilter
  }
})
