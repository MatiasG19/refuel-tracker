import mitt from 'mitt'

type Events = {
  updateTitle: string
  showGraphOptionsDialog: boolean
  showVehicleOptionsDialog: number
  showRefuelOptionsDialog: number
}

export const emitter = mitt<Events>()
