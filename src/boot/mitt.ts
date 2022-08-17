import mitt from 'mitt'

type Events = {
  updateTitle: string
  showGraphOptionsDialog: unknown
  showVehicleOptionsDialog: number
  showRefuelOptionsDialog: number
}

export const emitter = mitt<Events>()
