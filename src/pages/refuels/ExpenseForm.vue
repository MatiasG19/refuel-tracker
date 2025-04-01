<template>
  <div>
    <q-form @submit="onSubmit" class="q-px-md q-gutter-md">
      <c-select
        outlined
        class="q-pb-md"
        v-model="expense.vehicleId"
        :options="vehicleOptions"
        :label="t('refuelsForm.vehicle')"
        :rules="[nothingSelected]"
      />
      <c-input
        type="tel"
        v-model="expense.description"
        :label="t('refuelsForm.distanceDriven')"
        :rules="[requiredFieldRule, max50Characters]"
      />
      <c-input
        type="tel"
        :value="expense.payedAmount"
        @update:modelValue="
          (evt: string) => (expense.payedAmount = replaceComma(evt))
        "
        :label="t('refuelsForm.payedAmount')"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
      />
      <c-date
        :modelValue="expense.date"
        @update:modelValue="(evt: string) => updateDate(evt)"
        :label="t('refuelsForm.refuelDate')"
        :rules="[requiredFieldRule]"
      />
      <c-time
        :modelValue="expense.time"
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
import { Expense } from 'src/scripts/libraries/refuel/models'
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

type ExpenseModel = {
  id: number
  vehicleId: number | undefined
  description: string
  payedAmount: string
  date: string
  time: string
}

const expense = reactive<ExpenseModel>({
  id: 0,
  vehicleId: undefined,
  description: '',
  payedAmount: '',
  date: QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'),
  time: QuasarDate.formatDate(Date.now(), 'HH:mm')
})

const props = defineProps({
  expenseId: {
    type: String
  }
})

const vehicleOptions = ref<SelectOption[]>([])

function updateDate(event: string) {
  const date = new Date(event)
  expense.date = QuasarDate.formatDate(date, 'YYYY/MM/DD')
}

function updateTime(event: string) {
  const d = event.split(':')
  const date = new Date(Date.now())
  date.setHours(parseInt(d[0]!))
  date.setMinutes(parseInt(d[1]!))
  expense.time = QuasarDate.formatDate(date, 'HH:mm')
}

async function onSubmit() {
  const d = expense.time.split(':')
  const date = new Date(expense.date)
  date.setHours(parseInt(d[0]!))
  date.setMinutes(parseInt(d[1]!))
  const submitExpense: Expense = {
    id: expense.id,
    vehicleId: expense.vehicleId!,
    description: expense.description,
    payedAmount: +expense.payedAmount,
    date: date
  }

  if (routePath.includes('/add')) await refuelStore.addExpense(submitExpense)
  else if (routePath.includes('/edit'))
    await refuelStore.updateExpense(submitExpense)

  if (expense && expense.id)
    void router.push({
      path: `/vehicles/${expense.vehicleId}/refuels/${expense.id}`
    })
  else
    void router.push({
      path: `/vehicles/${expense.vehicleId}/refuels`
    })
}

function onCancel() {
  if (expense.id)
    router.push({
      path: `/vehicles/${expense.vehicleId}/refuels/${expense.id}`
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
    mainLayoutStore.titleText = t('refuelsForm.titleAddExpense')
  else if (routePath.includes('/edit'))
    mainLayoutStore.titleText = t('refuelsForm.titleEditExpense')
  mainLayoutStore.addButton.disabled = true

  await refuelStore.readData()
  if (refuelStore.vehicle) expense.vehicleId = refuelStore.vehicle.id
  if (props.expenseId && parseInt(props.expenseId)) {
    const r = toRaw(await refuelStore.getExpense(parseInt(props.expenseId)))
    if (!r) return
    expense.id = r.id
    expense.date = QuasarDate.formatDate(r.date, 'YYYY/MM/DD')
    expense.time = QuasarDate.formatDate(r.date, 'HH:mm')
    expense.description = r.description.toString()
    expense.payedAmount = r.payedAmount.toString()
  }
})

onBeforeUnmount(() => {
  mainLayoutStore.addButton.disabled = false
})
</script>
