<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <q-badge>{{ vehicleName }}</q-badge>
      <c-input
        type="tel"
        :value="refuel.payedAmount?.toString()"
        @update:modelValue="
          (evt: string) => (refuel.payedAmount = +replaceComma(evt))
        "
        :label="t('refuelsForm.payedAmount')"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
        autofocus
      />
      <c-input
        type="tel"
        :value="refuel.distanceDriven?.toString()"
        @update:modelValue="
          (evt: string) => (refuel.distanceDriven = +replaceComma(evt))
        "
        :label="t('refuelsForm.distanceDriven')"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
      />
      <c-input
        type="tel"
        :value="refuel.refueledAmount?.toString()"
        @update:modelValue="
          (evt: string) => (refuel.refueledAmount = +replaceComma(evt))
        "
        :label="t('refuelsForm.refueledAmount')"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
      />

      <c-input
        :value="refuelDate"
        :label="t('refuelsForm.refuelDate')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="refuelDate"
            @update:modelValue="evt => updateDate(evt)"
          />
          <div class="row items-center justify-end">
            <q-btn
              v-close-popup
              :label="t('refuelsForm.close')"
              color="primary"
              flat
            />
          </div>
        </q-popup-proxy>
      </c-input>

      <c-input
        :value="refuelTime"
        :label="t('refuelsForm.refuelTime')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :modelValue="refuelTime"
            @update:modelValue="evt => updateTime(evt!)"
            format24h
          />
          <div class="row items-center justify-end">
            <q-btn
              v-close-popup
              :label="t('refuelsForm.close')"
              color="primary"
              flat
            />
          </div>
        </q-popup-proxy>
      </c-input>

      <div class="row">
        <q-btn
          color="negative"
          :label="i18n.global.t('form.cancel')"
          no-caps
          class="form-btn"
          @click="onCancel"
        />
        <q-space />
        <q-btn
          color="positive"
          :label="i18n.global.t('form.confirm')"
          type="submit"
          no-caps
          class="form-btn"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { date as QuasarDate } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import { emitter } from 'src/boot/mitt'
import {
  requiredFieldRule,
  numbersOnlyRule,
  positiveNumbersRule,
  max50Characters
} from 'src/scripts/libraries/validation'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useRefuelStore } from './stores'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { replaceComma } from 'src/scripts/libraries/utils'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
const { t } = useI18n({ useScope: 'local', messages })

const refuel = ref<Refuel>(new Refuel())
const refuelDate = ref(QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'))
const refuelTime = ref(QuasarDate.formatDate(Date.now(), 'HH:mm'))
const vehicleName = ref<string>('')

let routePath = ''

const props = defineProps({
  id: {
    type: String
  }
})

function updateDate(event: string) {
  const date = new Date(event)
  refuelDate.value = QuasarDate.formatDate(date, 'YYYY/MM/DD')
  if (!refuel.value.date) refuel.value.date = date
  refuel.value.date.setFullYear(date.getFullYear())
  refuel.value.date.setMonth(date.getMonth())
  refuel.value.date.setDate(date.getDate())
}

function updateTime(event: string) {
  const d = event.split(':')
  const hours = parseInt(d[0])
  const minutes = parseInt(d[1])
  const date = new Date(Date.now())
  if (!refuel.value.date) refuel.value.date = date
  date.setHours(hours)
  date.setMinutes(minutes)
  refuelTime.value = QuasarDate.formatDate(date, 'HH:mm')
  refuel.value.date.setHours(hours)
  refuel.value.date.setMinutes(minutes)
}

async function onSubmit() {
  let savedRefuel = refuel.value
  if (routePath.includes('/add'))
    await refuelStore.addRefuel({ ...refuel.value })
  else if (routePath.includes('/edit'))
    await refuelStore.updateRefuel({ ...refuel.value })

  const scrollToId = savedRefuel && savedRefuel.id ? savedRefuel.id : 0

  void router.push({
    path: `/refuels/${scrollToId}`
  })
}

function onCancel() {
  if (refuel.value.id)
    router.push({
      path: `/refuels/${refuel.value.id}`
    })
  else router.go(-1)
}

onMounted(async () => {
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add'))
    emitter.emit('updateTitle', t('refuelsForm.titleAddRefuel'))
  else if (routePath.includes('/edit'))
    emitter.emit('updateTitle', t('refuelsForm.titleEditRefuel'))

  vehicleName.value = settingsStore.plateNumberInTitleActive
    ? settingsStore.selectedVehiclePlateNumber
    : settingsStore.selectedVehicleName

  await refuelStore.readData()
  refuel.value.vehicleId = refuelStore.vehicle.id
  if (props.id && parseInt(props.id)) {
    refuel.value =
      (await refuelStore.getRefuel(parseInt(props.id))) ?? refuel.value
    refuelDate.value = QuasarDate.formatDate(refuel.value.date, 'YYYY/MM/DD')
    refuelTime.value = QuasarDate.formatDate(refuel.value.date, 'HH:mm')
  } else {
    refuel.value.date = new Date(Date.now())
    refuelDate.value = QuasarDate.formatDate(refuel.value.date, 'YYYY/MM/DD')
    refuelTime.value = QuasarDate.formatDate(refuel.value.date, 'HH:mm')
  }
})
</script>
