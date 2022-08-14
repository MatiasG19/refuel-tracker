import 'reflect-metadata'

export function GraphDataDecorator(uid: string) {
  return (constructor: Function) => {
    Reflect.defineMetadata(GraphDataDecorator.name, uid, constructor)
  }
}
