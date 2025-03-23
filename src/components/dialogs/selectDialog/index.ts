import { Dialog } from 'quasar'
import { SelectOption } from 'src/components/inputs/types'
import SelectDialog from './SelectDialog.vue'

export function selectDialog(
  value: number,
  label: string,
  options: SelectOption[],
  action: (id: number) => void
) {
  Dialog.create({
    component: SelectDialog,
    componentProps: {
      value,
      label,
      options,
      action
    }
  })
}
