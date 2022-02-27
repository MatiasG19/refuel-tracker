<template>
  <q-page>
    <div v-if="filterActive" class="q-pt-md text-center">
      <q-btn
        class="q-pa-xs"
        style="color: pink"
        flat
        no-caps
        label=" "
        @click="removeFilter"
        icon-right="delete_outline"
        >{{ filterHint }}</q-btn
      >
    </div>
    <refuel-card
      v-for="(refuel, i) in refuels"
      :key="i"
      :refuel="refuel"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/components/RefuelCard.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/scripts/dialogs'
import { confirmDialog } from 'src/scripts/dialogs'
import { useMainStore, useRefuelStore } from 'src/stores'

const router = useRouter()
const mainStore = useMainStore()
const refuelStore = useRefuelStore()

const filterActive = ref(mainStore.refuelFilterActive)
const filterHint = 'Filter 1 Month from 2021.12.19'

let refuels = computed(() => refuelStore.refuels)

function removeFilter() {
  mainStore.toggleRefuelFilter(false)
  filterActive.value = false
}

emitter.on('showRefuelOptionsDialog', id =>
  optionsDialog([
    {
      text: 'Edit',
      icon: 'edit',
      action: () => router.push({ path: `/refuels/edit/${id}`, params: { id } })
    },
    {
      text: 'Remove',
      icon: 'delete',
      action: () => confirmDialog('Delete refuel entry?')
    }
  ])
)

onMounted(() => {
  emitter.emit('updateTitle', 'Refuels')
  refuelStore.readRefuels()
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
