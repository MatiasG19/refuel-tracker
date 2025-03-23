<template>
  <div>
    <q-dialog ref="dialogRef" position="standard" full-width>
      <q-card class="q-ma-md shadow-none">
        <q-card-actions>
          <c-select
            class="text-default"
            v-model="option"
            :options="props.options"
            :label="props.label"
            style="width: 100%"
            @update:model-value="onOkClick"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { SelectOption } from 'src/components/inputs/types'
import CSelect from 'src/components/inputs/CSelect.vue'
import { onMounted, ref } from 'vue'

const { dialogRef, onDialogOK } = useDialogPluginComponent()

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array<SelectOption>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const option = ref<number | null>(null)

function onOkClick() {
  props.action(option.value)
  onDialogOK()
}

onMounted(() => {
  option.value = props.value
})
</script>
