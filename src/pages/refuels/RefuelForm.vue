<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        type="tel"
        :value="refuel.payedAmount?.toString()"
        @update:modelValue="(evt: string) => (refuel.payedAmount = replaceComma(evt))"
        label="Payed amount"
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
        @update:modelValue="(evt: string) => (refuel.distanceDriven = replaceComma(evt))"
        label="Distance driven"
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
        @update:modelValue="(evt: string) => (refuel.refueledAmount = replaceComma(evt))"
        label="Refuled amount"
        :rules="[
          requiredFieldRule,
          numbersOnlyRule,
          positiveNumbersRule,
          max50Characters
        ]"
      />

      <c-input
        :value="refuelDate"
        label="Refuel date"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="refuelDate"
            @update:modelValue="evt => updateDate(evt)"
          />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <c-input
        :value="refuelTime"
        label="Refuel time"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :modelValue="refuelTime"
            @update:modelValue="evt => updateTime(evt)"
            format24h
          />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <div class="row">
        <q-btn
          color="negative"
          label="Cancel"
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
import { useSettingsStore } from 'src/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { replaceComma } from 'src/scripts/libraries/utils'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()

const refuel = ref<Refuel>(new Refuel())
const refuelDate = ref(QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'))
const refuelTime = ref(QuasarDate.formatDate(Date.now(), 'HH:mm'))

let routePath = ''

const props = defineProps({
  id: {
    type: Number
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
  if (routePath.includes('/add'))
    await refuelStore.addRefuel({ ...refuel.value })
  else if (routePath.includes('/edit'))
    await refuelStore.updateRefuel({ ...refuel.value })
  void router.push('/refuels')
}

onMounted(async () => {
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('/add')) emitter.emit('updateTitle', 'Add refuel')
  else if (routePath.includes('/edit'))
    emitter.emit('updateTitle', 'Edit refuel')

  refuel.value.vehicleId = settingsStore.selectedVehicleId ?? 0
  if (props.id) {
    const refuelToEdit = await refuelStore.getRefuel(props.id)
    if (refuelToEdit) {
      refuel.value.id = refuelToEdit.id
      refuel.value.payedAmount = refuelToEdit.payedAmount
      refuel.value.refueledAmount = refuelToEdit.refueledAmount
      refuel.value.distanceDriven = refuelToEdit.distanceDriven
      if (routePath.includes('/edit')) {
        refuel.value.date = refuelToEdit.date
        refuelDate.value = QuasarDate.formatDate(
          refuelToEdit.date,
          'YYYY/MM/DD'
        )
        refuelTime.value = QuasarDate.formatDate(refuelToEdit.date, 'HH:mm')
      }
    } else console.error('Refuel not found!')
  } else {
    refuel.value.date = new Date(Date.now())
  }
})
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
