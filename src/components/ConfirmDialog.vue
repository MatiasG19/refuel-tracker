<template>
  <q-dialog ref="dialogRef" no-backdrop-dismiss position="bottom" full-width>
    <q-card class="q-ma-md el-space-station">
      <q-card-section class="text-center">{{ promptMessage }}</q-card-section>
      <q-card-actions>
        <q-btn
          @click="onDialogCancel"
          class="column btn"
          no-caps
          color="negative"
          label="Cancel"
        />
        <q-space />
        <q-btn
          @click="onOkClick"
          class="column btn"
          no-caps
          color="positive"
          label="Confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const props = defineProps({
  promptMessage: {
    type: String,
    required: true
  },
  action: {
    type: Function
  }
})

function onOkClick() {
  if (props.action) props.action()
  onDialogOK()
}
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
