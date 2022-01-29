export const requiredFieldRule = (v: string) => !!v || 'Required field'

export const numbersOnlyRule = (v: string) => +v || 'Numbers only'
