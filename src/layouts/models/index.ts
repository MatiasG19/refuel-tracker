interface Button {
  visible: boolean
  disabled: boolean
  icon: string
  color: string
  action: Action
}

interface Action {
  (): void
}

export { type Button, type Action }
