import { OptionInDialog } from 'src/components/dialogs/optionsDialog'
import { Expense, Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useI18n } from 'vue-i18n'
import messages from '../i18n'
import { useRouter } from 'vue-router'

export type VehicleViewModel = Omit<Vehicle, 'refuels | expenses'> & {
  allExpenses: ExpenseViewModel[]
}

export type ExpenseViewModel = {
  type: 'refuel' | 'expense'
  value: Refuel | Expense
}

export function getAddExpenseDialogOptions() {
  const router = useRouter()
  const { t } = useI18n({ useScope: 'local', messages })

  const addExpenseDialogOptions: OptionInDialog[] = [
    {
      text: t('refuels.addDialog.expense'),
      icon: 'attach_money',
      action: () => router.push({ path: `/vehicles/refuels/addExpense` })
    },
    {
      text: t('refuels.addDialog.refuel'),
      icon: 'local_gas_station',
      action: () => router.push({ path: `/vehicles/refuels/add` })
    }
  ]
  return { addExpenseDialogOptions }
}
