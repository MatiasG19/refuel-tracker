<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        :value="vehicle.name"
        @update:modelValue="vehicle.name = $event"
        :label="t[settingsStore.locale]['vehicleForm']['vehicleName']"
        :rules="[requiredFieldRule, max50Characters]"
      />
      <c-input
        :value="vehicle.plateNumber"
        @update:modelValue="vehicle.plateNumber = $event"
        :label="t[settingsStore.locale]['vehicleForm']['licensePlate']"
        :rules="[requiredFieldRule]"
      />
      <c-select
        outlined
        class="q-pb-md"
        v-model="vehicle.fuelUnitId"
        :options="fuelUnits"
        :label="t[settingsStore.locale]['vehicleForm']['fuelUnit']"
        :rules="[nothingSelected]"
      />
      <c-input
        type="tel"
        class="q-pb-md"
        :value="odometer"
        @update:modelValue="odometer = replaceComma($event)"
        :label="t[settingsStore.locale]['vehicleForm']['odometer']"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersAndZeroRule
        ]"
      />
      <c-input
        class="q-pb-md"
        :value="vehicle.currencyUnit"
        @update:modelValue="vehicle.currencyUnit = $event"
        :label="t[settingsStore.locale]['vehicleForm']['currencyUnit']"
        :rules="[requiredFieldRule]"
      />

      <div class="row">
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="gt[settingsStore.locale]['form']['cancel']"
          no-caps
          @click="$router.go(-1)"
        />
        <q-space />
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="gt[settingsStore.locale]['form']['confirm']"
          type="submit"
          no-caps
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { useVehicleStore } from './stores/vehicleStore'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import gt from 'src/i18n'
import t from './i18n'
import { fuelUnitRepository } from 'src/scripts/databaseRepositories'
import { SelectOption } from 'src/components/inputs/types'
import { useFormValidation } from 'src/scripts/libraries/validation'
import { replaceComma } from 'src/scripts/libraries/utils'
import { useSettingsStore } from '../settings/stores/settingsStore'

const router = useRouter()
const {
  requiredFieldRule,
  max50Characters,
  nothingSelected,
  numbersOnlyRule,
  positiveNumbersAndZeroRule
} = useFormValidation()
const vehicleStore = useVehicleStore()
const mainLayoutStore = useMainLayoutStore()
const settingsStore = useSettingsStore()

const vehicle = ref<Vehicle>(new Vehicle())
const odometer = ref<string>('0')
const fuelUnits = ref<SelectOption[]>([])
let routePath = ''

const props = defineProps({
  vehicleId: {
    type: String
  }
})

async function onSubmit() {
  const fuelUnit = await fuelUnitRepository.getFuelUnit(
    vehicle.value.fuelUnitId
  )
  if (!fuelUnit) return
  vehicle.value.fuelUnit = fuelUnit

  vehicle.value.odometer = +odometer.value

  if (routePath.includes('/add'))
    await vehicleStore.addVehicle({ ...vehicle.value })
  else if (routePath.includes('/edit')) {
    await vehicleStore.updateVehicle({ ...toRaw(vehicle.value) })
  }
  void router.push('/vehicles')
}

onMounted(async () => {
  // Get vehicle to edit
  if (props.vehicleId) {
    const v = toRaw(await vehicleStore.getVehicle(parseInt(props.vehicleId)))
    if (v) {
      vehicle.value = { ...v }
      odometer.value = v.odometer.toString()
    }
  }

  // Get fuel units
  const units = await vehicleStore.getFuelUnits()
  units.forEach(u =>
    fuelUnits.value.push({
      label: u.fuelConsumptionUnit,
      value: u.id
    })
  )

  // Update title
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add'))
    mainLayoutStore.titleText =
      t[settingsStore.locale]['vehicleForm']['titleAddVehicle']
  else if (routePath.includes('/edit'))
    mainLayoutStore.titleText =
      t[settingsStore.locale]['vehicleForm']['titleEditVehicle']
})
</script>
