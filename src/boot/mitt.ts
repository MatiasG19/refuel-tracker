import mitt from 'mitt'

type Events = {
  updateTitle: string
}

export const emitter = mitt<Events>()
