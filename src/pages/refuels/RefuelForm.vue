<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <q-badge>{{ settingsStore.getVehicleName() }}</q-badge>
      <c-input
        type="tel"
        :value="refuel.payedAmount"
        @update:modelValue="
          (evt: string) => (refuel.payedAmount = replaceComma(evt))
        "
        :label="t('refuelsForm.payedAmount')"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
      />
      <c-input
        type="tel"
        :value="refuel.distanceDriven"
        @update:modelValue="
          (evt: string) => (refuel.distanceDriven = replaceComma(evt))
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
        :value="refuel.refueledAmount"
        @update:modelValue="
          (evt: string) => (refuel.refueledAmount = replaceComma(evt))
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
        :value="refuel.refuelDate"
        :label="t('refuelsForm.refuelDate')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="refuel.refuelDate"
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
        :value="refuel.refuelTime"
        :label="t('refuelsForm.refuelTime')"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :modelValue="refuel.refuelTime"
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
import { onMounted, onBeforeUnmount, toRaw, reactive } from 'vue'
import { date as QuasarDate } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import {
  requiredFieldRule,
  numbersOnlyRule,
  positiveNumbersRule,
  max50Characters
} from 'src/scripts/libraries/validation'
import { useSettingsStore } from 'src/pages/settings/stores'
import { useRefuelStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { replaceComma } from 'src/scripts/libraries/utils'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
let routePath = ''
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const refuel = reactive({
  id: 0,
  vehicleId: 0,
  payedAmount: '',
  distanceDriven: '',
  refueledAmount: '',
  refuelDate: QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'),
  refuelTime: QuasarDate.formatDate(Date.now(), 'HH:mm')
})

const props = defineProps({
  id: {
    type: String
  }
})

function updateDate(event: string) {
  const date = new Date(event)
  refuel.refuelDate = QuasarDate.formatDate(date, 'YYYY/MM/DD')
}

function updateTime(event: string) {
  const d = event.split(':')
  const date = new Date(Date.now())
  date.setHours(parseInt(d[0]))
  date.setMinutes(parseInt(d[1]))
  refuel.refuelTime = QuasarDate.formatDate(date, 'HH:mm')
}

async function onSubmit() {
  var r = new Refuel()
  r.id = refuel.id
  r.vehicleId = refuel.vehicleId
  r.payedAmount = +refuel.payedAmount
  r.distanceDriven = +refuel.distanceDriven
  r.refueledAmount = +refuel.refueledAmount
  r.date = new Date(refuel.refuelDate)
  const d = refuel.refuelTime.split(':')
  r.date.setHours(parseInt(d[0]))
  r.date.setMinutes(parseInt(d[1]))

  if (routePath.includes('/add')) await refuelStore.addRefuel(r)
  else if (routePath.includes('/edit')) await refuelStore.updateRefuel(r)

  const scrollToId = refuel && refuel.id ? refuel.id : 0
  void router.push({
    path: `/refuels/${scrollToId}`
  })
}

function onCancel() {
  if (refuel.id)
    router.push({
      path: `/refuels/${refuel.id}`
    })
  else router.go(-1)
}

onMounted(async () => {
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add'))
    mainLayoutStore.titleText = t('refuelsForm.titleAddRefuel')
  else if (routePath.includes('/edit'))
    mainLayoutStore.titleText = t('refuelsForm.titleEditRefuel')
  mainLayoutStore.addButton.disabled = true

  await refuelStore.readData()
  if (refuelStore.vehicle) refuel.vehicleId = refuelStore.vehicle.id
  if (props.id && parseInt(props.id)) {
    const r = toRaw(await refuelStore.getRefuel(parseInt(props.id)))
    if (!r) return
    refuel.id = r.id
    refuel.refuelDate = QuasarDate.formatDate(r.date, 'YYYY/MM/DD')
    refuel.refuelTime = QuasarDate.formatDate(r.date, 'HH:mm')
    refuel.payedAmount = r.payedAmount.toString()
    refuel.distanceDriven = r.distanceDriven.toString()
    refuel.refueledAmount = r.refueledAmount.toString()
  }
})

onBeforeUnmount(() => {
  mainLayoutStore.addButton.disabled = false
})
</script>
