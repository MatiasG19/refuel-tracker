<template>
    <q-page>
      <div v-if="filterActive" class="q-pt-md text-center">
        <q-btn class="q-pa-xs" style="color:pink;" flat no-caps label=" " @click="removeFilter"
        icon-right="delete_outline">{{ filterHint }}</q-btn>
      </div>
      <refuel-entry-card
        v-for="(card, i) in cards"
        :key="i"
        :data="card"
        :optionsInDialog="optionsInDialog"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </q-page>
</template>

<script setup lang="ts">
import RefuelEntryCard from 'src/components/RefuelEntryCard.vue';
import { RefuelEntry, OptionInDialog } from 'src/components/models'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let filterActive = ref(true)
const filterHint = 'Filter 1 Month from 2021.12.19'

const cards: RefuelEntry[] = [
  {
    id: 0,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  },
  {
    id: 1,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  },
  {
    id: 2,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  }
]

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Edit',
    icon: 'edit',
    action: () => router.push('/refuels/edit')
  },
  {
    text: 'Remove',
    icon: 'delete',
    action: action
  }
]

function action() {
  ;
}

function removeFilter() {
  filterActive.value = false
}

</script>
