<template>
  <div>
    <q-dialog ref="dialogRef" position="bottom" full-width>
      <q-card class="q-ma-md shadow-none bg-primary">
        <q-card-actions
          v-for="(option, i) in options as OptionInDialog[]"
          :key="i"
        >
          <q-btn
            @click="onOkClick(option)"
            class="row full-width text-default"
            v-close-popup
            flat
            no-caps
          >
            <template v-slot:default>
              <q-icon :name="option.icon" />
              <label class="q-ml-md">{{ option.text }}</label>
              <q-space />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { OptionInDialog } from 'src/components/dialogs/optionsDialog'
import { useDialogPluginComponent } from 'quasar'

const { dialogRef, onDialogOK } = useDialogPluginComponent()

const props = defineProps({
  options: {
    type: Array<OptionInDialog>,
    required: true
  },
  data: {
    type: null
  }
})

function onOkClick(option: OptionInDialog) {
  option.action(props.data)
  onDialogOK()
}
</script>
