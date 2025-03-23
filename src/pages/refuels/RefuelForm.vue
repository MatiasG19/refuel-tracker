<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <c-select
        outlined
        class="q-pb-md"
        v-model="refuel.vehicleId"
        :options="vehicleOptions"
        :label="t('refuelsForm.vehicle')"
        :rules="[nothingSelected]"
      />
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
      <c-date
        :modelValue="refuel.refuelDate"
        @update:modelValue="(evt: string) => updateDate(evt)"
        :label="t('refuelsForm.refuelDate')"
        :rules="[requiredFieldRule]"
      />
      <c-time
        :modelValue="refuel.refuelTime"
        @update:modelValue="(evt: string) => updateTime(evt)"
        :label="t('refuelsForm.refuelTime')"
        :rules="[requiredFieldRule]"
        format24h
      />
      <div class="row">
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="i18n.global.t('form.cancel')"
          no-caps
          @click="onCancel"
        />
        <q-space />
        <q-btn
          color="primary"
          class="form-btn text-default"
          :label="i18n.global.t('form.confirm')"
          type="submit"
          no-caps
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, toRaw, reactive, ref } from 'vue'
import { date as QuasarDate } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import CSelect from 'src/components/inputs/CSelect.vue'
import CDate from 'src/components/inputs/CDate.vue'
import CTime from 'src/components/inputs/CTime.vue'
import { useFormValidation } from 'src/scripts/libraries/validation'
import { useRefuelStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { replaceComma } from 'src/scripts/libraries/utils'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { vehicleRepository } from 'src/scripts/databaseRepositories'
import { SelectOption } from 'src/components/inputs/types'

const router = useRouter()
const {
  requiredFieldRule,
  numbersOnlyRule,
  positiveNumbersRule,
  max50Characters,
  nothingSelected
} = useFormValidation()
let routePath = ''
const refuelStore = useRefuelStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

type RefuelModel = {
  id: number
  vehicleId: number | undefined
  payedAmount: string
  distanceDriven: string
  refueledAmount: string
  refuelDate: string
  refuelTime: string
}

const refuel = reactive<RefuelModel>({
  id: 0,
  vehicleId: undefined,
  payedAmount: '',
  distanceDriven: '',
  refueledAmount: '',
  refuelDate: QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'),
  refuelTime: QuasarDate.formatDate(Date.now(), 'HH:mm')
})

const props = defineProps({
  refuelId: {
    type: String
  }
})

const vehicleOptions = ref<SelectOption[]>([])

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
  const d = refuel.refuelTime.split(':')
  const submitRefuel = new Refuel()
  submitRefuel.id = refuel.id
  submitRefuel.vehicleId = refuel.vehicleId!
  submitRefuel.payedAmount = +refuel.payedAmount
  submitRefuel.distanceDriven = +refuel.distanceDriven
  submitRefuel.refueledAmount = +refuel.refueledAmount
  submitRefuel.date = new Date(refuel.refuelDate)
  submitRefuel.date.setHours(parseInt(d[0]))
  submitRefuel.date.setMinutes(parseInt(d[1]))

  if (routePath.includes('/add')) await refuelStore.addRefuel(submitRefuel)
  else if (routePath.includes('/edit'))
    await refuelStore.updateRefuel(submitRefuel)

  if (refuel && refuel.id)
    void router.push({
      path: `/vehicles/${refuel.vehicleId}/refuels/${refuel.id}`
    })
  else
    void router.push({
      path: `/vehicles/${refuel.vehicleId}/refuels`
    })
}

function onCancel() {
  if (refuel.id)
    router.push({
      path: `/vehicles/${refuel.vehicleId}/refuels/${refuel.id}`
    })
  else router.go(-1)
}

onMounted(async () => {
  ;(await vehicleRepository.getVehicles()).forEach(v => {
    vehicleOptions.value.push({
      label: v.name,
      value: v.id
    })
  })

  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add'))
    mainLayoutStore.titleText = t('refuelsForm.titleAddRefuel')
  else if (routePath.includes('/edit'))
    mainLayoutStore.titleText = t('refuelsForm.titleEditRefuel')
  mainLayoutStore.addButton.disabled = true

  await refuelStore.readData()
  if (refuelStore.vehicle) refuel.vehicleId = refuelStore.vehicle.id
  if (props.refuelId && parseInt(props.refuelId)) {
    const r = toRaw(await refuelStore.getRefuel(parseInt(props.refuelId)))
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
