import mitt from 'mitt'

type Events = {
  updateTitle: string
  showGraphOptionsDialog: unknown
  showVehicleOptionsDialog: number
  showRefuelOptionsDialog: number
  selectedVehicleChanged: boolean
  showSaveButton: boolean
  save: boolean
}

export const emitter = mitt<Events>()
