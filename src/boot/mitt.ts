import mitt from 'mitt'

type Events = {
  showGraphOptionsDialog: unknown
  showVehicleOptionsDialog: number
  showRefuelOptionsDialog: number
}

export const emitter = mitt<Events>()
