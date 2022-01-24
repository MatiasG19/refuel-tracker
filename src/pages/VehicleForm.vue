<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input v-model="vehicleName" label="Vehicle name"/>
      <c-input v-model="plateNumber" label="Plate number"/>
      <c-select outlined color="accent" class="q-pb-md" v-model="fuelUnit"
          :options="fuelUnits" label="Fuel unit"/>

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps @click="$router.go(-1)" />
      <q-btn color="positive" label="Confirm" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CInput from 'components/inputs/CInput.vue'
import CSelect from 'components/inputs/CSelect.vue'
import { emitter } from 'src/boot/mitt'

const router = useRouter()

const vehicleName = ref('')
const plateNumber = ref('')
const fuelUnit = ref(1)

const fuelUnits = [
  {
    label: 'L/100km',
    value: 1
  },
  {
    label: 'MPG US',
    value: 2
  },
  {
    label: 'MPG Imperial',
    value: 3
  },
  {
    label: 'kWh/100km',
    value: 4
  },
  {
    label: 'Wh/km',
    value: 5
  }
]

function onSubmit(evt?: SubmitEvent) {

  void router.go(-1)
}

onMounted(() => {
  const routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if(routePath.includes('add'))
    emitter.emit('updateTitle', 'Add vehicle')
  else if(routePath.includes('edit'))
    emitter.emit('updateTitle', 'Edit vehicle')
})

</script>
