import { Dialog } from 'quasar'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import OptionsDialog from 'src/components/OptionsDialog.vue'
import { OptionInDialog } from './models'

export function confirmDialog(
  promptMessage: string,
  action: (id: number) => void,
  actionArgument: unknown
) {
  Dialog.create({
    component: ConfirmDialog,
    componentProps: {
      promptMessage,
      action,
      actionArgument
    }
  })
}

export function optionsDialog(options: OptionInDialog[], data?: unknown) {
  Dialog.create({
    component: OptionsDialog,
    componentProps: {
      options,
      data
    }
  })
}
