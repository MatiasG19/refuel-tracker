<template>
  <q-dialog ref="dialogRef" no-backdrop-dismiss position="bottom" full-width>
    <q-card class="q-ma-md el-space-station shadow-none">
      <q-card-section class="text-center">{{ promptMessage }}</q-card-section>
      <q-card-actions>
        <q-btn
          @click="onDialogCancel"
          class="column form-btn text-default"
          no-caps
          color="primary"
          :label="
            t[settingsStore.locale]['components']['dialogs']['confirmDialog'][
              'cancel'
            ]
          "
        />
        <q-space />
        <q-btn
          @click="onOkClick"
          class="column form-btn text-default"
          no-caps
          color="primary"
          :label="
            t[settingsStore.locale]['components']['dialogs']['confirmDialog'][
              'confirm'
            ]
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import t from 'src/i18n'

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const settingsStore = useSettingsStore()

const props = defineProps({
  promptMessage: {
    type: String,
    required: true
  },
  action: {
    type: Function
  },
  actionArgument: {}
})

function onOkClick() {
  if (props.action) props.action(props.actionArgument)
  onDialogOK()
}
</script>
