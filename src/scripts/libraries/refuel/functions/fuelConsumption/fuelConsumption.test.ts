import { expect, test } from 'vitest'
import {
  litresPer100km,
  milesPerGallonUs,
  milesPerGallonImperial,
  kWhPer100km,
  whPer100km,
  whPerMile
} from '.'

test('Calculate litresPer100km', () => {
  expect(litresPer100km(5, 100)).toBe(5.0)
})

test('Calculate milesPerGallonUs', () => {
  expect(milesPerGallonUs(5, 100)).toBe(20.0)
})

test('Calculate milesPerGallonImperial', () => {
  expect(milesPerGallonImperial(5, 100)).toBe(20.0)
})

test('Calculate kWhPer100km', () => {
  expect(kWhPer100km(5, 100)).toBe(5.0)
})

test('Calculate whPer100km', () => {
  expect(whPer100km(5, 100)).toBe(5.0)
})

test('Calculate whPerMile', () => {
  expect(whPerMile(5, 100)).toBe(0.05)
})
