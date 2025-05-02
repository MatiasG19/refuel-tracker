type Messages = {
  [key: string]: unknown
}

export function ct(key: string, locale: string, messages: Messages): string {
  return (locale + '.' + key).split('.').reduce((acc, _key) => {
    return acc && acc[_key]
  }, messages)
}
