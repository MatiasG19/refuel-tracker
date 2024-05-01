interface Button {
  visible: boolean
  disabled: boolean
  action: Action
}

interface Action {
  (): void
}

export { type Button, type Action }
