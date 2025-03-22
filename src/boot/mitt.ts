import mitt from 'mitt'

type Events = {
  showDashboardOptionsDialog: unknown
  showVehicleOptionsDialog: number
  showRefuelOptionsDialog: number
}

export const emitter = mitt<Events>()
