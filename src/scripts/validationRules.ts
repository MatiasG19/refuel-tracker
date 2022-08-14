export const requiredFieldRule = (v: string) => !!v || 'Required field'

export const numbersOnlyRule = (v: string) => +v || 'Numbers only'

export const positiveNumbersRule = (v: string) =>
  +v > 0 ? +v : 'Positive numbers only'

export const max50Characters = (v: string) =>
  v.length <= 50 ? 1 : 'Maximum 50 characters'
