<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        v-model="vehicle.name"
        :label="t('vehicleForm.vehicleName')"
        :rules="[requiredFieldRule, max50Characters]"
        autofocus
      />
      <c-input
        v-model="vehicle.plateNumber"
        :label="t('vehicleForm.licensePlate')"
        :rules="[requiredFieldRule]"
      />
      <c-select
        outlined
        class="q-pb-md"
        v-model="vehicle.fuelUnitId"
        :options="fuelUnits"
        :label="t('vehicleForm.fuelUnit')"
      />
      <c-input
        class="q-pb-md"
        v-model="vehicle.currencyUnit"
        :label="t('vehicleForm.currencyUnit')"
        :rules="[requiredFieldRule]"
      />

      <div class="row">
        <q-btn
          color="negative"
          :label="i18n.global.t('form.cancel')"
          no-caps
          class="btn"
          @click="$router.go(-1)"
        />
        <q-space />
        <q-btn
          color="positive"
          :label="i18n.global.t('form.confirm')"
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
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
const { t } = useI18n({ useScope: 'local', messages })

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
  if (routePath.includes('/add'))
    emitter.emit('updateTitle', t('vehicleForm.titleAddVehicle'))
  else if (routePath.includes('/edit'))
    emitter.emit('updateTitle', t('vehicleForm.titleEditVehicle'))
})
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
