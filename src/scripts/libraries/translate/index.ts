type MessageValue =
  | string
  | {
      [key: string]: MessageValue
    }

type Messages = Record<string, MessageValue>

export function ct(key: string, locale: string, messages: Messages): string {
  const path = `${locale}.${key}`.split('.')

  let value: MessageValue | undefined = messages

  for (const segment of path) {
    if (typeof value !== 'object' || value === null) {
      return ''
    }

    value = value[segment]
  }

  return typeof value === 'string' ? value : ''
}

export function ctNext(key: string, messages: Messages): string {
  return (messages[key] || key) as string
}
