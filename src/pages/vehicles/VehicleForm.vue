<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        v-model="vehicle.name"
        :label="t('vehicleName')"
        :rules="[requiredFieldRule, max50Characters]"
        autofocus
      />
      <c-input
        v-model="vehicle.plateNumber"
        label="Number plate"
        :rules="[requiredFieldRule]"
      />
      <c-select
        outlined
        class="q-pb-md"
        v-model="vehicle.fuelUnitId"
        :options="fuelUnits"
        label="Fuel unit"
      />
      <c-input
        class="q-pb-md"
        v-model="vehicle.currencyUnit"
        label="Currency unit"
        :rules="[requiredFieldRule]"
      />

      <div class="row">
        <q-btn
          color="negative"
          :label="t('form.cancel')"
          no-caps
          class="btn"
          @click="$router.go(-1)"
        />
        <q-space />
        <q-btn
          color="positive"
          label="Confirm"
          type="submit"
          no-caps
          class="btn"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'
import {
  requiredFieldRule,
  max50Characters
} from 'src/scripts/libraries/validation'
import { SelectOption } from 'src/scripts/models'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { useI18n } from 'vue-i18n'

defineOptions({
  i18n: {
    messages: {
      'en-US': {
        vehicleName: 'Vehicle name123'
      },
      'de-DE': {
        vehicleName: 'Fahrzeugname'
      }
    }
  }
})

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { t } = useI18n()

const vehicle = ref<Vehicle>(new Vehicle())
const fuelUnits = ref<SelectOption[]>([])
let routePath = ''

const props = defineProps({
  id: {
    type: Number
  }
})

async function onSubmit() {
  if (routePath.includes('/add'))
    await refuelStore.addVehicle({ ...vehicle.value })
  else if (routePath.includes('/edit')) {
    await settingsStore.changeSelectedVehicle({ ...vehicle.value })
    await refuelStore.updateVehicle({ ...vehicle.value })
  }
  void router.push('/vehicles')
}

onMounted(async () => {
  // Get vehicle to edit
  if (props.id) {
    const vehicleToEdit = await refuelStore.getVehicle(props.id)
    if (vehicleToEdit) {
      vehicle.value.id = vehicleToEdit.id
      vehicle.value.name = vehicleToEdit.name
      vehicle.value.plateNumber = vehicleToEdit.plateNumber
      vehicle.value.fuelUnitId = vehicleToEdit.fuelUnitId
      vehicle.value.currencyUnit = vehicleToEdit.currencyUnit
    } else console.error('Vehicle not found!')
  }

  // Get fuel units
  const units = await refuelStore.getFuelUnits()
  units.forEach(u =>
    fuelUnits.value.push({
      label: u.fuelConsumptionUnit,
      value: u.id
    })
  )

  // Update title
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add')) emitter.emit('updateTitle', 'Add vehicle')
  else if (routePath.includes('/edit'))
    emitter.emit('updateTitle', 'Edit vehicle')
})
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
