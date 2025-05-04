import { i18n } from 'src/boot/i18n'
import { FuelUnit } from '../libraries/refuel/models'

export function getFuelUnits(): FuelUnit[] {
  const { t } = i18n.global
  return [
    {
      id: 1,
      distanceUnit: t('distanceUnits.kilometersShort'),
      fuelUnit: t('fuelUnits.litre'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.litresPer100km'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 2,
      distanceUnit: t('distanceUnits.milesShort'),
      fuelUnit: t('fuelUnits.gallon'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.mpgUs'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 3,
      distanceUnit: t('distanceUnits.milesShort'),
      fuelUnit: t('fuelUnits.gallon'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.mpgImperial'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 4,
      distanceUnit: t('distanceUnits.kilometersShort'),
      fuelUnit: t('fuelUnits.kWh'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.kWhPer100km'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 5,
      distanceUnit: t('distanceUnits.kilometersShort'),
      fuelUnit: t('fuelUnits.wh'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.whPer100km'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    },
    {
      id: 6,
      distanceUnit: t('distanceUnits.milesShort'),
      fuelUnit: t('fuelUnits.wh'),
      fuelConsumptionUnit: t('fuelConsumptionsUnits.whPerMile'),
      distanceConversion: 1.0,
      fuelUnitConversion: 1.0
    }
  ]
}
