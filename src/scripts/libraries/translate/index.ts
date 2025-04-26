type Messages = {
  [key: string]: string
}

export function ct(key: string, locale: string, messages: Messages): string {
  return (locale + '.' + key).split('.').reduce((acc, _key) => {
    return acc && acc[_key]
  }, messages)
}

export function ctNext(key: string, messages: Messages): string {
  return messages[key] || key
}
