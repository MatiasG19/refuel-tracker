import { Dialog } from 'quasar'
import ConfirmDialog from './ConfirmDialog.vue'

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
