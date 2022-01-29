import mitt from 'mitt'

type Events = {
  updateTitle: string
  showGraphOptionsDialog: boolean
  showVehicleOptionsDialog: boolean
  showRefuelOptionsDialog: boolean
}

export const emitter = mitt<Events>()
